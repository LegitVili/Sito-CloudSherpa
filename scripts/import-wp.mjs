// Importa gli articoli dal vecchio sito WordPress (API pubblica) e li converte in Markdown.
// Uso: npm run import:blog
// Scrive: src/content/blog/*.md, public/blog-media/*.webp, src/data/legacy-redirects.json
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://cloudsherpa.it';
const API = `${ORIGIN}/wp-json/wp/v2`;
const OUT_POSTS = path.join(ROOT, 'src/content/blog');
const OUT_MEDIA = path.join(ROOT, 'public/blog-media');
const OUT_REDIRECTS = path.join(ROOT, 'src/data/legacy-redirects.json');

const PAGE_MAP = {
  '/': '/',
  '/blog/': '/blog/',
  '/sezione-chi-siamo/': '/chi-siamo/',
  '/sezione-come-operiamo/': '/come-operiamo/',
  '/i-nostri-servizi/': '/servizi/',
  '/sezione-le-nostre-soluzioni/': '/soluzioni/',
  '/contact/': '/contatti/',
};

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return { data: await res.json(), pages: Number(res.headers.get('x-wp-totalpages') || 1) };
}

async function fetchAll(endpoint, fields) {
  const out = [];
  let page = 1;
  let pages = 1;
  do {
    const r = await getJson(`${API}/${endpoint}?per_page=100&page=${page}&_fields=${fields}`);
    out.push(...r.data);
    pages = r.pages;
    page++;
  } while (page <= pages);
  return out;
}

const decode = (s) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

const media = new Map(); // url remoto -> percorso locale (o null se fallito)

function fullSize(url) {
  // toglie il suffisso di ridimensionamento di WordPress (-1024x576)
  return url.replace(/-\d+x\d+(\.(?:png|jpe?g|webp|gif))$/i, '$1');
}

async function localise(url) {
  if (!url || !url.startsWith(ORIGIN + '/wp-content/')) return null;
  if (media.has(url)) return media.get(url);
  const base = path
    .basename(new URL(fullSize(url)).pathname)
    .replace(/\.[a-z]+$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const dir = new URL(url).pathname.split('/').slice(3, 5).join('-'); // anno-mese
  const file = `${dir}-${base}.webp`;
  const dest = path.join(OUT_MEDIA, file);
  let result = `/blog-media/${file}`;
  try {
    await fs.access(dest);
  } catch {
    try {
      let res = await fetch(fullSize(url));
      if (!res.ok) res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(dest);
    } catch (e) {
      console.warn('  immagine non scaricata:', url, e.message);
      result = null;
    }
  }
  media.set(url, result);
  return result;
}

function rewriteLink(href, slugSet) {
  let u;
  try {
    u = new URL(href, ORIGIN);
  } catch {
    return href;
  }
  if (u.origin !== ORIGIN && u.hostname !== 'www.cloudsherpa.it') return href;
  const p = u.pathname.endsWith('/') ? u.pathname : u.pathname + '/';
  if (PAGE_MAP[p]) return PAGE_MAP[p] + u.hash;
  const last = p.split('/').filter(Boolean).pop();
  if (p.startsWith('/argomenti/')) return slugSet.has(last) ? `/blog/${last}/` : '/blog/';
  if (slugSet.has(last)) return `/blog/${last}/`;
  if (p.startsWith('/wp-content/')) return href;
  return '/';
}

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', emDelimiter: '*' });
td.remove(['form', 'script', 'style', 'iframe', 'noscript', 'svg', 'button']);
td.addRule('figure', {
  filter: 'figcaption',
  replacement: (content) => (content.trim() ? `\n\n*${content.trim()}*\n\n` : ''),
});

const yaml = (s) => JSON.stringify(s ?? '');

async function main() {
  await fs.mkdir(OUT_POSTS, { recursive: true });
  await fs.mkdir(OUT_MEDIA, { recursive: true });
  await fs.mkdir(path.dirname(OUT_REDIRECTS), { recursive: true });

  const cats = await fetchAll('categories', 'id,slug,name');
  const catName = new Map(cats.map((c) => [c.id, c.name]));
  const posts = await fetchAll(
    'posts',
    'slug,date,modified,title,excerpt,link,content,categories,yoast_head_json',
  );
  const slugSet = new Set(posts.map((p) => p.slug));
  console.log(`${posts.length} articoli`);

  const redirects = {};
  for (const c of cats) redirects[`/argomenti/${c.slug}/`] = '/blog/';
  redirects['/argomenti/'] = '/blog/';

  for (const post of posts) {
    let html = post.content.rendered;
    const title = decode(post.title.rendered);

    // il titolo è già nel frontmatter: tolgo il primo h1 ripetuto e declasso gli altri
    html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');
    html = html.replace(/<(\/?)h1(\s|>)/gi, '<$1h2$2');

    // immagini: scarico in locale, tolgo srcset e lazy-loading di WordPress
    const imgTags = [...html.matchAll(/<img[^>]*>/gi)].map((m) => m[0]);
    for (const tag of imgTags) {
      const src = (tag.match(/\ssrc="([^"]+)"/i) || [])[1];
      const alt = (tag.match(/\salt="([^"]*)"/i) || [])[1] || '';
      const local = await localise(src);
      html = html.replace(tag, local ? `<img src="${local}" alt="${alt}">` : '');
    }
    html = html.replace(/<a\s([^>]*?)href="([^"]+)"/gi, (_, pre, href) => {
      return `<a ${pre}href="${rewriteLink(href, slugSet)}"`;
    });

    let md = td.turndown(html);
    md = md
      .replace(/\[\s*!\[([^\]]*)\]\(([^)]+)\)\s*\]\(\/blog-media\/[^)]+\)/g, '![$1]($2)')
      .replace(/\[\s*\]\([^)]*\)/g, '')
      .replace(/ /g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    const y = post.yoast_head_json || {};
    const description = decode(y.description || post.excerpt.rendered).slice(0, 300);
    const cover = await localise(y.og_image?.[0]?.url);
    const categories = post.categories.map((id) => catName.get(id)).filter(Boolean);
    const category =
      categories.find((c) => !['Uncategorized', 'Zendesk'].includes(c)) || categories[0] || 'Zendesk';

    // la prima immagine del testo è quasi sempre la copertina: non la ripeto
    if (cover) {
      const first = md.match(/^!\[[^\]]*\]\(([^)]+)\)\s*/);
      if (first && first[1] === cover) md = md.slice(first[0].length);
    }

    const fm = [
      '---',
      `title: ${yaml(title)}`,
      `description: ${yaml(description)}`,
      `pubDate: ${post.date}`,
      `updatedDate: ${post.modified}`,
      `category: ${yaml(category)}`,
      cover ? `cover: ${yaml(cover)}` : null,
      '---',
      '',
    ]
      .filter((l) => l !== null)
      .join('\n');

    await fs.writeFile(path.join(OUT_POSTS, `${post.slug}.md`), fm + md + '\n');
    redirects[new URL(post.link).pathname] = `/blog/${post.slug}/`;
    process.stdout.write('.');
  }

  await fs.writeFile(OUT_REDIRECTS, JSON.stringify(redirects, null, 2) + '\n');
  console.log(`\nfatto: ${posts.length} articoli, ${[...media.values()].filter(Boolean).length} immagini`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
