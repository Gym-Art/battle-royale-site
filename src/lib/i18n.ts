import { useTranslations } from 'next-intl';

export function useI18n() {
  const t = useTranslations();
  return t;
}

/**
 * Load page-specific translations and merge with common messages
 * Use this in page components to load translations dynamically
 * Uses explicit imports for each locale/page combination so webpack can statically analyze them
 */
export async function loadPageMessages(locale: string, page: string) {
  try {
    // Use explicit imports for each locale so webpack can statically analyze them
    if (locale === 'en') {
      switch (page) {
        case 'home':
          return (await import('@/messages/en/home.json')).default;
        case 'rules':
          return (await import('@/messages/en/rules.json')).default;
        case 'schedule':
          return (await import('@/messages/en/schedule.json')).default;
        case 'sponsors':
          return (await import('@/messages/en/sponsors.json')).default;
        case 'faq':
          return (await import('@/messages/en/faq.json')).default;
        case 'about':
          return (await import('@/messages/en/about.json')).default;
        default:
          console.warn(`Page translations not found for ${locale}/${page}.json`);
          return {};
      }
    } else if (locale === 'fr') {
      switch (page) {
        case 'home':
          return (await import('@/messages/fr/home.json')).default;
        case 'rules':
          return (await import('@/messages/fr/rules.json')).default;
        case 'schedule':
          return (await import('@/messages/fr/schedule.json')).default;
        case 'sponsors':
          return (await import('@/messages/fr/sponsors.json')).default;
        case 'faq':
          return (await import('@/messages/fr/faq.json')).default;
        case 'about':
          return (await import('@/messages/fr/about.json')).default;
        default:
          console.warn(`Page translations not found for ${locale}/${page}.json`);
          return {};
      }
    } else {
      console.warn(`Locale ${locale} not supported`);
      return {};
    }
  } catch (error) {
    // Page-specific translations not found, return empty object
    console.warn(`Page translations not found for ${locale}/${page}.json`);
    return {};
  }
}

/**
 * Deep merge multiple message objects into one
 * Page-specific messages override common messages if keys overlap
 */
export function mergeMessages(...messages: Record<string, any>[]): Record<string, any> {
  return messages.reduce((acc, msg) => {
    const merged = { ...acc };
    for (const key in msg) {
      if (typeof msg[key] === 'object' && msg[key] !== null && !Array.isArray(msg[key]) && typeof acc[key] === 'object' && acc[key] !== null) {
        merged[key] = mergeMessages(acc[key], msg[key]);
      } else {
        merged[key] = msg[key];
      }
    }
    return merged;
  }, {});
}
