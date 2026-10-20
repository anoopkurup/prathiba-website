// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://YOUR-DOMAIN-HERE', // TODO: replace before deploy
  output: 'static',
  integrations: [sitemap()],
  trailingSlash: 'always',
});
