'use client';

import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { Button } from '@/components/ui/Button';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { siteConfig } from '@/config/site';
import { useHashNavigation } from '@/hooks/useHashNavigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function AboutPageClient() {
  const t = useTranslations('about');
  const sectionIds = ['vision', 'why-now', 'gym-art', 'contact'];
  useHashNavigation(sectionIds, 100);

  useEffect(() => {
    initSessionAttribution();
    trackEvent({ name: 'page_view', meta: { title: 'About' } });
  }, []);

  const whyNowCards = [
    { key: 'massiveDemand', color: 'green' },
    { key: 'noSupply', color: 'pink' },
    { key: 'weHaveDistribution', color: 'yellow' },
    { key: 'provenTechnology', color: 'green' },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-surface-black via-surface-dark to-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-neon-yellow/10 rounded-full blur-[100px]" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <p className="text-neon-yellow uppercase tracking-[0.3em] text-sm mb-4 font-display">{t('hero.label')}</p>
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

      {/* Vision */}
      <section id="vision" className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-6 tracking-wider">
              {t('vision.heading.part1')}{' '}
              <span className="text-neon-pink text-glow-pink">{t('vision.heading.highlight')}</span>
            </h2>
            
            <div className="space-y-6 text-text-muted">
              <p>
                {t('vision.paragraphs.p1.text')}{' '}
                <span className="text-neon-green">{t('vision.paragraphs.p1.highlight')}</span>{' '}
                {t('vision.paragraphs.p1.suffix')}
              </p>
              <p>
                {t('vision.paragraphs.p2')}
              </p>
              <p className="text-neon-green font-semibold text-xl text-glow-green">
                {t('vision.paragraphs.p3.highlight')}
              </p>
              <p>
                {t('vision.paragraphs.p4.text')}{' '}
                <span className="text-neon-pink">{t('vision.paragraphs.p4.highlight')}</span>{' '}
                {t('vision.paragraphs.p4.suffix')}
              </p>
              <div className="p-6 bg-surface-card border border-neon-green/30 mt-6">
                <p className="text-text-primary font-semibold mb-2">{t('vision.year1Callout.title')}</p>
                <p className="text-text-muted text-sm">
                  {t('vision.year1Callout.description.text')}{' '}
                  <span className="text-neon-pink">{t('vision.year1Callout.description.highlight')}</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section id="why-now" className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-green/5 rounded-full blur-[100px]" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-6 tracking-wider">
              {t('whyNow.heading.part1')}{' '}
              <span className="text-neon-green text-glow-green">{t('whyNow.heading.highlight')}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyNowCards.map((item, index) => (
                <div key={index} className="p-6 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300">
                  <h3 className={`font-display text-xl mb-3 tracking-wide ${
                    item.color === 'green' ? 'text-neon-green' : 
                    item.color === 'pink' ? 'text-neon-pink' : 'text-neon-yellow'
                  }`}>
                    {t(`whyNow.cards.${item.key}.title`)}
                  </h3>
                  <p className="text-text-muted">{t(`whyNow.cards.${item.key}.description`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gym Art */}
      <section id="gym-art" className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-6 tracking-wider">
              {t('gymArt.heading.part1')}{' '}
              <span className="text-neon-yellow text-glow-yellow">{t('gymArt.heading.highlight')}</span>
            </h2>
            
            <p className="text-text-muted mb-6">
              {t('gymArt.description.text')}{' '}
              <strong className="text-text-primary">{t('gymArt.description.company')}</strong>,{' '}
              {t('gymArt.description.suffix')}
            </p>
            
            <div className="p-6 bg-surface-card border border-surface-muted mb-6">
              <h3 className="font-display text-xl text-neon-green mb-3 tracking-wide">{t('gymArt.unfairAdvantage.title')}</h3>
              <ul className="space-y-3 text-text-muted">
                {t.raw('gymArt.unfairAdvantage.items').map((item: { bold: string; text: string }, index: number) => (
                  <li key={index}>
                    • <strong className="text-text-primary">{item.bold}</strong> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl text-text-primary mb-4 tracking-wider">
              {t('contact.heading.part1')}{' '}
              <span className="text-neon-green text-glow-green">{t('contact.heading.highlight')}</span>
            </h2>
            <p className="text-text-muted mb-8">
              {t('contact.description')}
            </p>

            <TrackedLink
              href={`mailto:${siteConfig.contactEmail}`}
              eventMeta={{ ctaId: 'about_contact', label: 'Contact Email' }}
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

