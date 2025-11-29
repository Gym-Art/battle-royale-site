import { PageMessagesProvider } from '@/components/providers/PageMessagesProvider';
import { loadPageMessages, mergeMessages } from '@/lib/i18n';
import { getMessages } from 'next-intl/server';
import HomePageClient from './HomePageClient';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Load common messages (from layout) and page-specific messages
  const commonMessages = await getMessages();
  const homeMessages = await loadPageMessages(locale, 'home');
  
  // Merge messages - page-specific messages override common if keys overlap
  const messages = mergeMessages(commonMessages, { home: homeMessages });

  return (
    <PageMessagesProvider locale={locale} messages={messages}>
      <HomePageClient />
    </PageMessagesProvider>
  );
}
