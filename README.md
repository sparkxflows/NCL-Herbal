# NLC Herbal - Healthcare & Ayurvedic E-Commerce Platform

A modern, full-stack Next.js web application for **NLC Herbal (Natural Life Care Centre)**, offering Ayurvedic doctor consultations, herbal product shopping, interactive dosha/wellness journals, and appointment booking.

---

## 🌿 Overview & Key Features

- **Doctor Consultation Booking**: Interactive directory of Ayurvedic specialists with direct appointment scheduling and slot selection.
- **Herbal E-Commerce Store**: Filterable product catalog (categories, dosha balance, rating), modal view, cart drawer, and order processing.
- **Wellness Journal**: Health articles, dosha guides, diet tips, and Ayurvedic lifestyle recommendations.
- **Zero-Friction Local Run**: Built-in fallback to seed data so the entire project runs and builds instantly with or without a PostgreSQL database.
- **Cart & Wishlist**: Session-persistent cart and local wishlist management.
- **Contact & Newsletter**: Direct message submission and email subscription forms.

---

## 📁 Project Directory Structure

```text
├── src/
│   ├── app/                      # Next.js App Router (Pages & API endpoints)
│   │   ├── about/                # About Us page
│   │   ├── api/                  # Backend REST API routes
│   │   │   ├── appointments/     # Appointment booking handler
│   │   │   ├── cart/             # Shopping cart operations (GET, POST, PATCH, DELETE)
│   │   │   ├── contact/          # Contact form handler
│   │   │   ├── health/           # Healthcheck endpoint
│   │   │   └── newsletter/       # Newsletter subscription handler
│   │   ├── consult-a-doctor/     # Doctor consultation & booking page
│   │   ├── contact/              # Contact us page
│   │   ├── shop/                 # Herbal products storefront
│   │   ├── wellness-journal/     # Health and wellness blog/articles
│   │   ├── globals.css           # Global Tailwind CSS styling
│   │   ├── layout.tsx            # Root layout with Header, Footer, and StoreProvider
│   │   └── page.tsx              # Homepage
│   │
│   ├── components/               # Modular UI Components
│   │   ├── cards/                # Doctor & Product cards
│   │   ├── consult/              # Doctor directory & filters
│   │   ├── contact/              # Contact form component
│   │   ├── home/                 # Homepage sections & appointment widget
│   │   ├── layout/               # Header, Footer, Navigation
│   │   ├── sections/             # Testimonials, TrustStrip, etc.
│   │   ├── shop/                 # Shop buttons and category filters
│   │   ├── store/                # CartDrawer, ProductModal, DoctorModal, Toasts
│   │   ├── ui/                   # Carousel, Logo, Section, Stars, SocialIcons
│   │   └── wellness/             # Topic explorer & article viewer
│   │
│   ├── db/                       # Database Configuration & Schema
│   │   ├── index.ts              # Resilient Drizzle ORM client with safe fallback
│   │   └── schema.ts             # PostgreSQL schema definition
│   │
│   └── lib/                      # Core Utilities & Data
│       ├── data.ts               # Data access layer with fallback support
│       ├── dates.ts              # Date formatting utilities
│       ├── map.ts                # Data mapping helpers
│       ├── seed-data.ts          # Default mock data (doctors, products, articles)
│       ├── session.ts            # User session cookies
│       └── types.ts              # TypeScript type definitions
│
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore specifications
├── drizzle.config.json           # Drizzle ORM configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies & scripts
└── tsconfig.json                 # TypeScript configuration
```

---

## 🚀 Quick Start (Local Run)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🗄️ Database Setup (Optional)

If you have a PostgreSQL database and wish to persist data to the database:
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set your `DATABASE_URL` in `.env.local`:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/nlc_herbal
   ```
3. Push schema to database:
   ```bash
   npx drizzle-kit push
   ```

*Note: If `DATABASE_URL` is omitted, the application runs entirely in memory with seed data, suitable for local preview and development without setting up Postgres.*
