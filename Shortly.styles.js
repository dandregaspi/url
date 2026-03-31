// Import styled-components library for CSS-in-JS styling
import styled, { createGlobalStyle, css } from "styled-components";

// ─────────────────────────────────────────────
// DESIGN TOKENS — central place for colors,
// fonts, and breakpoints used throughout the app
// ─────────────────────────────────────────────
export const tokens = {
  cyan:       "#2ABAB4",   // primary brand accent
  cyanHover:  "#9AE3E0",   // lighter cyan for hover states
  darkPurple: "#3A3054",   // dark purple used in header/CTA
  deepDark:   "#232127",   // footer background
  bodyText:   "#35323E",   // main text color
  grayText:   "#9E9AA8",   // muted text / placeholders
  lightBg:    "#F0F1F6",   // off-white page background
  errorRed:   "#F46262",   // validation error color
  white:      "#FFFFFF",
};

// ─────────────────────────────────────────────
// BREAKPOINTS — used with the `media` helper
// below to write responsive styles cleanly
// ─────────────────────────────────────────────
export const bp = {
  mobile: "768px",  // anything ≤ 768 px is "mobile"
};

// Helper: generates a CSS media query for max-width
// Usage: ${media.mobile`color: red;`}
export const media = {
  mobile: (...args) => css`
    @media (max-width: ${bp.mobile}) {
      ${css(...args)}
    }
  `,
};

// ─────────────────────────────────────────────
// GLOBAL STYLES — injected once at the app root;
// resets defaults and sets base typography
// ─────────────────────────────────────────────
export const GlobalStyle = createGlobalStyle`
  /* Import Poppins from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${tokens.lightBg};
    color: ${tokens.bodyText};
    overflow-x: hidden; /* prevent horizontal scroll on mobile */
  }

  a {
    text-decoration: none;
  }
`;

// ─────────────────────────────────────────────
// LAYOUT WRAPPERS
// ─────────────────────────────────────────────

// Full-width white nav bar
export const NavBar = styled.nav`
  background: ${tokens.white};
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  position: relative;       /* needed for mobile menu absolute positioning */
  max-width: 1400px;
  margin: 0 auto;
`;

// Centered page section container
export const Container = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 2rem;
`;

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────

export const Logo = styled.span`
  font-weight: 700;
  font-size: 1.4rem;
  color: ${tokens.bodyText};
  margin-right: 2.5rem;
  cursor: pointer;
`;

// Desktop nav links group — hidden on mobile
export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex: 1;           /* pushes auth buttons to the right */
  align-items: center;

  ${media.mobile`
    display: none;   /* hide on small screens */
  `}
`;

export const NavLink = styled.a`
  color: ${tokens.grayText};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${tokens.bodyText};
  }
`;

// Desktop auth buttons group — also hidden on mobile
export const NavAuth = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  ${media.mobile`
    display: none;
  `}
`;

// ─── Hamburger button (mobile only) ───────────
export const HamburgerBtn = styled.button`
  display: none;             /* hidden on desktop */
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;

  ${media.mobile`
    display: flex;           /* visible on mobile */
  `}

  span {
    display: block;
    width: 24px;
    height: 3px;
    background: ${tokens.grayText};
    border-radius: 2px;
    transition: background 0.2s;
  }

  &:hover span {
    background: ${tokens.bodyText};
  }
`;

// Mobile dropdown menu — absolutely positioned below nav
export const MobileMenu = styled.div`
  position: absolute;
  top: 72px;
  left: 1rem;
  right: 1rem;
  background: ${tokens.darkPurple};
  border-radius: 12px;
  padding: 2rem;
  z-index: 100;              /* float above everything else */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const MobileNavLink = styled.a`
  color: ${tokens.white};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${tokens.cyan};
  }
`;

export const MobileDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
`;

// ─────────────────────────────────────────────
// BUTTONS — reusable across sections
// ─────────────────────────────────────────────

// Primary filled cyan button
export const BtnPrimary = styled.button`
  background: ${tokens.cyan};
  color: ${tokens.white};
  border: none;
  border-radius: 28px;
  padding: 0.75rem 2rem;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  transition: background 0.2s, opacity 0.2s;

  &:hover {
    background: ${tokens.cyanHover};  /* lighten on hover */
  }

  &:focus-visible {
    outline: 3px solid ${tokens.cyan};
    outline-offset: 3px;
  }
`;

// Ghost / outlined button (Login in desktop nav)
export const BtnOutline = styled.button`
  background: transparent;
  border: none;
  color: ${tokens.grayText};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  transition: color 0.2s;

  &:hover {
    color: ${tokens.bodyText};
  }

  &:focus-visible {
    outline: 3px solid ${tokens.cyan};
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────

export const HeroSection = styled.section`
  background: ${tokens.white};
  padding-bottom: 6rem;      /* extra space so the shortener box overlaps */
`;

export const HeroInner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 2rem 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;           /* wrap on narrow viewports */

  ${media.mobile`
    flex-direction: column-reverse; /* image above text on mobile */
    text-align: center;
  `}
`;

export const HeroText = styled.div`
  max-width: 480px;

  ${media.mobile`
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;   /* center the button on mobile */
  `}
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: ${tokens.bodyText};
  margin-bottom: 1rem;
`;

export const HeroSubtitle = styled.p`
  color: ${tokens.grayText};
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

export const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  min-width: 280px;

  svg {
    width: 100%;
    max-width: 480px;
  }

  ${media.mobile`
    justify-content: center;
    min-width: unset;
    width: 100%;
  `}
`;

// ─────────────────────────────────────────────
// SHORTENER WIDGET
// ─────────────────────────────────────────────

// The dark-purple box that straddles the hero/body boundary
export const ShortenerBox = styled.div`
  background: ${tokens.darkPurple};
  border-radius: 12px;
  padding: 2.5rem;
  margin: -4rem 2rem 0;          /* negative margin pulls it up over the hero */
  max-width: 1160px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 10;                   /* float above the hero background */

  /* Subtle radial glow in the corner for depth */
  background-image: radial-gradient(
    circle at top right,
    rgba(158, 154, 168, 0.2) 0%,
    transparent 60%
  );

  ${media.mobile`
    padding: 1.5rem;
    margin: -3rem 1rem 0;
  `}
`;

// Row that holds the input + submit button
export const ShortenerForm = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;             /* stack on very small screens */

  ${media.mobile`
    flex-direction: column;
  `}
`;

// The URL input — changes border color on error
export const UrlInput = styled.input`
  flex: 1;
  padding: 0.85rem 1.2rem;
  border-radius: 8px;
  /* border color switches to red when the $error prop is true */
  border: 3px solid ${({ $error }) => ($error ? tokens.errorRed : "transparent")};
  font-size: 1rem;
  outline: none;
  font-family: 'Poppins', sans-serif;
  transition: border-color 0.2s;
  min-width: 200px;

  &::placeholder {
    color: ${({ $error }) => ($error ? tokens.errorRed : "#aaa")};
  }

  /* Visible focus ring for accessibility */
  &:focus {
    border-color: ${({ $error }) => ($error ? tokens.errorRed : tokens.cyan)};
  }

  ${media.mobile`
    width: 100%;
  `}
`;

export const ShortenBtn = styled(BtnPrimary)`
  border-radius: 8px;         /* override the pill shape from BtnPrimary */
  padding: 0.85rem 2rem;
  font-size: 1rem;
  white-space: nowrap;

  ${media.mobile`
    width: 100%;              /* full-width on mobile */
  `}
`;

export const ErrorMsg = styled.p`
  color: ${tokens.errorRed};
  font-style: italic;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

// ─────────────────────────────────────────────
// SHORTENED LINKS LIST
// ─────────────────────────────────────────────

export const LinksList = styled.div`
  max-width: 1160px;
  margin: 1rem auto 0;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

// Single link row card
export const LinkRow = styled.div`
  background: ${tokens.white};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  gap: 1rem;

  /* On mobile stack vertically */
  ${media.mobile`
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  `}
`;

export const OriginalUrl = styled.span`
  color: ${tokens.bodyText};
  font-size: 0.95rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 50%;            /* don't let it overflow into the copy button */

  ${media.mobile`
    max-width: 100%;
    white-space: normal;     /* allow wrapping on mobile */
    word-break: break-all;
  `}
`;

// Right side of the link row: short URL + copy button
export const LinkRowRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${media.mobile`
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    border-top: 1px solid ${tokens.lightBg};
    padding-top: 0.75rem;
    gap: 0.75rem;
  `}
`;

export const ShortUrl = styled.span`
  color: ${tokens.cyan};
  font-size: 0.95rem;
  white-space: nowrap;
`;

// Copy button — turns dark purple when copied
export const CopyBtn = styled.button`
  background: ${({ $copied }) => ($copied ? tokens.darkPurple : tokens.cyan)};
  color: ${tokens.white};
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.4rem;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  white-space: nowrap;
  transition: background 0.2s, opacity 0.2s;

  &:hover {
    opacity: ${({ $copied }) => ($copied ? 1 : 0.8)};
  }

  &:focus-visible {
    outline: 3px solid ${tokens.cyan};
    outline-offset: 3px;
  }

  ${media.mobile`
    width: 100%;             /* full-width on mobile */
  `}
`;

// ─────────────────────────────────────────────
// ADVANCED STATISTICS SECTION
// ─────────────────────────────────────────────

export const StatsSection = styled.section`
  background: ${tokens.lightBg};
  padding: 5rem 2rem 4rem;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${tokens.bodyText};
`;

export const SectionSubtitle = styled.p`
  color: ${tokens.grayText};
  max-width: 500px;
  margin: 0 auto 5rem;
  line-height: 1.7;
`;

// Three-column grid — stacks to single column on mobile
export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  align-items: start;
  max-width: 1160px;
  margin: 0 auto;

  ${media.mobile`
    grid-template-columns: 1fr;  /* single column on mobile */
    gap: 4rem;
  `}
`;

// Card with icon badge sticking out of the top
export const FeatureCard = styled.div`
  background: ${tokens.white};
  border-radius: 8px;
  padding: 3.5rem 1.5rem 1.5rem;  /* top padding leaves room for the icon badge */
  position: relative;
  text-align: left;

  /* Stagger cards vertically on desktop for the layered look */
  margin-top: ${({ $offset }) => $offset || "0"};

  ${media.mobile`
    margin-top: 0;   /* reset stagger on mobile */
  `}
`;

// Circular icon badge that overlaps the top edge of the card
export const FeatureIconWrap = styled.div`
  background: ${tokens.darkPurple};
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -32px;
  left: 1.5rem;
`;

// Horizontal connector bar between cards (desktop only)
export const CardConnector = styled.div`
  position: absolute;
  right: -2rem;           /* extends outside the card's right edge */
  top: 50%;
  width: 2rem;
  height: 4px;
  background: ${tokens.cyan};
  transform: translateY(-50%);

  ${media.mobile`
    display: none;          /* hide connectors on mobile */
  `}
`;

export const FeatureTitle = styled.h3`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: ${tokens.bodyText};
`;

export const FeatureDesc = styled.p`
  color: ${tokens.grayText};
  font-size: 0.9rem;
  line-height: 1.7;
`;

// ─────────────────────────────────────────────
// CTA BANNER
// ─────────────────────────────────────────────

export const CtaSection = styled.section`
  background: ${tokens.darkPurple};
  /* SVG wave shapes in the background for depth */
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 200'%3E%3Cpath fill='%232d2d47' d='M0,96L120,112C240,128,480,160,720,154.7C960,149,1200,107,1320,85.3L1440,64L1440,200L0,200Z'/%3E%3C/svg%3E");
  background-size: cover;
  background-position: center;
  padding: 5rem 2rem;
  text-align: center;
`;

export const CtaTitle = styled.h2`
  color: ${tokens.white};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin-bottom: 2rem;
`;

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

export const Footer = styled.footer`
  background: ${tokens.deepDark};
  padding: 3rem 2rem;
`;

export const FooterInner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  display: grid;
  /* Auto-fit columns — min 150 px wide, flex to available space */
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  align-items: start;

  ${media.mobile`
    grid-template-columns: 1fr; /* stack vertically on mobile */
    text-align: center;
  `}
`;

export const FooterLogo = styled.span`
  color: ${tokens.white};
  font-weight: 700;
  font-size: 1.4rem;
`;

export const FooterColTitle = styled.h4`
  color: ${tokens.white};
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

export const FooterLink = styled.a`
  display: block;
  color: ${tokens.grayText};
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${tokens.cyan};
  }

  &:focus-visible {
    outline: 2px solid ${tokens.cyan};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

// Social icons row
export const SocialIcons = styled.div`
  display: flex;
  gap: 1.2rem;

  ${media.mobile`
    justify-content: center;
  `}
`;

export const SocialLink = styled.a`
  color: ${tokens.white};
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    color: ${tokens.cyan};
  }

  &:focus-visible {
    outline: 2px solid ${tokens.cyan};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

// ─────────────────────────────────────────────
// LOADING SPINNER (shown while API is fetching)
// ─────────────────────────────────────────────
export const Spinner = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  /* Spin animation defined inline via CSS keyframes */
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
