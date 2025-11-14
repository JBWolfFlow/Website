import { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (isHovered || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, prefersReducedMotion]);

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by businesses worldwide
          </p>
        </div>

        {/* Testimonial Card */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-primary-100">
              <Quote size={64} strokeWidth={1.5} />
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              {/* Rating Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className="text-accent-500 fill-accent-500"
                  />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed">
                "{currentTestimonial.review}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center gap-4">
                {/* Avatar */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentTestimonial.avatar.gradient} flex items-center justify-center text-white text-2xl font-bold`}
                >
                  {currentTestimonial.name.charAt(0)}
                </div>

                {/* Name and Company */}
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-gray-600">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-primary-600'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;