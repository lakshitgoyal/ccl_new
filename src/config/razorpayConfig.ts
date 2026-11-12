/**
 * Razorpay Official Gateway Configuration
 * Champion Cricket League (CCL) - Powered by Khel Bharat
 *
 * NOTE:
 * - In standard client-side Razorpay Standard Checkout (checkout.js), only the Key ID (rzp_live_... or rzp_test_...)
 *   is used in the browser to initialize the checkout popup.
 * - The Key Secret is stored securely for server-side order generation and webhook verification.
 * - To switch between Production and Testing, simply toggle the ACTIVE_ENVIRONMENT constant below.
 */

export interface RazorpayCredentialSet {
  keyId: string;
  keySecret: string;
  description: string;
}

// ============================================================================
// 1. PRODUCTION CREDENTIALS (Live Account)
// ============================================================================
export const RAZORPAY_PRODUCTION_CONFIG: RazorpayCredentialSet = {
  keyId: 'rzp_live_Rjr4iKbNEyNeiv', 
  keySecret: '01u4qsoauqc6D1aEiklOf4M6', 
  description: 'Production / Live Mode (Real Transactions)'
};

// ============================================================================
// 2. TESTING CREDENTIALS (Test Account / Sandbox)
// ============================================================================
export const RAZORPAY_TEST_CONFIG: RazorpayCredentialSet = {
  keyId: 'rzp_test_FvWVeiMWly74xf', 
  keySecret: 'dIlnytsaZhi575INukrM5MNo',
  description: 'Testing / Sandbox Mode (Simulated Transactions)'
};

// ============================================================================
// ACTIVE ENVIRONMENT SELECTOR
// Toggle between 'production' and 'testing' here:
// ============================================================================
export const ACTIVE_RAZORPAY_ENVIRONMENT: 'production' | 'testing' = 'production';
// export const ACTIVE_RAZORPAY_ENVIRONMENT: 'production' | 'testing' = 'testing';

/**
 * Returns the currently active credential configuration
 */
export const getActiveRazorpayConfig = (): RazorpayCredentialSet => {
  return ACTIVE_RAZORPAY_ENVIRONMENT === 'production'
    ? RAZORPAY_PRODUCTION_CONFIG
    : RAZORPAY_TEST_CONFIG;
};
