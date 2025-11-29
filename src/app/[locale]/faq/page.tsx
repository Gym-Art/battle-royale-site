import { FAQHero } from '@/components/faq/FAQHero';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageMessagesProvider } from '@/components/providers/PageMessagesProvider';
import { loadPageMessages, mergeMessages } from '@/lib/i18n';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import FAQPageClient from './FAQPageClient';

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Load common messages (from layout) and page-specific messages
  const commonMessages = await getMessages();
  const faqMessages = await loadPageMessages(locale, 'faq');
  const homeMessages = await loadPageMessages(locale, 'home');
  
  // Merge messages - page-specific messages override common if keys overlap
  // FAQ page needs home messages for EmailSignupSection
  const messages = mergeMessages(commonMessages, { faq: faqMessages, home: homeMessages });

  return (
    <PageMessagesProvider locale={locale} messages={messages}>
      <Suspense fallback={
        <PageLayout>
          <FAQHero />
          <section className="section-padding bg-surface-dark relative overflow-hidden">
            <div className="section-container relative z-10">
              <div className="text-center py-12">
                <p className="text-text-muted">Loading...</p>
              </div>
            </div>
          </section>
        </PageLayout>
      }>
        <FAQPageClient />
      </Suspense>
    </PageMessagesProvider>
  );
}
