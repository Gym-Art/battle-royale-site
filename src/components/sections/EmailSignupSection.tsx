'use client';

import { EmailForm } from '@/components/ui/EmailForm';
import { useTranslations } from 'next-intl';
import React from 'react';

export const EmailSignupSection: React.FC = () => {
  const t = useTranslations('home.emailSignup');
  
  return (
    <section id="stay-connected" className="section-padding bg-gradient-to-b from-surface-dark via-surface-black to-surface-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[150px]" />
      
      {/* Neon divider at top */}
      <div className="absolute top-0 left-0 right-0 divider-neon" />
      
      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-neon-pink uppercase tracking-[0.3em] text-sm mb-2 font-display">{t('label')}</p>
          <h2 className="font-display text-4xl sm:text-5xl text-text-primary mb-4 tracking-wider">
            {t('heading').replace(/WAITLIST|LISTE D'ATTENTE/g, '').trim()}{' '}
            <span className="text-neon-green text-glow-green">
              {t('heading').includes('WAITLIST') ? 'WAITLIST' : "LISTE D'ATTENTE"}
            </span>
          </h2>
          <p className="text-text-muted mb-8">
            {t('description')}
          </p>
          
          <div className="flex justify-center mb-12">
            <EmailForm />
          </div>

          <p className="text-text-muted/50 text-sm">
            {t('footer')}
          </p>
        </div>
      </div>
    </section>
  );
};
