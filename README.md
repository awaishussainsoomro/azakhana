# AzaKhana

**Every Noha. One place.**

AzaKhana is a full-stack streaming and discovery platform for Nohay (Islamic devotional audio/video), built to make it easy to find, organize, and listen to content by Nohakhan, occasion (Munasabat), and year all in one clean, fast, ad-free experience.

🔗 **Live site:** [your-deployed-url-here]

## Why This Exists

Existing Nohay platforms are often cluttered, poorly organized, or built as basic YouTube aggregators with no real structure. AzaKhana was built to solve a genuine discovery problem: finding a specific Noha by reciter, by occasion, or by year should take seconds, not endless scrolling.

## Features

- **Multi-path discovery** — browse by Nohakhan, by Munasabat (occasion), by year, or search directly with live filters
- **Year-wise Nohakhan profiles** — each reciter's catalog organized into collapsible year albums
- **Custom video player** — YouTube-embedded with a branded end-of-video overlay and "more from this Nohakhan" recommendations
- **Full admin panel** — password-protected content management for Nohakhans, Munasabat, and Nohay entries, including bulk import directly from YouTube playlists
- **Real-time view tracking** — powers a genuine Trending section based on actual engagement
- **Fully responsive** — dark-themed, mobile-first design with a sticky, blurred navigation bar

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB Atlas with Mongoose
- **Hosting:** Vercel
- **APIs:** YouTube Data API v3 (bulk playlist import), YouTube IFrame Player API (custom player controls)

## Architecture Highlights

- **ISR (Incremental Static Regeneration)** on high-traffic pages (Homepage, Nohakhan profiles, listing pages) for performance, while the Nohay player page stays fully dynamic to preserve accurate view counting
- **Many-to-many relationships** a single Nohay can belong to multiple Munasabat (occasions), reflecting real-world content that spans multiple religious dates
- **Debounced live search** with server-side filtering across title, Nohakhan name, and tags
- **Custom admin authentication** via HTTP-only session cookies, with every write-access API route independently verified not just gated at the page level

## Getting Started (Local Development)

```bash
git clone https://github.com/awaishussainsoomro/azakhana.git
cd azakhana
npm install
```

Create a `.env.local` file in the root with:
MONGODB_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
YOUTUBE_API_KEY=your_youtube_api_key

Then run:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Project Structure
src/
├── app/ # Pages and API routes (Next.js App Router)
│ ├── admin/ # Password-protected admin panel
│ ├── api/ # API routes (search, admin CRUD, YouTube integration)
│ ├── nohakhan/ # Dynamic Nohakhan profile pages
│ ├── nohay/ # Dynamic Nohay player pages
│ └── ...
├── components/ # Reusable UI components
├── lib/ # Database connection, YouTube helper utilities
└── models/ # Mongoose schemas (Nohakhan, Nohay, Munasabat)


## Roadmap

- Light mode toggle (dark theme currently default and only option)
- Direct reciter partnerships for original content hosting
- Expansion beyond Nohay to Majlis, Naat, and Qasida content

## Author

Built by [Awais Hussain](https://github.com/awaishussainsoomro) a full-stack learning project and a passion project for the Shia Muslim community.

---

*AzaKhana is an independent, community-focused platform. It is not affiliated with any specific Nohakhan, organization, or production house.*
