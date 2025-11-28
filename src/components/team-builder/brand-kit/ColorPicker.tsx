'use client';

import { useEffect, useState } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  label: string;
  required?: boolean;
  error?: string;
}

/**
 * Convert RGB to Hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
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
 * Validate hex color format
 */
function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

export function ColorPicker({ value, onChange, label, required = false, error }: ColorPickerProps) {
  const [tempHex, setTempHex] = useState(value);
  const [showApply, setShowApply] = useState(false);

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTempHex(newValue);
    setShowApply(newValue !== value && isValidHex(newValue));
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    // Ensure it starts with #
    if (newValue && !newValue.startsWith('#')) {
      newValue = '#' + newValue;
    }
    // Limit to 7 characters (# + 6 hex digits)
    if (newValue.length > 7) {
      newValue = newValue.slice(0, 7);
    }
    setTempHex(newValue);
    setShowApply(newValue !== value && isValidHex(newValue));
  };

  const handleApply = () => {
    if (isValidHex(tempHex)) {
      onChange(tempHex);
      setShowApply(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValidHex(tempHex)) {
      handleApply();
    }
  };

  // Sync tempHex with value when value changes externally
  useEffect(() => {
    if (value !== tempHex && !showApply) {
      setTempHex(value);
    }
  }, [value]);

  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">
        {label} {required && <span className="text-neon-pink">*</span>}
      </label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={handleColorInputChange}
            className="w-16 h-10 rounded border border-surface-muted cursor-pointer"
          />
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            value={tempHex}
            onChange={handleTextInputChange}
            onKeyPress={handleKeyPress}
            onBlur={() => {
              // If invalid on blur, revert to current value
              if (!isValidHex(tempHex)) {
                setTempHex(value);
                setShowApply(false);
              }
            }}
            className="input-neon w-full px-3 py-2 rounded-md"
            placeholder="#000000"
            maxLength={7}
          />
          {showApply && (
            <button
              type="button"
              onClick={handleApply}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-neon-green text-text-dark rounded hover:bg-neon-yellow transition-colors"
            >
              Apply
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-neon-pink">{error}</p>}
      {!error && tempHex && !isValidHex(tempHex) && (
        <p className="mt-1 text-sm text-neon-pink">Invalid hex color format</p>
      )}
    </div>
  );
}

