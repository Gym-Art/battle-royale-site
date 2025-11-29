import { PageMessagesProvider } from '@/components/providers/PageMessagesProvider';
import { loadPageMessages, mergeMessages } from '@/lib/i18n';
import { getMessages } from 'next-intl/server';
import AboutPageClient from './AboutPageClient';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Load common messages (from layout) and page-specific messages
  const commonMessages = await getMessages();
  const aboutMessages = await loadPageMessages(locale, 'about');
  const homeMessages = await loadPageMessages(locale, 'home');
  
  // Merge messages - page-specific messages override common if keys overlap
  // About page needs home messages for EmailSignupSection
  const messages = mergeMessages(commonMessages, { about: aboutMessages, home: homeMessages });

  return (
    <PageMessagesProvider locale={locale} messages={messages}>
      <AboutPageClient />
    </PageMessagesProvider>
  );
}
