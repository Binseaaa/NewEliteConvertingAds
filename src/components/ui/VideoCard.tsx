import { useRef, useState } from 'react';
import type { VideoItem } from '../../data/videos';

interface Props {
  video: VideoItem;
}

export default function VideoCard({ video }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const aspectClass = video.aspect === '9/16' ? 'aspect-[9/16]' : 'aspect-square';

  return (
    <div
      className={`relative group cursor-pointer rounded-xl overflow-hidden border border-white/10 ${aspectClass}`}
      onClick={toggle}
    >
      {/* Blurred bg */}
      <img
        src={video.img}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'blur(3px)', transform: 'scale(1.05)' }}
      />

      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
        loop
        playsInline
        preload="metadata"
        onLoadedData={(e) => (e.currentTarget.classList.remove('opacity-0'))}
      >
        <source src={`${video.src}#t=0.1`} type="video/mp4" />
      </video>

      {/* Play overlay */}
      <div
        className="play-overlay absolute inset-0 flex items-center justify-center transition-opacity duration-200"
        style={{
          background: 'rgba(8,8,8,0.35)',
          opacity: playing ? 0 : 1,
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          style={{
            background: 'rgba(200,245,58,0.15)',
            border: '1.5px solid rgba(200,245,58,0.6)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#c8f53a" style={{ marginLeft: 3 }}>
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
    </div>
  );
}
