'use client';

import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { Button } from '@/components/ui/Button';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { siteConfig } from '@/config/site';
import { useEffect } from 'react';

export default function SponsorsPage() {
  useEffect(() => {
    initSessionAttribution();
    trackEvent({ name: 'page_view', meta: { title: 'Sponsors' } });
  }, []);

  const partnershipTypes = [
    {
      title: 'Cash Prize Partners',
      description: 'Support athlete rewards directly. Your brand associated with the prize pool and winner presentations.',
      highlight: '$25,000 prize pool',
      color: 'green',
    },
    {
      title: 'Merch & Apparel Partners',
      description: 'Outfit the competition. Exclusive branding on official Battle Royale merchandise and team apparel.',
      highlight: 'High visibility',
      color: 'pink',
    },
    {
      title: 'Equipment & Services Partners',
      description: 'Provide equipment, technology, or services. Long-term association with the league infrastructure.',
      highlight: 'Year-round presence',
      color: 'magenta',
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
            <p className="text-neon-pink uppercase tracking-[0.3em] text-sm mb-4 font-display">Partnership Opportunities</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text-primary mb-6 tracking-wider">
              SPONSOR <span className="text-neon-green text-glow-green">BATTLE ROYALE</span>
            </h1>
            <p className="text-xl text-text-muted">
              Partner with the first professional gymnastics league. Reach a passionate, 
              underserved audience with year-round engagement opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 text-center tracking-wider">
            THE MARKET <span className="text-neon-green text-glow-green">OPPORTUNITY</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-8 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300 text-center">
              <p className="font-display text-5xl text-neon-green text-glow-green mb-2">41.5M</p>
              <p className="text-text-muted">Paris 2024 gymnastics viewers</p>
              <p className="text-text-muted/50 text-sm mt-2">Most-watched Olympic sport</p>
            </div>
            <div className="p-8 bg-surface-card border border-surface-muted hover:border-neon-pink transition-all duration-300 text-center">
              <p className="font-display text-5xl text-neon-pink text-glow-pink mb-2">0</p>
              <p className="text-text-muted">Existing pro leagues</p>
              <p className="text-text-muted/50 text-sm mt-2">No year-round competition</p>
            </div>
            <div className="p-8 bg-surface-card border border-surface-muted hover:border-neon-magenta transition-all duration-300 text-center">
              <p className="font-display text-5xl text-neon-magenta text-glow-magenta mb-2">250K+</p>
              <p className="text-text-muted">Reachable regional audience</p>
              <p className="text-text-muted/50 text-sm mt-2">Parents, athletes, coaches</p>
            </div>
          </div>

          <div className="p-8 bg-neon-green/10 border-l-4 border-neon-green">
            <p className="text-lg text-text-muted">
              <span className="text-neon-green font-semibold">The gap:</span> Gymnastics has massive global interest 
              but no professional ecosystem. No repeatable events. No team culture. No scalable revenue model. 
              <span className="text-neon-pink"> Battle Royale fills this gap</span> with a spectator-first format designed for growth.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 text-center tracking-wider">
            PARTNERSHIP <span className="text-neon-pink text-glow-pink">TIERS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnershipTypes.map((type, index) => (
              <div
                key={index}
                className="p-8 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300"
              >
                <p className={`text-sm uppercase tracking-wider mb-2 ${
                  type.color === 'green' ? 'text-neon-green' : 
                  type.color === 'pink' ? 'text-neon-pink' : 'text-neon-magenta'
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
      <section className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-8 text-center tracking-wider">
              WHAT PARTNERS <span className="text-neon-green text-glow-green">RECEIVE</span>
            </h2>

            <ul className="space-y-4">
              {[
                'Event-day visibility: logo placement, announcements, branded areas',
                'Digital presence: website, social media, live stream integration',
                'Direct access to the gymnastics community through Gym Art platform',
                'Hospitality: VIP access, meet-and-greets with athletes',
                'Long-term association with the first professional gymnastics league',
                'Exclusivity options within partnership category',
              ].map((benefit, index) => (
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
      <section className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl text-text-primary mb-4 tracking-wider">
              LET&apos;S <span className="text-neon-pink text-glow-pink">TALK</span>
            </h2>
            <p className="text-text-muted mb-8">
              Interested in partnering with Battle Royale? Reach out to discuss how we can 
              create value together.
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
