# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CLAPBAC ("Clap Back") is a reverse Yelp prototype where restaurants can review and rate the reviewers who visit them. Built with React + Vite + Tailwind CSS.

**Live site:** https://clapbac.vercel.app (password protected)

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # Production build
npm run preview  # Preview production build
```

## Architecture

### Entry Point & Authentication
- `src/main.jsx` - App entry point wrapped in `PasswordGate` component for access control
- `src/components/PasswordGate.jsx` - Password protection using sessionStorage

### Routing (React Router v6)
- `/` - Home page with hero, stats, recent reviews
- `/browse` - Browse all reviewers with search/filter
- `/reviewer/:id` - Individual reviewer profile
- `/wall-of-fame` - Top-rated reviewers
- `/heads-up` - Problematic reviewers (low ratings)

### Data Layer (Mock Data)
All data is currently static mock data in `src/data/`:
- `reviewers.js` - Reviewer profiles with ratings, tags, handles
- `reviews.js` - Restaurant reviews of reviewers
- `restaurants.js` - Restaurant data (current user is "Bella Notte")

Key exports: `getReviewerById()`, `searchReviewers()`, `getRecentReviews()`

### Component Structure
- `src/pages/` - Route-level page components
- `src/components/` - Reusable UI components (Navbar, ReviewCard, ReviewerCard, SearchBar, StarRating, Avatar, TagBadge, WriteReviewModal)

### Styling
- Tailwind CSS with custom theme in `tailwind.config.js`
- Custom colors: `clapbac-gold`, `clapbac-navy`, `clapbac-coral`, `clapbac-mint`
- Custom utilities in `src/index.css`: `.btn-primary`, `.btn-secondary`, `.glass`, `.gradient-text`, etc.
- Fonts: Space Grotesk (display), Outfit (body), Sora (accent) - loaded via Google Fonts in `index.html`

## Deployment

Connected to Vercel - auto-deploys on push to `master` branch.
