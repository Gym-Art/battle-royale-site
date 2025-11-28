'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseUnsavedChangesOptions {
  enabled?: boolean;
  message?: string;
}

/**
 * Hook to track unsaved changes and warn user before navigation
 */
export function useUnsavedChanges(
  hasUnsavedChanges: boolean,
  options: UseUnsavedChangesOptions = {}
) {
  const { enabled = true, message = 'You have unsaved changes. Are you sure you want to leave?' } = options;
  const router = useRouter();
  const [shouldBlock, setShouldBlock] = useState(false);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    if (!enabled || !hasUnsavedChanges) {
      return;
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    const handleRouteChange = (url: string) => {
      if (!isNavigatingRef.current && hasUnsavedChanges) {
        const shouldLeave = window.confirm(message);
        if (!shouldLeave) {
          router.push(window.location.pathname + window.location.search + window.location.hash);
          throw new Error('Route change aborted by user');
        }
        isNavigatingRef.current = true;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled, hasUnsavedChanges, message, router]);

  const confirmNavigation = (callback: () => void) => {
    if (hasUnsavedChanges) {
      const shouldLeave = window.confirm(message);
      if (shouldLeave) {
        isNavigatingRef.current = true;
        callback();
      }
    } else {
      callback();
    }
  };

  return { shouldBlock, confirmNavigation };
}

