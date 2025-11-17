import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../ui/Button';

/**
 * Hero Section Component
 * Features professional animations, animated gradient background,
 * and full accessibility support
 * Optimized for mobile performance
 */
const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Disable complex animations on mobile, but keep simple fade
  const shouldAnimate = !prefersReducedMotion && !isMobile;
  
  // Always provide animation props to ensure content renders
  const animationProps = shouldAnimate
    ? {
        initial: "hidden",
        animate: "visible",
        variants: containerVariants,
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 }
      };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50"
      aria-label="Hero section"
      style={{ maxWidth: '100vw' }}
    >
      {/* Animated Gradient Background - Disabled on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden">
        {!isMobile && (
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
        )}

        {/* Floating Geometric Shapes - Reduced on mobile */}
        {!prefersReducedMotion && !isMobile && (
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
          </>
        )}
        
        {/* Static gradient for mobile */}
        {isMobile && (
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
            }}
          />
        )}
      </div>

      {/* Content Container - Separate rendering for mobile vs desktop */}
      {isMobile || prefersReducedMotion ? (
        // MOBILE & REDUCED MOTION: Pure HTML/CSS (no Framer Motion)
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 break-words">
            {words.map((word, index) => (
              <span key={index} className="inline-block mr-3 md:mr-4">
                {word === 'Command' ? (
                  <span className="text-accent-500">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto">
            Intelligent systems. Scalable apps.{' '}
            <span className="font-semibold text-gray-900">
              Code engineered for tomorrow.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('contact')}
              aria-label="Get a quote for your project"
            >
              Get a Quote
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('portfolio')}
              aria-label="View our portfolio of work"
            >
              View Our Work
            </Button>
          </div>
        </div>
      ) : (
        // DESKTOP: Fancy Framer Motion animations
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Headline with word stagger */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 break-words"
            variants={headlineVariants}
          >
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
        </motion.div>
      )}

      {/* Scroll Indicator - Disabled on mobile */}
      {!prefersReducedMotion && !isMobile && (
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
    </section>
  );
};

export default Hero;