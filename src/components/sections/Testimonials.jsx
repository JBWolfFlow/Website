import { motion } from 'framer-motion';
import { Star, CheckCircle2, Bot, MapPin, Globe2, Server } from 'lucide-react';
import { trackRecord } from '../../data/testimonials';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../utils/cn';

/**
 * Track Record — AryaTech stats grid
 *
 * 3x2 bento of liquid-glass-on-light stat cards over a calm #F7F9FC
 * background with a subtle geometric grid pattern. Each card: tiny
 * lucide icon + huge stat value in dark navy + label + source line.
 * Designed via gpt-image-2 mockup
 * (public/generated/mockups/track-record/image-20260518-002128-0b8595-trackrecord-v1.png).
 */

// Icon for each stat (mapped by id from trackRecord data)
const statIcons = {
  1: Star,
  2: CheckCircle2,
  3: Bot,
  4: MapPin,
  5: Globe2,
  6: Server,
};

// Optional: which stats render their special accent character in orange
const statAccents = {
  1: { value: '5.0', accent: '★' }, // App Store Rating — orange star
};

function StatCard({ stat, index }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = statIcons[stat.id];
  const accent = statAccents[stat.id];

  const variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.article
      variants={variants}
      className={cn(
        'group rounded-2xl p-7 sm:p-8 flex flex-col',
        'bg-white/70 backdrop-blur-md border border-neutral-200/70',
        'shadow-[0_1px_2px_rgba(11,42,107,0.04),0_8px_24px_rgba(11,42,107,0.04)]',
        'hover:border-primary-300/60 hover:shadow-[0_12px_40px_rgba(30,91,255,0.08)]',
        'transition-all duration-300'
      )}
    >
      {Icon && (
        <Icon
          className="w-6 h-6 text-neutral-400 mb-5"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}

      <div className="text-5xl md:text-6xl font-bold tracking-tight text-primary-800 leading-none mb-4">
        {accent ? (
          <>
            {accent.value}
            <span className="text-accent-500">{accent.accent}</span>
          </>
        ) : (
          stat.value
        )}
      </div>

      <div className="text-base md:text-lg font-semibold text-primary-800 mb-1.5">
        {stat.label}
      </div>

      <div className="text-sm text-neutral-500 leading-relaxed">{stat.source}</div>
    </motion.article>
  );
}

const Testimonials = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 }, true);
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 },
    },
  };

  const reveal = (delay = 0) => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative py-24 md:py-32 bg-[#F7F9FC] overflow-hidden"
      aria-labelledby="trackrecord-heading"
    >
      {/* Subtle geometric grid pattern in background — hints at "data" */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(11, 42, 107, 0.05) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(11, 42, 107, 0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={container}
          className="space-y-14 md:space-y-16"
        >
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <motion.p
              variants={reveal(0)}
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary-500"
            >
              Track Record
            </motion.p>
            <motion.h2
              id="trackrecord-heading"
              variants={reveal(0.1)}
              className="text-4xl md:text-5xl font-bold text-primary-800 leading-tight"
            >
              What we&rsquo;ve shipped, by the numbers.
            </motion.h2>
            <motion.p
              variants={reveal(0.2)}
              className="text-base md:text-lg text-neutral-600 leading-relaxed"
            >
              Concrete metrics from production codebases and live deployments.
            </motion.p>
          </div>

          {/* Stat grid — 1 col mobile, 2 cols sm, 3 cols lg */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {trackRecord.map((stat, idx) => (
              <StatCard key={stat.id} stat={stat} index={idx} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
