import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../utils/cn';
import LazyImage from '../common/LazyImage';

/**
 * ProjectCard Component
 * Renders a project tile with either a screenshot or a gradient placeholder.
 * When there is no image, content (title, subtitle, status, description, tech) is
 * always visible. When there is an image, content slides up on hover (original behavior).
 *
 * @param {Object} props
 * @param {string} props.title - Project title
 * @param {string} [props.subtitle] - Short positioning line (e.g. "Flagship · B2B Security")
 * @param {string} [props.status] - Status badge text (e.g. "In Development · v0.8"). Falls back to `category`.
 * @param {string} [props.category] - Legacy category label, used as fallback for status
 * @param {string} props.description - Project description
 * @param {string[]} props.techStack - Array of technologies used
 * @param {string} props.gradient - Tailwind gradient classes for placeholder
 * @param {string} [props.image] - Image URL (when absent, gradient placeholder is shown with always-visible content)
 * @param {string} [props.url] - Optional external URL (opens in new tab)
 * @param {number} props.index - Card index for stagger animation
 * @param {Function} [props.onClick] - Click handler (used when no url provided)
 */
export function ProjectCard({
  title,
  subtitle,
  status,
  category,
  description,
  techStack,
  gradient,
  image,
  url,
  index,
  onClick,
}) {
  const prefersReducedMotion = useReducedMotion();
  const noImage = !image;
  const badgeText = status || category;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: prefersReducedMotion ? 1 : 1.05,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const overlayVariants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const badgeVariants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -10,
    },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const handleCardClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (onClick) {
      onClick();
    }
  };

  const isInteractive = !!url || !!onClick;

  return (
    <motion.article
      className={cn(
        'group relative overflow-hidden rounded-lg',
        'bg-gray-900 shadow-lg',
        'aspect-[9/16]',
        isInteractive ? 'cursor-pointer' : 'cursor-default'
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={noImage ? undefined : 'hover'}
      onClick={isInteractive ? handleCardClick : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={isInteractive ? `View ${title} project details` : `${title} project`}
    >
      {/* Background: image or gradient placeholder */}
      {image ? (
        <motion.div
          className="absolute inset-0 w-full h-full"
          variants={imageVariants}
        >
          <LazyImage
            src={image}
            alt={`${title} project screenshot`}
            className="absolute inset-0 w-full h-full object-contain bg-gray-900"
            placeholderColor="bg-gray-800"
          />
        </motion.div>
      ) : (
        <div
          className={cn(
            'absolute inset-0 w-full h-full',
            'bg-gradient-to-br',
            gradient
          )}
        />
      )}

      {/* Dark overlay — image cards intensify on hover, gradient cards stay readable */}
      <div
        className={cn(
          'absolute inset-0',
          noImage
            ? 'bg-gradient-to-t from-black/70 via-black/30 to-black/10'
            : 'bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300'
        )}
      />

      {/* Status badge */}
      <motion.div
        className="absolute top-4 left-4 z-10"
        variants={noImage ? undefined : badgeVariants}
        initial={noImage ? false : 'initial'}
      >
        <span
          className={cn(
            'inline-block px-3 py-1 rounded-full',
            'bg-primary-600 text-white text-sm font-medium',
            'shadow-lg'
          )}
        >
          {badgeText}
        </span>
      </motion.div>

      {/* Content overlay */}
      <motion.div
        className={cn(
          'absolute inset-x-0 bottom-0 z-10',
          'p-6 md:p-8',
          'flex flex-col justify-end'
        )}
        variants={noImage ? undefined : overlayVariants}
        initial={noImage ? false : 'initial'}
      >
        {subtitle && (
          <p className="text-xs md:text-sm text-gray-200 uppercase tracking-widest mb-2">
            {subtitle}
          </p>
        )}

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {title}
        </h3>

        <p
          className={cn(
            'text-sm md:text-base text-gray-200 mb-4',
            !noImage && 'line-clamp-2'
          )}
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, idx) => (
            <span
              key={idx}
              className={cn(
                'text-xs md:text-sm text-gray-200',
                'px-2 py-1 rounded',
                'bg-white/15 backdrop-blur-sm'
              )}
            >
              {tech}
            </span>
          ))}
        </div>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 self-start',
              'text-white font-medium',
              'hover:text-primary-300 transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900',
              'rounded-md px-1 py-1'
            )}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open ${title} external link`}
          >
            <span>View Project</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        )}
      </motion.div>

      {/* Focus ring for keyboard navigation */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg',
          'ring-2 ring-primary-500 ring-offset-2 ring-offset-white',
          'opacity-0 focus-within:opacity-100',
          'transition-opacity duration-200',
          'pointer-events-none'
        )}
        aria-hidden="true"
      />
    </motion.article>
  );
}
