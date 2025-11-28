'use client';

import { subscribeToBattleRoyaleTeamMedia, updateBattleRoyaleTeamMedia, deleteBattleRoyaleTeamMedia } from '@/lib/firestore/battleRoyaleTeamMedia';
import { getCurrentUser } from '@/lib/firebase/auth';
import { getBattleRoyaleTeamMembershipByTeamAndUser } from '@/lib/firestore/battleRoyaleTeamMemberships';
import type { BattleRoyaleTeam } from '@/types/battleRoyaleTeam';
import type { BattleRoyaleTeamMedia } from '@/types/battleRoyaleTeamMedia';
import { MediaCanvas } from '@/components/team-builder/media-board/MediaCanvas';
import { AddMediaModal } from '@/components/team-builder/media-board/AddMediaModal';
import { useEffect, useState, useRef } from 'react';

interface MediaBoardTabProps {
  team: BattleRoyaleTeam;
}

export function MediaBoardTab({ team }: MediaBoardTabProps) {
  const [mediaItems, setMediaItems] = useState<BattleRoyaleTeamMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState<'image' | 'link' | 'note' | 'sticky-note' | 'comment'>('note');
  const [canEdit, setCanEdit] = useState(false);
  const [editingMedia, setEditingMedia] = useState<BattleRoyaleTeamMedia | null>(null);
  const positionUpdateTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return;

    const checkPermissions = async () => {
      const membership = await getBattleRoyaleTeamMembershipByTeamAndUser(team.id, user.uid);
      setCanEdit(membership?.canEdit ?? false);
    };

    checkPermissions();
  }, [team.id]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToBattleRoyaleTeamMedia(team.id, (items) => {
      setMediaItems(items);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [team.id]);

  const handlePositionChange = async (mediaId: string, x: number, y: number) => {
    // Debounce position updates
    if (positionUpdateTimeoutRef.current[mediaId]) {
      clearTimeout(positionUpdateTimeoutRef.current[mediaId]);
    }

    positionUpdateTimeoutRef.current[mediaId] = setTimeout(async () => {
      try {
        await updateBattleRoyaleTeamMedia(mediaId, {
          position: { x, y },
        });
      } catch (err) {
        console.error('Error updating position:', err);
      }
    }, 300);
  };

  const handleDelete = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await deleteBattleRoyaleTeamMedia(mediaId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete media');
    }
  };

  const handleEdit = (media: BattleRoyaleTeamMedia) => {
    setEditingMedia(media);
    setIsAddModalOpen(true);
  };

  const handleAddMedia = (type: 'image' | 'link' | 'note' | 'sticky-note' | 'comment') => {
    setSelectedMediaType(type);
    setEditingMedia(null);
    setIsAddModalOpen(true);
  };

  if (loading) {
    return (
      <div className="bg-surface-card border border-surface-muted rounded-lg p-6">
        <p className="text-text-secondary">Loading media board...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-neon-green uppercase tracking-wider">
          Media Board
        </h2>
        {canEdit && (
          <button
            onClick={() => {
              setSelectedMediaType('note');
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 text-sm bg-neon-green text-text-dark rounded-md hover:bg-neon-yellow transition-colors"
          >
            + Add Media
          </button>
        )}
      </div>

      {error && (
        <div className="p-3 bg-surface-muted border border-neon-pink rounded-md">
          <p className="text-sm text-neon-pink">{error}</p>
        </div>
      )}

      <div className="bg-surface-card border border-surface-muted rounded-lg overflow-hidden">
        <MediaCanvas
          mediaItems={mediaItems}
          onPositionChange={handlePositionChange}
          onDelete={handleDelete}
          onEdit={handleEdit}
          canEdit={canEdit}
        />
      </div>

      {canEdit && (
        <AddMediaModal
          teamId={team.id}
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingMedia(null);
          }}
          onSave={() => {
            // Media will be updated via real-time listener
          }}
          mediaType={editingMedia?.type || selectedMediaType}
        />
      )}
    </div>
  );
}

