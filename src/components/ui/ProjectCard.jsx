import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../utils/cn';
import LazyImage from '../common/LazyImage';

/**
 * ProjectCard Component
 * Displays a single project with image, overlay, and hover effects
 * 
 * @param {Object} props
 * @param {string} props.title - Project title
 * @param {string} props.category - Project category
 * @param {string} props.description - Project description
 * @param {string[]} props.techStack - Array of technologies used
 * @param {string} props.gradient - Tailwind gradient classes for placeholder
 * @param {string} props.image - Image URL (optional, uses gradient if null)
 * @param {number} props.index - Card index for stagger animation
 * @param {Function} props.onClick - Click handler for "View Project" button
 */
export function ProjectCard({
  title,
  category,
  description,
  techStack,
  gradient,
  image,
  index,
  onClick,
}) {
  const prefersReducedMotion = useReducedMotion();

  // Card animation variants
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

  // Image scale on hover
  const imageVariants = {
    hover: {
      scale: prefersReducedMotion ? 1 : 1.05,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  // Overlay slide up animation
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

  // Category badge slide down animation
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

  // Button fade in with delay
  const buttonVariants = {
    initial: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.9,
    },
    hover: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.article
      className={cn(
        'group relative overflow-hidden rounded-lg',
        'bg-gray-900 shadow-lg',
        'aspect-[9/16]',
        'cursor-pointer'
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`View ${title} project details`}
    >
      {/* Project Image/Gradient Background */}
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
        <motion.div
          className={cn(
            'absolute inset-0 w-full h-full',
            `bg-gradient-to-br ${gradient}`
          )}
          variants={imageVariants}
        />
      )}

      {/* Dark overlay gradient (always visible, intensifies on hover) */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent',
          'transition-opacity duration-300',
          'opacity-60 group-hover:opacity-90'
        )}
      />

      {/* Category Badge (slides down on hover) */}
      <motion.div
        className="absolute top-4 left-4 z-10"
        variants={badgeVariants}
        initial="initial"
      >
        <span
          className={cn(
            'inline-block px-3 py-1 rounded-full',
            'bg-primary-600 text-white text-sm font-medium',
            'shadow-lg'
          )}
        >
          {category}
        </span>
      </motion.div>

      {/* Content Overlay (slides up on hover) */}
      <motion.div
        className={cn(
          'absolute inset-x-0 bottom-0 z-10',
          'p-6 md:p-8',
          'flex flex-col justify-end'
        )}
        variants={overlayVariants}
        initial="initial"
      >
        {/* Project Title */}
        <h3 className="text-2xl font-bold text-white mb-2">
          {title}
        </h3>

        {/* Project Description */}
        <p className="text-base text-gray-200 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, idx) => (
            <span
              key={idx}
              className={cn(
                'text-sm text-gray-300',
                'px-2 py-1 rounded',
                'bg-white/10 backdrop-blur-sm'
              )}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View Project Button (fades in with delay) */}
        <motion.button
          className={cn(
            'inline-flex items-center gap-2',
            'text-white font-medium',
            'hover:text-primary-400 transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900',
            'rounded-md px-1 py-1'
          )}
          variants={buttonVariants}
          initial="initial"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          aria-label={`View details for ${title}`}
        >
          <span>View Project</span>
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </motion.button>
      </motion.div>

      {/* Focus indicator for keyboard navigation */}
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