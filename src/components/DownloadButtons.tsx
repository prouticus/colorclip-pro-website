import { useEffect, useState } from 'react';
import { getDownloadLinks, getVersion, type Release } from '../utils/downloadLinks';

/**
 * DownloadButtons Component
 * Fetches latest release from GitHub API and displays download buttons
 * Updates automatically when new versions are published
 */
export default function DownloadButtons() {
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/releases')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch releases');
        return res.json();
      })
      .then((data: Release[]) => {
        if (data.length > 0) {
          setRelease(data[0]); // Latest release
        } else {
          throw new Error('No releases found');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching releases:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="download-buttons" style={{ textAlign: 'center' }}>
        <pre className="ascii-art">
{`┌─────────────────┐
│   LOADING...    │
└─────────────────┘`}
        </pre>
      </div>
    );
  }

  if (error || !release) {
    return (
      <div className="download-buttons" style={{ textAlign: 'center' }}>
        <pre className="ascii-art" style={{ color: 'var(--text-tertiary)' }}>
{`┌─────────────────────────────┐
│  Downloads temporarily      │
│  unavailable. Please visit: │
│  github.com/prouticus/      │
│  colorclip-pro/releases     │
└─────────────────────────────┘`}
        </pre>
      </div>
    );
  }

  const links = getDownloadLinks(release.assets);
  const version = getVersion(release.tag_name);

  return (
    <div className="download-buttons">
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-lg)',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-md)',
        }}
      >
        {/* macOS Downloads */}
        <div className="platform-group">
          <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--space-sm)', color: 'var(--text-secondary)' }}>
            macOS
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {links.macSilicon && (
              <a
                href={links.macSilicon}
                className="terminal-button"
                style={{ textDecoration: 'none' }}
              >
                ▼ Apple Silicon (M1/M2/M3)
              </a>
            )}
            {links.macIntel && (
              <a
                href={links.macIntel}
                className="terminal-button"
                style={{ textDecoration: 'none' }}
              >
                ▼ Intel (x64)
              </a>
            )}
          </div>
        </div>

        {/* Windows Download */}
        {links.windows && (
          <div className="platform-group">
            <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--space-sm)', color: 'var(--text-secondary)' }}>
              Windows
            </h3>
            <a
              href={links.windows}
              className="terminal-button"
              style={{ textDecoration: 'none' }}
            >
              ▼ Windows 10+ (x64)
            </a>
          </div>
        )}
      </div>

      {/* Version Badge */}
      <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
        Version {version} •{' '}
        <a
          href={release.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--phosphor-dim)' }}
        >
          Release Notes
        </a>
      </p>
    </div>
  );
}
