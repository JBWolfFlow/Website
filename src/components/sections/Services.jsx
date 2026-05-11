import { motion } from 'framer-motion';
import { Bot, Cpu, Smartphone, Code2, Tablet, Server, Check } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { cn } from '../../utils/cn';

const services = [
  {
    icon: Bot,
    title: 'AI Orchestration & Agents',
    tagline: 'Multi-agent systems combining major AI providers, local models, and task-specific custom training.',
    features: [
      'Major provider integrations (Anthropic, OpenAI, Google, OpenRouter)',
      'Local model deployment for sensitive or offline workloads',
      'Custom model training for task-specific applications',
      'Specialist agents coordinated via ReAct loops with native tool use',
    ],
  },
  {
    icon: Cpu,
    title: 'Rust Systems Engineering',
    tagline: 'High-performance backends and security-critical services.',
    features: [
      'Scope validators and kill-switch logic',
      'Docker sandbox + proxy enforcement',
      'Async runtimes (Tokio)',
      '108 Rust tests passing in Huntress',
    ],
  },
  {
    icon: Smartphone,
    title: 'Native iOS (SwiftUI)',
    tagline: 'SwiftUI apps shipped to the App Store.',
    features: [
      'SwiftUI + MVVM architecture',
      'StoreKit 2 subscriptions',
      'Stripe Connect payments + payouts',
      'Custom design systems',
    ],
  },
  {
    icon: Code2,
    title: 'Full-Stack TypeScript',
    tagline: 'React + Tauri + Vite, end-to-end typed.',
    features: [
      'React 19 with TypeScript',
      'Tauri 2.0 desktop applications',
      'Component-driven architecture',
      '2,029 tests passing in Huntress',
    ],
  },
  {
    icon: Tablet,
    title: 'Cross-Platform Mobile',
    tagline: 'React Native + Expo with the New Architecture.',
    features: [
      'Expo SDK 53 with Fabric enabled',
      'Offline-first with bundled data',
      'Native maps + i18n in 5 languages',
      'EAS Build for CI/CD',
    ],
  },
  {
    icon: Server,
    title: 'Backend & Infrastructure',
    tagline: 'Production APIs, auth, and infrastructure.',
    features: [
      'FastAPI with async/await',
      'PostgreSQL + SQLAlchemy ORM',
      'JWT auth with refresh-token rotation',
      'Redis caching + rate limiting',
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
              What We Build
            </motion.h2>

            <motion.p
              variants={subheadingVariants}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Six engineering disciplines we apply across our product portfolio and client engagements.
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