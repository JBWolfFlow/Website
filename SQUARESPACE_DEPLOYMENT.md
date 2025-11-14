# Squarespace Deployment Guide

Complete guide for deploying your NeuroForge Technologies website to Squarespace.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Build Process](#build-process)
3. [Squarespace Setup](#squarespace-setup)
4. [File Upload](#file-upload)
5. [Security Configuration](#security-configuration)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance](#maintenance)

---

## Prerequisites

### Required Tools
- Node.js (v18 or higher)
- npm or yarn package manager
- FTP/SFTP client (FileZilla, Cyberduck, or similar)
- Text editor for configuration

### Required Access
- Squarespace account with Business plan or higher
- FTP/SFTP credentials from Squarespace
- Web3Forms account with configured access key

### Required Files
- `.env` file with production configuration
- All source code files
- Team member photos in `public/team/`
- Project images in `public/projects/`

---

## Build Process

### Step 1: Configure Environment Variables

1. **Update `.env` file** with production values:

```bash
# Form Service Configuration
VITE_FORM_SERVICE_TYPE=web3forms
VITE_WEB3FORMS_ACCESS_KEY=your-actual-access-key-here

# Site Configuration
VITE_SITE_URL=https://neuroforgetechnologies.net
VITE_SITE_NAME=NeuroForge Technologies
VITE_CONTACT_EMAIL=contact@neuroforgetechnologies.net

# Production Settings
VITE_ENVIRONMENT=production
VITE_DEV_MODE=false
VITE_DEBUG=false

# Security Features
VITE_ENABLE_CSRF=true
VITE_ENABLE_RATE_LIMITING=true
```

2. **Verify all required environment variables are set**:
   - Run: `npm run build` (will fail if required vars are missing)

### Step 2: Build for Production

1. **Clean previous builds**:
```bash
rm -rf dist
```

2. **Run production build**:
```bash
npm run build
```

3. **Verify build output**:
   - Check `dist/` directory was created
   - Verify `dist/index.html` exists
   - Check `dist/assets/` contains JS and CSS files
   - Confirm all images are in `dist/` subdirectories

4. **Test build locally** (optional but recommended):
```bash
npm run preview
```
   - Opens at `http://localhost:4173`
   - Test all pages and functionality
   - Verify contact form works
   - Check all images load correctly

---

## Squarespace Setup

### Step 1: Enable Developer Mode

1. Log into your Squarespace account
2. Go to **Settings** → **Advanced** → **Developer Mode**
3. Enable Developer Mode (requires Business plan or higher)
4. Note your SFTP credentials:
   - Host: `your-site.squarespace.com`
   - Port: `22`
   - Username: provided by Squarespace
   - Password: provided by Squarespace

### Step 2: Access SFTP

1. **Using FileZilla** (recommended):
   - Host: `sftp://your-site.squarespace.com`
   - Username: your SFTP username
   - Password: your SFTP password
   - Port: `22`

2. **Using Cyberduck**:
   - Protocol: SFTP
   - Server: `your-site.squarespace.com`
   - Port: `22`
   - Username/Password: from Squarespace

3. **Using Command Line**:
```bash
sftp username@your-site.squarespace.com
```

### Step 3: Prepare Squarespace Directory

1. Connect via SFTP
2. Navigate to the root directory
3. Create a backup of existing files (if any)
4. Clear the directory or create a new subdirectory for your site

---

## File Upload

### Step 1: Upload Build Files

**Upload the entire `dist/` directory contents to Squarespace:**

1. **Upload `index.html`** to root directory
2. **Upload `assets/` folder** with all JS/CSS files
3. **Upload `public/` folder** with all images and static files
4. **Upload additional files**:
   - `robots.txt`
   - `sitemap.xml`
   - `manifest.json`
   - `.htaccess` (if supported)

### Step 2: Verify File Structure

Your Squarespace directory should look like:

```
/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other bundled files]
├── team/
│   ├── adam-arias.jpg
│   ├── ethan-hoover.jpg
│   └── jacob-gonsalves.jpg
├── projects/
│   ├── dcop-home.png
│   ├── dcop-analytics.png
│   └── [other project images]
├── logo.svg
├── robots.txt
├── sitemap.xml
└── manifest.json
```

### Step 3: Set File Permissions

Ensure proper permissions (usually handled automatically by Squarespace):
- HTML files: `644`
- JS/CSS files: `644`
- Images: `644`
- Directories: `755`

---

## Security Configuration

### Step 1: Configure Web3Forms Domain Restrictions

**CRITICAL: This must be done BEFORE going live**

1. Log into [Web3Forms Dashboard](https://web3forms.com/dashboard)
2. Select your form
3. Go to **Settings** → **Security**
4. Configure **Domain Whitelist**:
   - Add: `neuroforgetechnologies.net`
   - Add: `www.neuroforgetechnologies.net`
   - **DO NOT** add wildcards or development domains
5. Enable **Rate Limiting**:
   - Recommended: 10 submissions per hour per IP
   - Adjust based on expected traffic
6. Enable **Email Notifications**:
   - Add your email to receive submission alerts
   - Helps detect abuse or spam
7. **Save changes**

### Step 2: Add Security Headers via Code Injection

Squarespace allows adding custom code via **Settings** → **Advanced** → **Code Injection**.

**Add to Header Code Injection:**

```html
<!-- Security Headers -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
<meta name="referrer" content="strict-origin-when-cross-origin">

<!-- Content Security Policy -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.web3forms.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.web3forms.com;
  frame-ancestors 'self';
  base-uri 'self';
  form-action 'self' https://api.web3forms.com;
">

<!-- Preconnect to Web3Forms for better performance -->
<link rel="preconnect" href="https://api.web3forms.com">
<link rel="dns-prefetch" href="https://api.web3forms.com">
```

**Add to Footer Code Injection:**

```html
<!-- Performance Monitoring -->
<script>
  // Log page load time
  window.addEventListener('load', function() {
    if (window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log('Page load time:', pageLoadTime + 'ms');
    }
  });
</script>
```

### Step 3: Configure SSL/HTTPS

1. Go to **Settings** → **Advanced** → **SSL**
2. Ensure SSL is enabled (should be automatic on Squarespace)
3. Enable **HSTS (HTTP Strict Transport Security)**
4. Force HTTPS for all pages

### Step 4: Set Up Custom Domain

1. Go to **Settings** → **Domains**
2. Add your custom domain: `neuroforgetechnologies.net`
3. Configure DNS settings as instructed by Squarespace
4. Wait for DNS propagation (can take 24-48 hours)
5. Verify SSL certificate is issued for custom domain

---

## Testing

### Pre-Launch Checklist

**Functionality Testing:**
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Hero section displays properly
- [ ] About section shows team information
- [ ] Services section displays all services
- [ ] Portfolio section shows projects with images
- [ ] Contact form displays correctly
- [ ] Footer links work

**Contact Form Testing:**
- [ ] Form fields accept input
- [ ] Validation works (required fields, email format)
- [ ] Honeypot field is hidden
- [ ] CSRF token is generated
- [ ] Rate limiting works (try multiple submissions)
- [ ] Form submits successfully
- [ ] Success message displays
- [ ] Email is received at configured address
- [ ] Form resets after successful submission

**Security Testing:**
- [ ] HTTPS is enforced
- [ ] Security headers are present (check browser dev tools)
- [ ] Web3Forms domain whitelist blocks unauthorized domains
- [ ] Rate limiting prevents spam
- [ ] XSS protection is active
- [ ] No console errors in production

**Performance Testing:**
- [ ] Page loads in under 3 seconds
- [ ] Images are optimized and load quickly
- [ ] No render-blocking resources
- [ ] Lighthouse score > 90 for Performance
- [ ] Mobile performance is acceptable

**Cross-Browser Testing:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Responsive Testing:**
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile (414x896)

### Testing Tools

1. **Browser DevTools**:
   - Check Console for errors
   - Verify Network requests
   - Test responsive design
   - Check Security headers

2. **Online Tools**:
   - [Google PageSpeed Insights](https://pagespeed.web.dev/)
   - [GTmetrix](https://gtmetrix.com/)
   - [SSL Labs](https://www.ssllabs.com/ssltest/)
   - [Security Headers](https://securityheaders.com/)

3. **Form Testing**:
   - Submit test form from production domain
   - Try submitting from different domain (should fail)
   - Test rate limiting with multiple submissions
   - Verify email delivery

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Files Not Uploading

**Symptoms**: SFTP connection fails or files won't upload

**Solutions**:
1. Verify SFTP credentials are correct
2. Check Squarespace Developer Mode is enabled
3. Try different SFTP client
4. Check file permissions
5. Contact Squarespace support

#### Issue: Contact Form Not Working

**Symptoms**: Form submits but no email received

**Solutions**:
1. Check Web3Forms dashboard for submission logs
2. Verify `VITE_WEB3FORMS_ACCESS_KEY` is correct
3. Check domain whitelist includes your domain
4. Verify email address in Web3Forms settings
5. Check spam folder
6. Test with different email address

#### Issue: Domain Whitelist Blocking Submissions

**Symptoms**: Form works locally but not on production

**Solutions**:
1. Add production domain to Web3Forms whitelist
2. Include both `domain.com` and `www.domain.com`
3. Wait 5 minutes for changes to propagate
4. Clear browser cache and test again

#### Issue: Images Not Loading

**Symptoms**: Broken image icons or 404 errors

**Solutions**:
1. Verify images were uploaded to correct directories
2. Check file paths in code match uploaded structure
3. Ensure image filenames match exactly (case-sensitive)
4. Check file permissions (should be 644)
5. Verify images are in correct format (jpg, png, svg)

#### Issue: CSS/JS Not Loading

**Symptoms**: Unstyled page or JavaScript errors

**Solutions**:
1. Verify `assets/` folder was uploaded
2. Check `index.html` references correct asset paths
3. Clear browser cache
4. Check browser console for 404 errors
5. Verify file permissions

#### Issue: Slow Page Load

**Symptoms**: Page takes > 5 seconds to load

**Solutions**:
1. Optimize images (compress, resize)
2. Enable Squarespace CDN
3. Minimize JavaScript bundle size
4. Use lazy loading for images
5. Check Squarespace server status

#### Issue: Security Headers Not Applied

**Symptoms**: Security headers missing in browser dev tools

**Solutions**:
1. Verify Code Injection was saved in Squarespace
2. Clear browser cache
3. Check if Squarespace overrides certain headers
4. Use `.htaccess` if supported
5. Contact Squarespace support for header configuration

---

## Maintenance

### Regular Tasks

**Daily:**
- Monitor Web3Forms submission logs
- Check for spam or abuse
- Verify site is accessible

**Weekly:**
- Review form submissions
- Check error logs
- Test contact form
- Verify SSL certificate is valid

**Monthly:**
- Update dependencies (`npm update`)
- Rebuild and redeploy if updates available
- Review security headers
- Check performance metrics
- Backup site files

**Quarterly:**
- Rotate Web3Forms access key (optional)
- Review and update content
- Test all functionality
- Update team photos/projects
- Review analytics

### Updating Content

**To update team members:**
1. Add/replace photos in `public/team/`
2. Update `src/data/team.js`
3. Rebuild: `npm run build`
4. Upload new `dist/` files via SFTP

**To update projects:**
1. Add/replace images in `public/projects/`
2. Update `src/data/projects.js`
3. Rebuild: `npm run build`
4. Upload new `dist/` files via SFTP

**To update contact information:**
1. Update `.env` file
2. Update `src/components/sections/Contact.jsx` if needed
3. Rebuild: `npm run build`
4. Upload new `dist/` files via SFTP

### Backup Strategy

**What to backup:**
- Source code (keep in Git repository)
- `.env` file (store securely, NOT in Git)
- Production `dist/` files
- Squarespace SFTP credentials
- Web3Forms access key

**Where to backup:**
- Git repository (source code only)
- Secure password manager (credentials)
- Encrypted cloud storage (sensitive files)
- Local encrypted drive (full backup)

**Backup frequency:**
- Source code: Every commit (Git)
- Production files: After each deployment
- Credentials: When changed
- Full backup: Monthly

---

## Security Best Practices

### Ongoing Security

1. **Monitor Form Submissions**:
   - Check Web3Forms logs daily
   - Look for suspicious patterns
   - Block abusive IPs if needed

2. **Keep Dependencies Updated**:
   - Run `npm audit` monthly
   - Update packages with security fixes
   - Test after updates

3. **Review Access**:
   - Limit who has SFTP access
   - Use strong passwords
   - Enable 2FA on Squarespace account

4. **Monitor Performance**:
   - Use Google Analytics
   - Track page load times
   - Monitor error rates

5. **Regular Security Audits**:
   - Run security header checks
   - Test SSL configuration
   - Verify CSP is working
   - Check for XSS vulnerabilities

### Incident Response

**If Web3Forms key is compromised:**
1. Generate new access key in Web3Forms dashboard
2. Update `.env` file
3. Rebuild and redeploy immediately
4. Monitor for unauthorized submissions
5. Review and strengthen domain whitelist

**If site is hacked:**
1. Take site offline immediately
2. Contact Squarespace support
3. Review SFTP access logs
4. Change all passwords
5. Restore from clean backup
6. Conduct security audit
7. Implement additional security measures

---

## Support Resources

### Documentation
- [Squarespace Developer Platform](https://developers.squarespace.com/)
- [Web3Forms Documentation](https://docs.web3forms.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

### Support Contacts
- **Squarespace Support**: support@squarespace.com
- **Web3Forms Support**: support@web3forms.com
- **Technical Issues**: contact@neuroforgetechnologies.net

### Useful Links
- [Squarespace Status](https://status.squarespace.com/)
- [Web3Forms Status](https://status.web3forms.com/)
- [SSL Test](https://www.ssllabs.com/ssltest/)
- [Security Headers Test](https://securityheaders.com/)

---

## Deployment Checklist

Use this checklist for each deployment:

### Pre-Deployment
- [ ] Update `.env` with production values
- [ ] Run `npm run build` successfully
- [ ] Test build locally with `npm run preview`
- [ ] Verify all images are included
- [ ] Check all links work
- [ ] Test contact form locally

### Deployment
- [ ] Connect to Squarespace via SFTP
- [ ] Backup existing files (if any)
- [ ] Upload all `dist/` files
- [ ] Verify file structure is correct
- [ ] Set proper file permissions

### Post-Deployment
- [ ] Test site loads at production URL
- [ ] Verify HTTPS is working
- [ ] Test all navigation links
- [ ] Submit test contact form
- [ ] Verify email is received
- [ ] Check security headers
- [ ] Run Lighthouse audit
- [ ] Test on mobile devices
- [ ] Monitor for 24 hours

### Web3Forms Configuration
- [ ] Domain whitelist configured
- [ ] Rate limiting enabled
- [ ] Email notifications set up
- [ ] Test submission from production domain
- [ ] Verify submissions blocked from other domains

---

## Conclusion

Following this guide ensures a secure, performant deployment of your NeuroForge Technologies website to Squarespace. Remember:

1. **Security is paramount** - Always configure Web3Forms domain restrictions
2. **Test thoroughly** - Use the testing checklist before going live
3. **Monitor regularly** - Check logs and performance metrics
4. **Keep updated** - Maintain dependencies and content
5. **Backup everything** - Protect your work with regular backups

For additional help, refer to the [WEB3FORMS_SECURITY_SETUP.md](./WEB3FORMS_SECURITY_SETUP.md) guide for detailed security configuration.

---

**Last Updated**: 2025-01-14  
**Version**: 1.0.0  
**Maintained By**: NeuroForge Technologies