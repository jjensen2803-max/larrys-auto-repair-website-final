# Larry's Auto Repair & Glass

Website for Larry's Auto Repair & Glass — Preston, Idaho.

Built with React + Vite. The production build compiles to a **single
self-contained `dist/index.html`** (all CSS and JS inlined).

---

## Deploying to Vercel

There are two ways. **Option A is the most reliable — use it if you have
had build failures.**

### Option A — No build step (guaranteed to work)

The `dist/` folder is committed to this repo, so Vercel can serve it
directly without installing or building anything.

In your Vercel project, go to **Settings → Build and Deployment** and set:

| Setting              | Value                        |
| -------------------- | ---------------------------- |
| Framework Preset     | **Other**                    |
| Build Command        | **OFF** (toggle the override off, leave blank) |
| Output Directory     | `dist`  *(override ON)*      |
| Install Command      | `echo skip`  *(override ON)* |
| Root Directory       | *(leave blank)*              |

Then **Deployments → ⋯ → Redeploy** and uncheck "Use existing build cache".

> With this option, if you change anything in `src/`, run `npm run build`
> locally and commit the updated `dist/index.html`.

### Option B — Let Vercel build it

| Setting              | Value                          |
| -------------------- | ------------------------------ |
| Framework Preset     | **Vite**                       |
| Build Command        | `npm run build`                |
| Output Directory     | `dist`                         |
| Install Command      | `npm install --include=dev`    |
| Root Directory       | *(leave blank)*                |

The `--include=dev` is required. Vite lives in `devDependencies`, and if
Vercel skips dev dependencies the build fails with
`sh: line 1: vite: command not found`.

---

## Important

**Do not set the Root Directory** unless this project sits in a
subfolder of your repo. `package.json`, `vercel.json` and `index.html`
must all be at the root of whatever directory Vercel is pointed at.

`vercel.json` already contains the SPA rewrite that makes `/services`
and `/contact` work on refresh and direct links.

---

## Running locally

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # outputs dist/index.html
npm run preview  # preview the production build
```

## Project structure

```
index.html        Vite entry point
vercel.json       Vercel build + SPA rewrite config
package.json      Dependencies and scripts
vite.config.ts    Vite config (React, Tailwind, single-file output)
tsconfig.json     TypeScript config
.nvmrc            Node version (22)
src/
  main.tsx        React entry
  App.tsx         Entire site (pages, header, footer, forms)
  index.css       All styling
  utils/cn.ts     Class-name helper
public/
  _redirects      SPA fallback for non-Vercel hosts
dist/
  index.html      Built, self-contained site (committed)
```

## Contact details used on the site

- Phone: (208) 852-0186
- Email: larrysauto2017@gmail.com
- Address: 375 W Oneida St, Preston, ID 83263
- Hours: Mon–Fri, 8:00 AM – 5:00 PM
