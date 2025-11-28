'use client';

import type { BattleRoyaleTeamMedia } from '@/types/battleRoyaleTeamMedia';

interface ImageMediaCardProps {
  media: BattleRoyaleTeamMedia;
  onDelete?: () => void;
  onEdit?: () => void;
  canEdit?: boolean;
}

export function ImageMediaCard({ media, onDelete, onEdit, canEdit }: ImageMediaCardProps) {
  if (!media.url) {
    return (
      <div className="bg-surface-muted border border-surface-muted rounded-lg p-4 w-64">
        <p className="text-sm text-text-secondary">No image available</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-card border border-surface-muted rounded-lg overflow-hidden w-64 shadow-lg">
      {media.url && (
        <div className="w-full h-48 bg-surface-muted overflow-hidden">
          <img
            src={media.url}
            alt={media.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-text-primary mb-1 truncate">{media.title}</h3>
        {media.description && (
          <p className="text-xs text-text-secondary mb-2 line-clamp-2">{media.description}</p>
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
    </div>
  );
}

