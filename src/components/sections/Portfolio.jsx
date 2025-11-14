import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ProjectCard } from '../ui/ProjectCard';
import { ImageModal } from '../ui/ImageModal';
import { projects } from '../../data/projects';
import { cn } from '../../utils/cn';

/**
 * Portfolio Section Component
 * Displays a grid of project cards with sophisticated animations
 */
export function Portfolio() {
  const [ref, isInView] = useInView({ threshold: 0.1 }, true);
  const prefersReducedMotion = useReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  // Heading animation variants
  const headingVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
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

  // Subheading animation variants
  const subheadingVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
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

  /**
   * Handle project card click
   * Opens the image modal at the selected project index
   */
  const handleProjectClick = (projectId) => {
    const index = projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setIsModalOpen(true);
    }
  };

  /**
   * Navigate to next image
   */
  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev < projects.length - 1 ? prev + 1 : prev
    );
  };

  /**
   * Navigate to previous image
   */
  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : prev
    );
  };

  /**
   * Close modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      ref={ref}
      id="portfolio"
      className="py-20 md:py-32 bg-white"
      aria-labelledby="portfolio-heading"
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
              id="portfolio-heading"
              variants={headingVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Our Work
            </motion.h2>

            <motion.div
              variants={subheadingVariants}
              className="text-center max-w-4xl mx-auto space-y-3"
            >
              <p className="text-xl md:text-2xl font-semibold text-gray-800">
                DCOP: Our Flagship Defense Contracting Operations Platform
              </p>
              <p className="text-base md:text-lg text-gray-600">
                Revolutionizing federal procurement with AI-powered opportunity discovery, real-time NAICS analytics, and secure, offline-first mobile access—integrating SAM.gov and USAspending.gov for streamlined insights and strategic advantage.
              </p>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className={cn(
              'grid gap-6 md:gap-8',
              'grid-cols-1',
              'md:grid-cols-2',
              'lg:grid-cols-3'
            )}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                category={project.category}
                description={project.description}
                techStack={project.techStack}
                gradient={project.gradient}
                image={project.image}
                index={index}
                onClick={() => handleProjectClick(project.id)}
              />
            ))}
          </motion.div>

          {/* Optional CTA Section */}
          <motion.div
            variants={headingVariants}
            className="text-center pt-8"
          >
            <p className="text-lg text-gray-600 mb-6">
              Interested in working together?
            </p>
            <motion.a
              href="#contact"
              className={cn(
                'inline-flex items-center justify-center',
                'px-8 py-3 rounded-lg',
                'bg-primary-600 text-white font-medium',
                'hover:bg-primary-700 transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                'shadow-lg hover:shadow-xl'
              )}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Start Your Project
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        currentImage={projects[currentImageIndex]?.image}
        currentTitle={projects[currentImageIndex]?.title}
        onNext={handleNext}
        onPrevious={handlePrevious}
        currentIndex={currentImageIndex}
        totalImages={projects.length}
      />
    </section>
  );
}