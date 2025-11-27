'use client';

import React from 'react';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { Button } from '@/components/ui/Button';

export const ForSponsorsSection: React.FC = () => {
  return (
    <section className="section-padding bg-surface-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[150px]" />
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-neon-magenta uppercase tracking-[0.3em] text-sm mb-2 font-display">For Sponsors</p>
          <h2 className="font-display text-4xl sm:text-5xl text-text-primary mb-6 tracking-wider">
            PARTNER WITH THE <span className="text-neon-green text-glow-green">FUTURE</span>
          </h2>
          
          <p className="text-text-muted text-lg mb-8">
            Gymnastics reached <span className="text-neon-pink">41.5 million viewers</span> at Paris 2024—the most-watched Olympic sport. 
            Yet there&apos;s no professional league to capture this audience year-round. <span className="text-neon-green">Until now.</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="p-6 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300">
              <p className="font-display text-3xl text-neon-green text-glow-green">41.5M</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">Olympic Viewers</p>
            </div>
            <div className="p-6 bg-surface-card border border-surface-muted hover:border-neon-pink transition-all duration-300">
              <p className="font-display text-3xl text-neon-pink text-glow-pink">23K+</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">Regional Gymnasts</p>
            </div>
            <div className="p-6 bg-surface-card border border-surface-muted hover:border-neon-magenta transition-all duration-300">
              <p className="font-display text-3xl text-neon-magenta text-glow-magenta">250K+</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">Reachable Audience</p>
            </div>
          </div>

          <TrackedLink
            href="/sponsors"
            eventMeta={{ ctaId: 'sponsors_cta', label: 'Sponsorship Info', sectionId: 'for_sponsors' }}
          >
            <Button variant="outline" size="lg">
              Learn About Sponsorship
            </Button>
          </TrackedLink>
        </div>
      </div>
    </section>
  );
};
