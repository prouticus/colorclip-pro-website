import { useEffect, useState } from 'react';
import { formatFileSize, type Release } from '../utils/downloadLinks';

interface Sizes {
  macSilicon?: string;
  macIntel?: string;
  windows?: string;
}

function findSize(release: Release, matcher: (name: string) => boolean): string | undefined {
  const asset = release.assets.find((a) => matcher(a.name));
  return asset ? formatFileSize(asset.size) : undefined;
}

/**
 * Renders a single inline size string fetched from the latest release.
 * Falls back to `fallback` text while loading or on error.
 */
export default function InstallSize({
  platform,
  fallback = '…',
}: {
  platform: 'macSilicon' | 'macIntel' | 'windows';
  fallback?: string;
}) {
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/releases')
      .then((r) => r.json())
      .then((data: Release[]) => {
        if (!data?.length) return;
        const release = data[0];
        const sizes: Sizes = {
          macSilicon: findSize(release, (n) => n.includes('-arm64.zip')),
          macIntel: findSize(release, (n) => n.includes('-x64.zip') && !n.includes('win')),
          windows: findSize(release, (n) => n.includes('-win.zip')),
        };
        setSize(sizes[platform] ?? null);
      })
      .catch(() => {/* silently fall back */});
  }, [platform]);

  return <span>{size ?? fallback}</span>;
}
