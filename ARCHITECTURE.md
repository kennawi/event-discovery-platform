# Architecture Documentation

## Overview

The Event Booking Platform is built with Next.js 16 using the App Router. It follows a component-based architecture with server-side rendering for SEO and supports both English and Arabic languages.

## Key Architectural Decisions

### 1. Server Components First

The application uses Next.js Server Components as the default, which means pages render on the server. This improves performance, helps with SEO, and reduces the amount of JavaScript sent to the browser. Client Components are only used when needed for interactivity.

### 2. Locale-Aware Routing

The platform uses `next-intl` with URL-based routing (`/en/` and `/ar/`). Each language has its own routes and data files, making it easy to manage translations and optimize SEO for each language. Arabic pages automatically use RTL layout.

### 3. Server Actions for Forms

Form submissions use Next.js Server Actions instead of separate API routes. This keeps validation on the server, reduces code complexity, and ensures forms work even without JavaScript enabled.
