'use client';

import { calculateTeamCompletion } from '@/lib/utils/calculateTeamCompletion';
import {
  createBattleRoyaleTeamMember,
  deleteBattleRoyaleTeamMember,
  getBattleRoyaleTeamMembersByTeamId,
} from '@/lib/firestore/battleRoyaleTeamMembers';
import { updateBattleRoyaleTeam } from '@/lib/firestore/battleRoyaleTeams';
import type { BattleRoyaleTeam } from '@/types/battleRoyaleTeam';
import type { BattleRoyaleTeamMember } from '@/types/battleRoyaleTeamMember';
import { AddMemberModal } from '@/components/team-builder/roster/AddMemberModal';
import { MemberDetailDrawer } from '@/components/team-builder/roster/MemberDetailDrawer';
import { useEffect, useState } from 'react';

interface RosterTabProps {
  team: BattleRoyaleTeam;
  onTeamUpdate?: (updatedTeam: BattleRoyaleTeam) => void;
}

export function RosterTab({ team, onTeamUpdate }: RosterTabProps) {
  const [members, setMembers] = useState<BattleRoyaleTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<BattleRoyaleTeamMember | null>(null);

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const teamMembers = await getBattleRoyaleTeamMembersByTeamId(team.id);
      setMembers(teamMembers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, [team.id]);

  const updateCompletion = async () => {
    try {
      const completion = calculateTeamCompletion(team.brandKit, team.identity, members);
      await updateBattleRoyaleTeam(team.id, {
        completion,
      });

      const updatedTeam: BattleRoyaleTeam = {
        ...team,
        completion,
        updatedAt: Date.now(),
      };

      onTeamUpdate?.(updatedTeam);
    } catch (err) {
      console.error('Error updating completion:', err);
    }
  };

  const handleAddMember = async (data: {
    firstName: string;
    lastName: string;
    email: string | null;
    role: 'athlete' | 'coach' | 'staff';
    sportType: 'MAG' | 'WAG' | 'Other' | null;
    dateOfBirth: string | null;
  }) => {
    try {
      const newMember = await createBattleRoyaleTeamMember({
        teamId: team.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        sportType: data.sportType,
        dateOfBirth: data.dateOfBirth,
        headshotUrl: null,
      });

      const updatedMembers = [...members, newMember];
      setMembers(updatedMembers);
      await updateCompletion();
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateMember = (updatedMember: BattleRoyaleTeamMember) => {
    const updatedMembers = members.map((m) => (m.id === updatedMember.id ? updatedMember : m));
    setMembers(updatedMembers);
    updateCompletion();
  };

  const handleDeleteMember = async () => {
    if (!selectedMember) return;

    try {
      await deleteBattleRoyaleTeamMember(selectedMember.id);
      const updatedMembers = members.filter((m) => m.id !== selectedMember.id);
      setMembers(updatedMembers);
      setSelectedMember(null);
      await updateCompletion();
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  const roleColors = {
    athlete: 'bg-neon-green text-text-dark',
    coach: 'bg-neon-yellow text-text-dark',
    staff: 'bg-surface-muted text-text-secondary',
  };

  const roleLabels = {
    athlete: 'Athlete',
    coach: 'Coach',
    staff: 'Staff',
  };

  if (loading) {
    return (
      <div className="bg-surface-card border border-surface-muted rounded-lg p-6">
        <p className="text-text-secondary">Loading roster...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-neon-green uppercase tracking-wider">
          Team Roster
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 text-sm bg-neon-green text-text-dark rounded-md hover:bg-neon-yellow transition-colors"
        >
          + Add Member
        </button>
      </div>

      {error && (
        <div className="p-3 bg-surface-muted border border-neon-pink rounded-md">
          <p className="text-sm text-neon-pink">{error}</p>
        </div>
      )}

      {members.length === 0 ? (
        <div className="bg-surface-card border border-surface-muted rounded-lg p-12 text-center">
          <p className="text-text-secondary mb-4">No team members yet.</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 text-sm bg-neon-green text-text-dark rounded-md hover:bg-neon-yellow transition-colors"
          >
            Add Your First Member
          </button>
        </div>
      ) : (
        <div className="bg-surface-card border border-surface-muted rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-text-primary">Photo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-text-primary">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-text-primary">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-text-primary">Sport Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-text-primary">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-muted">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="hover:bg-surface-muted/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      {member.headshotUrl ? (
                        <img
                          src={member.headshotUrl}
                          alt={`${member.firstName} ${member.lastName}`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-surface-muted flex items-center justify-center text-text-secondary">
                          {member.firstName[0]?.toUpperCase()}
                          {member.lastName[0]?.toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-primary">
                      {member.firstName} {member.lastName}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${roleColors[member.role]}`}
                      >
                        {roleLabels[member.role]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {member.sportType || '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {member.email || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AddMemberModal
        teamId={team.id}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddMember}
      />

      {selectedMember && (
        <MemberDetailDrawer
          member={selectedMember}
          teamId={team.id}
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          onUpdate={handleUpdateMember}
          onDelete={handleDeleteMember}
        />
      )}
    </div>
  );
}

