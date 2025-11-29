'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

export const ScoreFormula: React.FC = () => {
  const t = useTranslations('faq.scoreFormula');

  return (
    <div className="mt-4 p-4 bg-surface-muted/30 border border-surface-muted rounded">
      <p className="text-neon-green font-display text-sm tracking-wider mb-3">{t('formulaTitle')}</p>
      <div className="bg-surface-dark p-4 rounded border border-surface-muted text-center mb-4">
        <p className="text-text-primary font-mono text-lg">
          <span className="text-neon-pink">{t('normalizedScore')}</span> = (<span className="text-neon-green">{t('figScore')}</span> ÷{' '}
          <span className="text-neon-yellow">{t('maxStartValue')}</span>) × 10
        </p>
      </div>
      <p className="text-neon-pink font-display text-sm tracking-wider mb-2">{t('exampleTitle')}</p>
      <div className="bg-surface-dark p-4 rounded border border-surface-muted">
        <p className="text-text-secondary mb-2">
          {t('exampleText.prefix')} <span className="text-neon-green font-semibold">14.2</span> {t('exampleText.suffix')}
        </p>
        <p className="text-text-primary font-mono text-center my-3">
          14.2 ÷ 15.6 × 10 = <span className="text-neon-green font-bold">9.10256</span>
        </p>
        <p className="text-text-secondary text-sm">
          {t('exampleNote')}
        </p>
      </div>
    </div>
  );
};

