'use client';

import React from 'react';

export const ForSpectatorsSection: React.FC = () => {
  return (
    <section className="section-padding bg-surface-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-[120px]" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-neon-pink uppercase tracking-[0.3em] text-sm mb-2 font-display">For Spectators</p>
            <h2 className="font-display text-4xl sm:text-5xl text-text-primary mb-6 tracking-wider">
              GYMNASTICS LIKE YOU&apos;VE <span className="text-neon-green text-glow-green">NEVER SEEN</span>
            </h2>
            
            <div className="space-y-4 text-text-muted">
              <p>
                Forget 3-day competitions with confusing rotation schedules. Battle Royal is a 
                single-day spectacle designed for <span className="text-neon-pink">maximum entertainment</span>.
              </p>
              <p>
                Watch 64 teams battle through qualification rounds in the morning. Return for 
                the high-stakes semi-finals and finals in the evening. Every routine matters. 
                Every score counts.
              </p>
              <p>
                With normalized scoring out of 10, you&apos;ll instantly understand who&apos;s winning—
                <span className="text-neon-green">no gymnastics degree required</span>.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
                <span className="text-neon-green font-display text-xl">AM</span>
              </div>
              <div>
                <h3 className="font-display text-lg text-text-primary tracking-wide">MORNING QUALIFICATIONS</h3>
                <p className="text-text-muted text-sm">9:00 AM – 3:00 PM. Four rounds. 64 teams compete.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-surface-card border border-surface-muted hover:border-neon-pink transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center">
                <span className="text-neon-pink font-display text-xl">PM</span>
              </div>
              <div>
                <h3 className="font-display text-lg text-text-primary tracking-wide">EVENING FINALS</h3>
                <p className="text-text-muted text-sm">6:00 PM – 8:30 PM. Semi-finals and finals. Top 12 → Top 4 → Champion.</p>
              </div>
            </div>

            <div className="p-4 bg-neon-magenta/10 border border-neon-magenta/30 text-center">
              <p className="text-neon-magenta font-display tracking-wide">DATES & VENUES TBD</p>
              <p className="text-text-muted text-sm">First event: November 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
