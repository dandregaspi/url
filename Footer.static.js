// components/Footer.static.js
//
// Static footer — every link is written out individually.
// No loops, no data arrays. Easy to read and edit at a glance.
// Just find the link you want to change and update the href directly.

import React from 'react';
import logoWhite    from '../images/logo.svg';
import iconFacebook  from '../images/icon-facebook.svg';
import iconTwitter   from '../images/icon-twitter.svg';
import iconPinterest from '../images/icon-pinterest.svg';
import iconInstagram from '../images/icon-instagram.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Logo */}
        <div className="footer__logo">
          <a href="/" aria-label="Shortly home">
            <img
              src={logoWhite}
              alt="Shortly"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>
        </div>

        {/* ── Features column ───────────────────────────────────────────── */}
        <div className="footer__col">
          <p className="footer__col-title">Features</p>
          <ul>
            <li>
              <a href="/features/link-shortening" aria-label="Link Shortening" key="link-shortening">
                Link Shortening
              </a>
            </li>
            <li>
              <a href="/features/branded-links" aria-label="Branded Links" key="branded-links">
                Branded Links
              </a>
            </li>
            <li>
              <a href="/features/analytics" aria-label="Analytics" key="analytics">
                Analytics
              </a>
            </li>
          </ul>
        </div>

        {/* ── Resources column ──────────────────────────────────────────── */}
        <div className="footer__col">
          <p className="footer__col-title">Resources</p>
          <ul>
            <li>
              <a href="#blog" aria-label="Blog" key="blog">
                Blog
              </a>
            </li>
            <li>
              <a href="#developers" aria-label="Developers" key="developers">
                Developers
              </a>
            </li>
            <li>
              <a href="#support" aria-label="Support" key="support">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* ── Company column ────────────────────────────────────────────── */}
        <div className="footer__col">
          <p className="footer__col-title">Company</p>
          <ul>
            <li>
              <a href="#about" aria-label="About" key="about">
                About
              </a>
            </li>
            <li>
              <a href="#our-team" aria-label="Our Team" key="our-team">
                Our Team
              </a>
            </li>
            <li>
              <a href="#careers" aria-label="Careers" key="careers">
                Careers
              </a>
            </li>
            <li>
              <a href="#contact" aria-label="Contact" key="contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* ── Social icons ──────────────────────────────────────────────── */}
        <div className="footer__social">
          <a href="https://facebook.com/shortly" aria-label="Facebook" key="facebook" target="_blank" rel="noopener noreferrer">
            <img src={iconFacebook} alt="Facebook" width="24" height="24" />
          </a>
          <a href="https://twitter.com/shortly" aria-label="Twitter" key="twitter" target="_blank" rel="noopener noreferrer">
            <img src={iconTwitter} alt="Twitter" width="24" height="24" />
          </a>
          <a href="https://pinterest.com/shortly" aria-label="Pinterest" key="pinterest" target="_blank" rel="noopener noreferrer">
            <img src={iconPinterest} alt="Pinterest" width="24" height="24" />
          </a>
          <a href="https://instagram.com/shortly" aria-label="Instagram" key="instagram" target="_blank" rel="noopener noreferrer">
            <img src={iconInstagram} alt="Instagram" width="24" height="24" />
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
