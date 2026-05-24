# TTR-V1 Refactoring & Implementation Handoff

This document summarizes the architectural and logical changes made to the `V1-TTR` repository. It is intended to serve as context for future agents or developers working on this project.

## 1. Original State
The application began as a static, client-side React application (using Babel standalone) serving as a generic property booking template.
- **Data:** Contained mock properties spanning Bengaluru, Goa, Kerala, and Pondicherry with numerical pricing.
- **Booking Flow:** Included complex mathematical calculations for subtotals, GST (12%), and hosting fees.
- **UI:** Featured advanced search filters (price sliders, sorting algorithms, amenity chips) and generic placeholder pages for events and experiences.

## 2. Goal of Refactoring
The objective was to transform the template into a "Real-Time V1" prototype focused entirely on the **TempleAndTowns** properties. The primary functional shift was moving away from an automated e-commerce checkout flow to a highly personalized, manual **WhatsApp-driven booking request model** without publicly listed prices.

## 3. Key Changes Implemented

### Data Model (`data.js`)
- Replaced all template properties with the 4 actual properties:
  1. White Town 1BHK - 1st Floor
  2. White Town 1BHK - 2nd Floor
  3. White Town 2BHK - 1st Floor
  4. TempleAndTowns Nature Retreat (Auroville)
- Removed all numerical `price` and `from` values, replacing them with the string `"Request to book"`.
- Removed Bengaluru references completely.

### Search & Filtering (`components/home.jsx`, `components/search.jsx`)
- **Restored Core Search:** Kept the essential "Where, Check-in, Check-out, Guests" inputs to allow users to define their stay.
- **Removed Advanced Filters:** Stripped out the price slider, sort-by dropdown, and amenity chips to simplify the V1 user experience.
- **UI Tweaks:** Scaled down the boldness and size of property blurbs on the Property Screen for better readability. Removed redundant text like `"per night"` next to the new `"Request to book"` strings.

### Booking Flow (`components/booking.jsx`)
- **Logic Overhaul:** Removed all mathematical calculations (`subtotal`, `tax`, `total`).
- **WhatsApp Integration:** The `BookingWizard` now intercepts the user's selected room type, check-in dates, and guest count, and pipes this context directly into a pre-filled WhatsApp message.

### Experiences & Events (`components/account.jsx`)
- Removed leftover Bengaluru experiences from `ExperienceScreen`.
- Updated all numerical prices across the `ThingsScreen` and `ExperienceScreen` to say `"Request to book"`.

### Nature Retreat Landing Page (`components/retreat.jsx`)
- Created a brand-new, customized landing page specifically for the Auroville Nature Retreat.
- Features a beautiful UI with alternating image/text layouts for their specific curated events: *Experience Local Artisans, Garden Fun for Kids, Poolside Evenings, and Robotics & Creative Tech*.
- Registered this new component in `index.html` router (`screen === 'retreat'`) and updated the Navbar in `components/shell.jsx` to link to **"Nature Retreat"** instead of the generic "Events" page.

### Asset Architecture
- To support real property images, dedicated subdirectories were structured in the root for each property profile:
  - `images/1F-1BHK/` (For White Town 1BHK 1st Floor)
  - `images/2F-1BHK/` (For White Town 1BHK 2nd Floor)
  - `images/1F-2BHK/` (For White Town 2BHK 1st Floor)
  - `images/Auroville/` (For TempleAndTowns Nature Retreat)

### Detailed Room Configurations (`data.js`)
The application currently renders these specific rooms mapped to each property. Each room allows a direct "Request to book" pipeline.

**1. White Town 1BHK - 1st Floor (`p1`)**
- **Room:** 1BHK 1st Floor (Independent floor)
- **Capacity:** 3 Guests | 1 Queen + Living Room
- **Amenities:** Wi-Fi, Kitchen, Laundry, Balcony

**2. White Town 1BHK - 2nd Floor (`p2`)**
- **Room:** 1BHK 2nd Floor (Independent floor)
- **Capacity:** 3 Guests | 1 Queen + Living Room
- **Amenities:** Wi-Fi, Kitchen, Laundry, Balcony

**3. White Town 2BHK - 1st Floor (`p3`)**
- **Room:** 2BHK 1st Floor (Independent floor)
- **Capacity:** 5 Guests | 2 Queen + Living Room
- **Amenities:** Wi-Fi, Kitchen, Rajasthani Decor

**4. TempleAndTowns Nature Retreat (`p4`)**
- **Room A:** Nature Retreat Standard (Attached Bath)
  - Capacity: 2 Guests | 1 Queen
  - Amenities: Garden View, Pool Access
- **Room B:** Nature Retreat Twin (Attached Bath)
  - Capacity: 2 Guests | 2 Twin
  - Amenities: Garden View, Pool Access

## 4. Current Architecture Notes
- The application remains a static HTML/JS site.
- No build step is required (React/Babel run via CDN). It is tested and served locally using `npx serve`.
- State is managed globally in `index.html` via `App` state (e.g., `searchCtx`) and passed down to child components.
