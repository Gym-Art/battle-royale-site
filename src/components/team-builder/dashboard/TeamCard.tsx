'use client';

import type { BattleRoyaleTeam } from '@/types/battleRoyaleTeam';

interface TeamCardProps {
  team: BattleRoyaleTeam;
  onClick?: () => void;
}

export function TeamCard({ team, onClick }: TeamCardProps) {
  const completionPercentage = Math.round(team.completion.totalScore);
  const statusColors = {
    draft: 'bg-surface-muted text-text-secondary',
    'brand-only': 'bg-neon-yellow text-text-dark',
    'ready-for-registration': 'bg-neon-green text-text-dark',
  };

  return (
    <div
      onClick={onClick}
      className="bg-surface-card rounded-lg border border-surface-muted p-6 hover:border-neon-green transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-white"
            style={{ backgroundColor: team.brandKit.primaryColor }}
          >
            {team.brandKit.logoText.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{team.name}</h3>
            {team.identity.tagline && (
              <p className="text-sm text-text-secondary mt-1">{team.identity.tagline}</p>
            )}
          </div>
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${statusColors[team.status]}`}
        >
          {team.status.replace('-', ' ')}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Completion</span>
          <span className="text-sm font-medium text-text-primary">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-surface-muted rounded-full h-2">
          <div
            className="bg-neon-green h-2 rounded-full transition-all"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

