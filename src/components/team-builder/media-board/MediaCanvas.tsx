'use client';

import { MediaItem } from './MediaItem';
import type { BattleRoyaleTeamMedia } from '@/types/battleRoyaleTeamMedia';

interface MediaCanvasProps {
  mediaItems: BattleRoyaleTeamMedia[];
  onPositionChange: (mediaId: string, x: number, y: number) => void;
  onDelete: (mediaId: string) => void;
  onEdit: (media: BattleRoyaleTeamMedia) => void;
  canEdit?: boolean;
}

export function MediaCanvas({
  mediaItems,
  onPositionChange,
  onDelete,
  onEdit,
  canEdit = true,
}: MediaCanvasProps) {
  const handleDragStart = (e: React.DragEvent, media: BattleRoyaleTeamMedia) => {
    // Set drag data if needed
    e.dataTransfer.effectAllowed = 'move';
  };

  const handlePositionChange = (mediaId: string, x: number, y: number) => {
    // Clamp position to canvas bounds
    const clampedX = Math.max(0, Math.min(x, window.innerWidth - 300));
    const clampedY = Math.max(0, Math.min(y, 2000));
    onPositionChange(mediaId, clampedX, clampedY);
  };

  // Separate draggable items from static items
  const draggableItems = mediaItems.filter(
    (item) => item.position && item.type !== 'sticky-note' && item.type !== 'comment'
  );
  const staticItems = mediaItems.filter(
    (item) => !item.position || item.type === 'sticky-note' || item.type === 'comment'
  );

  return (
    <div className="relative w-full h-full min-h-[600px] bg-surface-muted/30 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      {/* Draggable items positioned absolutely */}
      {draggableItems.map((item) => (
        <MediaItem
          key={item.id}
          media={item}
          isDraggable={true}
          onDragStart={handleDragStart}
          onPositionChange={handlePositionChange}
          onDelete={() => onDelete(item.id)}
          onEdit={() => onEdit(item)}
          canEdit={canEdit}
        />
      ))}

      {/* Static items in a grid at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {staticItems.map((item) => (
            <MediaItem
              key={item.id}
              media={item}
              isDraggable={false}
              onDelete={() => onDelete(item.id)}
              onEdit={() => onEdit(item)}
              canEdit={canEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

