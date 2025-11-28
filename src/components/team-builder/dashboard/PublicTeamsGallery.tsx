'use client';

import { getPublicBattleRoyaleTeams } from '@/lib/firestore/battleRoyaleTeams';
import type { BattleRoyaleTeam } from '@/types/battleRoyaleTeam';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TeamCard } from './TeamCard';

export function PublicTeamsGallery() {
  const [teams, setTeams] = useState<BattleRoyaleTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadPublicTeams();
  }, []);

  const loadPublicTeams = async () => {
    try {
      const publicTeams = await getPublicBattleRoyaleTeams(20);
      setTeams(publicTeams);
    } catch (error) {
      console.error('Error loading public teams:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-text-secondary">Loading public teams...</div>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">No public teams yet. Be the first to share your team!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          onClick={() => router.push(`/team-builder/teams/${team.slug}`)}
        />
      ))}
    </div>
  );
}

