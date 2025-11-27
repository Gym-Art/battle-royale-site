'use client';

import { useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { HeroSection } from '@/components/sections/HeroSection';
import { ForAthletesSection } from '@/components/sections/ForAthletesSection';
import { ForSpectatorsSection } from '@/components/sections/ForSpectatorsSection';
import { ForSponsorsSection } from '@/components/sections/ForSponsorsSection';
import { RulesSummarySection } from '@/components/sections/RulesSummarySection';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';

export default function HomePage() {
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

