# Web3Forms Security Setup Guide

Complete guide for securing your Web3Forms integration and understanding the client-side API key security model.

## Table of Contents

1. [Understanding Web3Forms Security](#understanding-web3forms-security)
2. [Why API Keys Are Public](#why-api-keys-are-public)
3. [Initial Setup](#initial-setup)
4. [Domain Restrictions](#domain-restrictions)
5. [Rate Limiting](#rate-limiting)
6. [Spam Protection](#spam-protection)
7. [Monitoring & Alerts](#monitoring--alerts)
8. [Testing Security](#testing-security)
9. [Incident Response](#incident-response)
10. [Best Practices](#best-practices)

---

## Understanding Web3Forms Security

### The Client-Side Security Model

Web3Forms is designed for **client-side form submissions**, which means:

✅ **API keys are MEANT to be public**  
✅ **Security comes from domain restrictions, NOT key secrecy**  
✅ **This is industry-standard for client-side form services**  
✅ **Similar to Google reCAPTCHA, Stripe public keys, etc.**

### How Security Works

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Domain Whitelist (Primary Security)                      │
│     └─ Only authorized domains can submit                    │
│                                                               │
│  2. Rate Limiting (Abuse Prevention)                         │
│     └─ Limits submissions per IP/email                       │
│                                                               │
│  3. Honeypot Fields (Bot Detection)                          │
│     └─ Hidden fields catch automated bots                    │
│                                                               │
│  4. CSRF Tokens (Request Validation)                         │
│     └─ Validates legitimate form submissions                 │
│                                                               │
│  5. Input Sanitization (XSS Prevention)                      │
│     └─ Cleans malicious input before processing              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### What Attackers CANNOT Do

Even if someone copies your Web3Forms API key:

❌ **Cannot submit from unauthorized domains** (blocked by whitelist)  
❌ **Cannot bypass rate limits** (enforced server-side)  
❌ **Cannot access your email or data** (key only allows submissions)  
❌ **Cannot modify your form settings** (requires account login)  
❌ **Cannot see previous submissions** (requires dashboard access)

### What Attackers CAN Do (and how to prevent it)

⚠️ **Can attempt to submit spam** → Prevented by rate limiting  
⚠️ **Can try to overwhelm your inbox** → Prevented by rate limiting  
⚠️ **Can attempt bot submissions** → Prevented by honeypot fields  

---

## Why API Keys Are Public

### Industry Standard Practice

Many popular services use public API keys:

| Service | Public Key Type | Security Method |
|---------|----------------|-----------------|
| **Web3Forms** | Access Key | Domain Whitelist |
| **Google reCAPTCHA** | Site Key | Domain Whitelist |
| **Stripe** | Publishable Key | Domain Whitelist |
| **Firebase** | API Key | Domain Whitelist |
| **Mapbox** | Public Token | URL Restrictions |
| **Cloudflare Turnstile** | Site Key | Domain Whitelist |

### Why This Model Works

1. **Separation of Concerns**:
   - Public keys = Client-side operations (form display, submission)
   - Private keys = Server-side operations (data access, configuration)

2. **Scalability**:
   - No need for backend proxy
   - Direct API communication
   - Faster form submissions

3. **Simplicity**:
   - Easy to implement
   - No server required
   - Works with static sites

4. **Security**:
   - Domain restrictions prevent unauthorized use
   - Rate limiting prevents abuse
   - Server-side validation ensures data integrity

---

## Initial Setup

### Step 1: Create Web3Forms Account

1. Go to [https://web3forms.com](https://web3forms.com)
2. Click **"Get Started Free"**
3. Sign up with email or GitHub
4. Verify your email address
5. Complete account setup

### Step 2: Create Your Form

1. Log into Web3Forms dashboard
2. Click **"Create New Form"**
3. Configure form settings:
   - **Form Name**: "NeuroForge Technologies Contact Form"
   - **Email**: `contact@neuroforgetechnologies.net`
   - **Subject**: "New Contact Form Submission"
   - **Redirect URL**: Leave blank (handled by React)

4. Copy your **Access Key**
5. Save form settings

### Step 3: Add Access Key to Environment

1. Open your `.env` file
2. Add the access key:

```bash
VITE_FORM_SERVICE_TYPE=web3forms
VITE_WEB3FORMS_ACCESS_KEY=your-actual-access-key-here
```

3. **IMPORTANT**: Never commit `.env` to version control
4. Keep `.env` in `.gitignore`

---

## Domain Restrictions

### Why Domain Restrictions Are Critical

Domain restrictions are your **PRIMARY SECURITY MECHANISM**. Without them:
- Anyone can use your API key from any website
- You'll receive spam from unauthorized sources
- Your email quota may be exhausted

### Configuring Domain Whitelist

1. **Log into Web3Forms Dashboard**
2. **Select your form**
3. **Go to Settings → Security**
4. **Add Allowed Domains**:

```
Production Domain:
✅ neuroforgetechnologies.net
✅ www.neuroforgetechnologies.net

Development (Optional - Remove before launch):
⚠️ localhost:3000
⚠️ 127.0.0.1:3000

DO NOT ADD:
❌ *.neuroforgetechnologies.net (wildcards)
❌ http://neuroforgetechnologies.net (include protocol)
❌ neuroforgetechnologies.net/ (trailing slash)
```

5. **Save changes**
6. **Wait 5 minutes** for changes to propagate

### Domain Whitelist Best Practices

✅ **DO**:
- Add only production domains
- Include both `domain.com` and `www.domain.com`
- Remove development domains before launch
- Use exact domain matches
- Test after configuration

❌ **DON'T**:
- Use wildcards (`*.domain.com`)
- Include protocols (`https://`)
- Add trailing slashes
- Leave development domains in production
- Use IP addresses (use domains)

### Testing Domain Restrictions

**Test 1: Authorized Domain (Should Work)**
```bash
# From your production domain
curl -X POST https://api.web3forms.com/submit \
  -H "Content-Type: application/json" \
  -H "Origin: https://neuroforgetechnologies.net" \
  -d '{
    "access_key": "your-key",
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

**Expected Response**: `{"success": true}`

**Test 2: Unauthorized Domain (Should Fail)**
```bash
# From different domain
curl -X POST https://api.web3forms.com/submit \
  -H "Content-Type: application/json" \
  -H "Origin: https://unauthorized-domain.com" \
  -d '{
    "access_key": "your-key",
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

**Expected Response**: `{"success": false, "message": "Domain not allowed"}`

---

## Rate Limiting

### Why Rate Limiting Matters

Rate limiting prevents:
- Spam attacks
- Email quota exhaustion
- Service abuse
- DDoS attempts
- Bot submissions

### Configuring Rate Limits

1. **Log into Web3Forms Dashboard**
2. **Select your form**
3. **Go to Settings → Rate Limiting**
4. **Configure limits**:

```
Recommended Settings:

Per IP Address:
✅ 10 submissions per hour
✅ 50 submissions per day

Per Email Address:
✅ 3 submissions per hour
✅ 10 submissions per day

Global:
✅ 100 submissions per hour
✅ 500 submissions per day
```

5. **Enable rate limit notifications**
6. **Save changes**

### Rate Limit Strategies

**Conservative (High Security)**:
```
Per IP: 5/hour, 20/day
Per Email: 2/hour, 5/day
Global: 50/hour, 200/day
```
- Best for: Low-traffic sites
- Pros: Maximum protection
- Cons: May block legitimate users

**Balanced (Recommended)**:
```
Per IP: 10/hour, 50/day
Per Email: 3/hour, 10/day
Global: 100/hour, 500/day
```
- Best for: Most websites
- Pros: Good balance of security and usability
- Cons: None

**Permissive (High Traffic)**:
```
Per IP: 20/hour, 100/day
Per Email: 5/hour, 20/day
Global: 200/hour, 1000/day
```
- Best for: High-traffic sites
- Pros: Accommodates legitimate high usage
- Cons: More vulnerable to spam

### Client-Side Rate Limiting

Your application also implements client-side rate limiting:

```javascript
// From src/utils/security.js
export const checkRateLimit = (identifier, maxAttempts = 3, windowMs = 60000) => {
  // Tracks submissions per email
  // Prevents rapid-fire submissions
  // Provides user feedback
};
```

**How it works**:
1. Tracks submissions by email address
2. Stores in browser localStorage
3. Limits to 3 submissions per minute
4. Shows countdown timer when limit reached
5. Resets after time window expires

---

## Spam Protection

### Multi-Layer Spam Prevention

Your form implements multiple spam protection layers:

#### 1. Honeypot Fields

**What it is**: Hidden field that bots fill but humans don't see

**Implementation**:
```jsx
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
```

**How it works**:
- Hidden from human users
- Visible to bots (in HTML)
- If filled, submission is silently rejected
- No error shown to bot (prevents detection)

#### 2. Timing Analysis

**What it is**: Detects suspiciously fast form submissions

**Implementation**:
```javascript
const formLoadTime = useRef(Date.now());

// Check if submitted too quickly
if (isSuspiciouslyFast(formLoadTime.current, Date.now(), 3000)) {
  setErrors({ message: 'Please take your time to fill out the form properly.' });
  return;
}
```

**How it works**:
- Records when form loads
- Requires minimum 3 seconds before submission
- Prevents automated bot submissions
- Allows legitimate fast typers

#### 3. CSRF Tokens

**What it is**: Unique token per form session

**Implementation**:
```javascript
const [csrfToken] = useState(() => generateCSRFToken());

// Include in submission
const sanitizedData = {
  ...formData,
  csrfToken: csrfToken,
  timestamp: new Date().toISOString()
};
```

**How it works**:
- Generated when form loads
- Included in submission
- Validates request authenticity
- Prevents cross-site request forgery

#### 4. Input Sanitization

**What it is**: Cleans malicious input

**Implementation**:
```javascript
import { sanitizeInput } from '../../utils/security';

const handleChange = (e) => {
  const sanitizedValue = sanitizeInput(e.target.value);
  setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
};
```

**How it works**:
- Removes HTML tags
- Escapes special characters
- Prevents XSS attacks
- Validates input format

### Web3Forms Built-in Protection

Web3Forms also provides:

✅ **Spam Filter**: Machine learning-based spam detection  
✅ **Blacklist**: Known spam email addresses blocked  
✅ **Content Analysis**: Suspicious content flagged  
✅ **Duplicate Detection**: Identical submissions blocked  

---

## Monitoring & Alerts

### Email Notifications

**Configure in Web3Forms Dashboard**:

1. **Go to Settings → Notifications**
2. **Enable notifications for**:
   - New submissions
   - Rate limit exceeded
   - Spam detected
   - Domain violation attempts
   - Daily summary

3. **Add notification emails**:
   - Primary: `contact@neuroforgetechnologies.net`
   - Secondary: Your personal email
   - Team: Additional team members

### Submission Logs

**Access logs in Web3Forms Dashboard**:

1. **Go to Submissions**
2. **View recent submissions**:
   - Timestamp
   - Sender email
   - IP address
   - Status (success/blocked)
   - Reason (if blocked)

3. **Filter by**:
   - Date range
   - Status
   - Email address
   - IP address

### Monitoring Checklist

**Daily**:
- [ ] Check for new submissions
- [ ] Review spam attempts
- [ ] Verify rate limits working
- [ ] Check for unusual patterns

**Weekly**:
- [ ] Review submission trends
- [ ] Analyze spam patterns
- [ ] Adjust rate limits if needed
- [ ] Update blacklist if needed

**Monthly**:
- [ ] Review security settings
- [ ] Analyze submission statistics
- [ ] Update documentation
- [ ] Test all security features

---

## Testing Security

### Pre-Launch Security Tests

**Test 1: Domain Whitelist**
```bash
# Should succeed from production domain
curl -X POST https://api.web3forms.com/submit \
  -H "Origin: https://neuroforgetechnologies.net" \
  -d "access_key=your-key&name=Test&email=test@example.com&message=Test"

# Should fail from unauthorized domain
curl -X POST https://api.web3forms.com/submit \
  -H "Origin: https://evil-site.com" \
  -d "access_key=your-key&name=Test&email=test@example.com&message=Test"
```

**Test 2: Rate Limiting**
```bash
# Submit multiple times rapidly
for i in {1..15}; do
  curl -X POST https://api.web3forms.com/submit \
    -H "Origin: https://neuroforgetechnologies.net" \
    -d "access_key=your-key&name=Test$i&email=test@example.com&message=Test$i"
  sleep 1
done

# Should see rate limit errors after configured threshold
```

**Test 3: Honeypot**
```bash
# Submit with honeypot field filled (should be silently rejected)
curl -X POST https://api.web3forms.com/submit \
  -H "Origin: https://neuroforgetechnologies.net" \
  -d "access_key=your-key&name=Test&email=test@example.com&message=Test&website=http://spam.com"
```

**Test 4: Input Sanitization**
```javascript
// Try submitting XSS payload
const xssPayload = '<script>alert("XSS")</script>';
// Should be sanitized to: &lt;script&gt;alert("XSS")&lt;/script&gt;
```

### Browser Testing

**Test in Browser DevTools**:

1. **Open DevTools** (F12)
2. **Go to Network tab**
3. **Submit form**
4. **Check request**:
   - Verify Origin header
   - Check CSRF token
   - Verify sanitized input
   - Confirm rate limiting

5. **Check response**:
   - Success/failure status
   - Error messages
   - Rate limit headers

### Security Audit Checklist

- [ ] Domain whitelist configured
- [ ] Rate limiting enabled
- [ ] Honeypot field hidden
- [ ] CSRF tokens generated
- [ ] Input sanitization working
- [ ] Timing analysis active
- [ ] Email notifications configured
- [ ] Spam filter enabled
- [ ] SSL/HTTPS enforced
- [ ] Security headers present

---

## Incident Response

### If API Key Is Exposed

**Immediate Actions** (within 1 hour):

1. **Assess the situation**:
   - Where was key exposed?
   - For how long?
   - Who has access?

2. **Check Web3Forms logs**:
   - Any unauthorized submissions?
   - Unusual traffic patterns?
   - Spam attempts?

3. **Verify domain whitelist**:
   - Is it properly configured?
   - Are unauthorized domains blocked?

4. **Monitor submissions**:
   - Watch for next 24 hours
   - Check for abuse

**If Abuse Detected**:

1. **Generate new access key**:
   - Go to Web3Forms dashboard
   - Settings → API Keys
   - Generate new key
   - Copy new key

2. **Update application**:
   - Update `.env` file
   - Rebuild application
   - Deploy immediately

3. **Revoke old key**:
   - Delete old key in dashboard
   - Verify old key no longer works

4. **Strengthen security**:
   - Review domain whitelist
   - Tighten rate limits
   - Enable additional spam filters

### If Spam Attack Occurs

**Immediate Actions**:

1. **Reduce rate limits**:
   - Lower per-IP limit
   - Lower per-email limit
   - Enable stricter filtering

2. **Block spam sources**:
   - Add IPs to blacklist
   - Add email patterns to blacklist
   - Enable aggressive spam filter

3. **Enable CAPTCHA** (if available):
   - Add reCAPTCHA to form
   - Require verification for submissions

4. **Monitor closely**:
   - Check logs every hour
   - Watch for new patterns
   - Adjust filters as needed

### Recovery Procedures

**After incident resolved**:

1. **Document incident**:
   - What happened
   - How it was detected
   - Actions taken
   - Lessons learned

2. **Update security**:
   - Implement additional measures
   - Update documentation
   - Train team members

3. **Review and test**:
   - Test all security features
   - Verify fixes work
   - Monitor for recurrence

---

## Best Practices

### Security Checklist

**Configuration**:
- ✅ Domain whitelist configured with exact domains
- ✅ Rate limiting enabled with appropriate limits
- ✅ Email notifications configured
- ✅ Spam protection enabled
- ✅ SSL/HTTPS enforced

**Code**:
- ✅ Honeypot field implemented
- ✅ CSRF tokens generated
- ✅ Input sanitization active
- ✅ Timing analysis enabled
- ✅ Client-side rate limiting

**Monitoring**:
- ✅ Daily log review
- ✅ Weekly trend analysis
- ✅ Monthly security audit
- ✅ Incident response plan
- ✅ Team training completed

### Do's and Don'ts

**DO**:
✅ Configure domain whitelist before launch  
✅ Enable rate limiting  
✅ Monitor submission logs regularly  
✅ Test security features  
✅ Keep documentation updated  
✅ Train team on security  
✅ Have incident response plan  

**DON'T**:
❌ Worry about API key being public  
❌ Try to hide the key (it's meant to be visible)  
❌ Use wildcards in domain whitelist  
❌ Disable rate limiting  
❌ Ignore spam attempts  
❌ Skip security testing  
❌ Forget to monitor logs  

### Regular Maintenance

**Daily**:
- Check submission logs
- Review spam attempts
- Verify form is working

**Weekly**:
- Analyze submission trends
- Review rate limit effectiveness
- Check for security issues

**Monthly**:
- Full security audit
- Update rate limits if needed
- Review and update documentation
- Test all security features

**Quarterly**:
- Consider rotating API key
- Review and update security policies
- Train team on new threats
- Update incident response plan

---

## Additional Resources

### Documentation
- [Web3Forms Official Docs](https://docs.web3forms.com/)
- [Web3Forms Security Guide](https://docs.web3forms.com/security)
- [Web3Forms API Reference](https://docs.web3forms.com/api)

### Tools
- [Web3Forms Dashboard](https://web3forms.com/dashboard)
- [Web3Forms Status](https://status.web3forms.com/)
- [Security Headers Test](https://securityheaders.com/)

### Support
- **Web3Forms Support**: support@web3forms.com
- **Documentation**: https://docs.web3forms.com/
- **Community**: https://github.com/web3forms/web3forms

---

## Summary

### Key Takeaways

1. **API keys are meant to be public** - This is normal and expected
2. **Security comes from domain restrictions** - Not key secrecy
3. **Multiple layers of protection** - Defense in depth approach
4. **Regular monitoring is essential** - Stay vigilant
5. **Testing is critical** - Verify security before launch

### Security Hierarchy

```
1. Domain Whitelist (CRITICAL)
   └─ Primary security mechanism
   
2. Rate Limiting (IMPORTANT)
   └─ Prevents abuse and spam
   
3. Spam Protection (IMPORTANT)
   └─ Honeypot, timing, CSRF
   
4. Monitoring (ESSENTIAL)
   └─ Detect and respond to issues
   
5. Incident Response (PREPARED)
   └─ Ready to handle problems
```

### Final Checklist

Before going live:
- [ ] Domain whitelist configured
- [ ] Rate limiting enabled
- [ ] All security features tested
- [ ] Monitoring configured
- [ ] Team trained
- [ ] Documentation complete
- [ ] Incident response plan ready

---

**Last Updated**: 2025-01-14  
**Version**: 1.0.0  
**Maintained By**: NeuroForge Technologies

For deployment instructions, see [SQUARESPACE_DEPLOYMENT.md](./SQUARESPACE_DEPLOYMENT.md)