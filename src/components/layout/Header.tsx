'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { mainNav } from '@/config/nav';
import { TrackedLink } from '@/components/ui/TrackedLink';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-muted">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <TrackedLink
            href="/"
            eventName="nav_click"
            eventMeta={{ label: 'Logo' }}
            className="flex items-center gap-3 group"
          >
            <Image
              src="/logo.svg"
              alt="Battle Royale"
              width={40}
              height={40}
              className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]"
            />
            <span className="font-display text-xl text-neon-green tracking-widest hover-glow-green">
              BATTLE ROYALE
            </span>
          </TrackedLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {mainNav.map((item) => (
              <TrackedLink
                key={item.href}
                href={item.href}
                eventName="nav_click"
                eventMeta={{ label: item.label }}
                className="relative text-sm uppercase tracking-wider text-text-muted hover:text-neon-green hover-glow-green transition-all duration-300 py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-pink transition-all duration-300 group-hover:w-full" />
              </TrackedLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-muted hover:text-neon-green transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-surface-muted">
            {mainNav.map((item) => (
              <TrackedLink
                key={item.href}
                href={item.href}
                eventName="nav_click"
                eventMeta={{ label: item.label }}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-sm uppercase tracking-wider text-text-muted hover:text-neon-green hover-glow-green transition-all duration-300"
              >
                {item.label}
              </TrackedLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
