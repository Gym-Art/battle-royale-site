# Battle Royal Marketing Site

A Next.js 14 marketing site for Battle Royal—the first professional gymnastics league.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Firebase Admin SDK credentials (required for analytics and email signups)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
  app/                      # Next.js App Router
    layout.tsx              # Root layout with fonts and metadata
    page.tsx                # Home page
    sponsors/page.tsx       # Sponsors info page
    rules/page.tsx          # Format & rules page
    about/page.tsx          # About page
    api/
      analytics/route.ts    # POST analytics events -> Firestore
      email-signup/route.ts # POST email signup -> Firestore

  components/
    layout/                 # Layout components
      PageLayout.tsx
      Header.tsx
      Footer.tsx
    sections/               # Page sections
      HeroSection.tsx
      ForAthletesSection.tsx
      ForSpectatorsSection.tsx
      ForSponsorsSection.tsx
      RulesSummarySection.tsx
      EmailSignupSection.tsx
    ui/                     # Reusable UI components
      Button.tsx
      TrackedLink.tsx
      EmailForm.tsx

  config/
    site.ts                 # Site metadata and configuration
    nav.ts                  # Navigation items
    campaigns.ts            # Campaign tracking IDs

  analytics/
    session.ts              # Session attribution and campaign tracking
    analytics.ts            # Event tracking functions

  server/
    firebaseAdmin.ts        # Firebase Admin SDK singleton
```

## Features

- **Email Waitlist**: Global signup form with campaign attribution
- **Analytics Tracking**: All interactions tracked to Firestore
- **Campaign Attribution**: Track traffic sources via `?campaign=` or `?from=` URL params
- **Responsive Design**: Mobile-first with Tailwind CSS
- **SEO Ready**: Metadata and Open Graph tags configured

## Firestore Collections

### `analytics_events`
- `name`: Event name (page_view, cta_click, etc.)
- `ts`: Timestamp
- `path`: Page path
- `sessionId`: Session identifier
- `campaignId`: Campaign attribution
- `meta`: Event-specific metadata
- `userAgent`: Browser user agent
- `ipHash`: SHA-256 hashed IP address

### `email_signups`
- `email`: Email address (lowercase, trimmed)
- `listId`: Target list identifier
- `sessionId`: Session identifier
- `campaignId`: Campaign attribution
- `ts`: Timestamp

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Firebase Admin SDK
- React 18

