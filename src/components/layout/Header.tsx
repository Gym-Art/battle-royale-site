'use client';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { mainNav } from '@/config/nav';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('common');
  const tNav = useTranslations('nav');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-muted">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 flex-nowrap gap-8">
          <TrackedLink
            href="/"
            eventName="nav_click"
            eventMeta={{ label: 'Logo' }}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <Image
              src="/logo.svg"
              alt={t('siteName')}
              width={40}
              height={40}
              className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]"
            />
            <span className="font-display text-xl text-neon-green tracking-widest hover-glow-green whitespace-nowrap">
              {t('siteName').toUpperCase()}
            </span>
          </TrackedLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 flex-nowrap flex-1 justify-end">
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              const navKey = item.href === '/' ? 'home' : item.href.slice(1);
              return (
                <TrackedLink
                  key={item.href}
                  href={item.href}
                  eventName="nav_click"
                  eventMeta={{ label: item.label }}
                  className={`relative text-xs lg:text-sm uppercase tracking-wider transition-all duration-300 py-2 whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'text-neon-green active-nav-glow'
                      : 'text-text-muted hover:text-neon-green hover-glow-green'
                  }`}
                >
                  {tNav(navKey)}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-pink transition-all duration-300 group-hover:w-full" />
                </TrackedLink>
              );
            })}
          </nav>

          {/* Language Switcher - Desktop */}
          <div className="hidden md:flex flex-shrink-0">
            <LanguageSwitcher />
          </div>

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
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              const navKey = item.href === '/' ? 'home' : item.href.slice(1);
              return (
                <TrackedLink
                  key={item.href}
                  href={item.href}
                  eventName="nav_click"
                  eventMeta={{ label: item.label }}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 text-sm uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-neon-green active-nav-glow'
                      : 'text-text-muted hover:text-neon-green hover-glow-green'
                  }`}
                >
                  {tNav(navKey)}
                </TrackedLink>
              );
            })}
            <div className="pt-4 border-t border-surface-muted mt-4">
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
