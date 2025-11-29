'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

interface PageMessagesProviderProps {
  locale: string;
  messages: Record<string, any>;
  children: ReactNode;
}

/**
 * Provider for page-specific translations
 * Merges page messages with common messages from layout
 */
export function PageMessagesProvider({ locale, messages, children }: PageMessagesProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

