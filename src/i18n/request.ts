import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Load only common messages (nav, common strings) in the layout
  // Page-specific messages will be loaded dynamically in each page
  const commonMessages = (await import(`@/messages/${locale}/common.json`)).default;

  return {
    locale,
    messages: commonMessages,
  };
});
