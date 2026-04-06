// api.js
// ─────────────────────────────────────────────────────────────────────────────
// All TinyURL API communication lives here.
//
// TinyURL REST API (v1)
//   Base URL : https://api.tinyurl.com
//   Auth     : Bearer <API_TOKEN>  (get yours at tinyurl.com/app/dev → API keys)
//   Docs     : https://tinyurl.com/app/dev
//
// HOW TO GET YOUR TOKEN:
//   1. Sign up / log in at tinyurl.com
//   2. Go to your profile → API
//   3. Create a new API key (select all permissions)
//   4. Paste it in TINYURL_TOKEN below (or use an .env file)
// ─────────────────────────────────────────────────────────────────────────────

import axios from 'axios';

// ── Put your TinyURL API token here ──────────────────────────────────────────
// For production use process.env.REACT_APP_TINYURL_TOKEN instead.
const TINYURL_TOKEN = process.env.REACT_APP_TINYURL_TOKEN || 'YOUR_API_TOKEN_HERE';

// ── Axios instance — pre-configured for TinyURL ───────────────────────────
const tinyurlClient = axios.create({
  baseURL: 'https://api.tinyurl.com',
  headers: {
    'Content-Type': 'application/json',
    Accept:         'application/json',
    Authorization:  `Bearer ${TINYURL_TOKEN}`,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /create
// Shortens a URL and returns the tiny URL string.
//
// Request body: { url: string, domain: 'tinyurl.com' }
// Response:     { data: { tiny_url: string, url: string, ... } }
//
// Returns: { success: boolean, shortUrl?: string, error?: string }
// ─────────────────────────────────────────────────────────────────────────────
export async function shortenUrl(url) {
  try {
    const response = await tinyurlClient.post('/create', {
      url,
      domain: 'tinyurl.com', // free tier domain
    });

    const tinyUrl = response.data?.data?.tiny_url;

    if (tinyUrl) {
      return { success: true, shortUrl: tinyUrl };
    }

    return { success: false, error: 'No URL returned. Please try again.' };

  } catch (err) {
    // Axios wraps HTTP errors in err.response
    const status  = err.response?.status;
    const message = err.response?.data?.errors?.[0] || err.message;

    if (status === 401) {
      return { success: false, error: 'Invalid API token. Check your TinyURL API key.' };
    }
    if (status === 422) {
      return { success: false, error: 'That doesn\'t look like a valid URL. Please check and try again.' };
    }
    if (status === 429) {
      return { success: false, error: 'Too many requests. Please wait a moment and try again.' };
    }

    return { success: false, error: message || 'Something went wrong. Please try again.' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /alias/{domain}/{alias}
// Retrieves info about an existing TinyURL (optional — for future use).
//
// Returns: { success: boolean, data?: object, error?: string }
// ─────────────────────────────────────────────────────────────────────────────
export async function getUrlInfo(alias, domain = 'tinyurl.com') {
  try {
    const response = await tinyurlClient.get(`/alias/${domain}/${alias}`);
    return { success: true, data: response.data?.data };
  } catch (err) {
    const message = err.response?.data?.errors?.[0] || err.message;
    return { success: false, error: message || 'Could not retrieve URL info.' };
  }
}
