# Web3Legals — Deployment Guide
## GitHub + Cloudflare Pages (100% Free)

---

## 📁 Project Structure
```
web3legals/
├── index.html              ← Homepage
├── css/
│   └── style.css           ← Global styles (gold/black/white theme)
├── js/
│   └── layout.js           ← Shared nav + footer + utilities
├── pages/
│   ├── services.html
│   ├── about.html
│   ├── contact.html
│   ├── blog.html           ← 20+ SEO articles (stored in localStorage)
│   ├── research.html
│   ├── crypto-countries.html ← Top 20 jurisdictions (card + table view)
│   └── compliance.html     ← Exchange compliance by country
└── cms/
    └── admin.html          ← Password-protected CMS panel
```

---

## 🚀 Step 1: Push to GitHub

```bash
# Create a new repo at github.com first
cd web3legals
git init
git add .
git commit -m "Initial Web3Legals website"
git remote add origin https://github.com/YOUR_USERNAME/web3legals.git
git push -u origin main
```

---

## ☁️ Step 2: Deploy on Cloudflare Pages (Free)

1. Go to **https://dash.cloudflare.com**
2. Click **"Workers & Pages"** → **"Create application"** → **"Pages"**
3. Click **"Connect to Git"** → Select your GitHub repo
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (or leave blank)
5. Click **"Save and Deploy"**

Your site will be live at: `https://web3legals.pages.dev`

---

## 🌐 Step 3: Custom Domain (web3legals.com)

1. In Cloudflare Pages → your project → **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter `web3legals.com`
4. If your domain is on Cloudflare DNS, it auto-configures.
5. If not, add the provided CNAME record to your registrar.

---

## 🔒 Step 4: Protect the CMS

The CMS at `/cms/admin.html` is SHA-256 password protected.

**Default password:** `R9252784858r@`

To add extra protection, create a `_headers` file in the root:

```
/cms/*
  X-Robots-Tag: noindex
  Cache-Control: no-store
```

You can also add HTTP Basic Auth via a Cloudflare Worker (see below).

---

## ⚡ Optional: Cloudflare Worker for CMS Auth

Create `workers/cms-auth.js` in your repo and set up a Cloudflare Worker:

```javascript
// Cloudflare Worker: Basic Auth for /cms/ path
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/cms/')) {
      const auth = request.headers.get('Authorization');
      if (!auth || !isValid(auth)) {
        return new Response('Unauthorized', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="CMS"' }
        });
      }
    }
    return fetch(request);
  }
};

function isValid(auth) {
  const [scheme, credentials] = auth.split(' ');
  if (scheme !== 'Basic') return false;
  const [user, pass] = atob(credentials).split(':');
  return user === 'admin' && pass === 'R9252784858r@';
}
```

---

## 🔄 Auto-Deploy

Every `git push` to your `main` branch will automatically redeploy on Cloudflare Pages.

---

## 📝 CMS Usage

1. Navigate to `https://web3legals.com/cms/admin.html`
2. Password: `R9252784858r@`
3. Features:
   - **Blog Posts**: Add/edit/delete articles (auto-saved to localStorage)
   - **Pages**: Manage custom pages
   - **API Secrets**: Store API keys for automation (Claude API, OpenAI, Zapier)
   - **Settings**: Site config + password change

> **Note**: CMS data is stored in the visitor's browser localStorage. For production, consider adding a Cloudflare D1 database or KV store for persistent storage.

---

## 🤖 Blog Automation with Claude API

In the CMS → API Secrets, store your `ANTHROPIC_API_KEY`.

Then use this Zapier webhook or custom script to auto-generate posts:

```javascript
// Auto-generate blog post via Claude API
const res = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': YOUR_ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: 'Write a 1000-word SEO blog post for web3legals.com about [TOPIC]. Include H2 headers, practical advice, and a call-to-action to contact Web3Legals.'
    }]
  })
});
```

---

## 🔍 SEO Checklist

- ✅ Each page has unique `<title>` and `<meta name="description">`
- ✅ `<link rel="canonical">` on all pages
- ✅ JSON-LD schema on homepage
- ✅ Mobile-responsive design
- ✅ Fast load (no frameworks, pure HTML/CSS/JS)
- ✅ 20+ SEO-optimised articles pre-loaded
- Add `sitemap.xml` (see below)
- Submit to Google Search Console

---

## 🗺️ Create sitemap.xml

Add this file to your project root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://web3legals.com/</loc><priority>1.0</priority></url>
  <url><loc>https://web3legals.com/pages/services.html</loc><priority>0.9</priority></url>
  <url><loc>https://web3legals.com/pages/about.html</loc><priority>0.8</priority></url>
  <url><loc>https://web3legals.com/pages/blog.html</loc><priority>0.9</priority></url>
  <url><loc>https://web3legals.com/pages/research.html</loc><priority>0.8</priority></url>
  <url><loc>https://web3legals.com/pages/crypto-countries.html</loc><priority>0.8</priority></url>
  <url><loc>https://web3legals.com/pages/compliance.html</loc><priority>0.8</priority></url>
  <url><loc>https://web3legals.com/pages/contact.html</loc><priority>0.7</priority></url>
</urlset>
```

---

## 💡 Tips

- **Free tier**: Cloudflare Pages has unlimited bandwidth and requests on the free plan.
- **SSL**: Automatic HTTPS via Cloudflare — no setup needed.
- **CDN**: Cloudflare's global CDN serves your site fast worldwide.
- **Analytics**: Enable Cloudflare Web Analytics (free) for visitor stats.
