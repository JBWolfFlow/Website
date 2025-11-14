# J&H Digital Website - Deployment Guide

**Version:** 1.0.0  
**Last Updated:** 2024-01-24  
**Maintainer:** J&H Digital Development Team

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Build Process](#build-process)
5. [Deployment Options](#deployment-options)
   - [Vercel (Recommended)](#vercel-recommended)
   - [Netlify](#netlify)
   - [GitHub Pages](#github-pages)
   - [Traditional Hosting](#traditional-hosting)
6. [Post-Deployment Checklist](#post-deployment-checklist)
7. [Troubleshooting](#troubleshooting)
8. [Rollback Procedures](#rollback-procedures)

---

## Prerequisites

Before deploying the J&H Digital website, ensure you have the following installed and configured:

### Required Software

- **Node.js**: Version 18.x or higher
  ```bash
  node --version  # Should output v18.0.0 or higher
  ```

- **npm**: Version 9.x or higher (comes with Node.js)
  ```bash
  npm --version  # Should output 9.0.0 or higher
  ```

- **Git**: Latest version
  ```bash
  git --version
  ```

### Recommended Tools

- **VS Code** or your preferred code editor
- **Chrome DevTools** for testing
- **Lighthouse** for performance auditing

### Account Requirements

Depending on your chosen deployment platform:
- **Vercel Account** (recommended) - [Sign up](https://vercel.com/signup)
- **Netlify Account** - [Sign up](https://app.netlify.com/signup)
- **GitHub Account** - [Sign up](https://github.com/join)

---

## Local Development Setup

### 1. Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/jhdigital/website.git

# Or clone via SSH
git clone git@github.com:jhdigital/website.git

# Navigate to project directory
cd website
```

### 2. Install Dependencies

```bash
# Install all project dependencies
npm install

# This will install:
# - React 18.2+
# - Vite 5+
# - Tailwind CSS 3.4+
# - Framer Motion 11+
# - And all other dependencies listed in package.json
```

**Expected output:**
```
added 234 packages, and audited 235 packages in 15s
```

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual values
# See Environment Configuration section below
```

### 4. Start Development Server

```bash
# Start the development server
npm run dev

# The site will be available at:
# http://localhost:3000
```

**Expected output:**
```
VITE v5.0.0  ready in 234 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h to show help
```

### 5. Verify Installation

Open your browser and navigate to `http://localhost:3000`. You should see:
- ✅ Hero section loads
- ✅ Navigation works
- ✅ Smooth scrolling functions
- ✅ No console errors

---

## Environment Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Site Configuration
VITE_SITE_URL=https://jhdigital.com
VITE_SITE_NAME=J&H Digital
VITE_CONTACT_EMAIL=hello@jhdigital.com
VITE_CONTACT_PHONE=+1-555-0123

# Social Media
VITE_TWITTER_HANDLE=jhdigital
VITE_LINKEDIN_URL=https://linkedin.com/company/jhdigital
VITE_GITHUB_URL=https://github.com/jhdigital

# Analytics (Optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Form Handling (Optional)
VITE_FORM_ENDPOINT=https://formspree.io/f/your-form-id

# Feature Flags
VITE_ENABLE_ANIMATIONS=true
VITE_ENABLE_ANALYTICS=false
```

### Important Notes

1. **Never commit `.env` to version control**
   - The `.env` file is already in `.gitignore`
   - Only commit `.env.example` with placeholder values

2. **Restart dev server after changes**
   ```bash
   # Stop the server (Ctrl+C)
   # Start it again
   npm run dev
   ```

3. **Access variables in code**
   ```javascript
   const siteUrl = import.meta.env.VITE_SITE_URL;
   ```

---

## Build Process

### Production Build

```bash
# Create optimized production build
npm run build
```

**Expected output:**
```
vite v5.0.0 building for production...
✓ 234 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-a1b2c3d4.css   12.34 kB │ gzip:  3.45 kB
dist/assets/index-e5f6g7h8.js   145.67 kB │ gzip: 45.67 kB
✓ built in 3.45s
```

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

The preview will be available at `http://localhost:4173`

### Build Output

The build process creates a `dist/` directory containing:

```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-[hash].css   # Compiled CSS
│   ├── index-[hash].js    # Compiled JavaScript
│   └── [images]           # Optimized images
├── manifest.json          # PWA manifest
├── robots.txt             # SEO robots file
└── sitemap.xml            # SEO sitemap
```

### Build Optimization

The build process automatically:
- ✅ Minifies JavaScript and CSS
- ✅ Optimizes images
- ✅ Generates source maps
- ✅ Splits code into chunks
- ✅ Tree-shakes unused code
- ✅ Adds cache-busting hashes

---

## Deployment Options

### Vercel (Recommended)

Vercel offers the best experience for React + Vite applications with zero configuration.

#### Method 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Method 2: Deploy via Git Integration

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import project in Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure project**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add environment variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)

#### Custom Domain Setup (Vercel)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `jhdigital.com`)
3. Configure DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (up to 48 hours)
5. SSL certificate is automatically provisioned

#### Automatic Deployments

- **Production**: Pushes to `main` branch auto-deploy to production
- **Preview**: Pull requests create preview deployments
- **Rollback**: One-click rollback in Vercel dashboard

---

### Netlify

Netlify provides excellent hosting with built-in form handling.

#### Method 1: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy to production
netlify deploy --prod
```

#### Method 2: Deploy via Git Integration

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Create new site in Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select repository

3. **Configure build settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18

4. **Add environment variables**
   - Go to Site settings → Environment variables
   - Add all variables from `.env`

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment (1-2 minutes)

#### Netlify Configuration File

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### Form Handling (Netlify)

Netlify provides built-in form handling. Update [`Contact.jsx`](src/components/sections/Contact.jsx:96):

```javascript
// Add data-netlify attribute to form
<form 
  name="contact" 
  method="POST" 
  data-netlify="true"
  onSubmit={handleSubmit}
>
  <input type="hidden" name="form-name" value="contact" />
  {/* Rest of form fields */}
</form>
```

---

### GitHub Pages

GitHub Pages is free for public repositories.

#### Setup GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_SITE_URL: ${{ secrets.VITE_SITE_URL }}
          VITE_CONTACT_EMAIL: ${{ secrets.VITE_CONTACT_EMAIL }}

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

#### Configure Base Path

Update [`vite.config.js`](vite.config.js:1):

```javascript
export default defineConfig({
  base: '/repository-name/', // Replace with your repo name
  // ... rest of config
})
```

#### Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. Push to `main` branch to trigger deployment
4. Site will be available at `https://username.github.io/repository-name/`

#### Custom Domain (GitHub Pages)

1. Add `CNAME` file to `public/` directory:
   ```
   jhdigital.com
   ```

2. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153

   Type: CNAME
   Name: www
   Value: username.github.io
   ```

---

### Traditional Hosting

For cPanel, VPS, or shared hosting environments.

#### Build and Upload

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Upload files**
   - Upload entire `dist/` directory contents to server
   - Typical paths:
     - cPanel: `/public_html/`
     - VPS: `/var/www/html/`

3. **Configure server**

#### Apache (.htaccess)

Create `.htaccess` in upload directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name jhdigital.com www.jhdigital.com;
    root /var/www/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### FTP Upload

```bash
# Using lftp
lftp -u username,password ftp.yourhost.com
cd public_html
mirror -R dist/ ./
quit
```

---

## Post-Deployment Checklist

After deploying, verify the following:

### Functionality Tests

- [ ] **Homepage loads correctly**
  - Visit your deployed URL
  - Verify hero section displays

- [ ] **Navigation works**
  - Click all navigation links
  - Verify smooth scrolling to sections

- [ ] **All sections load**
  - Hero
  - About
  - Services
  - Portfolio
  - Testimonials
  - Contact

- [ ] **Contact form functions**
  - Fill out form
  - Submit
  - Verify success message
  - Check email delivery

- [ ] **Images load properly**
  - All images display
  - No broken image icons
  - Lazy loading works

### Performance Tests

- [ ] **Run Lighthouse audit**
  ```bash
  # Install Lighthouse CLI
  npm install -g lighthouse

  # Run audit
  lighthouse https://jhdigital.com --view
  ```

  **Target scores:**
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+
  - SEO: 95+

- [ ] **Check Core Web Vitals**
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

- [ ] **Test page load speed**
  - Use [WebPageTest](https://www.webpagetest.org)
  - Target: < 3s total load time

### SEO Verification

- [ ] **Meta tags render correctly**
  - View page source
  - Verify title, description, OG tags

- [ ] **Sitemap accessible**
  - Visit `https://jhdigital.com/sitemap.xml`
  - Verify all URLs listed

- [ ] **Robots.txt configured**
  - Visit `https://jhdigital.com/robots.txt`
  - Verify allows crawling

- [ ] **Submit to search engines**
  - [Google Search Console](https://search.google.com/search-console)
  - [Bing Webmaster Tools](https://www.bing.com/webmasters)

### Mobile Testing

- [ ] **Test on real devices**
  - iPhone (Safari)
  - Android (Chrome)
  - Tablet (iPad)

- [ ] **Responsive design works**
  - All breakpoints function correctly
  - No horizontal scrolling
  - Touch targets adequate (44x44px minimum)

### Browser Compatibility

- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)

### Security

---

## Security Configuration

### Overview

Security must be configured before deploying to production. This section covers essential security measures for the J&H Digital website.

### Pre-Deployment Security Checklist

Before deploying to production, ensure all security measures are in place:

- [ ] Security headers configured for your platform
- [ ] Content Security Policy (CSP) implemented
- [ ] HTTPS enforced
- [ ] Environment variables properly set
- [ ] Source maps disabled in production
- [ ] Debug mode disabled
- [ ] Security monitoring configured
- [ ] Backup procedures in place

### Security Headers Configuration

Security headers protect against various attacks. Choose the configuration file for your hosting platform:

#### Netlify

The [`public/_headers`](public/_headers:1) file is automatically deployed with your site.

**Verify deployment:**
```bash
curl -I https://your-site.netlify.app
```

**Expected headers:**
- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security

#### Vercel

The [`vercel.json`](vercel.json:1) file is automatically used during deployment.

**Verify deployment:**
```bash
curl -I https://your-site.vercel.app
```

#### Traditional Hosting (Apache)

Upload [`.htaccess`](.htaccess:1) to your web root directory.

**Test locally:**
```bash
# Check if mod_headers is enabled
apache2ctl -M | grep headers
```

#### Nginx

Include [`nginx-security.conf`](nginx-security.conf:1) in your server block:

```nginx
server {
    listen 443 ssl http2;
    server_name jhdigital.com;
    
    # Include security configuration
    include /path/to/nginx-security.conf;
    
    # Your other configuration
}
```

**Test configuration:**
```bash
nginx -t
sudo systemctl reload nginx
```

### Content Security Policy (CSP)

CSP is configured in the security headers files. The default policy:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: https:;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

**Testing CSP:**
1. Deploy to staging
2. Open browser console
3. Check for CSP violations
4. Adjust policy if needed

**Common CSP Issues:**

| Issue | Solution |
|-------|----------|
| Inline scripts blocked | Add nonce or move to external file |
| External fonts blocked | Add font domain to font-src |
| Images not loading | Check img-src policy |
| API calls blocked | Add API domain to connect-src |

### HTTPS Configuration

HTTPS is essential for security. Most modern hosting platforms provide automatic HTTPS.

#### Netlify/Vercel
- Automatic HTTPS with Let's Encrypt
- Auto-renewal
- No configuration needed

#### Traditional Hosting

**Using Let's Encrypt:**
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-apache

# Get certificate
sudo certbot --apache -d jhdigital.com -d www.jhdigital.com

# Auto-renewal (already configured)
sudo certbot renew --dry-run
```

**Verify HTTPS:**
```bash
# Check SSL certificate
openssl s_client -connect jhdigital.com:443 -servername jhdigital.com

# Test SSL configuration
# Use: https://www.ssllabs.com/ssltest/
```

### Environment Variables Security

**Production Environment Variables:**

```bash
# Required variables
VITE_SITE_URL=https://jhdigital.com
VITE_SITE_NAME=J&H Digital
VITE_CONTACT_EMAIL=hello@jhdigital.com
VITE_CONTACT_PHONE=+1-555-0123

# Social media
VITE_TWITTER_HANDLE=jhdigital
VITE_LINKEDIN_URL=https://linkedin.com/company/jhdigital
VITE_GITHUB_URL=https://github.com/jhdigital

# Security settings
VITE_ENVIRONMENT=production
VITE_DEBUG=false
VITE_DEV_MODE=false
VITE_ENABLE_CSRF=true
VITE_ENABLE_RATE_LIMITING=true

# Optional: Analytics (if enabled)
# VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
# VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

**Setting Variables by Platform:**

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Add each variable
3. Redeploy site

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add each variable
3. Select "Production" environment
4. Redeploy

**Traditional Hosting:**
Create `.env.production` file (never commit to git):
```bash
# Copy from .env.example
cp .env.example .env.production

# Edit with production values
nano .env.production
```

### Build Security

Update [`vite.config.js`](vite.config.js:1) for production security:

```javascript
export default defineConfig(({ mode }) => ({
  build: {
    // Disable source maps in production
    sourcemap: mode === 'development',
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
      }
    }
  }
}))
```

**Verify build security:**
```bash
# Build for production
npm run build

# Check for source maps (should not exist)
find dist -name "*.map"

# Check bundle size
ls -lh dist/assets/

# Verify no debug code
grep -r "console.log" dist/
```

### Security Monitoring

**Set up error monitoring (recommended):**

1. **Sentry Setup:**
```bash
npm install @sentry/react
```

2. **Configure in production:**
```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

if (import.meta.env.MODE === 'production') {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: 'production',
    tracesSampleRate: 1.0,
  });
}
```

3. **Add to environment variables:**
```bash
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

### Security Testing

**Before production deployment:**

```bash
# 1. Run security audit
npm audit

# 2. Check for outdated packages
npm outdated

# 3. Build and test
npm run build
npm run preview

# 4. Test security headers
curl -I http://localhost:4173

# 5. Check bundle size
ls -lh dist/assets/
```

**After deployment:**

```bash
# 1. Test security headers
curl -I https://jhdigital.com

# 2. Test SSL
# Visit: https://www.ssllabs.com/ssltest/

# 3. Test security headers
# Visit: https://securityheaders.com

# 4. Test CSP
# Open browser console and check for violations

# 5. Run Lighthouse audit
lighthouse https://jhdigital.com --view
```

### Security Incident Response

**If a security issue is discovered:**

1. **Immediate Actions (within 1 hour):**
   - Take site offline if critical
   - Assess the severity
   - Document the issue
   - Notify security team

2. **Investigation (within 24 hours):**
   - Identify the vulnerability
   - Determine scope of impact
   - Review access logs
   - Preserve evidence

3. **Remediation (within 48 hours):**
   - Patch the vulnerability
   - Deploy the fix
   - Verify the fix works
   - Monitor for issues

4. **Post-Incident (within 1 week):**
   - Document the incident
   - Update security procedures
   - Conduct team training
   - Implement preventive measures

**Emergency Contacts:**
- Security Team: security@jhdigital.com
- Technical Lead: tech@jhdigital.com
- Emergency: [Your emergency contact]

### Security Maintenance

**Weekly:**
- [ ] Check error logs
- [ ] Review security alerts
- [ ] Monitor uptime
- [ ] Check for security updates

**Monthly:**
- [ ] Update dependencies
- [ ] Run security audit
- [ ] Review access logs
- [ ] Test backup restoration

**Quarterly:**
- [ ] Full security audit
- [ ] Penetration testing
- [ ] Review security policies
- [ ] Update documentation

### Additional Security Resources

**Documentation:**
- [SECURITY_AUDIT.md](SECURITY_AUDIT.md:1) - Security assessment report
- [SECURITY_HARDENING_GUIDE.md](SECURITY_HARDENING_GUIDE.md:1) - Hardening procedures
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Cheat Sheet](https://cheatsheetseries.owasp.org/)

**Tools:**
- [SecurityHeaders.com](https://securityheaders.com) - Test security headers
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Test SSL configuration
- [Observatory](https://observatory.mozilla.org/) - Security analysis
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance & security

**Support:**
- Security Issues: security@jhdigital.com
- Technical Support: support@jhdigital.com
- Documentation: See [README.md](README.md:1)


- [ ] **HTTPS enabled**
  - SSL certificate active
  - No mixed content warnings

- [ ] **Security headers configured**
  - Check with [SecurityHeaders.com](https://securityheaders.com)

---

## Troubleshooting

### Common Issues

#### Build Fails

**Problem:** `npm run build` fails with errors

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 18+

# Update dependencies
npm update
```

#### Blank Page After Deployment

**Problem:** Site shows blank page in production

**Solutions:**
1. Check browser console for errors
2. Verify base path in [`vite.config.js`](vite.config.js:1)
3. Check server routing configuration
4. Verify environment variables are set

#### Images Not Loading

**Problem:** Images show broken icons

**Solutions:**
1. Verify images are in `public/` or `src/assets/`
2. Check image paths are correct
3. Ensure images were included in build
4. Check server MIME types

#### Form Submission Fails

**Problem:** Contact form doesn't submit

**Solutions:**
1. Verify form endpoint in environment variables
2. Check CORS configuration
3. Test form endpoint directly
4. Review browser console for errors

#### Slow Performance

**Problem:** Site loads slowly

**Solutions:**
1. Run Lighthouse audit
2. Optimize images (use WebP format)
3. Enable compression on server
4. Check bundle size: `npm run build -- --analyze`
5. Implement code splitting

---

## Rollback Procedures

### Vercel Rollback

1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Find previous working deployment
5. Click "..." → "Promote to Production"

### Netlify Rollback

1. Go to Netlify dashboard
2. Select your site
3. Click "Deploys"
4. Find previous deployment
5. Click "Publish deploy"

### GitHub Pages Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

### Manual Rollback

1. Keep backup of previous `dist/` folder
2. Upload backup files to server
3. Clear CDN cache if applicable

---

## Additional Resources

### Documentation
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment](https://react.dev/learn/start-a-new-react-project#deploying-to-production)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org)
- [GTmetrix](https://gtmetrix.com)

### Support
- **Email**: dev@jhdigital.com
- **Documentation**: See [`README.md`](README.md:1)
- **Issues**: GitHub Issues

---

**Last Updated:** 2024-01-24  
**Version:** 1.0.0  
**Maintained by:** J&H Digital Development Team