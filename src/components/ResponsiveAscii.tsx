import { useState, useEffect } from 'react';

interface ResponsiveAsciiProps {
  small: string;
  medium: string;
  large: string;
  className?: string;
}

type Size = 'sm' | 'md' | 'lg';

/**
 * ResponsiveAscii Component
 * Displays different ASCII art based on screen size
 * ASCII art doesn't scale well, so we provide discrete versions
 */
export default function ResponsiveAscii({
  small,
  medium,
  large,
  className = '',
}: ResponsiveAsciiProps) {
  const [size, setSize] = useState<Size>('lg');

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setSize('sm');
      } else if (window.innerWidth < 1024) {
        setSize('md');
      } else {
        setSize('lg');
      }
    };

    // Set initial size
    updateSize();

    // Listen for resize
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getAscii = () => {
    switch (size) {
      case 'sm':
        return small;
      case 'md':
        return medium;
      case 'lg':
        return large;
      default:
        return large;
    }
  };

  return (
    <pre className={`ascii-logo ${className}`}>
      {getAscii()}
    </pre>
  );
}
