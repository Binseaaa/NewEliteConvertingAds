import { useReveal } from '../../hooks/useReveal';

const STEPS = [
  {
    num: '01',
    title: 'Submit Your Product',
    body: 'Share everything we need to bring your product to life — name, images, description, and logo. The more detail you give, the sharper the ad.',
    tags: ['Product Name', 'Images', 'Description', 'Logo'],
  },
  {
    num: '02',
    title: 'Choose Your Ad Format',
    body: 'Pick the aspect ratio that matches your placement strategy — vertical for TikTok and Stories, square for Meta feed dominance.',
    tags: ['9:16 Vertical', '1:1 Square'],
  },
  {
    num: '03',
    title: 'Extras (Optional)',
    body: 'Supercharge your creative with add-ons designed to maximize performance — voiceovers, multiple variations, custom hooks, and more.',
    tags: ['Voiceover', '+Variations', 'Thumbnail'],
  },
  {
    num: '04',
    title: 'Submit & Launch Ready',
    body: 'Complete your order and we get to work immediately. Your ad is delivered in 24–48 hours, ready to upload and start converting.',
    tags: [],
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span className="bg-white/5 border border-white/[0.07] rounded-sm text-[0.68rem] font-mono tracking-[0.08em] px-[10px] py-1 text-white/60 uppercase">
      {label}
    </span>
  );
}

export default function Process() {
  const titleRef = useReveal();

  return (
    <section id="process" className="py-[100px] px-[5%] bg-black">

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="reveal flex items-center gap-[10px] font-mono text-[0.7rem] tracking-[0.2em] uppercase text-accent mb-4 section-label">
          Process
        </div>
        <h2
          className="reveal font-display leading-none tracking-[0.01em] mb-4"
          style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
        >
          From Scratch to Your<br />Winning Ad in Hours
        </h2>
        <p className="reveal text-[1rem] text-white/60 max-w-[480px] font-light">
          Four simple steps. No back-and-forth, no delays. Just results.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[80px] items-start mt-[60px]">

        {/* Steps */}
        <div className="flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <Step key={step.num} step={step} last={i === STEPS.length - 1} />
          ))}
        </div>

        {/* Right visual */}
        <div className="lg:sticky lg:top-16 flex self-stretch">
          <div className="w-full max-w-[420px] mx-auto bg-white/5 border border-white/10 rounded-2xl p-5 md:p-8 flex flex-col items-center justify-between text-center gap-5">

            <div className="text-xs tracking-[0.2em] text-white/70">YOUR PRODUCT</div>

            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-accent/20 shadow-lg">
              <img
                src="public/ASSETS/Screenshot 2026-04-23 105311.png"
                className="w-full h-full object-contain"
                alt="Product"
              />
            </div>

            <svg className="w-5 h-8 opacity-70" viewBox="0 0 24 48" fill="none">
              <path d="M12 0 L12 36" stroke="rgba(200,245,58,0.4)" strokeWidth="2" />
              <path d="M4 28 L12 44 L20 28" stroke="rgba(200,245,58,0.6)" strokeWidth="2" />
            </svg>

            <div className="text-accent text-xs tracking-[0.2em]">HIGH CONVERTING AD</div>

            <div className="relative w-full max-w-[220px] aspect-[9/16] rounded-xl overflow-hidden border border-white/10 bg-black">
              <video
                className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                autoPlay
                controls
                muted
                loop
                playsInline
                preload="metadata"
                onCanPlay={(e) => e.currentTarget.classList.remove('opacity-0')}
              >
                <source
                  src="https://res.cloudinary.com/dobxpxy6x/video/upload/Mini_Shaver_nmnh8c.mp4#t=0.1"
                  type="video/mp4"
                />
              </video>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

function Step({ step, last }: { step: typeof STEPS[0]; last: boolean }) {
  const ref = useReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal flex gap-6 py-8 group ${!last ? 'border-b border-white/[0.07]' : ''}`}
    >
      <div className="font-display text-[3rem] text-accent/15 leading-none flex-shrink-0 w-14 transition-colors duration-300 group-hover:text-accent">
        {step.num}
      </div>
      <div>
        <div className="font-display text-[1.5rem] tracking-[0.03em] mb-2">{step.title}</div>
        <p className="text-[0.9rem] text-white/60 leading-[1.7] font-light">{step.body}</p>
        {step.tags.length > 0 && (
          <div className="flex flex-wrap gap-[6px] mt-3">
            {step.tags.map((tag) => <Tag key={tag} label={tag} />)}
          </div>
        )}
      </div>
    </div>
  );
}