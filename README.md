# rasayanav — Premium Business Website
**Production-ready multi-page website | HTML5 + CSS3 + Vanilla JS**

---

## 📁 Project Structure

```
labc-website/
│
├── index.html          ← Home page
├── about.html          ← About Us
├── services.html       ← Services
├── portfolio.html      ← Portfolio / Projects (with modal)
├── gallery.html        ← Gallery (masonry + lightbox)
├── clients.html        ← Clients & Testimonials
├── contact.html        ← Contact form (EmailJS)
│
├── css/
│   └── style.css       ← Full design system + all styles
│
├── js/
│   ├── main.js         ← Core JS: nav, animations, counters, etc.
│   └── contact.js      ← Form validation + EmailJS integration
│
├── images/             ← Add your own project images here
├── assets/             ← Logos, icons, documents (e.g. company profile PDF)
│
└── README.md           ← This file
```

---

## 🚀 Run Locally (5 seconds)

### Option A — VS Code Live Server (Recommended)
1. Install **VS Code**: https://code.visualstudio.com
2. Install the **Live Server** extension (Ritwick Dey)
3. Open the `labc-website/` folder in VS Code
4. Right-click `index.html` → **Open with Live Server**
5. Browser opens at `http://127.0.0.1:5500`

### Option B — Python (any OS)
```bash
cd labc-website
python -m http.server 8080
# Open http://localhost:8080
```

### Option C — Node.js
```bash
npm install -g serve
serve labc-website
```

---

## 📧 Enable Email on Contact Form

The contact form is wired for **EmailJS** (free, no backend needed).

### Steps:
1. Go to https://www.emailjs.com → Sign up free
2. **Add Email Service**: Account → Email Services → Add New Service → choose Gmail/Outlook → Connect your account
3. **Create Email Template**: Email Templates → Create New Template  
   Use these variables in your template body:
   ```
   From:     {{from_name}} <{{from_email}}>
   Phone:    {{phone}}
   Company:  {{company}}
   Service:  {{service}}
   Budget:   {{budget}}
   Message:  {{message}}
   ```
4. **Get your credentials** from Account → General  
   Copy: Public Key, Service ID, Template ID

5. **Open `js/contact.js`** and replace:
   ```js
   const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```

6. **Open `contact.html`** and uncomment the SDK script in `<head>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```

7. Save, refresh — done! Test by submitting the form.

> **Alternative: FormSubmit (zero-code)**  
-> Change the `<form>` action in `contact.html` to:
-> ```html
-> <form action="https://formsubmit.co/YOUR_EMAIL_HERE" method="POST">
-> ```
-> Add `<input type="hidden" name="_subject" value="New rasayanav Enquiry">` inside the form.  
> No JS changes needed — but you lose the custom success message.

---

## 🌐 Deploy Online

### ① Netlify (Easiest — free)
1. Go to https://netlify.com → Log in → **Add new site → Deploy manually**
2. Drag the entire `labc-website/` folder into the upload box
3. Your site is live instantly at a `*.netlify.app` URL
4. **Custom domain**: Site settings → Domain management → Add custom domain → follow DNS instructions

### ② Vercel (Also free)
1. Install Vercel CLI: `npm install -g vercel`
2. In the project folder: `vercel`
3. Follow prompts → live at `*.vercel.app`
4. Custom domain: Dashboard → Project → Settings → Domains

### ③ Hostinger / cPanel Shared Hosting
1. Log in to cPanel → **File Manager** → Navigate to `public_html/`
2. Click **Upload** → select all files from `labc-website/`
   - OR use **FTP**: FileZilla → connect with your hosting FTP credentials → drag files to `public_html/`
3. Site is live at your domain immediately

### ④ GitHub Pages (Free)
1. Create a GitHub repo named `username.github.io` (or any repo)
2. Push all files to the `main` branch
3. Go to repo → Settings → Pages → Source: `main / root`
4. Live at `https://username.github.io`

---

## 🔒 Connect a Custom Domain

### Netlify / Vercel
1. Buy a domain (Namecheap, GoDaddy, Hostinger, etc.)
2. In Netlify/Vercel dashboard → add custom domain
3. Go to your domain registrar → DNS settings → add the records shown

**Typical DNS records:**
```
Type    Name    Value
A       @       75.2.60.5   (Netlify) or 76.76.21.21 (Vercel)
CNAME   www     your-site.netlify.app
```

### cPanel Hosting
- Domain is usually already connected
- Point your domain's nameservers to your host's nameservers (given by host)

---

## 🔐 Enable HTTPS

| Platform | How |
|----------|-----|
| Netlify  | Automatic (Let's Encrypt) — no action needed |
| Vercel   | Automatic — no action needed |
| cPanel   | cPanel → SSL/TLS → AutoSSL → Run AutoSSL |
| Any      | Cloudflare (free): add site to Cloudflare, change nameservers, enable "Full" SSL mode |

---

## 🖼 Adding / Replacing Images

1. Add your image files to the `/images/` folder
2. Update `src` attributes in each HTML file  
   Example: change `src="https://images.unsplash.com/..."` to `src="images/your-photo.jpg"`
3. Use optimized images (recommended: WebP format, max 800px wide for cards)
4. Free optimization tools: https://squoosh.app or https://tinypng.com

---

## ✏️ Updating Content

| What to change | Where |
|---|---|
| Company name / tagline | All HTML `<title>` tags + hero section in `index.html` |
| Phone / Email | `index.html` (footer) + `contact.html` (info card) |
| Address | Footer (all pages) + `contact.html` |
| Services | `services.html` + `index.html` (services preview section) |
| Portfolio projects | `portfolio.html` (each `.portfolio-card`) |
| Team members | `about.html` (`.grid-4` team section) |
| Testimonials | `index.html` + `clients.html` |
| Colors | `css/style.css` — change `:root` CSS variables at the top |
| Fonts | Change Google Fonts `@import` URL + update `--font-display` / `--font-body` vars |

---

## 🎨 Changing Brand Colors

Open `css/style.css` and edit the `:root` block at the very top:

```css
:root {
  --primary:  #0A2540;  /* Dark navy — main brand color */
  --accent:   #00C6A2;  /* Teal — highlight / CTA color */
  --gold:     #F5A623;  /* Gold — star ratings, accents  */
}
```

---

## ✅ Pages Checklist

| Page | File | Key Features |
|------|------|-------------|
| Home | `index.html` | Animated hero, services preview, stats counters, portfolio preview, testimonials, CTA |
| About | `about.html` | Image stack, values, team cards, certifications |
| Services | `services.html` | 9 service cards, detailed service sections, sectors grid |
| Portfolio | `portfolio.html` | Category filters, project cards, click-to-open modals, stats |
| Gallery | `gallery.html` | Masonry grid, category filter, lightbox with keyboard nav + counter |
| Clients | `clients.html` | Client logo grid, featured testimonial, 6 review cards, rating summary |
| Contact | `contact.html` | Full form + EmailJS, validation, FAQ accordion, office hours |

---

## 🛠 Tech Stack

- **HTML5** — semantic markup, meta SEO tags, accessibility attributes
- **CSS3** — custom properties, CSS Grid, Flexbox, animations, responsive design
- **Vanilla JavaScript** — zero dependencies, ES6+, IntersectionObserver API
- **Google Fonts** — Syne (display) + Outfit (body)
- **Font Awesome 6** — icons (CDN)
- **EmailJS** — contact form email delivery (free tier: 200 emails/month)

---

## 📱 Browser & Device Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome/Safari | ✅ Full |

---

*Built with precision & passion — rasayanav Website 2024*
