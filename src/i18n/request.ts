import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Load only common messages (nav, common strings) in the layout
  // Page-specific messages will be loaded dynamically in each page
  // Use explicit imports for each locale so webpack can statically analyze them
  let commonMessages;
  switch (locale) {
    case 'en':
      commonMessages = (await import('../messages/en/common.json')).default;
      break;
    case 'fr':
      commonMessages = (await import('../messages/fr/common.json')).default;
      break;
    default:
      commonMessages = (await import('../messages/en/common.json')).default;
  }

  return {
    locale,
    messages: commonMessages,
  };
});
