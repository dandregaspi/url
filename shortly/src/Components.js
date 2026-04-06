// Components.js
// ─────────────────────────────────────────────────────────────────────────────
// All UI components live in this single file, grouped by section:
//
//   Navbar      — top navigation bar + mobile hamburger dropdown
//   Hero        — headline, sub-text, illustration
//   Shortener   — dark purple input box + "Shorten It!" button
//   LinkItem    — a single shortened link row
//   LinkList    — the full list of LinkItem rows
//   Stats       — "Advanced Statistics" + three feature cards
//   Boost       — "Boost your links today" CTA banner
//   Footer      — four-column footer + social icons
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';

// ── Image imports (all assets live in src/images/) ───────────────────────────
import logo                  from './images/logo.svg';
import illustrationWorking   from './images/illustration-working.svg';
import iconBrandRecognition  from './images/icon-brand-recognition.svg';
import iconDetailedRecords   from './images/icon-detailed-records.svg';
import iconFullyCustomizable from './images/icon-fully-customizable.svg';
import iconFacebook          from './images/icon-facebook.svg';
import iconTwitter           from './images/icon-twitter.svg';
import iconPinterest         from './images/icon-pinterest.svg';
import iconInstagram         from './images/icon-instagram.svg';

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
export function Navbar() {
  // Controls the mobile dropdown menu open/closed state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Brand logo */}
      <div className="navbar__logo">
        <img src={logo} alt="Shortly" height="33" />
      </div>

      {/* Desktop navigation links — hidden on mobile via CSS */}
      <nav className="navbar__links" aria-label="Primary navigation">
        <button className="navbar__link">Features</button>
        <button className="navbar__link">Pricing</button>
        <button className="navbar__link">Resources</button>
      </nav>

      {/* Desktop auth buttons — hidden on mobile via CSS */}
      <div className="navbar__auth">
        <button className="navbar__login">Login</button>
        <button className="btn btn--cyan navbar__signup">Sign Up</button>
      </div>

      {/* Hamburger icon — only shown on mobile */}
      <button
        className="navbar__hamburger"
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {/* Three horizontal bars */}
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* Mobile dropdown — toggled by hamburger */}
      {menuOpen && (
        <nav className="navbar__mobile" aria-label="Mobile navigation">
          <button className="navbar__mobile-link">Features</button>
          <button className="navbar__mobile-link">Pricing</button>
          <button className="navbar__mobile-link">Resources</button>
          <hr className="navbar__mobile-divider" />
          <button className="navbar__mobile-login">Login</button>
          <button className="btn btn--cyan navbar__mobile-signup">Sign Up</button>
        </nav>
      )}
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section className="hero">
      {/* Left: text content */}
      <div className="hero__content">
        <h1 className="hero__title">More than just shorter links</h1>
        <p className="hero__subtitle">
          Build your brand's recognition and get detailed insights on how your
          links are performing.
        </p>
        <button className="btn btn--cyan btn--lg">Get Started</button>
      </div>

      {/* Right: illustration — overflows right on desktop */}
      <div className="hero__image" aria-hidden="true">
        <img src={illustrationWorking} alt="" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHORTENER  (the dark purple form box)
// ─────────────────────────────────────────────────────────────────────────────
export function Shortener({ inputUrl, setInputUrl, error, setError, loading, onShorten }) {
  // Submit on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onShorten();
  };

  return (
    <div className="shortener-section">
      <div className="shortener-box">
        <div className="shortener-form">

          {/* Input + error message */}
          <div className="shortener-input-wrap">
            <input
              type="url"
              className={`shortener-input${error ? ' shortener-input--error' : ''}`}
              placeholder="Shorten a link here..."
              value={inputUrl}
              onChange={e => {
                setInputUrl(e.target.value);
                if (error) setError('');   // clear error as user types
              }}
              onKeyDown={handleKeyDown}
              aria-label="URL to shorten"
              aria-describedby={error ? 'url-error' : undefined}
            />
            {error && (
              <span id="url-error" className="shortener-error" role="alert">
                {error}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            className="btn btn--cyan shortener-btn"
            onClick={onShorten}
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner" aria-hidden="true" />Shortening...</>
            ) : (
              'Shorten It!'
            )}
          </button>

        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LINK ITEM  (a single row: original | tiny | Copy button)
// ─────────────────────────────────────────────────────────────────────────────
function LinkItem({ link, isCopied, onCopy }) {
  return (
    <li className="link-item">
      <span className="link-item__original" title={link.original}>
        {link.original}
      </span>

      <a
        className="link-item__short"
        href={link.short}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.short}
      </a>

      <button
        className={`link-item__copy${isCopied ? ' link-item__copy--copied' : ''}`}
        onClick={() => onCopy(link.short)}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LINK LIST  (the full list of shortened links)
// ─────────────────────────────────────────────────────────────────────────────
export function LinkList({ links, copiedUrl, onCopy }) {
  if (links.length === 0) return null;

  return (
    <div className="link-list-section">
      <ul className="link-list">
        {links.map(link => (
          <LinkItem
            key={link.id}
            link={link}
            isCopied={copiedUrl === link.short}
            onCopy={onCopy}
          />
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS  — "Advanced Statistics" + 3 cards
// ─────────────────────────────────────────────────────────────────────────────

// Card data array — keeps content out of JSX, easy to update
const STAT_CARDS = [
  {
    id:    1,
    icon:  iconBrandRecognition,
    alt:   'Brand recognition chart',
    title: 'Brand Recognition',
    text:  "Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content.",
  },
  {
    id:    2,
    icon:  iconDetailedRecords,
    alt:   'Detailed records speedometer',
    title: 'Detailed Records',
    text:  'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
  },
  {
    id:    3,
    icon:  iconFullyCustomizable,
    alt:   'Fully customizable paintbrush',
    title: 'Fully Customizable',
    text:  'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
  },
];

export function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <h2 className="stats__title">Advanced Statistics</h2>
        <p className="stats__subtitle">
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>

        {/* Three-column card grid with connecting horizontal bar */}
        <div className="stats__cards">
          {STAT_CARDS.map((card, i) => (
            <article
              className="stat-card"
              key={card.id}
              style={{ '--card-offset': `${i * 2.5}rem` }}
            >
              <div className="stat-card__icon">
                <img src={card.icon} alt={card.alt} width="40" height="40" />
              </div>
              <h3 className="stat-card__title">{card.title}</h3>
              <p className="stat-card__text">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOST  — CTA banner
// ─────────────────────────────────────────────────────────────────────────────
export function Boost() {
  return (
    <section className="boost">
      <h2 className="boost__title">Boost your links today</h2>
      <button className="btn btn--cyan btn--lg">Get Started</button>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_COLS = [
  { title: 'Features',  links: ['Link Shortening', 'Branded Links', 'Analytics'] },
  { title: 'Resources', links: ['Blog', 'Developers', 'Support'] },
  { title: 'Company',   links: ['About', 'Our Team', 'Careers', 'Contact'] },
];

const SOCIAL_ICONS = [
  { src: iconFacebook,  alt: 'Facebook'  },
  { src: iconTwitter,   alt: 'Twitter'   },
  { src: iconPinterest, alt: 'Pinterest' },
  { src: iconInstagram, alt: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">

        {/* Logo — CSS brightness filter makes it white on dark background */}
        <div className="footer__brand">
          <img
            src={logo}
            alt="Shortly"
            height="33"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map(col => (
          <div className="footer__col" key={col.title}>
            <p className="footer__col-title">{col.title}</p>
            <ul>
              {col.links.map(link => (
                <li key={link}><a href="#!">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social icons */}
        <div className="footer__social">
          {SOCIAL_ICONS.map(s => (
            <a key={s.alt} href="#!" aria-label={s.alt}>
              <img src={s.src} alt={s.alt} width="24" height="24" />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
