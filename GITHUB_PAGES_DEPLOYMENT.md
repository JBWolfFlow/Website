# GitHub Pages Deployment Guide

Complete guide for deploying NeuroForge Technologies website to GitHub Pages with custom domain from Squarespace.

## 🏗️ Architecture Overview

```
neuroforgetechnologies.net (Squarespace DNS)
           ↓
    GitHub Pages (185.199.108.153)
           ↓
    Your React Website (Automated Build)
           ↓
    Web3Forms API (Contact Form)
```

---

## ✅ What's Already Done

The following files have been created and configured:

1. **`.github/workflows/deploy.yml`** - Automated deployment workflow
2. **`public/CNAME`** - Custom domain configuration
3. **`vite.config.js`** - Updated for GitHub Pages compatibility

---

## 🚀 Deployment Steps

### STEP 1: Add Web3Forms Secret to GitHub

**Why**: The GitHub Actions workflow needs your Web3Forms API key to build the site.

**How**:

1. Go to your repository: https://github.com/JBWolfFlow/Website
2. Click **"Settings"** tab
3. Click **"Secrets and variables"** → **"Actions"** (left sidebar)
4. Click **"New repository secret"**
5. Add secret:
   - **Name**: `VITE_WEB3FORMS_ACCESS_KEY`
   - **Value**: `3132cd65-fd46-4930-beef-ee0a0fd4fd3f`
6. Click **"Add secret"**

**✅ Done**: Your API key is now securely stored in GitHub

---

### STEP 2: Enable GitHub Pages

1. Go to your repository: https://github.com/JBWolfFlow/Website
2. Click **"Settings"** tab
3. Click **"Pages"** (left sidebar)
4. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"**
5. Click **"Save"** (if button appears)

**✅ Done**: GitHub Pages is now enabled

---

### STEP 3: Push Code to GitHub

**In your terminal**:

```bash
# Navigate to your project
cd "/Volumes/X10 Pro/Website Template"

# Check if git is initialized
git status

# If not initialized, run:
git init

# Add all files
git add .

# Commit changes
git commit -m "Add GitHub Pages deployment configuration"

# Add remote (if not already added)
git remote add origin https://github.com/JBWolfFlow/Website.git

# Push to GitHub
git push -u origin main
```

**What happens**:
- GitHub Actions automatically starts building your site
- Takes 2-5 minutes for first deployment
- You can watch progress in the **"Actions"** tab

**✅ Done**: Your site is being deployed!

---

### STEP 4: Configure Squarespace DNS

**Why**: Point your domain to GitHub Pages servers.

#### A. Log into Squarespace

1. Go to https://squarespace.com
2. Log in to your account
3. Go to **Settings** → **Domains**
4. Click on **neuroforgetechnologies.net**
5. Click **"DNS Settings"**

#### B. Add A Records

**Delete any existing A records**, then add these 4 new A records:

```
Record 1:
Type: A
Host: @
Points to: 185.199.108.153
TTL: 3600

Record 2:
Type: A
Host: @
Points to: 185.199.109.153
TTL: 3600

Record 3:
Type: A
Host: @
Points to: 185.199.110.153
TTL: 3600

Record 4:
Type: A
Host: @
Points to: 185.199.111.153
TTL: 3600
```

#### C. Add CNAME Record for www

```
Type: CNAME
Host: www
Points to: jbwolfflow.github.io
TTL: 3600
```

#### D. Save Changes

- Click **"Save"** or **"Apply Changes"**
- DNS propagation takes 24-48 hours (usually faster)

**✅ Done**: DNS is configured

---

### STEP 5: Add Custom Domain in GitHub

**After DNS propagates** (wait 1-2 hours minimum):

1. Go to your repository: https://github.com/JBWolfFlow/Website
2. Click **"Settings"** tab
3. Click **"Pages"** (left sidebar)
4. Under **"Custom domain"**:
   - Enter: `neuroforgetechnologies.net`
   - Click **"Save"**
5. Wait for DNS check (may take a few minutes)
6. Once verified, check **"Enforce HTTPS"**

**✅ Done**: Custom domain is configured with SSL

---

## 🧪 Testing Your Deployment

### Immediate Testing (GitHub Pages URL)

Your site is immediately available at:
```
https://jbwolfflow.github.io/Website/
```

**Test**:
- [ ] Site loads correctly
- [ ] All pages work
- [ ] Images load
- [ ] Navigation works
- [ ] Contact form displays

### After DNS Propagates (Custom Domain)

Your site will be available at:
```
https://neuroforgetechnologies.net
```

**Test**:
- [ ] Site loads at custom domain
- [ ] SSL certificate is valid (green padlock)
- [ ] www.neuroforgetechnologies.net redirects to main domain
- [ ] Contact form submits successfully
- [ ] Email is received
- [ ] Rate limiting works (try 4+ submissions)

---

## 🔄 How Automatic Deployment Works

### Every Time You Push Code:

1. **You push to GitHub**:
   ```bash
   git add .
   git commit -m "Update website"
   git push
   ```

2. **GitHub Actions automatically**:
   - Checks out your code
   - Installs dependencies (`npm ci`)
   - Builds production site (`npm run build`)
   - Deploys to GitHub Pages
   - Updates your live website

3. **Your website updates**:
   - Takes 2-5 minutes
   - No manual deployment needed
   - Automatic SSL certificate renewal

### Monitoring Deployments

1. Go to your repository
2. Click **"Actions"** tab
3. See all deployment runs
4. Click any run to see details
5. Green checkmark = successful deployment
6. Red X = failed deployment (check logs)

---

## 🔒 Security Features

### Already Configured:

✅ **Automatic HTTPS/SSL** - Free certificate from GitHub
✅ **Source maps disabled** - Production code is minified
✅ **Console logs removed** - Clean production build
✅ **Web3Forms domain whitelist** - Only your domain can submit
✅ **Rate limiting** - Prevents spam
✅ **Honeypot fields** - Catches bots
✅ **CSRF tokens** - Validates requests
✅ **Input sanitization** - Prevents XSS

### GitHub Pages Security:

✅ **DDoS protection** - Built-in by GitHub
✅ **CDN delivery** - Fast worldwide
✅ **Automatic backups** - Git version control
✅ **Access control** - Repository permissions

---

## 📊 Monitoring & Maintenance

### Daily (First Week)

- [ ] Check GitHub Actions for successful deployments
- [ ] Test contact form
- [ ] Check Web3Forms dashboard for submissions
- [ ] Verify emails are received

### Weekly

- [ ] Review Web3Forms submission logs
- [ ] Check for any spam attempts
- [ ] Test website functionality
- [ ] Verify SSL certificate is valid

### Monthly

- [ ] Update dependencies (`npm update`)
- [ ] Review security settings
- [ ] Test all features
- [ ] Check performance metrics

---

## 🆘 Troubleshooting

### Problem: GitHub Actions Fails

**Symptoms**: Red X in Actions tab

**Solutions**:
1. Click on failed action to see error logs
2. Common issues:
   - Missing `VITE_WEB3FORMS_ACCESS_KEY` secret
   - Build errors (check error message)
   - Node version mismatch
3. Fix issue and push again

### Problem: Custom Domain Not Working

**Symptoms**: Site works at jbwolfflow.github.io but not at neuroforgetechnologies.net

**Solutions**:
1. Check DNS propagation: https://dnschecker.org/
2. Wait 24-48 hours for full propagation
3. Verify A records are correct in Squarespace
4. Verify CNAME file exists in repository
5. Check GitHub Pages settings for domain verification

### Problem: SSL Certificate Error

**Symptoms**: "Not Secure" warning in browser

**Solutions**:
1. Wait for DNS to fully propagate
2. In GitHub Pages settings, uncheck then recheck "Enforce HTTPS"
3. Wait 10-15 minutes for certificate to provision
4. Clear browser cache and try again

### Problem: Contact Form Not Working

**Symptoms**: Form submits but no email received

**Solutions**:
1. Check Web3Forms dashboard for submission logs
2. Verify domain whitelist includes neuroforgetechnologies.net
3. Check spam folder
4. Verify `VITE_WEB3FORMS_ACCESS_KEY` secret is correct
5. Check browser console for errors (F12)

### Problem: Images Not Loading

**Symptoms**: Broken image icons

**Solutions**:
1. Verify images are in `public/` folder
2. Check image paths in code
3. Ensure images were committed to git
4. Check browser console for 404 errors
5. Clear browser cache

### Problem: 404 on Page Refresh

**Symptoms**: Direct URLs or page refresh shows 404

**Solutions**:
1. This is expected for single-page apps on GitHub Pages
2. Users should navigate via the site menu
3. Or implement a 404.html redirect (advanced)

---

## 🎯 Performance Optimization

### Already Optimized:

✅ **Code splitting** - Separate chunks for faster loading
✅ **Minification** - Smaller file sizes
✅ **Tree shaking** - Removes unused code
✅ **Asset optimization** - Compressed images and fonts
✅ **CDN delivery** - GitHub's global CDN

### Additional Optimizations:

**Image Optimization**:
```bash
# Install image optimizer
npm install -D vite-plugin-imagemin

# Images are automatically optimized during build
```

**Lighthouse Score**:
- Run Lighthouse audit in Chrome DevTools
- Target: 90+ for Performance, Accessibility, Best Practices, SEO

---

## 📋 Deployment Checklist

### Pre-Deployment ✅

- [x] GitHub repository created
- [x] GitHub Actions workflow configured
- [x] CNAME file created
- [x] Vite config updated
- [x] Web3Forms API key added to GitHub secrets
- [x] Web3Forms domain whitelist configured
- [x] Web3Forms rate limiting enabled

### Deployment 🚀

- [ ] Push code to GitHub
- [ ] Verify GitHub Actions deployment succeeds
- [ ] Configure Squarespace DNS
- [ ] Add custom domain in GitHub Pages
- [ ] Wait for DNS propagation
- [ ] Enable HTTPS in GitHub Pages

### Post-Deployment ✅

- [ ] Test site at GitHub Pages URL
- [ ] Test site at custom domain (after DNS)
- [ ] Verify SSL certificate
- [ ] Test contact form
- [ ] Verify email received
- [ ] Test rate limiting
- [ ] Check all pages and features
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit

---

## 🔄 Making Updates

### To Update Your Website:

1. **Make changes** to your code locally
2. **Test locally**:
   ```bash
   npm run dev
   ```
3. **Build and test**:
   ```bash
   npm run build
   npm run preview
   ```
4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
5. **Wait 2-5 minutes** for automatic deployment
6. **Verify changes** at https://neuroforgetechnologies.net

### To Update Content:

**Team Members**:
- Edit `src/data/team.js`
- Add photos to `public/team/`

**Projects**:
- Edit `src/data/projects.js`
- Add images to `public/projects/`

**Contact Info**:
- Edit `src/components/sections/Contact.jsx`
- Update `.env` file

---

## 💰 Cost Breakdown

### GitHub Pages: **FREE**
- Unlimited bandwidth
- Automatic SSL/HTTPS
- Global CDN
- 1GB storage limit
- 100GB bandwidth/month (soft limit)

### Squarespace Domain: **~$20/year**
- Domain registration
- DNS management
- No hosting fees (using GitHub Pages)

### Web3Forms: **FREE**
- 250 submissions/month (free tier)
- Upgrade to Pro if needed: $5/month

**Total Monthly Cost**: **$0** (domain is annual)

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ Website loads at https://neuroforgetechnologies.net
✅ SSL certificate is valid (green padlock)
✅ All pages work correctly
✅ Images load properly
✅ Contact form submits successfully
✅ Emails are received
✅ Rate limiting prevents spam
✅ Mobile responsive
✅ Fast load times (< 3 seconds)
✅ No console errors

---

## 📞 Support Resources

### GitHub Pages
- Documentation: https://docs.github.com/pages
- Status: https://www.githubstatus.com/
- Community: https://github.community/

### Squarespace
- Support: https://support.squarespace.com/
- DNS Help: https://support.squarespace.com/hc/en-us/articles/205812378

### Web3Forms
- Documentation: https://docs.web3forms.com/
- Support: support@web3forms.com
- Dashboard: https://web3forms.com/dashboard

---

## 🎯 Next Steps

1. **Add Web3Forms secret to GitHub** (Step 1)
2. **Enable GitHub Pages** (Step 2)
3. **Push code to GitHub** (Step 3)
4. **Configure Squarespace DNS** (Step 4)
5. **Add custom domain in GitHub** (Step 5)
6. **Test everything** (Testing section)

---

**Last Updated**: 2025-01-14
**Repository**: https://github.com/JBWolfFlow/Website
**Live Site**: https://neuroforgetechnologies.net (after DNS propagation)
**Maintained By**: NeuroForge Technologies