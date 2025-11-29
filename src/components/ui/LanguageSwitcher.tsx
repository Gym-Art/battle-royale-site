'use client';

import { routing, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

const languageNames: Record<string, string> = {
  en: 'English',
  fr: 'Français',
};

export const LanguageSwitcher: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm uppercase tracking-wider text-text-muted hover:text-neon-green hover-glow-green transition-all duration-300"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{locale.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-surface-card border border-surface-muted rounded shadow-lg z-50 overflow-hidden">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className={`w-full text-left px-4 py-3 text-sm uppercase tracking-wider transition-all duration-300 ${
                locale === loc
                  ? 'text-neon-green bg-neon-green/10 active-nav-glow'
                  : 'text-text-muted hover:text-neon-green hover:bg-surface-muted/30'
              }`}
              aria-label={`Switch to ${languageNames[loc]}`}
            >
              <div className="flex items-center justify-between">
                <span>{languageNames[loc]}</span>
                {locale === loc && (
                  <svg className="w-4 h-4 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

