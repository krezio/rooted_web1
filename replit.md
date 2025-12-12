# Rooted Flowers by RS

A premium floral design e-commerce website built with React, Express, and Vite.

## Overview

This is a full-stack application featuring:
- **Frontend**: React 19 with Vite, TailwindCSS, Radix UI components, Framer Motion animations
- **Backend**: Express server with API endpoints
- **Styling**: TailwindCSS v4 with custom animations and premium design

## Project Structure

```
├── src/                  # Frontend application
│   ├── components/       # React components
│   │   ├── cart/         # Shopping cart & checkout
│   │   ├── home/         # Homepage sections
│   │   ├── layout/       # Navbar, Footer
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components (home, shop, about, contact)
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── server/               # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── static.ts         # Static file serving
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite dev middleware
├── shared/               # Shared types/schemas
│   └── schema.ts         # Database schema (Drizzle)
├── attached_assets/      # Generated images
├── public/               # Static assets
└── index.html            # Entry HTML file
```

## Development

The server runs on port 5000 and serves both the API and Vite-powered frontend.

**Run command:** `npx tsx server/index.ts`

## Build & Production

- Build: `npm run build` - Compiles the frontend to `dist/`
- The Express server serves static files from `dist/` in production mode

## Features

### Collection Page
- Premium 3D tilt effect on product cards
- Category filtering with animated transitions
- Quick view modal for products
- Heart/wishlist button
- Elegant gradient overlays and animations

### Checkout Flow
- Multi-step checkout form
- Customer details (name, phone, email)
- Delivery details (emirate, area, full address)
- Date and time slot selection
- Optional: occasion, card message, special instructions
- Order summary and confirmation
- WhatsApp integration for order completion

### UI/UX
- Custom leaf cursor animation
- Smooth page transitions
- Premium preloader animation
- Responsive design for all devices
- Scroll progress indicator
- Glass morphism effects

### Footer
- Social media links (Instagram, WhatsApp, Email)
- Contact information with hours
- Elegant animations and hover effects

## WhatsApp Business
Orders are completed via WhatsApp at: +971 56 290 1494

## Architecture Decisions

- Uses in-memory storage by default (no database required)
- Vite runs in middleware mode during development for HMR
- TailwindCSS v4 with the new Vite plugin
- Framer Motion for all animations
- Zustand for cart state management with localStorage persistence
