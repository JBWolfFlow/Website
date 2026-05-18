import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../utils/cn';

/**
 * 404 — AryaTech "Page not found"
 *
 * Matches the rebrand's modest liquid-glass-on-light aesthetic.
 * Generated illustration (paper-plane veered off-course with 404
 * digits floating around it) over the standard #F7F9FC surface.
 */

const NotFound = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const handleGoHome = () => navigate('/');
  const handleGoBack = () => window.history.back();

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.6,
      delay: prefersReducedMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  const links = [
    { href: '/#about', label: 'About' },
    { href: '/#services', label: 'Capabilities' },
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/team', label: 'Our Team' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <main className="relative min-h-screen bg-[#F7F9FC] overflow-hidden flex items-center justify-center px-4 sm:px-6 py-24 md:py-28">
      {/* Subtle blue glow upper-left */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full opacity-40"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle, rgba(30, 91, 255, 0.10) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-3xl w-full text-center">
        {/* Illustration */}
        <motion.div {...fade(0)} className="mb-8 flex justify-center">
          <img
            src="/generated/404/illustration.png"
            alt="A paper plane veered off-course with 4 0 4 digits drifting nearby"
            className="w-56 sm:w-72 md:w-80 h-auto select-none"
            draggable={false}
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          {...fade(0.1)}
          className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary-500 mb-3"
        >
          404 · Off course
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fade(0.18)}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800 leading-tight mb-4"
        >
          This page took a wrong turn.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          {...fade(0.28)}
          className="text-base md:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed mb-10"
        >
          The page you&rsquo;re looking for moved, was renamed, or never existed. Don&rsquo;t worry — every other part of the site is one click away.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.4)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={handleGoHome}
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white',
              'bg-primary-500 hover:bg-primary-600',
              'shadow-[0_4px_20px_rgba(30,91,255,0.30)] hover:shadow-[0_8px_30px_rgba(30,91,255,0.45)]',
              'transition-all duration-300 hover:scale-[1.02]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2'
            )}
          >
            Take me home
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-primary-600 border border-primary-200/80 bg-white/70 hover:bg-primary-50 hover:border-primary-300 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Go back
          </button>
        </motion.div>

        {/* Helpful links */}
        <motion.div
          {...fade(0.55)}
          className="mt-14 pt-8 border-t border-neutral-200/80"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500 mb-4">
            Or try one of these
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors group"
              >
                {l.label}
                <ArrowUpRight
                  className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
