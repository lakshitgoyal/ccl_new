import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Printer, 
  AlertCircle,
  Key,
  Lock,
  ExternalLink,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BallType, PlayerSpeciality, RegistrationFormData, RegistrationRecord } from '../types';
import { CCL_TRIAL_STATES, getCitiesForState, calculateRegistrationFee } from '../data/cclData';
import { 
  sendCandidateDetailsToCompany, 
  sendRegistrationPendingEmail,
  sendCandidateRegistrationDetailsEmail,
  sendEmailToCandidate, 
  sendPaymentEmailToCompany
} from '../services/notificationService';
import { 
  getStoredRazorpayKey, 
  saveStoredRazorpayKey, 
  launchRazorpayCheckout 
} from '../services/razorpayService';
import { PaymentSuccessModal } from './PaymentSuccessModal';

interface RegistrationModalProps {
  isOpen: boolean;
  initialBallType?: BallType;
  initialState?: string;
  initialCity?: string;
  onClose: () => void;
  onSuccess?: (record: RegistrationRecord) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  initialBallType = 'Leather',
  initialState = '',
  initialCity = '',
  onClose,
  onSuccess
}) => {
  const [ballType, setBallType] = useState<BallType>(initialBallType);
  const [step, setStep] = useState<'form' | 'key_needed' | 'receipt'>('form');
  const [tempRegId, setTempRegId] = useState<string>('');

  const resolvedInitialState = initialState && (CCL_TRIAL_STATES.includes(initialState) || initialState.toLowerCase() === 'delhi')
    ? (initialState.toLowerCase() === 'delhi' ? 'Delhi NCR' : initialState)
    : CCL_TRIAL_STATES[0];
  const initialCities = getCitiesForState(resolvedInitialState);
  const resolvedInitialCity = initialCity && initialCities.includes(initialCity)
    ? initialCity
    : (initialCities[0] || '');

  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    age: '',
    phone: '',
    email: '',
    speciality: 'Batsman',
    ballType: initialBallType,
    state: resolvedInitialState,
    city: resolvedInitialCity,
    referralCode: '',
    agreedToTerms: true
  });

  const [inputRazorpayKey, setInputRazorpayKey] = useState('');
  const [activeRazorpayKey, setActiveRazorpayKey] = useState('');
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  
  const [completedRecord, setCompletedRecord] = useState<RegistrationRecord | null>(null);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);

  useEffect(() => {
    const key = getStoredRazorpayKey();
    setActiveRazorpayKey(key);
    setInputRazorpayKey(key);

    if (isOpen) {
      const stateToUse = initialState && (CCL_TRIAL_STATES.includes(initialState) || initialState.toLowerCase() === 'delhi')
        ? (initialState.toLowerCase() === 'delhi' ? 'Delhi NCR' : initialState)
        : (formData.state || CCL_TRIAL_STATES[0]);
      const cities = getCitiesForState(stateToUse);
      const cityToUse = initialCity && cities.includes(initialCity) ? initialCity : (cities[0] || '');
      setFormData(prev => ({
        ...prev,
        state: stateToUse,
        city: cityToUse
      }));
    }
  }, [isOpen, initialState, initialCity]);

  const handleStateChange = (selectedState: string) => {
    const cities = getCitiesForState(selectedState);
    const newCity = cities.length > 0 ? cities[0] : '';
    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      city: newCity
    }));
  };

  if (!isOpen) return null;

  const handleBallTypeSwitch = (type: BallType) => {
    setBallType(type);
    setFormData((prev) => ({ ...prev, ballType: type }));
  };

  /**
   * Finalize payment completion:
   * 1. Send confirmation e-mail to candidate on their entered email (Email 2: Payment Successful & Admit Card)
   * 2. Send payment notification e-mail to company (website owner)
   * 3. Show celebratory Payment Successful Pop-up Modal immediately
   * 4. Set receipt step with official digital admit card
   */
  const handlePaymentSuccessful = (paymentId: string, orderId: string) => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const regNumber = `CCLREG-S2-${randomNum}`;
    const reportingTime = '08:00 AM IST';
    const trialLocation = `${formData.city}, ${formData.state}`;
    const feeAmount = calculateRegistrationFee(ballType, formData.speciality || 'Batsman');
    const trackingRefId = tempRegId || regNumber;

    const record: RegistrationRecord = {
      ...formData,
      ballType,
      id: `ccl_reg_${Date.now()}`,
      registrationNumber: regNumber,
      feeAmount,
      paymentStatus: 'completed',
      paymentId: paymentId || `pay_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      orderId: orderId || `order_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      trialLocation,
      reportingTime
    };

    // User Email 1: Registration details received (stating registration is done, WITHOUT stating payment is pending)
    sendCandidateRegistrationDetailsEmail({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      age: formData.age,
      speciality: formData.speciality || 'Batsman',
      ballType,
      state: formData.state,
      city: formData.city,
      tempId: trackingRefId,
      feeAmount
    });

    // User Email 2: Payment Successful & Registration Process Complete with Official Admit Card & Trial info
    sendEmailToCandidate({
      name: formData.name.trim(),
      email: formData.email.trim(),
      registrationNumber: regNumber,
      ballType,
      speciality: formData.speciality || 'Batsman',
      city: formData.city,
      state: formData.state,
      paymentId: record.paymentId,
      orderId: record.orderId,
      reportingTime,
      feeAmount
    });

    // Company Email (ONLY ONE EMAIL): Candidate details + statement that BOTH registration and payment are done
    sendPaymentEmailToCompany({
      candidateName: formData.name.trim(),
      candidateEmail: formData.email.trim(),
      candidatePhone: formData.phone.trim(),
      candidateAge: formData.age,
      ballType,
      speciality: formData.speciality || 'Batsman',
      trialLocation,
      registrationNumber: regNumber,
      paymentId: record.paymentId,
      orderId: record.orderId,
      amount: feeAmount
    });

    setCompletedRecord(record);
    setShowPaymentSuccessModal(true); // Trigger celebratory Payment Successful Pop-up!
    setStep('receipt');
    setIsProcessingCheckout(false);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }

    if (onSuccess) {
      onSuccess(record);
    }
  };

  /**
   * Triggers the real official Razorpay Checkout SDK modal
   */
  const triggerOfficialRazorpay = async (keyToUse: string, activeTempId: string) => {
    setIsProcessingCheckout(true);
    setCheckoutError(null);

    const feeAmount = calculateRegistrationFee(ballType, formData.speciality || 'Batsman');

    const success = await launchRazorpayCheckout({
      keyId: keyToUse,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      ballType,
      speciality: formData.speciality || 'Batsman',
      city: formData.city,
      state: formData.state,
      onSuccess: (paymentId, orderId) => {
        handlePaymentSuccessful(paymentId, orderId);
      },
      onDismiss: () => {
        setIsProcessingCheckout(false);
        // User closed or cancelled Razorpay checkout:
        // 1. Mail to User stating registration details and that payment is pending
        console.log(`[RAZORPAY CANCELLED] Payment cancelled for ${formData.name} (${activeTempId}). Sending pending notices.`);
        sendRegistrationPendingEmail({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          age: formData.age,
          speciality: formData.speciality || 'Batsman',
          ballType,
          state: formData.state,
          city: formData.city,
          tempId: activeTempId,
          feeAmount
        });

        // 2. Mail to Company (ONLY ONE EMAIL) stating candidate details and that payment is pending
        sendCandidateDetailsToCompany({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          age: formData.age,
          speciality: formData.speciality || 'Batsman',
          ballType,
          state: formData.state,
          city: formData.city,
          tempId: activeTempId,
          feeAmount
        });
      },
      onError: (err) => {
        setIsProcessingCheckout(false);
        setCheckoutError(err?.message || 'Razorpay checkout encountered an issue. Please verify your Razorpay Key ID.');
      }
    });

    if (!success && !keyToUse) {
      setIsProcessingCheckout(false);
      setStep('key_needed');
    }
  };

  /**
   * Flow Step 1:
   * When player fills details and clicks "Proceed to Pay":
   * 1. Validate fields.
   * 2. Initialize provisional tracking ID.
   * 3. Invoke Razorpay Checkout with calculated fee according to Ball Type & Speciality.
   */
  const handleProceedToPay = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.age || !formData.phone.trim() || !formData.email.trim() || !formData.speciality) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    const ageNum = Number(formData.age);
    if (isNaN(ageNum) || ageNum < 8 || ageNum > 35) {
      alert('Age must be between 8 and 35 years (both inclusive) to register for CCL trials.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      alert('Please enter a valid email address.');
      return;
    }

    const tempId = `CCL-PEND-${Date.now().toString().slice(-6)}`;
    setTempRegId(tempId);

    // Check if Razorpay Key ID is already configured
    const key = activeRazorpayKey || getStoredRazorpayKey();
    if (key && key.trim().length > 0) {
      // Launch official Razorpay Checkout directly
      triggerOfficialRazorpay(key.trim(), tempId);
    } else {
      // Prompt for Razorpay Key ID / credentials
      setStep('key_needed');
    }
  };

  const handleSaveKeyAndPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRazorpayKey.trim()) {
      alert('Please enter your Razorpay Key ID.');
      return;
    }
    const cleanKey = inputRazorpayKey.trim();
    saveStoredRazorpayKey(cleanKey);
    setActiveRazorpayKey(cleanKey);
    const idToUse = tempRegId || `CCL-PEND-${Date.now().toString().slice(-6)}`;
    triggerOfficialRazorpay(cleanKey, idToUse);
  };

  const handleTestSimulatedPayment = () => {
    const mockPaymentId = `pay_sim_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const mockOrderId = `order_sim_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    handlePaymentSuccessful(mockPaymentId, mockOrderId);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[94vh]">
        {/* Header - Brand Bar */}
        <div className="bg-[#0f172a] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 text-neutral-950 flex items-center justify-center font-black text-lg shadow-sm">
              CCL
            </div>
            <div>
              <span className="text-[11px] font-black text-amber-400 tracking-wider uppercase block">
                Season 2 Official Registration
              </span>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Champion Cricket League National Trials
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">

          {/* ========================================================
              STEP 1: Registration Form
             ======================================================== */}
          {step === 'form' && (
            <div>
              {/* Ball Type Selector Tabs (No price mentioned) */}
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-2 mb-5">
                <button
                  type="button"
                  onClick={() => handleBallTypeSwitch('Leather')}
                  className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    ballType === 'Leather'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  <span>Leather Ball Trials</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleBallTypeSwitch('Tennis')}
                  className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    ballType === 'Tennis'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Tennis Ball Trials</span>
                </button>
              </div>

              {checkoutError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-bold block">Razorpay Notice:</span>
                    <span>{checkoutError}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleProceedToPay} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-900"
                  />
                </div>

                {/* Age & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Age (8 to 35 Years) * {formData.age && (
                        <span className="ml-1 text-[#1B3E8E] font-extrabold">
                          ({Number(formData.age) < 16 ? 'Under-16 Category' : 'Open / Senior Category (16-35)'})
                        </span>
                      )}
                    </label>
                    <input
                      type="number"
                      required
                      min="8"
                      max="35"
                      placeholder="e.g. 15"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value ? parseInt(e.target.value) : '' })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-900"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address (For Registration & Confirmation Slip) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-900"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Official registration confirmation slip will be automatically sent to this email upon payment.
                  </p>
                </div>

                {/* Playing Specialty */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Playing Specialty *
                    </label>
                    <span className="text-xs font-bold text-[#1B3E8E]">
                      Fee: ₹{calculateRegistrationFee(ballType, formData.speciality)}/-
                    </span>
                  </div>
                  <select
                    value={formData.speciality}
                    onChange={(e) => setFormData({ ...formData, speciality: e.target.value as PlayerSpeciality })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-900 font-medium"
                  >
                    <option value="Batsman">Batsman (₹{calculateRegistrationFee(ballType, 'Batsman')}/-)</option>
                    <option value="Bowler">Bowler (₹{calculateRegistrationFee(ballType, 'Bowler')}/-)</option>
                    <option value="All Rounder">All Rounder (₹{calculateRegistrationFee(ballType, 'All Rounder')}/-)</option>
                    <option value="Wicketkeeper">Wicket Keeper + Batsman (₹{calculateRegistrationFee(ballType, 'Wicketkeeper')}/-)</option>
                  </select>
                </div>

                {/* State & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Trial State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-900 font-medium"
                    >
                      {CCL_TRIAL_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Preferred Trial Hub / City *
                    </label>
                    <select
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-900 font-medium"
                    >
                      {getCitiesForState(formData.state).map((ct) => (
                        <option key={ct} value={ct}>{ct}</option>
                      ))}
                    </select>
                    <span className="text-[10px] text-slate-500 mt-1 block font-medium">
                      Official recommended trial hubs for {formData.state}
                    </span>
                  </div>
                </div>

                {/* Referral Code */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Leave blank if not applicable"
                    value={formData.referralCode}
                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-900"
                  />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="termsAgreement"
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                    required
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#1B3E8E] focus:ring-[#1B3E8E]"
                  />
                  <label htmlFor="termsAgreement" className="text-xs text-slate-600 leading-snug">
                    I agree to the <span className="font-semibold text-slate-900 underline">Terms & Conditions</span>, Selection Policies, and understand that trial reporting requires original Date of Birth ID proof.
                  </label>
                </div>

                {/* UPI Apps Payment Method Banner */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Accepted Payment Methods (UPI Apps & Cards):
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ⚡ Instant Verification
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-[#5f259f]"></span>
                      PhonePe
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                      Google Pay
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 text-xs font-bold shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-[#00BAF2]"></span>
                      Paytm
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-[#00897B]"></span>
                      BHIM
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-300 text-neutral-900 text-xs font-bold shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-black"></span>
                      CRED
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium pl-1">
                      + Net Banking & Cards
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Supports all major UPI Apps – PhonePe, Google Pay, Paytm, BHIM, CRED for fast, secure slot confirmation.
                  </p>
                </div>

                {/* Submission CTA Strip with Dynamic Fee */}
                <div className="bg-gradient-to-r from-amber-50/90 via-slate-50 to-blue-50/90 border border-amber-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-slate-700 font-bold uppercase tracking-wider">
                        Trial Registration Fee:
                      </span>
                      <span className="text-xl font-black text-[#1B3E8E]">
                        ₹{calculateRegistrationFee(ballType, formData.speciality).toLocaleString('en-IN')}/-
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {ballType} Ball Trial • {formData.speciality} • Season 2 Official Registration (Includes Jersey Kit & Videography)
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessingCheckout}
                    className="px-6 py-3 bg-[#1B3E8E] hover:bg-[#142e6b] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {isProcessingCheckout ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Connecting to Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Pay ₹{calculateRegistrationFee(ballType, formData.speciality).toLocaleString('en-IN')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================
              STEP 2: Razorpay Credentials Required (When key is missing)
             ======================================================== */}
          {step === 'key_needed' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-[#1B3E8E]">
                  <Key className="w-4 h-4" />
                  <span>Razorpay Gateway Credentials Setup</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Candidate details for <strong className="text-slate-900">{formData.name}</strong> have been recorded and sent to the company. To launch the official Razorpay Checkout gateway popup, please provide your Razorpay Key ID.
                </p>
              </div>

              <form onSubmit={handleSaveKeyAndPay} className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Razorpay Key ID (Test or Live) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. rzp_test_xxxxxxxxxxxx or rzp_live_xxxxxxxxxxxx"
                      value={inputRazorpayKey}
                      onChange={(e) => setInputRazorpayKey(e.target.value)}
                      className="w-full px-3.5 py-2.5 font-mono text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-900"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Available in your Razorpay Dashboard under <strong>Settings &gt; API Keys</strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Back to Form
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Save Key & Open Official Razorpay Checkout</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Want to test the full flow right now?</span>
                  <button
                    type="button"
                    onClick={handleTestSimulatedPayment}
                    className="text-[#1B3E8E] font-bold hover:underline cursor-pointer"
                  >
                    Simulate Payment Completion
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================
              STEP 3: Player Interface After Payment
              (NO company email previews! ONLY: "Confirmation message has been sent on the registered e-mail ID")
             ======================================================== */}
          {step === 'receipt' && completedRecord && (
            <div className="space-y-5">
              {/* Player Post-Payment Confirmation Message */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg sm:text-xl font-black text-slate-900">
                  Registration Confirmed
                </h4>
                <div className="inline-block bg-white border-2 border-emerald-500 text-emerald-950 font-black px-4 py-3 rounded-xl text-xs sm:text-sm shadow-sm leading-relaxed max-w-lg mx-auto">
                  Registration Confirmed - Your trial slot has been reserved successfully. A confirmation email will be sent to your email ID within 24 hours.
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Confirmation dispatched to: <strong className="text-slate-900">{completedRecord.email}</strong>
                </p>
              </div>

              {/* Official Printable Trial Admit Card for the Player (NO PRICES MENTIONED) */}
              <div id="ccl-admit-card" className="border-2 border-dashed border-[#1B3E8E] rounded-2xl p-4 sm:p-5 bg-slate-50 relative overflow-hidden">
                <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-[#0f172a] text-amber-400 font-black flex items-center justify-center text-sm border border-neutral-700">
                      CCL
                    </div>
                    <div>
                      <h5 className="font-black text-slate-900 text-sm sm:text-base leading-tight">
                        Champion Cricket League
                      </h5>
                      <span className="text-xs text-[#1B3E8E] font-bold">
                        Official Trial Admit Card • Season 2 Trials
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Roll / Reg No.</span>
                    <span className="font-mono text-xs sm:text-sm font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {completedRecord.registrationNumber}
                    </span>
                  </div>
                </div>

                {/* Candidate Particulars Grid - No price anywhere */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3.5 text-xs border-b border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Candidate Name</span>
                    <span className="font-bold text-slate-900">{completedRecord.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Age & Category</span>
                    <span className="font-bold text-slate-900">
                      {completedRecord.age} Yrs ({Number(completedRecord.age) < 16 ? 'U-16' : 'Open'})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Specialty</span>
                    <span className="font-bold text-slate-900">{completedRecord.speciality}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Ball Division</span>
                    <span className="font-bold text-red-700">{completedRecord.ballType} Ball Trial</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Trial Location</span>
                    <span className="font-bold text-slate-900">{completedRecord.trialLocation}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Reporting Time</span>
                    <span className="font-bold text-slate-900">{completedRecord.reportingTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Status</span>
                    <span className="font-bold text-emerald-700">PAID (CONFIRMED)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Razorpay Txn ID</span>
                    <span className="font-mono text-slate-700">{completedRecord.paymentId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Date Issued</span>
                    <span className="text-slate-600">{new Date(completedRecord.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Venue Instruction */}
                <div className="pt-3 flex items-start gap-2 text-[11px] text-slate-600">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory at venue:</strong> Carry original Date of Birth proof (School ID / Aadhaar card), sportswear / whites, and this digital or printed admit card.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-300 text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Admit Card</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 bg-[#1B3E8E] hover:bg-[#142e6b] text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Done & Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Celebratory Payment Successful Pop-Up Modal */}
      {completedRecord && (
        <PaymentSuccessModal
          isOpen={showPaymentSuccessModal}
          onClose={() => setShowPaymentSuccessModal(false)}
          record={completedRecord}
          onViewAdmitCard={() => setShowPaymentSuccessModal(false)}
          onPrintSlip={handlePrint}
        />
      )}
    </div>
  );
};

