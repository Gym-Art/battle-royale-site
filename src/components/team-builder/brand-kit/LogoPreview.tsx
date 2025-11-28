'use client';

import type { BattleRoyaleTeamBrandKit } from '@/types/battleRoyaleTeam';

interface LogoPreviewProps {
  brandKit: BattleRoyaleTeamBrandKit;
  size?: number;
}

export function LogoPreview({ brandKit, size = 200 }: LogoPreviewProps) {
  const {
    primaryColor,
    secondaryColor,
    awayPrimaryColor,
    awaySecondaryColor,
    accentColor,
    fontFamilyKey,
    logoStyleKey,
    logoText,
    logoAcronym,
    mascotEmoji,
  } = brandKit;

  const getFontFamily = () => {
    switch (fontFamilyKey) {
      case 'block':
      case 'bold':
        return 'font-bold';
      case 'modern':
      case 'minimal':
      case 'tech':
        return 'font-normal';
      case 'classic':
      case 'elegant':
      case 'decorative':
        return 'font-serif';
      case 'sporty':
      case 'futuristic':
        return 'font-bold';
      case 'retro':
      case 'handwritten':
        return 'font-normal italic';
      default:
        return 'font-normal';
    }
  };

  const getDisplayText = () => {
    if (logoAcronym && logoAcronym.trim()) {
      return logoAcronym.toUpperCase();
    }
    return logoText.toUpperCase();
  };

  const getInitials = () => {
    if (logoAcronym && logoAcronym.trim()) {
      return logoAcronym.slice(0, 2).toUpperCase();
    }
    return logoText
      .split(/\s+/)
      .map((word) => word[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 2) || logoText.slice(0, 2).toUpperCase();
  };

  const renderBadge = () => {
    const bgColor = secondaryColor || primaryColor;
    const textColor = accentColor || '#FFFFFF';

    return (
      <svg width={size} height={size} viewBox="0 0 200 200" className="rounded-lg">
        <defs>
          <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={bgColor} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#badgeGradient)" />
        <circle cx="100" cy="100" r="75" fill="none" stroke={textColor} strokeWidth="2" opacity="0.3" />
        {mascotEmoji && (
          <text x="100" y="80" fontSize="40" fill={textColor} textAnchor="middle" dominantBaseline="middle">
            {mascotEmoji}
          </text>
        )}
        <text
          x="100"
          y={mascotEmoji ? '130' : '110'}
          fontSize="24"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          className={getFontFamily()}
        >
          {getDisplayText()}
        </text>
      </svg>
    );
  };

  const renderMonogram = () => {
    const initials = getInitials();
    const bgColor = primaryColor;
    const textColor = accentColor || secondaryColor || '#FFFFFF';

    return (
      <svg width={size} height={size} viewBox="0 0 200 200" className="rounded-lg">
        <rect width="200" height="200" rx="20" fill={bgColor} />
        {secondaryColor && (
          <rect
            x="10"
            y="10"
            width="180"
            height="180"
            rx="15"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="3"
            opacity="0.5"
          />
        )}
        <text
          x="100"
          y="120"
          fontSize="72"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          className={getFontFamily()}
        >
          {initials}
        </text>
        {mascotEmoji && (
          <text x="100" y="50" fontSize="32" textAnchor="middle" dominantBaseline="middle">
            {mascotEmoji}
          </text>
        )}
      </svg>
    );
  };

  const renderWordmark = () => {
    const bgColor = primaryColor;
    const textColor = accentColor || secondaryColor || '#FFFFFF';

    return (
      <svg width={size} height={size} viewBox="0 0 200 200" className="rounded-lg">
        <defs>
          <linearGradient id="wordmarkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor || primaryColor} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" rx="10" fill="url(#wordmarkGradient)" />
        {mascotEmoji && (
          <text x="100" y="60" fontSize="36" textAnchor="middle" dominantBaseline="middle">
            {mascotEmoji}
          </text>
        )}
        <text
          x="100"
          y={mascotEmoji ? '130' : '110'}
          fontSize="28"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          className={getFontFamily()}
        >
          {getDisplayText()}
        </text>
        {accentColor && (
          <line
            x1="30"
            y1={mascotEmoji ? '150' : '130'}
            x2="170"
            y2={mascotEmoji ? '150' : '130'}
            stroke={accentColor}
            strokeWidth="3"
          />
        )}
      </svg>
    );
  };

  const renderShield = () => {
    const bgColor = secondaryColor || primaryColor;
    const textColor = accentColor || '#FFFFFF';

    return (
      <svg width={size} height={size} viewBox="0 0 200 200" className="rounded-lg">
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={bgColor} />
          </linearGradient>
        </defs>
        <path
          d="M 100 20 L 160 50 L 160 120 Q 160 160 100 180 Q 40 160 40 120 L 40 50 Z"
          fill="url(#shieldGradient)"
        />
        {mascotEmoji && (
          <text x="100" y="80" fontSize="40" fill={textColor} textAnchor="middle" dominantBaseline="middle">
            {mascotEmoji}
          </text>
        )}
        <text
          x="100"
          y={mascotEmoji ? '130' : '110'}
          fontSize="22"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          className={getFontFamily()}
        >
          {getDisplayText()}
        </text>
      </svg>
    );
  };

  const renderEmblem = () => {
    const bgColor = primaryColor;
    const textColor = accentColor || secondaryColor || '#FFFFFF';

    return (
      <svg width={size} height={size} viewBox="0 0 200 200" className="rounded-lg">
        <circle cx="100" cy="100" r="85" fill={bgColor} />
        <circle cx="100" cy="100" r="70" fill="none" stroke={textColor} strokeWidth="4" />
        {mascotEmoji && (
          <text x="100" y="85" fontSize="50" textAnchor="middle" dominantBaseline="middle">
            {mascotEmoji}
          </text>
        )}
        <text
          x="100"
          y={mascotEmoji ? '140' : '120'}
          fontSize="20"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          className={getFontFamily()}
        >
          {getDisplayText()}
        </text>
      </svg>
    );
  };

  const renderCrest = () => {
    const bgColor = secondaryColor || primaryColor;
    const textColor = accentColor || '#FFFFFF';

    return (
      <svg width={size} height={size} viewBox="0 0 200 200" className="rounded-lg">
        <defs>
          <linearGradient id="crestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={bgColor} />
          </linearGradient>
        </defs>
        <path
          d="M 100 30 Q 140 30 160 60 Q 180 90 160 130 Q 140 160 100 170 Q 60 160 40 130 Q 20 90 40 60 Q 60 30 100 30 Z"
          fill="url(#crestGradient)"
        />
        {mascotEmoji && (
          <text x="100" y="85" fontSize="45" fill={textColor} textAnchor="middle" dominantBaseline="middle">
            {mascotEmoji}
          </text>
        )}
        <text
          x="100"
          y={mascotEmoji ? '135' : '115'}
          fontSize="22"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          className={getFontFamily()}
        >
          {getDisplayText()}
        </text>
      </svg>
    );
  };

  const renderStamp = () => {
    const bgColor = primaryColor;
    const textColor = accentColor || secondaryColor || '#FFFFFF';

    return (
      <svg width={size} height={size} viewBox="0 0 200 200" className="rounded-lg">
        <rect x="20" y="20" width="160" height="160" rx="5" fill={bgColor} />
        <rect x="25" y="25" width="150" height="150" fill="none" stroke={textColor} strokeWidth="2" strokeDasharray="5,5" />
        {mascotEmoji && (
          <text x="100" y="85" fontSize="50" textAnchor="middle" dominantBaseline="middle">
            {mascotEmoji}
          </text>
        )}
        <text
          x="100"
          y={mascotEmoji ? '140' : '120'}
          fontSize="24"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          className={getFontFamily()}
        >
          {getDisplayText()}
        </text>
      </svg>
    );
  };

  const renderSeal = () => {
    const bgColor = primaryColor;
    const textColor = accentColor || secondaryColor || '#FFFFFF';

    return (
      <svg width={size} height={size} viewBox="0 0 200 200" className="rounded-lg">
        <circle cx="100" cy="100" r="90" fill={bgColor} />
        <circle cx="100" cy="100" r="80" fill="none" stroke={textColor} strokeWidth="3" />
        <circle cx="100" cy="100" r="70" fill="none" stroke={textColor} strokeWidth="1" opacity="0.5" />
        {mascotEmoji && (
          <text x="100" y="90" fontSize="45" fill={textColor} textAnchor="middle" dominantBaseline="middle">
            {mascotEmoji}
          </text>
        )}
        <text
          x="100"
          y={mascotEmoji ? '135' : '115'}
          fontSize="20"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          className={getFontFamily()}
        >
          {getDisplayText()}
        </text>
      </svg>
    );
  };

  const renderBadgeVariant = (variant: 'modern' | 'vintage' | 'minimal' | 'ornate') => {
    const bgColor = secondaryColor || primaryColor;
    const textColor = accentColor || '#FFFFFF';

    const styles = {
      modern: { shape: 'circle', border: 'thin', gradient: true },
      vintage: { shape: 'circle', border: 'thick', gradient: false },
      minimal: { shape: 'circle', border: 'none', gradient: false },
      ornate: { shape: 'circle', border: 'ornate', gradient: true },
    };

    const style = styles[variant];

    return (
      <svg width={size} height={size} viewBox="0 0 200 200" className="rounded-lg">
        <defs>
          {style.gradient && (
            <linearGradient id={`badge${variant}Gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={bgColor} />
            </linearGradient>
          )}
        </defs>
        <circle
          cx="100"
          cy="100"
          r="90"
          fill={style.gradient ? `url(#badge${variant}Gradient)` : primaryColor}
        />
        {style.border === 'thick' && (
          <circle cx="100" cy="100" r="75" fill="none" stroke={textColor} strokeWidth="4" />
        )}
        {style.border === 'ornate' && (
          <>
            <circle cx="100" cy="100" r="80" fill="none" stroke={textColor} strokeWidth="2" />
            <circle cx="100" cy="100" r="70" fill="none" stroke={textColor} strokeWidth="1" opacity="0.5" />
          </>
        )}
        {mascotEmoji && (
          <text x="100" y="80" fontSize="40" fill={textColor} textAnchor="middle" dominantBaseline="middle">
            {mascotEmoji}
          </text>
        )}
        <text
          x="100"
          y={mascotEmoji ? '130' : '110'}
          fontSize="24"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          className={getFontFamily()}
        >
          {getDisplayText()}
        </text>
      </svg>
    );
  };

  const renderLogo = () => {
    switch (logoStyleKey) {
      case 'badge':
        return renderBadge();
      case 'monogram':
        return renderMonogram();
      case 'wordmark':
        return renderWordmark();
      case 'shield':
        return renderShield();
      case 'emblem':
        return renderEmblem();
      case 'crest':
        return renderCrest();
      case 'stamp':
        return renderStamp();
      case 'seal':
        return renderSeal();
      case 'badge-modern':
        return renderBadgeVariant('modern');
      case 'badge-vintage':
        return renderBadgeVariant('vintage');
      case 'badge-minimal':
        return renderBadgeVariant('minimal');
      case 'badge-ornate':
        return renderBadgeVariant('ornate');
      default:
        return renderMonogram();
    }
  };

  return (
    <div className="bg-surface-card border border-surface-muted rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Logo Preview</h3>
      <div className="flex justify-center items-center bg-surface-muted rounded-lg p-4">
        {renderLogo()}
      </div>
      <p className="text-xs text-text-secondary mt-4 text-center">
        Style: {logoStyleKey} • Font: {fontFamilyKey}
      </p>
    </div>
  );
}
