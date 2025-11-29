import { PageMessagesProvider } from '@/components/providers/PageMessagesProvider';
import { loadPageMessages, mergeMessages } from '@/lib/i18n';
import { getMessages } from 'next-intl/server';
import SchedulePageClient from './SchedulePageClient';

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Load common messages (from layout) and page-specific messages
  const commonMessages = await getMessages();
  const scheduleMessages = await loadPageMessages(locale, 'schedule');
  const homeMessages = await loadPageMessages(locale, 'home');
  
  // Merge messages - page-specific messages override common if keys overlap
  // Schedule page needs home messages for EmailSignupSection
  const messages = mergeMessages(commonMessages, { schedule: scheduleMessages, home: homeMessages });

  return (
    <PageMessagesProvider locale={locale} messages={messages}>
      <SchedulePageClient />
    </PageMessagesProvider>
  );
}
