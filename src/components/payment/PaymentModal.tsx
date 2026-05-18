import { useEffect, useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PAYMENT_INTENT_URL } from '../../lib/stripe';

const STRIPE_PK =
  (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string) ||
  'pk_live_51TJCTlLc9CxU3CKu4arHLqXjtmFVbLNquU11fCZIIDxlHAfOvCvAdN8bJo4g6qLmupRcTc497F1BFlAJOiTIsCii00ZR2hvFb2';

interface Props {
  total: number;
  email: string;
  productName: string;
  packageLabel: string;
  extras: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({
  total, email, productName, packageLabel, extras, onClose, onSuccess,
}: Props) {
  const cardNumberRef = useRef<HTMLDivElement>(null);
  const cardExpiryRef = useRef<HTMLDivElement>(null);
  const cardCvcRef    = useRef<HTMLDivElement>(null);
  const stripeRef     = useRef<any>(null);
  const cardElRef     = useRef<unknown>(null);

  const [cardError, setCardError]   = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    let mounted = true;

    setTimeout(async () => {
      if (!mounted) return;
      const stripe = await loadStripe(STRIPE_PK);
      if (!stripe || !mounted) return;
      stripeRef.current = stripe;

      const elements = stripe.elements();
      const STYLE = {
        style: {
          base: { color: '#f5f5f0', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', '::placeholder': { color: 'rgba(245,245,240,0.3)' } },
          invalid: { color: '#ff6b6b' },
        },
      };

      const cardNumber = elements.create('cardNumber', STYLE);
      const cardExpiry = elements.create('cardExpiry', STYLE);
      const cardCvc    = elements.create('cardCvc',    STYLE);

      if (cardNumberRef.current) cardNumber.mount(cardNumberRef.current);
      if (cardExpiryRef.current) cardExpiry.mount(cardExpiryRef.current);
      if (cardCvcRef.current)    cardCvc.mount(cardCvcRef.current);

      cardElRef.current = cardNumber;

      cardNumber.on('change', (e) => setCardError(e.error?.message ?? ''));
      cardExpiry.on('change', (e) => setCardError(e.error?.message ?? ''));
      cardCvc.on('change',    (e) => setCardError(e.error?.message ?? ''));
    }, 50);

    return () => { mounted = false; };
  }, []);

  // ── MOCK (for testing Google Sheets / email) ──────────────────
  // const handlePay = async () => {
  //   setProcessing(true);

  //   setTimeout(() => {
  //     console.log('Mock payment success');
  //     onSuccess(); // triggers SuccessModal + Google Sheets submission
  //   }, 1500);
  // };

  // ── REAL Stripe payment (uncomment when ready for production) ──
  const handlePay = async () => {
    const stripe = stripeRef.current;
    const cardEl = cardElRef.current;
    if (!stripe || !cardEl) return;
  
    setProcessing(true);
    setCardError('');
  
    try {
      const res  = await fetch(PAYMENT_INTENT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(total * 100) }),
      });
      const data = await res.json() as { clientSecret?: string; error?: string };
  
      if (!data.clientSecret) throw new Error(data.error ?? 'Payment setup failed.');
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardEl as any,
          billing_details: { email },
        },
      });
  
      if (error) {
        setCardError(error.message ?? 'Payment failed.');
        setProcessing(false);
        return;
      }
  
      if (paymentIntent?.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      setCardError((err as Error).message ?? 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const inputBoxStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 4,
    padding: '14px 12px',
  } as const;

  return (
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center p-5 overflow-y-auto"
      style={{ background: 'rgba(8,8,8,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (!processing && e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-[460px] rounded-[10px] p-9 my-auto"
        style={{ background: '#141414', border: '1px solid rgba(200,245,58,0.3)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          disabled={processing}
          className="absolute top-3.5 right-4 text-white/60 text-xl leading-none bg-transparent border-none cursor-pointer hover:text-white/70 disabled:opacity-0 disabled:pointer-events-none"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-[52px] h-[52px] rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(200,245,58,0.1)', border: '1px solid rgba(200,245,58,0.35)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8f53a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <h3 className="font-display text-[1.8rem] tracking-[0.04em] text-accent mb-1.5">Complete Payment</h3>
          <p className="text-white/50 text-[0.82rem]">Secure card payment powered by Stripe</p>
        </div>

        {/* Order summary */}
        <div className="rounded-md p-4 mb-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="font-mono text-[0.72rem] tracking-[0.1em] uppercase text-white/35 mb-2.5">Order Summary</p>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[0.88rem] text-white/65">{productName}</span>
            <span className="text-[0.88rem] text-white/65">{packageLabel}</span>
          </div>
          {extras && extras !== 'None' && (
            <div className="mt-2 text-[0.78rem] text-white/60 leading-[1.4]">
              <span className="font-mono tracking-[0.1em] uppercase">Extras: </span>
              <div className="mt-1">{extras}</div>
            </div>
          )}
          <div className="h-px my-2.5" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="flex justify-between items-center">
            <span className="text-[0.9rem] font-semibold">Total Due</span>
            <span className="font-display text-[1.4rem] tracking-[0.05em] text-accent">${total} USD</span>
          </div>
        </div>

        {/* Card fields */}
        <div className="flex flex-col gap-2.5 mb-4">
          <div>
            <label className="block font-mono text-[0.72rem] tracking-[0.1em] uppercase text-white/35 mb-1.5">Card Number</label>
            <div ref={cardNumberRef} style={inputBoxStyle} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-mono text-[0.72rem] tracking-[0.1em] uppercase text-white/35 mb-1.5">Expiry Date</label>
              <div ref={cardExpiryRef} style={inputBoxStyle} />
            </div>
            <div>
              <label className="block font-mono text-[0.72rem] tracking-[0.1em] uppercase text-white/35 mb-1.5">CVC</label>
              <div ref={cardCvcRef} style={inputBoxStyle} />
            </div>
          </div>
          {cardError && <p className="text-[#ff6b6b] text-[0.78rem] min-h-[18px]">{cardError}</p>}
        </div>

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={processing}
          className="w-full bg-accent text-black font-mono text-[0.8rem] font-bold tracking-[0.08em] uppercase py-[15px] rounded border-none cursor-pointer transition hover:bg-[#d6ff44] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : `Pay $${total} USD`}
        </button>

        <div className="flex items-center justify-center gap-1.5 mt-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(245,245,240,0.3)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <p className="text-[0.72rem] text-white/30">Secured by Stripe · SSL Encrypted</p>
        </div>
      </div>
    </div>
  );
}