import { useEffect, useRef } from 'react';
import { CAROUSEL_VIDEOS } from '../../data/videos';

const CARD_W = 240;
const GAP = 20;
const SPEED = 0.5;

export default function Carousel() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const outerEl = outer as HTMLDivElement;
    const trackEl = track as HTMLDivElement;

    trackEl.innerHTML = '';

    function makeCard(data: { img: string; title: string }): HTMLDivElement {
      const div = document.createElement('div');
      div.style.cssText =
        'width:240px;height:380px;flex-shrink:0;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);position:relative;background:#111;';

      const img = document.createElement('img');
      img.src = data.img;
      img.alt = data.title;
      img.loading = 'eager';
      img.decoding = 'async';
      img.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;';

      div.appendChild(img);
      return div;
    }

    // Triple the set for seamless infinite loop
    for (let s = 0; s < 3; s++) {
      CAROUSEL_VIDEOS.forEach((d) => {
        trackEl.appendChild(makeCard(d));
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

    function loop() {
      if (autoOn && !isDrag) {
        pos += SPEED;
        clampPos();
        trackEl.style.transform = `translateX(-${pos}px)`;
      }
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