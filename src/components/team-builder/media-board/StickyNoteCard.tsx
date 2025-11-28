'use client';

import type { BattleRoyaleTeamMedia } from '@/types/battleRoyaleTeamMedia';

interface StickyNoteCardProps {
  media: BattleRoyaleTeamMedia;
  onDelete?: () => void;
  onEdit?: () => void;
  canEdit?: boolean;
}

export function StickyNoteCard({ media, onDelete, onEdit, canEdit }: StickyNoteCardProps) {
  // Sticky notes have a yellow/neon-yellow background to look like sticky notes
  return (
    <div className="bg-neon-yellow/20 border-2 border-neon-yellow rounded-lg p-4 w-56 shadow-lg transform rotate-[-2deg]">
      <h3 className="text-sm font-semibold text-text-dark mb-2">{media.title}</h3>
      {media.content && (
        <p className="text-xs text-text-dark mb-2 whitespace-pre-wrap">{media.content}</p>
      )}
      {canEdit && (
        <div className="flex gap-2 mt-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-xs text-neon-green hover:text-neon-pink transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-xs text-neon-pink hover:text-neon-green transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

