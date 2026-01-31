import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { getVersion, formatDate, type Release } from '../utils/downloadLinks';

/**
 * ReleaseNotes Component
 * Displays release history from GitHub with markdown rendering
 * Shows version, date, changelog, and download links
 */
export default function ReleaseNotes() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/releases')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch releases');
        return res.json();
      })
      .then((data: Release[]) => {
        setReleases(data);
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
      <div className="release-notes-loading" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
        <pre className="ascii-art">
{`┌─────────────────┐
│  LOADING...     │
└─────────────────┘`}
        </pre>
      </div>
    );
  }

  if (error) {
    return (
      <div className="release-notes-error" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
        <pre className="ascii-art" style={{ color: 'var(--text-secondary)' }}>
{`┌─────────────────────────────┐
│  Failed to load releases    │
│                             │
│  Please visit:              │
│  github.com/prouticus/      │
│  colorclip-pro/releases     │
└─────────────────────────────┘`}
        </pre>
      </div>
    );
  }

  return (
    <div className="release-notes">
      {releases.map((release) => {
        const version = getVersion(release.tag_name);
        const date = formatDate(release.published_at);
        const bodyHtml = marked(release.body || 'No release notes available.');

        return (
          <article key={release.tag_name} className="release" style={{ marginBottom: 'var(--space-2xl)' }}>
            {/* Header */}
            <header style={{ marginBottom: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <h2 style={{ color: 'var(--phosphor-green)', fontSize: 'var(--font-size-xl)', margin: 0 }}>
                  {release.name || `Version ${version}`}
                </h2>
                <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
                  {date}
                </span>
              </div>
              <pre className="ascii-art" style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)', color: 'var(--phosphor-dim)' }}>
{`────────────────────────────────────────────────────────────────`}
              </pre>
            </header>

            {/* Body (Markdown) */}
            <div
              className="release-body"
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--font-size-base)',
                lineHeight: '1.6',
                marginBottom: 'var(--space-md)',
              }}
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            {/* Footer */}
            <footer style={{ paddingTop: 'var(--space-md)', borderTop: `1px solid var(--phosphor-dim)` }}>
              <a
                href={release.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-button"
                style={{ display: 'inline-block', textDecoration: 'none', fontSize: 'var(--font-size-sm)' }}
              >
                View on GitHub →
              </a>
            </footer>
          </article>
        );
      })}
    </div>
  );
}
