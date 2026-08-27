# Larry's Auto Repair & Glass

Website for **Larry's Auto Repair & Glass** — Preston, Idaho.

Built with **React + Vite + Tailwind CSS**. The production build compiles to a
single self-contained `dist/index.html` (all CSS and JS inlined).

---

## Running locally

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # outputs dist/index.html
npm run preview   # preview the production build
```

---

## Deploying to Cloudflare (Workers Static Assets)

This project deploys to Cloudflare in **two commands**. The included
`wrangler.toml` serves the built `dist/` folder as static assets, with a
single-page-application fallback so `/services` and `/contact` work on refresh
and direct links.

```bash
npm run build          # produce dist/index.html
npx wrangler deploy    # upload to Cloudflare
```

The first time you run `wrangler deploy` it will open a browser to log in to
your Cloudflare account. After that, redeploying is just those two commands.

### Deploy from the Cloudflare dashboard (Git-connected)

Alternatively, connect this repo in **Workers & Pages → Create → Pages**:

| Setting          | Value           |
| ---------------- | --------------- |
| Build command    | `npm run build` |
| Output directory | `dist`          |

The `public/_redirects` file provides the SPA fallback for Pages.

---

## Contact details used on the site

- Phone: (208) 852-0186
- Email: larrysauto2017@gmail.com
- Address: 375 W Oneida St, Preston, ID 83263
- Hours: Mon–Fri, 8:00 AM – 5:00 PM

---

## Project structure

```
index.html         Vite entry point
wrangler.toml      Cloudflare Worker config (static assets + SPA fallback)
vite.config.ts     Vite config (React, Tailwind, single-file output)
package.json       Dependencies and scripts
src/
  main.tsx         React entry
  App.tsx          Entire site (pages, header, footer, forms, logo)
  index.css        All styling
  utils/cn.ts      Class-name helper
public/
  _redirects       SPA fallback for Cloudflare Pages / non-Worker hosts
dist/
  index.html       Built, self-contained site
```

The logo is an inline SVG (`Logo` component in `src/App.tsx`) — a car silhouette
over a chrome-gradient "LARRY'S" wordmark with the "AUTO REPAIR AND GLASS"
tagline. It takes a `light` prop for the dark footer variant, so no image files
are needed and the single-file build stays self-contained.
