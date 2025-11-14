import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../ui/Button';

/**
 * Hero Section Component
 * Features professional animations, animated gradient background,
 * and full accessibility support
 */
const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Animation variants for different elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom easeOut curve
      },
    },
  };

  const subtextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.6 + custom * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Split headline into words for stagger animation
  const headline = "We Build Digital Experiences That Command Attention.";
  const words = headline.split(' ');

  // Disable animations if user prefers reduced motion
  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden",
        animate: "visible",
        variants: containerVariants,
      };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50"
      aria-label="Hero section"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
                  ],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background:
              'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
          }}
        />

        {/* Floating Geometric Shapes */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
              animate={{
                x: [0, 50, 0],
                y: [0, -100, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </>
        )}
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        {...animationProps}
      >
        {/* Headline with Word Stagger Animation */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
          variants={headlineVariants}
        >
          {prefersReducedMotion ? (
            headline
          ) : (
            <>
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-3 md:mr-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  {word === 'Command' ? (
                    <span className="text-accent-500">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </>
          )}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto"
          variants={subtextVariants}
        >
          Intelligent systems. Scalable apps.{' '}
          <span className="font-semibold text-gray-900">
            Code engineered for tomorrow.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={containerVariants}
        >
          <motion.div variants={ctaVariants} custom={0}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('contact')}
              aria-label="Get a quote for your project"
            >
              Get a Quote
            </Button>
          </motion.div>

          <motion.div variants={ctaVariants} custom={1}>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('portfolio')}
              aria-label="View our portfolio of work"
            >
              View Our Work
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;