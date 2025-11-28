'use client';

import { BrandKitTab } from '@/components/team-builder/teams/tabs/BrandKitTab';
import { IdentityTab } from '@/components/team-builder/teams/tabs/IdentityTab';
import { MediaBoardTab } from '@/components/team-builder/teams/tabs/MediaBoardTab';
import { OverviewTab } from '@/components/team-builder/teams/tabs/OverviewTab';
import { RosterTab } from '@/components/team-builder/teams/tabs/RosterTab';
import { TeamDashboardHeader } from '@/components/team-builder/teams/TeamDashboardHeader';
import { TeamDashboardTabs } from '@/components/team-builder/teams/TeamDashboardTabs';
import { getBattleRoyaleTeamBySlug } from '@/lib/firestore/battleRoyaleTeams';
import type { BattleRoyaleTeam } from '@/types/battleRoyaleTeam';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TeamDashboardPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [team, setTeam] = useState<BattleRoyaleTeam | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const loadTeam = async () => {
    try {
      const teamData = await getBattleRoyaleTeamBySlug(slug);
      setTeam(teamData);
    } catch (error) {
      console.error('Error loading team:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveTab(hash);
    }
  }, []);

  const handleTeamUpdate = (updatedTeam: BattleRoyaleTeam) => {
    setTeam(updatedTeam);
  };

  const handleTabChange = (tabId: string) => {
    if (hasUnsavedChanges && activeTab !== tabId) {
      const shouldLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to switch tabs?'
      );
      if (!shouldLeave) {
        return;
      }
    }
    setActiveTab(tabId);
    setHasUnsavedChanges(false);
  };

  const renderTabContent = () => {
    if (!team) return null;

    switch (activeTab) {
      case 'overview':
        return <OverviewTab team={team} />;
      case 'identity':
        return (
          <IdentityTab
            team={team}
            onTeamUpdate={handleTeamUpdate}
            onUnsavedChangesChange={setHasUnsavedChanges}
          />
        );
      case 'brand-kit':
        return (
          <BrandKitTab
            team={team}
            onTeamUpdate={handleTeamUpdate}
            onUnsavedChangesChange={setHasUnsavedChanges}
          />
        );
      case 'roster':
        return (
          <RosterTab
            team={team}
            onTeamUpdate={handleTeamUpdate}
          />
        );
      case 'permissions':
        return (
          <div className="bg-surface-card border border-surface-muted rounded-lg p-6">
            <p className="text-text-secondary">Permissions tab coming soon...</p>
          </div>
        );
      case 'media':
        return <MediaBoardTab team={team} />;
      case 'share':
        return (
          <div className="bg-surface-card border border-surface-muted rounded-lg p-6">
            <p className="text-text-secondary">Share & Export tab coming soon...</p>
          </div>
        );
      default:
        return <OverviewTab team={team} />;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-text-secondary">Loading team...</div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-display font-bold text-neon-pink mb-4 uppercase tracking-wider">
          Team Not Found
        </h1>
        <p className="text-text-secondary">The team you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div>
      <TeamDashboardHeader team={team} onTeamUpdate={handleTeamUpdate} />
      <TeamDashboardTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div id={activeTab}>{renderTabContent()}</div>
    </div>
  );
}

