import React from 'react';
import { ShieldCheck, AlertCircle, FileText, CheckCircle } from 'lucide-react';

interface PoliciesPageProps {
  policyType: 'registration' | 'privacy' | 'refund' | 'terms';
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ policyType }) => {
  return (
    <div className="py-12 bg-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {policyType === 'registration' && (
          <div className="space-y-6">
            <span className="text-xs font-bold text-[#1B3E8E] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block">
              Official Regulations
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              Registration Policy
            </h1>
            
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                1. <strong>Eligibility:</strong> Champion Cricket League is open to male cricket players across India. Under-16 participants must be under 16 years of age on the official trial date. The Open category is available for candidates aged 16 to 35.
              </p>
              <p>
                2. <strong>Trial Allotment:</strong> Upon completing registration and payment, each candidate is assigned a unique Registration Identification Number (e.g. CCLREG-2026-XXXXX). This registration number is non-transferable.
              </p>
              <p>
                3. <strong>Dress Code & Gear:</strong> Players must report in white cricket trousers and shirt or proper sports athletic attire. For leather ball trials, players are advised to carry their personal abdominal guard, pads, and gloves; match leather balls and certified helmets are provided at the nets.
              </p>
              <p>
                4. <strong>Scouting Integrity:</strong> All trial net sessions are conducted under high-resolution cameras with independent BCCI/State-certified selectors. The decisions of the technical selection panel are final.
              </p>
            </div>
          </div>
        )}

        {policyType === 'refund' && (
          <div className="space-y-6">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full inline-block">
              Financial Policies
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              Refund & Cancellation Policy
            </h1>
            
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900">
                <strong>Important Notice:</strong> Trial registration slots are strictly limited per venue to ensure guaranteed coach interaction.
              </div>
              <p>
                1. <strong>Non-Refundable Registration:</strong> Due to upfront arrangements for grounds, equipment, customized official jerseys, and selector logistics, trial registration fees are non-refundable once payment is completed.
              </p>
              <p>
                2. <strong>Candidate Rescheduling:</strong> If a candidate is unable to attend their assigned trial date due to unforeseen circumstances or certified health reasons, CCL permits transfer of the registration to another trial date or adjacent venue, provided prior notice is given to our helpline.
              </p>
              <p>
                3. <strong>Program Postponement:</strong> If the academy cancels a program due to unforeseen circumstances, we will offer a rescheduled date.
              </p>
            </div>
          </div>
        )}

        {policyType === 'privacy' && (
          <div className="space-y-6">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full inline-block">
              Data Protection
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              Privacy Policy
            </h1>
            
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                1. <strong>Information Collection:</strong> We collect personal information including full name, date of birth, contact phone number, email address, physical address, and athletic profile for the purpose of tournament administration and player identification.
              </p>
              <p>
                2. <strong>Payment Data Security:</strong> All financial transactions are processed directly through PCI-DSS Level 1 certified payment gateways. Champion Cricket League does not store your credit/debit card numbers or UPI PINs on its servers.
              </p>
              <p>
                3. <strong>Media Consent:</strong> By participating in CCL trials and matches, players consent to being photographed and video-recorded for tournament telecasts, Cricheroes scoring statistics, and promotional sports highlights.
              </p>
              <p>
                4. <strong>Third-Party Sharing:</strong> We do not sell or rent player data to external marketing agencies. Contact information is solely shared with official lodging and sports medical partners (PhysicCare) for tournament logistics.
              </p>
            </div>
          </div>
        )}

        {policyType === 'terms' && (
          <div className="space-y-6">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full inline-block">
              Legal Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              Terms & Conditions
            </h1>
            
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                1. <strong>Acceptance:</strong> By accessing this website and completing trial registration, you agree to comply with all rules and regulations of Champion Cricket League and Khel Bharat Sports Promotion.
              </p>
              <p>
                2. <strong>Code of Conduct:</strong> Players, parents, and coaches are expected to uphold the highest standards of sportsmanship. Unsportsmanlike conduct, verbal abuse toward umpires or selectors, or physical misconduct will lead to immediate expulsion without refund.
              </p>
              <p>
                3. <strong>Medical Assumption of Risk:</strong> Cricket is an outdoor athletic sport involving hard leather balls and physical exertion. While CCL provides trained first responders and physiotherapists (PhysicCare), participants take part in trials at their own voluntary risk.
              </p>
              <p>
                4. <strong>Jurisdiction:</strong> All legal disputes arising out of the league, tournament registrations, or website services are subject to the exclusive jurisdiction of the courts in New Delhi, India.
              </p>
              <p className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800">
                5. <strong>Intellectual Property:</strong> All content on website, including text, images, logos, and videos, is owned by Champion Cricket League and protected by copyright laws. You may not reproduce, distribute, or modify any of our content without prior written consent.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
