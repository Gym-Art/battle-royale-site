'use client';

import type { BattleRoyaleTeamMedia } from '@/types/battleRoyaleTeamMedia';

interface LinkMediaCardProps {
  media: BattleRoyaleTeamMedia;
  onDelete?: () => void;
  onEdit?: () => void;
  canEdit?: boolean;
}

export function LinkMediaCard({ media, onDelete, onEdit, canEdit }: LinkMediaCardProps) {
  return (
    <div className="bg-surface-card border border-surface-muted rounded-lg p-4 w-64 shadow-lg">
      <div className="flex items-start gap-2 mb-2">
        <span className="text-2xl">🔗</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-primary mb-1 truncate">{media.title}</h3>
          {media.url && (
            <a
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neon-green hover:text-neon-yellow transition-colors break-all"
            >
              {media.url}
            </a>
          )}
        </div>
      </div>
      {media.description && (
        <p className="text-xs text-text-secondary mb-2 line-clamp-3">{media.description}</p>
      )}
      {canEdit && (
        <div className="flex gap-2 mt-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-xs text-neon-green hover:text-neon-yellow transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-xs text-neon-pink hover:text-neon-yellow transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

