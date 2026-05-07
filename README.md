# Team 9960 — Website Source

This folder contains the complete source code for **team9960.org**. It's a static site (plain HTML, CSS, and a tiny bit of JavaScript) — no database, no WordPress, no server-side anything.

## File map

```
team9960/
├── index.html        — Home
├── team.html         — Roster & mentors
├── notebook.html     — Engineering notebook (hardware, software, strategy)
├── outreach.html     — Community outreach & STEM events
├── sponsors.html     — Sponsorship tiers & in-kind options
├── contact.html      — Contact form & recruiting info
├── styles.css        — All site styling (one file, every page uses it)
├── reveal.js         — Tiny script that fades sections in on scroll
├── images/           — All photos live here
│   └── hero.jpg
└── README.md         — This file
```

## Design at a glance

- **Palette:** deep navy (#0B1729) + warm amber (#D97706) on a bone/cream background (#F5F1E8).
- **Type:** Fraunces (italic display), Manrope (body), JetBrains Mono (technical labels).
- **Aesthetic:** editorial-engineering — like a technical journal. Generous whitespace. Photo-driven.
- **Motion:** subtle. Sections fade and lift on scroll. Respects users' reduced-motion settings.

To preview locally, just double-click `index.html`. It opens in your default browser. No build step needed.

---

## How the site is hosted

The site lives in a GitHub repository. **Cloudflare Pages** watches that repository — every time someone pushes a change to GitHub, Cloudflare automatically rebuilds and publishes the site at team9960.org within ~30 seconds.

Cost: **$0/month**. Both GitHub and Cloudflare Pages are free for sites this size.

```
You edit a file  →  push to GitHub  →  Cloudflare publishes it  →  team9960.org updates
```

---

## How to update the site

### Option A: Edit on github.com (easiest, no software needed)

1. Go to the repository on github.com.
2. Click the file you want to change (e.g. `team.html`).
3. Click the pencil icon ("Edit this file") in the top right.
4. Make your changes in the browser.
5. Scroll down. Write a short note about what you changed (e.g. "Add new sponsor: Acme Corp").
6. Click "Commit changes."

The site updates automatically within a minute.

### Option B: Edit locally with VS Code (better for big changes)

1. **One-time setup:** Install [VS Code](https://code.visualstudio.com/) and [Git](https://git-scm.com/). Then in a terminal:
   ```
   git clone https://github.com/YOUR-USERNAME/team9960-website.git
   cd team9960-website
   code .
   ```
2. **For each change:**
   - Edit files in VS Code.
   - Save (Cmd/Ctrl+S).
   - Preview by opening `index.html` in your browser.
   - When ready to publish, in VS Code's terminal:
     ```
     git add .
     git commit -m "Short description of change"
     git push
     ```
3. Cloudflare deploys automatically. Done.

### Option C: GitHub Desktop (middle ground)

If terminal commands feel intimidating, install [GitHub Desktop](https://desktop.github.com/). Same workflow as Option B but with buttons instead of typing.

---

## Common updates — recipes

### Add a photo

1. Drop the photo file into `images/` (rename it something simple — `team-photo-2026.jpg`, not `IMG_4729.jpeg`).
2. In the relevant HTML file, find the photo slot you want to fill. It looks like:
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
4. Save, commit, push. The CSS handles cropping automatically.

**Photo aspect ratios used in the site:**
- Hero photo: **4:5 vertical**
- Photo strip below hero: **4:5 vertical** (three of them)
- Robot section: **1:1 square**
- Gallery: mixed (one 1:1 feature, plus 1:1 squares and 2:1 wides)
- Member cards (team.html): **1:1 square**

### Add a roster member

In `team.html`, find the `.roster` div and copy one of the existing `.member` blocks. Replace the role, name, focus text, and id number. Add a photo if you have one.

### Add a notebook entry

In `notebook.html`, find the appropriate `.entry-list` (Hardware, Software, or Strategy) and add a new `.entry` row. Pattern:
```html
<div class="entry">
  <div class="entry-date">2026.03.14</div>
  <div>
    <div class="entry-title"><a href="#">Title goes here</a></div>
  </div>
  <div class="entry-tag">Category</div>
</div>
```

To make the entry a real article, you'd create a new HTML page (e.g. `notebook/2026-03-14-pi-pivot.html`) and replace the `#` in the `href` with the path.

### Add or remove a sponsor

In `sponsors.html`, each tier has a `.sponsor-grid` with placeholder boxes. Replace the text with a sponsor name, or replace the entire `<div class="sponsor">[Sponsor Logo]</div>` block with:
```html
<div class="sponsor">
  <img src="images/sponsors/acme-logo.png" alt="Acme Corp" style="max-width: 100%; max-height: 100%;">
</div>
```

### Update copy / fix a typo

Just open the relevant `.html` file, find the text, change it. HTML is forgiving — as long as you don't break the angle-bracket tags around the text, you can rewrite freely.

---

## The contact form

The form on `contact.html` is currently a placeholder. It looks real but submissions go nowhere. To wire it up:

1. Sign up for **[Formspree](https://formspree.io)** (free for ~50 submissions/month).
2. Formspree gives you a form endpoint URL like `https://formspree.io/f/abc12345`.
3. In `contact.html`, find the `<form>` tag and change:
   ```html
   <form onsubmit="event.preventDefault(); alert('...');">
   ```
   to:
   ```html
   <form action="https://formspree.io/f/abc12345" method="POST">
   ```
4. Commit, push. Form submissions now arrive in the email tied to your Formspree account.

Alternatives: Netlify Forms (if you ever switch hosts), Web3Forms (free, no signup), or your own backend.

---

## Things that need replacing before going fully live

- **Roster names** in `team.html` — placeholders marked `[Student Name]` / `[Mentor Name]`.
- **Sponsor names & logos** in `sponsors.html` — placeholders marked `[Sponsor Logo]`.
- **Contact email** in `contact.html` — currently `contact@team9960.org`. Change if needed.
- **Outreach numbers** in `outreach.html` — placeholder counts. Replace with real season totals.
- **Notebook entries** in `notebook.html` — placeholders. Link each to real articles when written.
- **Robot specs** in `index.html` — under "The Robot" section. Update to match this season's actual machine.
- **Contact form backend** — see above.

---

## Troubleshooting

**I pushed a change but the site hasn't updated.**
Check Cloudflare Pages dashboard → Deployments. You'll see the deploy status. Most issues here are just caching — hard-refresh (Ctrl+Shift+R / Cmd+Shift+R) or try incognito.

**I broke something and the site looks weird.**
Every commit can be reverted. On github.com, go to the file, click "History," find the version that worked, click "..." → "View at this point" → copy the content back into the current file. Or revert the entire commit from the repo's commit history. Nothing is ever permanently lost.

**The photos won't load.**
Check the filename matches exactly (case-sensitive on the live server, even if it works on Mac/Windows). `Hero.jpg` and `hero.jpg` are different files online.

**A page looks fine on my computer but broken on phone.**
The site is responsive, but if you've added new content, check the browser's mobile preview (Chrome DevTools → "Toggle device toolbar"). Most issues are oversized images or text not wrapping — easy fixes.

---

## If multiple people will edit the site

Use GitHub's normal collaboration features:
- Add collaborators to the repo (Settings → Collaborators).
- For bigger changes, have contributors open a **pull request** rather than pushing directly. This lets someone else review the change before it goes live.
- Cloudflare Pages will automatically build a **preview deploy** for every pull request — a temporary URL where you can see how the change will look without affecting team9960.org.

This is genuinely useful for student webmasters: they can propose changes, you can review and approve, nothing breaks the live site.

---

## Where everything lives, summarized

| Thing | Where |
|---|---|
| Source code | GitHub: github.com/YOUR-USERNAME/team9960-website |
| Live site | team9960.org (served by Cloudflare Pages) |
| Domain registration | Hostinger (or wherever you registered it) |
| DNS | Either Hostinger or Cloudflare (you'll pick during setup) |
| Email @team9960.org | Hostinger (separate from the website) |
| Photos | In the repo, under `images/` |
| Form submissions | Formspree (or whatever backend you wired up) |

---

## Questions / problems

Keep this README updated as the site evolves. Future-you will thank present-you.
