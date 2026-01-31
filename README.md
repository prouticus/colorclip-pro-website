# ColorClip Pro Website

Marketing and documentation website for ColorClip Pro with a retro/terminal aesthetic.

## Tech Stack

- **Astro 5.x** - Static site framework with islands architecture
- **React 19** - Interactive components
- **Vercel** - Hosting and serverless functions
- **Bun** - Package manager

## Project Structure

```
colorclip-pro-website/
├── src/
│   ├── pages/          # Routes (index, docs, releases, etc.)
│   ├── components/     # React and Astro components
│   ├── layouts/        # Page layouts
│   ├── content/        # MDX documentation
│   ├── assets/         # ASCII art and static assets
│   ├── styles/         # Global CSS and design system
│   └── utils/          # Helper functions
├── api/                # Vercel serverless functions
│   ├── releases.ts     # GitHub releases proxy
│   └── waitlist.ts     # Email signup handler
└── public/             # Static assets (images, fonts)
```

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Features

- **Retro/Terminal Aesthetic**: ASCII art, CRT effects, phosphor glow
- **Dynamic Downloads**: Auto-fetched from GitHub releases
- **Email Waitlist**: Mobile app signup
- **Documentation**: MDX-powered docs
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Accessible**: WCAG 2.1 AA compliant

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

Required environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub API token for fetching releases | Yes |
| `API_BASE_URL` | Main API base URL (default: https://api.mantisarts.com) | No |
| `API_INTERNAL_KEY` | Authentication for main API | Yes (for waitlist) |
| `DISCORD_SERVER_ID` | Discord server ID for widget | No |

### Getting Environment Variables

**GITHUB_TOKEN:**
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select `public_repo` scope
4. Copy the token

**API_INTERNAL_KEY:**
- Get from your api.mantisarts.com configuration

## Deployment

### Deploy to Vercel (Recommended)

**One-Click Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/prouticus/colorclip-pro-website)

**Manual Deployment:**

1. **Connect to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Link project
   vercel link
   ```

2. **Set Environment Variables:**
   ```bash
   vercel env add GITHUB_TOKEN
   vercel env add API_INTERNAL_KEY
   ```

   Or add them in the Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add each variable for Production, Preview, and Development

3. **Deploy:**
   ```bash
   # Deploy to preview
   vercel

   # Deploy to production
   vercel --prod
   ```

4. **Configure Custom Domain:**
   - Go to Project Settings → Domains
   - Add `colorclip.mantisarts.com`
   - Update your DNS with the provided CNAME record

**Automatic Deployments:**

Once connected to GitHub, Vercel will automatically:
- Deploy `main` branch to production
- Deploy pull requests to preview URLs
- Run builds on every push

### Alternative: Deploy to Other Platforms

The site can be deployed to any static hosting platform that supports:
- Node.js build process
- Serverless functions (for `/api` routes)

Examples: Netlify, Cloudflare Pages, AWS Amplify

**Note:** You'll need to adapt the serverless functions to your platform's format.
