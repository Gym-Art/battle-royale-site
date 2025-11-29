# Translate Page Command

Use this command to translate a page in the Battle Royale site. The site uses **next-intl** with per-page translation loading for optimal performance.

## Quick Start

To translate a page, follow these steps:

### 1. Identify the Page
- Determine which page needs translation (e.g., `rules`, `schedule`, `sponsors`, `faq`, `about`)
- Check if the page already uses the translation system

### 2. Create Translation Files
Create two JSON files:
- `src/messages/en/{pageName}.json` - English translations
- `src/messages/fr/{pageName}.json` - French translations

### 3. Structure the JSON
Follow the component structure. For example, if translating the Rules page:

```json
{
  "hero": {
    "label": "Competition Format",
    "heading": "FORMAT & RULES",
    "description": "..."
  },
  "fundamentals": {
    "heading": "THE FUNDAMENTALS",
    "cards": {
      "cashPrizes": {
        "title": "Cash Prizes",
        "description": "..."
      }
    }
  }
}
```

### 4. Update Page Component
Convert the page to use the translation pattern:

```typescript
// src/app/[locale]/{pageName}/page.tsx
import { PageMessagesProvider } from '@/components/providers/PageMessagesProvider';
import { loadPageMessages, mergeMessages } from '@/lib/i18n';
import { getMessages } from 'next-intl/server';
import { PageName }Client from './{PageName}Client';

export default async function {PageName}Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const commonMessages = await getMessages();
  const pageMessages = await loadPageMessages(locale, '{pageName}');
  const messages = mergeMessages(commonMessages, { {pageName}: pageMessages });

  return (
    <PageMessagesProvider messages={messages}>
      <{PageName}Client />
    </PageMessagesProvider>
  );
}
```

### 5. Update Components to Use Translations
Replace hardcoded strings with translation keys:

**Before:**
```typescript
<h1>FORMAT & RULES</h1>
<p>The first professional gymnastics league...</p>
```

**After:**
```typescript
const t = useTranslations('rules.hero');
<h1>{t('heading')}</h1>
<p>{t('description')}</p>
```

## Translation Keys Pattern

- Use **snake_case** for keys: `joinWaitlist`, `perEvent`
- Nest by component/section: `hero.presents`, `forAthletes.highlights.cashPrizes.title`
- Keep keys descriptive and consistent
- Group related content together

## Example: Translating a Section

**Component:**
```typescript
// HeroSection.tsx
'use client';
import { useTranslations } from 'next-intl';

export const HeroSection = () => {
  const t = useTranslations('home.hero');
  
  return (
    <section>
      <p>{t('presents')}</p>
      <h1>{t('description')}</h1>
      <button>{t('joinWaitlist')}</button>
      <p>{t('stats.perEvent')}</p>
    </section>
  );
};
```

**Translation File:**
```json
{
  "hero": {
    "presents": "Gym Art Presents",
    "description": "The first professional gymnastics league...",
    "joinWaitlist": "Join the Waitlist",
    "stats": {
      "perEvent": "Per Event"
    }
  }
}
```

## Checklist

- [ ] Create `src/messages/en/{pageName}.json`
- [ ] Create `src/messages/fr/{pageName}.json`
- [ ] Update page component to use `PageMessagesProvider`
- [ ] Create `{PageName}Client.tsx` if needed (for 'use client' components)
- [ ] Replace hardcoded strings with `useTranslations()` hooks
- [ ] Test both English and French versions
- [ ] Verify all strings are translated
- [ ] Check for proper names (keep as-is: "Battle Royale", "FIG", etc.)

## Notes

- **Keep as-is**: Proper nouns (Battle Royale, Gym Art, FIG), email addresses, URLs
- **Translate**: All user-facing text, labels, descriptions, buttons
- **Numbers/Currency**: Keep format, translate labels only (e.g., "$25K" stays, "Per Event" translates)
- **Technical Terms**: May need context-specific translation (e.g., "Code of Points" → "Code de Pointage")

## Current Translation Status

- ✅ **Common** (`common.json`) - Nav, site name, tagline
- ✅ **Home** (`home.json`) - Home page sections
- ⏳ **Rules** - Not yet translated
- ⏳ **Schedule** - Not yet translated
- ⏳ **Sponsors** - Not yet translated
- ⏳ **FAQ** - Not yet translated (largest file, ~80 Q&A pairs)
- ⏳ **About** - Not yet translated

## Need Help?

- See `TRANSLATION_FILE_STRUCTURE.md` for file organization
- See `TRANSLATION_PLAN.md` for complete translation inventory
- Check `src/messages/en/home.json` for example structure
- Check `src/app/[locale]/page.tsx` for page loading pattern

