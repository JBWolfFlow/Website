import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Hero — AryaTech dark liquid-glass hero
 *
 * Layout: full-bleed dark navy with atmospheric gradient mesh,
 * royal-blue eyebrow tagline, big headline with orange-gradient on
 * "production", subheadline, two liquid-glass CTAs, tiny paper-plane
 * accent upper-right. Designed via gpt-image-2 mockup
 * (public/generated/mockups/hero/image-20260517-225918-ca6f6b-hero-v2-liquid-glass.png).
 */
const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const shouldAnimate = !prefersReducedMotion && !isMobile;

  const fade = (delay = 0) =>
    shouldAnimate
      ? {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        }
      : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } };

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1A3A]"
      style={{ maxWidth: '100vw' }}
    >
      {/* Background gradient mesh — soft blue glow upper-left, warm orange bloom lower-right */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 15% 25%, rgba(30, 91, 255, 0.45) 0%, transparent 60%),' +
              'radial-gradient(ellipse 55% 50% at 85% 80%, rgba(255, 138, 30, 0.28) 0%, transparent 65%),' +
              'linear-gradient(135deg, #0B1A3A 0%, #060F2A 100%)',
          }}
        />
        {/* Atmospheric orbs — translucent, with blur, for depth */}
        <div
          className="absolute -left-32 top-1/3 w-[480px] h-[480px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(30, 91, 255, 0.18) 0%, rgba(30, 91, 255, 0) 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute right-0 bottom-0 w-[420px] h-[420px] rounded-3xl"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(255, 138, 30, 0.22) 0%, rgba(255, 138, 30, 0) 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Paper-plane accent — upper-right. PNG bg is solid #0B1A3A matching the hero base; mix-blend-mode: lighten cleanly blends any slight bg variance. */}
      <img
        src="/generated/hero/paper-plane.png"
        alt=""
        aria-hidden="true"
        className="absolute top-20 right-8 sm:right-16 w-20 sm:w-28 opacity-85 pointer-events-none select-none"
        style={{ mixBlendMode: 'lighten' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* Eyebrow */}
        <motion.p
          {...fade(0.1)}
          className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary-400 mb-6"
        >
          Intelligent Solutions, Secure Future
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fade(0.25)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-white mb-8"
        >
          We build{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #FFB04A 0%, #FF8A1E 100%)',
            }}
          >
            production
          </span>{' '}
          software.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fade(0.4)}
          className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          AryaTech engineers software across desktop, web, and mobile. We build our
          own product portfolio and partner with companies that need{' '}
          <span className="text-white font-medium">production software built right.</span>
        </motion.p>

        {/* CTAs — liquid-glass treatment */}
        <motion.div
          {...fade(0.55)}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary — tinted royal-blue glass with glow */}
          <button
            onClick={() => scrollToSection('contact')}
            aria-label="Get in touch with AryaTech"
            className="group relative px-8 py-3.5 rounded-full text-white font-semibold text-base
                       bg-primary-500/90 backdrop-blur-xl border border-primary-300/30
                       shadow-[0_0_30px_rgba(30,91,255,0.4)] hover:shadow-[0_0_50px_rgba(30,91,255,0.6)]
                       transition-all duration-300 hover:bg-primary-500 hover:scale-[1.02]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1A3A]"
          >
            Get in Touch
          </button>

          {/* Secondary — pure liquid glass */}
          <button
            onClick={() => scrollToSection('portfolio')}
            aria-label="View our portfolio of work"
            className="group relative px-8 py-3.5 rounded-full text-white font-semibold text-base
                       bg-white/5 backdrop-blur-xl border border-white/20
                       hover:bg-white/10 hover:border-white/30
                       transition-all duration-300 hover:scale-[1.02]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1A3A]"
          >
            View Our Work
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator — calm, faint, only when motion allowed */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 6, 0] }}
          transition={{ opacity: { duration: 1, delay: 1.5 }, y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
          aria-hidden="true"
        >
          <svg className="w-5 h-5 text-white/60" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
