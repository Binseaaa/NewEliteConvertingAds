import Carousel from './Carousel';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-[50px] pb-[40px] overflow-x-hidden">
      {/* Background glow */}
      <div className="absolute w-[800px] h-[800px] bg-accent/10 blur-[140px] rounded-full opacity-40 -top-40 -right-40 pointer-events-none" />

      {/* Hero content */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto text-center px-4"
        style={{ animation: 'fadeInUp 1s ease-out' }}
      >
        {/* Badge */}
        <div className="font-display inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 font-mono text-[0.7rem] tracking-widest uppercase text-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-accent animate-dotPulse" />
          NOW ACCEPTING ORDERS
        </div>

        {/* Heading */}
        <h1
          className="font-display text-white mb-5 leading-[0.95]"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5.8rem)' }}
        >
          ADS DESIGNED TO
          <span className="text-accent block font-display">CONVERT & SCALE</span>
        </h1>

        {/* Subtext */}
        <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Elite Converting Ads builds high-converting ecommerce ads using proven formats,
          strategic scripting, and performance-driven execution.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#order"
            className="bg-accent text-black font-mono text-xs font-bold tracking-widest uppercase px-6 py-4 rounded-sm hover:bg-[#d6ff44] hover:-translate-y-0.5 transition"
          >
            Order Your Ad Now →
          </a>
          <a
            href="#examples"
            className="text-white font-mono text-xs tracking-widest uppercase px-6 py-4 rounded-sm border border-white/10 hover:border-white/30 hover:bg-white/5 transition"
          >
            See Examples
          </a>
        </div>
      </div>

      {/* Carousel */}
      <Carousel />
    </section>
  );
}
