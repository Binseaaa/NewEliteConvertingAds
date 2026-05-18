import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#examples', label: 'Examples' },
  { href: '#process', label: 'How It Works' },
  { href: '#packages', label: 'Packages' },
  { href: '#why', label: 'Why Us' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#mobile-menu') && !target.closest('#menu-btn')) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <nav
      className="sticky top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10"
      style={{ overflow: 'visible' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="text-white font-display text-lg sm:text-xl tracking-wide">
            ELITE <span className="text-accent">CONVERTING ADS</span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="relative text-xs sm:text-sm font-medium tracking-wider uppercase text-white/50 transition-colors duration-300 hover:text-white group"
                >
                  {label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#order"
            className="hidden md:inline-block bg-accent text-black font-mono text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-sm transition hover:bg-[#d6ff44]"
          >
            Get Started →
          </a>

          {/* Mobile Menu Button */}
          <button
            id="menu-btn"
            className="md:hidden text-white focus:outline-none text-2xl leading-none w-10 h-10 flex items-center justify-center z-10"
            aria-label="Toggle menu"
            type="button"
            onClick={(e) => { e.stopPropagation(); setMobileOpen((o) => !o); }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 right-0 z-[9999] flex flex-col gap-1"
          style={{
            background: 'rgba(8,8,8,0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            padding: '16px 20px 24px',
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="mobile-nav-link" onClick={close}>
              {label}
            </a>
          ))}
          <a
            href="#order"
            onClick={close}
            className="mt-3 block text-center bg-accent text-black font-mono text-[0.7rem] font-bold tracking-[0.1em] uppercase py-3.5 px-5 rounded-sm"
          >
            Get Started →
          </a>
        </div>
      )}
    </nav>
  );
}
