import { PageMessagesProvider } from '@/components/providers/PageMessagesProvider';
import { loadPageMessages, mergeMessages } from '@/lib/i18n';
import { getMessages } from 'next-intl/server';
import RulesPageClient from './RulesPageClient';

export default async function RulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Load common messages (from layout) and page-specific messages
  const commonMessages = await getMessages();
  const rulesMessages = await loadPageMessages(locale, 'rules');
  const homeMessages = await loadPageMessages(locale, 'home');
  
  // Merge messages - page-specific messages override common if keys overlap
  // Rules page needs home messages for EmailSignupSection
  // Ensure rules messages are properly nested under the 'rules' key
  const messages = mergeMessages(commonMessages, { 
    rules: rulesMessages, 
    home: homeMessages 
  });
  
  // Verify structure in development
  if (process.env.NODE_ENV === 'development') {
    if (!messages.rules) {
      console.error('[Rules Page] rules messages not found in merged messages');
    } else if (!messages.rules.teamComposition?.ageRequirements?.description) {
      console.error('[Rules Page] teamComposition.ageRequirements.description not found');
    }
  }

  return (
    <PageMessagesProvider locale={locale} messages={messages}>
      <RulesPageClient />
    </PageMessagesProvider>
  );
}
