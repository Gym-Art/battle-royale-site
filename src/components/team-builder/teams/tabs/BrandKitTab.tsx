'use client';

import { ColorPicker } from '@/components/team-builder/brand-kit/ColorPicker';
import { LogoPreview } from '@/components/team-builder/brand-kit/LogoPreview';
import { useDebouncedAutoSave } from '@/hooks/useDebouncedAutoSave';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { updateBattleRoyaleTeam } from '@/lib/firestore/battleRoyaleTeams';
import {
    generateColorPaletteWithLockedPrimary,
    generateRandomColorPalette,
} from '@/lib/random/colors';
import { getRandomMascotEmoji } from '@/lib/random/logos';
import { calculateTeamCompletion } from '@/lib/utils/calculateTeamCompletion';
import type { BattleRoyaleTeam, BattleRoyaleTeamBrandKit, FontFamilyKey, LogoStyleKey } from '@/types/battleRoyaleTeam';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FONT_FAMILIES: { value: FontFamilyKey; label: string; description: string }[] = [
  { value: 'block', label: 'Block', description: 'Bold, impactful' },
  { value: 'modern', label: 'Modern', description: 'Clean, contemporary' },
  { value: 'classic', label: 'Classic', description: 'Elegant, traditional' },
  { value: 'bold', label: 'Bold', description: 'Heavy, strong' },
  { value: 'elegant', label: 'Elegant', description: 'Refined, sophisticated' },
  { value: 'sporty', label: 'Sporty', description: 'Dynamic, energetic' },
  { value: 'futuristic', label: 'Futuristic', description: 'Tech-forward, sleek' },
  { value: 'retro', label: 'Retro', description: 'Vintage, nostalgic' },
  { value: 'minimal', label: 'Minimal', description: 'Simple, clean' },
  { value: 'decorative', label: 'Decorative', description: 'Ornate, detailed' },
  { value: 'handwritten', label: 'Handwritten', description: 'Personal, casual' },
  { value: 'tech', label: 'Tech', description: 'Digital, geometric' },
];

const LOGO_STYLES: { value: LogoStyleKey; label: string; description: string }[] = [
  { value: 'badge', label: 'Badge', description: 'Circle/crest with text' },
  { value: 'monogram', label: 'Monogram', description: 'Initial letters' },
  { value: 'wordmark', label: 'Wordmark', description: 'Stylized text bar' },
  { value: 'shield', label: 'Shield', description: 'Protective shield shape' },
  { value: 'emblem', label: 'Emblem', description: 'Symbolic emblem design' },
  { value: 'crest', label: 'Crest', description: 'Heraldic crest style' },
  { value: 'stamp', label: 'Stamp', description: 'Official stamp look' },
  { value: 'seal', label: 'Seal', description: 'Official seal design' },
  { value: 'badge-modern', label: 'Badge Modern', description: 'Contemporary badge' },
  { value: 'badge-vintage', label: 'Badge Vintage', description: 'Vintage badge style' },
  { value: 'badge-minimal', label: 'Badge Minimal', description: 'Minimalist badge' },
  { value: 'badge-ornate', label: 'Badge Ornate', description: 'Ornate detailed badge' },
];

const brandKitSchema = z.object({
  // Home colors
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  // Away colors
  awayPrimaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  awaySecondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  // Shared
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  fontFamilyKey: z.enum([
    'block',
    'modern',
    'classic',
    'bold',
    'elegant',
    'sporty',
    'futuristic',
    'retro',
    'minimal',
    'decorative',
    'handwritten',
    'tech',
  ]),
  logoStyleKey: z.enum([
    'badge',
    'monogram',
    'wordmark',
    'shield',
    'emblem',
    'crest',
    'stamp',
    'seal',
    'badge-modern',
    'badge-vintage',
    'badge-minimal',
    'badge-ornate',
  ]),
  logoText: z.string().min(1, 'Logo text is required').max(20, 'Logo text must be 20 characters or less'),
  logoAcronym: z.string().max(10, 'Acronym must be 10 characters or less').optional().nullable(),
  mascotEmoji: z.string().max(10, 'Mascot emoji must be 10 characters or less').optional().nullable(),
});

type BrandKitFormData = z.infer<typeof brandKitSchema>;

interface BrandKitTabProps {
  team: BattleRoyaleTeam;
  onTeamUpdate?: (updatedTeam: BattleRoyaleTeam) => void;
  onUnsavedChangesChange?: (hasUnsaved: boolean) => void;
}

export function BrandKitTab({ team, onTeamUpdate, onUnsavedChangesChange }: BrandKitTabProps) {
  const [lockedColors, setLockedColors] = useState({
    primary: false,
    secondary: false,
    awayPrimary: false,
    awaySecondary: false,
    accent: false,
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isManualSaving, setIsManualSaving] = useState(false);
  const initialValuesRef = useRef<string>('');

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandKitFormData>({
    resolver: zodResolver(brandKitSchema),
    defaultValues: {
      primaryColor: team.brandKit.primaryColor,
      secondaryColor: team.brandKit.secondaryColor || '',
      awayPrimaryColor: team.brandKit.awayPrimaryColor || '',
      awaySecondaryColor: team.brandKit.awaySecondaryColor || '',
      accentColor: team.brandKit.accentColor || '',
      fontFamilyKey: team.brandKit.fontFamilyKey,
      logoStyleKey: team.brandKit.logoStyleKey,
      logoText: team.brandKit.logoText,
      logoAcronym: team.brandKit.logoAcronym || '',
      mascotEmoji: team.brandKit.mascotEmoji || '',
    },
  });

  const formData = watch();

  // Track initial values for unsaved changes
  useEffect(() => {
    if (initialValuesRef.current === '') {
      initialValuesRef.current = JSON.stringify(formData);
    }
  }, [formData]);

  const hasUnsavedChanges = JSON.stringify(formData) !== initialValuesRef.current;

  useEffect(() => {
    onUnsavedChangesChange?.(hasUnsavedChanges);
  }, [hasUnsavedChanges, onUnsavedChangesChange]);

  useUnsavedChanges(hasUnsavedChanges, {
    enabled: true,
    message: 'You have unsaved changes. Are you sure you want to leave?',
  });

  const saveBrandKitData = async (data: BrandKitFormData) => {
    try {
      const brandKitUpdates: BattleRoyaleTeamBrandKit = {
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor || null,
        awayPrimaryColor: data.awayPrimaryColor || null,
        awaySecondaryColor: data.awaySecondaryColor || null,
        accentColor: data.accentColor || null,
        fontFamilyKey: data.fontFamilyKey,
        logoStyleKey: data.logoStyleKey,
        logoText: data.logoText,
        logoAcronym: data.logoAcronym || null,
        mascotEmoji: data.mascotEmoji || null,
      };

      // Calculate new completion scores
      const completion = calculateTeamCompletion(brandKitUpdates, team.identity, []);

      // Update team
      await updateBattleRoyaleTeam(team.id, {
        brandKit: brandKitUpdates,
        completion,
      });

      const updatedTeam: BattleRoyaleTeam = {
        ...team,
        brandKit: brandKitUpdates,
        completion,
        updatedAt: Date.now(),
      };

      onTeamUpdate?.(updatedTeam);
      initialValuesRef.current = JSON.stringify(data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving brand kit:', error);
      throw error;
    }
  };

  const { isSaving, error, lastSaved } = useDebouncedAutoSave(
    formData,
    saveBrandKitData,
    { delay: 2000, enabled: true }
  );

  const handleManualSave = async () => {
    setIsManualSaving(true);
    try {
      await saveBrandKitData(formData);
    } catch (err) {
      console.error('Error manually saving:', err);
    } finally {
      setIsManualSaving(false);
    }
  };

  const handleRandomizeColors = () => {
    if (lockedColors.primary) {
      const palette = generateColorPaletteWithLockedPrimary(formData.primaryColor);
      if (!lockedColors.secondary) {
        setValue('secondaryColor', palette.secondary || '');
      }
      if (!lockedColors.accent) {
        setValue('accentColor', palette.accent || '');
      }
    } else {
      const palette = generateRandomColorPalette();
      if (!lockedColors.primary) {
        setValue('primaryColor', palette.primary);
      }
      if (!lockedColors.secondary) {
        setValue('secondaryColor', palette.secondary || '');
      }
      if (!lockedColors.accent) {
        setValue('accentColor', palette.accent || '');
      }
    }
    // Randomize away colors too
    const awayPalette = generateRandomColorPalette();
    if (!lockedColors.awayPrimary) {
      setValue('awayPrimaryColor', awayPalette.primary);
    }
    if (!lockedColors.awaySecondary) {
      setValue('awaySecondaryColor', awayPalette.secondary || '');
    }
  };

  const handleRandomizeLogo = () => {
    const randomLogoStyle = LOGO_STYLES[Math.floor(Math.random() * LOGO_STYLES.length)]!;
    const randomFont = FONT_FAMILIES[Math.floor(Math.random() * FONT_FAMILIES.length)]!;
    
    setValue('logoStyleKey', randomLogoStyle.value);
    setValue('fontFamilyKey', randomFont.value);
    
    // Randomize mascot emoji
    const randomEmoji = getRandomMascotEmoji();
    setValue('mascotEmoji', randomEmoji);
  };

  const toggleColorLock = (color: 'primary' | 'secondary' | 'awayPrimary' | 'awaySecondary' | 'accent') => {
    setLockedColors((prev) => ({
      ...prev,
      [color]: !prev[color],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-neon-green uppercase tracking-wider">
          Brand Kit
        </h2>
        <div className="flex items-center gap-3">
          {hasUnsavedChanges && !isSaving && (
            <span className="text-sm text-neon-yellow">Unsaved changes</span>
          )}
          {isSaving && <span className="text-sm text-text-secondary">Auto-saving...</span>}
          {isManualSaving && <span className="text-sm text-text-secondary">Saving...</span>}
          {saveSuccess && !isSaving && !isManualSaving && (
            <span className="text-sm text-neon-green">Saved!</span>
          )}
          {lastSaved && !isSaving && !isManualSaving && (
            <span className="text-xs text-text-secondary">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <button
            type="button"
            onClick={handleManualSave}
            disabled={isManualSaving || isSaving || !hasUnsavedChanges}
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

      <form onSubmit={handleSubmit(saveBrandKitData)}>
        <div className="space-y-6">
          {/* Logo Preview */}
          <div className="bg-surface-card border border-surface-muted rounded-lg p-6">
            <LogoPreview
              brandKit={{
                primaryColor: formData.primaryColor,
                secondaryColor: formData.secondaryColor || null,
                awayPrimaryColor: formData.awayPrimaryColor || null,
                awaySecondaryColor: formData.awaySecondaryColor || null,
                accentColor: formData.accentColor || null,
                fontFamilyKey: formData.fontFamilyKey,
                logoStyleKey: formData.logoStyleKey,
                logoText: formData.logoText,
                logoAcronym: formData.logoAcronym || null,
                mascotEmoji: formData.mascotEmoji || null,
              }}
            />
          </div>
            {/* Home Colors */}
            <div className="bg-surface-card border border-surface-muted rounded-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">Home Colors</h3>
              </div>
              
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <ColorPicker
                      value={formData.primaryColor}
                      onChange={(hex) => setValue('primaryColor', hex)}
                      label="Primary Color"
                      required
                      error={errors.primaryColor?.message}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleColorLock('primary')}
                    className={`text-xs px-2 py-1 rounded mt-6 ${
                      lockedColors.primary
                        ? 'bg-neon-green text-text-dark'
                        : 'bg-surface-muted text-text-secondary'
                    }`}
                  >
                    {lockedColors.primary ? '🔒 Locked' : '🔓 Unlocked'}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <ColorPicker
                      value={formData.secondaryColor || '#000000'}
                      onChange={(hex) => setValue('secondaryColor', hex)}
                      label="Secondary Color"
                      error={errors.secondaryColor?.message}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleColorLock('secondary')}
                    className={`text-xs px-2 py-1 rounded mt-6 ${
                      lockedColors.secondary
                        ? 'bg-neon-green text-text-dark'
                        : 'bg-surface-muted text-text-secondary'
                    }`}
                  >
                    {lockedColors.secondary ? '🔒 Locked' : '🔓 Unlocked'}
                  </button>
                </div>
              </div>
            </div>

            {/* Away Colors */}
            <div className="bg-surface-card border border-surface-muted rounded-lg p-6 space-y-6">
              <h3 className="text-lg font-semibold text-text-primary">Away Colors</h3>
              
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <ColorPicker
                      value={formData.awayPrimaryColor || '#000000'}
                      onChange={(hex) => setValue('awayPrimaryColor', hex)}
                      label="Away Primary"
                      error={errors.awayPrimaryColor?.message}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleColorLock('awayPrimary')}
                    className={`text-xs px-2 py-1 rounded mt-6 ${
                      lockedColors.awayPrimary
                        ? 'bg-neon-green text-text-dark'
                        : 'bg-surface-muted text-text-secondary'
                    }`}
                  >
                    {lockedColors.awayPrimary ? '🔒 Locked' : '🔓 Unlocked'}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <ColorPicker
                      value={formData.awaySecondaryColor || '#000000'}
                      onChange={(hex) => setValue('awaySecondaryColor', hex)}
                      label="Away Secondary"
                      error={errors.awaySecondaryColor?.message}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleColorLock('awaySecondary')}
                    className={`text-xs px-2 py-1 rounded mt-6 ${
                      lockedColors.awaySecondary
                        ? 'bg-neon-green text-text-dark'
                        : 'bg-surface-muted text-text-secondary'
                    }`}
                  >
                    {lockedColors.awaySecondary ? '🔒 Locked' : '🔓 Unlocked'}
                  </button>
                </div>
              </div>
            </div>

            {/* Accent Color */}
            <div className="bg-surface-card border border-surface-muted rounded-lg p-6 space-y-6">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <ColorPicker
                      value={formData.accentColor || '#000000'}
                      onChange={(hex) => setValue('accentColor', hex)}
                      label="Accent Color"
                      error={errors.accentColor?.message}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleColorLock('accent')}
                    className={`text-xs px-2 py-1 rounded mt-6 ${
                      lockedColors.accent
                        ? 'bg-neon-green text-text-dark'
                        : 'bg-surface-muted text-text-secondary'
                    }`}
                  >
                    {lockedColors.accent ? '🔒 Locked' : '🔓 Unlocked'}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-muted">
                <button
                  type="button"
                  onClick={handleRandomizeColors}
                  className="w-full px-4 py-2 text-sm text-text-primary hover:text-neon-green border border-surface-muted rounded-md hover:border-neon-green transition-colors"
                >
                  🎨 Randomize All Colors
                </button>
              </div>
            </div>

            {/* Font and Logo Settings */}
            <div className="bg-surface-card border border-surface-muted rounded-lg p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Font Family
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {FONT_FAMILIES.map((font) => (
                    <label
                      key={font.value}
                      className="flex items-center gap-2 cursor-pointer hover:text-neon-green transition-colors"
                    >
                      <input
                        type="radio"
                        {...register('fontFamilyKey')}
                        value={font.value}
                        className="text-neon-green focus:ring-neon-green"
                      />
                      <span className="text-sm text-text-primary">{font.label}</span>
                      <span className="text-xs text-text-secondary ml-auto">{font.description}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Logo Style</label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {LOGO_STYLES.map((style) => (
                    <label
                      key={style.value}
                      className="flex items-center gap-2 cursor-pointer hover:text-neon-green transition-colors"
                    >
                      <input
                        type="radio"
                        {...register('logoStyleKey')}
                        value={style.value}
                        className="text-neon-green focus:ring-neon-green"
                      />
                      <span className="text-sm text-text-primary">{style.label}</span>
                      <span className="text-xs text-text-secondary ml-auto">{style.description}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="logoText" className="block text-sm font-medium text-text-primary mb-1">
                  Logo Text
                </label>
                <input
                  id="logoText"
                  type="text"
                  {...register('logoText')}
                  placeholder={team.name}
                  maxLength={20}
                  className="input-neon w-full px-3 py-2 rounded-md"
                />
                {errors.logoText && (
                  <p className="mt-1 text-sm text-neon-pink">{errors.logoText.message}</p>
                )}
                <p className="mt-1 text-xs text-text-secondary">
                  {formData.logoText?.length || 0}/20 characters
                </p>
              </div>

              <div>
                <label htmlFor="logoAcronym" className="block text-sm font-medium text-text-primary mb-1">
                  Logo Acronym (Optional)
                </label>
                <input
                  id="logoAcronym"
                  type="text"
                  {...register('logoAcronym')}
                  placeholder="e.g., BR, GAM"
                  maxLength={10}
                  className="input-neon w-full px-3 py-2 rounded-md"
                />
                {errors.logoAcronym && (
                  <p className="mt-1 text-sm text-neon-pink">{errors.logoAcronym.message}</p>
                )}
                <p className="mt-1 text-xs text-text-secondary">
                  {formData.logoAcronym?.length || 0}/10 characters
                </p>
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

              <div className="pt-4 border-t border-surface-muted">
                <button
                  type="button"
                  onClick={handleRandomizeLogo}
                  className="w-full px-4 py-2 text-sm text-text-primary hover:text-neon-green border border-surface-muted rounded-md hover:border-neon-green transition-colors"
                >
                  🎲 Randomize Logo
                </button>
              </div>
            </div>
        </div>
      </form>
    </div>
  );
}
