import { motion } from 'framer-motion';
import { Globe, Code, Server, Smartphone, Monitor, Brain, Check } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { cn } from '../../utils/cn';

const services = [
  {
    icon: Globe,
    title: 'Web Design & Development',
    tagline: 'Fast, modern websites built for performance and conversion',
    features: [
      'Responsive design',
      'SEO optimization',
      'Performance-first approach',
      'Modern frameworks (React, Next.js)',
    ],
  },
  {
    icon: Code,
    title: 'Frontend Development',
    tagline: 'Beautiful, interactive user interfaces that users love',
    features: [
      'React & Vue.js expertise',
      'Component-driven architecture',
      'Smooth animations',
      'Cross-browser compatibility',
    ],
  },
  {
    icon: Server,
    title: 'Backend Development',
    tagline: 'Robust, scalable server solutions and APIs',
    features: [
      'RESTful & GraphQL APIs',
      'Database design',
      'Cloud deployment',
      'Security best practices',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    tagline: 'Native-quality mobile experiences for iOS and Android',
    features: [
      'React Native development',
      'Cross-platform solutions',
      'App Store deployment',
      'Push notifications & analytics',
    ],
  },
  {
    icon: Monitor,
    title: 'Desktop Applications',
    tagline: 'Cross-platform desktop solutions for Windows, Linux, and macOS',
    features: [
      'Multi-platform support (Windows, Linux, macOS)',
      'Python, JavaScript, C++, Rust, Go',
      'Native performance & UI',
      'System integration & automation',
    ],
  },
  {
    icon: Brain,
    title: 'AI & Automation Systems',
    tagline: 'Intelligent automation and machine learning solutions engineered to evolve with your business',
    features: [
      'Custom AI model development & deployment',
      'Process automation & intelligent workflows',
      'Data analytics, NLP & predictive systems',
      'API integration & scalable ML pipelines',
    ],
  },
];

/**
 * Service Card Component
 */
function ServiceCard({ icon: Icon, title, tagline, features, index }) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.2,
        ease: 'easeOut',
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: prefersReducedMotion ? 1 : 1.1,
      rotate: prefersReducedMotion ? 0 : 5,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: prefersReducedMotion ? 0 : -8,
      boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.article
      className={cn(
        'bg-white border border-gray-200 rounded-lg shadow-sm',
        'transition-shadow duration-300',
        'h-full flex flex-col'
      )}
      variants={cardVariants}
      whileHover="hover"
      custom={hoverVariants}
    >
      <motion.div variants={hoverVariants}>
        <CardHeader className="flex flex-col items-start space-y-6 p-8">
          {/* Icon */}
          <motion.div
            className="rounded-full bg-primary-50 p-4"
            variants={iconVariants}
          >
            <Icon 
              className="w-16 h-16 text-primary-600" 
              aria-hidden="true"
              strokeWidth={1.5}
            />
          </motion.div>
          
          {/* Title and Tagline */}
          <div className="space-y-3">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              {title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {tagline}
            </CardDescription>
          </div>

          {/* Features List */}
          <ul className="space-y-3 w-full" role="list">
            {features.map((feature, idx) => (
              <li 
                key={idx}
                className="flex items-start gap-3"
              >
                <Check 
                  className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" 
                  aria-hidden="true"
                  strokeWidth={2.5}
                />
                <span className="text-base text-gray-700">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </CardHeader>
      </motion.div>
    </motion.article>
  );
}

/**
 * Services Section Component
 */
export function Services() {
  const [ref, isInView] = useInView({ threshold: 0.1 }, true);
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  const subheadingVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section 
      ref={ref}
      id="services"
      className="py-20 md:py-32 bg-gray-50"
      aria-labelledby="services-heading"
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
              id="services-heading"
              variants={headingVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Our Services
            </motion.h2>
            
            <motion.p 
              variants={subheadingVariants}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Comprehensive digital solutions tailored to your needs
            </motion.p>
          </div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            className={cn(
              'grid gap-8',
              'grid-cols-1',
              'md:grid-cols-2',
              'lg:grid-cols-3'
            )}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}