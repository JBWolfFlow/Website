/**
 * Form Service - Handles form submissions with multiple backend options
 * Supports: Formspree, EmailJS, Web3Forms, and custom serverless functions
 */

// Form submission service types
export const FormServiceType = {
  FORMSPREE: 'formspree',
  EMAILJS: 'emailjs',
  WEB3FORMS: 'web3forms',
  CUSTOM: 'custom',
  MOCK: 'mock' // For development/testing
};

/**
 * Formspree Integration
 * Sign up at: https://formspree.io/
 * Get your form ID and add to .env as VITE_FORMSPREE_FORM_ID
 */
const submitToFormspree = async (formData, formId) => {
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit form');
  }

  return await response.json();
};

/**
 * EmailJS Integration
 * Sign up at: https://www.emailjs.com/
 * Get your service ID, template ID, and public key
 * Add to .env as VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
 */
const submitToEmailJS = async (formData, config) => {
  const { serviceId, templateId, publicKey } = config;
  
  // EmailJS expects specific format
  const emailJSData = {
    from_name: formData.name,
    from_email: formData.email,
    company: formData.company || 'N/A',
    project_type: formData.projectType,
    message: formData.message,
    to_email: 'contact@neuroforgetechnologies.net'
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: emailJSData
    })
  });

  if (!response.ok) {
    throw new Error('Failed to send email via EmailJS');
  }

  return { success: true, message: 'Email sent successfully' };
};

/**
 * Web3Forms Integration
 * Sign up at: https://web3forms.com/
 * Get your access key and add to .env as VITE_WEB3FORMS_ACCESS_KEY
 *
 * SECURITY NOTICE:
 * ================
 * The Web3Forms access key is intentionally PUBLIC and visible in client-side code.
 * This is the standard security model for client-side form services.
 *
 * Security is enforced by:
 * 1. Domain Whitelist (configured in Web3Forms dashboard)
 * 2. Rate Limiting (enforced by Web3Forms server-side)
 * 3. Spam Protection (honeypot, CSRF, input sanitization)
 *
 * REQUIRED: Configure domain whitelist in Web3Forms dashboard before production deployment.
 * See WEB3FORMS_SECURITY_SETUP.md for detailed configuration instructions.
 */
const submitToWeb3Forms = async (formData, accessKey) => {
  const web3FormsData = {
    access_key: accessKey,
    name: formData.name,
    email: formData.email,
    company: formData.company || '',
    project_type: formData.projectType,
    message: formData.message,
    subject: `New Contact Form Submission - ${formData.projectType}`,
    from_name: 'NeuroForge Technologies Website'
  };

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(web3FormsData)
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Failed to submit form');
  }

  return result;
};

/**
 * Custom Serverless Function
 * For Vercel, Netlify, or custom backend
 */
const submitToCustomEndpoint = async (formData, endpoint) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to submit form' }));
    throw new Error(error.message || 'Failed to submit form');
  }

  return await response.json();
};

/**
 * Mock submission for development/testing
 */
const submitMock = async (formData) => {
  console.log('Mock form submission:', formData);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate random success/failure for testing
  const shouldSucceed = Math.random() > 0.1; // 90% success rate
  
  if (!shouldSucceed) {
    throw new Error('Mock submission failed (random test failure)');
  }
  
  return {
    success: true,
    message: 'Mock submission successful',
    data: formData
  };
};

/**
 * Main form submission handler
 * Automatically detects and uses the configured service
 */
export const submitContactForm = async (formData) => {
  // Get configuration from environment variables
  const serviceType = import.meta.env.VITE_FORM_SERVICE_TYPE || FormServiceType.MOCK;
  
  try {
    let result;
    
    switch (serviceType) {
      case FormServiceType.FORMSPREE: {
        const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;
        if (!formId) {
          throw new Error('Formspree form ID not configured');
        }
        result = await submitToFormspree(formData, formId);
        break;
      }
      
      case FormServiceType.EMAILJS: {
        const config = {
          serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
          templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        };
        
        if (!config.serviceId || !config.templateId || !config.publicKey) {
          throw new Error('EmailJS configuration incomplete');
        }
        
        result = await submitToEmailJS(formData, config);
        break;
      }
      
      case FormServiceType.WEB3FORMS: {
        // Web3Forms access key is intentionally public (client-side usage)
        // Security is provided by domain whitelist in Web3Forms dashboard
        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
          throw new Error('Web3Forms access key not configured');
        }
        result = await submitToWeb3Forms(formData, accessKey);
        break;
      }
      
      case FormServiceType.CUSTOM: {
        const endpoint = import.meta.env.VITE_CUSTOM_FORM_ENDPOINT;
        if (!endpoint) {
          throw new Error('Custom form endpoint not configured');
        }
        result = await submitToCustomEndpoint(formData, endpoint);
        break;
      }
      
      case FormServiceType.MOCK:
      default:
        result = await submitMock(formData);
        break;
    }
    
    return {
      success: true,
      data: result
    };
    
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    };
  }
};

/**
 * Validate form service configuration
 * Returns configuration status and any missing requirements
 */
export const validateFormServiceConfig = () => {
  const serviceType = import.meta.env.VITE_FORM_SERVICE_TYPE || FormServiceType.MOCK;
  const status = {
    serviceType,
    configured: false,
    missing: []
  };
  
  switch (serviceType) {
    case FormServiceType.FORMSPREE:
      if (!import.meta.env.VITE_FORMSPREE_FORM_ID) {
        status.missing.push('VITE_FORMSPREE_FORM_ID');
      } else {
        status.configured = true;
      }
      break;
      
    case FormServiceType.EMAILJS:
      if (!import.meta.env.VITE_EMAILJS_SERVICE_ID) status.missing.push('VITE_EMAILJS_SERVICE_ID');
      if (!import.meta.env.VITE_EMAILJS_TEMPLATE_ID) status.missing.push('VITE_EMAILJS_TEMPLATE_ID');
      if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY) status.missing.push('VITE_EMAILJS_PUBLIC_KEY');
      status.configured = status.missing.length === 0;
      break;
      
    case FormServiceType.WEB3FORMS:
      if (!import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
        status.missing.push('VITE_WEB3FORMS_ACCESS_KEY');
      } else {
        status.configured = true;
      }
      break;
      
    case FormServiceType.CUSTOM:
      if (!import.meta.env.VITE_CUSTOM_FORM_ENDPOINT) {
        status.missing.push('VITE_CUSTOM_FORM_ENDPOINT');
      } else {
        status.configured = true;
      }
      break;
      
    case FormServiceType.MOCK:
      status.configured = true;
      break;
  }
  
  return status;
};

export default {
  submitContactForm,
  validateFormServiceConfig,
  FormServiceType
};