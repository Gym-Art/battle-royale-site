export const getColorClasses = (color: 'green' | 'pink' | 'yellow', isActive: boolean): string => {
  if (!isActive) return 'border-surface-muted text-text-muted hover:border-surface-muted/80';
  switch (color) {
    case 'green':
      return 'border-neon-green bg-neon-green/10 text-neon-green';
    case 'pink':
      return 'border-neon-pink bg-neon-pink/10 text-neon-pink';
    case 'yellow':
      return 'border-neon-yellow bg-neon-yellow/10 text-neon-yellow';
  }
};

