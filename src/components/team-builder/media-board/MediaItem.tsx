'use client';

import { ImageMediaCard } from './ImageMediaCard';
import { LinkMediaCard } from './LinkMediaCard';
import { NoteMediaCard } from './NoteMediaCard';
import { StickyNoteCard } from './StickyNoteCard';
import { CommentCard } from './CommentCard';
import type { BattleRoyaleTeamMedia } from '@/types/battleRoyaleTeamMedia';
import { useState } from 'react';

interface MediaItemProps {
  media: BattleRoyaleTeamMedia;
  isDraggable: boolean;
  onDragStart?: (e: React.DragEvent, media: BattleRoyaleTeamMedia) => void;
  onDragEnd?: () => void;
  onPositionChange?: (mediaId: string, x: number, y: number) => void;
  onDelete?: () => void;
  onEdit?: () => void;
  canEdit?: boolean;
}

export function MediaItem({
  media,
  isDraggable,
  onDragStart,
  onDragEnd,
  onPositionChange,
  onDelete,
  onEdit,
  canEdit,
}: MediaItemProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Sticky notes and comments are not draggable
  const canDrag = isDraggable && media.type !== 'sticky-note' && media.type !== 'comment';

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canDrag || !media.position) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging) return;
      const newX = moveEvent.clientX - offsetX;
      const newY = moveEvent.clientY - offsetY;
      onPositionChange?.(media.id, newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (!canDrag) {
      e.preventDefault();
      return;
    }
    onDragStart?.(e, media);
  };

  const style: React.CSSProperties = media.position
    ? {
        position: 'absolute',
        left: `${media.position.x}px`,
        top: `${media.position.y}px`,
        cursor: canDrag ? 'move' : 'default',
        zIndex: isDragging ? 1000 : 1,
      }
    : {
        position: 'relative',
        cursor: canDrag ? 'move' : 'default',
        zIndex: isDragging ? 1000 : 1,
      };

  const renderCard = () => {
    switch (media.type) {
      case 'image':
        return (
          <ImageMediaCard media={media} onDelete={onDelete} onEdit={onEdit} canEdit={canEdit} />
        );
      case 'link':
        return (
          <LinkMediaCard media={media} onDelete={onDelete} onEdit={onEdit} canEdit={canEdit} />
        );
      case 'note':
        return (
          <NoteMediaCard media={media} onDelete={onDelete} onEdit={onEdit} canEdit={canEdit} />
        );
      case 'sticky-note':
        return (
          <StickyNoteCard media={media} onDelete={onDelete} onEdit={onEdit} canEdit={canEdit} />
        );
      case 'comment':
        return (
          <CommentCard media={media} onDelete={onDelete} onEdit={onEdit} canEdit={canEdit} />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={style}
      draggable={canDrag}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onMouseDown={handleMouseDown}
      className={canDrag ? 'select-none' : ''}
    >
      {renderCard()}
    </div>
  );
}

