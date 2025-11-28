'use client';

import { getCurrentUser } from '@/lib/firebase/auth';
import { getBattleRoyaleTeamMembershipsByUserId } from '@/lib/firestore/battleRoyaleTeamMemberships';
import { getBattleRoyaleTeam } from '@/lib/firestore/battleRoyaleTeams';
import type { BattleRoyaleTeam } from '@/types/battleRoyaleTeam';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TeamCard } from './TeamCard';

export function MyTeamsList() {
  const [teams, setTeams] = useState<BattleRoyaleTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const memberships = await getBattleRoyaleTeamMembershipsByUserId(user.uid);
      const teamPromises = memberships.map((membership) =>
        getBattleRoyaleTeam(membership.teamId)
      );
      const teamResults = await Promise.all(teamPromises);
      const validTeams = teamResults.filter((team): team is BattleRoyaleTeam => team !== null);

      setTeams(validTeams);
    } catch (error) {
      console.error('Error loading teams:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-text-secondary">Loading your teams...</div>
      </div>
    );
  }

  if (teams.length === 0) {
    return null; // Let parent handle empty state
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

