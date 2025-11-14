import { motion } from 'framer-motion';
import { Zap, Code2, Sparkles, TrendingUp } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { cn } from '../../utils/cn';

const valuePropositions = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: "Lightning-fast turnaround without compromising quality. We deliver on time, every time.",
    iconBgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: Code2,
    title: 'Modern Stack',
    description: 'Built with cutting-edge technologies. React, Next.js, Node.js, and modern frameworks.',
    iconBgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: Sparkles,
    title: 'Pixel-Perfect Design',
    description: 'Obsessive attention to detail. Every pixel crafted for visual perfection and user delight.',
    iconBgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Code',
    description: "Enterprise-grade architecture. Clean, maintainable code that grows with your business.",
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
              Why Choose NeuroForge Technologies
            </h2>
            
            <motion.div
              variants={storyVariants}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto space-y-4"
            >
              <p>
                At NeuroForge Technologies, we don't just build — we engineer intelligence. Our team of developers, AI specialists, and digital designers are united by one mission: to create technology that moves the world forward.
              </p>
              <p>
                From next-generation AI systems to custom web and mobile applications, we combine precision engineering with creative design to forge powerful digital solutions that perform, scale, and evolve.
              </p>
              <p>
                Whether you need a high-impact website, an advanced automation platform, or a fully integrated AI-driven system, we transform ideas into intelligent, beautifully-crafted products — built to last, built to lead.
              </p>
              <p className="font-semibold text-gray-900">
                Innovation. Precision. Intelligence. That's the NeuroForge standard.
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