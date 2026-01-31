import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Email Waitlist API Endpoint
 *
 * Handles email signups for ColorClip Mobile waitlist
 * Forwards to main API (api.mantisarts.com) for storage
 *
 * Usage: POST /api/waitlist
 * Body: { email: string, source: string }
 */

// Simple email validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Rate limiting: track IPs and timestamps (in-memory, resets on redeploy)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in ms
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];

  // Filter out requests outside the window
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  // Add current request
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);

  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get client IP for rate limiting
  const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  const ip = Array.isArray(clientIP) ? clientIP[0] : clientIP;

  // Check rate limit
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Please wait before submitting again (max 5 per hour)',
    });
  }

  const { email, source = 'mobile-waitlist' } = req.body;

  // Validate email
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Forward to main API
    const apiUrl = process.env.API_BASE_URL || 'https://api.mantisarts.com';
    const response = await fetch(`${apiUrl}/api/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Internal API key for authentication
        'Authorization': `Bearer ${process.env.API_INTERNAL_KEY}`,
      },
      body: JSON.stringify({ email, source }),
    });

    if (!response.ok) {
      // Handle duplicate email (409) as success
      if (response.status === 409) {
        return res.status(200).json({
          success: true,
          message: 'You are already on the waitlist!',
        });
      }

      const error = await response.json();
      throw new Error(error.message || 'Failed to add to waitlist');
    }

    return res.status(201).json({
      success: true,
      message: "You're on the list! We'll notify you when ColorClip Mobile launches.",
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({
      error: 'Failed to join waitlist',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
