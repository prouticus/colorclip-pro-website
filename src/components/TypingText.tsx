import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  cursor?: string;
  onComplete?: () => void;
  className?: string;
}

/**
 * TypingText Component
 * Animates text as if being typed on a terminal
 * Includes blinking cursor that disappears when typing is complete
 */
export default function TypingText({
  text,
  speed = 50,
  cursor = '█',
  onComplete,
  className = '',
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Typing animation
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <span className={`typing-text ${className}`}>
      {displayed}
      {!isComplete && (
        <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>
          {cursor}
        </span>
      )}
    </span>
  );
}
