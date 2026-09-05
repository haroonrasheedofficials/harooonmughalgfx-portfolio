# Haroon Mughal GFX — Portfolio Website

## Status
- ✅ Home page (index.html) — complete
- ✅ Portfolio page (portfolio.html) — complete, with category filters and lightbox
- ✅ About page (about.html) — complete, with story, timeline, skills meters, philosophy quote
- ✅ Services page (services.html) — complete, with expandable service cards and quick-overview list
- ✅ Contact page (contact.html) — complete, with validated form, service-aware prefill, and honest not-yet-connected messaging (see "Connecting the contact form" below)
- ⬜ Admin panel — not yet built

## Structure
- `index.html` — homepage markup
- `portfolio.html` — portfolio page markup (header, filters, grid, lightbox)
- `portfolio-data.js` — the 12 placeholder projects as a plain JS array (title, category, descriptions, thumbnail). Replace `gradient` with a real `image` URL per project when ready; this is the single place to edit portfolio content.
- `portfolio.js` — renders the grid from portfolio-data.js, handles category filtering and the lightbox (prev/next, Escape key, click-outside-to-close)
- `about.html` — about page markup (intro, story, timeline, philosophy cards, skills, tools, quote, CTA)
- `about.js` — timeline scroll-reveal and skill-meter fill animations
- `services.html` — services page markup (header, service cards, quick overview, CTA)
- `services-data.js` — the 6 services as a plain JS array (title, description, features, price, bestFor, icon). Edit this file only to change service content — no HTML editing needed.
- `services.js` — renders service cards + overview rows from services-data.js, handles the "View Details" expand/collapse and staggered scroll reveal; "Discuss This Service" links pass `?service=<id>` to contact.html
- `contact.html` — contact page markup (info column, validated form, success state, final CTA)
- `contact.js` — client-side validation, reads `?service=` from the URL to preselect the matching Project Type option, and handles form submission (see note below)
- `style.css` — full design system (colors, type, layout, animation) — shared by every page, including page-specific styles for portfolio, about, services and contact at the bottom
- `script.js` — nav toggle, scroll reveals, stat counters, testimonial slider (shared across pages)

## Connecting the contact form
The form has no real backend yet, so it does not fake a successful submission. On a valid submit it currently shows a notice that the form isn't connected to an email service. To wire it up:
1. Pick a form backend (Formspree, Netlify Forms, a custom API endpoint, etc.).
2. Set `data-endpoint="<your endpoint URL>"` on `#contactForm` in contact.html.
3. In contact.js, replace the commented-out `fetch(...)` block (in the submit handler) with a real POST request, and call `showSuccess()` only after a confirmed successful response.
No other markup changes are needed — validation, the success-state UI, and the service-aware prefill are already built and ready.

## Design tokens (defined in style.css :root)
- `--purple-900: #3a335c`
- `--purple-700: #7d4386`
- `--pink-500: #ca5693`
- `--peach-400: #f8b65f`
- Display font: Fraunces / Body font: Inter (loaded via Google Fonts CDN in <head>)

## Easy-to-edit placeholders
- Portrait image: swap the `<svg class="portrait-placeholder">` inside `.portrait-frame` (in `data-portrait-slot`) for a real `<img>` tag — appears on both index.html and about.html.
- Home page Featured Work thumbnails: replace the gradient `.work-thumb` spans with real project images.
- Portfolio page projects: edit `portfolio-data.js` only — no HTML editing needed to add/remove/update a project.
- About page story, timeline milestones, philosophy cards and quote: edit the text directly inside about.html's relevant sections.
- About page skills: edit the `data-level` attribute (0–100) on each `.skill-row` in about.html — these are visual indicators, not measured percentages.
- About page tools list: edit the `<li>` items inside `.tools-list` in about.html.
- Stats: edit `data-count` / `data-suffix` attributes on `.stat-num` elements (index.html).
- Testimonials: edit text directly inside `#testimonialTrack` (index.html).
- Client marquee: edit the `<span>` brand names inside `.marquee-track` (kept in two identical sets for seamless looping — edit both).
- Social links: add `<a>` icons inside the `data-social-slot` footer div once real profile URLs exist (present on every page).
- Services: edit `services-data.js` only — title, description, feature list, price line and "best for" text all live there and feed both the service cards and the quick-overview list automatically.
- Contact email / availability / response text / project types: edit directly inside contact.html (`.contact-facts`, `.contact-projects-list`).

## Notes for next steps
- All pages should link `style.css` and `script.js` to stay visually consistent.
- Keep the same header/footer markup across pages so navigation stays in sync.
- All five pages (Home, About, Services, Portfolio, Contact) are now built and cross-linked. Next up per your instructions: the password-protected Admin Panel.
