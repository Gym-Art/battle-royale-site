'use client';

import { useEffect, useRef, useState } from 'react';

interface UseDebouncedAutoSaveOptions {
  delay?: number;
  enabled?: boolean;
}

interface UseDebouncedAutoSaveReturn<T> {
  isSaving: boolean;
  error: Error | null;
  lastSaved: Date | null;
}

/**
 * Hook that debounces form changes and automatically saves them
 * @param value - The form data to save
 * @param onSave - Async function to save the data
 * @param options - Configuration options
 */
export function useDebouncedAutoSave<T>(
  value: T,
  onSave: (data: T) => Promise<void>,
  options: UseDebouncedAutoSaveOptions = {}
): UseDebouncedAutoSaveReturn<T> {
  const { delay = 1000, enabled = true } = options;
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousValueRef = useRef<T>(value);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousValueRef.current = value;
      return;
    }

    // Skip if disabled or value hasn't changed
    if (!enabled || JSON.stringify(value) === JSON.stringify(previousValueRef.current)) {
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      setIsSaving(true);
      setError(null);

      try {
        await onSave(value);
        setLastSaved(new Date());
        previousValueRef.current = value;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to save'));
        console.error('Auto-save error:', err);
      } finally {
        setIsSaving(false);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, onSave, delay, enabled]);

  return { isSaving, error, lastSaved };
}

