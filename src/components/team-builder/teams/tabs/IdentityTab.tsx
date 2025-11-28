'use client';

import { useDebouncedAutoSave } from '@/hooks/useDebouncedAutoSave';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { updateBattleRoyaleTeamName } from '@/lib/firestore/battleRoyaleTeams';
import { updateBattleRoyaleTeam } from '@/lib/firestore/battleRoyaleTeams';
import { calculateTeamCompletion } from '@/lib/utils/calculateTeamCompletion';
import { BR_EVENTS } from '@/data/brEvents';
import type { BattleRoyaleTeam } from '@/types/battleRoyaleTeam';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const identitySchema = z.object({
  name: z.string().min(1, 'Team name is required').max(50, 'Team name must be 50 characters or less'),
  tagline: z.string().max(200, 'Tagline must be 200 characters or less').optional().nullable(),
  shortBio: z.string().max(500, 'Short bio must be 500 characters or less').optional().nullable(),
  location: z.string().max(100, 'Location must be 100 characters or less').optional().nullable(),
  mascotKeyword: z.string().max(50, 'Mascot keyword must be 50 characters or less').optional().nullable(),
  mascotEmoji: z.string().max(10, 'Mascot emoji must be 10 characters or less').optional().nullable(),
  plannedEvents: z.array(z.string()).default([]),
});

type IdentityFormData = z.infer<typeof identitySchema>;

interface IdentityTabProps {
  team: BattleRoyaleTeam;
  onTeamUpdate?: (updatedTeam: BattleRoyaleTeam) => void;
  onUnsavedChangesChange?: (hasUnsaved: boolean) => void;
}

export function IdentityTab({ team, onTeamUpdate, onUnsavedChangesChange }: IdentityTabProps) {
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isManualSaving, setIsManualSaving] = useState(false);
  const initialValuesRef = useRef<string>('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IdentityFormData>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      name: team.name,
      tagline: team.identity.tagline || '',
      shortBio: team.identity.shortBio || '',
      location: team.identity.location || '',
      mascotKeyword: team.identity.mascotKeyword || '',
      mascotEmoji: team.brandKit.mascotEmoji || '',
      plannedEvents: team.identity.plannedEvents || [],
    },
  });

  const formData = watch();

  // Track initial values for unsaved changes
  useEffect(() => {
    initialValuesRef.current = JSON.stringify({
      name: team.name,
      tagline: team.identity.tagline || '',
      shortBio: team.identity.shortBio || '',
      location: team.identity.location || '',
      mascotKeyword: team.identity.mascotKeyword || '',
      mascotEmoji: team.brandKit.mascotEmoji || '',
      plannedEvents: team.identity.plannedEvents || [],
    });
  }, [team]);

  const hasUnsavedChanges =
    JSON.stringify({
      name: formData.name,
      tagline: formData.tagline,
      shortBio: formData.shortBio,
      location: formData.location,
      mascotKeyword: formData.mascotKeyword,
      mascotEmoji: formData.mascotEmoji,
      plannedEvents: formData.plannedEvents,
    }) !== initialValuesRef.current;

  useEffect(() => {
    onUnsavedChangesChange?.(hasUnsavedChanges);
  }, [hasUnsavedChanges, onUnsavedChangesChange]);

  useUnsavedChanges(hasUnsavedChanges, {
    enabled: true,
    message: 'You have unsaved changes. Are you sure you want to leave?',
  });

  const saveIdentityData = async (data: IdentityFormData) => {
    try {
      // Update identity fields (excluding name which is handled separately)
      const identityUpdates = {
        tagline: data.tagline || null,
        shortBio: data.shortBio || null,
        location: data.location || null,
        mascotKeyword: data.mascotKeyword || null,
        plannedEvents: data.plannedEvents,
      };

      // Update brand kit mascot emoji
      const brandKitUpdates = {
        mascotEmoji: data.mascotEmoji || null,
      };

      // Calculate new completion scores
      const updatedIdentity = {
        ...team.identity,
        ...identityUpdates,
      };
      const updatedBrandKit = {
        ...team.brandKit,
        ...brandKitUpdates,
      };
      const completion = calculateTeamCompletion(updatedBrandKit, updatedIdentity, []);

      // Update team
      await updateBattleRoyaleTeam(team.id, {
        identity: updatedIdentity,
        brandKit: updatedBrandKit,
        completion,
      });

      const updatedTeam: BattleRoyaleTeam = {
        ...team,
        identity: updatedIdentity,
        brandKit: updatedBrandKit,
        completion,
        updatedAt: Date.now(),
      };

      onTeamUpdate?.(updatedTeam);
      initialValuesRef.current = JSON.stringify({
        name: updatedTeam.name,
        tagline: updatedTeam.identity.tagline || '',
        shortBio: updatedTeam.identity.shortBio || '',
        location: updatedTeam.identity.location || '',
        mascotKeyword: updatedTeam.identity.mascotKeyword || '',
        mascotEmoji: updatedTeam.brandKit.mascotEmoji || '',
        plannedEvents: updatedTeam.identity.plannedEvents || [],
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving identity:', error);
      throw error;
    }
  };

  const handleManualSave = async () => {
    setIsManualSaving(true);
    try {
      await saveIdentityData(formData);
    } catch (err) {
      console.error('Error manually saving:', err);
    } finally {
      setIsManualSaving(false);
    }
  };

  const { isSaving, error, lastSaved } = useDebouncedAutoSave(
    {
      tagline: formData.tagline,
      shortBio: formData.shortBio,
      location: formData.location,
      mascotKeyword: formData.mascotKeyword,
      mascotEmoji: formData.mascotEmoji,
      plannedEvents: formData.plannedEvents,
    },
    async (data) => {
      await saveIdentityData({
        ...formData,
        ...data,
      });
    },
    { delay: 1000, enabled: true }
  );

  const handleNameChange = async (newName: string) => {
    if (newName === team.name) return;

    setIsSavingName(true);
    setNameError(null);

    try {
      const newSlug = await updateBattleRoyaleTeamName(team.id, newName);

      // Recalculate completion and update
      const updatedIdentity = { ...team.identity };
      const completion = calculateTeamCompletion(team.brandKit, updatedIdentity, []);

      await updateBattleRoyaleTeam(team.id, {
        completion,
      });

      const updatedTeam: BattleRoyaleTeam = {
        ...team,
        name: newName,
        slug: newSlug,
        completion,
        updatedAt: Date.now(),
      };

      onTeamUpdate?.(updatedTeam);
    } catch (error) {
      setNameError(error instanceof Error ? error.message : 'Failed to update team name');
      // Revert the input value
      setValue('name', team.name);
    } finally {
      setIsSavingName(false);
    }
  };

  const handleNameBlur = () => {
    const currentName = formData.name;
    if (currentName && currentName !== team.name) {
      handleNameChange(currentName);
    }
  };

  const togglePlannedEvent = (eventId: string) => {
    const currentEvents = formData.plannedEvents || [];
    const newEvents = currentEvents.includes(eventId)
      ? currentEvents.filter((id) => id !== eventId)
      : [...currentEvents, eventId];
    setValue('plannedEvents', newEvents);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-neon-green uppercase tracking-wider">
          Team Identity
        </h2>
        <div className="flex items-center gap-3">
          {hasUnsavedChanges && !isSaving && !isSavingName && (
            <span className="text-sm text-neon-yellow">Unsaved changes</span>
          )}
          {(isSaving || isSavingName) && (
            <span className="text-sm text-text-secondary">Auto-saving...</span>
          )}
          {isManualSaving && (
            <span className="text-sm text-text-secondary">Saving...</span>
          )}
          {saveSuccess && !isSaving && !isSavingName && !isManualSaving && (
            <span className="text-sm text-neon-green">Saved!</span>
          )}
          {lastSaved && !isSaving && !isSavingName && !isManualSaving && (
            <span className="text-xs text-text-secondary">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <button
            type="button"
            onClick={handleManualSave}
            disabled={isManualSaving || isSaving || isSavingName || !hasUnsavedChanges}
            className="px-4 py-2 text-sm bg-neon-green text-text-dark rounded-md hover:bg-neon-yellow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isManualSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-surface-muted border border-neon-pink rounded-md">
          <p className="text-sm text-neon-pink">{error.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(saveIdentityData)} className="space-y-6">
        <div className="bg-surface-card border border-surface-muted rounded-lg p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
              Team Name <span className="text-neon-pink">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                id="name"
                type="text"
                {...register('name')}
                onBlur={handleNameBlur}
                className="input-neon w-full px-3 py-2 rounded-md"
                disabled={isSavingName}
              />
              {isSavingName && (
                <span className="text-sm text-text-secondary">Updating...</span>
              )}
            </div>
            {errors.name && <p className="mt-1 text-sm text-neon-pink">{errors.name.message}</p>}
            {nameError && <p className="mt-1 text-sm text-neon-pink">{nameError}</p>}
          </div>

          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-text-primary mb-1">
              Tagline
            </label>
            <input
              id="tagline"
              type="text"
              {...register('tagline')}
              placeholder="A short, memorable tagline"
              maxLength={200}
              className="input-neon w-full px-3 py-2 rounded-md"
            />
            {errors.tagline && (
              <p className="mt-1 text-sm text-neon-pink">{errors.tagline.message}</p>
            )}
            <p className="mt-1 text-xs text-text-secondary">
              {formData.tagline?.length || 0}/200 characters
            </p>
          </div>

          <div>
            <label htmlFor="shortBio" className="block text-sm font-medium text-text-primary mb-1">
              Short Bio
            </label>
            <textarea
              id="shortBio"
              {...register('shortBio')}
              placeholder="1-2 sentences about your team"
              maxLength={500}
              rows={3}
              className="input-neon w-full px-3 py-2 rounded-md resize-none"
            />
            {errors.shortBio && (
              <p className="mt-1 text-sm text-neon-pink">{errors.shortBio.message}</p>
            )}
            <p className="mt-1 text-xs text-text-secondary">
              {formData.shortBio?.length || 0}/500 characters
            </p>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-text-primary mb-1">
              Location
            </label>
            <input
              id="location"
              type="text"
              {...register('location')}
              placeholder="e.g., Montreal, QC"
              maxLength={100}
              className="input-neon w-full px-3 py-2 rounded-md"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-neon-pink">{errors.location.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="mascotKeyword"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Mascot Keyword
              </label>
              <input
                id="mascotKeyword"
                type="text"
                {...register('mascotKeyword')}
                placeholder="e.g., wolves, phoenix"
                maxLength={50}
                className="input-neon w-full px-3 py-2 rounded-md"
              />
              {errors.mascotKeyword && (
                <p className="mt-1 text-sm text-neon-pink">{errors.mascotKeyword.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="mascotEmoji"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Mascot Emoji
              </label>
              <input
                id="mascotEmoji"
                type="text"
                {...register('mascotEmoji')}
                placeholder="🔥"
                maxLength={10}
                className="input-neon w-full px-3 py-2 rounded-md"
              />
              {errors.mascotEmoji && (
                <p className="mt-1 text-sm text-neon-pink">{errors.mascotEmoji.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Planned Competitions
            </label>
            <div className="space-y-2">
              {BR_EVENTS.map((event) => (
                <label
                  key={event.id}
                  className="flex items-center gap-2 cursor-pointer hover:text-neon-green transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.plannedEvents?.includes(event.id) || false}
                    onChange={() => togglePlannedEvent(event.id)}
                    className="rounded border-surface-muted text-neon-green focus:ring-neon-green"
                  />
                  <span className="text-sm text-text-primary">
                    {event.name} - {event.display}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

