# Firebase Setup Guide for Team Builder

This guide walks you through setting up Firebase for the Battle Royale Team Builder app in your existing Firebase project.

## Current Status

**Implementation Progress**: Tasks 1-7 completed ✅
- Core infrastructure (auth, team creation, galleries)
- Team dashboard with tabs
- Identity tab with auto-save
- Brand Kit tab with 12 font families, 12 logo styles, home/away colors, and color picker with Apply button

**Firestore Collections**:
- `battleRoyaleTeams` - Team data (top-level collection)
- `battleRoyaleTeamMemberships` - Team membership/permissions (top-level collection)
- `gym_art_users` - User profiles (shared with Gym Art Meets)

## Prerequisites

- Access to your existing Firebase project (the one used by other Gym Art apps)
- Firebase Console access: https://console.firebase.google.com

## Step 1: Add a Web App to Your Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your existing Firebase project
3. Click the **gear icon** (⚙️) next to "Project Overview" → **Project settings**
4. Scroll down to the **"Your apps"** section
5. Click the **Web icon** (`</>`) to add a new web app
6. Register your app:
   - **App nickname**: `Battle Royale Team Builder` (or any name you prefer)
   - **Firebase Hosting**: Not needed (we're using Vercel)
   - Click **Register app**
7. Copy the Firebase configuration object that appears (you'll need this in Step 2)

## Step 2: Configure Environment Variables

Create or update your `.env.local` file in the project root with the Firebase client SDK configuration:

```bash
# Firebase Client SDK (for Team Builder)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin SDK (already configured for analytics)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**Note**: The `NEXT_PUBLIC_` prefix is required for Next.js to expose these variables to the client-side code.

## Step 3: Enable Authentication Providers

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable the following providers:
   - **Email/Password**: Click → Enable → Save
   - **Google**: Click → Enable → Enter your support email → Save

## Step 4: Set Up Firestore Security Rules

1. Go to **Firestore Database** → **Rules**
2. Add rules for the Team Builder collections:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Existing rules for other collections (analytics_events, email_signups, etc.)
    // ... your existing rules ...
    
    // Battle Royale Team Builder rules
    
    // User profiles in gym_art_users (shared with Gym Art Meets)
    match /gym_art_users/{userId} {
      // Users can read their own profile
      allow read: if request.auth != null && request.auth.uid == userId.replace('USER_', '');
      // Users can create/update their own profile
      allow create, update: if request.auth != null && request.auth.uid == userId.replace('USER_', '');
    }
    
    // Battle Royale teams
    match /battleRoyaleTeams/{teamId} {
      // Anyone can read public teams
      allow read: if resource.data.isPublic == true;
      // Authenticated users can read teams they're members of
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/battleRoyaleTeamMemberships/$(getMembershipId(request.auth.uid, teamId)));
      // Only team owners can create teams
      allow create: if request.auth != null && 
        request.resource.data.ownerUserId == request.auth.uid;
      // Only users with edit permission can update
      allow update: if request.auth != null && 
        (request.resource.data.ownerUserId == request.auth.uid ||
         getCanEdit(request.auth.uid, teamId));
      // Only owners can delete
      allow delete: if request.auth != null && 
        resource.data.ownerUserId == request.auth.uid;
    }
    
    // Battle Royale team memberships
    match /battleRoyaleTeamMemberships/{membershipId} {
      // Users can read memberships for teams they're members of
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid ||
         resource.data.email == request.auth.token.email);
      // Owners can create memberships
      allow create: if request.auth != null && 
        getIsOwner(request.auth.uid, get(resource.data.teamId).data.ownerUserId);
      // Owners and the membership user can update
      allow update: if request.auth != null && 
        (resource.data.userId == request.auth.uid ||
         getIsOwner(request.auth.uid, get(resource.data.teamId).data.ownerUserId));
      // Owners can delete memberships
      allow delete: if request.auth != null && 
        getIsOwner(request.auth.uid, get(resource.data.teamId).data.ownerUserId);
    }
    
    // Helper functions
    function getMembershipId(userId, teamId) {
      // This is a simplified version - you may need to query memberships
      return teamId + '_' + userId;
    }
    
    function getCanEdit(userId, teamId) {
      let membership = get(/databases/$(database)/documents/battleRoyaleTeamMemberships/$(getMembershipId(userId, teamId)));
      return membership != null && membership.data.canEdit == true;
    }
    
    function getIsOwner(userId, ownerUserId) {
      return userId == ownerUserId;
    }
  }
}
```

**Note**: The above rules are a starting point. You may need to adjust them based on your specific security requirements. For development, you can use more permissive rules:

```javascript
// Development rules (NOT for production)
match /battleRoyaleTeams/{document=**} {
  allow read, write: if request.auth != null;
}

match /battleRoyaleTeamMemberships/{document=**} {
  allow read, write: if request.auth != null;
}
```

## Step 5: Set Up Firebase Storage Rules

1. Go to **Storage** → **Rules**
2. Add rules for team media (headshots, logos, etc.):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Battle Royale team media
    match /battleRoyaleTeamMedia/{allPaths=**} {
      // Authenticated users can read
      allow read: if request.auth != null;
      // Users can upload if they're team members with edit permission
      allow write: if request.auth != null && 
        request.resource.size < 5 * 1024 * 1024 && // 5MB limit
        request.resource.contentType.matches('image/.*');
    }
  }
}
```

## Step 6: Create Firestore Indexes (if needed)

If you get index errors when querying, Firebase will prompt you to create indexes. Common indexes needed:

1. **Public teams query**:
   - Collection: `battleRoyaleTeams`
   - Fields: `isPublic` (Ascending), `createdAt` (Descending)

2. **Team memberships by user**:
   - Collection: `battleRoyaleTeamMemberships`
   - Fields: `userId` (Ascending)

3. **Team memberships by team**:
   - Collection: `battleRoyaleTeamMemberships`
   - Fields: `teamId` (Ascending)

## Step 7: Verify Setup

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to `/team-builder/login`
3. Try signing up with email/password or Google
4. Check Firebase Console:
   - **Authentication** → Should show your new user
   - **Firestore** → `gym_art_users` collection should have a document with ID `USER_{uid}`
   - **Firestore** → `battleRoyaleTeams` should be created when you create your first team
   - **Firestore** → `battleRoyaleTeamMemberships` should be created with team ownership

5. Test the team dashboard:
   - Navigate to `/team-builder/teams/[slug]` after creating a team
   - Test Identity tab with auto-save
   - Test Brand Kit tab with color pickers and logo customization
   - Verify completion scores update correctly

## Troubleshooting

### "Firebase is not initialized" error
- Make sure all `NEXT_PUBLIC_FIREBASE_*` environment variables are set
- Restart your dev server after adding environment variables
- Check that variables don't have extra quotes or spaces

### Authentication not working
- Verify Email/Password and Google providers are enabled in Firebase Console
- Check browser console for specific error messages
- Ensure your domain is authorized (for production, add it in Authentication → Settings → Authorized domains)

### Firestore permission denied
- Check your security rules match the operations you're trying to perform
- Verify the user is authenticated (`request.auth != null`)
- Check that collection paths match exactly (case-sensitive)

### Storage upload fails
- Verify Storage rules allow the operation
- Check file size limits (5MB default in rules above)
- Ensure content type is correct (images only in example rules)

## Implementation Progress

### Completed Features (Tasks 1-7)

**✅ Task 1-4: Core Infrastructure**
- Firebase client SDK setup and authentication
- User profile management (shared `gym_art_users` collection)
- Team creation with randomized suggestions
- My Teams and Public Teams galleries

**✅ Task 5: Team Dashboard Skeleton**
- Team dashboard header with logo, status badge, and action buttons
- Navigation tabs (Overview, Identity, Brand Kit, Roster, Permissions, Media, Share)
- Overview tab with completion checklist and progress bars
- Public preview link in header (opens in new tab)

**✅ Task 6: Identity Tab**
- Form fields: team name, tagline, short bio, location, mascot keyword/emoji, planned competitions
- Debounced auto-save functionality
- Manual save button with unsaved changes tracking
- Team name updates with slug validation
- Completion score integration

**✅ Task 7: Brand Kit Tab**
- **12 Font Family Options**: block, modern, classic, bold, elegant, sporty, futuristic, retro, minimal, decorative, handwritten, tech
- **12 Logo Style Options**: badge, monogram, wordmark, shield, emblem, crest, stamp, seal, badge-modern, badge-vintage, badge-minimal, badge-ornate
- **Color System**:
  - Home colors: Primary, Secondary
  - Away colors: Away Primary, Away Secondary
  - Shared: Accent color
- **Logo Features**:
  - Logo text input
  - Optional logo acronym field
  - Mascot emoji picker
- **Color Picker Component**: 
  - Hex color input with Apply button
  - Color picker integration
  - Lock/unlock functionality for randomization
- **Live Logo Preview**: SVG-based preview for all logo styles
- **Randomizers**: Randomize colors and logo styles
- **Save Functionality**: Auto-save with manual save button and unsaved changes tracking

### Data Model Updates

**Brand Kit Structure:**
```typescript
{
  // Home colors
  primaryColor: string;        // Required hex color
  secondaryColor: string | null;
  
  // Away colors
  awayPrimaryColor: string | null;
  awaySecondaryColor: string | null;
  
  // Shared
  accentColor: string | null;
  
  // Typography & Logo
  fontFamilyKey: FontFamilyKey;  // 12 options
  logoStyleKey: LogoStyleKey;    // 12 options
  logoText: string;
  logoAcronym: string | null;    // Optional acronym
  mascotEmoji: string | null;
}
```

**Collection Names:**
- Teams: `battleRoyaleTeams` (top-level collection)
- Memberships: `battleRoyaleTeamMemberships` (top-level collection)
- Users: `gym_art_users` (shared with Gym Art Meets)

### Remaining Tasks

- **Task 8**: Roster tab with headshot uploads
- **Task 9**: Permissions tab with invitations
- **Task 10**: Media Board
- **Task 11**: Share & Export + Public team page

## Next Steps

Once Firebase is configured:
1. Test user registration and login
2. Create your first team
3. Verify data is being saved to Firestore correctly
4. Test team sharing and public visibility
5. Explore brand kit customization with 12 font families and 12 logo styles
6. Test home/away color sets and logo acronym feature

## Production Deployment

For production on Vercel:
1. Add all environment variables in Vercel dashboard:
   - Go to your project → Settings → Environment Variables
   - Add all `NEXT_PUBLIC_FIREBASE_*` variables
2. Update Firebase Authorized domains:
   - Authentication → Settings → Authorized domains
   - Add your production domain (e.g., `battleroyal.xyz`)
3. Review and tighten security rules for production

