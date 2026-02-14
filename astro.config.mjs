// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Update this with your actual domain after deployment
  site: 'https://colorclip.mantisarts.com',
  integrations: [react(), tailwind()],
  adapter: vercel()
});