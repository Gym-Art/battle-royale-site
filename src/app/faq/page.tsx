'use client';

import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';
import { Accordion } from '@/components/faq/Accordion';
import { FAQCategoryTabs } from '@/components/faq/FAQCategoryTabs';
import { FAQContactSection } from '@/components/faq/FAQContactSection';
import { FAQHero } from '@/components/faq/FAQHero';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { FAQCategory, getFAQData } from '@/data/faqData';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function FAQPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const faqData = getFAQData();

  const validCategoryIds = useMemo(() => faqData.map((cat) => cat.id), [faqData]);
  const categoryParam = searchParams.get('category');
  const initialCategory =
    categoryParam && validCategoryIds.includes(categoryParam) ? categoryParam : 'general';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    initSessionAttribution();
    trackEvent({ name: 'page_view', meta: { title: 'FAQ' } });
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && validCategoryIds.includes(categoryParam)) {
      setActiveCategory(categoryParam);
      if (isInitialLoad) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsInitialLoad(false);
      }
    }
  }, [searchParams, validCategoryIds, isInitialLoad]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleItem = (categoryId: string, index: number) => {
    const key = `${categoryId}-${index}`;
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const activeData = faqData.find((cat) => cat.id === activeCategory);

  const getCategoryTitleColor = (color: FAQCategory['color']): string => {
    switch (color) {
      case 'green':
        return 'text-neon-green';
      case 'pink':
        return 'text-neon-pink';
      case 'magenta':
        return 'text-neon-magenta';
    }
  };

  return (
    <PageLayout>
      <FAQHero />

      <section className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        <div className="section-container relative z-10">
          <FAQCategoryTabs
            categories={faqData}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {activeData && (
            <div className="text-center mb-8">
              <h2 className={`font-display text-3xl tracking-wider ${getCategoryTitleColor(activeData.color)}`}>
                {activeData.name.toUpperCase()}
              </h2>
            </div>
          )}

          <div className="max-w-3xl mx-auto space-y-4">
            {activeData?.items.map((item, index) => (
              <Accordion
                key={`${activeCategory}-${index}`}
                question={item.question}
                answer={item.answer}
                isOpen={openItems.has(`${activeCategory}-${index}`)}
                onToggle={() => toggleItem(activeCategory, index)}
              />
            ))}
          </div>
        </div>
      </section>

      <FAQContactSection />

      <EmailSignupSection />
    </PageLayout>
  );
}
