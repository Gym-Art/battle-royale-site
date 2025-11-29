import { PageMessagesProvider } from '@/components/providers/PageMessagesProvider';
import { loadPageMessages, mergeMessages } from '@/lib/i18n';
import { getMessages } from 'next-intl/server';
import SponsorsPageClient from './SponsorsPageClient';

export default async function SponsorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Load common messages (from layout) and page-specific messages
  const commonMessages = await getMessages();
  const sponsorsMessages = await loadPageMessages(locale, 'sponsors');
  const homeMessages = await loadPageMessages(locale, 'home');
  
  // Merge messages - page-specific messages override common if keys overlap
  // Sponsors page needs home messages for EmailSignupSection
  const messages = mergeMessages(commonMessages, { sponsors: sponsorsMessages, home: homeMessages });

  return (
    <PageMessagesProvider locale={locale} messages={messages}>
      <SponsorsPageClient />
    </PageMessagesProvider>
  );
}
