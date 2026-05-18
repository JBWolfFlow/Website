import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Github, ArrowUpRight, ArrowRight } from 'lucide-react';
import { teamMembers } from '../../data/team';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../utils/cn';

/**
 * Team page — AryaTech "Meet the team"
 *
 * Two founder cards (Jacob + Ethan), each with photo, name, role, bio,
 * specialties as mono chips, education, and contact icon buttons.
 * Calm CTA card below. Same modest liquid-glass-on-light aesthetic as
 * the homepage sections. Designed via gpt-image-2 mockup
 * (public/generated/mockups/team/image-20260518-004523-e91094-team-v1.png).
 */

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-500 mb-2">
      {children}
    </p>
  );
}

function FounderCard({ member, index }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: prefersReducedMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={variants}
      className={cn(
        'rounded-2xl overflow-hidden flex flex-col',
        'bg-white/70 backdrop-blur-md border border-neutral-200/70',
        'shadow-[0_1px_2px_rgba(11,42,107,0.04),0_8px_24px_rgba(11,42,107,0.05)]'
      )}
    >
      {/* Photo */}
      <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 p-7 sm:p-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-800 leading-tight">
            {member.name}
          </h2>
          <p className="text-sm sm:text-base text-primary-600 font-medium mt-1.5">
            {member.role}
          </p>
        </div>

        <div className="h-px bg-neutral-200/80" aria-hidden="true" />

        {/* Bio */}
        <div>
          <SectionLabel>Bio</SectionLabel>
          <p className="text-sm sm:text-[15px] text-neutral-700 leading-relaxed">
            {member.bio}
          </p>
        </div>

        {/* Specialties */}
        {member.specialties?.length > 0 && (
          <div>
            <SectionLabel>Specialties</SectionLabel>
            <ul className="flex flex-wrap gap-1.5" role="list">
              {member.specialties.map((s) => (
                <li
                  key={s}
                  className="font-mono text-[11px] tracking-tight px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/80"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education */}
        {member.education && (
          <div>
            <SectionLabel>Education</SectionLabel>
            <p className="text-sm text-neutral-600 leading-relaxed">{member.education}</p>
          </div>
        )}

        {/* Contact icons */}
        <div className="pt-2 flex items-center gap-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              title={member.email}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-100 hover:bg-primary-50 border border-neutral-200/80 hover:border-primary-200 text-neutral-700 hover:text-primary-600 transition-all duration-200"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              title="GitHub"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-100 hover:bg-primary-50 border border-neutral-200/80 hover:border-primary-200 text-neutral-700 hover:text-primary-600 transition-all duration-200"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

const Team = () => {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  const goContact = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const headerReveal = (delay = 0) => ({
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
    <>
      <Helmet>
        <title>Our Team | AryaTech</title>
        <meta
          name="description"
          content="Meet the two founders behind AryaTech. Jacob Gonsalves (CEO, product lead for Huntress) and Ethan Hoover (COO, product lead for Watch & See and Urban Aid). Small and senior by design — every product owned end-to-end."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="relative min-h-screen bg-[#F7F9FC] overflow-hidden pt-32 pb-24 md:pt-36 md:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Subtle blue glow upper-right */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-40"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle, rgba(30, 91, 255, 0.10) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Page header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14 md:mb-16">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={headerReveal(0)}
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary-500"
            >
              Meet the team
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={headerReveal(0.1)}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800 leading-tight"
            >
              Two founders. End-to-end ownership.
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={headerReveal(0.2)}
              className="text-base md:text-lg text-neutral-600 leading-relaxed"
            >
              The engineers building AryaTech&rsquo;s product portfolio. Small and senior by design — every product owned by an experienced engineer.
            </motion.p>
          </div>

          {/* Founder cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {teamMembers.map((member, idx) => (
              <FounderCard key={member.id} member={member} index={idx} />
            ))}
          </div>

          {/* Bottom CTA card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerReveal(0.4)}
            className={cn(
              'rounded-2xl p-8 sm:p-10 text-center',
              'bg-white/70 backdrop-blur-md border border-neutral-200/70',
              'shadow-[0_1px_2px_rgba(11,42,107,0.04),0_8px_24px_rgba(11,42,107,0.05)]'
            )}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-800 leading-tight">
              Want to work with us?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              Either build something together, or join the team.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={goContact}
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white',
                  'bg-primary-500 hover:bg-primary-600',
                  'shadow-[0_4px_20px_rgba(30,91,255,0.30)] hover:shadow-[0_8px_30px_rgba(30,91,255,0.45)]',
                  'transition-all duration-300 hover:scale-[1.02]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2'
                )}
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/careers')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-primary-600 border border-primary-200/80 bg-white/70 hover:bg-primary-50 hover:border-primary-300 transition-colors duration-300"
              >
                View Open Positions
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Team;
