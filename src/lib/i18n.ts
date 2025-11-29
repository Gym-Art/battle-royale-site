import { useTranslations } from 'next-intl';

export function useI18n() {
  const t = useTranslations();
  return t;
}

/**
 * Load page-specific translations and merge with common messages
 * Use this in page components to load translations dynamically
 */
export async function loadPageMessages(locale: string, page: string) {
  try {
    const pageMessages = (await import(`@/messages/${locale}/${page}.json`)).default;
    return pageMessages;
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
