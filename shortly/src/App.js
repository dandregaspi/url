// App.js
// ─────────────────────────────────────────────────────────────────────────────
// Root component — owns all application state and coordinates between
// the API layer (api.js) and the UI layer (Components.js).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import './App.css';

import { Navbar, Hero, Shortener, LinkList, Stats, Boost, Footer } from './Components';
import { shortenUrl } from './api';

const STORAGE_KEY = 'shortly_links';

// ── localStorage helpers ──────────────────────────────────────────────────────
function loadLinks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLinks(links) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch {}
}

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [inputUrl, setInputUrl]   = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [links, setLinks]         = useState(loadLinks);
  const [copiedUrl, setCopiedUrl] = useState('');

  // Persist links across page refreshes
  useEffect(() => { saveLinks(links); }, [links]);

  // ── Shorten ─────────────────────────────────────────────────────────────────
  const handleShorten = async () => {
    if (!inputUrl.trim()) {
      setError('Please add a link');
      return;
    }
    setError('');
    setLoading(true);

    const result = await shortenUrl(inputUrl.trim());

    if (result.success) {
      setLinks(prev => [
        { id: Date.now(), original: inputUrl.trim(), short: result.shortUrl },
        ...prev,
      ]);
      setInputUrl('');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  // ── Copy to clipboard ────────────────────────────────────────────────────────
  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopiedUrl(shortUrl);
      setTimeout(() => setCopiedUrl(''), 2000);
    });
  };

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Shortener
          inputUrl={inputUrl}
          setInputUrl={setInputUrl}
          error={error}
          setError={setError}
          loading={loading}
          onShorten={handleShorten}
        />
        <LinkList links={links} copiedUrl={copiedUrl} onCopy={handleCopy} />
        <Stats />
        <Boost />
      </main>
      <Footer />
    </div>
  );
}
