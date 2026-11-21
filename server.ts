import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Lightweight runtime persistence for sequential Registration IDs (CCL-26-0001...)
const STORE_PATH = path.join(os.tmpdir(), 'ccl-registrations-store.json');

interface StoredRegistration {
  registrationNumber: string;
  name: string;
  age: number | string;
  phone: string;
  email: string;
  speciality: string;
  ballType: string;
  state: string;
  city: string;
  feeAmount: number;
  paymentStatus: 'pending' | 'completed';
  paymentId?: string;
  orderId?: string;
  createdAt: string;
  paidAt?: string;
}

interface StoreData {
  lastSequence: number;
  registrations: Record<string, StoredRegistration>;
}

function readStore(): StoreData {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        lastSequence: typeof parsed.lastSequence === 'number' ? parsed.lastSequence : 0,
        registrations: parsed.registrations && typeof parsed.registrations === 'object' ? parsed.registrations : {},
      };
    }
  } catch {
    // ignore corrupted cache
  }
  return { lastSequence: 0, registrations: {} };
}

function writeStore(data: StoreData): void {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // ignore disk errors
  }
}

// SMTP Transporter configuration for official domain mailbox (registration@khelbharatofficial.com)
const SMTP_HOST = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
const SMTP_PORT = parseInt((process.env.SMTP_PORT || '587').trim(), 10);
const SMTP_USER = (process.env.SMTP_USER || 'registration@khelbharatofficial.com').trim();
const rawSmtpPass = (process.env.SMTP_PASS || '').trim();
const SMTP_PASS = SMTP_HOST.includes('gmail.com') ? rawSmtpPass.replace(/\s+/g, '') : rawSmtpPass;
const SMTP_FROM = (process.env.SMTP_FROM || SMTP_USER).trim();
const OWNER_NOTIFICATION_EMAIL = (process.env.OWNER_NOTIFICATION_EMAIL || 'registration@khelbharatofficial.com').trim();

const transporter = SMTP_PASS
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    })
  : null;

// Verify SMTP connection on startup
if (!transporter) {
  console.warn(`[SMTP SETUP NEEDED] SMTP_PASS is not set for ${SMTP_USER}. Add SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in Secrets/Environment Variables.`);
} else {
  transporter.verify((error) => {
    if (error) {
      console.warn('[SMTP WARNING] Transporter verification:', error.message);
    } else {
      console.log(`[SMTP READY] Transporter connected to ${SMTP_HOST}:${SMTP_PORT} for ${SMTP_USER}`);
    }
  });
}

/**
 * Health check & SMTP status
 */
app.get('/api/smtp-status', async (_req, res) => {
  if (!transporter) {
    return res.status(503).json({
      status: 'unconfigured',
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      from: SMTP_FROM,
      ownerEmail: OWNER_NOTIFICATION_EMAIL,
      verified: false,
      message: `SMTP_PASS environment variable is not configured for ${SMTP_USER}.`
    });
  }
  try {
    await transporter.verify();
    res.json({
      status: 'connected',
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      from: SMTP_FROM,
      ownerEmail: OWNER_NOTIFICATION_EMAIL,
      verified: true
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      from: SMTP_FROM,
      message: err.message,
      verified: false
    });
  }
});

/**
 * Real email dispatch API endpoint
 */
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, text, replyTo, isOwnerNotification } = req.body;

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({ success: false, error: 'Missing required fields (to, subject, html/text)' });
    }

    if (!transporter) {
      return res.status(503).json({
        success: false,
        error: `SMTP password not configured for ${SMTP_USER}. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.`
      });
    }

    const recipient = isOwnerNotification ? OWNER_NOTIFICATION_EMAIL : to;
    const uniqueRef = `ccl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const mailOptions = {
      from: `"Champion Cricket League" <${SMTP_FROM}>`,
      to: recipient,
      replyTo: replyTo || 'support@khelbharatofficial.com',
      subject,
      text: text || '',
      html: html || undefined,
      messageId: `<${uniqueRef}@khelbharatofficial.com>`,
      headers: {
        'X-Entity-Ref-ID': uniqueRef
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SENT] MessageId: ${info.messageId} from ${SMTP_FROM} to ${recipient} (Subject: ${subject})`);
    
    return res.json({
      success: true,
      messageId: info.messageId,
      accepted: info.accepted
    });
  } catch (err: any) {
    console.error('[EMAIL DISPATCH ERROR]', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to dispatch email via SMTP'
    });
  }
});

/**
 * Razorpay Payment Verification endpoint
 */
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, secret } = req.body;
    const keySecret = secret || process.env.RAZORPAY_KEY_SECRET || '01u4qsoauqc6D1aEiklOf4M6';

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment signature verification parameters' });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return res.json({ success: true, verified: true });
    } else {
      return res.status(400).json({ success: false, verified: false, message: 'Signature mismatch' });
    }
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Initialize a registration with sequential Registration Number (CCL-26-0001, CCL-26-0002, ...)
 */
app.post('/api/registrations/init', (req, res) => {
  try {
    const { name, age, phone, email, speciality, ballType, state, city, feeAmount } = req.body || {};
    const store = readStore();
    const nextSeq = store.lastSequence + 1;
    const registrationNumber = `CCL-26-${String(nextSeq).padStart(4, '0')}`;

    const record: StoredRegistration = {
      registrationNumber,
      name: String(name || ''),
      age: age ?? '',
      phone: String(phone || ''),
      email: String(email || ''),
      speciality: String(speciality || 'Batsman'),
      ballType: String(ballType || 'Leather'),
      state: String(state || ''),
      city: String(city || ''),
      feeAmount: Number(feeAmount) || 0,
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
    };

    store.lastSequence = nextSeq;
    store.registrations[registrationNumber] = record;
    writeStore(store);

    return res.json({ success: true, registrationNumber, record });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Fetch registration details by Registration Number (used when player resumes payment from email button)
 */
app.get('/api/registrations/:regId', (req, res) => {
  try {
    const { regId } = req.params;
    const store = readStore();
    const record = store.registrations[regId];
    if (!record) {
      return res.status(404).json({ success: false, error: 'Registration not found' });
    }
    return res.json({ success: true, record });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Mark a registration as paid/completed
 */
app.post('/api/registrations/complete', (req, res) => {
  try {
    const { registrationNumber, paymentId, orderId, feeAmount, name, age, phone, email, speciality, ballType, state, city } = req.body || {};
    if (!registrationNumber) {
      return res.status(400).json({ success: false, error: 'Missing registrationNumber' });
    }
    const store = readStore();
    const existing = store.registrations[registrationNumber];
    const updated: StoredRegistration = {
      registrationNumber,
      name: String(name || existing?.name || ''),
      age: age ?? existing?.age ?? '',
      phone: String(phone || existing?.phone || ''),
      email: String(email || existing?.email || ''),
      speciality: String(speciality || existing?.speciality || 'Batsman'),
      ballType: String(ballType || existing?.ballType || 'Leather'),
      state: String(state || existing?.state || ''),
      city: String(city || existing?.city || ''),
      feeAmount: Number(feeAmount || existing?.feeAmount || 0),
      paymentStatus: 'completed',
      paymentId: String(paymentId || ''),
      orderId: String(orderId || ''),
      createdAt: existing?.createdAt || new Date().toISOString(),
      paidAt: new Date().toISOString(),
    };
    store.registrations[registrationNumber] = updated;
    writeStore(store);
    return res.json({ success: true, record: updated });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
