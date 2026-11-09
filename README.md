# The Angaar

Single-page, zero-backend website for **The Angaar** — a 100% pure vegetarian, charcoal-grilled tandoor house in Waluj, Chhatrapati Sambhajinagar.

Built with Vite + React, Tailwind CSS, GSAP (ScrollTrigger), Lenis smooth scroll and Lucide React.

## Run locally

Requires Node 22.12 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. In Vercel: **Add New → Project**, import the repo, click **Deploy**.

Vercel detects Vite automatically. `vercel.json` adds caching and security headers. Set the project's Node.js version to 22.x.

## Where to edit things

Almost all content lives in **`src/data/restaurant.js`**:

| What | Where in the file |
| --- | --- |
| Phone, address, WhatsApp, Maps, Instagram, opening hours | `brand` |
| Zomato link | `delivery` |
| The six hero dishes (name, price, photo, giant word) | `signatures` |
| Full menu (names, prices, chilli level, allergens, portion) | `menu` |
| Google review link | `brand.googleReviewHref` |
| Craft steps, "Behind the counter" video + facts, reviews, gallery | `craftSteps`, `making`, `reviews`, `gallery` |

### Feedback box (email + Google)

- **Feedback:** the form opens WhatsApp (`brand.whatsappNumber`) with the message pre-filled; the visitor just taps Send.
- **Google rating:** "Rate us on Google" opens the listing on Google Maps. For a direct review pop-up, find your Place ID (Google's Place ID Finder) and set `brand.googleReviewHref` to `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`.

### Before going live

- **Zomato:** the link in `delivery` currently opens a search for "The Angaar". Replace it with the real restaurant page URL.
- **Opening time:** only the 11:30 PM close was provided. `opensAt` is assumed to be 11:00 AM — correct it in `brand`.
- **Feedback email key and Google Place ID:** see above.
- **Menu allergens and portions:** these are not on the printed menu and are set per category as placeholders. Verify them.
- **Menu:** transcribed from `The_Angaar_New_Menu.pdf` (in `assets-original/new/`). The older printed board had different prices; the PDF is used. Cold coffee is not on the PDF menu so it is not listed.
- **Review authors:** the first two reviews are labelled "Google Reviewer" because no names were given.

## Images

- `public/images/` — images the site loads (served at `/images/...`). Some are crops from `feast-menu.jpg` (an illustrated poster), so they are illustrative, not photos of the actual dishes.
- `public/video/` — the kitchen video (about 10 MB) and its poster frame.
- `assets-original/` — untouched originals, kept for re-cropping. The site does not use this folder; delete it if you don't want it in the repo.

Some dish photos are low-resolution crops from the banner (`paneer-tikka.jpg`, `mushroom-tikka.jpg`, `veg-biryani.jpg`). Replace them with proper photos when available and update the paths in `src/data/restaurant.js`.

## Project structure

```
src/
  App.jsx                 page assembly, preloader gate
  data/restaurant.js      all content
  lib/                    GSAP setup, Lenis hook, open/closed hook
  components/
    Preloader.jsx         0–100% counter
    Showcase.jsx          pinned scroll-driven dish showcase (hero)
    Craft.jsx             marination → glaze process cards
    Standards.jsx         "What we eat, we serve" + gallery
    Making.jsx            "behind the counter" video + facts
    Menu.jsx              ledger, cursor-follow preview, detail modal
    Reviews.jsx           Google review cards
    Feedback.jsx          suggestion box (email) + Google rating link
    Footer.jsx            reservation CTA, address, delivery links
    DeliveryButtons.jsx   Zomato button
```

## Notes

- Animations respect `prefers-reduced-motion` (Lenis smooth scroll is disabled).
- On touch devices, swiping left/right in the hero jumps between dishes.
- The cursor-following menu preview only runs on devices with a fine pointer (desktop).
