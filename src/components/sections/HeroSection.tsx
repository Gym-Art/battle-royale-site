'use client';

import { Button } from '@/components/ui/Button';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-surface-black" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 via-transparent to-neon-pink/5" />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-surface-black via-surface-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-surface-black via-surface-black/80 to-transparent" />
      
      {/* Decorative glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-green/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-pink/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-neon-yellow/5 rounded-full blur-[80px]" />

      <div className="relative section-container text-center z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.svg"
            alt="Battle Royale"
            width={120}
            height={120}
            className="drop-shadow-[0_0_30px_rgba(57,255,20,0.6)] animate-pulse-glow"
          />
        </div>

        <p className="text-neon-pink uppercase tracking-[0.4em] text-sm mb-4 font-display">
          Gym Art Presents
        </p>
        
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary mb-6 tracking-wider">
          <span className="text-neon-green text-glow-green animate-flicker">{siteConfig.name.toUpperCase()}</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-text-primary max-w-2xl mx-auto mb-4 font-display tracking-wide">
          {siteConfig.tagline}
        </p>
        
        <p className="text-lg text-text-muted max-w-xl mx-auto mb-10">
          The first professional gymnastics league. Mixed teams. Normalized scoring. 
          <span className="text-neon-pink"> $100K in Year 1 prizes.</span> 4 events. 4 champions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <TrackedLink
            href="#stay-connected"
            eventMeta={{ ctaId: 'hero_waitlist', label: 'Join the Waitlist', sectionId: 'hero' }}
          >
            <Button variant="primary" size="lg">
              Join the Waitlist
            </Button>
          </TrackedLink>
          
          <TrackedLink
            href="/rules"
            eventMeta={{ ctaId: 'hero_rules', label: 'Learn the Format', sectionId: 'hero' }}
          >
            <Button variant="outline" size="lg">
              Learn the Format
            </Button>
          </TrackedLink>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <p className="font-display text-3xl sm:text-4xl text-neon-green text-glow-green">$25K</p>
            <p className="text-text-muted text-xs uppercase tracking-widest mt-1">Per Event</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl sm:text-4xl text-neon-pink text-glow-pink">64</p>
            <p className="text-text-muted text-xs uppercase tracking-widest mt-1">Teams</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl sm:text-4xl text-neon-yellow text-glow-yellow">4</p>
            <p className="text-text-muted text-xs uppercase tracking-widest mt-1">Events</p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-dark to-transparent" />
    </section>
  );
};
