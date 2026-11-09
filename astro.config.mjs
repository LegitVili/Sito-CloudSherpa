import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// I reindirizzamenti 301 dai vecchi URL WordPress non passano da Astro: sono in
// public/_redirects (Netlify, Cloudflare Pages) e vercel.json (Vercel),
// generati da scripts/build-redirects.mjs.
export default defineConfig({
  site: 'https://cloudsherpa.it',
  trailingSlash: 'always',
  i18n: {
    // Italiano senza prefisso; l'inglese andrà sotto /en/ aggiungendo 'en' a locales.
    defaultLocale: 'it',
    locales: ['it'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(grazie|404)\/$/.test(page),
    }),
  ],
});
