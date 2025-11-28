'use client';

import type { BattleRoyaleTeam } from '@/types/battleRoyaleTeam';

interface PublicPreviewCardProps {
  team: BattleRoyaleTeam;
}

export function PublicPreviewCard({ team }: PublicPreviewCardProps) {
  return (
    <div className="bg-surface-card border border-surface-muted rounded-lg p-6 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Public Preview</h3>
        <span className="px-2 py-1 text-xs font-medium rounded bg-neon-green text-text-dark">
          Preview
        </span>
      </div>

      <div
        className="rounded-lg p-6 mb-4"
        style={{
          background: `linear-gradient(135deg, ${team.brandKit.primaryColor} 0%, ${team.brandKit.secondaryColor || team.brandKit.primaryColor} 100%)`,
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-white bg-black/20"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          >
            {team.brandKit.logoText.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="text-2xl font-bold text-white uppercase tracking-wider">{team.name}</h4>
            {team.identity.tagline && (
              <p className="text-white/90 text-sm mt-1">{team.identity.tagline}</p>
            )}
          </div>
        </div>

        {team.identity.shortBio && (
          <p className="text-white/90 text-sm mb-3">{team.identity.shortBio}</p>
        )}

        {team.identity.location && (
          <p className="text-white/80 text-xs">📍 {team.identity.location}</p>
        )}
      </div>

      {team.identity.plannedEvents && team.identity.plannedEvents.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-text-primary mb-2">Planned Events</h4>
          <ul className="space-y-1">
            {team.identity.plannedEvents.map((event, index) => (
              <li key={index} className="text-sm text-text-secondary">
                • {event}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-4 border-t border-surface-muted">
        <p className="text-xs text-text-secondary mb-2">Public URL:</p>
        <code className="block text-xs bg-surface-muted p-2 rounded text-text-secondary break-all">
          {typeof window !== 'undefined' ? `${window.location.origin}/teams/${team.slug}` : ''}
        </code>
      </div>
    </div>
  );
}

