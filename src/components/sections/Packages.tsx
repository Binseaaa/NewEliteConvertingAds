import { PACKAGES } from '../../data/packages';
import type { PackageId } from '../../types';

interface Props {
  onSelectPackage?: (id: PackageId) => void;
}

export default function Packages({ onSelectPackage }: Props) {
  return (
    <section id="packages" className="py-20 md:py-[100px] px-5 md:px-[5%] bg-black">

      <div className="text-center mb-12 md:mb-[60px] max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-accent mb-4">
          Pricing
        </div>
        <h2 className="font-display leading-tight tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}>
          Simple, Transparent Packages
        </h2>
        <p className="text-sm md:text-base text-white/50 font-light">
          Pick your format. We'll handle everything else.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative group rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
              pkg.featured
                ? 'border border-accent/50 bg-gradient-to-br from-[#141a08] to-[#0f140a] hover:border-accent'
                : 'bg-card border border-white/10 hover:border-white/20'
            }`}
          >
            {pkg.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-[0.6rem] font-bold tracking-widest uppercase px-3 py-1 rounded">
                Most Popular
              </div>
            )}

            <div>
              <h3 className="font-display text-xl md:text-2xl mb-1">{pkg.name}</h3>
              <p className="text-xs text-white/50 mb-6">{pkg.tagline}</p>

              <div className="font-display text-3xl md:text-4xl text-accent mb-1">${pkg.price}</div>
              <span className="block text-[0.7rem] text-white/50 font-mono tracking-wider mb-6">
                per {pkg.featured ? 'bundle' : pkg.id === 'starter' ? 'ad' : 'bundle'} · delivered in {pkg.deliveryTime}
              </span>

              <div className="h-px bg-white/10 mb-6" />

              <ul className="flex flex-col gap-2 text-sm text-white/60 mb-6">
                {pkg.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <div className="text-[0.65rem] px-3 py-2 bg-accent/10 border border-accent/20 text-accent font-mono tracking-wider rounded">
                YOU RECEIVE · {pkg.videoCount}
              </div>
            </div>

            <a
              href="#order"
              onClick={() => onSelectPackage?.(pkg.id)}
              className={`mt-6 block text-center py-3 rounded text-xs font-mono tracking-wider uppercase transition ${
                pkg.featured
                  ? 'bg-accent text-black hover:bg-[#d6ff44] hover:shadow-lg'
                  : 'border border-white/10 text-white hover:border-white/30 hover:bg-white/5'
              }`}
            >
              Order {pkg.name} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
