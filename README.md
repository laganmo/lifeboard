# Lifeboard

A personal life dashboard — architectural minimal theme.

## File structure

```
lifeboard/
├── index.html        ← All pages (Home, Money, Travel, Health, Career, Growth)
├── css/
│   └── styles.css    ← All styles
├── js/
│   └── app.js        ← Navigation + map tooltip + data hooks
└── README.md         ← This file
```

---

## Deploy in under 10 minutes (Vercel — free)

### Step 1 — Push to GitHub

1. Go to [github.com](https://github.com) and create a free account if needed
2. Click **New repository**, name it `lifeboard`, set to **Public**, click **Create**
3. On your computer, open Terminal and run:

```bash
# If you don't have git installed: https://git-scm.com/downloads
cd path/to/your/lifeboard/folder
git init
git add .
git commit -m "Initial lifeboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lifeboard.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project**
3. Find and import your `lifeboard` repository
4. Leave all settings as default — Vercel detects it's a static site
5. Click **Deploy**

Your dashboard will be live at `https://lifeboard-xxx.vercel.app` in about 60 seconds.

Every time you push to GitHub, Vercel auto-deploys the new version.

---

## Personalise your data

All numbers are currently placeholder values. Find and replace them in `index.html`:

| What to update | Search for | Replace with |
|---|---|---|
| Net worth | `$284k` / `$284,600` | Your actual net worth |
| Countries visited | `23` (travel context) | Your country count |
| Country list | `United States`, `Japan`, etc. | Your visited countries |
| Income | `$142k` / `$142,000` | Your income |
| Goals percentages | `style="width:62%"` | Your actual percentages |
| Books | Book titles in Growth page | Your reading list |
| Habit dots | `.hd done` / `.hd miss` | Your week's habits |

### Update travel map countries

In `index.html`, visited countries are black filled `<path>` elements with `class="map-country"`.

Wishlist countries are dashed `<circle>` elements.

To mark a new country as visited, find its coordinates and add a path — or change the fill of an existing grey continent region from `#e8e6e0` to `#1a1a18`.

### Update tooltip data

In `js/app.js`, find the `COUNTRY_DATA` object and update each country's:
- `visited` — when you went
- `price`   — current flight price from your home city
- `tips`    — your favourite spots / Reddit recommendations

Add new entries for additional visited countries.

---

## Connect live data (next phase)

### Money — Plaid
```
npm install plaid
```
Sign up at [plaid.com/developers](https://plaid.com/developers) (free dev tier).
Connect bank/investment accounts → get real-time balances and net worth.

### Flights — Amadeus
```
Sign up at developers.amadeus.com (free)
GET /v2/shopping/flight-offers?originLocationCode=NYC&...
```

### Reddit intel
```
GET https://www.reddit.com/r/JapanTravel/search.json?q=must+visit&sort=top&limit=5
```
No API key required for read-only. Cache results in your database.

### Health — Apple HealthKit
Requires an iOS app or a third-party aggregator like Exist.io or Gyroscope (both have APIs).

### Full backend setup
See the deployment guide in our conversation for the full Node.js + Supabase setup.

---

## Custom domain

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Vercel project settings → Domains → Add your domain
3. Update your domain's DNS records as instructed
4. HTTPS is automatic

---

## Local development

No build tools needed. Just open `index.html` in a browser:

```bash
open index.html
# or on Windows:
start index.html
```

For live reload during editing, use VS Code with the Live Server extension,
or run:

```bash
npx serve .
```
