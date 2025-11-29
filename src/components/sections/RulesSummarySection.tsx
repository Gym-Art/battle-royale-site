'use client';

import { Button } from '@/components/ui/Button';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { useTranslations } from 'next-intl';
import React from 'react';

export const RulesSummarySection: React.FC = () => {
  const t = useTranslations('home.rulesSummary');
  
  return (
    <section id="rules-summary" className="section-padding bg-surface-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-neon-green/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-neon-pink/5 rounded-full blur-[80px]" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-neon-green uppercase tracking-[0.3em] text-sm mb-2 font-display">{t('label')}</p>
            <h2 className="font-display text-4xl sm:text-5xl text-text-primary mb-6 tracking-wider">
              {t('heading').replace(/EXCITING\.|EXCITANT\./g, '').trim()}{' '}
              <span className="text-neon-pink text-glow-pink">
                {t('heading').includes('EXCITING.') ? 'EXCITING.' : 'EXCITANT.'}
              </span>
            </h2>
            
            <div className="space-y-4 text-text-muted">
              <p>{t('paragraph1')}</p>
              <p>{t('paragraph2')}</p>
              <p>{t('paragraph3')}</p>
            </div>
          </div>

          <div className="bg-surface-card border border-surface-muted p-8">
            <h3 className="font-display text-2xl text-text-primary mb-6 tracking-wide">{t('competitionFlow.title')}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-neon-green text-surface-black font-display text-lg flex items-center justify-center shadow-glow-green">
                  1
                </span>
                <div>
                  <p className="text-text-primary font-semibold font-display tracking-wide">{t('competitionFlow.qualification.title')}</p>
                  <p className="text-text-muted text-sm">{t('competitionFlow.qualification.description')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-neon-pink text-surface-black font-display text-lg flex items-center justify-center shadow-glow-pink">
                  2
                </span>
                <div>
                  <p className="text-text-primary font-semibold font-display tracking-wide">{t('competitionFlow.semiFinals.title')}</p>
                  <p className="text-text-muted text-sm">{t('competitionFlow.semiFinals.description')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-neon-yellow text-surface-black font-display text-lg flex items-center justify-center shadow-glow-yellow">
                  3
                </span>
                <div>
                  <p className="text-text-primary font-semibold font-display tracking-wide">{t('competitionFlow.finals.title')}</p>
                  <p className="text-text-muted text-sm">{t('competitionFlow.finals.description')}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <TrackedLink
                href="/rules"
                eventMeta={{ ctaId: 'rules_summary_cta', label: 'Full Rules', sectionId: 'rules_summary' }}
              >
                <Button variant="ghost" className="w-full">
                  {t('button')}
                </Button>
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
