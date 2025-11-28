'use client';

import React from 'react';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { Button } from '@/components/ui/Button';

export const RulesSummarySection: React.FC = () => {
  return (
    <section className="section-padding bg-surface-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-neon-green/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-neon-pink/5 rounded-full blur-[80px]" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-neon-green uppercase tracking-[0.3em] text-sm mb-2 font-display">The Format</p>
            <h2 className="font-display text-4xl sm:text-5xl text-text-primary mb-6 tracking-wider">
              SIMPLE. FAIR. <span className="text-neon-pink text-glow-pink">EXCITING.</span>
            </h2>
            
            <div className="space-y-4 text-text-muted">
              <p>
                Traditional gymnastics scoring is confusing. Different apparatus, different max scores, 
                impossible to compare. <span className="text-neon-green">We fixed that.</span>
              </p>
              <p>
                <span className="text-neon-pink">Score Normalization:</span> Every routine is judged using standard FIG rules, 
                then normalized to a maximum of 10. This means you can directly compare a beam routine 
                to a high bar routine—apples to apples.
              </p>
              <p>
                This breakthrough allows mixed WAG/MAG teams and makes every score instantly 
                understandable to casual viewers.
              </p>
            </div>
          </div>

          <div className="bg-surface-card border border-surface-muted p-8">
            <h3 className="font-display text-2xl text-text-primary mb-6 tracking-wide">COMPETITION FLOW</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-neon-green text-surface-black font-display text-lg flex items-center justify-center shadow-glow-green">
                  1
                </span>
                <div>
                  <p className="text-text-primary font-semibold font-display tracking-wide">QUALIFICATION</p>
                  <p className="text-text-muted text-sm">64 teams → 8 routines each → Top 12 advance</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-neon-pink text-surface-black font-display text-lg flex items-center justify-center shadow-glow-pink">
                  2
                </span>
                <div>
                  <p className="text-text-primary font-semibold font-display tracking-wide">SEMI-FINALS</p>
                  <p className="text-text-muted text-sm">12 teams → 6 routines each → Top 4 advance</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-neon-yellow text-surface-black font-display text-lg flex items-center justify-center shadow-glow-yellow">
                  3
                </span>
                <div>
                  <p className="text-text-primary font-semibold font-display tracking-wide">FINALS</p>
                  <p className="text-text-muted text-sm">4 teams → 4 routines each → One champion</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <TrackedLink
                href="/rules"
                eventMeta={{ ctaId: 'rules_summary_cta', label: 'Full Rules', sectionId: 'rules_summary' }}
              >
                <Button variant="ghost" className="w-full">
                  See Full Rules & Scoring
                </Button>
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
