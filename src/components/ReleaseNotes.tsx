import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { getVersion, formatDate, getDownloadLinks, type Release } from '../utils/downloadLinks';

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
      <div className="flex items-center justify-center py-20 text-gray-500 gap-3">
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Loading release history…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Could not load releases.</p>
        <a
          href="https://github.com/prouticus/colorclip-pro/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 underline hover:text-primary-700"
        >
          View on GitHub Releases →
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {releases.map((release, idx) => {
        const version = getVersion(release.tag_name);
        const date = formatDate(release.published_at);
        const bodyHtml = marked(release.body || '*No release notes provided.*') as string;
        const links = getDownloadLinks(release.assets);
        const isLatest = idx === 0;

        return (
          <article
            key={release.tag_name}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50 flex-wrap">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900 font-display">
                  {release.name || `v${version}`}
                </h2>
                {isLatest && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-100 text-primary-700">
                    Latest
                  </span>
                )}
              </div>
              <time className="text-sm text-gray-500">{date}</time>
            </div>

            {/* Body */}
            <div
              className="px-6 py-5 prose prose-sm prose-gray max-w-none
                prose-headings:font-display prose-headings:text-gray-800
                prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-li:my-0.5"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            {/* Footer: downloads + GitHub link */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-3 items-center">
              {links.macSilicon && (
                <a href={links.macSilicon} download className="btn-primary text-sm py-1.5 px-4">
                  macOS (Apple Silicon)
                </a>
              )}
              {links.macIntel && (
                <a href={links.macIntel} download className="btn-primary text-sm py-1.5 px-4">
                  macOS (Intel)
                </a>
              )}
              {links.windows && (
                <a href={links.windows} download className="btn-primary text-sm py-1.5 px-4">
                  Windows (x64)
                </a>
              )}
              <a
                href={release.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
