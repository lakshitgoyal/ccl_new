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
export const GMAIL_BACKUP_NOTIFICATION_EMAIL = 'khelbharat2026@gmail.com';

/**
 * Dispatches real emails via the backend SMTP route (/api/send-email)
 * backed by the official Gmail SMTP transport.
 */
export const dispatchRealEmailViaApi = async (options: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
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
    to: `${COMPANY_OWNER_EMAIL}, ${GMAIL_BACKUP_NOTIFICATION_EMAIL}`,
    subject,
    text: emailBody,
    replyTo: details.email
  });
  return pendingRecord;
};

/**
 * EMAIL 1: Registration Received & Pending Payment Guidance
 * Dispatched to the candidate immediately when their details are submitted,
 * clearly guiding them to complete payment via UPI Apps / Cards.
 */
import { calculateRegistrationFee } from '../data/cclData';

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
  const subject = `Registration Received - Complete Your Payment for Season 2 Trials [${data.tempId}]`;

  const emailBody = `
From: Champion Cricket League <registration@khelbharatofficial.com>
Reply-To: support@khelbharatofficial.com
To: ${data.name} <${data.email}>
Subject: ${subject}

Dear ${data.name},

Thank you for registering for Champion Cricket League Season 2 Trials!

Your registration details have been received and a provisional trial slot has been reserved for you. To confirm your slot, generate your official Trial Admit Card, and lock in your trial date & reporting schedule, please complete your registration fee payment.

==================================================
        CANDIDATE REGISTRATION SUMMARY
==================================================
Provisional Ref ID : ${data.tempId}
Candidate Full Name: ${data.name}
Age / Category     : ${data.age} Years (${Number(data.age) < 16 ? 'Under-16' : 'Open/Senior'})
Mobile Number      : ${data.phone}
Email Address      : ${data.email}
Ball Category      : ${data.ballType} Ball Trial
Playing Speciality : ${data.speciality}
Trial Location     : ${data.city}, ${data.state}
Registration Fee   : ₹${fee} (Inclusive of GST & Official Jersey kit)
Payment Status     : PENDING (Action Required)
==================================================

HOW TO COMPLETE YOUR PAYMENT:
1. Return to the registration screen or open your payment window.
2. Select your preferred payment method:
   - All major UPI Apps: PhonePe, Google Pay, Paytm, BHIM, CRED
   - Credit / Debit Cards (Visa, MasterCard, RuPay) & Net Banking
3. After completing the payment, your official Admit Card with QR verification code and exact reporting time will be issued instantly.

IMPORTANT NOTICE:
- Your provisional trial slot is held for 48 hours pending payment.
- Once payment is confirmed, an official Trial Admit Card with reporting guidelines will be sent to your email.
- You will need to bring an original Date of Birth proof (Aadhaar Card / School Leaving Certificate) on trial day.

Need help? Contact our National Helpdesk:
Email: support@khelbharatofficial.com
Helpline: 011 69311383
WhatsApp: +91 8800763536

Best regards,
Player Operations Board,
Champion Cricket League (CCL)
Powered by Khel Bharat
www.khelbharatofficial.com
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
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b1120; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3); border: 1px solid #1e293b;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 28px 24px; text-align: center; border-bottom: 4px solid #f59e0b;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background-color: #f59e0b; color: #0f172a; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; margin-bottom: 10px;">
                      Official Registration Notice
                    </span>
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                      Champion Cricket League
                    </h1>
                    <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px; font-weight: 600;">
                      Powered by Khel Bharat • Season 2 Trials
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Status Alert Bar -->
          <tr>
            <td style="background-color: #fffbeb; border-bottom: 1px solid #fef3c7; padding: 14px 24px; text-align: center;">
              <span style="color: #b45309; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">
                ⏳ Action Required: Complete Payment to Confirm Trial Slot
              </span>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 28px 24px;">
              <p style="margin: 0 0 14px; font-size: 16px; font-weight: 700; color: #0f172a;">
                Dear ${data.name},
              </p>
              <p style="margin: 0 0 18px; font-size: 14px; line-height: 1.6; color: #475569;">
                Thank you for submitting your details for the <strong style="color: #0f172a;">Champion Cricket League Season 2 National Trials</strong>. Your candidate registration details have been received and a provisional trial slot is currently held for you.
              </p>
              <p style="margin: 0 0 22px; font-size: 14px; line-height: 1.6; color: #475569;">
                To lock in your trial date, receive your official digital Admit Card, and confirm your jersey kit, please complete the registration fee payment below.
              </p>

              <!-- Registration Summary Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="background-color: #0f172a; color: #ffffff; padding: 12px 18px; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                    Candidate Registration Summary
                  </td>
                  <td style="background-color: #0f172a; color: #f59e0b; padding: 12px 18px; font-size: 12px; font-weight: 800; text-align: right; font-family: monospace;">
                    ${data.tempId}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 16px 18px;">
                    <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 13px;">
                      <tr>
                        <td width="40%" style="color: #64748b; font-weight: 600;">Candidate Name:</td>
                        <td width="60%" style="color: #0f172a; font-weight: 700;">${data.name}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Age & Category:</td>
                        <td style="color: #0f172a; font-weight: 700;">${data.age} Years (${Number(data.age) < 16 ? 'Under-16 Category' : 'Open / Senior Category'})</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Ball Preference:</td>
                        <td style="color: #dc2626; font-weight: 700;">${data.ballType} Ball Trial</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Playing Speciality:</td>
                        <td style="color: #0f172a; font-weight: 700;">${data.speciality}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Trial Center:</td>
                        <td style="color: #0f172a; font-weight: 700;">${data.city}, ${data.state}</td>
                      </tr>
                      <tr style="border-top: 1px dashed #cbd5e1;">
                        <td style="color: #64748b; font-weight: 600; padding-top: 12px;">Registration Fee:</td>
                        <td style="color: #1e3a8a; font-weight: 800; font-size: 16px; padding-top: 12px;">₹${fee} <span style="font-size: 11px; font-weight: normal; color: #64748b;">(All Inclusive)</span></td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Status:</td>
                        <td>
                          <span style="background-color: #fef3c7; color: #b45309; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase;">
                            Payment Pending
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Payment Guidance Box -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.5px;">
                  💳 How to Complete Your Payment
                </h3>
                <p style="margin: 0 0 12px; font-size: 13px; line-height: 1.5; color: #15803d;">
                  Return to your registration portal or checkout window to pay instantly using any accepted method:
                </p>
                <table width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size: 12px; color: #1e293b;">
                  <tr>
                    <td style="padding: 4px 0;"><strong>• UPI Apps:</strong> PhonePe, Google Pay, Paytm, BHIM, CRED (Instant confirmation)</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0;"><strong>• Cards & Banking:</strong> Credit/Debit Cards (Visa, Mastercard, RuPay) & Net Banking</td>
                  </tr>
                </table>
              </div>

              <!-- Important Notes -->
              <div style="border-left: 3px solid #f59e0b; padding-left: 14px; margin-bottom: 24px;">
                <p style="margin: 0 0 6px; font-size: 12px; font-weight: 700; color: #0f172a;">
                  Important Guidelines for Candidates:
                </p>
                <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: #64748b; line-height: 1.6;">
                  <li>Provisional slot is held for 48 hours from the time of registration.</li>
                  <li>Original Date of Birth proof (Aadhaar Card / School ID) is mandatory on trial day.</li>
                  <li>Official Admit Card and trial reporting slot will be issued immediately upon payment.</li>
                </ul>
              </div>

              <!-- Support Desk -->
              <table width="100%" cellpadding="12" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 12px; color: #475569;">
                <tr>
                  <td>
                    <strong style="color: #0f172a; display: block; margin-bottom: 4px;">National Player Support & Assistance:</strong>
                    Email: <a href="mailto:support@khelbharatofficial.com" style="color: #1e3a8a; text-decoration: none; font-weight: 700;">support@khelbharatofficial.com</a> | 
                    Helpline: <strong style="color: #0f172a;">011 69311383</strong> | 
                    WhatsApp: <strong style="color: #0f172a;">+91 8800763536</strong>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; color: #94a3b8; padding: 20px 24px; text-align: center; font-size: 11px; line-height: 1.6; border-top: 1px solid #1e293b;">
              <p style="margin: 0 0 4px; font-weight: 700; color: #e2e8f0;">
                Champion Cricket League (CCL) • Powered by Khel Bharat
              </p>
              <p style="margin: 0; color: #64748b;">
                Sent from official automated system: <span style="color: #f59e0b;">registration@khelbharatofficial.com</span>
              </p>
              <p style="margin: 6px 0 0; color: #475569; font-size: 10px;">
                This is an automated operational notification regarding your Season 2 registration.
              </p>
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
Helpline: 011 69311383 | WhatsApp: +91 8800763536
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
  const subject = `Registration Confirmed - Season 2 Trials [${data.registrationNumber}]`;
  const qrCode = `QR-${data.registrationNumber.slice(-6)}`;

  const emailBody = `
From: Champion Cricket League <registration@khelbharatofficial.com>
Reply-To: support@khelbharatofficial.com
To: ${data.name} <${data.email}>
Subject: ${subject}

Dear ${data.name},

Registration Confirmed - Your trial slot has been reserved successfully. A confirmation email will be sent to your email ID within 24 hours.

Congratulations! Your payment of ₹${fee} has been successfully verified, and your registration for Champion Cricket League Season 2 National Trials is officially CONFIRMED.

==================================================
        OFFICIAL TRIAL ADMIT CARD
==================================================
Registration Number : ${data.registrationNumber}
Candidate Full Name : ${data.name}
Ball Preference     : ${data.ballType} Ball Trial
Playing Speciality  : ${data.speciality}
Trial Venue / City  : ${data.city}, ${data.state}
Reporting Time Slot : ${data.reportingTime}
Payment Status      : PAID (CONFIRMED)
Razorpay Payment ID : ${data.paymentId}
Verification QR     : ${qrCode}
==================================================

CCL 100-POINT MERIT CALCULATOR EVALUATION:
Your trial match and nets performance will be evaluated based on the official CCL merit points system:
- 1 Run      = 1 Point
- 1 Wicket   = 20 Points
- 1 Runout   = 5 Points
- 1 Catch    = 5 Points
- 1 Stumping = 10 Points

MANDATORY REPORTING GUIDELINES:
1. Carry your original Date of Birth proof (Aadhaar Card / School Leaving Certificate). Age eligibility: 8 to 35 years.
2. Report in cricket whites or appropriate sports attire 30 minutes prior to your reporting slot.
3. Bring your personal cricket equipment (Bat, batting pads, gloves, or wicketkeeping gear).
4. Official trial jersey and match videography identification bib will be issued at the registration desk.

CARRIER PATHWAY:
Trials → Selection → Competitive Matches → Camps → Advanced League Stages

For queries or immediate support, contact our National Helpdesk:
Email: support@khelbharatofficial.com
Helpline: 011 69311383
WhatsApp: +91 8800763536

Best wishes for your trials!
Management Board,
Champion Cricket League (CCL)
Powered by Khel Bharat
www.khelbharatofficial.com
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
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b1120; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.35); border: 1px solid #1e293b;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 30px 24px; text-align: center; border-bottom: 4px solid #10b981;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background-color: #10b981; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 9999px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(16,185,129,0.3);">
                      ✓ Payment Verified • Confirmed
                    </span>
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">
                      Champion Cricket League
                    </h1>
                    <p style="margin: 5px 0 0; color: #fbbf24; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;">
                      Season 2 National Trials • Official Admit Card
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Required User Notice Banner -->
          <tr>
            <td style="background-color: #ecfdf5; border-bottom: 1px solid #a7f3d0; padding: 16px 24px; text-align: center;">
              <p style="margin: 0; font-size: 13px; font-weight: 800; color: #065f46; line-height: 1.5;">
                Registration Confirmed - Your trial slot has been reserved successfully. A confirmation email will be sent to your email ID within 24 hours.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 28px 24px;">
              <p style="margin: 0 0 16px; font-size: 16px; font-weight: 800; color: #0f172a;">
                Congratulations, ${data.name}!
              </p>
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #475569;">
                Your payment has been successfully verified and settled. Below is your official <strong style="color: #0f172a;">Digital Trial Admit Card</strong>. Please preserve this email and keep your Registration Number handy during trial day reporting.
              </p>

              <!-- OFFICIAL ADMIT CARD CONTAINER -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 14px; border: 2px dashed #1e3a8a; margin-bottom: 24px; overflow: hidden;">
                <!-- Admit Card Header -->
                <tr>
                  <td style="background-color: #0f172a; padding: 14px 20px; border-bottom: 2px solid #334155;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <span style="color: #f59e0b; font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; display: block;">
                            Official Candidate Pass
                          </span>
                          <span style="color: #ffffff; font-size: 14px; font-weight: 800;">
                            Season 2 Trials Admit Card
                          </span>
                        </td>
                        <td align="right">
                          <span style="color: #94a3b8; font-size: 10px; font-weight: 700; text-transform: uppercase; display: block;">
                            Reg Number
                          </span>
                          <span style="color: #ffffff; font-family: monospace; font-size: 13px; font-weight: 900; background-color: #1e293b; padding: 3px 8px; border-radius: 4px; border: 1px solid #475569;">
                            ${data.registrationNumber}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Details Grid -->
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 13px;">
                      <tr>
                        <td width="38%" style="color: #64748b; font-weight: 600;">Candidate Name:</td>
                        <td width="62%" style="color: #0f172a; font-weight: 800; font-size: 14px;">${data.name}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Ball Category:</td>
                        <td style="color: #dc2626; font-weight: 800;">${data.ballType} Ball Trial</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Playing Specialty:</td>
                        <td style="color: #0f172a; font-weight: 700;">${data.speciality}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Trial Venue / City:</td>
                        <td style="color: #0f172a; font-weight: 700;">${data.city}, ${data.state}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Reporting Slot:</td>
                        <td style="color: #1e3a8a; font-weight: 800;">${data.reportingTime}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Payment Status:</td>
                        <td>
                          <span style="background-color: #ecfdf5; color: #065f46; font-weight: 800; font-size: 11px; padding: 3px 8px; border-radius: 6px; border: 1px solid #a7f3d0;">
                            PAID (CONFIRMED) • ₹${fee}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Razorpay Txn ID:</td>
                        <td style="color: #475569; font-family: monospace; font-size: 12px;">${data.paymentId}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Verification Token:</td>
                        <td style="color: #1e3a8a; font-weight: 800; font-family: monospace;">${qrCode}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CCL 100-Point Merit Calculator Info -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f5f9; border-radius: 12px; margin-bottom: 24px; padding: 16px; border: 1px solid #e2e8f0;">
                <tr>
                  <td>
                    <h4 style="margin: 0 0 8px; font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
                      📊 CCL 100-Point Merit Evaluation System
                    </h4>
                    <p style="margin: 0 0 10px; font-size: 12px; color: #475569; line-height: 1.5;">
                      During trials and match simulations, players earn evaluation points directly based on on-field performance:
                    </p>
                    <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 12px; text-align: center;">
                      <tr style="background-color: #ffffff; font-weight: 700;">
                        <td style="border: 1px solid #e2e8f0; border-radius: 6px 0 0 6px; padding: 8px 4px;">1 Run<br><span style="color: #1e3a8a; font-weight: 800;">1 Point</span></td>
                        <td style="border: 1px solid #e2e8f0; padding: 8px 4px;">1 Wicket<br><span style="color: #dc2626; font-weight: 800;">20 Points</span></td>
                        <td style="border: 1px solid #e2e8f0; padding: 8px 4px;">1 Runout<br><span style="color: #d97706; font-weight: 800;">5 Points</span></td>
                        <td style="border: 1px solid #e2e8f0; padding: 8px 4px;">1 Catch<br><span style="color: #16a34a; font-weight: 800;">5 Points</span></td>
                        <td style="border: 1px solid #e2e8f0; border-radius: 0 6px 6px 0; padding: 8px 4px;">1 Stumping<br><span style="color: #7c3aed; font-weight: 800;">10 Points</span></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Reporting Guidelines -->
              <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <h4 style="margin: 0 0 10px; font-size: 13px; font-weight: 800; color: #92400e; text-transform: uppercase;">
                  ⚠️ Mandatory Trial Reporting Checklist:
                </h4>
                <ol style="margin: 0; padding-left: 18px; font-size: 12px; line-height: 1.6; color: #78350f;">
                  <li><strong>Original Date of Birth Proof:</strong> Carry Aadhaar Card or School Leaving Certificate. (Age criteria: 8 to 35 years).</li>
                  <li><strong>Dress Code:</strong> Report in cricket whites or appropriate sports attire 30 minutes prior to reporting slot.</li>
                  <li><strong>Equipment:</strong> Bring your personal cricket equipment (Bat, batting pads, gloves, or wicketkeeping gloves).</li>
                  <li><strong>Jersey & Videography:</strong> Official trial jersey and match videography bib will be provided at the verification counter.</li>
                </ol>
              </div>

              <!-- Pathway Summary -->
              <div style="text-align: center; padding: 12px 16px; background-color: #0f172a; border-radius: 10px; margin-bottom: 24px;">
                <span style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 2px;">
                  Your Cricket Pathway
                </span>
                <span style="font-size: 12px; font-weight: 700; color: #ffffff;">
                  Trials ➔ Selection ➔ Competitive Matches ➔ Camps ➔ Advanced League
                </span>
              </div>

              <!-- Helpdesk Contact -->
              <table width="100%" cellpadding="12" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 12px; color: #475569;">
                <tr>
                  <td>
                    <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Player Helpdesk & Assistance:</strong>
                    Email: <a href="mailto:support@khelbharatofficial.com" style="color: #1e3a8a; text-decoration: none; font-weight: 700;">support@khelbharatofficial.com</a> | 
                    Helpline: <strong style="color: #0f172a;">011 69311383</strong> | 
                    WhatsApp: <strong style="color: #0f172a;">+91 8800763536</strong>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; color: #94a3b8; padding: 22px 24px; text-align: center; font-size: 11px; line-height: 1.6; border-top: 1px solid #1e293b;">
              <p style="margin: 0 0 4px; font-weight: 800; color: #ffffff;">
                Champion Cricket League • Powered by Khel Bharat
              </p>
              <p style="margin: 0; color: #64748b;">
                Sent from official system: <span style="color: #f59e0b;">registration@khelbharatofficial.com</span>
              </p>
              <p style="margin: 6px 0 0; color: #475569; font-size: 10px;">
                Copyright © 2026 Champion Cricket League. All rights reserved.
              </p>
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
    to: `${COMPANY_OWNER_EMAIL}, ${GMAIL_BACKUP_NOTIFICATION_EMAIL}`,
    subject,
    text: emailBody,
    replyTo: data.candidateEmail
  });
  return record;
};
