# Team 9960 — Website Source

This folder contains the complete source code for **team9960.org**. It's a static site (plain HTML, CSS, and a tiny bit of JavaScript) — no database, no WordPress.

## File map

```
team9960/
├── index.html              — Home (evergreen)
├── team.html               — Roster & mentors
├── seasons.html            — Index of all seasons
├── outreach.html           — Community outreach & STEM events
├── sponsors.html           — Sponsorship tiers & in-kind options
├── donate.html             — Online donation page (PayPal)
├── contact.html            — Contact form & recruiting info
├── styles.css              — Site-wide styling
├── reveal.js               — Tiny scroll-reveal script
├── images/                 — Photos
│   └── hero.jpg
├── seasons/                — One page per FTC season
│   ├── 2025-26-decode.html
│   ├── 2024-25-into-the-deep.html
│   ├── 2023-24-centerstage.html
│   ├── 2022-23-powerplay.html
│   ├── 2021-22-freight-frenzy.html
│   ├── 2020-21-ultimate-goal.html
│   ├── 2019-20-skystone.html
│   ├── 2018-19-rover-ruckus.html
│   ├── 2017-18-relic-recovery.html
│   ├── 2016-17-velocity-vortex.html
│   └── 2015-16-res-q.html
└── README.md               — This file
```

## Architecture

The site is split into two kinds of content:

**Evergreen pages** describe Team 9960 in general — who we are, how we build, who's on the team, who we've sponsored, how to contact us. These don't change when seasons change.

**Seasonal pages** live under `seasons/` — one page per FTC season. The `seasons.html` index lists all of them; each individual page covers that year's robot, results, notebook, and photos.

This means the home page never goes stale just because the calendar flips. Each September, when FIRST reveals the new game, the only mandatory update is to:

1. Copy `seasons/2025-26-decode.html` (or whatever the most recent season is) to a new file like `seasons/2026-27-newgame.html`.
2. Update the year, game name, and game description in the new file.
3. Update the home page's "Most Recent Season" callout to point at the new season page.
4. Add a new entry to `seasons.html` at the top of the list.

Everything else updates organically as the season progresses (notebook entries, photos, results).

## Design

- **Palette:** deep navy (`#0B1729`) + warm amber (`#D97706`) on a bone/cream background (`#F5F1E8`).
- **Type:** Fraunces (italic display), Manrope (body), JetBrains Mono (technical labels).
- **Aesthetic:** editorial/engineering — like a technical journal. Generous whitespace. Photo-driven.
- **Motion:** sections fade and lift on scroll. Respects `prefers-reduced-motion`.

To preview locally, double-click `index.html`. No build step needed.

---

## How the site is hosted

The site lives in a GitHub repository. **Cloudflare Pages** watches that repository — every push triggers an automatic deploy. The site is live at team9960.org within ~30 seconds of any change.

**Cost:** $0/month for hosting. ~$10/year for the domain (at Cloudflare Registrar).

```
You edit a file → push to GitHub → Cloudflare publishes → team9960.org updates
```

---

## How to update the site

### Option A: Edit on github.com (easiest)

1. Go to the repository on github.com.
2. Click the file you want to change (e.g. `team.html`).
3. Click the pencil icon ("Edit this file").
4. Make changes in the browser editor.
5. Scroll down, write a short note describing what you changed, click "Commit changes."

The site updates automatically.

### Option B: Edit locally with VS Code

1. **One-time setup:** Install [VS Code](https://code.visualstudio.com/) and [Git](https://git-scm.com/). Then:
   ```
   git clone https://github.com/YOUR-USERNAME/team9960-website.git
   cd team9960-website
   code .
   ```
2. **For each change:** edit, save, preview by opening `index.html` in your browser, then:
   ```
   git add .
   git commit -m "Short description of change"
   git push
   ```

### Option C: GitHub Desktop (middle ground)

[GitHub Desktop](https://desktop.github.com/) gives you the same workflow with buttons instead of typed commands.

---

## Common updates — recipes

### Add a photo

1. Drop the photo file into `images/` (rename it something simple — `team-photo-2026.jpg`, not `IMG_4729.jpeg`).
2. In the relevant HTML file, find the photo slot. It looks like:
   ```html
   <div class="photo-slot">
     <div class="placeholder">
       <span>Build</span>
       4:5 vertical<br>Workshop / build photo
     </div>
   </div>
   ```
3. Replace the inner `<div class="placeholder">` block with:
   ```html
   <img src="images/team-photo-2026.jpg" alt="Description for screen readers">
   ```
4. For files inside `seasons/`, the path is `../images/yourfile.jpg` (the `../` goes up one folder).
5. Commit, push. The CSS handles cropping automatically.

**Photo aspect ratios:**
- Hero photo: **4:5 vertical**
- Photo strip: **4:5 vertical**
- Robot section: **1:1 square**
- Gallery: mixed (1:1 and 2:1)
- Member cards: **1:1 square**

### Start a new season (each September)

1. Copy `seasons/2025-26-decode.html` to `seasons/2026-27-newgame.html` (or whatever the new season slug is).
2. Edit the new file:
   - Update the `<title>` and meta description
   - Update the `<h1>` and lede paragraph with the new year and game
   - Update the breadcrumb
   - Update the `<footer>` link to "2025–26 DECODE" → new season
   - Reset the robot specs, results, notebook, and photos to placeholders
3. In `seasons.html`, add a new `.entry` block at the top of the list.
4. In `index.html`, update the "Most Recent Season" section at section 04:
   - Change "2025–26 · DECODE" to the new year and game
   - Update the link to the new season page
   - Update the season summary text
5. Update footer links in all pages (or just leave — the `seasons.html` link still works).

### Add a roster member

In `team.html`, find the `.roster` div and copy one of the existing `.member` blocks. Replace the role, name, focus text, and id number.

### Add or remove a sponsor

In `sponsors.html`, each tier has a `.sponsor-grid` with placeholder boxes. Replace the text with a sponsor name, or replace the entire block with:
```html
<div class="sponsor">
  <img src="images/sponsors/acme-logo.png" alt="Acme Corp" style="max-width: 100%; max-height: 100%;">
</div>
```

### Update the Latest Season callout

In `index.html`, find the section labeled `<!-- LATEST SEASON CALLOUT -->`. Update the year/game name in the heading and the link target. Update the descriptive text.

---

## The contact form

The form on `contact.html` is **wired up to Formspree** (form endpoint: `https://formspree.io/f/mdabwopd`). Submissions arrive in the team's Gmail inbox at `team9960@gmail.com`.

The form includes a hidden honeypot field (`_gotcha`) that catches most spam bots silently — submissions where this field is filled get dropped by Formspree before they reach the inbox.

If you ever need to change the destination, log into [formspree.io](https://formspree.io) with the team's Gmail and update the form's recipient email. No code change needed.

If you ever need to change which Formspree form the page uses (for example, after migrating the team's Formspree account to a different login), find the `<form action="...">` tag in `contact.html` and replace the URL.

---

## The donate page (PayPal setup)

The donation page (`donate.html`) is built and styled, but the actual PayPal button is a placeholder. Replacing the placeholder with your real PayPal button takes about 10 minutes once your PayPal Giving Fund verification is done.

### One-time setup (do once)

1. **Confirm 501(c)(3) verification with PayPal.** Go to [paypal.com/us/fundraiser/charity/find](https://www.paypal.com/us/fundraiser/charity/find) and search for Team 9960. If you're listed, you're in. If not, enroll your PayPal Business account in **PayPal Giving Fund**. PayPal verifies your nonprofit through the IRS and Candid (formerly GuideStar) databases. Verification can take a few business days. Once verified, PayPal waives most of the transaction fee for donations.

2. **Generate a Donate button.**
   - Log into your PayPal Business account (the one tied to your 501(c)(3))
   - Go to **Tools → All Tools → PayPal Buttons**
   - Click **Donations**
   - Configure:
     - Organization name: Team 9960 N.E.R.D.S
     - Default amount: leave blank to let donors choose, or set a suggested amount
     - Currency: USD
     - Thank-you page URL: `https://team9960.org/donate.html#thanks` (the page already has a thank-you anchor at the bottom)
   - Click **Create Button**
   - PayPal shows you the HTML — **copy the entire `<form>...</form>` block** (or the modern SDK snippet, if PayPal gives you that)

3. **Paste it into `donate.html`.**
   - Open `donate.html`
   - Find the `<div id="paypal-donate-placeholder">` block (it's in a clearly marked section with HTML comments)
   - Replace the entire div with the code PayPal gave you
   - Commit, push

The button will then render and accept donations live.

### Optional later additions

- **Update the EIN.** In `donate.html`, replace `[Your team's EIN]` with the team's actual federal EIN.
- **Recurring donations:** PayPal's button generator has a "Subscriptions" option that creates a recurring-donation button alongside the one-time one. You can include both.
- **Custom thank-you message:** Update the `<section id="thanks">` block at the bottom of `donate.html` to say whatever feels most authentic.

---

## Things needing replacement before the site fully reflects reality

- **Roster names and photos** in `team.html`
- **Mentor names** in `team.html`
- **Sponsor names and logos** in `sponsors.html`
- **Outreach numbers** in `outreach.html`
- **Robot specs and photos** in `index.html` (the generic "How we build" section)
- **2025–26 DECODE season content** in `seasons/2025-26-decode.html` — robot photo, results, real notebook entries
- **Past season archives** — each placeholder in `seasons/` can be filled in over time
- **PayPal Donate button** in `donate.html` — see "The donate page" above
- **Federal EIN** in `donate.html` — currently `[Your team's EIN]`
- **Custom @team9960.org email** — currently shown as "coming soon" on contact.html. Set up [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/) (free) to forward `contact@team9960.org` to `team9960@gmail.com`, then update contact.html to display it as an active address.

None of these need to be done before going live. Ship the site and update content as it comes in.

---

## Troubleshooting

**I pushed a change but the site hasn't updated.**
Check Cloudflare Pages → Deployments. If the deploy succeeded, hard-refresh (Ctrl+Shift+R / Cmd+Shift+R) or try incognito mode.

**I broke something.**
Every commit is reversible. On github.com, go to the file → "History" → find the working version. Or revert the entire commit from the repo's commit history.

**Photos won't load.**
Filenames are case-sensitive on the live server. `Hero.jpg` and `hero.jpg` are different files. Also make sure paths in season pages start with `../images/` (not `images/`).

**A page looks fine on my computer but broken on phone.**
Use Chrome DevTools' "Toggle device toolbar" to preview mobile. Most issues are oversized images or text not wrapping.

---

## Where everything lives

| Thing | Where |
|---|---|
| Source code | GitHub: github.com/YOUR-USERNAME/team9960-website |
| Live site | team9960.org (served by Cloudflare Pages) |
| Domain registration | Cloudflare Registrar |
| DNS | Cloudflare |
| Photos | In the repo, under `images/` |
| Form submissions | Formspree (when configured) |
