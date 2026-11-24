# Hasibul Hasan: portfolio

Static Next.js site. No web fonts, no animation libraries, images converted to WebP, so it loads fast.

## Edit content
Everything you read on the site is in `src/content.ts`. Edit it and save.
Empty lists hide their section automatically.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build and deploy
```bash
npm run build    # writes the finished site to ./out
```
- Vercel or Netlify: import the Git repo, no settings needed.
- Any other host: upload the contents of `out/`.

## Code layout

- `src/content.ts`: all text and links (edit this to change content).
- `src/app/page.tsx`: only assembles the page from components.
- `src/components/<section>/`: one small component per piece (e.g. `hero/Globe.tsx`, `projects/Rail.tsx`, `skills/StackJson.tsx`).
- `src/components/effects/Effects.tsx`: the only other client-side script (reveals, count-up, parallax, magnetic buttons).
- `src/lib/utils.ts`: small helpers.
