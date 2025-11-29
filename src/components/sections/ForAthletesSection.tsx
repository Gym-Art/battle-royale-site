'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

export const ForAthletesSection: React.FC = () => {
  const t = useTranslations('home.forAthletes');
  
  const highlights = [
    {
      title: t('highlights.cashPrizes.title'),
      description: t('highlights.cashPrizes.description'),
      color: 'green',
    },
    {
      title: t('highlights.mixedTeams.title'),
      description: t('highlights.mixedTeams.description'),
      color: 'pink',
    },
    {
      title: t('highlights.figLevel.title'),
      description: t('highlights.figLevel.description'),
      color: 'green',
    },
    {
      title: t('highlights.fourEvents.title'),
      description: t('highlights.fourEvents.description'),
      color: 'pink',
    },
  ];

  return (
    <section id="for-athletes" className="section-padding bg-surface-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-green/5 rounded-full blur-[100px]" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <p className="text-neon-green uppercase tracking-[0.3em] text-sm mb-2 font-display">{t('label')}</p>
          <h2 className="font-display text-4xl sm:text-5xl text-text-primary tracking-wider">
            {t('heading').replace('PRO', '').trim()}{' '}
            <span className="text-neon-pink text-glow-pink">PRO</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`p-6 bg-surface-card border border-surface-muted transition-all duration-300 
                         hover:border-${item.color === 'green' ? 'neon-green' : 'neon-pink'} 
                         hover:shadow-glow-${item.color === 'green' ? 'green' : 'pink'}`}
              style={{
                ['--hover-border' as string]: item.color === 'green' ? '#39FF14' : '#FF2D6A',
              }}
            >
              <h3 className={`font-display text-xl mb-2 tracking-wide ${
                item.color === 'green' ? 'text-neon-green' : 'text-neon-pink'
              }`}>
                {item.title}
              </h3>
              <p className="text-text-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 border-l-4 border-neon-green bg-gradient-to-r from-neon-green/10 to-transparent">
          <p className="text-lg text-text-primary">
            {t('callout').includes(':') ? (
              <>
                <span className="text-neon-green font-semibold">{t('callout').split(':')[0]}:</span>{' '}
                <span className="text-text-muted">
                  {t('callout').split(':').slice(1).join(':').trim()}
                </span>
              </>
            ) : (
              <span className="text-text-muted">{t('callout')}</span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};
