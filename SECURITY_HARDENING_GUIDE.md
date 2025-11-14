# J&H Digital Website - Security Hardening Guide

**Version:** 1.0.0  
**Last Updated:** 2024-01-24  
**Purpose:** Step-by-step security hardening procedures

---

## Table of Contents

1. [Introduction](#introduction)
2. [Pre-Hardening Checklist](#pre-hardening-checklist)
3. [Security Headers Implementation](#security-headers-implementation)
4. [Content Security Policy (CSP)](#content-security-policy-csp)
5. [Form Security Enhancements](#form-security-enhancements)
6. [Input Sanitization](#input-sanitization)
7. [Build Security Configuration](#build-security-configuration)
8. [Dependency Security](#dependency-security)
9. [Environment Variable Security](#environment-variable-security)
10. [Monitoring and Logging](#monitoring-and-logging)
11. [GDPR Compliance](#gdpr-compliance)
12. [Security Testing](#security-testing)
13. [Deployment Security](#deployment-security)
14. [Incident Response](#incident-response)

---

## Introduction

This guide provides comprehensive, step-by-step instructions for hardening the J&H Digital website security. Follow these procedures in order to achieve enterprise-grade security.

### Security Hardening Goals

- ✅ Implement comprehensive security headers
- ✅ Configure Content Security Policy (CSP)
- ✅ Add CSRF protection to forms
- ✅ Implement input sanitization
- ✅ Configure secure build process
- ✅ Set up security monitoring
- ✅ Ensure GDPR compliance
- ✅ Establish security testing procedures

### Estimated Time

- **Basic Hardening:** 4-6 hours
- **Advanced Features:** 8-12 hours
- **Full Implementation:** 2-3 days

---

## Pre-Hardening Checklist

Before beginning security hardening:

- [ ] Backup current codebase
- [ ] Create a new branch: `git checkout -b security/hardening`
- [ ] Review [`SECURITY_AUDIT.md`](SECURITY_AUDIT.md:1) findings
- [ ] Set up staging environment for testing
- [ ] Notify team of security updates
- [ ] Schedule maintenance window if needed

---

## Security Headers Implementation

### Step 1: Create Security Headers Configuration

Security headers protect against various attacks. We'll create platform-specific configurations.

#### For Netlify (_headers file)

Create `public/_headers`:

```bash
# Security Headers for Netlify

/*
  # Content Security Policy
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests
  
  # Prevent clickjacking
  X-Frame-Options: DENY
  
  # Prevent MIME type sniffing
  X-Content-Type-Options: nosniff
  
  # Enable XSS protection
  X-XSS-Protection: 1; mode=block
  
  # Referrer policy
  Referrer-Policy: strict-origin-when-cross-origin
  
  # Permissions policy
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()
  
  # Strict Transport Security (HSTS)
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  
  # Remove server information
  X-Powered-By: 
  Server: 

# Cache control for static assets
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

# No cache for HTML
/*.html
  Cache-Control: no-cache, no-store, must-revalidate
```

#### For Vercel (vercel.json)

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### For Apache (.htaccess)

Create `.htaccess` (for traditional hosting):

```apache
# Security Headers for Apache

<IfModule mod_headers.c>
  # Content Security Policy
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"
  
  # Prevent clickjacking
  Header always set X-Frame-Options "DENY"
  
  # Prevent MIME type sniffing
  Header always set X-Content-Type-Options "nosniff"
  
  # Enable XSS protection
  Header always set X-XSS-Protection "1; mode=block"
  
  # Referrer policy
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  
  # Permissions policy
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
  
  # Strict Transport Security
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  
  # Remove server information
  Header unset X-Powered-By
  Header unset Server
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# SPA routing
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Disable directory browsing
Options -Indexes

# Protect sensitive files
<FilesMatch "^\.">
  Order allow,deny
  Deny from all
</FilesMatch>
```

#### For Nginx (nginx.conf snippet)

Create `nginx-security.conf`:

```nginx
# Security Headers for Nginx

# Add to your server block

# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests" always;

# Prevent clickjacking
add_header X-Frame-Options "DENY" always;

# Prevent MIME type sniffing
add_header X-Content-Type-Options "nosniff" always;

# Enable XSS protection
add_header X-XSS-Protection "1; mode=block" always;

# Referrer policy
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Permissions policy
add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()" always;

# Strict Transport Security
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# Gzip compression
gzip on;
gzip_vary on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

# Cache static assets
location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# No cache for HTML
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}

# SPA routing
location / {
    try_files $uri $uri/ /index.html;
}

# Hide server version
server_tokens off;
```

### Step 2: Test Security Headers

After deploying, test your headers:

```bash
# Using curl
curl -I https://jhdigital.com

# Or use online tools:
# - https://securityheaders.com
# - https://observatory.mozilla.org
```

**Expected Result:** Grade A or A+ on SecurityHeaders.com

---

## Content Security Policy (CSP)

### Understanding CSP Directives

```
default-src 'self'              # Default policy for all resources
script-src 'self' 'unsafe-inline'  # JavaScript sources
style-src 'self' 'unsafe-inline'   # CSS sources
img-src 'self' data: https:     # Image sources
font-src 'self' https://fonts.gstatic.com  # Font sources
connect-src 'self'              # AJAX, WebSocket sources
frame-ancestors 'none'          # Prevent embedding
base-uri 'self'                 # Restrict <base> tag
form-action 'self'              # Form submission targets
upgrade-insecure-requests       # Upgrade HTTP to HTTPS
```

### Step 1: Implement CSP Meta Tag (Fallback)

Update [`index.html`](index.html:4):

```html
<head>
  <meta charset="UTF-8" />
  
  <!-- Content Security Policy (fallback if headers not available) -->
  <meta http-equiv="Content-Security-Policy" 
        content="default-src 'self'; 
                 script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
                 style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
                 img-src 'self' data: https:; 
                 font-src 'self' https://fonts.gstatic.com; 
                 connect-src 'self'; 
                 frame-ancestors 'none'; 
                 base-uri 'self'; 
                 form-action 'self'">
  
  <!-- Rest of head content -->
</head>
```

### Step 2: Remove Unsafe-Inline (Advanced)

For production, remove `'unsafe-inline'` and use nonces:

1. **Install CSP plugin:**
```bash
npm install --save-dev vite-plugin-csp
```

2. **Update [`vite.config.js`](vite.config.js:1):**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import csp from 'vite-plugin-csp'

export default defineConfig({
  plugins: [
    react(),
    csp({
      policy: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'nonce-{NONCE}'"],
        'style-src': ["'self'", "'nonce-{NONCE}'"],
        'img-src': ["'self'", 'data:', 'https:'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'connect-src': ["'self'"],
        'frame-ancestors': ["'none'"],
        'base-uri': ["'self'"],
        'form-action': ["'self'"]
      }
    })
  ]
})
```

### Step 3: Test CSP

```bash
# Build and test
npm run build
npm run preview

# Check browser console for CSP violations
# Fix any violations before deploying
```

---

## Form Security Enhancements

### Step 1: Install Dependencies

```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

### Step 2: Create Security Utilities

Create `src/utils/security.js`:

```javascript
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML input to prevent XSS
 */
export const sanitizeHTML = (dirty) => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: []
  });
};

/**
 * Sanitize text input
 */
export const sanitizeText = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .substring(0, 1000); // Limit length
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate CSRF token
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Store CSRF token
 */
export const storeCSRFToken = (token) => {
  sessionStorage.setItem('csrf_token', token);
  sessionStorage.setItem('csrf_token_time', Date.now().toString());
};

/**
 * Validate CSRF token
 */
export const validateCSRFToken = (token) => {
  const storedToken = sessionStorage.getItem('csrf_token');
  const tokenTime = sessionStorage.getItem('csrf_token_time');
  
  // Token expires after 1 hour
  if (Date.now() - parseInt(tokenTime) > 3600000) {
    return false;
  }
  
  return token === storedToken;
};

/**
 * Rate limiting check
 */
export const checkRateLimit = (key, maxAttempts = 3, windowMs = 60000) => {
  const attempts = JSON.parse(localStorage.getItem(`rate_limit_${key}`) || '[]');
  const now = Date.now();
  
  // Remove old attempts outside the window
  const recentAttempts = attempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return {
      allowed: false,
      retryAfter: Math.ceil((recentAttempts[0] + windowMs - now) / 1000)
    };
  }
  
  // Add current attempt
  recentAttempts.push(now);
  localStorage.setItem(`rate_limit_${key}`, JSON.stringify(recentAttempts));
  
  return { allowed: true };
};

/**
 * Honeypot field validator
 */
export const validateHoneypot = (value) => {
  // Honeypot should be empty
  return value === '' || value === undefined;
};
```

### Step 3: Update Contact Form

Update [`src/components/sections/Contact.jsx`](src/components/sections/Contact.jsx:1):

```javascript
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Loader2, AlertCircle } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { useInView } from '../../hooks/useInView';
import {
  sanitizeText,
  validateEmail,
  generateCSRFToken,
  storeCSRFToken,
  validateCSRFToken,
  checkRateLimit,
  validateHoneypot
} from '../../utils/security';

const Contact = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
    honeypot: '' // Honeypot field
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [rateLimitError, setRateLimitError] = useState(null);

  // Generate CSRF token on mount
  useEffect(() => {
    const token = generateCSRFToken();
    setCsrfToken(token);
    storeCSRFToken(token);
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@jhdigital.com',
      href: 'mailto:contact@jhdigital.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: null
    }
  ];

  const projectTypes = [
    'Web Development',
    'Mobile App',
    'Full Stack',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};

    // Honeypot validation (bot detection)
    if (!validateHoneypot(formData.honeypot)) {
      newErrors.form = 'Invalid submission detected';
      return false;
    }

    // Name validation
    const sanitizedName = sanitizeText(formData.name);
    if (!sanitizedName) {
      newErrors.name = 'Name is required';
    } else if (sanitizedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const sanitizedEmail = sanitizeText(formData.email);
    if (!sanitizedEmail) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(sanitizedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Project type validation
    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    // Message validation
    const sanitizedMessage = sanitizeText(formData.message);
    if (!sanitizedMessage) {
      newErrors.message = 'Message is required';
    } else if (sanitizedMessage.length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    } else if (sanitizedMessage.length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input on change
    const sanitizedValue = name === 'email' ? value : sanitizeText(value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear rate limit error
    if (rateLimitError) {
      setRateLimitError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate CSRF token
    if (!validateCSRFToken(csrfToken)) {
      setErrors({ form: 'Security validation failed. Please refresh the page.' });
      return;
    }

    // Check rate limiting
    const rateLimit = checkRateLimit('contact_form', 3, 60000);
    if (!rateLimit.allowed) {
      setRateLimitError(`Too many attempts. Please try again in ${rateLimit.retryAfter} seconds.`);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Prepare sanitized data
      const sanitizedData = {
        name: sanitizeText(formData.name),
        email: sanitizeText(formData.email),
        company: sanitizeText(formData.company),
        projectType: formData.projectType,
        message: sanitizeText(formData.message),
        csrfToken: csrfToken,
        timestamp: Date.now()
      };

      // TODO: Replace with actual API call
      // const response = await fetch(import.meta.env.VITE_FORM_ENDPOINT, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-CSRF-Token': csrfToken
      //   },
      //   body: JSON.stringify(sanitizedData)
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        message: '',
        honeypot: ''
      });

      // Generate new CSRF token
      const newToken = generateCSRFToken();
      setCsrfToken(newToken);
      storeCSRFToken(newToken);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      setErrors({ form: 'An error occurred. Please try again.' });
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
            {/* Contact Form */}
            <div
              className={`md:col-span-3 transition-all duration-700 delay-200 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden from users) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
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
                  maxLength={100}
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
                  maxLength={100}
                />

                {/* Company Input */}
                <Input
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company (Optional)"
                  disabled={isSubmitting}
                  maxLength={100}
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
                    className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 flex items-start gap-3"
                    role="alert"
                  >
                    <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-medium">Rate limit exceeded</p>
                      <p className="text-sm mt-1">{rateLimitError}</p>
                    </div>
                  </div>
                )}

                {/* Form Error */}
                {errors.form && (
                  <div
                    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                    role="alert"
                  >
                    <p className="font-medium">{errors.form}</p>
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
                  disabled={isSubmitting || !!rateLimitError}
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

                {/* Security Notice */}
                <p className="text-xs text-gray-500 text-center">
                  This form is protected by security measures including CSRF protection and rate limiting.
                </p>
              </form>
            </div>

            {/* Contact Info Cards */}
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
```

### Step 4: Test Form Security

```bash
# Test locally
npm run dev

# Test scenarios:
# 1. Submit form multiple times (rate limiting)
# 2. Fill honeypot field (bot detection)
# 3. Try XSS in inputs (sanitization)
# 4. Refresh page and resubmit (CSRF validation)
```

---

## Input Sanitization

### Step 1: Create Sanitization Utility

Already created in `src/utils/security.js` above.

### Step 2: Apply to All Inputs

Update [`src/components/ui/Input.jsx`](src/components/ui/Input.jsx:1):

```javascript
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { sanitizeText } from '../../utils/security';

const Input = forwardRef(
  (
    {
      label,
      error,
      required = false,
      className,
      id,
      type = 'text',
      onChange,
      maxLength = 100,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const handleChange = (e) => {
      if (onChange) {
        // Sanitize input except for email type
        if (type !== 'email' && type !== 'password') {
          e.target.value = sanitizeText(e.target.value);
        }
        onChange(e);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          maxLength={maxLength}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 rounded-lg border border-gray-300',
            'focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'transition-all duration-200',
            'placeholder:text-gray-400',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
```

---

## Build Security Configuration

### Step 1: Update Vite Configuration

Update [`vite.config.js`](vite.config.js:1):

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
  build: {
    // Disable source maps in production
    sourcemap: mode === 'development',
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
        pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : []
      },
      format: {
        comments: false
      }
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'animations': ['framer-motion'],
          'forms': ['react-hook-form'],
          'security': ['dompurify']
        }
      }
    },
    chunkSizeWarningLimit: 500,
    
    // Asset handling
    assetsInlineLimit: 4096,
    
    // Output directory
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true,
    // Security headers for dev server
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff'
    }
  },
  preview: {
    port: 4173,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff'
    }
  }
}))
```

### Step 2: Update Package.json Scripts

Update [`package.json`](package.json:6):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:analyze": "vite build --mode production && npx vite-bundle-visualizer",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext js,jsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,css,md}\"",
    "security:audit": "npm audit",
    "security:fix": "npm audit fix",
    "security:check": "npm outdated && npm audit"
  }
}
```

---

## Dependency Security

### Step 1: Create Security Audit Script

Create `.github/workflows/security-audit.yml`:

```yaml
name: Security Audit

on:
  schedule:
    # Run weekly on Monday at 9 AM
    - cron: '0 9 * * 1'
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  security:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run npm audit
        run: npm audit --audit-level=moderate
        continue-on-error: true
      
      - name: Check for outdated packages
        run: npm outdated
        continue-on-error: true
      
      - name: Run security checks
        run: |
          echo "Security audit completed"
          npm audit --json > audit-report.json
      
      - name: Upload audit report
        uses: actions/upload-artifact@v3
        with:
          name: security-audit-report
          path: audit-report.json
```

### Step 2: Regular Dependency Updates

Create a monthly schedule:

```bash
# First Monday of each month
# 1. Check for updates
npm outdated

# 2. Review security advisories
npm audit

# 3. Update dependencies
npm update

# 4. Test thoroughly
npm run build
npm run preview

# 5. Commit and deploy
git add package.json package-lock.json
git commit -m "chore: update dependencies"
git push
```

---

## Environment Variable Security

### Step 1: Update .env.example

Update [`.env.example`](.env.example:1) with security warnings:

```bash
# ==============================================
# SECURITY NOTICE
# ==============================================
# 
# ⚠️ NEVER commit the actual .env file to version control
# ⚠️ NEVER expose API keys or secrets in client-side code
# ⚠️ All VITE_ prefixed variables are exposed to the client
# ⚠️ Rotate secrets regularly (every 90 days minimum)
# ⚠️ Use different values for development and production
#
# ==============================================

# Environment Variables Configuration
# Copy this file to .env and fill in your actual values

# ==============================================
# Site Configuration
# ==============================================

# Site URL (used for SEO and canonical URLs)
# Production: https://jhdigital.com
# Staging: https://staging.jhdigital.com
# Development: http://localhost:3000
VITE_SITE_URL=https://jhdigital.com

# Site Name
VITE_SITE_NAME=J&H Digital

# ==============================================
# Contact Information
# ==============================================

# Contact Email (will be visible on website)
VITE_CONTACT_EMAIL=hello@jhdigital.com

# Contact Phone (will be visible on website)
VITE_CONTACT_PHONE=+1-555-0123

# ==============================================
# Social Media
# ==============================================

# Twitter Handle (without @)
VITE_TWITTER_HANDLE=jhdigital

# LinkedIn Company URL
VITE_LINKEDIN_URL=https://linkedin.com/company/jhdigital

# GitHub Organization URL
VITE_GITHUB_URL=https://github.com/jhdigital

# ==============================================
# Analytics (Optional)
# ==============================================

# Google Analytics Measurement ID
# ⚠️ This will be visible in client-side code
# VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager ID
# ⚠️ This will be visible in client-side code
# VITE_GTM_ID=GTM-XXXXXXX

# ==============================================
# Form Handling (Optional)
# ==============================================

# Form submission endpoint (e.g., Formspree, Netlify Forms)
# ⚠️ Use a service-specific endpoint, not a direct email
# VITE_FORM_ENDPOINT=https://formspree.io/f/your-form-id

# ==============================================
# API Configuration (Optional)
# ==============================================

# API Base URL (if using a backend API)
# VITE_API_BASE_URL=https://api.jhdigital.com

# ⚠️ WARNING: Never put API keys in VITE_ variables!
# API keys should be handled server-side only
# If you need client-side API access, use:
# 1. Backend proxy
# 2. Restricted API keys with domain whitelist
# 3. Short-lived tokens

# ==============================================
# Feature Flags (Optional)
# ==============================================

# Enable dark mode
VITE_ENABLE_DARK_MODE=true

# Enable animations
VITE_ENABLE_ANIMATIONS=true

# Enable analytics
VITE_ENABLE_ANALYTICS=false

# ==============================================
# Development Settings
# ==============================================

# Development mode
VITE_DEV_MODE=true

# Debug mode (disable in production)
VITE_DEBUG=false

# ==============================================
# Security Configuration
# ==============================================

# Environment (development, staging, production)
VITE_ENVIRONMENT=development

# Enable security features
VITE_ENABLE_CSRF=true
VITE_ENABLE_RATE_LIMITING=true

# ==============================================
# SECURITY BEST PRACTICES
# ==============================================
# 
# 1. NEVER commit .env files to version control
#    - Add .env to .gitignore (already done)
#    - Only commit .env.example with placeholder values
#
# 2. Use different values for each environment
#    - Development: .env.development
#    - Staging: .env.staging
#    - Production: .env.production
#
# 3. Rotate secrets regularly
#    - API keys: Every 90 days
#    - Passwords: Every 90 days
#    - Tokens: Based on expiration policy
#
# 4. Limit access to production secrets
#    - Use secret management tools (AWS Secrets Manager, etc.)
#    - Implement least privilege access
#    - Audit secret access regularly
#
# 5. Monitor for exposed secrets
#    - Use tools like GitGuardian, TruffleHog
#    - Set up alerts for secret exposure
#    - Have an incident response plan
#
# 6. Client-side exposure
#    - All VITE_ variables are PUBLIC
#    - Never put sensitive data in VITE_ variables
#    - Use backend proxy for sensitive operations
#
# 7. Validation
#    - Validate all environment variables on startup
#    - Fail fast if required variables are missing
#    - Log configuration errors (without exposing secrets)
#
# ==============================================
# Notes
# ==============================================
# 
# 1. All environment variables must be prefixed with VITE_ to be exposed to the client
# 2. Restart the development server after changing environment variables
# 3. Use import.meta.env.VITE_VARIABLE_NAME to access variables in your code
#
# Example usage in code:
# const siteUrl = import.meta.env.VITE_SITE_URL;
#
# ==============================================
# Emergency Contacts
# ==============================================
#
# Security Issues: security@jhdigital.com
# Technical Support: support@jhdigital.com
# Emergency: [Your emergency contact]
#
# ==============================================
```

### Step 2: Create Environment Validation

Create `src/utils/validateEnv.js`:

```javascript
/**
 * Validate required environment variables
 */
export const validateEnv = () => {
  const required = [
    'VITE_SITE_URL',
    'VITE_SITE_NAME',
    'VITE_CONTACT_EMAIL'
  ];

  const missing = required.filter(
    key => !import.meta.env[key]
  );

  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate URL format
  try {
    new URL(import.meta.env.VITE_SITE_URL);
  } catch (error) {
    throw new Error('VITE_SITE_URL must be a valid URL');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(import.meta.env.VITE_CONTACT_EMAIL)) {
    throw new Error('VITE_CONTACT_EMAIL must be a valid email address');
  }

  console.log('✅ Environment variables validated successfully');
};
```

Update [`src/main.jsx`](src/main.jsx:1):

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { validateEnv } from './utils/validateEnv'

// Validate environment variables before rendering
try {
  validateEnv();
} catch (error) {
  console.error('Environment validation failed:', error);
  // In production, you might want to show an error page
  if (import.meta.env.MODE === 'production') {
    document.body.innerHTML = '<h1>Configuration Error</h1><p>Please contact support.</p>';
    throw error;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## Monitoring and Logging

### Step 1: Install Monitoring Tools

```bash
# Option 1: Sentry (recommended)
npm install @sentry/react

# Option 2: LogRocket
npm install logrocket
```

### Step 2: Configure Sentry

Create `src/utils/monitoring.js`:

```javascript
import * as Sentry from "@sentry/react";

/**
 * Initialize error monitoring
 */
export const initMonitoring = () => {
  if (import.meta.env.MODE === 'production' && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      tracesSampleRate: 1.0,
      
      // Security: Don't send sensitive data
      beforeSend(event, hint) {
        // Remove sensitive data from error reports
        if (event.request) {
          delete event.request.cookies;
          delete event.request.headers;
        }
        return event;
      },
      
      // Ignore certain errors
      ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured'
      ]
    });
  }
};

/**
 * Log security event
 */
export const logSecurityEvent = (event, details) => {
  const logData = {
    event,
    details,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  };

  // Log to console in development
  if (import.meta.env.MODE === 'development') {
    console.warn('Security Event:', logData);
  }

  // Send to monitoring service in production
  if (import.meta.env.MODE === 'production') {
    Sentry.captureMessage(`Security Event: ${event}`, {
      level: 'warning',
      extra: logData
    });
  }
};
```

Update [`src/main.jsx`](src/main.jsx:1):

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { validateEnv } from './utils/validateEnv'
import { initMonitoring } from './utils/monitoring'

// Initialize monitoring
initMonitoring();

// Validate environment variables
try {
  validateEnv();
} catch (error) {
  console.error('Environment validation failed:', error);
  if (import.meta.env.MODE === 'production') {
    document.body.innerHTML = '<h1>Configuration Error</h1><p>Please contact support.</p>';
    throw error;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## GDPR Compliance

### Step 1: Create Privacy Policy

Create `public/privacy-policy.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy - J&H Digital</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1 { color: #2563eb; }
    h2 { color: #1e40af; margin-top: 2em; }
    .last-updated { color: #666; font-style: italic; }
  </style>
</head>
<body>
  <h1>Privacy Policy</h1>
  <p class="last-updated">Last Updated: January 24, 2024</p>
  
  <h2>1. Information We Collect</h2>
  <p>We collect information you provide directly to us through our contact form:</p>
  <ul>
    <li>Name</li>
    <li>Email address</li>
    <li>Company name (optional)</li>
    <li>Project details</li>
  </ul>
  
  <h2>2. How We Use Your Information</h2>
  <p>We use the information we collect to:</p>
  <ul>
    <li>Respond to your inquiries</li>
    <li>Provide requested services</li>
    <li>Improve our website and services</li>
  </ul>
  
  <h2>3. Data Security</h2>
  <p>We implement appropriate security measures to protect your personal information.</p>
  
  <h2>4. Your Rights</h2>
  <p>You have the right to:</p>
  <ul>
    <li>Access your personal data</li>
    <li>Correct inaccurate data</li>
    <li>Request deletion of your data</li>
    <li>Object to data processing</li>
  </ul>
  
  <h2>5. Contact Us</h2>
  <p>For privacy-related questions, contact us at: privacy@jhdigital.com</p>
</body>
</html>
```

### Step 2: Create Cookie Consent Component

Create `src/components/common/CookieConsent.jsx`:

```javascript
import { useState, useEffect } from 'react';
import Button from '../ui/Button';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            We use essential cookies to ensure our website functions properly. 
            By continuing to use this site, you agree to our use of cookies.{' '}
            <a href="/privacy-policy.html" className="underline hover:text-primary-400">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleDecline}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
          >
            Decline
          </Button>
          <Button onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
```

---

## Security Testing

### Step 1: Create Security Test Checklist

Create `SECURITY_TESTING.md`:

```markdown
# Security Testing Checklist

## Pre-Deployment Testing

### Security Headers
- [ ] CSP header present and correct
- [ ] X-Frame-Options set to DENY
- [ ] X-Content-Type-Options set to nosniff
- [ ] X-XSS-Protection enabled
- [ ] Referrer-Policy configured
- [ ] HSTS header present (production only)

### Form Security
- [ ] CSRF protection working
- [ ] Rate limiting functional
- [ ] Honeypot field hidden
- [ ] Input sanitization active
- [ ] Email validation working
- [ ] XSS attempts blocked

### Build Security
- [ ] Source maps disabled in production
- [ ] Console logs removed in production
- [ ] Debug code removed
- [ ] Minification working
- [ ] No sensitive data in bundle

### Testing Commands
```bash
# Test security headers
curl -I https://your-site.com

# Test CSP
# Open browser console and check for CSP violations

# Test form security
# Try submitting form multiple times
# Try XSS payloads in inputs
# Try filling honeypot field

# Test build
npm run build
# Check dist/ folder for source maps
# Check bundle size
```

## Automated Testing

```bash
# Run security audit
npm run security:audit

# Check dependencies
npm run security:check

# Lint code
npm run lint
```

## Manual Testing

1. **XSS Testing**
   - Try: `<script>alert('XSS')</script>`
   - Try: `<img src=x onerror=alert('XSS')>`
   - Try: `javascript:alert('XSS')`

2. **CSRF Testing**
   - Submit form from different origin
   - Resubmit with old CSRF token
   - Submit without CSRF token

3. **Rate Limiting**
   - Submit form 5 times quickly
   - Verify rate limit message appears

4. **Input Validation**
   - Submit empty fields
   - Submit very long inputs
   - Submit special characters
```

---

## Deployment Security

### Pre-Deployment Checklist

- [ ] All security headers configured
- [ ] CSP implemented and tested
- [ ] Form security features active
- [ ] Source maps disabled
- [ ] Environment variables set
- [ ] HTTPS enforced
- [ ] Security testing completed
- [ ] Monitoring configured
- [ ] Backup procedures in place
- [ ] Incident response plan ready

### Deployment Steps

1. **Final Security Review**
```bash
npm run security:check
npm run lint
npm run build
```

2. **Deploy to Staging**
```bash
# Test all security features in staging
# Run penetration tests
# Verify monitoring works
```

3. **Deploy to Production**
```bash
# Use your deployment method
# Verify security headers
# Test critical functionality
# Monitor for issues
```

4. **Post-Deployment**
```bash
# Verify HTTPS
# Test security headers
# Check monitoring dashboard
# Review logs
```

---

## Incident Response

### Security Incident Procedure

1. **Detection**
   - Monitor alerts
   - Review logs
   - User reports

2. **Assessment**
   - Determine severity
   - Identify affected systems
   - Document findings

3. **Containment**
   - Isolate affected systems
   - Block malicious traffic
   - Preserve evidence

4. **Eradication**
   - Remove threat
   - Patch vulnerabilities
   - Update security measures

5. **Recovery**
   - Restore services
   - Verify security
   - Monitor closely

6. **Post-Incident**
   - Document incident
   - Update procedures
   - Implement improvements

### Emergency Contacts

- **Security Team:** security@jhdigital.com
- **Technical Lead:** tech@jhdigital.com
- **Emergency:** [Emergency contact]

---

## Maintenance Schedule

### Daily
- [ ] Monitor error logs
- [ ] Check uptime
- [ ] Review security alerts

### Weekly
- [ ] Run security audit
- [ ] Check for dependency updates
- [ ] Review access logs

### Monthly
- [ ] Update dependencies
- [ ] Security testing
- [ ] Review and update documentation

### Quarterly
- [ ] Full security audit
- [ ] Penetration testing
- [ ] Update security procedures

---

## Conclusion

Following this hardening guide will significantly improve the security posture of the J&H Digital website. Remember:

1. **Security is ongoing** - Regular updates and monitoring are essential
2. **Test thoroughly** - Always test security features before deployment
3. **Stay informed** - Keep up with security best practices and vulnerabilities
4. **Document everything** - Maintain clear documentation of security measures
5. **Plan for incidents** - Have a response plan ready

For questions or concerns, contact: security@jhdigital.com

---

**Document Version:** 1.0.0  
**Last Updated:** 2024-01-24  
**Next Review:** 2024-04-24