import { useReveal } from '../../hooks/useReveal';
import SectionLabel from '../ui/SectionLabel';

const BULLETS = [
  {
    title: 'Built from scratch, always.',
    body: 'Every creative is built from the ground up for your specific product — unique visuals, unique script, unique feel.',
  },
  {
    title: 'Platform-native execution.',
    body: 'We engineer ads that feel native to TikTok and Meta feeds — not like ads.',
  },
  {
    title: 'Built for buyers, not views.',
    body: 'Every frame is designed to drive clicks and purchases, not vanity metrics.',
  },
  {
    title: 'Ecommerce-only focus.',
    body: 'We specialize in fast-moving products and dropshipping conversion psychology.',
  },
];

const FEATURES = [
  { emoji: '🎯', title: 'Ecommerce Experts',   body: 'Built for impulse-driven product ads with high conversion intent.' },
  { emoji: '📈', title: 'Performance-First',    body: 'Every creative decision is based on proven conversion data.' },
  { emoji: '🔥', title: 'Trending Formats',     body: 'Modern ad styles that blend naturally into social feeds.' },
  { emoji: '⚡', title: 'Fully Original',       body: 'No templates. Every ad is custom-built for your product.' },
];

export default function WhyUs() {
  const textRef = useReveal();
  const gridRef = useReveal();

  return (
    <section id="why" className="py-20 md:py-[120px] px-5 md:px-[5%] bg-[#101010]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px] items-start lg:items-center">

        {/* Left: Text */}
        <div ref={textRef as React.RefObject<HTMLDivElement>} className="reveal">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2
            className="font-display leading-tight tracking-[0.01em] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
          >
            Your Winning Ad<br />Is Here.
          </h2>
          <p className="text-[1rem] text-white/60 max-w-[520px] font-light">
            Every ad is built from scratch using proven ecommerce frameworks — designed to stop the scroll and drive real conversions.
          </p>

          <div className="flex flex-col gap-6 mt-10">
            {BULLETS.map(({ title, body }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-5 h-5 mt-1 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center text-[0.6rem] text-accent flex-shrink-0">
                  ✓
                </div>
                <p className="text-[0.9rem] text-white/60 leading-[1.6]">
                  <strong className="text-white font-medium">{title}</strong> {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Feature grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="reveal grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden"
        >
          {FEATURES.map(({ emoji, title, body }) => (
            <div key={title} className="bg-card p-6 md:p-8 transition hover:bg-[#1a1a1a]">
              <div className="text-[1.5rem] mb-3">{emoji}</div>
              <div className="font-display text-[1.1rem] mb-2">{title}</div>
              <p className="text-[0.82rem] text-white/60 leading-[1.7]">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
