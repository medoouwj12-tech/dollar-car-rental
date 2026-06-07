# Dollar Car Rental | دولار لإيجار السيارات

Premium luxury car rental web application built with Next.js 15, React 19, Tailwind CSS, and Framer Motion.

## Features

- **Premium Dark/Light Mode** — Glassmorphic UI with black & gold luxury palette
- **Bilingual (AR/EN)** — Full RTL/LTR support with natural Arabic translations
- **Dynamic Fleet** — Mock database with 8 premium vehicles
- **Booking System** — Filter by brand, type, price + interactive booking modal
- **Admin Dashboard** — CRUD operations for fleet management
- **Animations** — Parallax hero, hover effects, smooth transitions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** Tailwind CSS + Framer Motion
- **State:** React Context (Cars, Theme, Locale)
- **Icons:** Lucide React
- **Fonts:** Inter (EN) + Cairo (AR)

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # UI components
│   ├── admin/        # Fleet management dashboard
│   ├── booking/      # Booking modal
│   ├── fleet/        # Car cards & filters
│   ├── layout/       # Navbar, Footer
│   └── sections/     # Hero, Fleet, About
├── context/          # Global state providers
├── data/             # Initial mock car data
├── i18n/             # Translations (AR/EN)
└── types/            # TypeScript interfaces
```

## Scripts

| Command       | Description          |
|---------------|----------------------|
| `npm run dev` | Start dev server     |
| `npm run build` | Production build   |
| `npm run start` | Start production   |
| `npm run lint`  | Run ESLint         |
