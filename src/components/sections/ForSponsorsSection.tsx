'use client';

import { Button } from '@/components/ui/Button';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { useTranslations } from 'next-intl';
import React from 'react';

export const ForSponsorsSection: React.FC = () => {
  const t = useTranslations('home.forSponsors');
  
  return (
    <section id="for-sponsors" className="section-padding bg-surface-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[150px]" />
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-neon-yellow uppercase tracking-[0.3em] text-sm mb-2 font-display">{t('label')}</p>
          <h2 className="font-display text-4xl sm:text-5xl text-text-primary mb-6 tracking-wider">
            {t('heading').replace(/FUTURE|AVENIR/g, '').trim()}{' '}
            <span className="text-neon-green text-glow-green">
              {t('heading').includes('FUTURE') ? 'FUTURE' : 'AVENIR'}
            </span>
          </h2>
          
          <p className="text-text-muted text-lg mb-8">
            {t('description')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="p-6 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300">
              <p className="font-display text-3xl text-neon-green text-glow-green">41.5M</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">{t('stats.olympicViewers')}</p>
            </div>
            <div className="p-6 bg-surface-card border border-surface-muted hover:border-neon-pink transition-all duration-300">
              <p className="font-display text-3xl text-neon-pink text-glow-pink">23K+</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">{t('stats.regionalGymnasts')}</p>
            </div>
            <div className="p-6 bg-surface-card border border-surface-muted hover:border-neon-yellow transition-all duration-300">
              <p className="font-display text-3xl text-neon-yellow text-glow-yellow">250K+</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">{t('stats.reachableAudience')}</p>
            </div>
          </div>

          <TrackedLink
            href="/sponsors"
            eventMeta={{ ctaId: 'sponsors_cta', label: 'Sponsorship Info', sectionId: 'for_sponsors' }}
          >
            <Button variant="outline" size="lg">
              {t('button')}
            </Button>
          </TrackedLink>
        </div>
      </div>
    </section>
  );
};
