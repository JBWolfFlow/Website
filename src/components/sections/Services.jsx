import { motion } from 'framer-motion';
import { Bot, Cpu, Smartphone, Code2, Tablet, Server, ArrowUpRight, LayoutGrid } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../utils/cn';

/**
 * Services — AryaTech bento-grid "What We Build"
 *
 * Light section with a calm #F7F9FC surface and one subtle blue glow
 * upper-right. Liquid-glass-on-light cards in a bento layout (varied
 * widths). Each card: royal-blue icon orb, dark-navy title, gray
 * tagline, mono-font tech chips. Designed via gpt-image-2 mockup
 * (public/generated/mockups/services/image-20260517-233416-5b7fb6-services-v1-bento.png).
 */

const services = [
  {
    icon: Bot,
    title: 'AI Orchestration & Agents',
    tagline: 'Multi-agent systems combining major providers, local models, and task-specific custom training.',
    chips: ['Anthropic', 'OpenAI', 'ReAct', 'Tool Use'],
    span: 'md:col-span-2',
  },
  {
    icon: Cpu,
    title: 'Rust Systems Engineering',
    tagline: 'High-performance backends and security-critical services.',
    chips: ['Tokio', 'Docker', 'Async'],
    span: 'md:col-span-1',
  },
  {
    icon: Smartphone,
    title: 'Native iOS (SwiftUI)',
    tagline: 'SwiftUI apps shipped to the App Store.',
    chips: ['SwiftUI', 'StoreKit 2', 'Stripe Connect'],
    span: 'md:col-span-1',
  },
  {
    icon: Code2,
    title: 'Full-Stack TypeScript',
    tagline: 'React + Tauri + Vite, end-to-end typed.',
    chips: ['React 19', 'Tauri 2.0', 'Vite'],
    span: 'md:col-span-1',
  },
  {
    icon: Tablet,
    title: 'Cross-Platform Mobile',
    tagline: 'React Native + Expo with the New Architecture.',
    chips: ['React Native', 'Expo SDK 53', 'EAS'],
    span: 'md:col-span-1',
  },
  {
    icon: Server,
    title: 'Backend & Infrastructure',
    tagline: 'Production APIs, auth, and infrastructure.',
    chips: ['FastAPI', 'PostgreSQL', 'Redis', 'JWT'],
    span: 'md:col-span-2',
  },
];

const exploreCard = {
  icon: LayoutGrid,
  title: 'Explore our work',
  tagline: 'See how these capabilities come together in our product portfolio.',
  span: 'md:col-span-1',
  href: 'portfolio',
};

function ServiceCard({ icon: Icon, title, tagline, chips, span, index }) {
  const prefersReducedMotion = useReducedMotion();
  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
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
      variants={cardVariants}
      className={cn(
        'group relative rounded-2xl p-7 sm:p-8 flex flex-col',
        'bg-white/70 backdrop-blur-md border border-neutral-200/70',
        'shadow-[0_1px_2px_rgba(11,42,107,0.04),0_8px_24px_rgba(11,42,107,0.04)]',
        'hover:border-primary-300/60 hover:shadow-[0_12px_40px_rgba(30,91,255,0.08)]',
        'transition-all duration-300',
        span
      )}
    >
      {/* Icon orb */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200/70 ring-1 ring-primary-200/80">
          <Icon className="w-5 h-5 text-primary-600" strokeWidth={2} aria-hidden="true" />
        </div>
      </div>

      {/* Title + tagline */}
      <h3 className="text-xl sm:text-2xl font-semibold text-primary-800 leading-snug mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-5">
        {tagline}
      </p>

      {/* Tech chips */}
      <ul className="flex flex-wrap gap-2 mt-auto" role="list">
        {chips.map((chip) => (
          <li
            key={chip}
            className="font-mono text-[11px] tracking-tight px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/80"
          >
            {chip}
          </li>
        ))}
      </ul>

      {/* Hover arrow */}
      <ArrowUpRight
        className="absolute bottom-6 right-6 w-5 h-5 text-primary-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
        aria-hidden="true"
      />
    </motion.article>
  );
}

function ExploreCard({ index }) {
  const prefersReducedMotion = useReducedMotion();
  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
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

  const Icon = exploreCard.icon;

  const handleClick = () => {
    const el = document.getElementById(exploreCard.href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.button
      variants={cardVariants}
      onClick={handleClick}
      className={cn(
        'group relative rounded-2xl p-7 sm:p-8 flex flex-col text-left',
        'bg-gradient-to-br from-primary-50/80 to-white/60 backdrop-blur-md',
        'border border-primary-200/60 hover:border-primary-400/70',
        'shadow-[0_1px_2px_rgba(11,42,107,0.04),0_8px_24px_rgba(11,42,107,0.05)]',
        'hover:shadow-[0_12px_40px_rgba(30,91,255,0.12)]',
        'transition-all duration-300 cursor-pointer',
        exploreCard.span
      )}
      aria-label="Explore our product portfolio"
    >
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 ring-1 ring-primary-300/80 shadow-[0_4px_12px_rgba(30,91,255,0.25)]">
          <Icon className="w-5 h-5 text-white" strokeWidth={2} aria-hidden="true" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold text-primary-800 leading-snug mb-2">
        {exploreCard.title}
      </h3>
      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-5">
        {exploreCard.tagline}
      </p>

      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
        View our work
        <ArrowUpRight
          className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          aria-hidden="true"
        />
      </span>
    </motion.button>
  );
}

export function Services() {
  const [ref, isInView] = useInView({ threshold: 0.1 }, true);
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 },
    },
  };

  const heading = (delay = 0) => ({
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
      id="services"
      className="relative py-24 md:py-32 bg-[#F7F9FC] overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Subtle blue glow upper-right */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-50"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle, rgba(30, 91, 255, 0.10) 0%, transparent 70%)',
          filter: 'blur(60px)',
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
              variants={heading(0)}
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary-500"
            >
              What We Build
            </motion.p>
            <motion.h2
              id="services-heading"
              variants={heading(0.1)}
              className="text-4xl md:text-5xl font-bold text-primary-800 leading-tight"
            >
              Six engineering disciplines
            </motion.h2>
            <motion.p
              variants={heading(0.2)}
              className="text-base md:text-lg text-neutral-600 leading-relaxed"
            >
              Applied across our product portfolio and client engagements.
            </motion.p>
          </div>

          {/* Bento grid */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            {services.map((service, idx) => (
              <ServiceCard key={service.title} {...service} index={idx} />
            ))}
            <ExploreCard index={services.length} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
