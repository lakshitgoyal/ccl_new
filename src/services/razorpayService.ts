/**
 * Razorpay Payment Gateway Service
 * Handles official Razorpay standard checkout integration.
 */

declare global {
  interface Window {
    Razorpay?: any;
  }
}

import { getActiveRazorpayConfig } from '../config/razorpayConfig';

export const DEFAULT_RAZORPAY_KEY_STORAGE = 'ccl_razorpay_key_id';
export const DEFAULT_RAZORPAY_AMOUNT_STORAGE = 'ccl_razorpay_amount_paise';

export const getStoredRazorpayKey = (): string => {
  try {
    const envKey = (import.meta as any).env?.VITE_RAZORPAY_KEY_ID;
    if (envKey && typeof envKey === 'string' && envKey.trim().length > 0) {
      return envKey.trim();
    }
    const localKey = localStorage.getItem(DEFAULT_RAZORPAY_KEY_STORAGE);
    if (localKey && localKey.trim().length > 0) {
      return localKey.trim();
    }
    // Default to the configured key in razorpayConfig.ts
    const configKey = getActiveRazorpayConfig().keyId;
    if (configKey && !configKey.includes('PLACEHOLDER') && configKey.trim().length > 0) {
      return configKey.trim();
    }
  } catch {
    // Ignore
  }
  return '';
};

export const saveStoredRazorpayKey = (key: string): void => {
  try {
    if (key && key.trim().length > 0) {
      localStorage.setItem(DEFAULT_RAZORPAY_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(DEFAULT_RAZORPAY_KEY_STORAGE);
    }
  } catch {
    // Ignore
  }
};

import { calculateRegistrationFee } from '../data/cclData';
import { BallType, PlayerSpeciality } from '../types';

export const getTrialAmountPaise = (
  ballType: BallType = 'Leather',
  speciality: PlayerSpeciality | string = 'Batsman'
): number => {
  // Always compute fee in INR directly from the official schedule based on Ball Type + Speciality:
  // Leather Ball: Batsman ₹1,199 (119900 paise) | Bowler ₹1,199 (119900 paise) | All Rounder ₹1,499 (149900 paise) | Wicketkeeper ₹1,499 (149900 paise)
  // Tennis Ball: Batsman ₹799 (79900 paise) | Bowler ₹799 (79900 paise) | All Rounder ₹1,199 (119900 paise) | Wicketkeeper ₹1,199 (119900 paise)
  const feeInr = calculateRegistrationFee(ballType, speciality);
  return feeInr * 100;
};

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface LaunchRazorpayParams {
  keyId: string;
  name: string;
  email: string;
  phone: string;
  ballType: string;
  speciality: string;
  city: string;
  state: string;
  onSuccess: (paymentId: string, orderId: string) => void;
  onDismiss?: () => void;
  onError?: (error: any) => void;
}

export const launchRazorpayCheckout = async (params: LaunchRazorpayParams): Promise<boolean> => {
  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) {
    if (params.onError) {
      params.onError(new Error('Razorpay Checkout SDK failed to load. Please check your internet connection.'));
    }
    return false;
  }

  const amountPaise = getTrialAmountPaise(
    params.ballType === 'Tennis' ? 'Tennis' : 'Leather',
    params.speciality
  );

  const options = {
    key: params.keyId,
    amount: amountPaise,
    currency: 'INR',
    name: 'Champion Cricket League',
    description: `Season 2 Trials - ${params.ballType} Ball (${params.speciality})`,
    image: '/assets/images/logo.jpg',
    prefill: {
      name: params.name,
      email: params.email,
      contact: params.phone
    },
    notes: {
      candidateName: params.name,
      ballType: params.ballType,
      speciality: params.speciality,
      trialLocation: `${params.city}, ${params.state}`,
      companyRecipient: 'registration@khelbharatofficial.com'
    },
    theme: {
      color: '#1B3E8E'
    },
    handler: function (response: { razorpay_payment_id: string; razorpay_order_id?: string; razorpay_signature?: string }) {
      const paymentId = response.razorpay_payment_id || `pay_${Date.now()}`;
      const orderId = response.razorpay_order_id || `order_${Date.now()}`;
      params.onSuccess(paymentId, orderId);
    },
    modal: {
      ondismiss: function () {
        if (params.onDismiss) {
          params.onDismiss();
        }
      }
    }
  };

  try {
    const rzpInstance = new window.Razorpay(options);
    rzpInstance.on('payment.failed', function (resp: any) {
      if (params.onError) {
        params.onError(resp?.error || new Error('Razorpay payment failed or was declined.'));
      }
    });
    rzpInstance.open();
    return true;
  } catch (err) {
    if (params.onError) {
      params.onError(err);
    }
    return false;
  }
};
