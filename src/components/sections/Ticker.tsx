const ITEMS = [
  'TikTok Ads', 'Meta Ads', 'Instagram Reels', 'Story Ads',
  'Ecommerce Creatives', 'Dropshipping Ads', 'Scroll-Stopping Hooks',
  '24–48h Delivery', 'Unlimited Revisions',
];

const ALL_ITEMS = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div className="bg-accent text-black overflow-hidden py-3 relative mt-20">
      <div className="flex gap-0 whitespace-nowrap animate-ticker">
        {ALL_ITEMS.map((item, i) => (
          <span
            key={i}
            className="ticker-item font-display text-[0.95rem] tracking-[0.12em] px-10 inline-flex items-center gap-4"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
