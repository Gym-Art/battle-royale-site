'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

export const FAQHero: React.FC = () => {
  const t = useTranslations('faq.hero');
  
  return (
    <section className="section-padding pt-32 bg-gradient-to-b from-surface-black via-surface-dark to-surface-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-neon-green/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-neon-pink/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl">
          <p className="text-neon-green uppercase tracking-[0.3em] text-sm mb-4 font-display">{t('label')}</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text-primary mb-6 tracking-wider">
            {t('heading.part1')}{' '}
            <span className="text-neon-pink text-glow-pink">{t('heading.highlight')}</span>
          </h1>
          <p className="text-xl text-text-secondary">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  );
};

