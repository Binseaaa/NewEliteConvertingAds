import { loadStripe } from '@stripe/stripe-js';

// Replace with your publishable key or use env var
const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string ||
  'pk_live_51TJCTlLc9CxU3CKu4arHLqXjtmFVbLNquU11fCZIIDxlHAfOvCvAdN8bJo4g6qLmupRcTc497F1BFlAJOiTIsCii00ZR2hvFb2';

export const stripePromise = loadStripe(STRIPE_PK);

export const PAYMENT_INTENT_URL =
  import.meta.env.VITE_PAYMENT_INTENT_URL || 'netlify/functions/create-payment-intent.js';

export const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxG-1_icuef2edigClH-nxw0VyUgwaSlg4X0hkyWKjw56-UE5QZx-jKBOY-ZuUsVomu1A/exec';
