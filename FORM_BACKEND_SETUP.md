# Form Backend Setup Guide

## Overview

The contact form supports multiple backend services for email delivery. Choose the option that best fits your needs and budget.

## 🎯 Quick Start

1. Choose a form service (see options below)
2. Sign up and get your credentials
3. Add credentials to `.env` file
4. Test the form

## 📋 Supported Services

### 1. **Formspree** (Recommended for Beginners)
**Best for:** Simple setup, no coding required  
**Pricing:** Free tier available (50 submissions/month)  
**Website:** https://formspree.io/

#### Setup Steps:
1. Sign up at https://formspree.io/
2. Create a new form
3. Copy your Form ID (looks like: `abc123xyz`)
4. Add to `.env`:
```env
VITE_FORM_SERVICE_TYPE=formspree
VITE_FORMSPREE_FORM_ID=your-form-id-here
```

#### Features:
- ✅ Spam protection included
- ✅ Email notifications
- ✅ File uploads support
- ✅ Submission dashboard
- ✅ Export submissions

---

### 2. **EmailJS** (Recommended for Customization)
**Best for:** Custom email templates, multiple recipients  
**Pricing:** Free tier available (200 emails/month)  
**Website:** https://www.emailjs.com/

#### Setup Steps:
1. Sign up at https://www.emailjs.com/
2. Add an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add to `.env`:
```env
VITE_FORM_SERVICE_TYPE=emailjs
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

#### Email Template Variables:
Use these in your EmailJS template:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{company}}` - Company name
- `{{project_type}}` - Selected project type
- `{{message}}` - Message content
- `{{to_email}}` - Your email (contact@neuroforgetechnologies.net)

#### Features:
- ✅ Custom email templates
- ✅ Multiple email services
- ✅ Auto-reply support
- ✅ Attachment support
- ✅ Template variables

---

### 3. **Web3Forms** (Recommended for Privacy)
**Best for:** Privacy-focused, no account dashboard  
**Pricing:** Free (unlimited submissions)  
**Website:** https://web3forms.com/

#### Setup Steps:
1. Visit https://web3forms.com/
2. Enter your email to get an access key
3. Verify your email
4. Add to `.env`:
```env
VITE_FORM_SERVICE_TYPE=web3forms
VITE_WEB3FORMS_ACCESS_KEY=your-access-key-here
```

#### Features:
- ✅ Completely free
- ✅ No signup required
- ✅ Spam protection
- ✅ File uploads
- ✅ Custom redirects
- ✅ Webhook support

---

### 4. **Custom Backend** (Recommended for Advanced Users)
**Best for:** Full control, custom logic, database storage  
**Pricing:** Depends on hosting  

#### Setup Steps:

##### Option A: Vercel Serverless Function

1. Create `api/contact.js` in your project root:
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, projectType, message } = req.body;

  // Add your email sending logic here
  // Example: SendGrid, AWS SES, Nodemailer, etc.

  try {
    // Send email logic
    await sendEmail({
      to: 'contact@neuroforgetechnologies.net',
      from: email,
      subject: `New Contact: ${projectType}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
}
```

2. Add to `.env`:
```env
VITE_FORM_SERVICE_TYPE=custom
VITE_CUSTOM_FORM_ENDPOINT=/api/contact
```

##### Option B: Netlify Function

1. Create `netlify/functions/contact.js`:
```javascript
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  // Add your email sending logic here

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
```

2. Add to `.env`:
```env
VITE_FORM_SERVICE_TYPE=custom
VITE_CUSTOM_FORM_ENDPOINT=/.netlify/functions/contact
```

---

### 5. **Mock Service** (Development Only)
**Best for:** Testing and development  
**Pricing:** Free (no actual emails sent)

#### Setup:
```env
VITE_FORM_SERVICE_TYPE=mock
```

This is the default setting. It simulates form submission without sending actual emails.

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in your project root (copy from `.env.example`):

```env
# Choose one service type
VITE_FORM_SERVICE_TYPE=mock

# Then add the credentials for your chosen service
# (see service-specific sections above)
```

### Service Type Options

| Value | Service | Best For |
|-------|---------|----------|
| `formspree` | Formspree | Beginners, quick setup |
| `emailjs` | EmailJS | Custom templates |
| `web3forms` | Web3Forms | Privacy, free unlimited |
| `custom` | Custom Backend | Full control |
| `mock` | Mock (Dev) | Testing |

---

## 🧪 Testing

### 1. Test with Mock Service

```env
VITE_FORM_SERVICE_TYPE=mock
```

- Fill out the form
- Check browser console for submission data
- Verify security features work (rate limiting, validation)

### 2. Test with Real Service

1. Configure your chosen service
2. Submit a test form
3. Check your email inbox
4. Verify all form fields are received correctly

### 3. Test Security Features

- **Honeypot**: Bots filling hidden field should be blocked
- **Rate Limiting**: Try submitting 4 times quickly (4th should fail)
- **Timing Analysis**: Submit immediately after page load (should fail)
- **Validation**: Try invalid email, short message, etc.
- **Sanitization**: Try entering HTML/scripts (should be stripped)

---

## 🔒 Security Considerations

### 1. Environment Variables

⚠️ **IMPORTANT**: All `VITE_` prefixed variables are PUBLIC and visible in client-side code.

- ✅ Safe to expose: Form service IDs, public keys
- ❌ Never expose: Private API keys, secrets, passwords

### 2. Rate Limiting

Current settings:
- Max attempts: 3 per email address
- Time window: 60 seconds
- Automatic reset after window

To modify, edit `src/components/sections/Contact.jsx`:
```javascript
const rateLimitCheck = checkRateLimit(formData.email, 3, 60000);
// checkRateLimit(identifier, maxAttempts, windowMs)
```

### 3. Spam Protection

Built-in protections:
- Honeypot field (hidden from users)
- CSRF token
- Timing analysis (min 3 seconds)
- Input sanitization
- Suspicious pattern detection
- Email validation

### 4. Domain Restrictions

Configure domain restrictions in your form service:
- **Formspree**: Settings → Security → Allowed Domains
- **EmailJS**: Account → Security → Allowed Domains
- **Web3Forms**: Automatic (based on access key)

---

## 📊 Monitoring & Analytics

### Formspree Dashboard
- View all submissions
- Export to CSV
- Set up webhooks
- Configure notifications

### EmailJS Dashboard
- Track email delivery
- View usage statistics
- Monitor errors
- Test templates

### Web3Forms
- No dashboard (privacy-focused)
- Emails sent directly
- Use email filters for organization

### Custom Backend
- Implement your own logging
- Use services like:
  - Sentry (error tracking)
  - LogRocket (session replay)
  - Google Analytics (events)

---

## 🐛 Troubleshooting

### Form Not Submitting

1. **Check console for errors**
   - Open browser DevTools (F12)
   - Look for red error messages

2. **Verify environment variables**
   ```javascript
   console.log('Service Type:', import.meta.env.VITE_FORM_SERVICE_TYPE);
   ```

3. **Check service configuration**
   - Verify credentials are correct
   - Check service status page
   - Ensure domain is whitelisted

### Emails Not Received

1. **Check spam folder**
2. **Verify email address in service settings**
3. **Check service dashboard for errors**
4. **Test with different email address**

### Rate Limiting Issues

1. **Clear browser localStorage**
   ```javascript
   localStorage.clear();
   ```

2. **Wait for rate limit window to expire (60 seconds)**

3. **Use different email address for testing**

### CORS Errors

1. **Verify service allows your domain**
2. **Check custom endpoint CORS configuration**
3. **Ensure HTTPS in production**

---

## 🚀 Production Checklist

Before going live:

- [ ] Choose and configure production form service
- [ ] Test form submission end-to-end
- [ ] Verify emails are received
- [ ] Test all validation rules
- [ ] Test security features (rate limiting, honeypot)
- [ ] Configure domain restrictions in service
- [ ] Set up email notifications
- [ ] Test on mobile devices
- [ ] Test with different browsers
- [ ] Monitor first few submissions
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Document support procedures

---

## 💰 Cost Comparison

| Service | Free Tier | Paid Plans | Best For |
|---------|-----------|------------|----------|
| Formspree | 50/month | $10/month (1000) | Small sites |
| EmailJS | 200/month | $7/month (1000) | Custom emails |
| Web3Forms | Unlimited | Free forever | Any size |
| Custom | Varies | Hosting costs | Enterprise |

---

## 📞 Support

### Service Support
- **Formspree**: support@formspree.io
- **EmailJS**: support@emailjs.com
- **Web3Forms**: support@web3forms.com

### Project Support
- Email: contact@neuroforgetechnologies.net
- Review: `SECURITY_IMPLEMENTATION.md` for security details

---

## 🔄 Migration Guide

### Switching Services

1. **Update `.env` file**
   ```env
   # Old
   VITE_FORM_SERVICE_TYPE=formspree
   VITE_FORMSPREE_FORM_ID=old-id
   
   # New
   VITE_FORM_SERVICE_TYPE=emailjs
   VITE_EMAILJS_SERVICE_ID=new-service
   VITE_EMAILJS_TEMPLATE_ID=new-template
   VITE_EMAILJS_PUBLIC_KEY=new-key
   ```

2. **Restart development server**
   ```bash
   npm run dev
   ```

3. **Test thoroughly**

4. **Update production environment variables**

---

## 📚 Additional Resources

- [Formspree Documentation](https://help.formspree.io/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Web3Forms Documentation](https://docs.web3forms.com/)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

---

**Last Updated**: January 27, 2025  
**Version**: 1.0.0