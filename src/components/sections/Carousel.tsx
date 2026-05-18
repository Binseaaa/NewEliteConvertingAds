import { useEffect, useRef } from 'react';
import { CAROUSEL_VIDEOS } from '../../data/videos';

const CARD_W = 240;
const GAP = 20;
const SPEED = 0.5;

type CarouselCard = HTMLDivElement & { _vid: HTMLVideoElement; _vidSrc: string; _loaded: boolean };

export default function Carousel() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    // Store as non-null typed locals so nested functions don't lose the type narrowing
    const outerEl = outer as HTMLDivElement;
    const trackEl = track as HTMLDivElement;

    trackEl.innerHTML = '';

    function makeCard(data: { img: string; src: string }): CarouselCard {
      const div = document.createElement('div') as CarouselCard;
      div.style.cssText =
        'width:240px;height:380px;flex-shrink:0;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);position:relative;background:#111;';

      const thumb = document.createElement('img');
      thumb.src = data.img;
      thumb.loading = 'eager';
      thumb.decoding = 'async';
      thumb.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;filter:blur(4px);transform:scale(1.05);';
      div.appendChild(thumb);

      const vid = document.createElement('video');
      vid.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 0.6s ease;';
      vid.autoplay = true;
      vid.muted = true;
      vid.loop = true;
      vid.preload = 'none';
      vid.setAttribute('playsinline', '');
      vid.addEventListener('canplay', function (this: HTMLVideoElement) { this.style.opacity = '1'; thumb.style.filter = 'none'; thumb.style.transform = 'none';  }, { once: true });
      div.appendChild(vid);

      div._vid = vid;
      div._vidSrc = data.src;
      div._loaded = false;
      return div;
    }

    const allCards: CarouselCard[] = [];
    for (let s = 0; s < 3; s++) {
      CAROUSEL_VIDEOS.forEach((d) => {
        const card = makeCard(d);
        trackEl.appendChild(card);
        allCards.push(card);
      });
    }

    const setWidth = CAROUSEL_VIDEOS.length * (CARD_W + GAP);
    let pos = setWidth;
    let autoOn = true;
    let isDrag = false;
    let startX = 0;
    let startPos = 0;
    let rafId = 0;

    trackEl.style.transform = `translateX(-${pos}px)`;

    function clampPos() {
      if (pos >= setWidth * 2) pos -= setWidth;
      if (pos < 0) pos += setWidth;
    }

    const VIEWPORT_W = window.innerWidth;

    function loadNearbyVideos() {
      allCards.forEach((card, i) => {
        if (card._loaded) return;
        const cardLeft = i * (CARD_W + GAP) - pos;
        if (cardLeft > -(CARD_W * 2) && cardLeft < VIEWPORT_W + CARD_W * 2) {
          card._loaded = true;
          card._vid.src = card._vidSrc;
          card._vid.load();
          card._vid.play().catch(() => {});
        }
      });
    }

    function loop() {
      if (autoOn && !isDrag) {
        pos += SPEED;
        clampPos();
        trackEl.style.transform = `translateX(-${pos}px)`;
      }
      loadNearbyVideos();
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    const onMouseDown = (e: MouseEvent) => {
      isDrag = true; startX = e.clientX; startPos = pos;
      outerEl.style.cursor = 'grabbing'; e.preventDefault();
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDrag) return;
      pos = startPos - (e.clientX - startX); clampPos();
      trackEl.style.transform = `translateX(-${pos}px)`;
    };
    const onMouseUp = () => {
      if (!isDrag) return;
      isDrag = false; outerEl.style.cursor = 'grab';
      autoOn = false; setTimeout(() => { autoOn = true; }, 900);
    };

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX; startPos = pos; autoOn = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      pos = startPos - (e.touches[0].clientX - startX); clampPos();
      trackEl.style.transform = `translateX(-${pos}px)`;
    };
    const onTouchEnd = () => { setTimeout(() => { autoOn = true; }, 900); };

    outerEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    outerEl.addEventListener('touchstart', onTouchStart, { passive: true });
    outerEl.addEventListener('touchmove', onTouchMove, { passive: true });
    outerEl.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(rafId);
      outerEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      outerEl.removeEventListener('touchstart', onTouchStart);
      outerEl.removeEventListener('touchmove', onTouchMove);
      outerEl.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="relative w-full mt-6 overflow-hidden select-none"
      style={{ cursor: 'grab' }}
    >
      <div
        ref={trackRef}
        className="flex w-max"
        style={{ gap: `${GAP}px`, willChange: 'transform' }}
      />
    </div>
  );
}