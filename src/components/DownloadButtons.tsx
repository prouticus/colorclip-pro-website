import { useEffect, useState } from 'react';
import { getDownloadLinks, getVersion, type Release } from '../utils/downloadLinks';

interface DownloadButtonsProps {
  variant?: 'default' | 'light';
}

/**
 * DownloadButtons Component
 * Fetches latest release from GitHub API and displays download buttons
 * Updates automatically when new versions are published
 */
export default function DownloadButtons({ variant = 'default' }: DownloadButtonsProps) {
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

  const buttonClass = variant === 'light'
    ? 'btn-secondary'
    : 'btn-primary';

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Loading downloads...</span>
      </div>
    );
  }

  if (error || !release) {
    return (
      <div className="text-center">
        <p className={variant === 'light' ? 'text-white' : 'text-gray-600'}>
          Downloads temporarily unavailable.{' '}
          <a
            href="https://github.com/prouticus/colorclip-pro/releases"
            target="_blank"
            rel="noopener noreferrer"
            className={variant === 'light' ? 'text-white underline hover:text-blue-100' : 'text-primary-600 underline hover:text-primary-700'}
          >
            Visit GitHub Releases
          </a>
        </p>
      </div>
    );
  }

  const links = getDownloadLinks(release.assets);
  const version = getVersion(release.tag_name);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* macOS Downloads */}
        {(links.macSilicon || links.macIntel) && (
          <div className="flex flex-col gap-2">
            {links.macSilicon && (
              <a
                href={links.macSilicon}
                className={buttonClass}
                download
                aria-label="Download for macOS Apple Silicon"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                macOS (Apple Silicon)
              </a>
            )}
            {links.macIntel && (
              <a
                href={links.macIntel}
                className={buttonClass}
                download
                aria-label="Download for macOS Intel"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                macOS (Intel)
              </a>
            )}
          </div>
        )}

        {/* Windows Download */}
        {links.windows && (
          <a
            href={links.windows}
            className={buttonClass}
            download
            aria-label="Download for Windows"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0,12.4l9.6,1.3V24l-9.6-1.3V12.4z M10.7,12.6l12.8,1.7v10.3l-12.8-1.7V12.6z M0,11.1l9.6-1.3V0.4L0,1.7V11.1z M10.7,9.8l12.8-1.7V-2.2l-12.8,1.7V9.8z"/>
            </svg>
            Windows (x64)
          </a>
        )}
      </div>

      {/* Version info - only show on default variant */}
      {variant === 'default' && (
        <p className="text-sm text-gray-500">
          v{version}
        </p>
      )}
    </div>
  );
}
