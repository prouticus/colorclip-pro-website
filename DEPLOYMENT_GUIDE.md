# ColorClip Pro Website - Deployment Guide

## Overview

The ColorClip Pro website is built with Astro and designed for deployment on Vercel. This guide covers the deployment process and post-deployment tasks.

## Prerequisites

- ✅ Vercel account (free tier works fine)
- ✅ GitHub repository with latest code
- ✅ Environment variables configured (see below)

## Environment Variables

Required in Vercel dashboard (Settings → Environment Variables):

```bash
# GitHub API Token (for fetching releases)
GITHUB_TOKEN=ghp_your_token_here

# API Internal Key (for serverless functions)
API_INTERNAL_KEY=your_secret_key_here
```

### How to Get GitHub Token:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `public_repo` scope
3. Copy and save in Vercel environment variables

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)

1. **Connect to Vercel:**
   ```bash
   cd colorclip-pro-website
   bun run vercel:setup
   ```
   Or use the Vercel CLI skill: `/vercel:setup`

2. **Link to GitHub:**
   - Go to Vercel dashboard
   - Import GitHub repository
   - Select `colorclip-pro-website` repo

3. **Configure Build Settings:**
   - Framework Preset: **Astro**
   - Build Command: `bun run build`
   - Output Directory: `dist`
   - Install Command: `bun install`

4. **Deploy:**
   - Every push to `main` branch auto-deploys
   - Pull requests create preview deployments

### Method 2: Manual Deployment

```bash
# Build locally
bun run build

# Deploy using Vercel CLI
vercel --prod
```

Or use the deployment skill:
```bash
/vercel:deploy
```

## Post-Deployment Checklist

### 1. Verify Core Pages

- [ ] Homepage: https://colorclip.mantisarts.com/
- [ ] Features section loads correctly
- [ ] Download buttons fetch latest release
- [ ] Navigation works
- [ ] Footer links are correct

### 2. Test Downloads

- [ ] macOS Apple Silicon download link works
- [ ] macOS Intel download link works
- [ ] Windows download link works
- [ ] Version number displays correctly
- [ ] Release notes link opens correctly

### 3. Check SEO & Meta Tags

- [ ] `<title>` tags are correct
- [ ] Open Graph images load (share on Twitter/LinkedIn to test)
- [ ] Canonical URLs are set correctly
- [ ] robots.txt is accessible: `/robots.txt`

### 4. Performance Testing

Run these checks:

```bash
# Lighthouse (Chrome DevTools)
# Target scores:
# - Performance: 90+
# - Accessibility: 95+
# - Best Practices: 95+
# - SEO: 100

# PageSpeed Insights
# https://pagespeed.web.dev/
```

- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] All images optimized
- [ ] Fonts loading properly

### 5. Mobile Responsiveness

Test on:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad)
- [ ] Desktop (1920x1080)

### 6. Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)

## Common Issues & Solutions

### Issue: Download buttons show "temporarily unavailable"

**Cause:** GitHub API token not set or invalid

**Solution:**
1. Check Vercel environment variables
2. Verify `GITHUB_TOKEN` is set
3. Test API endpoint: `/api/releases`

### Issue: Fonts not loading

**Cause:** Google Fonts blocked or CSP issue

**Solution:**
1. Check browser console for errors
2. Verify `fonts.googleapis.com` is accessible
3. Check CSP headers in Vercel config

### Issue: Images not loading

**Cause:** Missing images or incorrect paths

**Solution:**
1. Check `/public` directory has all required images
2. Verify image paths are relative (e.g., `/icon.jpg` not `./icon.jpg`)
3. Check Vercel build logs for missing assets

### Issue: 404 on serverless functions

**Cause:** API routes not deploying correctly

**Solution:**
1. Check `/api` folder exists
2. Verify functions are in correct format
3. Check Vercel function logs

## Monitoring & Analytics

### Recommended Setup:

1. **Vercel Analytics** (built-in)
   - Enable in Vercel dashboard
   - Free tier: 2,500 events/month

2. **Plausible Analytics** (optional, privacy-focused)
   ```html
   <script defer data-domain="colorclip.mantisarts.com"
           src="https://plausible.io/js/script.js"></script>
   ```

3. **Error Tracking** (Sentry or similar)
   - Track JavaScript errors
   - Monitor API failures

## Updating Content

### Update Download Links:

Downloads auto-update when you create a new GitHub release. No manual update needed.

### Update Features:

Edit `src/components/features/FeatureGrid.astro`:
```typescript
const features = [
  {
    iconEmoji: '🎨',
    title: 'New Feature',
    description: 'Description here'
  },
  // ...
];
```

### Update Screenshots:

1. Replace `/public/app-screenshot.png` with new screenshot
2. Optimize with: `tinypng.com` or `squoosh.app`
3. Commit and push - auto-deploys

## Rollback Procedure

If a deployment breaks the site:

1. **Instant Rollback:**
   - Go to Vercel dashboard
   - Deployments tab
   - Click "Promote to Production" on previous working deployment

2. **Git Rollback:**
   ```bash
   git revert HEAD
   git push origin main
   ```

## Domain Configuration

Current domain: `colorclip.mantisarts.com`

### To Update Domain:

1. Vercel dashboard → Settings → Domains
2. Add custom domain
3. Update DNS records (provided by Vercel)
4. Wait for propagation (5-30 minutes)

### SSL Certificate:

- Auto-provisioned by Vercel
- Renews automatically
- No manual configuration needed

## Performance Optimization

### Current Optimizations:

✅ Tailwind CSS purging (unused styles removed)
✅ Image lazy loading
✅ Font preloading
✅ Gzip compression (Vercel automatic)
✅ Static generation (all pages pre-rendered)

### Future Optimizations:

- [ ] Convert images to WebP format
- [ ] Add service worker for offline support
- [ ] Implement image CDN (Cloudinary/Imgix)

## Support

For deployment issues:

1. Check Vercel deployment logs
2. Review this guide
3. Contact: support@mantisarts.com
4. Vercel Discord: https://vercel.com/discord

## Changelog

### v2.0 - Modern Redesign (Feb 2026)
- Complete visual redesign from retro to modern
- New component architecture
- Tailwind CSS integration
- Improved performance and accessibility

### v1.0 - Initial Launch
- Green phosphor terminal design
- Basic feature showcase
- GitHub releases integration
