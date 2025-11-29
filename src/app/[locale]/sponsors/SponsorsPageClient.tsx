'use client';

import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';
import { JumpToSection } from '@/components/layout/JumpToSection';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { Button } from '@/components/ui/Button';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { siteConfig } from '@/config/site';
import { useHashNavigation } from '@/hooks/useHashNavigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function SponsorsPageClient() {
  const t = useTranslations('sponsors');
  const sectionIds = ['market-opportunity', 'partnership-tiers', 'what-partners-get', 'contact'];
  useHashNavigation(sectionIds, 100);

  useEffect(() => {
    initSessionAttribution();
    trackEvent({ name: 'page_view', meta: { title: 'Sponsors' } });
  }, []);

  const partnershipTypes = [
    {
      title: t('partnershipTiers.types.cashPrize.title'),
      description: t('partnershipTiers.types.cashPrize.description'),
      highlight: t('partnershipTiers.types.cashPrize.highlight'),
      color: 'green',
    },
    {
      title: t('partnershipTiers.types.merchApparel.title'),
      description: t('partnershipTiers.types.merchApparel.description'),
      highlight: t('partnershipTiers.types.merchApparel.highlight'),
      color: 'pink',
    },
    {
      title: t('partnershipTiers.types.equipmentServices.title'),
      description: t('partnershipTiers.types.equipmentServices.description'),
      highlight: t('partnershipTiers.types.equipmentServices.highlight'),
      color: 'yellow',
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-surface-black via-surface-dark to-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-neon-pink/10 rounded-full blur-[100px]" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <p className="text-neon-pink uppercase tracking-[0.3em] text-sm mb-4 font-display">{t('hero.label')}</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text-primary mb-6 tracking-wider">
              {t('hero.heading.part1')}{' '}
              <span className="text-neon-green text-glow-green">{t('hero.heading.highlight')}</span>
            </h1>
            <p className="text-xl text-text-muted">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Jump to Section Navigation */}
      <section className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="section-container relative z-10">
          <JumpToSection
            sections={[
              { id: 'market-opportunity', label: t('jumpToSection.marketOpportunity'), color: 'green' },
              { id: 'partnership-tiers', label: t('jumpToSection.partnershipTiers'), color: 'pink' },
              { id: 'what-partners-get', label: t('jumpToSection.whatPartnersGet'), color: 'green' },
              { id: 'contact', label: t('jumpToSection.contact'), color: 'yellow' },
            ]}
          />
        </div>
      </section>

      {/* Market Opportunity */}
      <section id="market-opportunity" className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 text-center tracking-wider">
            {t('marketOpportunity.heading').replace('OPPORTUNITY', '').trim()}{' '}
            <span className="text-neon-green text-glow-green">OPPORTUNITY</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-8 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300 text-center">
              <p className="font-display text-5xl text-neon-green text-glow-green mb-2">{t('marketOpportunity.stats.paris2024Viewers.value')}</p>
              <p className="text-text-muted">{t('marketOpportunity.stats.paris2024Viewers.label')}</p>
              <p className="text-text-muted/50 text-sm mt-2">{t('marketOpportunity.stats.paris2024Viewers.subtext')}</p>
            </div>
            <div className="p-8 bg-surface-card border border-surface-muted hover:border-neon-pink transition-all duration-300 text-center">
              <p className="font-display text-5xl text-neon-pink text-glow-pink mb-2">{t('marketOpportunity.stats.existingLeagues.value')}</p>
              <p className="text-text-muted">{t('marketOpportunity.stats.existingLeagues.label')}</p>
              <p className="text-text-muted/50 text-sm mt-2">{t('marketOpportunity.stats.existingLeagues.subtext')}</p>
            </div>
            <div className="p-8 bg-surface-card border border-surface-muted hover:border-neon-yellow transition-all duration-300 text-center">
              <p className="font-display text-5xl text-neon-yellow text-glow-yellow mb-2">{t('marketOpportunity.stats.reachableAudience.value')}</p>
              <p className="text-text-muted">{t('marketOpportunity.stats.reachableAudience.label')}</p>
              <p className="text-text-muted/50 text-sm mt-2">{t('marketOpportunity.stats.reachableAudience.subtext')}</p>
            </div>
          </div>

          <div className="p-8 bg-neon-green/10 border-l-4 border-neon-green">
            <p className="text-lg text-text-muted">
              <span className="text-neon-green font-semibold">{t('marketOpportunity.gapCallout.prefix')}</span>{' '}
              {t('marketOpportunity.gapCallout.text')}{' '}
              <span className="text-neon-pink">{t('marketOpportunity.gapCallout.highlight')}</span>{' '}
              {t('marketOpportunity.gapCallout.suffix')}
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section id="partnership-tiers" className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 text-center tracking-wider">
            {t('partnershipTiers.heading').replace('TIERS', '').trim()}{' '}
            <span className="text-neon-pink text-glow-pink">TIERS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnershipTypes.map((type, index) => (
              <div
                key={index}
                className="p-8 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300"
              >
                <p className={`text-sm uppercase tracking-wider mb-2 ${
                  type.color === 'green' ? 'text-neon-green' : 
                  type.color === 'pink' ? 'text-neon-pink' : 'text-neon-yellow'
                }`}>
                  {type.highlight}
                </p>
                <h3 className="font-display text-2xl text-text-primary mb-4 tracking-wide">{type.title}</h3>
                <p className="text-text-muted">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Partners Get */}
      <section id="what-partners-get" className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-8 text-center tracking-wider">
              {t('whatPartnersGet.heading').replace('RECEIVE', '').trim()}{' '}
              <span className="text-neon-green text-glow-green">RECEIVE</span>
            </h2>

            <ul className="space-y-4">
              {t.raw('whatPartnersGet.benefits').map((benefit: string, index: number) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-neon-green text-surface-black font-bold flex items-center justify-center text-sm shadow-glow-green">
                    ✓
                  </span>
                  <span className="text-text-muted">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl text-text-primary mb-4 tracking-wider">
              {t('contact.heading.part1')}{' '}
              <span className="text-neon-pink text-glow-pink">{t('contact.heading.highlight')}</span>
            </h2>
            <p className="text-text-muted mb-8">
              {t('contact.description')}
            </p>

            <TrackedLink
              href={`mailto:${siteConfig.contactEmail}?subject=Battle%20Royale%20Sponsorship%20Inquiry`}
              eventMeta={{ ctaId: 'sponsor_contact', label: 'Contact Email' }}
            >
              <Button variant="primary" size="lg">
                {siteConfig.contactEmail}
              </Button>
            </TrackedLink>
          </div>
        </div>
      </section>

      <EmailSignupSection />
    </PageLayout>
  );
}

