export const getColorClasses = (color: 'green' | 'pink' | 'magenta', isActive: boolean): string => {
  if (!isActive) return 'border-surface-muted text-text-muted hover:border-surface-muted/80';
  switch (color) {
    case 'green':
      return 'border-neon-green bg-neon-green/10 text-neon-green';
    case 'pink':
      return 'border-neon-pink bg-neon-pink/10 text-neon-pink';
    case 'magenta':
      return 'border-neon-magenta bg-neon-magenta/10 text-neon-magenta';
  }
};

