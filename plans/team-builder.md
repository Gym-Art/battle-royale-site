# Cursor system prompt – Battle Royal Team Builder

You are building a small standalone web app ("Team Builder") for the Battle Royal league.

The goal:  
Create a collaborative "brand kit + roster" playground where athletes/coaches/judges can create and share Battle Royal teams. No registration/payment logic. It's a fun pre-registration environment that later can be imported into the real Gym Art Meets system.

---

## Implementation Status

**Completed Tasks: 1-4, 12** ✅

### ✅ Task 1 – Firebase wiring (COMPLETED)
**Location:** `src/lib/firebase/client.ts`, `src/types/battleRoyale*.ts`

**Implementation Details:**
- Created Firebase client SDK initialization in `src/lib/firebase/client.ts`
  - Exports `auth`, `firestore`, `storage` instances
  - Client-side only initialization with `typeof window` checks
  - Uses environment variables: `NEXT_PUBLIC_FIREBASE_*`
- Created TypeScript types (all prefixed with `BattleRoyale`):
  - `src/types/battleRoyaleTeam.ts` - `BattleRoyaleTeam`, `BattleRoyaleTeamBrandKit`, `BattleRoyaleTeamIdentity`, `BattleRoyaleTeamCompletionSummary`
  - `src/types/battleRoyaleUser.ts` - `BattleRoyaleUserProfile` (matches Gym Art Meets pattern)
  - `src/types/battleRoyaleMembership.ts` - `BattleRoyaleTeamMembership`
- **Data Model Decisions:**
  - User profiles stored in `gym_art_users` collection (shared with Gym Art Meets)
  - Document ID pattern: `USER_{uid}` (matches existing Gym Art Meets pattern)
  - All Battle Royale-specific data under `battleRoyale/` collection:
    - `battleRoyale/teams/{teamId}`
    - `battleRoyale/teamMemberships/{membershipId}`

### ✅ Task 2 – Auth and basic layout (COMPLETED)
**Location:** `src/app/team-builder/layout.tsx`, `src/app/team-builder/login/page.tsx`, `src/components/team-builder/auth/`, `src/components/team-builder/layout/`

**Implementation Details:**
- Created `src/lib/firebase/auth.ts` with helper functions:
  - `signIn()`, `signUp()`, `signInWithGoogle()`, `signOut()`, `getCurrentUser()`, `onAuthStateChange()`
- Created `src/lib/firestore/battleRoyaleUsers.ts`:
  - `getBattleRoyaleUserProfile()`, `createBattleRoyaleUserProfile()`, `autoSignInBattleRoyaleUser()`
  - Auto-creates user profile on first login (matches Gym Art Meets `autoSignIn()` pattern)
- Auth pages:
  - `src/app/team-builder/login/page.tsx` - Combined login/signup page with email/password and Google OAuth
  - `src/components/team-builder/auth/LoginForm.tsx` - Email/password login form (React Hook Form + Zod)
  - `src/components/team-builder/auth/SignupForm.tsx` - Email/password signup form
  - `src/components/team-builder/auth/GoogleAuthButton.tsx` - Google OAuth button
- Layout components:
  - `src/app/team-builder/layout.tsx` - Root layout with `AuthGuard` wrapper (client component)
  - `src/components/team-builder/layout/AuthGuard.tsx` - Redirects to `/team-builder/login` if not authenticated
  - `src/components/team-builder/layout/TeamBuilderLayout.tsx` - Main layout with header, user menu, logout button
- Error handling:
  - `src/app/error.tsx`, `src/app/not-found.tsx` - Root error boundaries
  - `src/app/team-builder/error.tsx`, `src/app/team-builder/not-found.tsx` - Team builder error boundaries
- Routes marked as `dynamic = 'force-dynamic'` to prevent SSR issues with Firebase client SDK

### ✅ Task 3 – "No team yet" playground + create team (COMPLETED)
**Location:** `src/app/team-builder/page.tsx`, `src/components/team-builder/dashboard/NoTeamPlayground.tsx`, `src/lib/random/`, `src/lib/firestore/battleRoyaleTeams.ts`

**Implementation Details:**
- Created `src/lib/random/names.ts`:
  - `generateTeamName()` - Deterministic team name generator with patterns: `[Adjective] [Animal]`, `[Color] [MythCreature]`, `[Intensity] [Object]`
  - `generateMascotKeyword()` - Generates mascot keywords
- Created `src/lib/random/colors.ts`:
  - `generateRandomColorPalette()` - Seed-based color palette generation (hue rotation/complementary schemes)
  - `hashString()` - Helper for deterministic color generation from team name
- Created `src/lib/random/logos.ts`:
  - `suggestLogoStyle()`, `suggestFontFamily()`, `generateLogoText()`, `getRandomMascotEmoji()`
  - Logo style suggestions based on name length and mascot keyword
- Created `src/lib/firestore/battleRoyaleTeams.ts`:
  - `createBattleRoyaleTeam()` - Creates team with slug generation and collision handling
  - `getBattleRoyaleTeamBySlug()`, `getBattleRoyaleTeamById()` - Team retrieval
  - `generateUniqueSlug()` - Creates URL-safe slugs from team names
- Created `src/lib/firestore/battleRoyaleTeamMemberships.ts`:
  - `createBattleRoyaleTeamMembership()` - Creates owner membership on team creation
  - `getBattleRoyaleTeamMembershipsByUserId()` - Gets user's team memberships
- Dashboard components:
  - `src/app/team-builder/page.tsx` - Main dashboard (shows playground if no teams, otherwise shows team lists)
  - `src/components/team-builder/dashboard/NoTeamPlayground.tsx` - Randomized team preview with editable fields (name, colors, mascot, tagline) and "Save this team" modal
  - `src/components/team-builder/dashboard/TeamCard.tsx` - Reusable team card component with logo preview
- Team creation flow:
  - User can edit randomized team suggestion
  - "Save this team" opens modal with required fields validation
  - Creates `BattleRoyaleTeam` with `status="brand-only"` and `isPublic=false`
  - Creates `BattleRoyaleTeamMembership` for owner (`role="owner"`, `canEdit=true`)
  - Redirects to team dashboard after creation

### ✅ Task 4 – My Teams and Public Teams (COMPLETED)
**Location:** `src/components/team-builder/dashboard/MyTeamsList.tsx`, `src/components/team-builder/dashboard/PublicTeamsGallery.tsx`

**Implementation Details:**
- Created `src/components/team-builder/dashboard/MyTeamsList.tsx`:
  - Queries `battleRoyale/teamMemberships` filtered by `userId == currentUser.uid`
  - Displays team cards with generated logo preview, name, completion percentage, status badge
  - "Create new team" button to reopen playground
- Created `src/components/team-builder/dashboard/PublicTeamsGallery.tsx`:
  - Queries `battleRoyale/teams` filtered by `isPublic == true`, ordered by `createdAt desc`, limit 20
  - Displays public teams in gallery layout
- Updated `src/app/team-builder/page.tsx`:
  - Shows `NoTeamPlayground` if user has no teams
  - Shows `MyTeamsList` and `PublicTeamsGallery` (with tabs) if user has teams
  - Supports `?new=true` query parameter to force showing playground
- Team card click navigates to `/team-builder/teams/[slug]`

### 🔄 Task 5 – Team dashboard skeleton (IN PROGRESS)
**Location:** `src/app/team-builder/teams/[slug]/page.tsx`

**Status:** Basic route structure exists, dashboard components need to be implemented

**Current Implementation:**
- Basic route structure exists at `src/app/team-builder/teams/[slug]/page.tsx`
- Loads team by slug
- Displays team name and placeholder message
- **Needs:**
  - Team dashboard header component (logo, status badge, action buttons)
  - Navigation tabs component (Overview, Identity, Brand Kit, Roster, etc.)
  - Overview tab component (completion checklist, progress bars, summary cards)
  - Public preview card component (right-side preview of public team page)

### ⏳ Task 6 – Identity tab (NOT STARTED)
**Location:** `src/components/team-builder/teams/tabs/IdentityTab.tsx`

**Status:** Not implemented

**Needs:**
- Identity tab component with form fields (team name, tagline, short bio, location, mascot keyword/emoji, planned competitions)
- Debounced auto-save hook (`src/hooks/useDebouncedAutoSave.ts`)
- React Hook Form + Zod validation
- Integration with completion score updates
- Team name update with slug validation (`updateTeamName` function in `battleRoyaleTeams.ts`)

### ⏳ Tasks 7-11 (NOT STARTED)
- Task 7: Brand Kit tab with randomizers
- Task 8: Roster tab with headshot uploads
- Task 9: Permissions tab with invitations
- Task 10: Media Board
- Task 11: Share & Export + Public page

### ✅ Task 12 – Completion scoring logic (COMPLETED)
**Location:** `src/lib/utils/calculateTeamCompletion.ts`

**Implementation Details:**
- Created `calculateTeamCompletion.ts` with pure functions:
  - `calculateBrandScore()` - Checks for primaryColor, secondaryColor, accentColor, fontFamilyKey, logoStyleKey (0-100)
  - `calculateIdentityScore()` - Checks for tagline, shortBio, mascotKeyword, location (0-100)
  - `calculateRosterScore()` - Placeholder for roster completeness (returns 0 until Task 8)
  - `calculateTotalScore()` - Weighted average: brand (40%), identity (40%), roster (20%)
  - `calculateTeamCompletion()` - Main function that returns `BattleRoyaleTeamCompletionSummary`
- Ready to be integrated into team update flows

### ✅ Additional Improvements (COMPLETED)
**Login Page Enhancements:**
- Added welcome screen with "BATTLE ROYALE TEAM BUILDER" branding
- Applied BR color scheme (black background, neon green/pink accents)
- Fixed redirect loop by excluding login route from AuthGuard in `src/app/team-builder/layout.tsx`

**Styling Updates:**
- Applied BR color scheme across team builder components:
  - Login/Signup forms
  - Dashboard components (NoTeamPlayground, TeamCard, MyTeamsList, PublicTeamsGallery)
  - Team builder layout
- Defaulted `primaryContactEmail` to current user's email in team creation form

---

## 1. Tech and architecture constraints

- Language: TypeScript.
- Framework: Next.js (latest stable) with App Router.
- Hosting: Vercel.
- State management: React hooks + context where needed (no Redux).
- Backend: Firebase (same project as Gym Art Meets if possible).
  - Firebase Auth (email/password + Google).
  - Firestore (for core data).
  - Firebase Storage (for logos/headshots/media).
- Styling:
  - Tailwind CSS.
  - Simple utility-first layout. Mobile-first, then desktop.
- Forms:
  - React Hook Form + Zod for validation.
- No payment logic.
- No direct coupling with existing Gym Art Meets code.  
  - It can share the Firebase project and Auth but uses its own Firestore collections.

Deployment assumption:

- The Battle Royal public marketing site is already on Vercel (TS/Next).
- This Team Builder can be:
  - either a sub-app/route in the same Next.js project (`/team-builder`),
  - or its own Next.js app on a separate subdomain (e.g. `teams.battleroyal.xyz`).
- Default: implement as a **sub-app/route** inside the existing Battle Royal Next.js project, but with isolated directories and code so it is easy to split later.

Make the architecture modular enough that the Team Builder can be extracted into its own repo with minimal changes (mostly config and env vars).

---

## 2. Core concepts and data model

We want a collaborative team workspace. Users can create multiple teams. Teams have members (users) with permissions. Team data is versioned and shareable.

### 2.1 Entities

Define strong TypeScript types for entities. Use Firestore-friendly shapes (no methods).

```ts
// Firestore: `users/{userId}`
export type UserProfile = {
  id: string;              // same as Firebase Auth uid
  email: string;
  displayName: string | null;
  createdAt: number;       // ms since epoch (or Firestore Timestamp)
  updatedAt: number;
};

// Firestore: `teams/{teamId}`
export type Team = {
  id: string;
  name: string;
  slug: string;                  // unique, URL-safe
  ownerUserId: string;           // creator
  primaryContactEmail: string;   // default to owner’s email, editable
  status: "draft" | "brand-only" | "ready-for-registration";
  isPublic: boolean;             // whether public team page appears in gallery
  brandKit: TeamBrandKit;
  identity: TeamIdentity;
  completion: TeamCompletionSummary;
  createdAt: number;
  updatedAt: number;
};

// Firestore: `teamMemberships/{membershipId}`
export type TeamMembership = {
  id: string;
  teamId: string;
  userId: string | null;   // null until invited user signs up
  email: string;           // used for invitation
  role: "owner" | "coach" | "athlete" | "staff" | "fan";
  canEdit: boolean;
  invitedAt: number;
  acceptedAt: number | null;
};

// Firestore: `teamMembers/{memberId}`
export type TeamMember = {
  id: string;
  teamId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "athlete" | "coach" | "staff";
  sportType: "MAG" | "WAG" | "Other" | null;
  dateOfBirth: string | null; // ISO 8601 date, optional in playground
  headshotUrl: string | null;
  createdAt: number;
  updatedAt: number;
};

// Firestore: `teamMedia/{mediaId}`
export type TeamMedia = {
  id: string;
  teamId: string;
  uploaderUserId: string;
  type: "image" | "note" | "link";
  title: string;
  description: string;
  url: string | null;      // for image/link
  createdAt: number;
};

// Brand kit
export type TeamBrandKit = {
  primaryColor: string;     // hex
  secondaryColor: string | null;
  accentColor: string | null;
  fontFamilyKey: "block" | "modern" | "classic";
  logoStyleKey: "badge" | "monogram" | "wordmark";
  logoText: string;         // team name or acronym
  mascotEmoji: string | null;
};

// Identity
export type TeamIdentity = {
  tagline: string | null;
  mascotKeyword: string | null;    // "wolves", "phoenix", etc.
  shortBio: string | null;         // 1–2 sentences
  location: string | null;         // "Montreal, QC" etc.
  plannedEvents: string[];         // e.g. ids or labels of events like "Battle Royal 1 (Montreal)"
};

// Completion summary, computed
export type TeamCompletionSummary = {
  brandScore: number;      // 0–100
  identityScore: number;   // 0–100
  rosterScore: number;     // 0–100
  totalScore: number;      // aggregated
};
````

Notes:

* `status` is driven by fields present:

  * `draft`: created but minimal fields only.
  * `brand-only`: name + colors + primary contact present.
  * `ready-for-registration`: brand kit + at least one coach + one athlete + basic data.
* Keep all scores derived; do not store redundant data unless necessary for performance.

---

## 3. User flows

Implement the following user flows end to end, with UI, validation, and Firestore integration.

### 3.1 Auth

* Firebase Auth integration:

  * Email/password sign-up and login.
  * Google OAuth.
* After login, redirect to `/team-builder/dashboard`.

### 3.2 “No team yet” view

At `/team-builder/dashboard`:

* If user has zero teams:

  * Show a “playground” view with:

    * a randomized mock team name, colors, mascot, and preview card,
    * a prominent CTA button: “Save this team”.
  * Allow the user to tweak:

    * team name,
    * colors,
    * mascot emoji,
    * tagline.
* When “Save this team” is clicked:

  * Prompt for required fields:

    * Team name (text)
    * Primary color (hex or color picker)
    * Secondary color (optional, but recommended)
    * Primary contact email (default to user email)
  * Create `Team`, set:

    * `status = "brand-only"`,
    * `ownerUserId = current user`,
    * `isPublic = false` by default.
  * Create `TeamMembership` for owner (`role="owner"`, `canEdit=true`).

### 3.3 “My Teams” list

* `/team-builder/dashboard` when user has teams:

  * List of teams user is member of.
  * Each entry:

    * small generated logo,
    * team name,
    * completion percentage and status badge,
    * “View” button.
  * Secondary tab:

    * “Public Teams” gallery (teams with `isPublic=true`).
* Provide button “Create new team” that opens the playground flow again.

### 3.4 Team dashboard

Route: `/team-builder/teams/[slug]`

Layout:

* Header:

  * Generated logo.
  * Team name.
  * Status badge.
  * Action buttons:

    * Share
    * Toggle Public/Private (if user can edit).
* Left navigation tabs:

  * Overview
  * Identity
  * Brand Kit
  * Roster
  * Coaches & Members (permissions)
  * Media Board
  * Share & Export
* Right side:

  * Live preview card of the public team page.

Details:

#### 3.4.1 Overview tab

* Show:

  * Completion checklist:

    * Identity completeness (tagline, bio, mascot, location).
    * Brand kit completeness (3 colors, font, logo style).
    * Roster completeness (≥1 coach, ≥1 athlete).
  * Simple progress bars and percentages.
* Show small summary cards:

  * Identity summary.
  * Brand kit preview.
  * Roster summary (counts).
* CTA buttons to jump into missing sections.

#### 3.4.2 Identity tab

Form for:

* Team name (editable, but slug uniqueness protected).
* Tagline.
* Short bio.
* Location.
* Mascot keyword + mascot emoji.
* Planned competitions:

  * Static list for now, e.g.:

    * “Battle Royal 1 – Montreal”
    * “Battle Royal 2 – TBD”
  * Multi-select.

Auto-save changes to Firestore (debounced).

#### 3.4.3 Brand Kit tab

Form for brand settings:

* Color pickers for:

  * Primary color (required).
  * Secondary color.
  * Accent color.
* Font family selector:

  * “Block”, “Modern”, “Classic” preview with sample text.
* Logo style selector:

  * “Badge”, “Monogram”, “Wordmark”.
* Logo text:

  * default: team name,
  * optional override.

Live logo preview:

* Generate SVG/HTML-based preview using these parameters.
* Ensure this preview can be easily exported later (SVG or PNG).

Randomizer:

* “Randomize colors” button:

  * Suggest a new palette.
  * Option to lock some colors.
* “Randomize logo” button:

  * Cycle through different template combinations.

#### 3.4.4 Roster tab

Roster of people (TeamMember):

* Table with:

  * First name
  * Last name
  * Role
  * Sport type
  * Email
  * Headshot thumbnail
* “Add member” button:

  * Form with:

    * firstName, lastName (required),
    * role (athlete/coach/staff),
    * sportType (optional),
    * email (optional for now),
    * dateOfBirth (optional for now).
  * Creates `TeamMember` in Firestore.
* Inline edit support.

Headshot upload:

* Clicking on a member opens detail drawer:

  * upload headshot image (file upload to Firebase Storage).
  * square crop (simple cropper).
* Store URL in `headshotUrl`.

#### 3.4.5 Coaches & Members tab (permissions)

Permission management based on TeamMembership:

* List of collaborators (TeamMembership records):

  * email, role, canEdit flag, invite status.
* Allow owner (and maybe coaches with permission) to:

  * invite new collaborator via email:

    * create `TeamMembership` with `userId=null` until accepted.
  * set role and canEdit.
* When invited user signs up/logs in with that email:

  * On backend, match `user.email` to TeamMembership and set `userId`.
* Members who are only in roster but not collaborators do not get edit access by default.

#### 3.4.6 Media Board tab

Simple collaborative board:

* Grid of cards:

  * Type “image” (uploaded or link),
  * Type “note” (text),
  * Type “link” (external URL).
* Users with edit permission can:

  * add new card,
  * delete their own card,
  * edit title/description.
* Order by createdAt desc for now.

#### 3.4.7 Share & Export tab

* Show:

  * Public team URL:

    * Example: `/teams/[slug]` under the Battle Royal site.
  * Toggle: “Make team public”.
* Social preview:

  * Render a static “social card” style preview:

    * team logo,
    * name,
    * colors,
    * tagline.
* CTA for visitors:

  * On the public page itself, show:

    * “Create your team” button linking to `/team-builder`.

---

## 4. Public team page

Route: `/teams/[slug]`

Features:

* Publicly visible if `team.isPublic` is true, else 404.
* Render:

  * Generated logo and colors.
  * Team name and tagline.
  * Short bio and location.
  * Planned competitions list.
  * Roster:

    * limited info: first name, last initial, role, sport type, headshot.
  * Social-style hero section using brand colors.
* Show CTA:

  * “Create your team” → `/team-builder`.
* Server-side or static generation:

  * Use Next.js data fetching to render from Firestore.
  * Fallback for ISR or on-demand revalidation.

---

## 5. Randomization / inspiration engine

Implement three deterministic randomizers to make the experience playful:

### 5.1 Team name generator

* Input:

  * optional base words (e.g. sport type, city).
* Output pattern types:

  * `[Adjective] [Animal]` – “Electric Foxes”
  * `[Color] [MythCreature]` – “Crimson Phoenix”
  * `[Intensity] [Object]` – “Maximum Torque”
* Provide:

  * “Roll new name” button.
  * Option to lock part of name (e.g. “Phoenix”) and reroll prefix.

### 5.2 Color palette generator

* Take a seed (team name hash) and generate:

  * primary, secondary, accent.
* Allow:

  * full reroll,
  * lock one color and reroll others.
* Use simple hue rotation / complementary schemes; avoid complex color work.

### 5.3 Logo style suggestion

* Based on:

  * name length,
  * mascot keyword.
* Suggest 3 variations:

  * Monogram (initial letters with colored background).
  * Badge (circle/crest with text).
  * Wordmark (stylized text bar).

---

## 6. Integration with Gym Art Meets (future)

Do not implement Meets logic, but keep these constraints in mind:

* Each `Team` has a stable `id` and `slug`.
* Roster members have enough fields to later map into Meets:

  * firstName, lastName, email, dateOfBirth, sportType.
* Keep schemas compatible with possible import:

  * Gym Art Meets can query by `ownerUserId` and `teamId`,
  * then prompt user to confirm which members to import.

No direct coupling into this code now; just keep the data model clean and stable.

---

## 7. Project structure

Use a clear folder structure under the existing Next.js app:

```txt
src/
  app/
    team-builder/
      layout.tsx
      page.tsx                 // dashboard: My Teams + Public Teams
      login/
        page.tsx               // combined login/signup page
    teams/
      [slug]/
        page.tsx             // team dashboard (basic route exists, needs dashboard components)
      error.tsx                // error boundary
      not-found.tsx            // 404 page
    teams/
      [slug]/
        page.tsx               // public team page (not implemented yet)

  components/team-builder/
    dashboard/
      NoTeamPlayground.tsx    // ✅ implemented
      MyTeamsList.tsx          // ✅ implemented
      PublicTeamsGallery.tsx   // ✅ implemented
      TeamCard.tsx             // ✅ implemented
    auth/
      LoginForm.tsx           // ✅ implemented
      SignupForm.tsx          // ✅ implemented
      GoogleAuthButton.tsx    // ✅ implemented
    layout/
      TeamBuilderLayout.tsx    // ✅ implemented
      AuthGuard.tsx            // ✅ implemented
    teams/                     // (not implemented yet)
      TeamDashboardHeader.tsx
      TeamDashboardTabs.tsx
      PublicPreviewCard.tsx
      tabs/
        OverviewTab.tsx
        IdentityTab.tsx        // (not implemented yet)
    brand-kit/                 // (not implemented yet)
    roster/                    // (not implemented yet)
    permissions/               // (not implemented yet)
    media-board/               // (not implemented yet)
    share/                     // (not implemented yet)
    preview/                   // (not implemented yet)

  lib/
    firebase/
      client.ts                // ✅ Firebase client SDK initialization
      auth.ts                  // ✅ Auth helper functions
    firestore/
      battleRoyaleTeams.ts     // ✅ Team CRUD operations
      battleRoyaleTeamMemberships.ts  // ✅ Membership operations
      battleRoyaleUsers.ts     // ✅ User profile operations (gym_art_users collection)
      teamMembers.ts           // (not implemented yet)
      teamMedia.ts             // (not implemented yet)
    random/
      names.ts                 // ✅ Team name generator
      colors.ts                // ✅ Color palette generator
      logos.ts                 // ✅ Logo style suggestions
    hooks/
      useHashNavigation.ts    // ✅ implemented
      useDebouncedAutoSave.ts // (not implemented yet)
    utils/
      calculateTeamCompletion.ts  // ✅ implemented

  types/
    battleRoyaleTeam.ts        // ✅ BattleRoyaleTeam, BattleRoyaleTeamBrandKit, etc.
    battleRoyaleUser.ts         // ✅ BattleRoyaleUserProfile
    battleRoyaleMembership.ts   // ✅ BattleRoyaleTeamMembership
```

**Note:** All types are prefixed with `BattleRoyale` to avoid conflicts. User profiles are stored in `gym_art_users` collection (shared with Gym Art Meets), while all Battle Royale-specific data is under `battleRoyale/` collection.

Keep domain logic in `lib/firestore` and `lib/random`. Components should be thin and call these helpers.

---

## 8. Tasks for Cursor

Implement the project in stages. For each stage, write the code completely and ensure type safety.

### ✅ Task 1 – Firebase wiring (COMPLETED)

1. Add Firebase client SDK config for:

   * Auth,
   * Firestore,
   * Storage.
2. Create `lib/firebase.ts` with initialized instances.
3. Create `types` for `UserProfile`, `Team`, `TeamMember`, `TeamMembership`, `TeamMedia`, `TeamBrandKit`, `TeamIdentity`, `TeamCompletionSummary`.

**Implementation:** See "Implementation Status" section above for details.

### ✅ Task 2 – Auth and basic layout (COMPLETED)

1. Implement a simple auth layout:

   * `/login`, `/signup` pages or single combined page.
   * Hook into Firebase Auth.
2. Protect `/team-builder/**` with auth:

   * If not logged in, redirect to login.
3. Implement basic layout for `/team-builder`:

   * left nav,
   * header,
   * content area.

**Implementation:** See "Implementation Status" section above for details.

### ✅ Task 3 – "No team yet" playground + create team (COMPLETED)

1. Implement "No team yet" view with randomized team suggestion.
2. Implement "Save this team" modal/form.
3. On submit:

   * Create `Team`,
   * Create `TeamMembership` for owner.

**Implementation:** See "Implementation Status" section above for details.

### ✅ Task 4 – My Teams and Public Teams (COMPLETED)

1. List teams where current user has membership.
2. List public teams (simple Firestore query with `isPublic=true` and limit).
3. Clicking a team goes to `/team-builder/teams/[slug]`.

**Implementation:** See "Implementation Status" section above for details.

### 🔄 Task 5 – Team dashboard skeleton (IN PROGRESS)

1. Implement `/team-builder/teams/[slug]` route.
2. Load `Team` and membership, handle permissions.
3. Render:

   * header (name, logo, status, public toggle),
   * nav tabs,
   * Overview tab empty state.

**Status:** Basic route exists at `src/app/team-builder/teams/[slug]/page.tsx` with team loading. Needs:
- `TeamDashboardHeader` component
- `TeamDashboardTabs` component
- `OverviewTab` component
- `PublicPreviewCard` component
- Integration of completion scoring utility

### ⏳ Task 6 – Identity tab (NOT STARTED)

1. Implement forms for identity fields.
2. Add debounce auto-save to Firestore.
3. Update completion scores when fields change.

**Status:** Not implemented. Needs:
- `IdentityTab` component with React Hook Form + Zod
- `useDebouncedAutoSave` hook
- `updateTeamName` function with slug validation
- Integration with completion score updates

### Task 7 – Brand Kit tab + randomizers

1. Implement color inputs + font + logo style selections.
2. Implement random palette generator in `lib/random/colors.ts`.
3. Implement simple logo preview component that reacts to brand kit changes.
4. Add “randomize” buttons.

### Task 8 – Roster tab with headshots

1. Implement table of `TeamMember`s.
2. Implement “Add member” form.
3. Integrate Firebase Storage for headshot uploads.
4. Add simple cropping or at least enforced aspect ratio.

### Task 9 – Permissions tab

1. Implement list of `TeamMembership`s.
2. Implement “Invite collaborator by email”.
3. Allow toggling `canEdit` and changing `role` (owner cannot be demoted except via manual admin, which we can skip).

### Task 10 – Media Board

1. Implement `TeamMedia` cards.
2. Support types: image upload, note, link.
3. Grid layout.

### Task 11 – Share & Export + Public page

1. Implement `isPublic` toggle and public URL display.
2. Implement `/teams/[slug]` public page:

   * Pull `Team`, `TeamBrandKit`, `TeamIdentity`, roster summary.
   * CTA “Create your team”.
3. Add basic social preview card styling using brand colors.

### ✅ Task 12 – Completion scoring (COMPLETED)

1. Implement a pure function that takes `Team`, `TeamIdentity`, `TeamBrandKit`, `TeamMember[]` and returns `TeamCompletionSummary`.
2. Store summary in `Team` on write or compute on read.

**Implementation:** See "Implementation Status" section above for details. Utility functions created in `src/lib/utils/calculateTeamCompletion.ts`. Ready for integration into team update flows.

---

## 9. Coding guidelines

* Use strict TypeScript (`strict: true`).
* Avoid any `any` types.
* Keep business logic in pure functions where possible.
* Separate UI components from Firestore logic (hooks and lib modules).
* Use server components where reasonable, but keep Firebase client usage in client components/hooks.

---

Use this specification as your reference.
Implement the Team Builder app step by step, following the tasks in section 8 in order.

