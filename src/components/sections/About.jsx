import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Rocket, Layers, Briefcase, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { teamMembers } from '../../data/team';
import { cn } from '../../utils/cn';

/**
 * About — AryaTech "Who We Are"
 *
 * Two-column layout: liquid-glass story panel (left, 60%) with company
 * narrative + value chips, and stacked founder cards (right, 40%) with
 * real circular photos. "Meet the full team" CTA below. Designed via
 * gpt-image-2 mockup
 * (public/generated/mockups/about/image-20260518-001242-283a28-about-v1.png).
 */

const valueChips = [
  { icon: Users, label: 'Senior Engineering' },
  { icon: Rocket, label: 'Production-First' },
  { icon: Layers, label: 'Full Stack' },
  { icon: Briefcase, label: 'Open to Client Work' },
];

const founderIntros = {
  'Jacob Gonsalves':
    'Owns Huntress end-to-end: agent architecture, Rust scope validators, security model.',
  'Ethan Hoover':
    'Owns Watch & See and Urban Aid: SwiftUI, React Native, UI/UX, FastAPI backends.',
};

export function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 }, true);
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  };

  const reveal = (delay = 0) => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
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
      id="about"
      className="relative py-24 md:py-32 bg-[#F7F9FC] overflow-hidden"
      aria-labelledby="about-heading"
    >
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
              Who We Are
            </motion.p>
            <motion.h2
              id="about-heading"
              variants={reveal(0.1)}
              className="text-4xl md:text-5xl font-bold text-primary-800 leading-tight"
            >
              Small team. Senior throughout.
            </motion.h2>
            <motion.p
              variants={reveal(0.2)}
              className="text-base md:text-lg text-neutral-600 leading-relaxed"
            >
              Two founders, one standard, shipped end to end.
            </motion.p>
          </div>

          {/* Two-column layout */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-7 items-start"
          >
            {/* Story panel — spans 3 of 5 columns on lg */}
            <motion.article
              variants={reveal(0.05)}
              className={cn(
                'lg:col-span-3 rounded-2xl p-7 sm:p-9',
                'bg-white/70 backdrop-blur-md border border-neutral-200/70',
                'shadow-[0_1px_2px_rgba(11,42,107,0.04),0_8px_24px_rgba(11,42,107,0.04)]'
              )}
            >
              <div className="space-y-5 text-base md:text-lg text-neutral-700 leading-relaxed">
                <p>
                  AryaTech is an engineering company focused on production software.
                  We design, build, and operate our own product portfolio, and we
                  partner with companies that need software built to the same standard
                  we apply to our own work.
                </p>
                <p>
                  The portfolio includes{' '}
                  <span className="font-semibold text-primary-800">Huntress</span>, an
                  AI-orchestrated bug bounty platform;{' '}
                  <span className="font-semibold text-primary-800">Watch &amp; See</span>,
                  a native iOS marketplace; and{' '}
                  <span className="font-semibold text-primary-800">Urban Aid</span>, a
                  civic-tech mobile app with a 5.0★ rating on the App Store.
                </p>
                <p>
                  The team is small and senior by design — every product owned by an
                  experienced engineer, every line of code accountable.
                </p>
              </div>

              {/* Value chips */}
              <ul className="mt-7 flex flex-wrap gap-2.5" role="list">
                {valueChips.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-neutral-200/80 text-xs sm:text-sm font-medium text-neutral-700"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary-500" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </motion.article>

            {/* Founder cards — spans 2 of 5 columns on lg, stacked vertically */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {teamMembers.map((member, idx) => (
                <motion.button
                  key={member.id}
                  type="button"
                  onClick={() => navigate('/team')}
                  variants={reveal(0.15 + idx * 0.08)}
                  className={cn(
                    'group text-left rounded-2xl p-5 sm:p-6 flex items-start gap-4',
                    'bg-white/70 backdrop-blur-md border border-neutral-200/70',
                    'shadow-[0_1px_2px_rgba(11,42,107,0.04),0_8px_24px_rgba(11,42,107,0.04)]',
                    'hover:border-primary-300/60 hover:shadow-[0_12px_40px_rgba(30,91,255,0.08)]',
                    'transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400'
                  )}
                  aria-label={`View ${member.name}'s profile`}
                >
                  {/* Circular photo */}
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover flex-shrink-0 ring-1 ring-neutral-200/80"
                  />

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-primary-800 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-snug mt-0.5 mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {founderIntros[member.name]}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                      View profile
                      <ArrowRight
                        className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Meet the full team CTA */}
          <motion.div variants={reveal(0.4)} className="text-center pt-2">
            <button
              type="button"
              onClick={() => navigate('/team')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-primary-600 border border-primary-200/80 bg-white/70 hover:bg-primary-50 hover:border-primary-300 transition-colors duration-300"
            >
              Meet the full team
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
