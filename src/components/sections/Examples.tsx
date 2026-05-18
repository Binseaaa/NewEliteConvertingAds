import { useReveal } from '../../hooks/useReveal';
import VideoCard from '../ui/VideoCard';
import SectionLabel from '../ui/SectionLabel';
import { TIKTOK_VIDEOS, META_VIDEOS } from '../../data/videos';

export default function Examples() {
  const headerRef = useReveal();
  const tikTokRef = useReveal();
  const metaRef = useReveal();

  return (
    <section id="examples" className="py-[100px] px-[5%] bg-[#101010]">

      {/* Header */}
      <div ref={headerRef as React.RefObject<HTMLDivElement>} className="reveal text-center mb-16">
        <SectionLabel className="justify-center">Examples</SectionLabel>
        <h2
          className="font-display leading-none tracking-[0.01em] mb-4"
          style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
        >
          Elite Ads in Action
        </h2>
        <p className="text-[1rem] text-white/45 max-w-[480px] font-light mx-auto">
          Built for the formats that convert — native-feeling, platform-optimized, scroll-stopping.
        </p>
      </div>

      {/* 9:16 Group */}
      <div ref={tikTokRef as React.RefObject<HTMLDivElement>} className="reveal mb-[60px]">
        <div className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-white/45 mb-6 pb-3 border-b border-white/[0.07]">
          <span className="text-accent mr-2">9:16</span> TikTok · Stories · Reels
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TIKTOK_VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>

      {/* 1:1 Group */}
      <div ref={metaRef as React.RefObject<HTMLDivElement>} className="reveal">
        <div className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-white/45 mb-6 pb-3 border-b border-white/[0.07]">
          <span className="text-accent mr-2">1:1</span> Meta · Feed Ads
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {META_VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>

    </section>
  );
}
