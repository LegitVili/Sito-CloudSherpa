# Sito CloudSherpa

Sito statico costruito con [Astro](https://astro.build). La hero della home usa Three.js, caricato solo lì e solo dopo il primo render.

## Comandi

| Comando | Che cosa fa |
| --- | --- |
| `npm install` | Installa le dipendenze |
| `npm run dev` | Avvia il sito in locale su `http://localhost:4321` |
| `npm run build` | Genera il sito in `dist/` |
| `npm run preview` | Serve in locale la versione generata |
| `npm run check` | Controllo dei tipi |
| `npm run import:blog` | Reimporta gli articoli dal vecchio sito WordPress |

## Dove si modificano i contenuti

| Che cosa | File |
| --- | --- |
| Dati aziendali, menu, fasi del metodo, FAQ della home | `src/data/site.ts` |
| Pagine dei servizi | `src/data/services.ts` |
| Pagine per settore | `src/data/solutions.ts` |
| Testi della home | `src/pages/index.astro` e `src/components/Hero.astro` |
| Articoli del blog | `src/content/blog/*.md` |
| Colori, font, spaziature | `src/styles/global.css` |
| Scena 3D | `src/scripts/hero-scene.ts` |

Per aggiungere un articolo basta creare un file `.md` in `src/content/blog/` con lo stesso frontmatter degli altri. Il nome del file diventa l'indirizzo.

## Form

I form di contatto e di audit inviano i dati all'indirizzo indicato nella variabile `PUBLIC_FORM_ENDPOINT` (vedi `.env.example`). Finché è vuota, il form mostra un avviso e non invia nulla.

## SEO

- Title, description, canonical, Open Graph e dati strutturati sono in `src/components/Seo.astro`.
- `sitemap-index.xml` è generata a ogni build; `public/robots.txt` la segnala.
- I vecchi indirizzi WordPress (pagine e `/argomenti/...`) sono reindirizzati con 301 ai nuovi. L'elenco è in `src/data/legacy-redirects.json`; `node scripts/build-redirects.mjs` genera `public/_redirects` (Netlify, Cloudflare Pages) e `vercel.json` (Vercel). Su un altro hosting vanno convertiti nel suo formato.
- Inglese: la configurazione i18n è già in `astro.config.mjs`. Per attivarlo si aggiunge `'en'` a `locales` e si creano le pagine sotto `src/pages/en/`.

## Pubblicazione

Qualsiasi hosting statico: comando di build `npm run build`, cartella da pubblicare `dist`.
