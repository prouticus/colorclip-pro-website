import { ReactNode } from 'react';

interface CRTScreenProps {
  children: ReactNode;
  enableFlicker?: boolean;
  className?: string;
}

/**
 * CRTScreen Component
 * Wraps content in a CRT monitor aesthetic
 * Includes scanlines, screen curvature, and optional flicker effect
 */
export default function CRTScreen({
  children,
  enableFlicker = false,
  className = '',
}: CRTScreenProps) {
  return (
    <div
      className={`crt-screen crt-curve ${enableFlicker ? 'crt-flicker' : ''} ${className}`}
      style={{
        minHeight: '100vh',
        padding: 'var(--space-lg)',
      }}
    >
      {children}
    </div>
  );
}
