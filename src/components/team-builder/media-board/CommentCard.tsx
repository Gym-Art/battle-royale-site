'use client';

import type { BattleRoyaleTeamMedia } from '@/types/battleRoyaleTeamMedia';

interface CommentCardProps {
  media: BattleRoyaleTeamMedia;
  onDelete?: () => void;
  onEdit?: () => void;
  canEdit?: boolean;
}

export function CommentCard({ media, onDelete, onEdit, canEdit }: CommentCardProps) {
  return (
    <div className="bg-surface-card border-l-4 border-neon-green rounded-lg p-3 w-64 shadow-lg">
      <div className="flex items-start gap-2 mb-2">
        <span className="text-lg">💬</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-primary mb-1">{media.title}</h3>
          {media.content && (
            <p className="text-xs text-text-secondary whitespace-pre-wrap">{media.content}</p>
          )}
        </div>
      </div>
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

