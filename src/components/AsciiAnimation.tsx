import { useState, useEffect } from 'react';

interface AsciiAnimationProps {
  frames: string[];
  fps?: number;
  className?: string;
  loop?: boolean;
}

/**
 * AsciiAnimation Component
 * Cycles through ASCII art frames to create animations
 * Like a flipbook for terminal art
 */
export default function AsciiAnimation({
  frames,
  fps = 4,
  className = '',
  loop = true,
}: AsciiAnimationProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((i) => {
        if (loop) {
          return (i + 1) % frames.length;
        } else {
          return i < frames.length - 1 ? i + 1 : i;
        }
      });
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [frames.length, fps, loop]);

  return (
    <pre className={`ascii-animation ${className}`}>
      {frames[frameIndex]}
    </pre>
  );
}
