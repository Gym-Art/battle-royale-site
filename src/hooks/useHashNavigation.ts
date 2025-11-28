'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Hook to handle hash-based navigation and scroll spy functionality.
 * Updates the URL hash as the user scrolls to different sections.
 * 
 * @param sectionIds - Array of section IDs to watch for scroll position
 * @param offset - Offset in pixels from the top when scrolling (default: 100)
 */
export function useHashNavigation(sectionIds: string[], offset: number = 100) {
  const pathname = usePathname();
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasHandledInitialHashRef = useRef(false);
  
  // Store sectionIds in a ref for use in callbacks (always use latest)
  const sectionIdsRef = useRef(sectionIds);
  
  // Create a stable key for dependency comparison (only changes when content changes)
  const sectionIdsKey = sectionIds.join(',');
  
  // Update ref when sectionIds changes
  useEffect(() => {
    sectionIdsRef.current = sectionIds;
  }, [sectionIds]);

  useEffect(() => {
    // Reset the flag when pathname changes
    hasHandledInitialHashRef.current = false;

    // Handle initial hash on page load or route change
    const handleInitialHash = (retryCount = 0) => {
      if (hasHandledInitialHashRef.current && retryCount === 0) {
        return; // Already handled for this route
      }

      const hash = window.location.hash.slice(1);
      if (hash && sectionIdsRef.current.includes(hash)) {
        const element = document.getElementById(hash);
        if (element) {
          // Ensure element is in the DOM and has a position
          const rect = element.getBoundingClientRect();
          const elementTop = element.offsetTop;
          const currentScroll = window.scrollY;
          const targetScroll = elementTop - offset;
          
          // Only scroll if we're not already close to the target
          if (Math.abs(currentScroll - targetScroll) > 50) {
            if (rect.height > 0 || retryCount > 0) {
              window.scrollTo({
                top: Math.max(0, targetScroll),
                behavior: retryCount === 0 ? 'smooth' : 'auto',
              });
              hasHandledInitialHashRef.current = true;
            } else if (retryCount < 5) {
              // Retry if element not ready yet
              setTimeout(() => handleInitialHash(retryCount + 1), 100);
            }
          } else {
            hasHandledInitialHashRef.current = true;
          }
        } else if (retryCount < 5) {
          // Retry if element not found yet
          setTimeout(() => handleInitialHash(retryCount + 1), 100);
        }
      } else {
        hasHandledInitialHashRef.current = true;
      }
    };

    // Try immediately, then with delays to handle async rendering
    handleInitialHash();
    const timer1 = setTimeout(() => handleInitialHash(), 100);
    const timer2 = setTimeout(() => handleInitialHash(), 300);
    const timer3 = setTimeout(() => handleInitialHash(), 500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname, sectionIdsKey, offset]);

  useEffect(() => {
    const handleScroll = () => {
      // Don't update hash if we're programmatically scrolling
      if (isScrollingRef.current) {
        return;
      }

      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Debounce hash updates
      timeoutRef.current = setTimeout(() => {
        const scrollPosition = window.scrollY + offset + 100; // Add buffer for header

        // Find the section currently in view
        let currentSection = '';
        const ids = sectionIdsRef.current;
        for (let i = ids.length - 1; i >= 0; i--) {
          const sectionId = ids[i];
          const element = document.getElementById(sectionId);
          if (element) {
            const elementTop = element.offsetTop;
            if (scrollPosition >= elementTop) {
              currentSection = sectionId;
              break;
            }
          }
        }

        // Update hash if it's different and we found a section
        if (currentSection && window.location.hash !== `#${currentSection}`) {
          window.history.replaceState(
            null,
            '',
            `${pathname}#${currentSection}`
          );
        } else if (!currentSection && window.location.hash) {
          // Clear hash if we're at the top and there's a hash
          if (window.scrollY < 200) {
            window.history.replaceState(null, '', pathname);
          }
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, sectionIdsKey, offset]);

  /**
   * Scroll to a section and update the URL hash
   */
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update hash immediately
      window.history.replaceState(null, '', `${pathname}#${id}`);

      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  return { scrollToSection };
}

