import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Loader2, Shield } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { useInView } from '../../hooks/useInView';
import {
  sanitizeInput,
  validateFormData,
  checkRateLimit,
  isHoneypotFilled,
  isSuspiciouslyFast,
  generateCSRFToken
} from '../../utils/security';
import { submitContactForm } from '../../services/formService';

/**
 * Contact Form Component with Web3Forms Integration
 *
 * SECURITY NOTICE - Web3Forms API Key:
 * =====================================
 *
 * The Web3Forms API key (VITE_WEB3FORMS_ACCESS_KEY) is intentionally PUBLIC
 * and will be visible in the production JavaScript bundle. This is NORMAL and
 * EXPECTED behavior for client-side form services.
 *
 * Security is provided by:
 * 1. Domain Whitelist - Only authorized domains can submit (configured in Web3Forms dashboard)
 * 2. Rate Limiting - Prevents spam and abuse (enforced server-side by Web3Forms)
 * 3. Honeypot Fields - Catches automated bots (implemented below)
 * 4. CSRF Tokens - Validates legitimate requests (generated per session)
 * 5. Input Sanitization - Prevents XSS attacks (applied to all inputs)
 *
 * CRITICAL: Before deploying to production, you MUST:
 * - Configure domain whitelist in Web3Forms dashboard (neuroforgetechnologies.net)
 * - Enable rate limiting in Web3Forms dashboard (recommended: 10/hour per IP)
 * - Test that submissions from unauthorized domains are blocked
 *
 * For detailed security setup, see: WEB3FORMS_SECURITY_SETUP.md
 * For deployment instructions, see: SQUARESPACE_DEPLOYMENT.md
 */

const Contact = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rateLimitError, setRateLimitError] = useState(null);
  
  // Security features
  const [honeypot, setHoneypot] = useState('');
  const [csrfToken] = useState(() => generateCSRFToken());
  const formLoadTime = useRef(Date.now());
  const submitAttempts = useRef(0);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@neuroforgetechnologies.net',
      href: 'mailto:contact@neuroforgetechnologies.net'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '(206) 876-0437',
      href: 'tel:+12068760437'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Temple, TX',
      href: null
    }
  ];

  const projectTypes = [
    'Web Design & Development',
    'Frontend Development',
    'Backend Development',
    'Full-Stack Application',
    'Mobile App Development',
    'Desktop Application',
    'AI & Automation Systems',
    'Custom Software Solution',
    'System Integration / API Development',
    'Consultation / Technical Audit',
    'Other (Custom Project)'
  ];

  // Reset rate limit error when user starts typing
  useEffect(() => {
    if (rateLimitError) {
      const timer = setTimeout(() => setRateLimitError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [rateLimitError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input
    const sanitizedValue = sanitizeInput(value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear rate limit error when user interacts
    if (rateLimitError) {
      setRateLimitError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Security Check 1: Honeypot (bot detection)
    if (isHoneypotFilled(honeypot)) {
      console.warn('Bot detected via honeypot');
      // Silently fail for bots
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      return;
    }
    
    // Security Check 2: Timing analysis (suspiciously fast submission)
    const submitTime = Date.now();
    if (isSuspiciouslyFast(formLoadTime.current, submitTime, 3000)) {
      setErrors({ message: 'Please take your time to fill out the form properly.' });
      return;
    }
    
    // Security Check 3: Rate limiting
    const rateLimitCheck = checkRateLimit(formData.email, 3, 60000);
    if (!rateLimitCheck.allowed) {
      const resetMinutes = Math.ceil((rateLimitCheck.resetTime - Date.now()) / 60000);
      setRateLimitError(
        `Too many submission attempts. Please try again in ${resetMinutes} minute${resetMinutes > 1 ? 's' : ''}.`
      );
      return;
    }
    
    // Security Check 4: Enhanced validation with sanitization
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    // Track submission attempts
    submitAttempts.current += 1;
    
    setIsSubmitting(true);
    setErrors({});
    setRateLimitError(null);

    try {
      // Prepare sanitized data for submission
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        company: sanitizeInput(formData.company),
        projectType: formData.projectType,
        message: sanitizeInput(formData.message),
        csrfToken: csrfToken,
        timestamp: new Date().toISOString()
      };
      
      // Submit form using configured service
      const result = await submitContactForm(sanitizedData);
      
      setIsSubmitting(false);
      
      if (result.success) {
        setSubmitSuccess(true);

        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          message: ''
        });
        
        // Reset form load time for next submission
        formLoadTime.current = Date.now();
        submitAttempts.current = 0;

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        // Handle submission error
        setErrors({
          message: result.error || 'An error occurred while sending your message. Please try again.'
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      setErrors({
        message: 'An unexpected error occurred. Please try again later.'
      });
      console.error('Form submission error:', error);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="py-20 bg-white"
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
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch to discuss your project
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Form - 60% width on desktop */}
            <div
              className={`md:col-span-3 transition-all duration-700 delay-200 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Security Badge */}
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 border border-green-200 rounded-lg p-3">
                  <Shield className="text-green-600" size={18} />
                  <span>This form is protected by advanced security measures</span>
                </div>
                
                {/* Honeypot Field (hidden from users, visible to bots) */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0
                  }}
                  aria-hidden="true"
                />
                
                {/* CSRF Token (hidden) */}
                <input type="hidden" name="csrf_token" value={csrfToken} />
                {/* Name Input */}
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />

                {/* Email Input */}
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                />

                {/* Company Input */}
                <Input
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company (Optional)"
                  disabled={isSubmitting}
                />

                {/* Project Type Select */}
                <div className="w-full">
                  <label
                    htmlFor="projectType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Project Type
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.projectType ? 'border-red-500' : ''
                    }`}
                    aria-invalid={errors.projectType ? 'true' : 'false'}
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="mt-2 text-sm text-red-600" role="alert">
                      {errors.projectType}
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <Textarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  required
                  rows={6}
                  maxLength={1000}
                  showCharCount
                  placeholder="Tell us about your project..."
                  disabled={isSubmitting}
                />
                
                {/* Rate Limit Error */}
                {rateLimitError && (
                  <div
                    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                    role="alert"
                  >
                    <p className="font-medium">Submission Limit Reached</p>
                    <p className="text-sm mt-1">{rateLimitError}</p>
                  </div>
                )}

                {/* Success Message */}
                {submitSuccess && (
                  <div
                    className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                    role="alert"
                  >
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm mt-1">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info Cards - 40% width on desktop */}
            <div className="md:col-span-2 space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.label}
                    className={`bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${
                      info.href ? 'cursor-pointer' : ''
                    } ${
                      isInView
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      transitionDelay: `${300 + index * 100}ms`
                    }}
                    onClick={() => info.href && window.open(info.href, '_self')}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon className="text-primary-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {info.label}
                        </h3>
                        <p className="text-gray-600">{info.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;