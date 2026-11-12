import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// SMTP Transporter configuration using Gmail credentials provided
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || 'khelbharat2026@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || 'gzid fmgh nefi kbqr';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS.replace(/\s+/g, ''),
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify SMTP connection on startup
transporter.verify((error) => {
  if (error) {
    console.warn('[SMTP WARNING] Transporter verification:', error.message);
  } else {
    console.log('[SMTP READY] Transporter connected to smtp.gmail.com for khelbharat2026@gmail.com');
  }
});

/**
 * Health check & SMTP status
 */
app.get('/api/smtp-status', async (_req, res) => {
  try {
    await transporter.verify();
    res.json({
      status: 'connected',
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      verified: true
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
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
    const { to, subject, html, text, replyTo } = req.body;

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({ success: false, error: 'Missing required fields (to, subject, html/text)' });
    }

    const mailOptions = {
      from: `"Champion Cricket League" <${SMTP_USER}>`,
      to,
      replyTo: replyTo || 'support@khelbharatofficial.com',
      subject,
      text: text || '',
      html: html || undefined
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SENT] MessageId: ${info.messageId} to ${to} (Subject: ${subject})`);
    
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
