'use client';

import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { ForAthletesSection } from '@/components/sections/ForAthletesSection';
import { ForSpectatorsSection } from '@/components/sections/ForSpectatorsSection';
import { ForSponsorsSection } from '@/components/sections/ForSponsorsSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { RulesSummarySection } from '@/components/sections/RulesSummarySection';
import { useHashNavigation } from '@/hooks/useHashNavigation';
import { useEffect } from 'react';

export default function HomePage() {
  const sectionIds = ['hero', 'for-athletes', 'for-spectators', 'for-sponsors', 'rules-summary', 'stay-connected'];
  useHashNavigation(sectionIds, 100);

  useEffect(() => {
    initSessionAttribution();
    trackEvent({ name: 'page_view', meta: { title: 'Home' } });
  }, []);

  return (
    <PageLayout>
      <HeroSection />
      <ForAthletesSection />
      <ForSpectatorsSection />
      <ForSponsorsSection />
      <RulesSummarySection />
      <EmailSignupSection />
    </PageLayout>
  );
}

