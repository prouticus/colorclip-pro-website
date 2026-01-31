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

Required for production:

```env
GITHUB_TOKEN=          # GitHub API access for releases
API_INTERNAL_KEY=      # Auth for api.mantisarts.com
DISCORD_SERVER_ID=     # For Discord widget stats
```

## Deployment

Deployed to Vercel at \`colorclip.mantisarts.com\`

Auto-deploys on push to \`main\` branch.
