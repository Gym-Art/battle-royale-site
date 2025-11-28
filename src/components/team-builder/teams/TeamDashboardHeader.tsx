'use client';

import { getCurrentUser } from '@/lib/firebase/auth';
import { getBattleRoyaleTeamMembershipByTeamAndUser } from '@/lib/firestore/battleRoyaleTeamMemberships';
import { updateBattleRoyaleTeam } from '@/lib/firestore/battleRoyaleTeams';
import type { BattleRoyaleTeam } from '@/types/battleRoyaleTeam';
import { useEffect, useState } from 'react';

interface TeamDashboardHeaderProps {
  team: BattleRoyaleTeam;
  onTeamUpdate?: (updatedTeam: BattleRoyaleTeam) => void;
}

export function TeamDashboardHeader({ team, onTeamUpdate }: TeamDashboardHeaderProps) {
  const [canEdit, setCanEdit] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const user = getCurrentUser();
      if (!user) {
        setCanEdit(false);
        return;
      }

      const membership = await getBattleRoyaleTeamMembershipByTeamAndUser(team.id, user.uid);
      setCanEdit(membership?.canEdit ?? false);
    };

    checkPermissions();
  }, [team.id]);

  const handleTogglePublic = async () => {
    if (!canEdit || isToggling) return;

    setIsToggling(true);
    try {
      await updateBattleRoyaleTeam(team.id, {
        isPublic: !team.isPublic,
      });

      const updatedTeam: BattleRoyaleTeam = {
        ...team,
        isPublic: !team.isPublic,
        updatedAt: Date.now(),
      };

      onTeamUpdate?.(updatedTeam);
    } catch (error) {
      console.error('Error toggling public status:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: team.name,
        text: team.identity.tagline || `Check out ${team.name}`,
        url: `${window.location.origin}/teams/${team.slug}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/teams/${team.slug}`);
    }
  };

  const statusColors = {
    draft: 'bg-surface-muted text-text-secondary',
    'brand-only': 'bg-neon-yellow text-text-dark',
    'ready-for-registration': 'bg-neon-green text-text-dark',
  };

  const statusLabels = {
    draft: 'Draft',
    'brand-only': 'Brand Only',
    'ready-for-registration': 'Ready for Registration',
  };

  return (
    <div className="bg-surface-card border border-surface-muted rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold text-white flex-shrink-0"
            style={{ backgroundColor: team.brandKit.primaryColor }}
          >
            {team.brandKit.logoText.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-neon-green uppercase tracking-wider mb-2">
              {team.name}
            </h1>
            {team.identity.tagline && (
              <p className="text-text-secondary text-lg">{team.identity.tagline}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`px-3 py-1 text-sm font-medium rounded ${statusColors[team.status]}`}
          >
            {statusLabels[team.status]}
          </span>

          <a
            href={`/teams/${team.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm text-text-primary hover:text-neon-green border border-surface-muted rounded-md hover:border-neon-green transition-colors"
          >
            View Public Preview
          </a>

          <button
            onClick={handleShare}
            className="px-4 py-2 text-sm text-text-primary hover:text-neon-green border border-surface-muted rounded-md hover:border-neon-green transition-colors"
          >
            Share
          </button>

          {canEdit && (
            <button
              onClick={handleTogglePublic}
              disabled={isToggling}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                team.isPublic
                  ? 'bg-neon-green text-text-dark hover:bg-neon-yellow'
                  : 'bg-surface-muted text-text-secondary hover:bg-surface-muted/80'
              }`}
            >
              {isToggling ? '...' : team.isPublic ? 'Public' : 'Private'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

