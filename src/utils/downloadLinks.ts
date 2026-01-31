/**
 * Download Links Utilities
 * Parse GitHub release assets and extract platform-specific download URLs
 */

export interface Asset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

export interface Release {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  assets: Asset[];
}

export interface DownloadLinks {
  macIntel?: string;
  macSilicon?: string;
  windows?: string;
}

/**
 * Extract download links from release assets
 * Based on electron-builder.json naming patterns:
 * - macOS x64: ColorClip Pro-{version}-x64.zip
 * - macOS arm64: ColorClip Pro-{version}-arm64.zip
 * - Windows: ColorClip Pro-{version}-win.zip
 */
export function getDownloadLinks(assets: Asset[]): DownloadLinks {
  return {
    macIntel: assets.find(
      (a) => a.name.includes('-x64.zip') && !a.name.includes('win')
    )?.browser_download_url,
    macSilicon: assets.find(
      (a) => a.name.includes('-arm64.zip')
    )?.browser_download_url,
    windows: assets.find(
      (a) => a.name.includes('-win.zip')
    )?.browser_download_url,
  };
}

/**
 * Format file size from bytes to human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Extract version number from tag name (removes 'v' prefix)
 */
export function getVersion(tagName: string): string {
  return tagName.replace(/^v/, '');
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
