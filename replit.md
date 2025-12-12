# Rooted Flowers by RS

A premium floral design website built with React, Express, and Vite.

## Overview

This is a full-stack application featuring:
- **Frontend**: React 19 with Vite, TailwindCSS, Radix UI components
- **Backend**: Express server with API endpoints
- **Styling**: TailwindCSS with custom animations

## Project Structure

```
├── client/               # Frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── pages/        # Page components
│   └── index.html        # Entry HTML file
├── server/               # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── static.ts         # Static file serving
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite dev middleware
├── shared/               # Shared types/schemas
│   └── schema.ts         # Database schema (Drizzle)
└── public/               # Static assets
```

## Development

The server runs on port 5000 and serves both the API and Vite-powered frontend.

**Run command:** `npx tsx server/index.ts`

## Build & Production

- Build: `npm run build` - Compiles the frontend to `dist/`
- The Express server serves static files from `dist/` in production mode

## Architecture Decisions

- Uses in-memory storage by default (no database required)
- Vite runs in middleware mode during development for HMR
- TailwindCSS v4 with the new Vite plugin
