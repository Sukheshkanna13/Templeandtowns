# Temple & Thorpe Resorts (TTR) — 5-Day UI/UX Change Log & Porting Guide
**Coverage Period:** October 27, 2026 – October 31, 2026  
**Source Branch:** `ui-revisions` (Up to commit `c7df546`)  
**Repository:** `Sukheshkanna13/Templeandtowns`  
**Target Audience:** Engineering team porting changes across branches (e.g. `main` or release branches)

---

## 1. Executive Summary

Over the last 5 days (Oct 27 to Oct 31, 2026), a total of **9 commits** were created and pushed to `ui-revisions`. These changes transform the application from a conceptual prototype into a production-ready, high-converting boutique resort website with:
1. **Real Nature Retreat Branding & Catalogues:** Updated title to `TEMPLEANDTHORPE NATURE RETREAT, NEAR AUROVILLE MATRIMANDIR`, added 10 core amenities, 4 new private room listings with direct Airbnb links, and an integrated page layout showing room catalogues at the top with the previous design showcase directly below.
2. **Prominent "Self-Service Boutique Stay" Disclosures:** Explicit notes, badges, and callout cards across all Airbnb booking buttons, room cards, and sidebar wizards explaining self-service kitchen, laundry, and shared retreat amenities.
3. **Comprehensive Legal & Host Support Pages:** Built `src/components/legal.jsx` (629 lines) implementing dedicated screens for Cancellation Policy, Terms & Conditions, Privacy Policy, Contact Host, and Sitemap, replacing all dead WhatsApp redirect links in the footer.
4. **Clean Production Polish & Disclaimers:** Removed all "AI IMAGINED" disclaimers, removed deprecated "Bougainvillea courtyards" / `temple-courtyard.png` assets, responsive hero `<picture>` with WebP crops, and default search to "Both cities".
5. **Hosting Compatibility & Zero White-Page Deployments:** Fixed Vite base path (`base: './'`) and Apache/LiteSpeed `.htaccess` client-side rewrite rules for reliable subfolder and shared-hosting deployments.

---

## 2. Git Commit Timeline (Chronological Order)

| # | Commit Hash | Date | Author | Summary | Key Files Touched |
|---|-------------|------|--------|---------|-------------------|
| 1 | `d9b4fe8` | 2026-10-27 | sukhesh kanna | `feat: real Nature Retreat hero photo + 4 new Auroville rooms` | `src/components/home.jsx`, `src/data.js`, `src/components/retreat.jsx`, `src/public/images/hero/*` |
| 2 | `ee671e6` | 2026-10-27 | sukhesh kanna | `feat: default search to Both cities and list Nature Retreat stays first` | `src/components/search.jsx`, `src/components/home.jsx`, `src/main.jsx` |
| 3 | `106e9d7` | 2026-10-27 | sukhesh kanna | `chore: remove AI-related phrases from website` | `src/components/home.jsx` |
| 4 | `b99160a` | 2026-10-27 | sukhesh kanna | `fix: make asset base and .htaccess relative for hosting compatibility` | `vite.config.js`, `src/public/.htaccess` |
| 5 | `adefc3d` | 2026-10-28 | sukhesh kanna | `feat: update Nature Retreat header, 10 core amenities, real-time space details, and Bougainvillea courtyards` | `src/data.js`, `src/components/retreat.jsx`, `src/components/search.jsx` |
| 6 | `c550b56` | 2026-10-28 | sukhesh kanna | `chore: remove Bougainvillea courtyards / temple-courtyard moment and image` | `images/temple-courtyard.png`, `src/components/home.jsx`, `src/components/shell.jsx` |
| 7 | `6f16577` | 2026-10-31 | sukhesh kanna | `feat: add comprehensive Cancellation Policy, Terms & Conditions, Privacy Policy, Contact Host, and Sitemap pages` | `src/components/legal.jsx`, `src/components/shell.jsx`, `src/main.jsx`, `src/components/booking.jsx` |
| 8 | `a89283d` | 2026-10-31 | sukhesh kanna | `feat: show Nature Retreat booking catalogues at top and previous design showcase as add-on below` | `src/components/retreat.jsx`, `src/components/search.jsx`, `src/components/shell.jsx` |
| 9 | `c7df546` | 2026-10-31 | sukhesh kanna | `feat: add Self-Service boutique stay notes and badges across Airbnb links and catalogues` | `src/data.js`, `src/components/search.jsx`, `src/components/retreat.jsx`, `src/components/home.jsx` |

---

## 3. Detailed UI / UX Changes by Screen & Feature

### 3.1. Airbnb Links & "Self-Service Boutique Stay" Disclosures
- **Requirement:** Airbnb listings explicitly state that TempleAndThorpe properties (Nature Retreat and White Town apartments) are self-service accommodations. Guests need clear forewarning regarding self-service kitchen, laundry, and shared facilities before redirecting to Airbnb.
- **Implementations:**
  1. **Property Details Screen (`src/components/search.jsx`):**
     - Added a `Self-Service Boutique Stay` pill badge beside the property eyebrow.
     - Below the **"Book now"** button, replaced plain redirect text with an informative callout box:
       > **Self-Service Boutique Stay Note:**  
       > *Please note: This is a self-service property (with self-service kitchen, laundry & shared facilities). You will be redirected to Airbnb / Booking.com to view live calendar availability and reserve.*
     - Added Airbnb domain regex matching (`/airbnb\.(com|co\.in)/`) so the button and notes dynamically identify "Airbnb".
     - In mobile sticky CTA bar: displays `Self-Service · Airbnb`.
  2. **Search Results Stays Cards (`src/components/search.jsx`):**
     - Added dark pill tag `Self-Service Stay` over stay image cards.
     - Bottom pricing row displays: `Self-service · Airbnb / Booking`.
  3. **Nature Retreat Screen (`src/components/retreat.jsx`):**
     - Header includes a banner: `🛡️ Note: 12-Room Self-Service Boutique Retreat · 2nd Floor Common Kitchen & Laundry`.
     - Each of the 5 room catalogue cards contains a `Self-Service Stay` tag and direct disclaimer: `Self-Service Boutique Stay · Airbnb / Booking`.
  4. **Home Page Featured Stays (`src/components/home.jsx`):**
     - Added `Self-Service` tag chip alongside city and rating tags.
  5. **Data Layer (`src/data.js`):**
     - Added `isSelfService: true` and `selfServiceNotice` string to all properties.
     - Updated `RETREAT_HOUSE_RULES` to explicitly list:  
       `"Self-Service stay: Common self-service kitchen (induction, microwave, fridge, utensils) and laundry on the 2nd floor"`.

---

### 3.2. Nature Retreat Screen Overhaul (`src/components/retreat.jsx`)
- **Dual Section Layout:**
  1. **Top Section — Booking Room Catalogues:**
     - Displays all 5 available room options:
       - General Retreat listing (`p4` on Booking.com)
       - Room 206, 1st Floor (`p5` on Airbnb)
       - Room 205, 1st Floor (`p6` on Airbnb)
       - Room 106, Ground Floor (`p7` on Airbnb)
       - Room 105, Ground Floor (`p8` on Airbnb)
     - Each card features: cover photo, location/floor badge, `Self-Service Stay` tag, star rating, blurb, room amenities chips, "Room Details" button, "Book now" button with direct Airbnb / Booking redirection.
     - Quick anchor link: *"Jump to about retreat & amenities ↓"*.
  2. **Bottom Section — Previous UI/UX Showcase (`NatureRetreatShowcase`):**
     - Preserves the previous rich UI/UX as an add-on below the room list:
       - Hero section with quick stats (12 rooms, 1 acre land, 7am-8pm pool).
       - 10 core amenities showcase (High Speed Internet, Pool Area, Common Kitchen, Laundry, Library, Game Area, Parking, Power Backup, Cactus Garden, Lily Pond).
       - Tabbed specifications (In-Room, Shared Retreat, House Rules & Notes).
       - Experiences nearby (Matrimandir, cycling trails, Auroville bakeries).
       - Developing garden & retreat gallery.
       - Bottom CTA banner with direct booking triggers.
- **Header & Branding:**
  - Real-time Title: `TEMPLEANDTHORPE NATURE RETREAT, NEAR AUROVILLE MATRIMANDIR`.
  - Subtitle: *"12 room boutique stay amidst natural settings, with green forest backdrops, swimming pool and developing garden..."*

---

### 3.3. Legal & Host Support Pages (`src/components/legal.jsx`)
Created a comprehensive, 629-line legal and guest assistance suite:
1. **Cancellation Policy (`#/cancellation`):**
   - Differentiates between **Airbnb Bookings** (governed by Airbnb's Moderate/Firm policies, automated refund processing) and **Direct WhatsApp Concierge Bookings** (free cancellation up to 48 hours, 50% refund >7 days, force majeure protections).
   - Visual step-by-step timeline cards for cutoff windows.
   - Interactive policy tabs, FAQ accordion, and direct WhatsApp cancellation inquiry trigger.
2. **Terms & Conditions (`#/terms`):**
   - Detailed guest rules: Check-in at 14:00, Check-out at 11:00.
   - Self-service kitchen & laundry conduct rules (induction use, clean-up, terrace drying).
   - Quiet hours from 10:00 PM to 07:00 AM.
   - Swimming pool rules: mandatory pre-shower, striped towels, proper swimwear, open 7:00 AM – 8:00 PM.
   - Strict no smoking, no drugs, and gate closure policy (prevent roaming animals).
   - Governing law: Pondicherry jurisdiction.
3. **Privacy Policy (`#/privacy`):**
   - Guest data collection breakdown (names, phone, dates, WhatsApp communication).
   - Platform integration policies (Airbnb and Booking.com).
   - Security standards and zero-selling guest data guarantee.
4. **Contact Host (`#/contact`):**
   - Direct host phone (+91 98940 18888) and WhatsApp concierge (+91 94879 66688).
   - Email: `contact@templeandtowns.com`.
   - Property address cards for White Town (Pondicherry) and Nature Retreat (Auroville).
   - Working guest inquiry form with direct WhatsApp dispatch.
5. **Sitemap (`#/sitemap`):**
   - Complete architectural index linking to all stays, destinations, retreat features, and legal documents.

---

### 3.4. Navigation & Shell Layout (`src/components/shell.jsx`)
- **Navbar Links:**
  - "Nature Retreat" now links directly to `#/retreat` so users can instantly view the room catalogues.
- **Footer Revamp:**
  - Replaced all placeholder WhatsApp links with proper in-app hash routes:
    - `#/cancellation` (Cancellation Policy)
    - `#/terms` (Terms & Conditions)
    - `#/privacy` (Privacy Policy)
    - `#/contact` (Contact Host)
    - `#/sitemap` (Sitemap)
- **Booking Wizard Integration (`src/components/booking.jsx`):**
  - Updated booking step 3 agreement checkbox: "Terms & Conditions" and "Cancellation Policy" are now clickable links opening their respective pages in-app.

---

### 3.5. Home Page & Media Polish (`src/components/home.jsx`)
- **Hero Image Upgrade:**
  - Replaced stock resort graphic with real high-resolution Nature Retreat photo (`images/hero/hero-desktop.webp` and `images/hero/hero-mobile.webp`).
  - Implemented responsive HTML5 `<picture>` element for crisp, fast rendering on desktop and mobile.
- **Search Destination Default:**
  - Initialized default search dropdown to "Both cities" so visitors see Nature Retreat and White Town stays without having to toggle filters.
- **Removal of "AI IMAGINED" Phrases:**
  - Removed all "AI IMAGINED" badges and disclaimers from the Moments carousel.
- **Removal of Deprecated "Bougainvillea courtyards":**
  - Completely purged "Bougainvillea courtyards" / `temple-courtyard.png` moment and deleted unneeded asset files.

---

### 3.6. Build & Hosting Compatibility (`vite.config.js`, `.htaccess`)
- **Relative Base Path in Vite:**
  - Set `base: './'` in `vite.config.js`. Prevents 404 errors for `/assets/index-*.js` and `/assets/index-*.css` when deployed under subdirectories or non-root paths on cPanel/Hostinger.
- **Apache/LiteSpeed Client-Side Routing:**
  - Configured `src/public/.htaccess` with `RewriteRule . index.html [L]` so direct page reloads and hash routing load smoothly without server 404s.

---

## 4. File-by-File Summary of Changes

| File Path | Status | Net Lines | Description of Changes |
|-----------|--------|-----------|------------------------|
| `src/components/legal.jsx` | **Created** | +629 | Cancellation, Terms, Privacy, Contact, and Sitemap screens |
| `src/components/retreat.jsx` | **Modified** | +377 / -35 | Room catalogues at top, showcase below, self-service note |
| `src/data.js` | **Modified** | +158 / -12 | 10 amenities, 4 new rooms, Airbnb links, self-service rules |
| `src/components/search.jsx` | **Modified** | +105 / -8 | Both cities default, self-service badges, booking note card |
| `src/components/shell.jsx` | **Modified** | +43 / -15 | Nature Retreat direct link, footer legal routes |
| `src/components/home.jsx` | **Modified** | +16 / -12 | Real hero picture, removed AI text, removed temple courtyard |
| `src/main.jsx` | **Modified** | +16 / -6 | Added hash routes for cancellation, terms, privacy, contact, sitemap |
| `src/components/booking.jsx` | **Modified** | +7 / -2 | Clickable legal links in agreement checkbox |
| `src/components/events.jsx` | **Modified** | +4 / -2 | Router link adjustments |
| `vite.config.js` | **Modified** | +2 / -2 | `base: './'` for hosting portability |
| `src/public/.htaccess` | **Modified** | +3 / -2 | Relative SPA rewrite rule for Apache/LiteSpeed |
| `src/styles.css` | **Modified** | +7 / -0 | Responsive hero picture styling |
| `src/public/images/hero/*` | **Added** | Binary | Optimized desktop & mobile hero WebP/JPG assets |
| `images/hero-section-final.jpeg` | **Added** | Binary | Master hero photo asset |
| `src/public/images/temple-courtyard.png` | **Deleted** | Binary | Purged deprecated image asset |
| `images/temple-courtyard.png` | **Deleted** | Binary | Purged deprecated image asset |

---

## 5. Step-by-Step Porting Instructions (Carrying to Another Branch)

To incorporate these changes cleanly into another branch (e.g. `main` or a feature branch), follow one of the methods below:

### Option A: Merge the Entire `ui-revisions` Branch (Recommended)
This carries all 9 commits along with complete git history:
```bash
# 1. Ensure you have the latest remote branches
git fetch origin

# 2. Switch to your target branch (e.g., main)
git checkout main

# 3. Pull latest changes on target branch
git pull origin main

# 4. Merge ui-revisions
git merge origin/ui-revisions -m "chore: merge 5-day UI/UX revisions from ui-revisions"

# 5. Build and verify
npm run build

# 6. Push to remote
git push origin main
```

---

### Option B: Cherry-Pick the Specific Commits
If you only want these specific 9 commits without merging branches:
```bash
# 1. Switch to your target branch
git checkout <your-target-branch>

# 2. Cherry-pick each commit in chronological order:
git cherry-pick d9b4fe8  # Real Nature Retreat hero photo + 4 new Auroville rooms
git cherry-pick ee671e6  # Default search to Both cities
git cherry-pick 106e9d7  # Remove AI-related phrases
git cherry-pick b99160a  # Relative asset base & .htaccess
git cherry-pick adefc3d  # Retreat header, 10 amenities, space details
git cherry-pick c550b56  # Remove Bougainvillea courtyards / image
git cherry-pick 6f16577  # Cancellation, Terms, Privacy, Contact, Sitemap
git cherry-pick a89283d  # Nature Retreat room catalogues + showcase add-on
git cherry-pick c7df546  # Self-Service boutique stay notes across Airbnb links

# 3. Verify build
npm run build
```

---

### Option C: Single Patch Application
If you want to apply all 5-day changes as a single cohesive working diff:
```bash
# 1. Create a patch from the base commit to HEAD:
git diff d9b4fe8~1..c7df546 > /tmp/tt2_ui_5days.patch

# 2. Switch to your target branch:
git checkout <your-target-branch>

# 3. Apply the patch:
git apply /tmp/tt2_ui_5days.patch

# 4. Verify working tree and build:
npm run build

# 5. Commit the changes:
git add .
git commit -m "feat(ui): incorporate 5-day UI/UX overhaul (Nature retreat catalogues, legal pages, self-service notes)"
```

---

## 6. Build & Verification Checklist

Before deploying the ported branch:
1. **Production Build:** Run `npm run build` and ensure `dist/index.html`, `dist/assets/*.js`, and `dist/assets/*.css` compile with zero errors.
2. **Page Navigation Checks:**
   - [x] `#/` (Home): Real hero image displays, no "AI" text in Moments carousel, "Self-Service" tag on stays.
   - [x] `#/retreat` (Nature Retreat): 5 room catalogues show at the top with "Self-Service Stay" tags; showcase section appears below with 10 core amenities.
   - [x] `#/search` (Search): Defaults to "Both cities"; shows all stays with Self-Service tags.
   - [x] `#/property` (Property Details): Shows "Self-Service Boutique Stay" callout box below "Book now" button.
   - [x] `#/cancellation` (Cancellation Policy): Loads full policy with Airbnb vs direct comparisons.
   - [x] `#/terms` (Terms & Conditions): Loads full house rules, quiet hours, pool rules.
   - [x] `#/privacy` (Privacy Policy): Loads complete privacy disclosures.
   - [x] `#/contact` (Contact Host): Displays phone, WhatsApp concierge, and inquiry form.
   - [x] `#/sitemap` (Sitemap): Direct links to all routes.
3. **Airbnb Redirect Test:** Clicking "Book now" on Room 105, 106, 205, or 206 opens the respective `https://www.airbnb.co.in/rooms/*` URL in a new tab.
