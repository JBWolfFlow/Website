import { motion } from 'framer-motion';
import { Users, Rocket, Layers, Briefcase } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { cn } from '../../utils/cn';

const valuePropositions = [
  {
    icon: Users,
    title: 'Senior Engineering',
    description: "Every product owned end-to-end by an experienced engineer. No handoffs, no account managers, no junior code in production.",
    iconBgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: Rocket,
    title: 'Production-First',
    description: 'Live App Store deployments, real-world security hunts, full CI/CD pipelines. We ship code that runs in production.',
    iconBgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: Layers,
    title: 'Full Technical Range',
    description: 'Rust, Swift, TypeScript, Python, Java, and Dart — production work across AI orchestration, native iOS, mobile, desktop applications, and backend infrastructure.',
    iconBgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: Briefcase,
    title: 'Available for Client Work',
    description: "Selective engagements for companies building production software. The same standards and depth we apply to our own products.",
    iconBgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
];

/**
 * Value Proposition Card Component
 */
function ValueCard({ icon: Icon, title, description, iconBgColor, iconColor, index }) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: 'easeOut',
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: prefersReducedMotion ? 1 : 1.1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Card
      variants={cardVariants}
      className="h-full"
    >
      <CardHeader className="flex flex-col items-start space-y-4">
        <motion.div
          className={cn(
            'rounded-full p-3',
            iconBgColor
          )}
          variants={iconVariants}
          whileHover="hover"
        >
          <Icon 
            className={cn('w-6 h-6', iconColor)} 
            aria-hidden="true"
          />
        </motion.div>
        
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}

/**
 * About Section Component
 */
export function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 }, true);
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
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

  const storyVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section 
      ref={ref}
      id="about"
      className="py-20 md:py-32 bg-gray-50"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Section Heading */}
          <motion.div 
            variants={headingVariants}
            className="text-center space-y-4"
          >
            <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Who We Are
            </h2>

            <motion.div
              variants={storyVariants}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto space-y-4"
            >
              <p>
                NeuroForge Technologies is an engineering company focused on production software. We design, build, and operate our own product portfolio, and we partner with companies that need software built to the same standard we apply to our own work.
              </p>
              <p>
                The portfolio includes <span className="font-semibold text-gray-900">Huntress</span>, an AI-orchestrated bug bounty platform; <span className="font-semibold text-gray-900">Watch &amp; See</span>, a native iOS marketplace entering beta; and <span className="font-semibold text-gray-900">Urban Aid</span>, a civic-tech mobile app live on the App Store with a 5.0★ rating.
              </p>
              <p className="font-semibold text-gray-900">
                We work end-to-end across security, web, and mobile. The team is small and senior by design — every product owned by an experienced engineer, every line of code accountable.
              </p>
            </motion.div>
          </motion.div>

          {/* Value Proposition Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6"
          >
            {valuePropositions.map((value, index) => (
              <ValueCard
                key={value.title}
                {...value}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}