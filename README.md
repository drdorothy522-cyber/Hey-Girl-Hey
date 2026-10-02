# Hey Girl

**H.E.Y. G.I.R.L.** — Helping Every Young Girl in Real Life.

Nonprofit website for **Hey Girl**, a Duncanville, Texas organization supporting women in domestic abuse situations.

Static site. No build step. Deploys anywhere (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Brand

- Colors: pink `#e21b7c`, teal `#1aa3b5`, gold `#d9a21b` (see `:root` in `styles.css`).
- Pillars: Faith · Confidence · Purpose · Godfidence.
- Affirmation: *She is seen. She is loved. She is limitless.*
- Verse: Psalm 46:5.

## Structure

```
index.html            # Single-page skeleton
assets/css/styles.css # Styles (mobile-first, no framework)
assets/js/main.js     # Quick Exit, nav, form + donate placeholders
assets/img/team/      # Leadership headshots, 4:5 crop, 800x1000 jpg + webp
assets/img/           # logo.webp/.jpg (hero), logo-sm.jpg (header), favicon.svg/.png (vector crown mark), apple-touch-icon.png, og-image.jpg
```

## Safety features (do not remove)

- **Quick Exit button** (fixed, every page) + **double-ESC** keyboard shortcut. Uses `location.replace` so the site is removed from Back history.
- **Crisis bar** with 911 and the National Domestic Violence Hotline on every page.
- **Safe browsing section** explaining history/incognito/device safety.
- Contact form asks "Is it safe to contact you this way?"
- Form inputs use `autocomplete="off"` to avoid leaving saved data on shared devices.

## Before launch (TODO)

- [ ] Verify every phone number in the **Local Shelters & Services** block.
- [ ] Replace placeholder phone `(000) 000-0000` and `@hghey.org` emails with real ones.
- [ ] Wire the contact form (Formspree, Netlify Forms, or Supabase Edge Function).
- [ ] Replace the Donate button href with a Stripe Payment Link.
- [ ] Add 501(c)(3) status and EIN to the Donate card once approved.
- [ ] Set real domain in `og:url`, JSON-LD `url`, `sitemap.xml`, `robots.txt`, and all `@hghey.org` emails once mailboxes exist.
- [ ] Write Privacy and Terms pages (footer links are placeholders).
- [ ] Never publish a shelter or safe-house address. Use a PO Box.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy (Vercel)

This repo is Vercel-ready. No framework, no build command.

1. Go to [vercel.com/new](https://vercel.com/new) and import `trudellcolton1-arch/Hey-Girl-Hey`.
2. Framework Preset: **Other**. Build Command: *(leave empty)*. Output Directory: *(leave empty, defaults to root)*.
3. Click **Deploy**. Every push to `master` auto-deploys; every branch gets a preview URL.
4. Add your domain under **Settings → Domains** and point DNS (`A 76.76.21.21` or `CNAME cname.vercel-dns.com`).

`vercel.json` sets:

- **Security headers**: CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Permissions-Policy`.
- **`Referrer-Policy: no-referrer`**: the Quick Exit destination (and any outbound link) never learns a visitor came from this site. Keep this.
- **Caching**: `/assets/*` cached for a year (bump filenames when you change them, e.g. `styles.v2.css`); HTML always revalidates.
- **Clean URLs**: `/about.html` → `/about` when you add more pages.

### CSP gotcha

The Content-Security-Policy blocks inline `<script>` and any third-party script by default. When you add Stripe, a form backend, or analytics, add their domains to `script-src`, `connect-src`, and `frame-src` in `vercel.json` or they will silently fail. Test on a preview deploy first.

### Privacy note

Think twice before adding Vercel Analytics or any tracker. Visitor data on a domestic-violence site is sensitive. If you add analytics, make it cookieless and say so in the Privacy page.

### Alternative: GitHub Pages / Netlify

Also works with zero config: deploy from `/ (root)`. The headers in `vercel.json` will not apply there.
