'use client';

import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';
import { AgeCalculator } from '@/components/faq/AgeCalculator';
import { JumpToSection } from '@/components/layout/JumpToSection';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { useHashNavigation } from '@/hooks/useHashNavigation';
import Image from 'next/image';
import { useEffect } from 'react';

export default function RulesPage() {
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
            <p className="text-neon-green uppercase tracking-[0.3em] text-sm mb-4 font-display">Competition Format</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text-primary mb-6 tracking-wider">
              FORMAT & <span className="text-neon-pink text-glow-pink">RULES</span>
            </h1>
            <p className="text-xl text-text-muted">
              Everything you need to know about how Battle Royale works—from team composition 
              to score normalization.
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
              { id: 'fundamentals', label: 'Fundamentals', color: 'green' },
              { id: 'team-composition', label: 'Team Composition', color: 'pink' },
              { id: 'apparatus', label: 'Apparatus', color: 'green' },
              { id: 'score-normalization', label: 'Score Normalization', color: 'pink' },
              { id: 'judging', label: 'Judging & Scoring', color: 'green' },
              { id: 'competition-flow', label: 'Competition Flow', color: 'green' },
              { id: 'registration', label: 'Registration', color: 'yellow' },
              { id: 'prizes', label: 'Prizes', color: 'pink' },
            ]}
          />
        </div>
      </section>

      {/* The Fundamentals */}
      <section id="fundamentals" className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 tracking-wider">
            THE <span className="text-neon-green text-glow-green">FUNDAMENTALS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Cash Prizes', desc: '$25K per event. $100K total in Year 1. 1st: $15K. 2nd: $7.5K. 3rd: $2.5K. Teams 4th–8th get merch prizes.', color: 'green' },
              { title: 'Mixed Teams', desc: '64 team spots per event. Minimum 3 gymnasts, no max. Teams can be all women, all men, or any mix.', color: 'pink' },
              { title: 'Invitational', desc: 'Open to all gymnasts 16+ who can perform FIG-level routines. No federation restrictions or qualification requirements.', color: 'yellow' },
              { title: '4 Events Per Year', desc: 'Year 1 runs Nov 2026 – Jun 2027. Each event is one day: qualification, semi-final, and final.', color: 'green' },
              { title: 'Elimination Format', desc: '64 teams qualify, 12 advance to semi-finals, 4 make the finals. Progressively fewer routines with higher stakes.', color: 'pink' },
              { title: 'FIG Judging', desc: 'Same routines. Same judging criteria. Same FIG rules. Just normalized scores for fair cross-apparatus comparison.', color: 'yellow' },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300">
                <h3 className={`font-display text-xl mb-3 tracking-wide ${
                  item.color === 'green' ? 'text-neon-green' : 
                  item.color === 'pink' ? 'text-neon-pink' : 'text-neon-yellow'
                }`}>
                  {item.title}
                </h3>
                <p className="text-text-muted">{item.desc}</p>
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
              TEAM <span className="text-neon-pink text-glow-pink">COMPOSITION</span> & <span className="text-neon-pink text-glow-pink">ELIGIBILITY</span>
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Who can compete and how teams are formed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-green mb-4 tracking-wide">AGE REQUIREMENTS</h3>
                <p className="text-text-muted mb-3">
                  Athletes must be at least <strong className="text-text-primary">16 years old</strong> on the day of the event. There is no upper age limit.
                </p>
                <AgeCalculator />
              </div>

              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-pink mb-4 tracking-wide">SKILL LEVEL</h3>
                <p className="text-text-muted mb-3">
                  Athletes should be capable of performing <strong className="text-text-primary">FIG Senior-level routines</strong>. This typically means competitive Level 10, Elite, or NCAA-level gymnasts for WAG, and Level 10 or Elite for MAG.
                </p>
                <p className="text-text-muted mb-3 text-sm">
                  A FIG routine consists of 6-8 elements from the FIG Code of Points.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <TrackedLink
                    href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1%20-%20MAG%20CoP%202025-2028.pdf"
                    eventMeta={{ ctaId: 'rules_mag_cop', label: 'MAG Code of Points' }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors"
                  >
                    <span>📄</span> MAG Code of Points (2025-2028)
                  </TrackedLink>
                  <TrackedLink
                    href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1.%20WAG%20Code%20of%20Points%202025-2028.pdf"
                    eventMeta={{ ctaId: 'rules_wag_cop', label: 'WAG Code of Points' }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink/10 border border-neon-pink/30 text-neon-pink hover:bg-neon-pink/20 transition-colors"
                  >
                    <span>📄</span> WAG Code of Points (2025-2028)
                  </TrackedLink>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-card border border-surface-muted mb-8">
              <h3 className="font-display text-xl text-neon-yellow mb-4 tracking-wide">TEAM COMPOSITION</h3>
              <ul className="space-y-3 text-text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-neon-yellow">•</span>
                  <span><strong className="text-text-primary">Minimum 3 gymnasts</strong>, no maximum size</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-yellow">•</span>
                  <span>Teams can be all women, all men, or any mix</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-yellow">•</span>
                  <span>Gymnasts from different clubs can form teams together—no club or federation restrictions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-yellow">•</span>
                  <span>No federation membership required</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-yellow">•</span>
                  <span>Each gymnast may only compete on <strong className="text-text-primary">one team per event</strong></span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-neon-yellow/10 border border-neon-yellow/30 mb-8">
              <p className="text-neon-yellow font-display text-sm tracking-wider mb-2">NATIONAL TEAM LIMIT</p>
              <p className="text-text-muted">
                To prevent &quot;super teams&quot; in the early seasons, each team may only include{' '}
                <strong className="text-text-primary">one current national team member</strong>. This ensures competitive balance and gives all teams a fair chance.
              </p>
            </div>

            <div className="p-6 bg-surface-card border border-surface-muted">
              <h3 className="font-display text-xl text-neon-green mb-4 tracking-wide">APPAREL REQUIREMENTS</h3>
              <p className="text-text-muted">
                <span className="text-neon-pink font-semibold">No singlet requirement.</span> Teams must have{' '}
                <strong className="text-text-primary">2 main team colors</strong> and wear matching, non-baggy attire. Express your team&apos;s identity however you want—this is about entertainment and team spirit.
              </p>
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
              <span className="text-neon-green text-glow-green">APPARATUS</span>
            </h2>
            <p className="text-text-muted text-lg mb-8">
              The events that make up Battle Royale competition.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-surface-card border border-neon-pink/30">
                <h3 className="font-display text-xl text-neon-pink mb-4 tracking-wide">WAG (4 EVENTS)</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-pink">
                      <Image src="/apparatus_icons/vault.svg" alt="Vault" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">Vault</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-pink">
                      <Image src="/apparatus_icons/ubars.svg" alt="Uneven Bars" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">Uneven Bars</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-pink">
                      <Image src="/apparatus_icons/beam.svg" alt="Balance Beam" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">Balance Beam</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-pink">
                      <Image src="/apparatus_icons/floor.svg" alt="Floor Exercise" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">Floor Exercise</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-surface-card border border-neon-green/30">
                <h3 className="font-display text-xl text-neon-green mb-4 tracking-wide">MAG (4 EVENTS)</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-green">
                      <Image src="/apparatus_icons/vault.svg" alt="Vault" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">Vault</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-green">
                      <Image src="/apparatus_icons/floor.svg" alt="Floor Exercise" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">Floor Exercise</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-green">
                      <Image src="/apparatus_icons/rings.svg" alt="Still Rings" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">Still Rings</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-surface-dark/50 rounded">
                    <div className="mb-2 icon-green">
                      <Image src="/apparatus_icons/hbar.svg" alt="High Bar" width={40} height={40} />
                    </div>
                    <span className="text-text-muted text-sm">High Bar</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-card border border-surface-muted mb-8">
              <p className="text-text-muted mb-4">
                Mixed teams can use any combination of these <strong className="text-text-primary">8 apparatus</strong>.
              </p>
            </div>

            <div className="p-6 bg-surface-muted/30 border border-surface-muted">
              <p className="text-neon-yellow font-display text-sm tracking-wider mb-2">
                WHY NO POMMEL HORSE OR PARALLEL BARS?
              </p>
              <p className="text-text-muted mb-3">
                We&apos;ve streamlined the men&apos;s apparatus to 4 events to match women&apos;s gymnastics.{' '}
                <strong className="text-text-primary">Pommel Horse</strong> was removed because it&apos;s often the trickiest event for gymnasts and prone to falls.{' '}
                <strong className="text-text-primary">Parallel Bars</strong> was removed because routines take the longest—and we&apos;re focused on an action-packed spectator experience.
              </p>
              <p className="text-text-muted">
                We kept <span className="text-neon-green">Still Rings</span> (iconic strength event),{' '}
                <span className="text-neon-green">High Bar</span> (spectacular releases and dismounts), plus Vault and Floor (shared with women&apos;s).
              </p>
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
              SCORE <span className="text-neon-pink text-glow-pink">NORMALIZATION</span>
            </h2>
            <p className="text-text-muted text-lg mb-8">
              The breakthrough that makes Battle Royale possible.
            </p>

            <div className="p-8 bg-surface-card border border-surface-muted mb-8">
              <h3 className="font-display text-2xl text-neon-pink mb-4 tracking-wide">THE PROBLEM</h3>
              <p className="text-text-muted mb-4">
                In traditional FIG gymnastics, different apparatus have different maximum scores 
                based on the difficulty of skills available. A 15.5 on vault means something 
                different than a 15.5 on beam. This makes it impossible to:
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                <li>Compare routines across different apparatus</li>
                <li>Compare WAG (women&apos;s) and MAG (men&apos;s) scores directly</li>
                <li>Create mixed-gender teams that compete fairly</li>
                <li>Help casual viewers understand who&apos;s winning</li>
              </ul>
            </div>

            <div className="p-8 bg-neon-green/10 border border-neon-green/30 mb-8">
              <h3 className="font-display text-2xl text-neon-green mb-4 tracking-wide">THE SOLUTION</h3>
              <p className="text-text-muted mb-4">
                <strong className="text-neon-green">Score Normalization:</strong> We take the standard FIG score 
                and scale it based on the highest possible start value for that apparatus. The result 
                is a final score out of 10.
              </p>
              <p className="text-text-muted">
                This means a <span className="text-neon-pink">9.2 on beam</span> can be directly compared to a <span className="text-neon-pink">9.2 on high bar</span>. Spectators 
                instantly understand the quality of each routine. Mixed WAG/MAG teams become possible 
                and fair.
              </p>
            </div>

            <div className="p-8 bg-surface-card border border-surface-muted">
              <h3 className="font-display text-2xl text-text-primary mb-4 tracking-wide">WHAT STAYS THE SAME</h3>
              <ul className="space-y-3">
                {[
                  'Athletes perform their existing FIG routines—no changes required',
                  'Judges use standard FIG Code of Points',
                  'Difficulty (D) scores and Execution (E) scores work the same way',
                  'Deductions for falls, errors, and execution remain unchanged',
                ].map((item, index) => (
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
              JUDGING & <span className="text-neon-green text-glow-green">SCORING</span>
            </h2>
            <p className="text-text-muted text-lg mb-8">
              How routines are evaluated and scores are calculated.
            </p>

            <div className="p-8 bg-surface-card border border-surface-muted mb-8">
              <h3 className="font-display text-2xl text-neon-green mb-4 tracking-wide">JUDGING STRUCTURE</h3>
              <p className="text-text-muted mb-4">
                In the qualification round, we use <strong className="text-text-primary">two panels per event</strong>, with each panel consisting of{' '}
                <strong className="text-text-primary">one judge</strong> who evaluates both Difficulty and Execution for maximum speed.
              </p>
              <p className="text-text-muted mb-4">
                The system works like this: One gymnast competes, and the moment they finish, the first panel starts judging them. While the first panel is judging, the next gymnast competes while the second panel judges them. When they finish, the panels swap. This means there&apos;s always someone competing at all times—we must respect strict time restraints.
              </p>
              <p className="text-text-muted">
                We only select the best of the best judges: those who are fast, accurate, and unbiased. This streamlined approach ensures constant action while maintaining the highest judging standards.
              </p>
            </div>

            <div className="p-8 bg-neon-green/10 border border-neon-green/30 mb-8">
              <h3 className="font-display text-2xl text-neon-green mb-4 tracking-wide">CODE OF POINTS</h3>
              <p className="text-text-muted mb-4">
                Judges use the <strong className="text-text-primary">FIG Code of Points</strong> (current cycle). Judges use the same deductions, difficulty values, and execution standards they&apos;re already trained on.
              </p>
              <p className="text-text-muted">
                Score normalization doesn&apos;t affect judging at all. Judges judge routines normally using FIG standards. The normalization calculation happens after scores are submitted—it&apos;s a mathematical transformation applied to make scores comparable across apparatus.
              </p>
            </div>

            <div className="p-8 bg-surface-card border border-surface-muted">
              <h3 className="font-display text-2xl text-neon-pink mb-4 tracking-wide">SCORE SUBMISSION</h3>
              <p className="text-text-muted mb-4">
                Judges submit scores using the <strong className="text-text-primary">Judges Companion app</strong>, a helper app built into Gym Art Meets. This is our in-house application designed for maximum speed and super easy use.
              </p>
              <p className="text-text-muted">
                You simply input an FIG score, and the score normalization happens automatically in the background. On the scoreboard, spectators see the normalized score out of 10—all done seamlessly without changing your judging process.
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
            COMPETITION <span className="text-neon-green text-glow-green">FLOW</span>
          </h2>

          <div className="space-y-8">
            {/* Qualification */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="p-6 bg-neon-green text-surface-black">
                <p className="font-display text-4xl mb-2">1</p>
                <h3 className="font-display text-2xl tracking-wide">QUALIFICATION</h3>
                <p className="text-sm opacity-80">9:00 AM – 3:00 PM</p>
              </div>
              <div className="lg:col-span-2 p-6 bg-surface-card border border-surface-muted">
                <ul className="space-y-3 text-text-muted">
                  <li>• Four qualification rounds, each lasting 80 minutes</li>
                  <li>• Each team performs <strong className="text-text-primary">8 routines</strong></li>
                  <li>• All scores count towards team total</li>
                  <li>• Maximum 2 routines per apparatus</li>
                  <li>• <strong className="text-neon-green">Top 12 teams advance</strong> to semi-finals</li>
                </ul>
              </div>
            </div>

            {/* Semi-Finals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="p-6 bg-neon-pink text-surface-black">
                <p className="font-display text-4xl mb-2">2</p>
                <h3 className="font-display text-2xl tracking-wide">SEMI-FINALS</h3>
                <p className="text-sm opacity-80">6:00 PM – 7:30 PM</p>
              </div>
              <div className="lg:col-span-2 p-6 bg-surface-card border border-surface-muted">
                <ul className="space-y-3 text-text-muted">
                  <li>• 12 teams compete</li>
                  <li>• Each team performs <strong className="text-text-primary">6 routines</strong></li>
                  <li>• All scores count</li>
                  <li>• Maximum 2 routines per apparatus, 1 vault</li>
                  <li>• 120-second time limit per routine (no extra time for falls)</li>
                  <li>• <strong className="text-neon-pink">Top 4 teams advance</strong> to finals</li>
                </ul>
              </div>
            </div>

            {/* Finals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="p-6 bg-neon-yellow text-surface-black">
                <p className="font-display text-4xl mb-2">3</p>
                <h3 className="font-display text-2xl tracking-wide">FINALS</h3>
                <p className="text-sm opacity-80">8:00 PM – 8:30 PM</p>
              </div>
              <div className="lg:col-span-2 p-6 bg-surface-card border border-surface-muted">
                <ul className="space-y-3 text-text-muted">
                  <li>• 4 teams gather in the center of the arena</li>
                  <li>• Each team performs <strong className="text-text-primary">4 routines</strong></li>
                  <li>• All scores count</li>
                  <li>• One athlete competes at a time, rotating between teams</li>
                  <li>• Maximum 2 routines per apparatus</li>
                  <li>• <strong className="text-neon-yellow">Highest total score wins $15,000</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Appointment-Based Scheduling */}
          <div className="mt-12 p-8 bg-neon-green/10 border border-neon-green/30">
            <h3 className="font-display text-2xl text-neon-green mb-4 tracking-wide">APPOINTMENT-BASED SCHEDULING</h3>
            <p className="text-text-muted mb-4">
              Unlike traditional competitions where teams rotate through apparatus together, Battle Royale uses{' '}
              <strong className="text-text-primary">appointment-based scheduling</strong>.
            </p>
            <p className="text-text-muted mb-4">
              Each athlete receives a specific time for their routine. For example: &quot;Athlete A - Uneven Bars at 9:05 AM, Athlete B - Vault at 9:10 AM.&quot; Multiple athletes can compete simultaneously on different apparatus.
            </p>
            <p className="text-text-muted">
              This creates a more dynamic, action-packed viewing experience with constant activity across the competition floor. Detailed schedules are released close to each event.
            </p>
          </div>

          {/* Time Limits & Falls */}
          <div className="mt-8 p-8 bg-surface-card border border-surface-muted">
            <h3 className="font-display text-2xl text-neon-pink mb-4 tracking-wide">TIME LIMITS & FALLS</h3>
            <div className="space-y-4 text-text-muted">
              <div>
                <p className="mb-2">
                  <strong className="text-text-primary">Qualification:</strong> Standard FIG time limits apply.
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong className="text-text-primary">Semi-Finals & Finals:</strong> There&apos;s a <strong className="text-neon-pink">120-second hard limit</strong> per routine with no extensions.
                </p>
                <p className="text-sm">
                  Falls are deducted per standard FIG rules. Skills performed after the time limit don&apos;t count.
                </p>
              </div>
            </div>
          </div>

          {/* Tie-Breaking */}
          <div className="mt-8 p-8 bg-surface-card border border-surface-muted">
            <h3 className="font-display text-2xl text-neon-yellow mb-4 tracking-wide">TIE-BREAKING RULES</h3>
            <p className="text-text-muted mb-4">
              We follow <strong className="text-text-primary">FIG regulations</strong> for breaking ties:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-text-muted ml-2 mb-4">
              <li>First, compare <strong className="text-text-primary">execution scores</strong></li>
              <li>Then, compare <strong className="text-text-primary">difficulty scores</strong></li>
            </ol>
            <div className="p-4 bg-neon-yellow/10 border border-neon-yellow/30 rounded">
              <p className="text-neon-yellow font-display text-sm tracking-wider mb-2">DEATH MATCH</p>
              <p className="text-text-muted">
                If it&apos;s still a true tie, we go to a <strong className="text-text-primary">death match</strong>: both teams send up{' '}
                <strong className="text-text-primary">one athlete</strong> (or two) to perform routines. The sum of those routines determines the final winner.
              </p>
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
              REGISTRATION & <span className="text-neon-yellow text-glow-yellow">LOGISTICS</span>
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Everything you need to know about registering and attending events.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-green mb-4 tracking-wide">REGISTRATION PRICING</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Per Gymnast</span>
                    <span className="font-display text-2xl text-neon-green">$250 CAD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Per Coach</span>
                    <span className="font-display text-2xl text-neon-pink">$150 CAD</span>
                  </div>
                </div>
                <p className="text-text-muted text-sm mt-4">
                  Early bird discounts and dynamic pricing may apply based on demand.
                </p>
              </div>

              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-pink mb-4 tracking-wide">REGISTRATION TIMELINE</h3>
                <p className="text-text-muted mb-3">
                  Registration opens <strong className="text-text-primary">4 months before each event</strong>:
                </p>
                <ul className="space-y-2 text-text-muted text-sm">
                  <li>• BR 1: July 2026</li>
                  <li>• BR 2: August 2026</li>
                  <li>• BR 3: November 2026</li>
                  <li>• BR 4: January 2027</li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-surface-card border border-surface-muted mb-8">
              <h3 className="font-display text-xl text-neon-yellow mb-4 tracking-wide">REGISTRATION PROCESS</h3>
              <p className="text-text-muted mb-4">
                Register your team through the <strong className="text-text-primary">Gym Art Meets platform</strong> when registration opens. You&apos;ll need:
              </p>
              <ul className="space-y-2 text-text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-neon-yellow">•</span>
                  <span>Full name for each athlete</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-yellow">•</span>
                  <span>Team name and team colors/brand</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-yellow">•</span>
                  <span>Registration fees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-yellow">•</span>
                  <span>Payment via credit card or bank transfer</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-green mb-4 tracking-wide">WARM-UPS</h3>
                <p className="text-text-muted">
                  Teams will have scheduled warm-up times before their competition rounds. Detailed warm-up schedules will be provided closer to each event. The single-day format means efficient warm-up rotations.
                </p>
              </div>

              <div className="p-6 bg-surface-card border border-surface-muted">
                <h3 className="font-display text-xl text-neon-pink mb-4 tracking-wide">VENUE LOCATIONS</h3>
                <p className="text-text-muted mb-3">
                  All Season 1 events are in <strong className="text-text-primary">Ontario and Quebec, Canada</strong>.
                </p>
                <p className="text-text-muted text-sm">
                  Specific venues will be announced as they&apos;re confirmed. We&apos;re targeting venues with good spectator capacity and professional gymnastics equipment.
                </p>
              </div>
            </div>

            <div className="p-6 bg-surface-muted/30 border border-surface-muted">
              <h3 className="font-display text-xl text-neon-yellow mb-4 tracking-wide">CANCELLATION POLICY</h3>
              <p className="text-text-muted">
                In the unlikely event of cancellation, <strong className="text-text-primary">full refunds</strong> will be provided for registration and ticket purchases. We have backup venue plans and flexible scheduling (unlike federation events locked to specific dates).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Breakdown */}
      <section id="prizes" className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 text-center tracking-wider">
            PRIZE <span className="text-neon-pink text-glow-pink">BREAKDOWN</span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-8 bg-gradient-to-b from-neon-green/20 to-surface-card border border-neon-green shadow-glow-green">
                <p className="font-display text-5xl text-neon-green text-glow-green mb-2">$15K</p>
                <p className="text-text-primary font-semibold font-display tracking-wide">1ST PLACE</p>
              </div>
              <div className="p-8 bg-surface-card border border-neon-pink/50">
                <p className="font-display text-4xl text-neon-pink mb-2">$7.5K</p>
                <p className="text-text-muted font-semibold font-display tracking-wide">2ND PLACE</p>
              </div>
              <div className="p-8 bg-surface-card border border-surface-muted">
                <p className="font-display text-3xl text-text-muted mb-2">$2.5K</p>
                <p className="text-text-muted/70 font-semibold font-display tracking-wide">3RD PLACE</p>
              </div>
            </div>
            
            <p className="text-center text-text-muted mt-6">
              Teams finishing 4th–8th receive exclusive <span className="text-neon-green">Battle Royale</span> merchandise.
            </p>
            
            <div className="mt-8 p-6 bg-surface-muted/30 border border-neon-yellow/30 text-center">
              <p className="text-text-muted">
                <span className="text-neon-yellow font-semibold">Year 1:</span> 4 events × $25K = <span className="text-neon-green">$100K total prizes</span>
              </p>
              <p className="text-text-muted/70 text-sm mt-2">
                Our goal: scale to $250K per competition
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailSignupSection />
    </PageLayout>
  );
}
