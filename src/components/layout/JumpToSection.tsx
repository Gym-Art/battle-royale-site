'use client';

import { useHashNavigation } from '@/hooks/useHashNavigation';
import { useTranslations } from 'next-intl';
import { TrackedLink } from '@/components/ui/TrackedLink';

interface Section {
  id: string;
  label: string;
  color?: 'green' | 'pink' | 'yellow';
}

interface JumpToSectionProps {
  sections: Section[];
}

export const JumpToSection: React.FC<JumpToSectionProps> = ({ sections }) => {
  const t = useTranslations('common');
  const sectionIds = sections.map((s) => s.id);
  const { scrollToSection } = useHashNavigation(sectionIds, 100);

  const handleClick = (id: string) => {
    scrollToSection(id);
  };

  return (
    <div className="sticky top-20 z-40 mb-8">
      <div className="bg-surface-dark/95 backdrop-blur-sm border border-surface-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-text-muted text-sm font-display tracking-wider">{t('jumpToSection')}</p>
          <TrackedLink
            href="/"
            eventMeta={{ ctaId: 'jump_to_home', label: 'Home' }}
            className="text-text-muted hover:text-neon-green text-sm transition-colors"
          >
            ({t('home')})
          </TrackedLink>
        </div>
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => {
            const colorClass =
              section.color === 'green'
                ? 'text-neon-green border-neon-green/30 hover:bg-neon-green/10'
                : section.color === 'pink'
                  ? 'text-neon-pink border-neon-pink/30 hover:bg-neon-pink/10'
                  : section.color === 'yellow'
                    ? 'text-neon-yellow border-neon-yellow/30 hover:bg-neon-yellow/10'
                    : 'text-text-primary border-surface-muted hover:bg-surface-muted/30';
            
            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className={`px-4 py-2 text-sm border rounded transition-colors ${colorClass}`}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

