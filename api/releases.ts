import type { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_REPO = 'prouticus/colorclip-pro';
const CACHE_TTL = 300; // 5 minutes

/**
 * GitHub Releases API Proxy
 *
 * Fetches releases from GitHub API with:
 * - Server-side authentication (higher rate limits)
 * - Response caching (5 min TTL)
 * - Error handling
 *
 * Usage: GET /api/releases
 * Response: Array of GitHub release objects
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    // Add auth token if available (increases rate limit to 5000/hr)
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=10`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const releases = await response.json();

    // Set cache headers
    res.setHeader(
      'Cache-Control',
      `s-maxage=${CACHE_TTL}, stale-while-revalidate`
    );

    return res.status(200).json(releases);
  } catch (error) {
    console.error('Failed to fetch releases:', error);
    return res.status(500).json({
      error: 'Failed to fetch releases',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
