import { useState, useEffect } from 'react';

interface ScrollPosition {
  scrollX: number;
  scrollY: number;
}

export function useWindowScroll(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollX: typeof window !== 'undefined' ? window.scrollX : 0,
    scrollY: typeof window !== 'undefined' ? window.scrollY : 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Call handler right away so state gets updated with initial window position
    handleScroll();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return scrollPosition;
}
