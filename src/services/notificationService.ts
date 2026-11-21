import { calculateRegistrationFee } from '../data/cclData';

export interface CandidateRegistrationEmail {
  id: string;
  emailType: 'payment_pending' | 'payment_confirmed';
  recipientEmail: string;
  candidateName: string;
  registrationNumber: string;
  ballType: string;
  speciality: string;
  city: string;
  state: string;
  reportingTime?: string;
  paymentId?: string;
  orderId?: string;
  amount?: number;
  sentAt: string;
  subject: string;
  emailBody: string;
  htmlBody: string;
}

export interface CompanyPaymentNotificationEmail {
  id: string;
  recipientEmail: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateAge: string | number;
  ballType: string;
  speciality: string;
  trialLocation: string;
  registrationNumber: string;
  paymentId: string;
  orderId: string;
  amount?: number;
  sentAt: string;
  subject: string;
  emailBody: string;
}

// Company / Website Owner & Official Email (configured to khelbharatofficial.com)
export const COMPANY_OWNER_EMAIL = 'registration@khelbharatofficial.com';
export const COMPANY_OFFICIAL_EMAIL = 'support@khelbharatofficial.com';
export const REGISTRATION_SYSTEM_EMAIL = 'registration@khelbharatofficial.com';

/**
 * Dispatches real emails via the backend SMTP route (/api/send-email)
 * backed by the official registration@khelbharatofficial.com SMTP transport.
 */
export const dispatchRealEmailViaApi = async (options: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  isOwnerNotification?: boolean;
}) => {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.warn('[REAL EMAIL DISPATCH NOTICE]', data);
      return { success: false, ...data };
    }
    console.log('[REAL EMAIL DISPATCH SUCCESSFUL TO]', options.to, data);
    return { success: true, ...data };
  } catch (err: any) {
    console.warn('[REAL EMAIL DISPATCH OFFLINE/FALLBACK]', err?.message);
    return { success: false, error: err?.message };
  }
};

export const sendCandidateDetailsToCompany = (details: {
  name: string;
  phone: string;
  email: string;
  age: string | number;
  speciality: string;
  ballType: string;
  state: string;
  city: string;
  tempId: string;
  feeAmount?: number;
}) => {
  const fee = details.feeAmount || (details.ballType === 'Leather' ? 1199 : 799);
  const subject = `New Registration (Payment Pending): ${details.name} [${details.tempId}]`;

  const emailBody = `
ATTENTION: Champion Cricket League Administration / Website Owner

A new candidate has registered their details for Season 2 Trials. They reached the payment checkout step, but payment has not yet been completed (Payment Pending).

==================================================
        CANDIDATE REGISTRATION (PAYMENT PENDING)
==================================================
Provisional Ref ID  : ${details.tempId}
Candidate Full Name : ${details.name}
Mobile (WhatsApp)   : ${details.phone}
Email Address       : ${details.email}
Age                 : ${details.age} (${Number(details.age) < 16 ? 'Under-16' : 'Open/Senior'})
Ball Category       : ${details.ballType} Ball Trial
Playing Speciality  : ${details.speciality}
Trial Location      : ${details.city}, ${details.state}
Registration Fee    : ₹${fee} (PENDING)
Payment Status      : PAYMENT PENDING (Checkout Initiated / Cancelled)
Timestamp           : ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
==================================================

Action Taken:
- Candidate registration details have been saved to company leads.
- An automated pending-payment reminder email with payment instructions has been dispatched to ${details.email}.
- If the player completes payment later, an updated payment confirmation will be logged.

System Notification,
Champion Cricket League Payment Automation Engine
`.trim();

  const companyLeadEmail = {
    id: `email_lead_${Date.now()}`,
    recipientEmail: COMPANY_OWNER_EMAIL,
    candidateName: details.name,
    candidateEmail: details.email,
    candidatePhone: details.phone,
    candidateAge: details.age,
    ballType: details.ballType,
    speciality: details.speciality,
    trialLocation: `${details.city}, ${details.state}`,
    registrationNumber: details.tempId,
    paymentStatus: 'pending',
    amount: fee,
    sentAt: new Date().toISOString(),
    subject,
    emailBody
  };

  const pendingRecord = {
    ...details,
    feeAmount: fee,
    systemSender: REGISTRATION_SYSTEM_EMAIL,
    status: 'details_submitted_awaiting_payment',
    timestamp: new Date().toISOString(),
    ownerNotifiedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ccl_company_leads') || '[]');
    existing.unshift(pendingRecord);
    localStorage.setItem('ccl_company_leads', JSON.stringify(existing.slice(0, 50)));

    // Store in company emails log as well
    const compEmails = JSON.parse(localStorage.getItem('ccl_company_payment_emails') || '[]');
    compEmails.unshift(companyLeadEmail);
    localStorage.setItem('ccl_company_payment_emails', JSON.stringify(compEmails.slice(0, 50)));
  } catch {
    // Ignore storage quota
  }

  console.log('[COMPANY NOTIFICATION] Candidate details received by website owner (registration@khelbharatofficial.com) - PAYMENT PENDING:', pendingRecord);
  dispatchRealEmailViaApi({
    to: COMPANY_OWNER_EMAIL,
    subject,
    text: emailBody,
    replyTo: details.email,
    isOwnerNotification: true
  });
  return pendingRecord;
};

/**
 * Helper to compute standardized Age Category label without mix-ups
 */
export const getAgeCategoryLabel = (age?: string | number): string => {
  const num = Number(age);
  if (isNaN(num) || num <= 0) return 'Open / Senior (16–35)';
  return num < 16 ? 'Under-16' : 'Open / Senior (16–35)';
};

/**
 * URL-safe Base64 token helpers so the email payment button can restore exact
 * player details & open Razorpay Checkout directly on any device/browser.
 */
export interface PendingPaymentPayload {
  r: string;   // registrationNumber (CCL-26-0001)
  n: string;   // name
  e: string;   // email
  ph: string;  // phone
  a: string | number; // age
  sp: string;  // speciality
  bt: string;  // ballType
  st: string;  // state
  ct: string;  // city
}

export const encodePaymentResumeToken = (payload: PendingPaymentPayload): string => {
  try {
    const json = JSON.stringify(payload);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    return '';
  }
};

export const decodePaymentResumeToken = (token: string): PendingPaymentPayload | null => {
  try {
    let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const json = decodeURIComponent(escape(atob(base64)));
    const parsed = JSON.parse(json);
    if (parsed && parsed.r && parsed.n) {
      return parsed as PendingPaymentPayload;
    }
    return null;
  } catch {
    return null;
  }
};

export const buildDirectPaymentUrl = (data: {
  tempId: string;
  name: string;
  email: string;
  phone: string;
  age: string | number;
  speciality: string;
  ballType: string;
  state: string;
  city: string;
}): string => {
  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://khelbharatofficial.com';

  const token = encodePaymentResumeToken({
    r: data.tempId,
    n: data.name,
    e: data.email,
    ph: data.phone,
    a: data.age,
    sp: data.speciality,
    bt: data.ballType,
    st: data.state,
    ct: data.city
  });

  return `${origin}/?pay=${encodeURIComponent(data.tempId)}&p=${encodeURIComponent(token)}`;
};

/**
 * EMAIL 1: Registration Received – Payment Pending
 * Exact personalized draft with a direct Razorpay payment CTA button (no raw link shown).
 */
export const sendRegistrationPendingEmail = (data: {
  name: string;
  email: string;
  phone: string;
  age: string | number;
  speciality: string;
  ballType: string;
  state: string;
  city: string;
  tempId: string;
  feeAmount?: number;
}): CandidateRegistrationEmail => {
  const fee = data.feeAmount || calculateRegistrationFee(data.ballType as any, data.speciality);
  const ageCategory = getAgeCategoryLabel(data.age);
  const specialtyDisplay = `${data.speciality} (${data.ballType} Ball)`;
  const paymentButtonUrl = buildDirectPaymentUrl(data);
  const subject = `CCL Registration Received – Payment Pending`;

  // Plain-text fallback strictly avoids raw URLs
  const emailBody = `
Subject: ${subject}

Hi ${data.name}, 🏏

Thank you for registering for the Champion Cricket League (CCL) Trials. Your registration has been successfully received.

Registration Number: ${data.tempId}
Specialty: ${specialtyDisplay}
Category: ${ageCategory}
State: ${data.state}
Payment Status: Pending

To confirm your registration for upcoming trial slot, please complete your payment by clicking the "Complete Payment – ₹${fee}" button in this email.

For assistance, contact us at 01169311383 and 01169310488 or support@khelbharatofficial.com (WhatsApp Only: +91 8800763536)
Monday to Saturday | 10:00 AM – 7:00 PM

Best regards,
Team Champion Cricket League
Khel Bharat | Play. Perform. Get Recognized.
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b1120; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b1120; padding: 28px 12px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 28px rgba(0,0,0,0.35); border: 1px solid #1e293b;">
          
          <!-- Official Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1B3E8E 100%); padding: 26px 24px; text-align: center; border-bottom: 4px solid #f59e0b;">
              <span style="display: inline-block; background-color: #f59e0b; color: #0f172a; font-size: 11px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; margin-bottom: 10px;">
                Champion Cricket League Trials
              </span>
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.3px;">
                CCL Registration Received
              </h1>
              <p style="margin: 6px 0 0; color: #cbd5e1; font-size: 13px; font-weight: 600;">
                Khel Bharat | Play. Perform. Get Recognized.
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 28px 26px;">
              <p style="margin: 0 0 14px; font-size: 16px; font-weight: 700; color: #0f172a;">
                Hi ${data.name}, 🏏
              </p>
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.65; color: #334155;">
                Thank you for registering for the <strong style="color: #0f172a;">Champion Cricket League (CCL) Trials</strong>. Your registration has been successfully received.
              </p>

              <!-- Registration Summary Table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td colspan="2" style="background-color: #0f172a; color: #ffffff; padding: 11px 16px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                    Player Registration Details
                  </td>
                </tr>
                <tr>
                  <td width="44%" style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">
                    Registration Number:
                  </td>
                  <td width="56%" style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #1B3E8E; font-size: 14px; font-weight: 800; font-family: monospace;">
                    ${data.tempId}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">
                    Specialty:
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px; font-weight: 700;">
                    ${specialtyDisplay}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">
                    Category:
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px; font-weight: 700;">
                    ${ageCategory}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">
                    State:
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px; font-weight: 700;">
                    ${data.state}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; color: #64748b; font-size: 13px; font-weight: 600;">
                    Payment Status:
                  </td>
                  <td style="padding: 11px 16px;">
                    <span style="display: inline-block; background-color: #fef3c7; color: #b45309; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; border: 1px solid #fde68a;">
                      Pending
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Payment CTA Section (Button Only — No Raw URL Shown) -->
              <p style="margin: 0 0 18px; font-size: 14px; line-height: 1.6; color: #334155;">
                To confirm your registration for upcoming trial slot, please complete your payment by clicking:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 26px;">
                <tr>
                  <td align="center">
                    <a href="${paymentButtonUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #1B3E8E; color: #ffffff; font-size: 15px; font-weight: 800; text-decoration: none; padding: 14px 32px; border-radius: 10px; border: 2px solid #f59e0b; box-shadow: 0 4px 12px rgba(27,62,142,0.28); letter-spacing: 0.3px;">
                      Complete Payment – ₹${fee.toLocaleString('en-IN')}/-
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 8px; font-size: 11px; color: #64748b;">
                    Secure Razorpay Checkout • UPI, Cards &amp; Net Banking Accepted
                  </td>
                </tr>
              </table>

              <!-- Assistance Block -->
              <div style="background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; padding: 14px 16px; margin-bottom: 22px; font-size: 12px; line-height: 1.6; color: #475569;">
                For assistance, contact us at <strong style="color: #0f172a;">01169311383</strong> and <strong style="color: #0f172a;">01169310488</strong>, WhatsApp Only: <strong style="color: #0f172a;">+91 8800763536</strong>, or <a href="mailto:support@khelbharatofficial.com" style="color: #1B3E8E; font-weight: 700; text-decoration: none;">support@khelbharatofficial.com</a>
                <br>
                <span style="color: #64748b; font-weight: 600;">Monday to Saturday | 10:00 AM – 7:00 PM</span>
              </div>

              <!-- Sign Off -->
              <p style="margin: 0; font-size: 13px; line-height: 1.65; color: #334155;">
                Best regards,<br>
                <strong style="color: #0f172a;">Team Champion Cricket League</strong><br>
                <span style="color: #1B3E8E; font-weight: 700;">Khel Bharat | Play. Perform. Get Recognized.</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; color: #94a3b8; padding: 16px 24px; text-align: center; font-size: 11px; border-top: 1px solid #1e293b;">
              Champion Cricket League (CCL) • Powered by Khel Bharat • Official Automated Notice
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  const record: CandidateRegistrationEmail = {
    id: `email_pending_${Date.now()}`,
    emailType: 'payment_pending',
    recipientEmail: data.email,
    candidateName: data.name,
    registrationNumber: data.tempId,
    ballType: data.ballType,
    speciality: data.speciality,
    city: data.city,
    state: data.state,
    amount: fee,
    sentAt: new Date().toISOString(),
    subject,
    emailBody,
    htmlBody
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ccl_dispatched_emails') || '[]');
    existing.unshift(record);
    localStorage.setItem('ccl_dispatched_emails', JSON.stringify(existing.slice(0, 50)));
  } catch {
    // Ignore storage quota
  }

  console.log(`[EMAIL 1: REGISTRATION PENDING DISPATCHED -> ${data.email}]`, record);
  dispatchRealEmailViaApi({
    to: data.email,
    subject,
    html: htmlBody,
    text: emailBody,
    replyTo: COMPANY_OFFICIAL_EMAIL
  });
  return record;
};

/**
 * EMAIL 1 (Success Flow): Registration Details Confirmed
 * Dispatched to candidate when they complete registration, stating company name
 * and candidate details that they just registered with, and stating registration is done
 * (without stating that payment is pending).
 */
export const sendCandidateRegistrationDetailsEmail = (data: {
  name: string;
  email: string;
  phone: string;
  age: string | number;
  speciality: string;
  ballType: string;
  state: string;
  city: string;
  tempId: string;
  feeAmount?: number;
}): CandidateRegistrationEmail => {
  const fee = data.feeAmount || calculateRegistrationFee(data.ballType as any, data.speciality);
  const subject = `Registration Details Received - Champion Cricket League Season 2 [${data.tempId}]`;

  const emailBody = `
From: Champion Cricket League <registration@khelbharatofficial.com>
Reply-To: support@khelbharatofficial.com
To: ${data.name} <${data.email}>
Subject: ${subject}

Dear ${data.name},

Thank you for registering with Champion Cricket League (CCL), powered by Khel Bharat!

Your candidate registration details for Season 2 National Trials have been recorded successfully in our national trials roster.

==================================================
        CANDIDATE REGISTRATION DETAILS
==================================================
Registration Ref    : ${data.tempId}
Organization        : Champion Cricket League (CCL), powered by Khel Bharat
Candidate Full Name : ${data.name}
Age / Category      : ${data.age} Years (${Number(data.age) < 16 ? 'Under-16 Category' : 'Open / Senior Category'})
Mobile Number       : ${data.phone}
Email Address       : ${data.email}
Ball Category       : ${data.ballType} Ball Trial
Playing Speciality  : ${data.speciality}
Trial Location      : ${data.city}, ${data.state}
Registration Fee    : ₹${fee} (All-Inclusive)
Registration Status : Registered
==================================================

Your registration details have been synchronized with the CCL National Player Database.

Best regards,
Player Operations Board,
Champion Cricket League (CCL)
Powered by Khel Bharat
Official Support: support@khelbharatofficial.com
Helpline: 01169311383, 01169310488 (Monday to Saturday | 10:00 AM – 7:00 PM) | WhatsApp Only: +91 8800763536
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b1120; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b1120; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 28px 24px; text-align: center; border-bottom: 4px solid #f59e0b;">
              <span style="display: inline-block; background-color: #f59e0b; color: #0f172a; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; margin-bottom: 10px;">
                Registration Details Recorded
              </span>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800;">Champion Cricket League</h1>
              <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px; font-weight: 600;">Powered by Khel Bharat • Season 2 Trials</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 24px;">
              <p style="margin: 0 0 14px; font-size: 16px; font-weight: 700; color: #0f172a;">Dear ${data.name},</p>
              <p style="margin: 0 0 18px; font-size: 14px; line-height: 1.6; color: #475569;">
                Thank you for registering with <strong style="color: #0f172a;">Champion Cricket League (CCL), powered by Khel Bharat</strong>. Your candidate registration details have been received and saved into our national selection database.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                <tr>
                  <td style="background-color: #0f172a; color: #ffffff; padding: 12px 18px; font-size: 12px; font-weight: 800; text-transform: uppercase;">Registration Details</td>
                  <td style="background-color: #0f172a; color: #f59e0b; padding: 12px 18px; font-size: 12px; font-weight: 800; text-align: right; font-family: monospace;">${data.tempId}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 16px 18px;">
                    <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 13px;">
                      <tr><td width="40%" style="color: #64748b; font-weight: 600;">Player Name:</td><td style="color: #0f172a; font-weight: 700;">${data.name}</td></tr>
                      <tr><td style="color: #64748b; font-weight: 600;">Age & Category:</td><td style="color: #0f172a; font-weight: 700;">${data.age} Years (${Number(data.age) < 16 ? 'Under-16 Category' : 'Open / Senior Category'})</td></tr>
                      <tr><td style="color: #64748b; font-weight: 600;">Ball Preference:</td><td style="color: #dc2626; font-weight: 700;">${data.ballType} Ball Trial</td></tr>
                      <tr><td style="color: #64748b; font-weight: 600;">Speciality:</td><td style="color: #0f172a; font-weight: 700;">${data.speciality}</td></tr>
                      <tr><td style="color: #64748b; font-weight: 600;">Trial Center:</td><td style="color: #0f172a; font-weight: 700;">${data.city}, ${data.state}</td></tr>
                      <tr><td style="color: #64748b; font-weight: 600;">Status:</td><td><span style="background-color: #dcfce7; color: #15803d; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase;">Registered</span></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Champion Cricket League • Powered by Khel Bharat • support@khelbharatofficial.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  const record: CandidateRegistrationEmail = {
    id: `email_details_${Date.now()}`,
    emailType: 'payment_confirmed',
    recipientEmail: data.email,
    candidateName: data.name,
    registrationNumber: data.tempId,
    ballType: data.ballType,
    speciality: data.speciality,
    city: data.city,
    state: data.state,
    amount: fee,
    sentAt: new Date().toISOString(),
    subject,
    emailBody,
    htmlBody
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ccl_dispatched_emails') || '[]');
    existing.unshift(record);
    localStorage.setItem('ccl_dispatched_emails', JSON.stringify(existing.slice(0, 50)));
  } catch {
    // Ignore storage quota
  }

  console.log(`[EMAIL 1: REGISTRATION DETAILS DISPATCHED -> ${data.email}]`, record);
  dispatchRealEmailViaApi({
    to: data.email,
    subject,
    html: htmlBody,
    text: emailBody,
    replyTo: COMPANY_OFFICIAL_EMAIL
  });
  return record;
};

/**
 * EMAIL 2: Payment Successful / Registration Confirmed & Official Trial Admit Card
 * Dispatched to candidate immediately after successful payment verification.
 */
export const sendEmailToCandidate = (data: {
  name: string;
  email: string;
  age?: string | number;
  registrationNumber: string;
  ballType: string;
  speciality: string;
  city: string;
  state: string;
  paymentId: string;
  orderId?: string;
  reportingTime: string;
  feeAmount?: number;
}): CandidateRegistrationEmail => {
  const fee = data.feeAmount || calculateRegistrationFee(data.ballType as any, data.speciality);
  const ageCategory = getAgeCategoryLabel(data.age);
  const specialtyDisplay = `${data.speciality} (${data.ballType} Ball)`;
  const subject = `CCL Registration Confirmed – Payment Received [${data.registrationNumber}]`;
  const qrCode = `QR-${data.registrationNumber.slice(-6)}`;

  const emailBody = `
Subject: ${subject}

Hi ${data.name}, 🏏

Congratulations! Your payment of ₹${fee.toLocaleString('en-IN')}/- has been successfully received, and your registration for the Champion Cricket League (CCL) Trials is CONFIRMED.

Registration Number: ${data.registrationNumber}
Specialty: ${specialtyDisplay}
Category: ${ageCategory}
State: ${data.state}
Trial City / Hub: ${data.city}
Reporting Time Slot: ${data.reportingTime}
Payment Status: Paid (Confirmed)
Payment ID: ${data.paymentId}

MANDATORY REPORTING GUIDELINES:
1. Carry your original Date of Birth proof (Aadhaar Card / School Leaving Certificate). Age eligibility: 10 to 35 years.
2. Report in cricket whites or appropriate sports attire 30 minutes prior to your reporting slot.
3. Bring your personal cricket equipment (Bat, batting pads, gloves, or wicketkeeping gear).

For assistance, contact us at 01169311383 and 01169310488 or support@khelbharatofficial.com (WhatsApp Only: +91 8800763536)
Monday to Saturday | 10:00 AM – 7:00 PM

Best regards,
Team Champion Cricket League
Khel Bharat | Play. Perform. Get Recognized.
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b1120; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b1120; padding: 28px 12px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 28px rgba(0,0,0,0.35); border: 1px solid #1e293b;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1B3E8E 100%); padding: 28px 24px; text-align: center; border-bottom: 4px solid #10b981;">
              <span style="display: inline-block; background-color: #10b981; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 9999px; margin-bottom: 10px;">
                ✓ Payment Confirmed • Slot Reserved
              </span>
              <h1 style="margin: 0; color: #ffffff; font-size: 23px; font-weight: 900; letter-spacing: -0.3px;">
                Champion Cricket League
              </h1>
              <p style="margin: 5px 0 0; color: #cbd5e1; font-size: 13px; font-weight: 600;">
                Khel Bharat | Play. Perform. Get Recognized.
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 28px 26px;">
              <p style="margin: 0 0 14px; font-size: 16px; font-weight: 800; color: #0f172a;">
                Hi ${data.name}, 🏏
              </p>
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.65; color: #334155;">
                Congratulations! Your payment of <strong style="color: #065f46;">₹${fee.toLocaleString('en-IN')}/-</strong> has been verified and your registration for the <strong style="color: #0f172a;">Champion Cricket League (CCL) Trials</strong> is officially <strong style="color: #065f46;">CONFIRMED</strong>.
              </p>

              <!-- Official Registration & Admit Summary -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 12px; border: 2px dashed #1B3E8E; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="background-color: #0f172a; color: #ffffff; padding: 12px 16px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                    Official Trial Admit Card
                  </td>
                  <td align="right" style="background-color: #0f172a; color: #f59e0b; padding: 12px 16px; font-size: 13px; font-weight: 900; font-family: monospace;">
                    ${data.registrationNumber}
                  </td>
                </tr>
                <tr>
                  <td width="44%" style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">
                    Player Name:
                  </td>
                  <td width="56%" style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px; font-weight: 800;">
                    ${data.name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">
                    Registration Number:
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #1B3E8E; font-size: 13px; font-weight: 800; font-family: monospace;">
                    ${data.registrationNumber}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">
                    Specialty:
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px; font-weight: 700;">
                    ${specialtyDisplay}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">
                    Category:
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px; font-weight: 700;">
                    ${ageCategory}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">
                    State &amp; Trial Hub:
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px; font-weight: 700;">
                    ${data.city}, ${data.state}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">
                    Reporting Time:
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #1B3E8E; font-size: 13px; font-weight: 800;">
                    ${data.reportingTime}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">
                    Payment Status:
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #e2e8f0;">
                    <span style="display: inline-block; background-color: #ecfdf5; color: #065f46; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; border: 1px solid #a7f3d0;">
                      Paid (Confirmed) • ₹${fee.toLocaleString('en-IN')}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; color: #64748b; font-size: 13px; font-weight: 600;">
                    Payment ID / QR:
                  </td>
                  <td style="padding: 11px 16px; color: #475569; font-size: 12px; font-family: monospace;">
                    ${data.paymentId} • ${qrCode}
                  </td>
                </tr>
              </table>

              <!-- Mandatory Checklist -->
              <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 16px; margin-bottom: 22px;">
                <h4 style="margin: 0 0 8px; font-size: 12px; font-weight: 800; color: #92400e; text-transform: uppercase;">
                  Mandatory Trial Reporting Checklist
                </h4>
                <ol style="margin: 0; padding-left: 18px; font-size: 12px; line-height: 1.6; color: #78350f;">
                  <li>Carry original Date of Birth proof (Aadhaar Card or School Leaving Certificate). Age limit: 10 to 35 years.</li>
                  <li>Report in cricket whites or sports attire 30 minutes prior to your reporting slot.</li>
                  <li>Bring your personal cricket kit (bat, pads, gloves, or wicketkeeping gear).</li>
                </ol>
              </div>

              <!-- Assistance Block -->
              <div style="background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; padding: 14px 16px; margin-bottom: 22px; font-size: 12px; line-height: 1.6; color: #475569;">
                For assistance, contact us at <strong style="color: #0f172a;">01169311383</strong> and <strong style="color: #0f172a;">01169310488</strong>, WhatsApp Only: <strong style="color: #0f172a;">+91 8800763536</strong>, or <a href="mailto:support@khelbharatofficial.com" style="color: #1B3E8E; font-weight: 700; text-decoration: none;">support@khelbharatofficial.com</a>
                <br>
                <span style="color: #64748b; font-weight: 600;">Monday to Saturday | 10:00 AM – 7:00 PM</span>
              </div>

              <!-- Sign Off -->
              <p style="margin: 0; font-size: 13px; line-height: 1.65; color: #334155;">
                Best regards,<br>
                <strong style="color: #0f172a;">Team Champion Cricket League</strong><br>
                <span style="color: #1B3E8E; font-weight: 700;">Khel Bharat | Play. Perform. Get Recognized.</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; color: #94a3b8; padding: 18px 24px; text-align: center; font-size: 11px; border-top: 1px solid #1e293b;">
              Champion Cricket League (CCL) • Powered by Khel Bharat • Copyright © 2026
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  const record: CandidateRegistrationEmail = {
    id: `email_confirmed_${Date.now()}`,
    emailType: 'payment_confirmed',
    recipientEmail: data.email,
    candidateName: data.name,
    registrationNumber: data.registrationNumber,
    ballType: data.ballType,
    speciality: data.speciality,
    city: data.city,
    state: data.state,
    reportingTime: data.reportingTime,
    paymentId: data.paymentId,
    orderId: data.orderId,
    amount: fee,
    sentAt: new Date().toISOString(),
    subject,
    emailBody,
    htmlBody
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ccl_dispatched_emails') || '[]');
    existing.unshift(record);
    localStorage.setItem('ccl_dispatched_emails', JSON.stringify(existing.slice(0, 50)));
  } catch {
    // Ignore storage quota
  }

  console.log(`[EMAIL 2: REGISTRATION CONFIRMED DISPATCHED -> ${data.email}]`, record);
  dispatchRealEmailViaApi({
    to: data.email,
    subject,
    html: htmlBody,
    text: emailBody,
    replyTo: COMPANY_OFFICIAL_EMAIL
  });
  return record;
};

/**
 * Sends email to website owner / company about the payment completed for the candidate
 */
export const sendPaymentEmailToCompany = (data: {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateAge: string | number;
  ballType: string;
  speciality: string;
  trialLocation: string;
  registrationNumber: string;
  paymentId: string;
  orderId: string;
  amount?: number;
}): CompanyPaymentNotificationEmail => {
  const subject = `Payment Done: Candidate ${data.candidateName} Registered [${data.registrationNumber}]`;

  const emailBody = `
ATTENTION: Champion Cricket League Administration / Website Owner

A new candidate has completed their payment via Razorpay Checkout and successfully registered for Season 2 Trials.

==================================================
        CANDIDATE PAYMENT & REGISTRATION
==================================================
Registration No.    : ${data.registrationNumber}
Candidate Full Name : ${data.candidateName}
Mobile (WhatsApp)   : ${data.candidatePhone}
Email Address       : ${data.candidateEmail}
Age                 : ${data.candidateAge}
Playing Specialty   : ${data.speciality}
Ball Category       : ${data.ballType} Ball Trial
Trial Location      : ${data.trialLocation}
Payment Gateway     : Razorpay Standard Checkout
Payment Status      : COMPLETED & SETTLED
Razorpay Payment ID : ${data.paymentId}
Razorpay Order ID   : ${data.orderId}
Timestamp           : ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
==================================================

Action Items:
- Player has been issued their official digital admit card.
- Player details added to the state selector roster for ${data.trialLocation}.
- An automated registration confirmation email has been dispatched to ${data.candidateEmail}.

System Notification,
Champion Cricket League Payment Automation Engine
`.trim();

  const record: CompanyPaymentNotificationEmail = {
    id: `email_comp_${Date.now()}`,
    recipientEmail: COMPANY_OWNER_EMAIL,
    candidateName: data.candidateName,
    candidateEmail: data.candidateEmail,
    candidatePhone: data.candidatePhone,
    candidateAge: data.candidateAge,
    ballType: data.ballType,
    speciality: data.speciality,
    trialLocation: data.trialLocation,
    registrationNumber: data.registrationNumber,
    paymentId: data.paymentId,
    orderId: data.orderId,
    amount: data.amount,
    sentAt: new Date().toISOString(),
    subject,
    emailBody
  };

  try {
    const existing = JSON.parse(localStorage.getItem('ccl_company_payment_emails') || '[]');
    existing.unshift(record);
    localStorage.setItem('ccl_company_payment_emails', JSON.stringify(existing.slice(0, 50)));

    // Save into main registrations list for company
    const registrations = JSON.parse(localStorage.getItem('ccl_company_registrations') || '[]');
    registrations.unshift({
      ...data,
      paymentStatus: 'completed',
      registeredAt: new Date().toISOString()
    });
    localStorage.setItem('ccl_company_registrations', JSON.stringify(registrations.slice(0, 100)));
  } catch {
    // Ignore storage quota
  }

  console.log(`[EMAIL DISPATCHED TO COMPANY OWNER -> ${COMPANY_OWNER_EMAIL}]`, record);
  dispatchRealEmailViaApi({
    to: COMPANY_OWNER_EMAIL,
    subject,
    text: emailBody,
    replyTo: data.candidateEmail,
    isOwnerNotification: true
  });
  return record;
};
