# Event Booking Platform

A modern, multilingual event booking platform built with Next.js 16, featuring server-side rendering, internationalization (i18n), and comprehensive SEO optimization. The platform supports both English and Arabic languages with full RTL support.

## 🚀 Features

- **Multilingual Support**: Full i18n support for English and Arabic with RTL layout
- **Event Management**: Browse, search, and filter events by category, location, and date
- **Ticket Booking**: Secure ticket booking system with form validation
- **SEO Optimized**: Dynamic meta tags, Open Graph, Twitter Cards, JSON-LD structured data, and sitemap generation
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type-Safe**: Built with TypeScript for type safety
- **Server Actions**: Form submissions handled with Next.js Server Actions
- **Accessible**: Built with accessibility in mind using Radix UI components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **npm** 9.0 or later (or **yarn** / **pnpm**)

You can check your versions by running:

```bash
node --version
npm --version
```

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd my-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
BASE_API_URL=http://localhost:3000
```

For production, update this URLs to your domain:

```env
BASE_API_URL=https://yourdomain.com
```

## 🏃 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will automatically redirect to `/en` (English) or `/ar` (Arabic) based on your browser's language preferences.

### Production Build

1. **Build the application**

```bash
npm run build

```

2. **Start the production server**

```bash
npm start

```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
my-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── [locale]/          # Locale-aware routes
│   │   │   ├── events/        # Events listing and detail pages
│   │   │   ├── tickets/       # Tickets page
│   │   │   ├── layout.tsx     # Root layout with i18n provider
│   │   │   └── page.tsx       # Homepage (redirects to events)
│   │   ├── api/               # API routes
│   │   │   ├── events/        # Events API endpoints
│   │   │   ├── bookings/      # Booking API endpoints
│   │   │   └── tickets/       # Tickets API endpoints
│   │   ├── sitemap.ts         # Dynamic sitemap generation
│   │   └── robots.ts          # Robots.txt generation
│   ├── components/            # React components
│   │   ├── Booking/          # Booking-related components
│   │   ├── EventDetail/      # Event detail page components
│   │   ├── EventsGrid/       # Events grid and filtering components
│   │   ├── Tickets/         # Tickets page components
│   │   └── ui/              # Reusable UI components (Shadcn UI)
│   ├── hooks/               # Custom React hooks
│   ├── i18n/                # Internationalization configuration
│   │   ├── navigation.ts    # Locale-aware navigation utilities
│   │   ├── request.ts       # i18n request configuration
│   │   └── routing.ts        # Routing configuration
│   ├── lib/                 # Utility libraries
│   │   ├── api/             # API client functions
│   │   └── validations/     # Zod validation schemas
│   ├── messages/            # Translation files
│   │   ├── en.json          # English translations
│   │   └── ar.json          # Arabic translations
│   ├── mock/                # Mock data
│   │   ├── events.en.json   # English events data
│   │   ├── events.ar.json   # Arabic events data
│   │   └── tickets.json     # Mock tickets data
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── public/                  # Static assets
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🌐 Internationalization

The application uses `next-intl` for internationalization. Supported locales:

- **English (en)**: Default locale
- **Arabic (ar)**: Full RTL support

### Adding Translations

Translations are stored in `src/messages/`:

- `en.json` - English translations
- `ar.json` - Arabic translations

To add a new translation key:

1. Add the key to both `en.json` and `ar.json`
2. Use the translation in your component:

```tsx
import { useTranslations } from "next-intl";

function MyComponent() {
  const t = useTranslations("namespace");
  return <h1>{t("key")}</h1>;
}
```

### Language Switching

Users can switch languages using the language switcher in the navigation bar. The URL will update to reflect the selected language:

- English: `/en/events`
- Arabic: `/ar/events`

## 🔍 SEO Features

The platform includes comprehensive SEO optimization:

- **Dynamic Meta Tags**: Each page generates locale-aware meta tags
- **Open Graph**: Social media preview cards for all pages
- **Twitter Cards**: Optimized Twitter sharing
- **JSON-LD Structured Data**: Event schema markup for search engines
- **Sitemap**: Dynamic sitemap generation at `/sitemap.xml`
- **Robots.txt**: Proper crawling rules at `/robots.txt`
- **Hreflang Tags**: Language alternates for international SEO

## 🧪 API Endpoints

### Events

- `GET /api/events` - Get all events (supports `?locale=en` or `?locale=ar`)
- `GET /api/events/[slug]` - Get event by slug (supports `?locale=en` or `?locale=ar`)

### Bookings

- `POST /api/bookings` - Create a new booking

### Tickets

- `GET /api/tickets` - Get user tickets

## 🎨 Styling

The project uses **Tailwind CSS** for styling with **Shadcn UI** components. The design system includes:

- Responsive breakpoints
- Dark mode support (ready for implementation)
- RTL support for Arabic
- Accessible components

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Next.js Configuration

The `next.config.ts` file includes:

- `next-intl` plugin for i18n
- Image optimization configuration
- Remote image patterns

### TypeScript Configuration

The `tsconfig.json` includes:

- Path aliases (`@/*` → `./src/*`)
- Strict type checking
- Next.js plugin support

## 📚 Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Internationalization
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Radix UI** - Accessible component primitives
- **Shadcn UI** - Component library
- **date-fns** - Date manipulation
- **Lucide React** - Icon library

Built with ❤️ using Next.js
