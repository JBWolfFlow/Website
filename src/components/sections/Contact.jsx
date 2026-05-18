import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Loader2, Send, Github, Clock, Check } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { teamMembers } from '../../data/team';
import {
  sanitizeInput,
  validateFormData,
  checkRateLimit,
  isHoneypotFilled,
  isSuspiciouslyFast,
  generateCSRFToken,
} from '../../utils/security';
import { submitContactForm } from '../../services/formService';
import { cn } from '../../utils/cn';

/**
 * Contact — AryaTech "Let's build your future."
 *
 * Two-column layout: left = Reach-a-founder-directly panel with real
 * photos + mono-pill emails + small GitHub/location card. Right = glass
 * form panel (Name + Company same row, Email, Project Type, Message,
 * royal-blue glow Send Message CTA). Designed via gpt-image-2 mockup
 * (public/generated/mockups/contact/image-20260518-002841-84deca-contact-v1.png).
 *
 * SECURITY: Web3Forms API key is intentionally PUBLIC (client-side service).
 * Protections: domain whitelist (Web3Forms dashboard), rate limiting, honeypot,
 * CSRF token, input sanitization, timing analysis. See WEB3FORMS_SECURITY_SETUP.md.
 */

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
  'Other (Custom Project)',
];

const founderTitles = {
  'Jacob Gonsalves': 'CEO',
  'Ethan Hoover': 'COO',
};

function CopyableEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <a
      href={`mailto:${email}`}
      onClick={handleCopy}
      title="Click to email + copy address"
      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/80 text-xs sm:text-sm font-mono text-neutral-700 transition-colors duration-200 max-w-full overflow-hidden"
    >
      <span className="truncate">{email}</span>
      <span
        className={cn(
          'flex-shrink-0 text-[10px] font-sans font-semibold transition-colors',
          copied ? 'text-emerald-600' : 'text-primary-500 group-hover:text-primary-600'
        )}
      >
        {copied ? (
          <Check className="w-3.5 h-3.5" aria-hidden="true" />
        ) : (
          'Copy'
        )}
      </span>
    </a>
  );
}

const Contact = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 }, true);
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rateLimitError, setRateLimitError] = useState(null);

  // Security
  const [honeypot, setHoneypot] = useState('');
  const [csrfToken] = useState(() => generateCSRFToken());
  const formLoadTime = useRef(Date.now());
  const submitAttempts = useRef(0);

  useEffect(() => {
    if (rateLimitError) {
      const timer = setTimeout(() => setRateLimitError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [rateLimitError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = sanitizeInput(value);
    setFormData((p) => ({ ...p, [name]: sanitized }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
    if (rateLimitError) setRateLimitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isHoneypotFilled(honeypot)) {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 2000));
      setIsSubmitting(false);
      return;
    }

    const submitTime = Date.now();
    if (isSuspiciouslyFast(formLoadTime.current, submitTime, 3000)) {
      setErrors({ message: 'Please take your time to fill out the form properly.' });
      return;
    }

    const rate = checkRateLimit(formData.email, 3, 60000);
    if (!rate.allowed) {
      const mins = Math.ceil((rate.resetTime - Date.now()) / 60000);
      setRateLimitError(`Too many submission attempts. Please try again in ${mins} minute${mins > 1 ? 's' : ''}.`);
      return;
    }

    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    submitAttempts.current += 1;
    setIsSubmitting(true);
    setErrors({});
    setRateLimitError(null);

    try {
      const sanitized = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        company: sanitizeInput(formData.company),
        projectType: formData.projectType,
        message: sanitizeInput(formData.message),
        csrfToken,
        timestamp: new Date().toISOString(),
      };
      const result = await submitContactForm(sanitized);
      setIsSubmitting(false);
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', company: '', projectType: '', message: '' });
        formLoadTime.current = Date.now();
        submitAttempts.current = 0;
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setErrors({ message: result.error || 'An error occurred while sending your message. Please try again.' });
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrors({ message: 'An unexpected error occurred. Please try again later.' });
      console.error('Form submission error:', err);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 } },
  };
  const reveal = (delay = 0) => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] } },
  });

  const inputBaseClasses = cn(
    'w-full px-4 py-3 rounded-lg text-sm text-neutral-800 placeholder-neutral-400',
    'bg-white/80 border border-neutral-200 focus:border-primary-400',
    'focus:outline-none focus:ring-2 focus:ring-primary-100',
    'transition-colors duration-200',
    'disabled:bg-neutral-50 disabled:cursor-not-allowed'
  );

  const labelClasses = 'block text-xs font-semibold text-primary-800 mb-1.5';

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-24 md:py-32 bg-[#F7F9FC] overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Subtle warm bloom lower-right */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full opacity-50"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 138, 30, 0.10) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={container}
          className="space-y-14 md:space-y-16"
        >
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <motion.p
              variants={reveal(0)}
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary-500"
            >
              Get in Touch
            </motion.p>
            <motion.h2
              id="contact-heading"
              variants={reveal(0.1)}
              className="text-4xl md:text-5xl font-bold text-primary-800 leading-tight"
            >
              Let&rsquo;s build your future.
            </motion.h2>
            <motion.p
              variants={reveal(0.2)}
              className="text-base md:text-lg text-neutral-600 leading-relaxed"
            >
              Tell us about your project, or just say hi.
            </motion.p>
          </div>

          {/* Two-column grid */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 lg:grid-cols-9 gap-6 lg:gap-8 items-start"
          >
            {/* LEFT: founder + meta cards (4 of 9 cols) */}
            <div className="lg:col-span-4 space-y-5">
              {/* Reach a founder directly */}
              <motion.div
                variants={reveal(0.1)}
                className={cn(
                  'rounded-2xl p-6 sm:p-7',
                  'bg-white/70 backdrop-blur-md border border-neutral-200/70',
                  'shadow-[0_1px_2px_rgba(11,42,107,0.04),0_8px_24px_rgba(11,42,107,0.04)]'
                )}
              >
                {/* Icon + heading */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200/70 ring-1 ring-primary-200/80">
                    <Mail className="w-5 h-5 text-primary-600" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-primary-800 leading-tight">
                      Reach a founder directly
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                      Skip the form. Email either of us — we both read everything.
                    </p>
                  </div>
                </div>

                {/* Founder rows */}
                <ul className="space-y-4" role="list">
                  {teamMembers.map((member) => (
                    <li key={member.id} className="flex items-center gap-3 min-w-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className="w-11 h-11 rounded-full object-cover flex-shrink-0 ring-1 ring-neutral-200/80"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-primary-800 leading-tight">
                          {member.name}{' '}
                          <span className="text-neutral-400 font-normal">
                            · {founderTitles[member.name]}
                          </span>
                        </p>
                        <div className="mt-1">
                          <CopyableEmail email={member.email} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Response time footer */}
                <div className="mt-5 pt-4 border-t border-neutral-200/70 flex items-center gap-2 text-xs text-neutral-500">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  Average response: within 24 hours
                </div>
              </motion.div>

              {/* GitHub + location */}
              <motion.div
                variants={reveal(0.2)}
                className={cn(
                  'rounded-2xl p-5 sm:p-6 flex items-center gap-4',
                  'bg-white/70 backdrop-blur-md border border-neutral-200/70',
                  'shadow-[0_1px_2px_rgba(11,42,107,0.04),0_8px_24px_rgba(11,42,107,0.04)]'
                )}
              >
                <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-neutral-100 border border-neutral-200/80">
                  <Github className="w-5 h-5 text-primary-800" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <a
                    href="https://github.com/JBWolfFlow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors break-all"
                  >
                    github.com/JBWolfFlow
                  </a>
                  <p className="mt-1 text-xs text-neutral-500 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                    Based in Temple, TX · serving clients nationwide
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: form panel (5 of 9 cols) */}
            <motion.div
              variants={reveal(0.15)}
              className={cn(
                'lg:col-span-5 rounded-2xl p-6 sm:p-8',
                'bg-white/70 backdrop-blur-md border border-neutral-200/70',
                'shadow-[0_1px_2px_rgba(11,42,107,0.04),0_8px_24px_rgba(11,42,107,0.04)]'
              )}
            >
              <h3 className="text-xl font-semibold text-primary-800 leading-tight">
                Send a message
              </h3>
              <p className="text-sm text-neutral-500 mt-1 mb-6">
                We&rsquo;ll get back within 24 hours.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot (hidden from users) */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />
                <input type="hidden" name="csrf_token" value={csrfToken} />

                {/* Name + Company same row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className={labelClasses}>
                      Name <span className="text-accent-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      placeholder="Your name"
                      className={cn(inputBaseClasses, errors.name && 'border-red-400 focus:border-red-500')}
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-company" className={labelClasses}>
                      Company <span className="text-neutral-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="Your company"
                      className={inputBaseClasses}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className={labelClasses}>
                    Email <span className="text-accent-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                    placeholder="you@company.com"
                    className={cn(inputBaseClasses, errors.email && 'border-red-400 focus:border-red-500')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                {/* Project type */}
                <div>
                  <label htmlFor="contact-project-type" className={labelClasses}>
                    Project type <span className="text-accent-500">*</span>
                  </label>
                  <select
                    id="contact-project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={cn(inputBaseClasses, 'pr-10 appearance-none bg-no-repeat', errors.projectType && 'border-red-400 focus:border-red-500')}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7686' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m5 7.5 5 5 5-5'/%3E%3C/svg%3E\")",
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                    }}
                    aria-invalid={errors.projectType ? 'true' : 'false'}
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && <p className="mt-1 text-xs text-red-600">{errors.projectType}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelClasses}>
                    Message <span className="text-accent-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                    rows={5}
                    maxLength={1000}
                    placeholder="Tell us about your project…"
                    className={cn(inputBaseClasses, 'resize-y min-h-[120px]', errors.message && 'border-red-400 focus:border-red-500')}
                    aria-invalid={errors.message ? 'true' : 'false'}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.message ? (
                      <p className="text-xs text-red-600">{errors.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-[10px] text-neutral-400">
                      {formData.message.length} / 1000
                    </span>
                  </div>
                </div>

                {rateLimitError && (
                  <div role="alert" className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm">
                    <p className="font-medium text-red-800">Submission Limit Reached</p>
                    <p className="text-xs mt-0.5 text-red-700">{rateLimitError}</p>
                  </div>
                )}

                {submitSuccess && (
                  <div role="alert" className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm">
                    <p className="font-medium text-emerald-800">Message sent successfully!</p>
                    <p className="text-xs mt-0.5 text-emerald-700">We&rsquo;ll get back to you within 24 hours.</p>
                  </div>
                )}

                {/* Send button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white',
                      'bg-primary-500 hover:bg-primary-600',
                      'shadow-[0_4px_20px_rgba(30,91,255,0.35)] hover:shadow-[0_8px_30px_rgba(30,91,255,0.5)]',
                      'transition-all duration-300 hover:scale-[1.02]',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2',
                      'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
