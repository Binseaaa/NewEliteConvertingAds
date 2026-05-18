interface Props {
  email: string;
  onClose: () => void;
}

export default function SuccessModal({ email, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center p-5"
      style={{ background: 'rgba(8,8,8,0.92)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-[440px] rounded-[10px] p-11 text-center relative"
        style={{ background: '#141414', border: '1px solid rgba(200,245,58,0.35)' }}
      >
        {/* Check icon */}
        <div
          className="w-[60px] h-[60px] rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{ background: 'rgba(200,245,58,0.12)', border: '1px solid rgba(200,245,58,0.4)' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c8f53a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3 className="font-display text-[2.2rem] tracking-[0.04em] text-accent mb-2.5">
          Order Confirmed!
        </h3>
        <p className="text-white/65 text-[0.92rem] leading-[1.7] mb-1.5">
          Payment successful. We are already getting to work on your ad creative.
        </p>
        <p className="text-white/60 text-[0.8rem] mb-7">
          Confirmation sent to <strong className="text-white">{email}</strong>
        </p>
        <p className="font-mono text-[0.72rem] tracking-[0.08em] text-white/25 mb-6">
          EXPECTED DELIVERY · 24–48 HOURS
        </p>

        <button
          onClick={onClose}
          className="bg-accent text-black font-mono text-[0.75rem] font-bold tracking-[0.08em] uppercase px-8 py-3 rounded-sm border-none cursor-pointer hover:bg-[#d6ff44] transition"
        >
          Done
        </button>
      </div>
    </div>
  );
}
