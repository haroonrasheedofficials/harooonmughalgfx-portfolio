# Haroon Mughal — Graphic Design Portfolio

Yeh website original "christoph-nagel.dev" ke codebase par based hai — design, animations, layout, aur scroll behaviour same rakha gaya hai, lekin content, language aur branding poori tarah Haroon Mughal / @haroonmughalgfx ke liye customize kar di gayi hai.

**Tech stack:** Plain HTML + CSS + JavaScript (GSAP animation library). Koi backend, koi build step, koi framework nahi. Kisi bhi static hosting par directly chal jayegi.

---

## ⚠️ Pehle yeh padho — Videos/Posters ke baare mein

Jo ZIP di gayi thi, usme sirf **ek** video (`01-intro-hd.mp4`) aur **ek** poster image (`intro.jpg`) mojood the. Baaki 4 sections ke original videos/posters ZIP mein include hi nahi the — original website par hi missing thay.

Isliye maine:
- Sab 4 sections ke liye **naye placeholder poster images** bana di hain (dark background + section ka naam) taake site turant kaam kare aur har section visually alag lage.
- Sab sections ka background video abhi **same intro video** use kar raha hai (kyunke koi aur video available nahi tha).

**Tumhein karna hai:** apni khud ki photos/reels/clips se in placeholders ko replace karna — neeche exact paths diye hain.

---

## 📁 Website Structure

```
christoph-nagel.dev/
├── index.html              ← Main page (sab content yahan hai)
├── impressum.html          ← Imprint / contact info (popup)
├── datenschutz.html        ← Privacy notice (popup)
├── styles.css              ← Saari styling (colours, fonts, layout, responsive)
├── site.webmanifest.html   ← App name/theme metadata
├── robots.txt              ← Search engine rules
└── assets/
    ├── favicon.svg         ← Browser tab icon ("HM" monogram)
    ├── fonts/               ← Anton + Manrope font files
    ├── images/
    │   ├── grain.png        ← Background texture (mat chhedo)
    │   └── profile/
    │       └── haroon-mughal-placeholder.jpg   ← Replace with your real photo/logo
    ├── posters/              ← Background image shown before/behind each section's video
    │   ├── intro.jpg
    │   ├── brand-identity.jpg
    │   ├── social-media.jpg
    │   ├── apparel-print.jpg
    │   └── about.jpg
    ├── videos/original/
    │   └── 01-intro-hd.mp4   ← Currently used for ALL sections (see note above)
    └── js/
        ├── gsap.min.js       ← Animation library (mat chhedo)
        └── script.js         ← Scroll/navigation logic (English comments, editable)
```

**Website ka main entry point:** `index.html`. Yeh ek single-page site hai — koi alag "pages" nahi hain (Imprint/Privacy sirf popups hain jo `impressum.html` / `datenschutz.html` ko iframe mein load karte hain).

**JavaScript kis liye:** `script.js` scroll/swipe/keyboard se section-switching, video transitions, mobile menu, aur legal popups control karta hai. Yeh **data-driven** hai — matlab HTML ke `data-video`, `data-poster`, `id` attributes se kaam karta hai, isliye tum content change karte waqt JS ko touch nahi karoge (sirf 3 chhoti English strings already edit ho chuki hain).

**Website static hai** — koi CMS, koi database, koi server-side code nahi.

---

## 🖼️ Apni Images/Videos Kahan Dalni Hain

| Kya | Kahan | Notes |
|---|---|---|
| Profile photo / logo | `assets/images/profile/` | Naam koi bhi rakh sakte ho — bas `index.html` mein JSON-LD ke `image.url` field mein naya filename likh dena |
| Section 01 poster (Brand & Logo) | `assets/posters/brand-identity.jpg` | Same naam se apni image se replace karo |
| Section 02 poster (Social Media) | `assets/posters/social-media.jpg` | — |
| Section 03 poster (Apparel & Print) | `assets/posters/apparel-print.jpg` | — |
| Section 04 poster (About) | `assets/posters/about.jpg` | — |
| Intro poster | `assets/posters/intro.jpg` | Homepage ka pehla background |
| Videos (background clips) | `assets/videos/original/` | Naya video daal kar `index.html` mein us section ke `data-video="assets/videos/original/APNA-FILE.mp4"` update kar dena |

Recommended poster size: **1920×1080px**, `.jpg` format (halki file size rakho — 200–400KB range achi hai).

---

## 📌 Portfolio Work Gallery — Important Note

Original design ek **narrative scroll site** hai (4 fixed sections: Brand & Logo → Social Media → Apparel & Print → About) — isme koi "project grid" ya "case study gallery" system nahi hai jahan tum individual projects ek-ek karke add kar sako. Yeh original site ka bhi design nahi tha.

Maine design ko as-is preserve kiya hai (jaisa instruction tha), lekin agar tumhein future mein **apne individual design projects ki gallery** chahiye (jaise "Project 1", "Project 2" cards), to woh ek naya section/page hoga jo maine abhi add nahi kiya — kyunke ye original layout se bahar jata hai. Agar chahiye to bata dena, main ek separate "Work" grid section bana dunga jo isi design language (colours, fonts, animations) mein match kare.

Filhaal, apna best work `assets/posters/` ki 4 images ke through hi dikhaya ja sakta hai (har section ek category ki representative image dikhata hai).

---

## ✏️ Basic Customization Guide

### 1. Apna naam change karna
File: `index.html`
Search karo: `Haroon Mughal` — jahan bhi milе, apna naya naam likh do. Hero section mein yeh line hai:
```html
<strong>Haroon Mughal</strong>
<span>Graphic Designer from Gujranwala, Pakistan — @haroonmughalgfx</span>
```

### 2. Profile picture change karna
Folder: `assets/images/profile/`
Apni image is folder mein dalo, phir `index.html` mein JSON-LD (`<script type="application/ld+json">`) ke andar `image.url` aur `image.contentUrl` fields ka filename update karo.

### 3. Section content (text) change karna
File: `index.html`
Har section `<!-- EDIT: Section ... -->` comment se marked hai. Us comment ke neeche `<h2>` (title) aur `<p>` (paragraphs) tags ke andar apna text likh do.

### 4. Social links change karna
File: `index.html`
Search karo `sameAs` — yeh JSON-LD ke andar hai:
```json
"sameAs": [
  "https://www.instagram.com/haroonmughalgfx/",
  "https://www.facebook.com/haroonmughalgfx/",
  "https://www.behance.net/haroonmughalgfx",
  "https://www.tiktok.com/@haroonmughalgfx"
]
```
Apne asli profile links yahan dal do.

### 5. Contact information change karna
File: `index.html` — search karo `mailto:haroonmughalgfx@gmail.com` (2 jagah milega: nav aur mobile button).
File: `impressum.html` — address/email yahan bhi hai.

### 6. Website title change karna
File: `index.html`, sabse upar:
```html
<title>Haroon Mughal | Graphic Designer — Branding, Apparel & Social Media Design</title>
```

### 7. Favicon change karna
Folder: `assets/favicon.svg` — abhi "HM" monogram hai. Ise apni logo SVG se replace kar sakte ho (same filename rakho), ya text edit kar do.

### 8. Colours/Fonts change karna
File: `styles.css`, bilkul top pe ek guide comment hai. Colours yahan hain:
```css
:root {
  --bg: #080808;      /* background */
  --text: #f4f4f1;    /* text colour */
  --red: #ff4b3e;      /* accent colour */
}
```
Fonts: file ke top pe `@font-face` blocks mein naye font files daal sakte ho.

---

## 💻 Local Par Kaise Chalayen

Koi build step nahi chahiye. Sirf ek local server chala do (video/fetch security ki wajah se seedha file double-click karna kaam nahi karega):

```bash
cd christoph-nagel.dev
python3 -m http.server 8000
```
Phir browser mein `http://localhost:8000` kholo.

(VS Code use karte ho to "Live Server" extension bhi chalega.)

---

## 🚀 Deploy Kaise Karen (sabse asaan: Cloudflare Pages)

1. Is `christoph-nagel.dev` folder ko GitHub par ek naye repository mein push karo.
2. [Cloudflare Pages](https://pages.cloudflare.com) par jao → "Create a project" → apna GitHub repo connect karo.
3. Build settings: **koi build command nahi**, "Build output directory" ko `/` (root) rakho.
4. Deploy dabao — kuch second mein live link mil jayega.

GitHub Pages / Netlify / Vercel par bhi same tarah kaam karega — bas repo connect karo, build command khali chhodo, root directory serve karo.

---

## ✅ Maine Kya Kya Change Kiya (Changelog)

- **Language:** Poori website German se English mein convert ki (HTML text, JS strings, meta tags, JSON-LD, legal pages).
- **Sections:** 4 content sections ko naye topics diye — Brand & Logo Design, Social Media Design, Apparel & Print, About (pehle: Webentwicklung, Fotografie, Videografie, Der Mensch dahinter).
- **Branding:** Naam, initials (CN → HM), tagline ("Code. Kamera. Klartext." → "Concept. Craft. Colour."), email, social links, JSON-LD structured data sab Haroon Mughal / @haroonmughalgfx ke liye update kiye.
- **Legal pages:** `impressum.html` aur `datenschutz.html` ko simple English placeholders se replace kiya (original German GDPR-specific legal text hata diya, kyunki woh Pakistan ke liye applicable nahi tha).
- **Removed:** "English version" flag-link button (jo German site ki English mirror site se link karta tha) — ab poori site already English hai.
- **New assets:** 4 placeholder poster images (har section ke liye), 1 profile-monogram placeholder, naya favicon ("HM").
- **Code comments:** `index.html` mein `<!-- EDIT: ... -->` comments aur `styles.css` mein guide comments add kiye taake future editing asaan ho.
- **Metadata:** Page title, meta description, Open Graph tags, manifest, robots.txt — sab update kiye.

## 🔧 Baaki Kya Manually Karna Hai

1. **Videos/posters replace karna** — sabse zaroori. Filhaal placeholders hain (upar dekho).
2. **Real profile photo/logo** daalna `assets/images/profile/` mein.
3. **Asli social media links** (Instagram, Facebook, Behance, TikTok) `index.html` ke JSON-LD mein daalna.
4. **Domain decide karna** — abhi maine `haroonmughalgfx.com` placeholder use kiya hai (meta tags mein). Jo bhi asli domain/URL ho, wahan update kar dena.
5. Agar **project gallery/grid** chahiye — mujhe bata dena, main isi design ke andar ek naya section bana dunga.
