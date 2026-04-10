// =============================================================================
// components/Footer.explained.js
//
// WHAT THIS COMPONENT DOES
// ------------------------
// Renders the site-wide footer with four sections laid out in a row:
//   1. The Shortly logo (white-tinted via CSS filter)
//   2. Three link columns: Features | Resources | Company
//   3. Social media icon links on the far right
//
// HOW THE LAYOUT WORKS
// --------------------
// The outer <footer> uses the CSS class "footer" which should be styled with
// a dark background (e.g. #232127). Inside it, "footer__inner" is a CSS grid
// or flexbox row that spaces the logo, columns, and social icons evenly.
//
// HOW TO ADD / REMOVE / EDIT LINKS
// ---------------------------------
// All link data lives in two plain JS arrays at the top of this file:
//   - COLUMNS  → the three text-link columns
//   - SOCIAL   → the four social icon links
//
// You never need to touch the JSX to update links. Just edit the arrays.
//
// EXAMPLE — adding a new link to the "Features" column:
//   Before:  links: ['Link Shortening', 'Branded Links', 'Analytics'],
//   After:   links: ['Link Shortening', 'Branded Links', 'Analytics', 'QR Codes'],
//   And add the route:  { label: 'QR Codes', href: '/features/qr-codes' }
//
// EXAMPLE — adding a whole new column:
//   {
//     title: 'Legal',
//     links: [
//       { label: 'Privacy Policy', href: '/legal/privacy' },
//       { label: 'Terms of Service', href: '/legal/terms' },
//     ],
//   },
//
// EXAMPLE — updating a social link URL:
//   Change  href: 'https://twitter.com/shortly'
//   To      href: 'https://x.com/shortly'
// =============================================================================

import React from 'react';

// Logo — imported from your local images folder.
// The CSS filter `brightness(0) invert(1)` turns any dark SVG fully white,
// so you don't need a separate white version of the logo file.
import logoWhite    from '../images/logo.svg';

// Social icons — each is a small SVG file from your images folder.
// To swap an icon, replace the import path and update the matching SOCIAL entry.
import iconFacebook  from '../images/icon-facebook.svg';
import iconTwitter   from '../images/icon-twitter.svg';
import iconPinterest from '../images/icon-pinterest.svg';
import iconInstagram from '../images/icon-instagram.svg';

// =============================================================================
// COLUMNS DATA
// =============================================================================
// Each object in this array becomes one footer column.
//
// Shape of each column:
//   {
//     title: string          — the bold heading shown above the links
//     links: Array<{
//       label: string        — the visible link text
//       href:  string        — the URL the link points to
//                              Use a full URL for external links:  'https://...'
//                              Use a path for internal routes:     '/features/analytics'
//                              Use '#section-id' for same-page:   '#blog'
//     }>
//   }
//
// HOW REACT USES THIS:
// The component loops over COLUMNS with .map() to build the JSX automatically.
// Each column's links array is also looped over with .map() to build the <li>
// elements. This means adding a link is just adding one object to the array —
// React re-renders and the new link appears in the footer with no JSX changes.
// =============================================================================
const COLUMNS = [
  {
    title: 'Features',
    links: [
      // ↓ Update href values to match your actual route structure
      { label: 'Link Shortening', href: '/features/link-shortening' },
      { label: 'Branded Links',   href: '/features/branded-links'   },
      { label: 'Analytics',       href: '/features/analytics'       },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog',       href: '/resources/blog'       },
      { label: 'Developers', href: '/resources/developers' },
      { label: 'Support',    href: '/resources/support'    },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',    href: '/company/about'    },
      { label: 'Our Team', href: '/company/our-team' },
      { label: 'Careers',  href: '/company/careers'  },
      { label: 'Contact',  href: '/company/contact'  },
    ],
  },
];

// =============================================================================
// SOCIAL DATA
// =============================================================================
// Each object drives one social icon link in the footer's right section.
//
// Shape:
//   {
//     icon: imported SVG — the icon image file
//     alt:  string       — screen-reader label AND the aria-label on the <a>
//                          (important for accessibility — keep it descriptive)
//     href: string       — the full URL to your social profile
//   }
//
// To add a new social platform:
//   1. Import the icon:  import iconLinkedIn from '../images/icon-linkedin.svg';
//   2. Add an entry:     { icon: iconLinkedIn, alt: 'LinkedIn', href: 'https://linkedin.com/company/shortly' }
// =============================================================================
const SOCIAL = [
  { icon: iconFacebook,  alt: 'Facebook',  href: 'https://facebook.com/shortly'  },
  { icon: iconTwitter,   alt: 'Twitter',   href: 'https://twitter.com/shortly'   },
  { icon: iconPinterest, alt: 'Pinterest', href: 'https://pinterest.com/shortly' },
  { icon: iconInstagram, alt: 'Instagram', href: 'https://instagram.com/shortly' },
];

// =============================================================================
// COMPONENT
// =============================================================================
function Footer() {
  return (
    // "footer" CSS class — set background-color, padding, etc. in shortly.css
    <footer className="footer">

      {/*
        "footer__inner" — the grid/flex row that lines up:
        [logo]  [Features]  [Resources]  [Company]  [social icons]

        In shortly.css this is typically:
          .footer__inner {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 2rem;
          }
      */}
      <div className="footer__inner">

        {/* ── LOGO ──────────────────────────────────────────────────────── */}
        {/*
          The logo links back to the home page.
          The inline style turns the dark SVG white so it's visible on the
          dark footer background. If you switch to a light footer, remove
          the filter or swap in a dark version of the logo.
        */}
        <div className="footer__logo">
          <a href="/" aria-label="Shortly home">
            <img
              src={logoWhite}
              alt="Shortly"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>
        </div>

        {/* ── LINK COLUMNS ──────────────────────────────────────────────── */}
        {/*
          COLUMNS.map() loops over the array above and renders one <div> per
          column. The `key` prop must be unique — we use col.title since
          column headings are always distinct.

          Inside each column, col.links.map() loops over that column's links
          array and renders one <li> per link. The `key` here uses link.href
          because that's guaranteed to be unique within a column.
        */}
        {COLUMNS.map(col => (
          <div className="footer__col" key={col.title}>

            {/* Column heading — styled bold/white in CSS */}
            <p className="footer__col-title">{col.title}</p>

            <ul>
              {col.links.map(link => (
                <li key={link.href}>
                  {/*
                    Each link uses link.href and link.label from the COLUMNS
                    array above. To change a link, update the array — you
                    never need to edit this JSX.

                    If this is a React Router app, swap <a href> for
                    <Link to={link.href}> after importing Link:
                      import { Link } from 'react-router-dom';
                  */}
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* ── SOCIAL ICONS ──────────────────────────────────────────────── */}
        {/*
          SOCIAL.map() loops over the social array and renders one icon link
          per entry. `aria-label` on the <a> is important — it tells screen
          readers what platform the icon links to, since the image alone
          isn't descriptive enough. The `alt` on <img> is kept as a fallback
          in case the SVG fails to load.
        */}
        <div className="footer__social">
          {SOCIAL.map(s => (
            <a
              href={s.href}
              aria-label={s.alt}
              key={s.alt}
              target="_blank"           // opens in a new tab — good for external links
              rel="noopener noreferrer" // security: prevents the new tab from accessing window.opener
            >
              <img src={s.icon} alt={s.alt} width="24" height="24" />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}

export default Footer;
