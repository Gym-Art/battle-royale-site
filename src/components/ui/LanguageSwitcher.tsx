'use client';

import { routing, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export const LanguageSwitcher: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLanguageChange(loc)}
          className={`px-3 py-1 text-sm uppercase tracking-wider transition-all duration-300 ${
            locale === loc
              ? 'text-neon-green active-nav-glow'
              : 'text-text-muted hover:text-neon-green hover-glow-green'
          }`}
          aria-label={`Switch to ${loc === 'en' ? 'English' : 'French'}`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

