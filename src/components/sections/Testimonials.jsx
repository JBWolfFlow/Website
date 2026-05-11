import { motion } from 'framer-motion';
import { trackRecord } from '../../data/testimonials';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../utils/cn';

/**
 * Track Record Section
 * Replaces the old testimonials carousel with a grid of concrete metrics
 * from shipped and in-development products.
 */
const Testimonials = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 }, true);
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : custom * 0.1,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-20 md:py-32 bg-gray-50"
      aria-labelledby="trackrecord-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section Heading */}
          <div className="text-center space-y-4">
            <motion.h2
              id="trackrecord-heading"
              variants={headingVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Track Record
            </motion.h2>

            <motion.p
              variants={headingVariants}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Numbers we&apos;ll defend.
            </motion.p>
          </div>

          {/* Stat Grid */}
          <motion.div
            variants={containerVariants}
            className={cn(
              'grid gap-6 md:gap-8',
              'grid-cols-1',
              'sm:grid-cols-2',
              'lg:grid-cols-3'
            )}
          >
            {trackRecord.map((stat, index) => (
              <motion.div
                key={stat.id}
                custom={index}
                variants={cardVariants}
                className={cn(
                  'relative overflow-hidden rounded-2xl shadow-lg',
                  'p-8 md:p-10',
                  'bg-gradient-to-br',
                  stat.gradient,
                  'text-white'
                )}
              >
                <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="text-5xl md:text-6xl font-bold tracking-tight mb-3">
                    {stat.value}
                  </div>
                  <div className="text-lg md:text-xl font-semibold mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-white/85">
                    {stat.source}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
