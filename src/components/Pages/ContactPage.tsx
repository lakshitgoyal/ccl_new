import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { dispatchRealEmailViaApi } from '../../services/notificationService';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    state: 'Delhi',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const escapeHtml = (val: string) =>
      val
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const safeName = escapeHtml(formState.name.trim());
    const safePhone = escapeHtml(formState.phone.trim());
    const safeEmail = escapeHtml(formState.email.trim());
    const safeState = escapeHtml((formState.state || 'Not specified').trim());
    const safeSubject = escapeHtml(formState.subject.trim());
    const safeMessage = escapeHtml(formState.message.trim()).replace(/\n/g, '<br/>');

    const textBody = [
      'NEW WEBSITE INQUIRY — CHAMPION CRICKET LEAGUE (CCL)',
      '==================================================',
      `Full Name       : ${formState.name.trim()}`,
      `Phone / WhatsApp: ${formState.phone.trim()}`,
      `Email Address   : ${formState.email.trim()}`,
      `State           : ${(formState.state || 'Not specified').trim()}`,
      `Subject         : ${formState.subject.trim()}`,
      `Submitted At    : ${timestamp} IST`,
      '==================================================',
      '',
      'Message:',
      formState.message.trim(),
    ].join('\n');

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f172a; color: #ffffff; padding: 20px 24px;">
          <div style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #fbbf24; font-weight: bold;">Champion Cricket League • Contact Us</div>
          <h2 style="margin: 6px 0 0; font-size: 20px;">New Website Inquiry</h2>
        </div>
        <div style="padding: 24px; background: #ffffff; color: #1e293b;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #64748b; width: 150px;"><strong>Full Name</strong></td><td style="padding: 8px 0;">${safeName}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;"><strong>Phone / WhatsApp</strong></td><td style="padding: 8px 0;">${safePhone}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;"><strong>Email Address</strong></td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #1B3E8E;">${safeEmail}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;"><strong>State</strong></td><td style="padding: 8px 0;">${safeState}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;"><strong>Subject</strong></td><td style="padding: 8px 0;">${safeSubject}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;"><strong>Submitted At</strong></td><td style="padding: 8px 0;">${timestamp} IST</td></tr>
          </table>
          <div style="margin-top: 18px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold; margin-bottom: 6px;">Message / Questions</div>
            <div style="font-size: 14px; line-height: 1.6; color: #0f172a;">${safeMessage}</div>
          </div>
        </div>
      </div>
    `;

    const result = await dispatchRealEmailViaApi({
      to: 'support@khelbharatofficial.com',
      replyTo: formState.email.trim(),
      subject: `[CCL Inquiry] ${formState.subject.trim()} — ${formState.name.trim()}`,
      text: textBody,
      html: htmlBody,
      isOwnerNotification: false
    });

    setIsSubmitting(false);

    if (result?.success) {
      setSubmitted(true);
      setFormState({
        name: '',
        phone: '',
        email: '',
        state: 'Delhi',
        subject: '',
        message: ''
      });
    } else {
      setSubmitError(
        result?.error ||
          'We could not deliver your inquiry right now. Please try again or reach us at support@khelbharatofficial.com / WhatsApp +91 8800763536.'
      );
    }
  };

  return (
    <div className="py-12 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#1B3E8E] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Contact Champion Cricket League
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Have questions regarding trial schedules, reporting documents, fee receipts, or coaching partnerships? Our dedicated sports support team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Details Column */}
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Direct Contact Channels</h3>

              <a
                href="https://wa.me/918800763536"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-green-500 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium">Official WhatsApp (WhatsApp Only)</span>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                    +91 8800763536
                  </div>
                  <span className="text-[11px] text-slate-400">WhatsApp number only • Instant trial assistance</span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#1B3E8E] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium">Central Helpline</span>
                  <div className="text-sm font-bold text-slate-900 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <a href="tel:01169311383" className="hover:text-[#1B3E8E] transition-colors">01169311383</a>
                    <span className="text-slate-300">|</span>
                    <a href="tel:01169310488" className="hover:text-[#1B3E8E] transition-colors">01169310488</a>
                  </div>
                  <span className="text-[11px] text-slate-400">Monday to Saturday | 10:00 AM – 7:00 PM</span>
                </div>
              </div>

              <a
                href="mailto:support@khelbharatofficial.com"
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium">Official Inquiries & Support</span>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-[#1B3E8E] transition-colors break-all">
                    support@khelbharatofficial.com
                  </div>
                  <span className="text-[11px] text-slate-400">Response within 24 hours</span>
                </div>
              </a>
            </div>

            {/* Address */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Headquarters & Registration Office</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                Champion Cricket League Office<br />
                Building number 13, Beside Triumph Showroom, Dwarka, Delhi -110078
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out to Champion Cricket League. Our team will review your query and get back to you via phone or email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#1B3E8E] text-white text-xs font-bold rounded-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Fill out the form below and our regional coordinator will connect with you.
                  </p>

                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Amit Kumar"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Your State
                      </label>
                      <input
                        type="text"
                        value={formState.state}
                        onChange={(e) => setFormState({ ...formState, state: e.target.value })}
                        placeholder="e.g. Delhi, Gujarat, UP"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Query Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Trial Venue in Ahmedabad / Admit Card inquiry"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Message / Questions *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Type your message here..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#1B3E8E] hover:bg-[#142e6b] text-white font-bold rounded-xl text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
