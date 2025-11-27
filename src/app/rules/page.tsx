'use client';

import { useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';

export default function RulesPage() {
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

      {/* The Fundamentals */}
      <section className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 tracking-wider">
            THE <span className="text-neon-green text-glow-green">FUNDAMENTALS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Cash Prize', desc: '$25,000 CAD total prize pool. 1st place: $15,000. 2nd: $7,500. 3rd: $2,500. Teams in 4th–8th receive merch prizes.', color: 'green' },
              { title: 'Mixed Teams', desc: '64 team spots available. Each team needs at least 4 members with no max size. Teams can be all women, all men, or any mix.', color: 'pink' },
              { title: 'Invitational', desc: 'Open to all gymnasts 16+ who can perform FIG-level routines. No federation restrictions or qualification requirements.', color: 'magenta' },
              { title: 'Elimination Format', desc: '64 teams qualify, 12 advance to semi-finals, 4 make the finals. Each round features progressively fewer routines with higher stakes.', color: 'green' },
              { title: 'One-Day Event', desc: 'Four morning qualification rounds, then semi-final and final in the evening. Complete competition in a single day.', color: 'pink' },
              { title: 'FIG Judging', desc: 'Same routines. Same judging criteria. Same FIG rules. Just normalized scores for fair cross-apparatus comparison.', color: 'magenta' },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300">
                <h3 className={`font-display text-xl mb-3 tracking-wide ${
                  item.color === 'green' ? 'text-neon-green' : 
                  item.color === 'pink' ? 'text-neon-pink' : 'text-neon-magenta'
                }`}>
                  {item.title}
                </h3>
                <p className="text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Score Normalization */}
      <section className="section-padding bg-surface-black relative overflow-hidden">
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

      {/* Competition Flow */}
      <section className="section-padding bg-surface-dark relative overflow-hidden">
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
              <div className="p-6 bg-neon-magenta text-surface-black">
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
                  <li>• <strong className="text-neon-magenta">Highest total score wins $15,000</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Breakdown */}
      <section className="section-padding bg-surface-black relative overflow-hidden">
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
          </div>
        </div>
      </section>

      <EmailSignupSection />
    </PageLayout>
  );
}
