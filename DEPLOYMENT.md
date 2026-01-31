# Deployment Guide

Step-by-step instructions for deploying ColorClip Pro website to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier) - Sign up at https://vercel.com
- GitHub repository with the website code

## Step 1: Push to GitHub

If you haven't already, push the website to GitHub:

```bash
cd /Users/daveprout/Documents/colorclip-pro-website

# Create a new repository on GitHub first, then:
git remote add origin https://github.com/prouticus/colorclip-pro-website.git
git branch -M main
git push -u origin main
```

## Step 2: Import to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your GitHub account and find `colorclip-pro-website`
4. Click **"Import"**

## Step 3: Configure Build Settings

Vercel should auto-detect Astro. Verify these settings:

- **Framework Preset:** Astro
- **Build Command:** `bun run build`
- **Output Directory:** `dist`
- **Install Command:** `bun install`

Click **"Deploy"** (it will fail due to missing env vars - that's okay!)

## Step 4: Add Environment Variables

1. Go to your project in Vercel
2. Click **Settings → Environment Variables**
3. Add the following variables:

### Required Variables

**GITHUB_TOKEN** (Required for download buttons)
- **Value:** Your GitHub personal access token
- **How to get:**
  1. Go to https://github.com/settings/tokens/new
  2. Name: `ColorClip Website`
  3. Expiration: No expiration (or 1 year)
  4. Scopes: Check `public_repo`
  5. Click **"Generate token"**
  6. Copy the token (you won't see it again!)
- **Environments:** Production, Preview, Development

**API_INTERNAL_KEY** (Required for email waitlist)
- **Value:** Your api.mantisarts.com internal API key
- **How to get:** From your api.mantisarts.com environment config
- **Environments:** Production, Preview, Development

### Optional Variables

**API_BASE_URL**
- **Value:** `https://api.mantisarts.com`
- **Environments:** Production, Preview
- **Note:** Only needed if different from default

**DISCORD_SERVER_ID**
- **Value:** Your Discord server ID
- **Environments:** Production, Preview
- **Note:** Only needed when Discord server is set up

## Step 5: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Find the failed deployment
3. Click the three dots **"..."**
4. Click **"Redeploy"**

Or trigger a new deployment:
```bash
git commit --allow-empty -m "Trigger deployment"
git push
```

## Step 6: Configure Custom Domain

### Option A: Use Vercel Subdomain
Your site is now live at: `https://colorclip-pro-website.vercel.app`

### Option B: Use Custom Domain (Recommended)

1. In Vercel project, go to **Settings → Domains**
2. Add domain: `colorclip.mantisarts.com`
3. Vercel will provide DNS records to add

**If mantisarts.com is on Vercel:**
- Vercel will auto-configure it
- No DNS changes needed!

**If mantisarts.com is elsewhere:**
- Add CNAME record to your DNS:
  ```
  Name: colorclip
  Type: CNAME
  Value: cname.vercel-dns.com
  ```
- Wait for DNS propagation (5-30 minutes)

## Step 7: Update Astro Config

Once you have your final domain, update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://colorclip.mantisarts.com', // or your chosen domain
  integrations: [react()],
  adapter: vercel()
});
```

Commit and push:
```bash
git add astro.config.mjs
git commit -m "Add site URL to config"
git push
```

This enables proper canonical URLs and sitemap generation.

## Step 8: Verify Deployment

Check that everything works:

- ✅ **Homepage** loads with hero, features, mobile waitlist
- ✅ **Download buttons** show current version (fetched from GitHub)
- ✅ **Release notes** page (`/releases`) displays changelog
- ✅ **Documentation** pages (`/docs`) load correctly
- ✅ **Email signup** form works (test it!)
- ✅ **Footer** appears on all pages
- ✅ **Mobile responsive** (test on phone)

## Automatic Deployments

Now configured! Every time you push to `main`:
- Vercel automatically builds and deploys
- Takes ~1-2 minutes
- You'll get an email notification

**Preview Deployments:**
- Pull requests get their own preview URL
- Test changes before merging

## Troubleshooting

### Build Fails

**"Command not found: bun"**
- Vercel should auto-detect Bun from `bun.lock`
- Manually set in Project Settings → General → Build & Development Settings

**Module not found errors**
- Check all dependencies are in `package.json`
- Try: `bun install` locally and commit updated `bun.lock`

### API Routes Don't Work

**404 on /api/releases or /api/waitlist**
- Check `vercel.json` exists in root
- Verify `api/` folder contains `.ts` files
- Check Functions tab in Vercel dashboard

### Environment Variables Not Working

- Make sure they're added to all environments (Production, Preview, Development)
- Redeploy after adding variables
- Check for typos in variable names

### Download Buttons Show Error

- Verify `GITHUB_TOKEN` is set correctly
- Check token has `public_repo` scope
- Test the API: `curl https://your-site.com/api/releases`

### Custom Domain Not Working

- Wait 30 minutes for DNS propagation
- Use `dig colorclip.mantisarts.com` to check DNS
- Verify CNAME points to `cname.vercel-dns.com`

## Monitoring

**View Logs:**
- Vercel Dashboard → Your Project → Functions
- Click on any function to see logs
- Real-time logs during active requests

**Analytics:**
- Free tier: Basic analytics in dashboard
- Upgrade to Pro: Advanced analytics available

## Next Steps

After deployment:
1. Test the live site thoroughly
2. Share the URL with others for feedback
3. Monitor the Functions logs for errors
4. Set up GitHub webhook to trigger rebuilds on new releases (Task #18)

---

**Need help?** Check:
- [Vercel Documentation](https://vercel.com/docs)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/vercel/)
- Your project's GitHub Issues
