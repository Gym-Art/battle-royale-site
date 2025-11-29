'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

export const ForSpectatorsSection: React.FC = () => {
  const t = useTranslations('home.forSpectators');
  
  return (
    <section id="for-spectators" className="section-padding bg-surface-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-[120px]" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-neon-pink uppercase tracking-[0.3em] text-sm mb-2 font-display">{t('label')}</p>
            <h2 className="font-display text-4xl sm:text-5xl text-text-primary mb-6 tracking-wider">
              {t('heading').replace(/NEVER SEEN|JAMAIS VUE/g, '').trim()}{' '}
              <span className="text-neon-green text-glow-green">
                {t('heading').includes('NEVER SEEN') ? 'NEVER SEEN' : "JAMAIS VUE"}
              </span>
            </h2>
            
            <div className="space-y-4 text-text-muted">
              <p>{t('paragraph1')}</p>
              <p>{t('paragraph2')}</p>
              <p>{t('paragraph3')}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
                <span className="text-neon-green font-display text-xl">{t('morningQualifications.period')}</span>
              </div>
              <div>
                <h3 className="font-display text-lg text-text-primary tracking-wide">{t('morningQualifications.title')}</h3>
                <p className="text-text-muted text-sm">{t('morningQualifications.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-surface-card border border-surface-muted hover:border-neon-pink transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center">
                <span className="text-neon-pink font-display text-xl">{t('eveningFinals.period')}</span>
              </div>
              <div>
                <h3 className="font-display text-lg text-text-primary tracking-wide">{t('eveningFinals.title')}</h3>
                <p className="text-text-muted text-sm">{t('eveningFinals.description')}</p>
              </div>
            </div>

            <div className="p-4 bg-neon-yellow/10 border border-neon-yellow/30 text-center">
              <p className="text-neon-yellow font-display tracking-wide">{t('datesVenues.title')}</p>
              <p className="text-text-muted text-sm">{t('datesVenues.firstEvent')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
