/**
 * Generate a color palette based on a seed (team name hash)
 */
export function generateColorPalette(seed: number): {
  primary: string;
  secondary: string | null;
  accent: string | null;
} {
  // Use seed to generate consistent colors
  const hue = (seed * 360) % 360;
  const primary = hslToHex(hue, 70, 50);
  const secondary = hslToHex((hue + 30) % 360, 60, 45);
  const accent = hslToHex((hue + 180) % 360, 65, 55); // Complementary color

  return {
    primary,
    secondary,
    accent,
  };
}

/**
 * Generate a random color palette
 */
export function generateRandomColorPalette(): {
  primary: string;
  secondary: string | null;
  accent: string | null;
} {
  const seed = Math.random() * 1000;
  return generateColorPalette(seed);
}

/**
 * Generate a color palette with locked primary color
 */
export function generateColorPaletteWithLockedPrimary(
  lockedPrimary: string
): {
  primary: string;
  secondary: string | null;
  accent: string | null;
} {
  // Extract hue from locked primary
  const rgb = hexToRgb(lockedPrimary);
  if (!rgb) {
    return generateRandomColorPalette();
  }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hue = hsl.h;

  const secondary = hslToHex((hue + 30) % 360, 60, 45);
  const accent = hslToHex((hue + 180) % 360, 65, 55);

  return {
    primary: lockedPrimary,
    secondary,
    accent,
  };
}

/**
 * Convert HSL to Hex
 */
function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert Hex to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
      }
    : null;
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

/**
 * Hash a string to a number (for seed generation)
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

