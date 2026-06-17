import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Github, MapPin } from 'lucide-react';
import { siteConfig } from '@data/siteConfig';

/**
 * Footer — AryaTech dark-navy footer
 *
 * Four-column layout: brand (logo + tagline + location), Explore nav,
 * Products, Contact (dual emails + GitHub + Get in Touch CTA). Tiny
 * paper-plane accent upper-right. Bottom strip: copyright + legal.
 * Designed via gpt-image-2 mockup
 * (public/generated/mockups/footer/image-20260518-003701-65c4ff-footer-v1.png).
 */

const exploreLinks = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Capabilities' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'testimonials', label: 'Track Record' },
  { id: 'contact', label: 'Contact' },
];

const productLinks = [
  { id: 'portfolio', label: 'Huntress' },
  { id: 'portfolio', label: 'Watch & See' },
  { id: 'portfolio', label: 'Urban Aid' },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClass =
    'text-sm text-white/70 hover:text-white transition-colors duration-200 text-left';
  const labelClass =
    'text-xs font-semibold uppercase tracking-[0.2em] text-primary-400 mb-4';

  return (
    <footer className="relative bg-[#0A1530] text-white/80 overflow-hidden">
      {/* Subtle blue radial tint upper-left */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full opacity-30"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle, rgba(30, 91, 255, 0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Paper-plane accent — upper-right */}
      <img
        src="/generated/hero/paper-plane.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-8 right-8 sm:right-12 w-8 sm:w-10 opacity-60 pointer-events-none select-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14 md:py-16">
        {/* Top: 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <button
              onClick={() => goToSection('hero')}
              className="flex items-center space-x-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-md"
              aria-label="Go to home"
            >
              <img
                src="/logo-mark.png"
                alt="AryaTech Logo"
                className="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-xl font-bold text-white">
                {siteConfig.name}
              </span>
            </button>
            <p className="text-sm text-white/70 leading-relaxed">
              {siteConfig.tagline}
            </p>
            <p className="text-xs text-white/50 leading-relaxed flex items-center gap-1.5">
              <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              Based in Temple, TX · serving clients nationwide
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <h3 className={labelClass}>Explore</h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((item) => (
                <li key={`${item.label}-${item.id}`}>
                  <button
                    type="button"
                    onClick={() => goToSection(item.id)}
                    className={linkClass}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/team" className={linkClass}>
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="md:col-span-2">
            <h3 className={labelClass}>Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => goToSection(item.id)}
                    className={linkClass}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className={labelClass}>Contact</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-mono text-[11px] sm:text-xs text-white/70 hover:text-white transition-colors duration-200 break-all"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              {siteConfig.social?.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AryaTech on GitHub"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 text-white/80 hover:text-white transition-all duration-200"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
              <button
                type="button"
                onClick={() => goToSection('contact')}
                className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold text-white border border-white/30 hover:border-white/50 hover:bg-white/5 transition-all duration-200"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center md:justify-end">
            <Link
              to="/privacy"
              className="text-xs text-white/55 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-white/55 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-xs text-white/55 hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
