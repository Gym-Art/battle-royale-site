'use client';

import { calculateTeamCompletion } from '@/lib/utils/calculateTeamCompletion';
import type { BattleRoyaleTeam } from '@/types/battleRoyaleTeam';
import { useRouter } from 'next/navigation';

interface OverviewTabProps {
  team: BattleRoyaleTeam;
}

export function OverviewTab({ team }: OverviewTabProps) {
  const router = useRouter();
  const completion = calculateTeamCompletion(team.brandKit, team.identity, []);

  const identityChecks = [
    { label: 'Tagline', completed: !!team.identity.tagline?.trim() },
    { label: 'Short Bio', completed: !!team.identity.shortBio?.trim() },
    { label: 'Mascot Keyword', completed: !!team.identity.mascotKeyword?.trim() },
    { label: 'Location', completed: !!team.identity.location?.trim() },
  ];

  const brandKitChecks = [
    { label: 'Primary Color', completed: !!team.brandKit.primaryColor },
    { label: 'Secondary Color', completed: !!team.brandKit.secondaryColor },
    { label: 'Accent Color', completed: !!team.brandKit.accentColor },
    { label: 'Font Family', completed: !!team.brandKit.fontFamilyKey },
    { label: 'Logo Style', completed: !!team.brandKit.logoStyleKey },
  ];

  const rosterChecks = [
    { label: 'At least 1 coach', completed: false },
    { label: 'At least 1 athlete', completed: false },
  ];

  const handleJumpToSection = (section: string) => {
    router.push(`${window.location.pathname}#${section}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-neon-green uppercase tracking-wider mb-4">
          Completion Overview
        </h2>
        <div className="bg-surface-card border border-surface-muted rounded-lg p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-text-primary">Total Completion</span>
              <span className="text-2xl font-bold text-neon-green">{completion.totalScore}%</span>
            </div>
            <div className="w-full bg-surface-muted rounded-full h-4">
              <div
                className="bg-neon-green h-4 rounded-full transition-all"
                style={{ width: `${completion.totalScore}%` }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">Identity</span>
                <span className="text-sm font-semibold text-neon-green">
                  {completion.identityScore}%
                </span>
              </div>
              <div className="w-full bg-surface-muted rounded-full h-2 mb-4">
                <div
                  className="bg-neon-green h-2 rounded-full transition-all"
                  style={{ width: `${completion.identityScore}%` }}
                />
              </div>
              <ul className="space-y-2">
                {identityChecks.map((check, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className={check.completed ? 'text-neon-green' : 'text-text-secondary'}>
                      {check.completed ? '✓' : '○'}
                    </span>
                    <span className={check.completed ? 'text-text-primary' : 'text-text-secondary'}>
                      {check.label}
                    </span>
                  </li>
                ))}
              </ul>
              {completion.identityScore < 100 && (
                <button
                  onClick={() => handleJumpToSection('identity')}
                  className="mt-3 text-sm text-neon-green hover:text-neon-yellow transition-colors"
                >
                  Complete Identity →
                </button>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">Brand Kit</span>
                <span className="text-sm font-semibold text-neon-green">
                  {completion.brandScore}%
                </span>
              </div>
              <div className="w-full bg-surface-muted rounded-full h-2 mb-4">
                <div
                  className="bg-neon-green h-2 rounded-full transition-all"
                  style={{ width: `${completion.brandScore}%` }}
                />
              </div>
              <ul className="space-y-2">
                {brandKitChecks.map((check, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className={check.completed ? 'text-neon-green' : 'text-text-secondary'}>
                      {check.completed ? '✓' : '○'}
                    </span>
                    <span className={check.completed ? 'text-text-primary' : 'text-text-secondary'}>
                      {check.label}
                    </span>
                  </li>
                ))}
              </ul>
              {completion.brandScore < 100 && (
                <button
                  onClick={() => handleJumpToSection('brand-kit')}
                  className="mt-3 text-sm text-neon-green hover:text-neon-yellow transition-colors"
                >
                  Complete Brand Kit →
                </button>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">Roster</span>
                <span className="text-sm font-semibold text-neon-green">
                  {completion.rosterScore}%
                </span>
              </div>
              <div className="w-full bg-surface-muted rounded-full h-2 mb-4">
                <div
                  className="bg-neon-green h-2 rounded-full transition-all"
                  style={{ width: `${completion.rosterScore}%` }}
                />
              </div>
              <ul className="space-y-2">
                {rosterChecks.map((check, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className={check.completed ? 'text-neon-green' : 'text-text-secondary'}>
                      {check.completed ? '✓' : '○'}
                    </span>
                    <span className={check.completed ? 'text-text-primary' : 'text-text-secondary'}>
                      {check.label}
                    </span>
                  </li>
                ))}
              </ul>
              {completion.rosterScore < 100 && (
                <button
                  onClick={() => handleJumpToSection('roster')}
                  className="mt-3 text-sm text-neon-green hover:text-neon-yellow transition-colors"
                >
                  Complete Roster →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-display font-bold text-neon-green uppercase tracking-wider mb-4">
          Summary Cards
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-surface-card border border-surface-muted rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Identity Summary</h3>
            <div className="space-y-2 text-sm">
              {team.identity.tagline ? (
                <p className="text-text-primary">
                  <span className="text-text-secondary">Tagline:</span> {team.identity.tagline}
                </p>
              ) : (
                <p className="text-text-secondary">No tagline set</p>
              )}
              {team.identity.location && (
                <p className="text-text-primary">
                  <span className="text-text-secondary">Location:</span> {team.identity.location}
                </p>
              )}
              {team.identity.mascotKeyword && (
                <p className="text-text-primary">
                  <span className="text-text-secondary">Mascot:</span> {team.identity.mascotKeyword}
                </p>
              )}
            </div>
          </div>

          <div className="bg-surface-card border border-surface-muted rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Brand Kit Preview</h3>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                style={{ backgroundColor: team.brandKit.primaryColor }}
              >
                {team.brandKit.logoText.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-text-secondary">Style: {team.brandKit.logoStyleKey}</p>
                <p className="text-sm text-text-secondary">Font: {team.brandKit.fontFamilyKey}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {team.brandKit.primaryColor && (
                <div
                  className="w-8 h-8 rounded border border-surface-muted"
                  style={{ backgroundColor: team.brandKit.primaryColor }}
                  title="Primary"
                />
              )}
              {team.brandKit.secondaryColor && (
                <div
                  className="w-8 h-8 rounded border border-surface-muted"
                  style={{ backgroundColor: team.brandKit.secondaryColor }}
                  title="Secondary"
                />
              )}
              {team.brandKit.accentColor && (
                <div
                  className="w-8 h-8 rounded border border-surface-muted"
                  style={{ backgroundColor: team.brandKit.accentColor }}
                  title="Accent"
                />
              )}
            </div>
          </div>

          <div className="bg-surface-card border border-surface-muted rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Roster Summary</h3>
            <div className="space-y-2 text-sm">
              <p className="text-text-secondary">Coaches: 0</p>
              <p className="text-text-secondary">Athletes: 0</p>
              <p className="text-text-secondary">Staff: 0</p>
              <p className="text-text-secondary text-xs mt-3">Coming soon in Task 8</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

