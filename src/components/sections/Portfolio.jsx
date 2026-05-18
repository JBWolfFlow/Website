import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ImageModal } from '../ui/ImageModal';
import { projects } from '../../data/projects';
import { cn } from '../../utils/cn';

/**
 * Portfolio — AryaTech "Our Work"
 *
 * Three project cards in a 3-column grid. Each card: floating device-frame
 * mockup at the top (generated via gpt-image-2), status badge, title, category
 * line, description, mono-font tech chips. Liquid-glass-on-light card style
 * matching the Services section. Designed via gpt-image-2 mockup
 * (public/generated/mockups/portfolio/image-20260517-234924-75851f-portfolio-v1.png).
 */

const statusToneStyles = {
  blue: 'bg-primary-50 text-primary-700 ring-primary-200/70',
  amber: 'bg-accent-50 text-accent-700 ring-accent-200/70',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200/70',
};

function ProjectCard({ project, index, onOpenImage }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const tone = statusToneStyles[project.statusTone] || statusToneStyles.blue;
  const hasExternalLink = Boolean(project.url);

  return (
    <motion.article
      variants={variants}
      className={cn(
        'group relative rounded-2xl flex flex-col overflow-hidden',
        'bg-white/70 backdrop-blur-md border border-neutral-200/70',
        'shadow-[0_1px_2px_rgba(11,42,107,0.04),0_8px_24px_rgba(11,42,107,0.04)]',
        'hover:border-primary-300/60 hover:shadow-[0_12px_40px_rgba(30,91,255,0.08)]',
        'transition-all duration-300'
      )}
    >
      {/* Device frame mockup area */}
      <button
        type="button"
        onClick={() => onOpenImage(project.id)}
        aria-label={`View ${project.title} mockup larger`}
        className="relative block w-full aspect-[4/3] bg-neutral-50 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
      >
        <img
          src={project.image}
          alt={`${project.title} application mockup`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
        {/* Status badge — floating top-right of the device area */}
        <span
          className={cn(
            'absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full',
            'text-[10px] font-mono font-semibold tracking-wider uppercase ring-1',
            tone
          )}
        >
          {project.status}
        </span>
      </button>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6 sm:p-7">
        <h3 className="text-xl sm:text-2xl font-semibold text-primary-800 leading-snug">
          {project.title}
        </h3>
        <p className="text-xs font-medium text-neutral-500 leading-relaxed">
          {project.subtitle} <span className="text-neutral-400">·</span> Lead: {project.lead}
        </p>
        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-4">
          {project.description}
        </p>

        {/* Tech chips */}
        <ul className="flex flex-wrap gap-1.5 mt-1" role="list">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="font-mono text-[10.5px] tracking-tight px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/80"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* External link if applicable */}
        {hasExternalLink && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors w-fit"
          >
            View on GitHub
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        )}
      </div>

      {/* Hover arrow */}
      <ArrowUpRight
        className="absolute top-4 left-4 w-4 h-4 text-white/0 group-hover:text-white/80 transition-colors duration-300 pointer-events-none"
        aria-hidden="true"
      />
    </motion.article>
  );
}

export function Portfolio() {
  const [ref, isInView] = useInView({ threshold: 0.1 }, true);
  const prefersReducedMotion = useReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
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

  const handleOpenImage = (projectId) => {
    const idx = projects.findIndex((p) => p.id === projectId);
    if (idx !== -1) {
      setCurrentImageIndex(idx);
      setIsModalOpen(true);
    }
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      id="portfolio"
      className="relative py-24 md:py-32 bg-[#F7F9FC] overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      {/* Subtle warm bloom lower-left */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full opacity-40"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 138, 30, 0.10) 0%, transparent 70%)',
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
              Our Work
            </motion.p>
            <motion.h2
              id="portfolio-heading"
              variants={heading(0.1)}
              className="text-4xl md:text-5xl font-bold text-primary-800 leading-tight"
            >
              Three products. Built end to end.
            </motion.h2>
            <motion.p
              variants={heading(0.2)}
              className="text-base md:text-lg text-neutral-600 leading-relaxed"
            >
              Software we ship under our own name.
            </motion.p>
          </div>

          {/* Project cards grid */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
          >
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onOpenImage={handleOpenImage}
              />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={heading(0.4)} className="text-center pt-2">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-primary-600 border border-primary-200/80 bg-white/70 hover:bg-primary-50 hover:border-primary-300 transition-colors duration-300"
            >
              Want us to build something for you?
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentImage={projects[currentImageIndex]?.image}
        currentTitle={projects[currentImageIndex]?.title}
        onNext={() =>
          setCurrentImageIndex((p) => (p < projects.length - 1 ? p + 1 : p))
        }
        onPrevious={() => setCurrentImageIndex((p) => (p > 0 ? p - 1 : p))}
        currentIndex={currentImageIndex}
        totalImages={projects.length}
      />
    </section>
  );
}
