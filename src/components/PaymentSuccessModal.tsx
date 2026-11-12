import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  Printer, 
  ExternalLink, 
  X, 
  Copy, 
  Check, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  FileText
} from 'lucide-react';
import { RegistrationRecord } from '../types';
import { calculateRegistrationFee } from '../data/cclData';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: RegistrationRecord;
  onViewAdmitCard: () => void;
  onPrintSlip: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  record,
  onViewAdmitCard,
  onPrintSlip
}) => {
  const [copied, setCopied] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  if (!isOpen) return null;

  const handleCopyRegNo = () => {
    navigator.clipboard.writeText(record.registrationNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
        
        {/* Top Header / Success Banner with Glow */}
        <div className="relative bg-gradient-to-br from-slate-950 via-[#0a1e3f] to-[#0f172a] text-white p-6 sm:p-7 text-center overflow-hidden border-b border-slate-800">
          {/* Decorative Background Elements */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated Success Badge */}
          <div className="relative inline-flex items-center justify-center mb-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center ring-8 ring-emerald-500/10 shadow-lg">
              <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>

          <span className="block text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">
            Transaction Confirmed & Verified
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Payment Successful!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Champion Cricket League • Season 2 National Trials
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-800">

          {/* User Confirmation Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 sm:p-5 text-center shadow-xs">
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full mb-1.5">
              Registration Confirmed
            </span>
            <p className="text-xs sm:text-sm font-black text-emerald-950 leading-relaxed max-w-md mx-auto">
              Registration Confirmed - Your trial slot has been reserved successfully. A confirmation email will be sent to your email ID within 24 hours.
            </p>
            <div className="mt-2 text-[11px] text-emerald-800 font-semibold flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Admit Card & receipt dispatched to <strong>{record.email}</strong></span>
            </div>
          </div>

          {/* Transaction Summary Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Official Registration Number
                </span>
                <span className="font-mono text-base sm:text-lg font-black text-[#1B3E8E]">
                  {record.registrationNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyRegNo}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Grid of Details */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate Name</span>
                <span className="font-extrabold text-slate-900">{record.name}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Ball Preference</span>
                <span className="font-bold text-red-600">{record.ballType} Ball Trial</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Playing Speciality</span>
                <span className="font-bold text-slate-800">{record.speciality}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Trial Location</span>
                <span className="font-bold text-slate-800">{record.trialLocation || `${record.city}, ${record.state}`}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Reporting Slot</span>
                <span className="font-bold text-[#1B3E8E]">{record.reportingTime || '08:30 AM IST'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Amount Paid</span>
                <span className="font-black text-emerald-700">₹{record.feeAmount || calculateRegistrationFee(record.ballType, record.speciality)} (PAID)</span>
              </div>
            </div>

            {/* Razorpay Meta */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-1">
              <span>Razorpay Txn ID: <strong className="font-mono text-slate-700">{record.paymentId}</strong></span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified & Secured
              </span>
            </div>
          </div>

          {/* Quick Trial Day Instructions */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950 space-y-1">
            <span className="font-extrabold text-[11px] uppercase tracking-wider text-amber-900 block">
              Trial Day Checklist:
            </span>
            <ul className="text-[11px] text-amber-900/90 space-y-1 list-disc pl-4">
              <li>Carry original Date of Birth proof (Aadhaar Card / School ID).</li>
              <li>Report in cricket whites or appropriate sports attire 30 mins before your slot.</li>
              <li>Bring personal cricket equipment (Bat, pads, gloves, or keeping gear).</li>
              <li>Official trial jersey will be distributed at the reporting desk.</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={onViewAdmitCard}
              className="w-full py-3.5 bg-[#1B3E8E] hover:bg-[#142e6b] text-white font-black rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View & Print Official Admit Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onPrintSlip}
                className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-300 text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Print Slip</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Done</span>
              </button>
            </div>
          </div>

          {/* Support Footer */}
          <div className="text-center text-[11px] text-slate-500 pt-1">
            <span>Official Helpdesk: <strong>support@khelbharatofficial.com</strong> • 011 69311383</span>
          </div>

        </div>
      </div>
    </div>
  );
};
