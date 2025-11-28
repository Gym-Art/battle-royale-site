'use client';

import type { BattleRoyaleTeamMedia } from '@/types/battleRoyaleTeamMedia';

interface NoteMediaCardProps {
  media: BattleRoyaleTeamMedia;
  onDelete?: () => void;
  onEdit?: () => void;
  canEdit?: boolean;
}

export function NoteMediaCard({ media, onDelete, onEdit, canEdit }: NoteMediaCardProps) {
  return (
    <div className="bg-surface-card border border-surface-muted rounded-lg p-4 w-64 shadow-lg">
      <h3 className="text-sm font-semibold text-text-primary mb-2">{media.title}</h3>
      {media.content && (
        <p className="text-xs text-text-secondary mb-2 whitespace-pre-wrap">{media.content}</p>
      )}
      {media.description && (
        <p className="text-xs text-text-secondary mb-2 italic">{media.description}</p>
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

