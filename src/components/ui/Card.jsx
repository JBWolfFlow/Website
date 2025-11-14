import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * Reusable Card component with hover effects
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hoverable - Enable hover effects (default: true)
 * @param {Object} props.variants - Framer Motion variants
 * @param {number} props.delay - Animation delay in seconds
 */
export function Card({ 
  children, 
  className, 
  hoverable = true,
  variants,
  delay = 0,
  ...props 
}) {
  const hoverVariants = hoverable ? {
    hover: {
      y: -4,
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  } : {};

  const defaultVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: 'easeOut',
      },
    },
    ...hoverVariants,
  };

  return (
    <motion.article
      className={cn(
        'bg-white border border-gray-200 rounded-lg shadow-sm',
        'transition-shadow duration-200',
        hoverable && 'cursor-pointer',
        className
      )}
      variants={variants || defaultVariants}
      initial="hidden"
      animate="visible"
      whileHover={hoverable ? 'hover' : undefined}
      {...props}
    >
      {children}
    </motion.article>
  );
}

/**
 * Card Header component
 */
export function CardHeader({ children, className, ...props }) {
  return (
    <div 
      className={cn('p-6 md:p-8', className)} 
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card Content component
 */
export function CardContent({ children, className, ...props }) {
  return (
    <div 
      className={cn('px-6 pb-6 md:px-8 md:pb-8', className)} 
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card Title component
 */
export function CardTitle({ children, className, ...props }) {
  return (
    <h3 
      className={cn('text-xl font-semibold text-gray-900', className)} 
      {...props}
    >
      {children}
    </h3>
  );
}

/**
 * Card Description component
 */
export function CardDescription({ children, className, ...props }) {
  return (
    <p 
      className={cn('text-base text-gray-600 mt-2', className)} 
      {...props}
    >
      {children}
    </p>
  );
}