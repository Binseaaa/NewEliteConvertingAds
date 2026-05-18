import { useEffect, useState } from 'react';

interface Props {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

export default function Toast({ message, type, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);
  const isSuccess = type === 'success';
  const delay = isSuccess ? 5000 : 8000;

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const timer = setTimeout(() => { setVisible(false); setTimeout(onDismiss, 350); }, delay);
    return () => clearTimeout(timer);
  }, [delay, onDismiss]);

  return (
    <div
      className="fixed top-6 right-6 z-[2147483647] flex items-start gap-3 rounded-md p-3.5 max-w-[340px] w-[calc(100vw-48px)] transition-transform duration-[350ms]"
      style={{
        background: '#141414',
        border: `1px solid ${isSuccess ? 'rgba(200,245,58,0.4)' : 'rgba(255,80,80,0.4)'}`,
        borderLeft: `3px solid ${isSuccess ? '#c8f53a' : '#ff4f4f'}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        transform: visible ? 'translateX(0)' : 'translateX(120%)',
      }}
    >
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: isSuccess ? 'rgba(200,245,58,0.1)' : 'rgba(255,79,79,0.1)',
          border: `1px solid ${isSuccess ? 'rgba(200,245,58,0.3)' : 'rgba(255,79,79,0.3)'}`,
        }}
      >
        {isSuccess
          ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8f53a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff4f4f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        }
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-mono text-[0.7rem] tracking-[0.08em] uppercase font-bold mb-1" style={{ color: isSuccess ? '#c8f53a' : '#ff4f4f' }}>
          {isSuccess ? 'Payment Successful' : 'Payment Failed'}
        </p>
        <p className="text-[0.82rem] text-white/65 leading-[1.5]">{message}</p>
      </div>

      <button
        onClick={() => { setVisible(false); setTimeout(onDismiss, 350); }}
        className="flex-shrink-0 text-white/30 text-base leading-none bg-transparent border-none cursor-pointer mt-0.5 hover:text-white/60"
      >
        ✕
      </button>
    </div>
  );
}
