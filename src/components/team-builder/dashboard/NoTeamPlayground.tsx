'use client';

import { getCurrentUser } from '@/lib/firebase/auth';
import { createBattleRoyaleTeamMembership } from '@/lib/firestore/battleRoyaleTeamMemberships';
import { createBattleRoyaleTeam } from '@/lib/firestore/battleRoyaleTeams';
import { generateRandomColorPalette, hashString } from '@/lib/random/colors';
import { generateLogoText, getRandomMascotEmoji, suggestFontFamily, suggestLogoStyle } from '@/lib/random/logos';
import { generateMascotKeyword, generateTeamName } from '@/lib/random/names';
import type { BattleRoyaleTeamBrandKit, BattleRoyaleTeamIdentity } from '@/types/battleRoyaleTeam';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createTeamSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  primaryContactEmail: z.string().email('Invalid email address'),
  tagline: z.string().optional().nullable(),
});

type CreateTeamFormData = z.infer<typeof createTeamSchema>;

interface NoTeamPlaygroundProps {
  onCreateTeam: () => void;
}

export function NoTeamPlayground({ onCreateTeam }: NoTeamPlaygroundProps) {
  const [showForm, setShowForm] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState<string | null>(null);
  const [mascotEmoji, setMascotEmoji] = useState('🔥');
  const [tagline, setTagline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateTeamFormData>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      primaryColor: '#3B82F6',
      secondaryColor: null,
      primaryContactEmail: '',
    },
  });

  // Set email default from current user
  useEffect(() => {
    const user = getCurrentUser();
    if (user?.email) {
      setValue('primaryContactEmail', user.email);
    }
  }, [setValue]);

  // Generate random team on mount
  useEffect(() => {
    generateRandomTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateRandomTeam = () => {
    const name = generateTeamName();
    const seed = hashString(name);
    const colors = generateRandomColorPalette();
    const mascotKeyword = generateMascotKeyword(name);
    const emoji = getRandomMascotEmoji(seed);

    setTeamName(name);
    setPrimaryColor(colors.primary);
    setSecondaryColor(colors.secondary);
    setMascotEmoji(emoji);
    setValue('name', name);
    setValue('primaryColor', colors.primary);
    setValue('secondaryColor', colors.secondary || null);
  };

  const onSubmit = async (data: CreateTeamFormData) => {
    setError(null);
    setLoading(true);

    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const mascotKeyword = generateMascotKeyword(data.name);
      const logoStyle = suggestLogoStyle(data.name, mascotKeyword);
      const fontFamily = suggestFontFamily(data.name);
      const logoText = generateLogoText(data.name);

      const brandKit: BattleRoyaleTeamBrandKit = {
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor || null,
        awayPrimaryColor: null,
        awaySecondaryColor: null,
        accentColor: null,
        fontFamilyKey: fontFamily,
        logoStyleKey: logoStyle,
        logoText,
        logoAcronym: null,
        mascotEmoji: mascotEmoji || null,
      };

      const identity: BattleRoyaleTeamIdentity = {
        tagline: data.tagline || null,
        mascotKeyword,
        shortBio: null,
        location: null,
        plannedEvents: [],
      };

      const team = await createBattleRoyaleTeam({
        name: data.name,
        ownerUserId: user.uid,
        primaryContactEmail: data.primaryContactEmail,
        status: 'brand-only',
        isPublic: false,
        brandKit,
        identity,
        completion: {
          brandScore: 50,
          identityScore: 0,
          rosterScore: 0,
          totalScore: 17, // Rough estimate
        },
      });

      // Create membership for owner
      await createBattleRoyaleTeamMembership({
        teamId: team.id,
        userId: user.uid,
        email: user.email || data.primaryContactEmail,
        role: 'owner',
        canEdit: true,
      });

      router.push(`/team-builder/teams/${team.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  if (showForm) {
    return (
      <div className="bg-surface-card rounded-lg border border-surface-muted p-6">
        <h2 className="text-2xl font-display font-bold text-neon-green mb-6 uppercase tracking-wider">Create Your Team</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
              Team Name *
            </label>
            <input
              id="name"
              type="text"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
                setValue('name', e.target.value);
              }}
              className="input-neon w-full px-3 py-2 rounded-md"
            />
            {errors.name && <p className="mt-1 text-sm text-neon-pink">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="primaryColor" className="block text-sm font-medium text-text-primary mb-1">
              Primary Color *
            </label>
            <div className="flex gap-2">
              <input
                id="primaryColor"
                type="color"
                value={primaryColor}
                onChange={(e) => {
                  setPrimaryColor(e.target.value);
                  setValue('primaryColor', e.target.value);
                }}
                className="h-10 w-20 border border-surface-muted rounded bg-surface-dark"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => {
                  setPrimaryColor(e.target.value);
                  setValue('primaryColor', e.target.value);
                }}
                className="input-neon flex-1 px-3 py-2 rounded-md"
                placeholder="#3B82F6"
              />
            </div>
            {errors.primaryColor && (
              <p className="mt-1 text-sm text-neon-pink">{errors.primaryColor.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="secondaryColor" className="block text-sm font-medium text-text-primary mb-1">
              Secondary Color (optional)
            </label>
            <div className="flex gap-2">
              <input
                id="secondaryColor"
                type="color"
                value={secondaryColor || '#000000'}
                onChange={(e) => {
                  setSecondaryColor(e.target.value);
                  setValue('secondaryColor', e.target.value);
                }}
                className="h-10 w-20 border border-surface-muted rounded bg-surface-dark"
              />
              <input
                type="text"
                value={secondaryColor || ''}
                onChange={(e) => {
                  setSecondaryColor(e.target.value || null);
                  setValue('secondaryColor', e.target.value || null);
                }}
                className="input-neon flex-1 px-3 py-2 rounded-md"
                placeholder="#EF4444"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-text-primary mb-1">
              Tagline (optional)
            </label>
            <input
              id="tagline"
              type="text"
              value={tagline}
              onChange={(e) => {
                setTagline(e.target.value);
                setValue('tagline', e.target.value);
              }}
              className="input-neon w-full px-3 py-2 rounded-md"
              placeholder="Enter a tagline for your team"
            />
          </div>

          <div>
            <label
              htmlFor="primaryContactEmail"
              className="block text-sm font-medium text-text-primary mb-1"
            >
              Primary Contact Email *
            </label>
            <input
              id="primaryContactEmail"
              type="email"
              {...register('primaryContactEmail')}
              className="input-neon w-full px-3 py-2 rounded-md"
            />
            {errors.primaryContactEmail && (
              <p className="mt-1 text-sm text-neon-pink">{errors.primaryContactEmail.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-surface-muted border border-neon-pink rounded-md">
              <p className="text-sm text-neon-pink">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-surface-muted rounded-md text-text-primary hover:border-neon-pink hover:text-neon-pink transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-neon-green text-text-dark rounded-md hover:bg-neon-yellow disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {loading ? 'Creating...' : 'Create Team'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-surface-card rounded-lg border border-surface-muted p-8">
      <h2 className="text-2xl font-display font-bold text-neon-green mb-4 uppercase tracking-wider">Welcome to Team Builder!</h2>
      <p className="text-text-secondary mb-6">
        Create your first Battle Royale team. We&apos;ve generated a suggestion for you - customize it or
        create your own!
      </p>

      <div className="bg-surface-dark rounded-lg p-6 mb-6 border border-surface-muted">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {teamName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-text-primary">{teamName}</h3>
            {tagline && <p className="text-sm text-text-secondary mt-1">{tagline}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{mascotEmoji}</span>
          <div
            className="w-8 h-8 rounded"
            style={{ backgroundColor: primaryColor }}
          />
          {secondaryColor && (
            <div className="w-8 h-8 rounded" style={{ backgroundColor: secondaryColor }} />
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={generateRandomTeam}
            className="px-4 py-2 text-sm border border-surface-muted rounded-md text-text-primary hover:border-neon-yellow hover:text-neon-yellow transition-colors"
          >
            🎲 Randomize
          </button>
        </div>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="w-full py-3 px-4 bg-neon-green text-text-dark rounded-md hover:bg-neon-yellow font-medium transition-colors"
      >
        Save This Team
      </button>
    </div>
  );
}

