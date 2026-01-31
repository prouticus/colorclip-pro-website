import { useState } from 'react';
import type { FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface EmailSignupProps {
  source?: string;
  className?: string;
}

/**
 * EmailSignup Component
 * Terminal-style email signup form for mobile app waitlist
 * Includes validation, loading states, and error handling
 */
export default function EmailSignup({ source = 'mobile-waitlist', className = '' }: EmailSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || "You're on the list! We'll notify you when ColorClip Mobile launches.");
        setEmail('');
      } else {
        throw new Error(data.error || 'Signup failed');
      }
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`email-signup success ${className}`}>
        <pre className="ascii-art" style={{ color: 'var(--phosphor-green)', textAlign: 'center' }}>
{`┌─────────────────────────────────┐
│   ✓ SUCCESS                     │
│                                 │
│   ${message.slice(0, 29).padEnd(29)} │
│   ${message.slice(29, 58).padEnd(29)} │
│                                 │
│   Check your inbox for          │
│   confirmation!                 │
└─────────────────────────────────┘`}
        </pre>
      </div>
    );
  }

  return (
    <div className={`email-signup ${className}`}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <span style={{ position: 'absolute', left: 'var(--space-md)', top: '50%', transform: 'translateY(-50%)', color: 'var(--phosphor-green)' }}>
              &gt;
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="terminal-input"
              style={{ paddingLeft: 'calc(var(--space-md) * 2)' }}
              disabled={status === 'loading'}
              required
            />
          </div>
          <button
            type="submit"
            className="terminal-button"
            disabled={status === 'loading'}
            style={{ flex: '0 0 auto' }}
          >
            {status === 'loading' ? 'JOINING...' : 'NOTIFY ME'}
          </button>
        </div>

        {status === 'error' && (
          <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-sm)', textAlign: 'center', fontSize: 'var(--font-size-sm)' }}>
            ✗ {message}
          </p>
        )}
      </form>
    </div>
  );
}
