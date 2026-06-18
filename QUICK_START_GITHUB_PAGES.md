# 🚀 Quick Start: GitHub Pages Deployment

**5-Minute Setup Guide** for deploying to GitHub Pages with custom domain.

---

## ✅ What I've Done For You

I've created and configured:

1. ✅ **`.github/workflows/deploy.yml`** - Automatic deployment on every push
2. ✅ **`public/CNAME`** - Custom domain configuration
3. ✅ **`vite.config.js`** - GitHub Pages compatibility
4. ✅ **`GITHUB_PAGES_DEPLOYMENT.md`** - Complete detailed guide

---

## 🎯 What YOU Need To Do

### Step 1: Add Web3Forms Secret (2 minutes)

1. Go to: https://github.com/JBWolfFlow/Website/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `VITE_WEB3FORMS_ACCESS_KEY`
4. Value: `3132cd65-fd46-4930-beef-ee0a0fd4fd3f`
5. Click **"Add secret"**

### Step 2: Enable GitHub Pages (1 minute)

1. Go to: https://github.com/JBWolfFlow/Website/settings/pages
2. Under "Build and deployment"
3. Source: Select **"GitHub Actions"**
4. Click **"Save"**

### Step 3: Push Code (1 minute)

```bash
cd "/Volumes/X10 Pro/Website Template"
git add .
git commit -m "Add GitHub Pages deployment"
git push -u origin main
```

**✅ Your site will be live at**: `https://jbwolfflow.github.io/Website/` in 2-5 minutes

### Step 4: Configure DNS (5 minutes)

**In Squarespace**:
1. Go to Settings → Domains → arya-tech.net → DNS Settings
2. **Delete existing A records**
3. **Add 4 new A records**:
   ```
   @ → 185.199.108.153
   @ → 185.199.109.153
   @ → 185.199.110.153
   @ → 185.199.111.153
   ```
4. **Add CNAME record**:
   ```
   www → jbwolfflow.github.io
   ```
5. Click **"Save"**

### Step 5: Add Custom Domain (1 minute - AFTER DNS propagates)

**Wait 1-2 hours for DNS**, then:

1. Go to: https://github.com/JBWolfFlow/Website/settings/pages
2. Under "Custom domain"
3. Enter: `arya-tech.net`
4. Click **"Save"**
5. Wait for DNS check
6. Check **"Enforce HTTPS"**

**✅ Your site will be live at**: `https://arya-tech.net`

---

## 🧪 Testing

### Immediate (GitHub Pages URL)
```
https://jbwolfflow.github.io/Website/
```

### After DNS (Custom Domain)
```
https://arya-tech.net
```

**Test**:
- [ ] Site loads
- [ ] SSL certificate (green padlock)
- [ ] Contact form works
- [ ] Email received

---

## 🔄 Making Updates

**Every time you want to update your website**:

```bash
# Make your changes, then:
git add .
git commit -m "Your update description"
git push
```

**That's it!** GitHub automatically rebuilds and deploys in 2-5 minutes.

---

## 🆘 Need Help?

See the complete guide: [`GITHUB_PAGES_DEPLOYMENT.md`](GITHUB_PAGES_DEPLOYMENT.md:1)

---

## 📋 Checklist

- [ ] Step 1: Add Web3Forms secret to GitHub
- [ ] Step 2: Enable GitHub Pages
- [ ] Step 3: Push code to GitHub
- [ ] Step 4: Configure Squarespace DNS
- [ ] Step 5: Add custom domain in GitHub (after DNS)
- [ ] Test at GitHub Pages URL
- [ ] Test at custom domain (after DNS)
- [ ] Verify SSL certificate
- [ ] Test contact form

---

**Total Time**: ~15 minutes (plus 1-2 hours for DNS propagation)

**Cost**: $0/month (domain is annual ~$20/year)

**Your Repository**: https://github.com/JBWolfFlow/Website