import React, { useState } from 'react';
import { FileCheck, AlertCircle, CheckCircle2, Shield, Info, ArrowRight, ZoomIn, X, ExternalLink } from 'lucide-react';
import { BallType } from '../../types';

interface MandatoryDocsPageProps {
  onRegister: (ballType: BallType) => void;
}

export const MandatoryDocsPage: React.FC<MandatoryDocsPageProps> = ({ onRegister }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    photoId: true,
    photos: false,
    admitCard: false,
    medical: true
  });
  const [showAadhaarModal, setShowAadhaarModal] = useState(false);

  const toggleItem = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalCount = Object.keys(checkedItems).length;
  const readyCount = Object.values(checkedItems).filter(Boolean).length;
  const isAllReady = readyCount === totalCount;

  return (
    <div className="py-12 bg-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="mb-10">
          <span className="text-xs font-bold text-[#1B3E8E] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
            Trial Day Verification Protocol
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Mandatory Documents for Trial Reporting
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            To eliminate fraud and ensure sporting integrity, every participant must present original verification documents before taking the net trials. Check your readiness with our interactive checklist below.
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Your Document Readiness Score
            </span>
            <span className="text-xs font-bold text-amber-300">
              {readyCount} of {totalCount} Ready
            </span>
          </div>

          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full transition-all duration-300 ${
                isAllReady ? 'bg-emerald-500' : 'bg-amber-400'
              }`}
              style={{ width: `${(readyCount / totalCount) * 100}%` }}
            />
          </div>

          <div className="text-xs text-slate-300">
            {isAllReady ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                All mandatory verification documents are in order! You are ready for ground reporting.
              </span>
            ) : (
              <span>Please ensure you prepare all unchecked items before heading to the trial ground.</span>
            )}
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-4 mb-12">
          {/* Doc 1: Photo ID / Masked Aadhaar Card */}
          <div
            onClick={() => toggleItem('photoId')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
              checkedItems.photoId ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <input
              type="checkbox"
              checked={checkedItems.photoId}
              onChange={() => {}}
              className="w-5 h-5 rounded text-[#1B3E8E] focus:ring-[#1B3E8E] mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-bold text-slate-900 text-base">
                  1. Government Photo ID Proof (Aadhaar Card / Passport)
                </h3>
                <span className="text-[11px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                  Mandatory
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Original Aadhaar Card, Passport, or Voter ID for identity verification at the security desk. School ID card accepted for players under 14.
              </p>
              <div className="mt-3 p-3.5 bg-blue-50/90 border border-blue-200 rounded-xl flex items-start gap-2.5 text-blue-950">
                <Info className="w-4 h-4 text-[#1B3E8E] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                  Please carry a Masked Aadhaar Card — only the last 4 digits of your Aadhaar number should be visible; the first 8 digits must be masked/hidden — along with 1 passport-size photograph.
                </p>
              </div>

              {/* Masked Aadhaar Card Example Visual */}
              <div 
                className="mt-4 bg-white rounded-xl border border-blue-200/80 shadow-sm overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-4 py-2.5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold tracking-wide">
                      Example: Official Masked Aadhaar Card
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded">
                    Only Last 4 Digits Visible
                  </span>
                </div>

                <div className="p-3 sm:p-4 bg-slate-50/60">
                  <div 
                    onClick={() => setShowAadhaarModal(true)}
                    className="relative group cursor-pointer overflow-hidden rounded-lg border border-slate-300/80 bg-white transition-all hover:shadow-md hover:border-blue-400"
                    title="Click to view full size specimen"
                  >
                    <img
                      src="/assets/images/masked-aadhaar-sample.svg"
                      alt="Masked Aadhaar Card Specimen Example - UIDAI Reference"
                      referrerPolicy="no-referrer"
                      className="w-full max-h-72 sm:max-h-80 object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-slate-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-1.5">
                        <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                        Click to enlarge specimen image
                      </span>
                    </div>
                  </div>

                  {/* Verification Callouts */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-center gap-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        <strong>First 8 digits masked:</strong> Stored as <code className="bg-white px-1 py-0.5 rounded font-mono font-bold text-red-600">XXXX XXXX</code>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>
                        <strong>Only last 4 digits visible:</strong> e.g. <code className="bg-white px-1 py-0.5 rounded font-mono font-bold text-emerald-700">5482</code>
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                    <span>
                      How to get it: Download your official Masked Aadhaar in 1 minute from the UIDAI website.
                    </span>
                    <a
                      href="https://myaadhaar.uidai.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1B3E8E] hover:text-blue-800 font-bold inline-flex items-center gap-1 hover:underline"
                    >
                      <span>myaadhaar.uidai.gov.in</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Doc 2: Photos */}
          <div
            onClick={() => toggleItem('photos')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
              checkedItems.photos ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <input
              type="checkbox"
              checked={checkedItems.photos}
              onChange={() => {}}
              className="w-5 h-5 rounded text-[#1B3E8E] focus:ring-[#1B3E8E] mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">
                  2. Recent Passport Size Photographs (2 Copies)
                </h3>
                <span className="text-[11px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                  Mandatory
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Two clear, recent colored passport-size photographs with a white or light background for your player identification badge.
              </p>
            </div>
          </div>

          {/* Doc 3: Admit Card */}
          <div
            onClick={() => toggleItem('admitCard')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
              checkedItems.admitCard ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <input
              type="checkbox"
              checked={checkedItems.admitCard}
              onChange={() => {}}
              className="w-5 h-5 rounded text-[#1B3E8E] focus:ring-[#1B3E8E] mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">
                  3. CCL Trial Admit Card / Payment Receipt
                </h3>
                <span className="text-[11px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                  Mandatory
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                The digital admit card downloaded from the website or received on email/SMS after completing payment. Can be displayed on mobile or as a printout.
              </p>
            </div>
          </div>

          {/* Doc 4: Medical Declaration */}
          <div
            onClick={() => toggleItem('medical')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
              checkedItems.medical ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <input
              type="checkbox"
              checked={checkedItems.medical}
              onChange={() => {}}
              className="w-5 h-5 rounded text-[#1B3E8E] focus:ring-[#1B3E8E] mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-bold text-slate-900 text-base">
                  4. Physical Fitness & Medical Consent
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Self-Attested
                  </span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    As Declared
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Confirmation that the candidate is medically fit for rigorous outdoor sports activities. For minors under 18, signed parental consent is required.
              </p>
            </div>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong>Strict Identity & Age Verification Policy:</strong> Any submission of forged or altered documents results in immediate disqualification and a lifetime ban from Champion Cricket League and partner tournaments.
          </div>
        </div>

        {/* Action */}
        <div className="text-center">
          <button
            onClick={() => onRegister('Leather')}
            className="px-8 py-3.5 bg-[#1B3E8E] hover:bg-[#142e6b] text-white font-bold rounded-xl text-sm transition-all shadow-md"
          >
            Proceed to Trial Registration
          </button>
        </div>
      </div>

      {/* Masked Aadhaar Card Zoom Modal */}
      {showAadhaarModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowAadhaarModal(false)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#1B3E8E]" />
                  Official Masked Aadhaar Card Specimen (Sample Example)
                </h4>
                <p className="text-xs text-slate-500">
                  UIDAI compliant format with only the last 4 digits visible and first 8 digits hidden.
                </p>
              </div>
              <button
                onClick={() => setShowAadhaarModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="bg-slate-100 rounded-xl p-2 sm:p-4 border border-slate-200 flex items-center justify-center">
              <img
                src="/assets/images/masked-aadhaar-sample.svg"
                alt="Enlarged Masked Aadhaar Card Specimen Example"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[60vh] object-contain shadow-md rounded-lg bg-white"
              />
            </div>

            {/* Modal Footer Notes */}
            <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">Trial Day Requirement:</span> Carry either a color printout or clear black &amp; white physical copy to the verification desk.
              </div>
              <button
                onClick={() => setShowAadhaarModal(false)}
                className="px-5 py-2 bg-[#1B3E8E] text-white text-xs font-bold rounded-lg hover:bg-[#142e6b] transition-all"
              >
                Done / Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
