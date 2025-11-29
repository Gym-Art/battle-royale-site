'use client';

import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';
import { AgeCalculator } from '@/components/faq/AgeCalculator';
import { JumpToSection } from '@/components/layout/JumpToSection';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { useHashNavigation } from '@/hooks/useHashNavigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect } from 'react';

export default function RulesPageClient() {
  const locale = useLocale();
  const t = useTranslations('rules');
  const sectionIds = [
    'fundamentals',
    'team-composition',
    'apparatus',
    'score-normalization',
    'judging',
    'competition-flow',
    'registration',
    'prizes',
  ];
  useHashNavigation(sectionIds, 100);

  useEffect(() => {
    initSessionAttribution();
    trackEvent({ name: 'page_view', meta: { title: 'Format & Rules' } });
  }, []);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-surface-black via-surface-dark to-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-neon-green/10 rounded-full blur-[100px]" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <p className="text-neon-green uppercase tracking-[0.3em] text-sm mb-4 font-display">{t('hero.label')}</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text-primary mb-6 tracking-wider">
              {locale === 'en' ? (
                <>
                  {t('hero.heading').replace('RULES', '').trim()}{' '}
                  <span className="text-neon-pink text-glow-pink">RULES</span>
                </>
              ) : (
                <>
                  FORMAT & <span className="text-neon-pink text-glow-pink">RÈGLES</span>
                </>
              )}
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
              { id: 'fundamentals', label: t('navigation.fundamentals'), color: 'green' },
              { id: 'team-composition', label: t('navigation.teamComposition'), color: 'pink' },
              { id: 'apparatus', label: t('navigation.apparatus'), color: 'green' },
              { id: 'score-normalization', label: t('navigation.scoreNormalization'), color: 'pink' },
              { id: 'judging', label: t('navigation.judging'), color: 'green' },
              { id: 'competition-flow', label: t('navigation.competitionFlow'), color: 'green' },
              { id: 'registration', label: t('navigation.registration'), color: 'yellow' },
              { id: 'prizes', label: t('navigation.prizes'), color: 'pink' },
            ]}
          />
        </div>
      </section>

      {/* The Fundamentals */}
      <section id="fundamentals" className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
            <h2 className="font-display text-4xl text-text-primary mb-8 tracking-wider">
            {locale === 'en' ? (
              <>
                {t('fundamentals.heading').replace('FUNDAMENTALS', '').trim()}{' '}
                <span className="text-neon-green text-glow-green">FUNDAMENTALS</span>
              </>
            ) : (
              <span className="text-neon-green text-glow-green">{t('fundamentals.heading')}</span>
            )}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'cashPrizes', color: 'green' },
              { key: 'mixedTeams', color: 'pink' },
              { key: 'invitational', color: 'yellow' },
              { key: 'fourEvents', color: 'green' },
              { key: 'eliminationFormat', color: 'pink' },
              { key: 'figJudging', color: 'yellow' },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300">
                <h3 className={`font-display text-xl mb-3 tracking-wide ${
                  item.color === 'green' ? 'text-neon-green' : 
                  item.color === 'pink' ? 'text-neon-pink' : 'text-neon-yellow'
                }`}>
                  {t(`fundamentals.cards.${item.key}.title`)}
                </h3>
                <p className="text-text-muted">{t(`fundamentals.cards.${item.key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Composition & Eligibility */}
      <section id="team-composition" className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-neon-pink/10 rounded-full blur-[80px]" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-4 tracking-wider">
              {locale === 'en' ? (
                <>
                  {t('teamComposition.heading').replace(/COMPOSITION|ELIGIBILITY/g, '').trim()}{' '}
                  <span className="text-neon-pink text-glow-pink">COMPOSITION</span> & <span className="text-neon-pink text-glow-pink">ELIGIBILITY</span>
                </>
              ) : (
                <>
                  <span className="text-neon-pink text-glow-pink">COMPOSITION</span> D&apos;ÉQUIPE & <span className="text-neon-pink text-glow-pink">ADMISSIBILITÉ</span>
                </>
              )}
            </h2>
            <p className="text-text-muted text-lg mb-8">
              {t('teamComposition.subheading')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-green mb-4 tracking-wide">{t('teamComposition.ageRequirements.title')}</h3>
                <p className="text-text-muted mb-3" dangerouslySetInnerHTML={{ __html: t('teamComposition.ageRequirements.description') }} />
                <AgeCalculator />
              </div>

              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-pink mb-4 tracking-wide">{t('teamComposition.skillLevel.title')}</h3>
                <p className="text-text-muted mb-3" dangerouslySetInnerHTML={{ __html: t('teamComposition.skillLevel.description') }} />
                <p className="text-text-muted mb-3 text-sm">
                  {t('teamComposition.skillLevel.routineNote')}
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <TrackedLink
                    href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1%20-%20MAG%20CoP%202025-2028.pdf"
                    eventMeta={{ ctaId: 'rules_mag_cop', label: 'MAG Code of Points' }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors"
                  >
                    <span>📄</span> {t('teamComposition.skillLevel.magCop')}
                  </TrackedLink>
                  <TrackedLink
                    href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1.%20WAG%20Code%20of%20Points%202025-2028.pdf"
                    eventMeta={{ ctaId: 'rules_wag_cop', label: 'WAG Code of Points' }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink/10 border border-neon-pink/30 text-neon-pink hover:bg-neon-pink/20 transition-colors"
                  >
                    <span>📄</span> {t('teamComposition.skillLevel.wagCop')}
                  </TrackedLink>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-card border border-surface-muted mb-8">
              <h3 className="font-display text-xl text-neon-yellow mb-4 tracking-wide">{t('teamComposition.teamComposition.title')}</h3>
              <ul className="space-y-3 text-text-muted">
                {t.raw('teamComposition.teamComposition.items').map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-neon-yellow">•</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-neon-yellow/10 border border-neon-yellow/30 mb-8">
              <p className="text-neon-yellow font-display text-sm tracking-wider mb-2">{t('teamComposition.nationalTeamLimit.title')}</p>
              <p className="text-text-muted" dangerouslySetInnerHTML={{ __html: t('teamComposition.nationalTeamLimit.description') }} />
            </div>

            <div className="p-6 bg-surface-card border border-surface-muted">
              <h3 className="font-display text-xl text-neon-green mb-4 tracking-wide">{t('teamComposition.apparelRequirements.title')}</h3>
              <p className="text-text-muted" dangerouslySetInnerHTML={{ __html: t('teamComposition.apparelRequirements.description') }} />
            </div>
          </div>
        </div>
      </section>

      {/* Apparatus */}
      <section id="apparatus" className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-4 tracking-wider">
              <span className="text-neon-green text-glow-green">{t('apparatus.heading')}</span>
            </h2>
            <p className="text-text-muted text-lg mb-8">
              {t('apparatus.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-surface-card border border-neon-pink/30">
                <h3 className="font-display text-xl text-neon-pink mb-4 tracking-wide">{t('apparatus.wag.title')}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-pink">
                      <Image src="/apparatus_icons/vault.svg" alt="Vault" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">{t('apparatus.wag.apparatus.vault')}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-pink">
                      <Image src="/apparatus_icons/ubars.svg" alt="Uneven Bars" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">{t('apparatus.wag.apparatus.unevenBars')}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-pink">
                      <Image src="/apparatus_icons/beam.svg" alt="Balance Beam" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">{t('apparatus.wag.apparatus.balanceBeam')}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-pink">
                      <Image src="/apparatus_icons/floor.svg" alt="Floor Exercise" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">{t('apparatus.wag.apparatus.floorExercise')}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-surface-card border border-neon-green/30">
                <h3 className="font-display text-xl text-neon-green mb-4 tracking-wide">{t('apparatus.mag.title')}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-green">
                      <Image src="/apparatus_icons/vault.svg" alt="Vault" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">{t('apparatus.mag.apparatus.vault')}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-green">
                      <Image src="/apparatus_icons/floor.svg" alt="Floor Exercise" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">{t('apparatus.mag.apparatus.floorExercise')}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-green">
                      <Image src="/apparatus_icons/rings.svg" alt="Still Rings" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">{t('apparatus.mag.apparatus.stillRings')}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-green">
                      <Image src="/apparatus_icons/hbar.svg" alt="High Bar" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">{t('apparatus.mag.apparatus.highBar')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-card border border-surface-muted mb-8">
              <p className="text-text-muted mb-4" dangerouslySetInnerHTML={{ __html: t('apparatus.mixedTeams') }} />
            </div>

            <div className="p-6 bg-surface-muted/30 border border-surface-muted">
              <p className="text-neon-yellow font-display text-sm tracking-wider mb-2">
                {t('apparatus.whyNoPommel.title')}
              </p>
              <p className="text-text-muted mb-3" dangerouslySetInnerHTML={{ __html: t('apparatus.whyNoPommel.description') }} />
              <p className="text-text-muted" dangerouslySetInnerHTML={{ __html: t('apparatus.whyNoPommel.kept') }} />
            </div>
          </div>
        </div>
      </section>

      {/* Score Normalization */}
      <section id="score-normalization" className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-neon-pink/10 rounded-full blur-[80px]" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-4 tracking-wider">
              {locale === 'en' ? (
                <>
                  {t('scoreNormalization.heading').replace('NORMALIZATION', '').trim()}{' '}
                  <span className="text-neon-pink text-glow-pink">NORMALIZATION</span>
                </>
              ) : (
                <span className="text-neon-pink text-glow-pink">{t('scoreNormalization.heading')}</span>
              )}
            </h2>
            <p className="text-text-muted text-lg mb-8">
              {t('scoreNormalization.description')}
            </p>

            <div className="p-8 bg-surface-card border border-surface-muted mb-8">
              <h3 className="font-display text-2xl text-neon-pink mb-4 tracking-wide">{t('scoreNormalization.problem.title')}</h3>
              <p className="text-text-muted mb-4">
                {t('scoreNormalization.problem.description')}
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                {t.raw('scoreNormalization.problem.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-neon-green/10 border border-neon-green/30 mb-8">
              <h3 className="font-display text-2xl text-neon-green mb-4 tracking-wide">{t('scoreNormalization.solution.title')}</h3>
              <p className="text-text-muted mb-4" dangerouslySetInnerHTML={{ __html: t('scoreNormalization.solution.description') }} />
              <p className="text-text-muted" dangerouslySetInnerHTML={{ __html: t('scoreNormalization.solution.example') }} />
            </div>

            <div className="p-8 bg-surface-card border border-surface-muted">
              <h3 className="font-display text-2xl text-text-primary mb-4 tracking-wide">{t('scoreNormalization.whatStaysSame.title')}</h3>
              <ul className="space-y-3">
                {t.raw('scoreNormalization.whatStaysSame.items').map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-neon-green">✓</span>
                    <span className="text-text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Judging & Scoring */}
      <section id="judging" className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-4 tracking-wider">
              {locale === 'en' ? (
                <>
                  {t('judging.heading').replace('SCORING', '').trim()}{' '}
                  <span className="text-neon-green text-glow-green">SCORING</span>
                </>
              ) : (
                <>
                  JUGEMENT & <span className="text-neon-green text-glow-green">NOTATION</span>
                </>
              )}
            </h2>
            <p className="text-text-muted text-lg mb-8">
              {t('judging.description')}
            </p>

            <div className="p-8 bg-surface-card border border-surface-muted mb-8">
              <h3 className="font-display text-2xl text-neon-green mb-4 tracking-wide">{t('judging.structure.title')}</h3>
              <p className="text-text-muted mb-4" dangerouslySetInnerHTML={{ __html: t('judging.structure.description') }} />
              <p className="text-text-muted mb-4">
                {t('judging.structure.system')}
              </p>
              <p className="text-text-muted">
                {t('judging.structure.judges')}
              </p>
            </div>

            <div className="p-8 bg-neon-green/10 border border-neon-green/30 mb-8">
              <h3 className="font-display text-2xl text-neon-green mb-4 tracking-wide">{t('judging.codeOfPoints.title')}</h3>
              <p className="text-text-muted mb-4" dangerouslySetInnerHTML={{ __html: t('judging.codeOfPoints.description') }} />
              <p className="text-text-muted">
                {t('judging.codeOfPoints.normalization')}
              </p>
            </div>

            <div className="p-8 bg-surface-card border border-surface-muted">
              <h3 className="font-display text-2xl text-neon-pink mb-4 tracking-wide">{t('judging.scoreSubmission.title')}</h3>
              <p className="text-text-muted mb-4" dangerouslySetInnerHTML={{ __html: t('judging.scoreSubmission.description') }} />
              <p className="text-text-muted">
                {t('judging.scoreSubmission.process')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Flow */}
      <section id="competition-flow" className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 tracking-wider">
            {locale === 'en' ? (
              <>
                {t('competitionFlow.heading').replace('FLOW', '').trim()}{' '}
                <span className="text-neon-green text-glow-green">FLOW</span>
              </>
            ) : (
              <>
                DÉROULEMENT DE LA <span className="text-neon-green text-glow-green">COMPÉTITION</span>
              </>
            )}
          </h2>

          <div className="space-y-8">
            {/* Qualification */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="p-6 bg-neon-green text-surface-black">
                <p className="font-display text-4xl mb-2">1</p>
                <h3 className="font-display text-2xl tracking-wide">{t('competitionFlow.qualification.title')}</h3>
                <p className="text-sm opacity-80">{t('competitionFlow.qualification.time')}</p>
              </div>
              <div className="lg:col-span-2 p-6 bg-surface-card border border-surface-muted">
                <ul className="space-y-3 text-text-muted">
                  {t.raw('competitionFlow.qualification.items').map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                  ))}
                </ul>
              </div>
            </div>

            {/* Semi-Finals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="p-6 bg-neon-pink text-surface-black">
                <p className="font-display text-4xl mb-2">2</p>
                <h3 className="font-display text-2xl tracking-wide">{t('competitionFlow.semiFinals.title')}</h3>
                <p className="text-sm opacity-80">{t('competitionFlow.semiFinals.time')}</p>
              </div>
              <div className="lg:col-span-2 p-6 bg-surface-card border border-surface-muted">
                <ul className="space-y-3 text-text-muted">
                  {t.raw('competitionFlow.semiFinals.items').map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                  ))}
                </ul>
              </div>
            </div>

            {/* Finals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="p-6 bg-neon-yellow text-surface-black">
                <p className="font-display text-4xl mb-2">3</p>
                <h3 className="font-display text-2xl tracking-wide">{t('competitionFlow.finals.title')}</h3>
                <p className="text-sm opacity-80">{t('competitionFlow.finals.time')}</p>
              </div>
              <div className="lg:col-span-2 p-6 bg-surface-card border border-surface-muted">
                <ul className="space-y-3 text-text-muted">
                  {t.raw('competitionFlow.finals.items').map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Appointment-Based Scheduling */}
          <div className="mt-12 p-8 bg-neon-green/10 border border-neon-green/30">
            <h3 className="font-display text-2xl text-neon-green mb-4 tracking-wide">{t('competitionFlow.appointmentScheduling.title')}</h3>
            <p className="text-text-muted mb-4" dangerouslySetInnerHTML={{ __html: t('competitionFlow.appointmentScheduling.description') }} />
            <p className="text-text-muted mb-4">
              {t('competitionFlow.appointmentScheduling.example')}
            </p>
            <p className="text-text-muted">
              {t('competitionFlow.appointmentScheduling.benefit')}
            </p>
          </div>

          {/* Time Limits & Falls */}
          <div className="mt-8 p-8 bg-surface-card border border-surface-muted">
            <h3 className="font-display text-2xl text-neon-pink mb-4 tracking-wide">{t('competitionFlow.timeLimits.title')}</h3>
            <div className="space-y-4 text-text-muted">
              <div>
                <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('competitionFlow.timeLimits.qualification') }} />
              </div>
              <div>
                <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('competitionFlow.timeLimits.semiFinalsFinals') }} />
                <p className="text-sm">
                  {t('competitionFlow.timeLimits.falls')}
                </p>
              </div>
            </div>
          </div>

          {/* Tie-Breaking */}
          <div className="mt-8 p-8 bg-surface-card border border-surface-muted">
            <h3 className="font-display text-2xl text-neon-yellow mb-4 tracking-wide">{t('competitionFlow.tieBreaking.title')}</h3>
            <p className="text-text-muted mb-4" dangerouslySetInnerHTML={{ __html: t('competitionFlow.tieBreaking.description') }} />
            <ol className="list-decimal list-inside space-y-2 text-text-muted ml-2 mb-4">
              {t.raw('competitionFlow.tieBreaking.items').map((item: string, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ol>
            <div className="p-4 bg-neon-yellow/10 border border-neon-yellow/30 rounded">
              <p className="text-neon-yellow font-display text-sm tracking-wider mb-2">{t('competitionFlow.tieBreaking.deathMatch.title')}</p>
              <p className="text-text-muted" dangerouslySetInnerHTML={{ __html: t('competitionFlow.tieBreaking.deathMatch.description') }} />
            </div>
          </div>
        </div>
      </section>

      {/* Registration & Logistics */}
      <section id="registration" className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-neon-yellow/10 rounded-full blur-[80px]" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-4 tracking-wider">
              {locale === 'en' ? (
                <>
                  {t('registration.heading').replace('LOGISTICS', '').trim()}{' '}
                  <span className="text-neon-yellow text-glow-yellow">LOGISTICS</span>
                </>
              ) : (
                <>
                  INSCRIPTION & <span className="text-neon-yellow text-glow-yellow">LOGISTIQUE</span>
                </>
              )}
            </h2>
            <p className="text-text-muted text-lg mb-8">
              {t('registration.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-green mb-4 tracking-wide">{t('registration.pricing.title')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">{t('registration.pricing.perGymnast')}</span>
                    <span className="font-display text-2xl text-neon-green">$250 CAD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">{t('registration.pricing.perCoach')}</span>
                    <span className="font-display text-2xl text-neon-pink">$150 CAD</span>
                  </div>
                </div>
                <p className="text-text-muted text-sm mt-4">
                  {t('registration.pricing.note')}
                </p>
              </div>

              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-pink mb-4 tracking-wide">{t('registration.timeline.title')}</h3>
                <p className="text-text-muted mb-3" dangerouslySetInnerHTML={{ __html: t('registration.timeline.description') }} />
                <ul className="space-y-2 text-text-muted text-sm">
                  {t.raw('registration.timeline.events').map((event: string, index: number) => (
                    <li key={index}>• {event}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 bg-surface-card border border-surface-muted mb-8">
              <h3 className="font-display text-xl text-neon-yellow mb-4 tracking-wide">{t('registration.process.title')}</h3>
              <p className="text-text-muted mb-4" dangerouslySetInnerHTML={{ __html: t('registration.process.description') }} />
              <ul className="space-y-2 text-text-muted">
                {t.raw('registration.process.items').map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-neon-yellow">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-green mb-4 tracking-wide">{t('registration.warmUps.title')}</h3>
                <p className="text-text-muted">
                  {t('registration.warmUps.description')}
                </p>
              </div>

              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-pink mb-4 tracking-wide">{t('registration.venueLocations.title')}</h3>
                <p className="text-text-muted mb-3" dangerouslySetInnerHTML={{ __html: t('registration.venueLocations.description') }} />
                <p className="text-text-muted text-sm">
                  {t('registration.venueLocations.note')}
                </p>
              </div>
            </div>

            <div className="p-6 bg-surface-muted/30 border border-surface-muted">
              <h3 className="font-display text-xl text-neon-yellow mb-4 tracking-wide">{t('registration.cancellationPolicy.title')}</h3>
              <p className="text-text-muted" dangerouslySetInnerHTML={{ __html: t('registration.cancellationPolicy.description') }} />
            </div>
          </div>
        </div>
      </section>

      {/* Prize Breakdown */}
      <section id="prizes" className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 text-center tracking-wider">
            {locale === 'en' ? (
              <>
                {t('prizes.heading').replace('BREAKDOWN', '').trim()}{' '}
                <span className="text-neon-pink text-glow-pink">BREAKDOWN</span>
              </>
            ) : (
              <>
                RÉPARTITION DES <span className="text-neon-pink text-glow-pink">PRIX</span>
              </>
            )}
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-8 bg-gradient-to-b from-neon-green/20 to-surface-card border border-neon-green shadow-glow-green">
                <p className="font-display text-5xl text-neon-green text-glow-green mb-2">$15K</p>
                <p className="text-text-primary font-semibold font-display tracking-wide">{t('prizes.firstPlace')}</p>
              </div>
              <div className="p-8 bg-surface-card border border-neon-pink/50">
                <p className="font-display text-4xl text-neon-pink mb-2">$7.5K</p>
                <p className="text-text-muted font-semibold font-display tracking-wide">{t('prizes.secondPlace')}</p>
              </div>
              <div className="p-8 bg-surface-card border border-surface-muted">
                <p className="font-display text-3xl text-text-muted mb-2">$2.5K</p>
                <p className="text-text-muted/70 font-semibold font-display tracking-wide">{t('prizes.thirdPlace')}</p>
              </div>
            </div>
            
            <p className="text-center text-text-muted mt-6" dangerouslySetInnerHTML={{ __html: t('prizes.merchandise') }} />
            
            <div className="mt-8 p-6 bg-surface-muted/30 border border-neon-yellow/30 text-center">
              <p className="text-text-muted" dangerouslySetInnerHTML={{ __html: t('prizes.year1') }} />
              <p className="text-text-muted/70 text-sm mt-2">
                {t('prizes.goal')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailSignupSection />
    </PageLayout>
  );
}

