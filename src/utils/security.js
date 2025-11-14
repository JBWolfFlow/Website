/**
 * Security Utilities for Form Protection
 * Implements honeypot, rate limiting, input sanitization, and validation
 */

// Rate limiting storage (in-memory for client-side)
const rateLimitStore = new Map();

/**
 * Rate Limiter - Prevents spam submissions
 * @param {string} identifier - Unique identifier (e.g., email or IP)
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} - { allowed: boolean, remainingAttempts: number, resetTime: number }
 */
export const checkRateLimit = (identifier, maxAttempts = 3, windowMs = 60000) => {
  const now = Date.now();
  const key = `ratelimit_${identifier}`;
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, {
      attempts: 1,
      firstAttempt: now,
      resetTime: now + windowMs
    });
    return { allowed: true, remainingAttempts: maxAttempts - 1, resetTime: now + windowMs };
  }

  const record = rateLimitStore.get(key);
  
  // Reset if window has passed
  if (now > record.resetTime) {
    rateLimitStore.set(key, {
      attempts: 1,
      firstAttempt: now,
      resetTime: now + windowMs
    });
    return { allowed: true, remainingAttempts: maxAttempts - 1, resetTime: now + windowMs };
  }

  // Check if limit exceeded
  if (record.attempts >= maxAttempts) {
    return { 
      allowed: false, 
      remainingAttempts: 0, 
      resetTime: record.resetTime 
    };
  }

  // Increment attempts
  record.attempts++;
  rateLimitStore.set(key, record);
  
  return { 
    allowed: true, 
    remainingAttempts: maxAttempts - record.attempts, 
    resetTime: record.resetTime 
  };
};

/**
 * Input Sanitization - Removes potentially harmful characters
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  // Don't trim during typing - only remove dangerous content
  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove data: protocol
    .replace(/data:/gi, '')
    // Limit consecutive special characters (but preserve spaces)
    .replace(/([^a-zA-Z0-9\s])\1{3,}/g, '$1$1$1');
};

/**
 * Email Validation - Enhanced email validation
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) return false;
  
  // Additional checks
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  
  const [localPart, domain] = parts;
  
  // Check local part length
  if (localPart.length > 64) return false;
  
  // Check domain length
  if (domain.length > 255) return false;
  
  // Check for consecutive dots
  if (email.includes('..')) return false;
  
  // Check for valid TLD
  const tld = domain.split('.').pop();
  if (!tld || tld.length < 2) return false;
  
  return true;
};

/**
 * Detect Suspicious Patterns - Identifies potential spam/malicious content
 * @param {string} text - Text to analyze
 * @returns {Object} - { isSuspicious: boolean, reasons: string[] }
 */
export const detectSuspiciousPatterns = (text) => {
  const reasons = [];
  const lowerText = text.toLowerCase();
  
  // Check for excessive URLs
  const urlPattern = /(https?:\/\/[^\s]+)/gi;
  const urls = text.match(urlPattern) || [];
  if (urls.length > 3) {
    reasons.push('Too many URLs detected');
  }
  
  // Check for common spam keywords
  const spamKeywords = [
    'viagra', 'cialis', 'casino', 'lottery', 'winner', 'congratulations',
    'click here', 'buy now', 'limited time', 'act now', 'free money',
    'make money fast', 'work from home', 'weight loss', 'crypto', 'bitcoin'
  ];
  
  const foundSpamWords = spamKeywords.filter(keyword => lowerText.includes(keyword));
  if (foundSpamWords.length > 0) {
    reasons.push(`Spam keywords detected: ${foundSpamWords.join(', ')}`);
  }
  
  // Check for excessive capitalization
  const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
  if (capsRatio > 0.5 && text.length > 20) {
    reasons.push('Excessive capitalization');
  }
  
  // Check for excessive special characters
  const specialChars = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
  const specialRatio = specialChars / text.length;
  if (specialRatio > 0.3) {
    reasons.push('Excessive special characters');
  }
  
  // Check for repeated characters
  if (/(.)\1{10,}/.test(text)) {
    reasons.push('Excessive character repetition');
  }
  
  return {
    isSuspicious: reasons.length > 0,
    reasons
  };
};

/**
 * Honeypot Validator - Checks if honeypot field was filled (bot detection)
 * @param {string} value - Honeypot field value
 * @returns {boolean} - True if likely a bot
 */
export const isHoneypotFilled = (value) => {
  return value !== undefined && value !== null && value !== '';
};

/**
 * Timing Analysis - Detects suspiciously fast form submissions
 * @param {number} startTime - Form load timestamp
 * @param {number} submitTime - Form submit timestamp
 * @param {number} minTime - Minimum expected time in ms (default 3 seconds)
 * @returns {boolean} - True if submission is suspiciously fast
 */
export const isSuspiciouslyFast = (startTime, submitTime, minTime = 3000) => {
  const timeTaken = submitTime - startTime;
  return timeTaken < minTime;
};

/**
 * Generate CSRF Token - Simple client-side token generation
 * @returns {string} - Random token
 */
export const generateCSRFToken = () => {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Validate Form Data - Comprehensive validation
 * @param {Object} formData - Form data to validate
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validateFormData = (formData) => {
  const errors = {};
  
  // Name validation
  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (formData.name.trim().length > 100) {
    errors.name = 'Name must be less than 100 characters';
  } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
    errors.name = 'Name contains invalid characters';
  }
  
  // Email validation
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Company validation (optional but if provided, validate)
  if (formData.company && formData.company.trim().length > 100) {
    errors.company = 'Company name must be less than 100 characters';
  }
  
  // Project type validation
  if (!formData.projectType) {
    errors.projectType = 'Please select a project type';
  }
  
  // Message validation
  if (!formData.message || !formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters';
  } else if (formData.message.trim().length > 1000) {
    errors.message = 'Message must be less than 1000 characters';
  }
  
  // Check for suspicious content in message
  const suspiciousCheck = detectSuspiciousPatterns(formData.message);
  if (suspiciousCheck.isSuspicious) {
    errors.message = 'Message contains suspicious content. Please revise and try again.';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Clean Rate Limit Store - Removes expired entries
 * Should be called periodically to prevent memory leaks
 */
export const cleanRateLimitStore = () => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
};

// Clean rate limit store every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(cleanRateLimitStore, 5 * 60 * 1000);
}