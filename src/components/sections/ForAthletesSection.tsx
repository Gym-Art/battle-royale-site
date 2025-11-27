'use client';

import React from 'react';

export const ForAthletesSection: React.FC = () => {
  const highlights = [
    {
      title: 'Real Cash Prizes',
      description: '$15,000 for 1st place. $7,500 for 2nd. $2,500 for 3rd. Runner-ups receive exclusive merch.',
      color: 'green',
    },
    {
      title: 'Mixed Teams',
      description: 'Build your own team of 4+ gymnasts. All women, all men, or any mix—your choice.',
      color: 'pink',
    },
    {
      title: 'FIG-Level Competition',
      description: 'Same routines. Same judging. Same rules. Just normalized scores for fair cross-apparatus comparison.',
      color: 'green',
    },
    {
      title: 'One-Day Format',
      description: 'Qualification → Semi-Final → Final. No multi-day grind. Peak performance, peak stakes.',
      color: 'pink',
    },
  ];

  return (
    <section className="section-padding bg-surface-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-green/5 rounded-full blur-[100px]" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <p className="text-neon-green uppercase tracking-[0.3em] text-sm mb-2 font-display">For Athletes</p>
          <h2 className="font-display text-4xl sm:text-5xl text-text-primary tracking-wider">
            COMPETE LIKE A <span className="text-neon-pink text-glow-pink">PRO</span>
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
            <span className="text-neon-green font-semibold">Open invitational:</span>{' '}
            <span className="text-text-muted">
              Any gymnast 16+ who can perform FIG-level routines is welcome. 
              No federation restrictions. No qualification hoops. Just bring your team and compete.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
