import { useState, useRef } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { useOrderForm } from '../../hooks/useOrderForm';
import SectionLabel from '../ui/SectionLabel';
import PaymentModal from '../payment/PaymentModal';
import SuccessModal from '../payment/SuccessModal';
import Toast from '../payment/Toast';
import type { PackageId } from '../../types';
import { GOOGLE_SCRIPT_URL } from '../../lib/stripe';

interface Props {
  selectedPackage?: PackageId;
}

export default function OrderForm({ selectedPackage }: Props) {
  const headerRef = useReveal();
  const formRef   = useReveal();

  const { formData, updateField, calcTotal, getExtrasLabel, buildFormData, resetForm } = useOrderForm();
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toast, setToast]             = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [submitting, setSubmitting]   = useState(false);

  const productImgRef = useRef<HTMLInputElement>(null);
  const logoRef       = useRef<HTMLInputElement>(null);
  const [productPreview, setProductPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview]       = useState<string | null>(null);

  // Sync selected package from Packages section
  const pkgValue = selectedPackage && !formData.package ? selectedPackage : formData.package;

  const handleFileChange = (file: File | null, type: 'productImage' | 'brandLogo') => {
    if (!file) return;
    updateField(type, file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === 'productImage') setProductPreview(e.target?.result as string);
      else setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgValue || calcTotal() === 0) { alert('Please select a package before submitting.'); return; }
    setSubmitting(true);
    setShowPayment(true);
    setSubmitting(false);
  };

  // const handlePaymentSuccess = async () => {
  //   setShowPayment(false);

  //   // Send form data to Google Sheets
  //   try {
  //     const fd = await buildFormData();
  //     await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: fd });
  //   } catch (_) { /* silent — payment already succeeded */ }

  //   setShowSuccess(true);
  //   setToast({ message: 'Payment successful! Order confirmed.', type: 'success' });
  // };

  const handlePaymentSuccess = async () => {
    // Don't close modal yet — keep it visible while submitting to Sheets
    try {
      const fd = await buildFormData();
      console.log('Submitting to Google Sheets:', GOOGLE_SCRIPT_URL);
      console.log('Form entries:', [...fd.entries()]);

      const res = await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: fd });
      console.log('Google Sheets response status:', res.status);
      const text = await res.text();
      console.log('Google Sheets response body:', text);
    } catch (err) {
      console.error('Google Sheets error:', err);
    }

    setShowPayment(false); // ← moved here, closes only after sheets is done
    setShowSuccess(true);
    setToast({ message: 'Payment successful! Order confirmed.', type: 'success' });
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    resetForm();
    setProductPreview(null);
    setLogoPreview(null);
  };

  const total        = calcTotal();
  const extrasLabel  = getExtrasLabel();

  return (
    <section id="order" className="py-[100px] px-[5%] bg-[#101010]">
      <div className="max-w-[720px] mx-auto">

        {/* Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="reveal text-center mb-14">
          <SectionLabel className="justify-center">Order</SectionLabel>
          <h2 className="font-display leading-none tracking-[0.01em] mb-4 text-white" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}>
            Let's Make Your<br />Product Go Trending
          </h2>
          <p className="text-[1rem] text-white/60 max-w-[480px] font-light mx-auto">
            Fill in your product details below and we'll start crafting your winning ad immediately.
          </p>
        </div>

        {/* Form */}
        <form ref={formRef as React.RefObject<HTMLFormElement>} className="reveal space-y-6" onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Product Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.7rem] font-mono tracking-[0.12em] uppercase text-white/60">Product Name / Site *</label>
              <input
                type="text" required placeholder="e.g. ArcLight Phone Holder"
                value={formData.productName}
                onChange={(e) => updateField('productName', e.target.value)}
                className="bg-white/[0.04] border border-white/[0.07] rounded px-3 py-2 text-sm text-white placeholder-white/20 focus:border-accent/50 outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.7rem] font-mono tracking-[0.12em] uppercase text-white/60">Your Email *</label>
              <input
                type="email" required placeholder="you@email.com"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="bg-white/[0.04] border border-white/[0.07] rounded px-3 py-2 text-sm text-white placeholder-white/20 focus:border-accent/50 outline-none"
              />
            </div>

            {/* Ad Format */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.7rem] font-mono tracking-[0.12em] uppercase text-white/60">Ad Format *</label>
              <select
                required
                aria-label="Ad Format"
                value={formData.adFormat}
                onChange={(e) => updateField('adFormat', e.target.value)}
                className="cursor-pointer appearance-none bg-[#1a1a1a] border border-white/[0.07] rounded px-3 py-2 text-sm text-white focus:border-accent/50 outline-none"
              >
                <option value="" disabled>Select format</option>
                <option value="9:16">9:16 — TikTok / Stories / Reels</option>
                <option value="1:1">1:1 — Meta Feed / Square</option>
                <option value="both">Both (9:16 + 1:1)</option>
              </select>
            </div>

            {/* Package */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.7rem] font-mono tracking-[0.12em] uppercase text-white/60">Package *</label>
              <select
                required
                aria-label="Package"
                value={pkgValue}
                onChange={(e) => updateField('package', e.target.value as PackageId)}
                className="cursor-pointer appearance-none bg-[#1a1a1a] border border-white/[0.07] rounded px-3 py-2 text-sm text-white focus:border-accent/50 outline-none"
              >
                <option value="" disabled>Select package</option>
                <option value="starter">Starter — $100</option>
                <option value="growth">Growth — $250</option>
                <option value="elite">Elite — $500</option>
              </select>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[0.7rem] font-mono tracking-[0.12em] uppercase text-white/60">Product Description / Notes *</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="bg-white/[0.04] border border-white/[0.07] rounded px-3 py-2 text-sm min-h-[110px] placeholder-white/20 resize-y focus:border-accent/50 outline-none text-white"
                placeholder="Any extra details, script ideas, footage you have, or special instructions."
              />
            </div>
          </div>

          {/* Uploads */}
          <div className="space-y-3">
            <label className="text-[0.7rem] font-mono tracking-[0.12em] uppercase text-white/60">
              Product Image & Logo (Optional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {/* Product Image */}
              <div
                className={`upload-box cursor-pointer bg-white/[0.03] rounded p-5 text-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(200,245,58,0.15)] ${productPreview ? 'has-file' : ''}`}
                onClick={() => productImgRef.current?.click()}
                onDrop={(e) => { e.preventDefault(); handleFileChange(e.dataTransfer.files[0], 'productImage'); }}
                onDragOver={(e) => e.preventDefault()}
              >
                <input ref={productImgRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => handleFileChange(e.target.files?.[0] ?? null, 'productImage')} />
                {productPreview && (
                  <div className="relative inline-block mb-3">
                    <img src={productPreview} alt="Product preview" className="max-h-24 rounded object-contain mx-auto"/>
                    <button type="button" onClick={(e) => { e.stopPropagation(); setProductPreview(null); updateField('productImage', null); if (productImgRef.current) productImgRef.current.value = ''; }}
                      className="absolute top-0 right-0 text-xs bg-black/70 text-white px-2 py-1 rounded hover:bg-red-500 transition">
                      Remove
                    </button>
                  </div>
                )}
                <div className="text-white text-sm">Product Image</div>
                <div className="text-white/60p text-xs mt-1">Drag & drop or click to upload</div>
              </div>

              {/* Brand Logo */}
              <div
                className={`upload-box cursor-pointer bg-white/[0.03] rounded p-5 text-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(200,245,58,0.15)] ${logoPreview ? 'has-file' : ''}`}
                onClick={() => logoRef.current?.click()}
                onDrop={(e) => { e.preventDefault(); handleFileChange(e.dataTransfer.files[0], 'brandLogo'); }}
                onDragOver={(e) => e.preventDefault()}
              >
                <input ref={logoRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => handleFileChange(e.target.files?.[0] ?? null, 'brandLogo')} />
                {logoPreview && (
                  <div className="relative inline-block mb-3">
                    <img src={logoPreview} alt="Logo preview" className="max-h-16 rounded object-contain mx-auto"/>
                    <button type="button" onClick={(e) => { e.stopPropagation(); setLogoPreview(null); updateField('brandLogo', null); if (logoRef.current) logoRef.current.value = ''; }}
                      className="absolute top-0 right-0 text-xs bg-black/70 text-white px-2 py-1 rounded hover:bg-red-500 transition">
                      Remove
                    </button>
                  </div>
                )}
                <div className="text-white text-sm">Brand Logo</div>
                <div className="text-white/60p text-xs mt-1">Drag & drop or click to upload</div>
              </div>
            </div>
          </div>

          {/* Extras */}
          <div className="space-y-3">
            <p className="text-[0.7rem] font-mono tracking-[0.12em] uppercase text-white/60">Extras (Optional)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* Voiceover */}
              <div className="space-y-2">
                <button type="button"
                  onClick={() => { updateField('voiceover', !formData.voiceover); if (formData.voiceover) updateField('voiceoverAccent', ''); }}
                  className="h-[52px] w-full bg-white/[0.03] rounded font-mono text-[0.72rem] uppercase tracking-[0.08em] transition-all duration-300"
                  style={{
                    border: formData.voiceover ? '1px solid #c8f53a' : '1px solid rgba(255,255,255,0.07)',
                    background: formData.voiceover ? 'rgba(200,245,58,0.07)' : '',
                    color: formData.voiceover ? '#c8f53a' : 'rgba(245,245,240,0.6)',
                  }}
                >
                  Voiceover — $10
                </button>
                {formData.voiceover && (
                  <select
                    aria-label="Voiceover accent"
                    value={formData.voiceoverAccent}
                    onChange={(e) => updateField('voiceoverAccent', e.target.value as never)}
                    className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded px-3 py-2 font-mono text-[0.72rem] text-white/70 uppercase tracking-[0.06em] focus:border-accent/50 outline-none cursor-pointer"
                  >
                    <option value="" disabled>Select accent</option>
                    <option value="british">British — $10</option>
                    <option value="american">American — $10</option>
                    <option value="asian">Asian — $10</option>
                  </select>
                )}
              </div>

              {/* Variations */}
              <div className="space-y-2">
                <button type="button"
                  onClick={() => { updateField('variations', !formData.variations); if (formData.variations) updateField('variationsQty', ''); }}
                  className="h-[52px] w-full bg-white/[0.03] rounded font-mono text-[0.72rem] uppercase tracking-[0.08em] transition-all duration-300"
                  style={{
                    border: formData.variations ? '1px solid #c8f53a' : '1px solid rgba(255,255,255,0.07)',
                    background: formData.variations ? 'rgba(200,245,58,0.07)' : '',
                    color: formData.variations ? '#c8f53a' : 'rgba(245,245,240,0.6)',
                  }}
                >
                  + Variations
                </button>
                {formData.variations && (
                  <select
                    aria-label="Number of variations"
                    value={formData.variationsQty}
                    onChange={(e) => updateField('variationsQty', e.target.value as never)}
                    className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded px-3 py-2 font-mono text-[0.72rem] text-white/70 uppercase tracking-[0.06em] focus:border-accent/50 outline-none cursor-pointer"
                  >
                    <option value="" disabled>Select quantity</option>
                    <option value="1">1 Variation — $10</option>
                    <option value="3">3 Variations — $25</option>
                    <option value="5">5 Variations — $40</option>
                  </select>
                )}
              </div>

              {/* Thumbnail */}
              <button type="button"
                onClick={() => updateField('thumbnail', !formData.thumbnail)}
                className="h-[52px] w-full bg-white/[0.03] rounded font-mono text-[0.72rem] uppercase tracking-[0.08em] transition-all duration-300"
                style={{
                  border: formData.thumbnail ? '1px solid #c8f53a' : '1px solid rgba(255,255,255,0.07)',
                  background: formData.thumbnail ? 'rgba(200,245,58,0.07)' : '',
                  color: formData.thumbnail ? '#c8f53a' : 'rgba(245,245,240,0.6)',
                }}
              >
                Thumbnail — $10
              </button>
            </div>
          </div>

          {/* Total preview */}
          {pkgValue && total > 0 && (
            <div className="flex items-center justify-between px-4 py-3 rounded" style={{ background: 'rgba(200,245,58,0.06)', border: '1px solid rgba(200,245,58,0.15)' }}>
              <span className="font-mono text-[0.72rem] tracking-wider uppercase text-white/50">Total</span>
              <span className="font-display text-2xl text-accent">${total} USD</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent text-black py-[18px] rounded font-mono font-bold tracking-[0.1em] uppercase hover:bg-[#d6ff44] transition disabled:opacity-60"
          >
            {submitting ? 'Preparing payment...' : 'Submit My Order →'}
          </button>

          <p className="text-[0.75rem] text-white/60 text-center">
            We'll confirm your order within a few hours and begin production immediately. ⚡
          </p>
        </form>
      </div>

      {/* Payment modal */}
      {showPayment && (
        <PaymentModal
          total={total}
          email={formData.email}
          productName={formData.productName}
          packageLabel={pkgValue}
          extras={extrasLabel}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Success modal */}
      {showSuccess && (
        <SuccessModal email={formData.email} onClose={handleSuccessClose} />
      )}

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
      )}
    </section>
  );
}
