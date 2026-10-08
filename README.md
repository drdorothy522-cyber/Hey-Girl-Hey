# Hey Girl

**H.E.Y. G.I.R.L.** — Helping Every Young Girl in Real Life.

Nonprofit website for **Hey Girl**, a Dallas–Fort Worth, Texas organization supporting women in domestic abuse situations.

Static site. No build step. Deploys anywhere (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Brand

- Colors: pink `#e21b7c`, teal `#1aa3b5`, gold `#d9a21b` (see `:root` in `styles.css`).
- Pillars: Faith · Confidence · Purpose · Godfidence.
- Affirmation: *She is seen. She is loved. She is limitless.*
- Verse: Psalm 46:5.

## Structure

Multi-page static site. Clean URLs via `vercel.json` (`/about` serves `about.html`).

```
index.html            # Home: hero, three-column band, newsletter + contact
about.html            # Purpose, Mission, Vision, Pillars, Scriptures
team.html             # Officers, Board of Directors, S'HEROs (mentors)
get-help.html         # Domestic violence resources + safe browsing
support.html          # Give, Volunteer, Mentor, Pray, Partner
contact.html          # Contact form + info
404.html
assets/css/styles.css # Pink palette, Jost typeface, reference-style layout
assets/js/main.js     # Quick Exit, nav, form + donate placeholders
assets/img/team/      # Headshots: officers/board 4:5 or 1:1 at 800px; S'HEROs 1:1 at 800px
assets/img/           # logo.webp/.jpg, logo-sm.jpg, favicon.svg/.png, apple-touch-icon.png, og-image.jpg
```

Header and footer are duplicated in each page. To change them, edit every `.html` file (a `sed` across `*.html` works).

### Hero photo

The home hero is a pink gradient with the logo. To use a group photo instead, add class `hero--photo` to the `<section class="hero">` and set the image via `style="--hero-img:url('/assets/img/hero.jpg')"`, then allow inline styles in the CSP or move the URL into `styles.css`.

## Safety features (do not remove)

- **Quick Exit button** (fixed, bottom-right, every page) + **double-ESC** keyboard shortcut. Uses `location.replace` so the site is removed from Back history.
- **Hotline in the footer** of every page, plus a crisis bar on Get Help.
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
- **Caching**: images under `/assets/img/` cached for a year. CSS, JS, and HTML always revalidate, so style changes show up on the next page load. The `?v=` on the stylesheet and script URLs busts any copies cached before this rule existed.
- **Clean URLs**: `/about.html` → `/about` when you add more pages.

### CSP gotcha

The Content-Security-Policy blocks inline `<script>` and any third-party script by default. When you add Stripe, a form backend, or analytics, add their domains to `script-src`, `connect-src`, and `frame-src` in `vercel.json` or they will silently fail. Test on a preview deploy first.

### Privacy note

Think twice before adding Vercel Analytics or any tracker. Visitor data on a domestic-violence site is sensitive. If you add analytics, make it cookieless and say so in the Privacy page.

### Alternative: GitHub Pages / Netlify

Also works with zero config: deploy from `/ (root)`. The headers in `vercel.json` will not apply there.
