'use client';

import { MyTeamsList } from '@/components/team-builder/dashboard/MyTeamsList';
import { NoTeamPlayground } from '@/components/team-builder/dashboard/NoTeamPlayground';
import { PublicTeamsGallery } from '@/components/team-builder/dashboard/PublicTeamsGallery';
import { getCurrentUser } from '@/lib/firebase/auth';
import { getBattleRoyaleTeamMembershipsByUserId } from '@/lib/firestore/battleRoyaleTeamMemberships';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

export default function TeamBuilderDashboard() {
  const [hasTeams, setHasTeams] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my-teams' | 'public'>('my-teams');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newParam = searchParams.get('new');
    if (newParam === 'true') {
      setShowPlayground(true);
      setLoading(false);
      return;
    }
    checkUserTeams();
  }, [searchParams]);

  const checkUserTeams = async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const memberships = await getBattleRoyaleTeamMembershipsByUserId(user.uid);
      setHasTeams(memberships.length > 0);
      setShowPlayground(memberships.length === 0);
    } catch (error) {
      console.error('Error checking user teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = () => {
    // Refresh teams list after creation
    checkUserTeams();
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  if (showPlayground || !hasTeams) {
    return (
      <div>
        <NoTeamPlayground onCreateTeam={handleCreateTeam} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-display font-bold text-neon-green uppercase tracking-wider">My Teams</h1>
        <button
          onClick={() => {
            router.push('/team-builder?new=true');
            setShowPlayground(true);
          }}
          className="px-4 py-2 bg-neon-green text-text-dark rounded-md hover:bg-neon-yellow font-medium transition-colors"
        >
          Create New Team
        </button>
      </div>

      <div className="mb-6">
        <div className="border-b border-surface-muted">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('my-teams')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'my-teams'
                  ? 'border-neon-green text-neon-green'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-surface-muted'
              }`}
            >
              My Teams
            </button>
            <button
              onClick={() => setActiveTab('public')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'public'
                  ? 'border-neon-green text-neon-green'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-surface-muted'
              }`}
            >
              Public Teams
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'my-teams' ? <MyTeamsList /> : <PublicTeamsGallery />}
    </div>
  );
}

