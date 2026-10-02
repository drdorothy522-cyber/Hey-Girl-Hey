# Hey Girl Hey

Nonprofit website for **Hey Girl Hey**, a Duncanville, Texas organization supporting women in domestic abuse situations.

Static site. No build step. Deploys anywhere (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Structure

```
index.html            # Single-page skeleton
assets/css/styles.css # Styles (mobile-first, no framework)
assets/js/main.js     # Quick Exit, nav, form + donate placeholders
assets/img/           # Logo, favicon (add og-image.jpg before launch)
```

## Safety features (do not remove)

- **Quick Exit button** (fixed, every page) + **double-ESC** keyboard shortcut. Uses `location.replace` so the site is removed from Back history.
- **Crisis bar** with 911 and the National Domestic Violence Hotline on every page.
- **Safe browsing section** explaining history/incognito/device safety.
- Contact form asks "Is it safe to contact you this way?"
- Form inputs use `autocomplete="off"` to avoid leaving saved data on shared devices.

## Before launch (TODO)

- [ ] Verify every phone number in the **Local Shelters & Services** block.
- [ ] Replace placeholder phone `(000) 000-0000` and `@heygirlhey.org` emails with real ones.
- [ ] Wire the contact form (Formspree, Netlify Forms, or Supabase Edge Function).
- [ ] Replace the Donate button href with a Stripe Payment Link.
- [ ] Add 501(c)(3) status and EIN to the Donate card once approved.
- [ ] Add `assets/img/og-image.jpg` (1200x630) for social sharing.
- [ ] Set real domain in `og:url` and the JSON-LD `url`.
- [ ] Write Privacy and Terms pages (footer links are placeholders).
- [ ] Never publish a shelter or safe-house address. Use a PO Box.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

- **GitHub Pages:** Settings → Pages → Deploy from branch → `/ (root)`.
- **Netlify / Vercel:** import repo, no build command, publish directory `/`.
