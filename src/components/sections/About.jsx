import { motion } from 'framer-motion';
import { Users, Rocket, Coins, Layers } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { cn } from '../../utils/cn';

const valuePropositions = [
  {
    icon: Users,
    title: 'Founder-Led',
    description: "Both products owned end-to-end by an engineer-founder. No handoffs, no account managers.",
    iconBgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: Rocket,
    title: 'Production-First',
    description: 'Live App Store deployments, real-world security hunts, full CI/CD pipelines. We ship.',
    iconBgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: Coins,
    title: 'Capital-Efficient',
    description: 'Three products built on near-zero capital before our raise. Small team, deep range.',
    iconBgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: Layers,
    title: 'Multi-Market Range',
    description: "Shipping in both B2B security (Huntress) and B2C consumer + civic tech (Watch & See, Urban Aid).",
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
                NeuroForge Technologies is a two-founder operation building production software. We&apos;re not an agency. We don&apos;t take on outside client work. We ship our own products.
              </p>
              <p>
                Jacob and Ethan are equal co-founders, each leading the product matched to their technical specialty — Jacob on <span className="font-semibold text-gray-900">Huntress</span>, an AI-orchestrated bug bounty platform, and Ethan on <span className="font-semibold text-gray-900">Watch &amp; See</span> (iOS marketplace for watch enthusiasts) and <span className="font-semibold text-gray-900">Urban Aid</span> (a civic-tech mobile app, live on the App Store with a 5.0★ rating).
              </p>
              <p className="font-semibold text-gray-900">
                Three products. Two markets. One thesis: small teams with deep technical range can ship more than the industry assumes.
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