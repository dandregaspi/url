// ─────────────────────────────────────────────────────────────────────────────
// Shortly.jsx
// Main React component for the Shortly URL-shortener landing page.
// Uses the CleanURI API (https://cleanuri.com/docs) to shorten links,
// localStorage to persist links across page refreshes, and
// styled-components (imported from Shortly.styles.js) for all styling.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

// Import every styled component and the GlobalStyle from our styles file
import {
  GlobalStyle,
  NavBar, Logo, NavLinks, NavLink, NavAuth, HamburgerBtn,
  MobileMenu, MobileNavLink, MobileDivider,
  BtnPrimary, BtnOutline,
  HeroSection, HeroInner, HeroText, HeroTitle, HeroSubtitle, HeroImage,
  ShortenerBox, ShortenerForm, UrlInput, ShortenBtn, ErrorMsg,
  LinksList, LinkRow, OriginalUrl, LinkRowRight, ShortUrl, CopyBtn,
  StatsSection, SectionTitle, SectionSubtitle,
  FeaturesGrid, FeatureCard, FeatureIconWrap, CardConnector,
  FeatureTitle, FeatureDesc,
  CtaSection, CtaTitle,
  Footer, FooterInner, FooterLogo, FooterColTitle, FooterLink,
  SocialIcons, SocialLink,
  Spinner,
} from "./Shortly.styles";

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────

// Navigation links shown in the header
const NAV_LINKS = ["Features", "Pricing", "Resources"];

// Footer column data: { column title → [link labels] }
const FOOTER_LINKS = {
  Features:  ["Link Shortening", "Branded Links", "Analytics"],
  Resources: ["Blog", "Developers", "Support"],
  Company:   ["About", "Our Team", "Careers", "Contact"],
};

// The three feature cards in the "Advanced Statistics" section
const FEATURES = [
  {
    title: "Brand Recognition",
    desc:  "Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content.",
    // SVG icon rendered inline
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM17.5 14v7M14 17.5h7"
          stroke="#2ABAB4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    // Desktop vertical offset to create the staggered card layout
    offset: "0",
  },
  {
    title: "Detailed Records",
    desc:  "Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <circle cx="12" cy="12" r="9" stroke="#2ABAB4" strokeWidth="2"/>
        <path d="M12 7v5l3 3" stroke="#2ABAB4" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    offset: "2rem",   // second card sits lower
    // Show connector bar on the left (connecting card 1 → card 2)
    leftConnector: true,
  },
  {
    title: "Fully Customizable",
    desc:  "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <path d="M12 2L8 8H4l4 4-2 6 6-4 6 4-2-6 4-4h-4L12 2z"
          stroke="#2ABAB4" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    offset: "4rem",   // third card sits even lower
    leftConnector: true,
  },
];

// Social media icons as inline SVGs
const SOCIAL_ICONS = [
  {
    name: "Facebook",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    name: "Twitter",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
      </svg>
    ),
  },
  {
    name: "Pinterest",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="#232127"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"
          stroke="#232127" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// localStorage key used to persist the list of shortened links
const STORAGE_KEY = "shortly_links";

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function Shortly() {
  // ── State ──────────────────────────────────

  // Controls whether the mobile hamburger menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // The value typed into the URL input field
  const [inputUrl, setInputUrl] = useState("");

  // Whether the input is in its error state (empty submit)
  const [error, setError] = useState(false);

  // Whether an API request is currently in flight
  const [loading, setLoading] = useState(false);

  // API error message (e.g. invalid URL returned by CleanURI)
  const [apiError, setApiError] = useState("");

  // The list of { original, short } link objects
  // Initialised from localStorage so links survive page refresh
  const [links, setLinks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // Parse the stored JSON string, or fall back to an empty array
      return stored ? JSON.parse(stored) : [];
    } catch {
      return []; // if localStorage is unavailable or corrupted, start fresh
    }
  });

  // Which link row (by index) is currently showing "Copied!"
  const [copiedIndex, setCopiedIndex] = useState(null);

  // ── Side effects ───────────────────────────

  // Persist the links array to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  // ── Handlers ───────────────────────────────

  /**
   * handleShorten — called when the user clicks "Shorten It!" or presses Enter.
   *
   * 1. Validates that the input isn't empty.
   * 2. POSTs to the CleanURI API with the URL-encoded long URL.
   * 3. Prepends the new { original, short } pair to the links list.
   */
  const handleShorten = async () => {
    // Clear any previous API error message
    setApiError("");

    // Guard: empty input — show inline error, stop here
    if (!inputUrl.trim()) {
      setError(true);
      return;
    }

    setError(false);   // input has a value, clear validation error
    setLoading(true);  // show spinner on the button

    try {
      // URL-encode the long URL so special characters (&, ?, #, etc.)
      // are transmitted safely in the POST body
      const encodedUrl = encodeURIComponent(inputUrl.trim());

      // POST request to CleanURI — body must be application/x-www-form-urlencoded
      const response = await fetch("https://cleanuri.com/api/v1/shorten", {
        method: "POST",
        headers: {
          // Tell the server we're sending form-encoded data
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // The API expects a single field named `url`
        body: `url=${encodedUrl}`,
      });

      // Parse the JSON response body
      const data = await response.json();

      if (data.error) {
        // CleanURI returned an error object — show the message to the user
        setApiError(data.error);
      } else {
        // Success — prepend the new link to the list (newest first)
        setLinks(prev => [
          { original: inputUrl.trim(), short: data.result_url },
          ...prev,
        ]);
        setInputUrl(""); // clear the input after a successful shorten
      }
    } catch (err) {
      // Network error or JSON parse failure
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // always stop the spinner
    }
  };

  /**
   * handleCopy — copies the shortened URL to the clipboard and
   * temporarily changes the button label to "Copied!" for 2 seconds.
   */
  const handleCopy = (idx, shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedIndex(idx);
    // Reset back to "Copy" after 2 seconds
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // ── Render ─────────────────────────────────
  return (
    <>
      {/* Inject CSS reset and base styles into <head> */}
      <GlobalStyle />

      {/* ── NAVBAR ─────────────────────────────── */}
      <HeroSection>
        <NavBar>
          <Logo>Shortly</Logo>

          {/* Desktop: centre nav links */}
          <NavLinks>
            {NAV_LINKS.map(link => (
              <NavLink key={link} href="#">{link}</NavLink>
            ))}
          </NavLinks>

          {/* Desktop: Login + Sign Up on the right */}
          <NavAuth>
            <BtnOutline>Login</BtnOutline>
            <BtnPrimary style={{ padding: "0.6rem 1.5rem" }}>Sign Up</BtnPrimary>
          </NavAuth>

          {/* Mobile: hamburger button */}
          <HamburgerBtn
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </HamburgerBtn>

          {/* Mobile: dropdown menu — conditionally rendered */}
          {menuOpen && (
            <MobileMenu>
              {NAV_LINKS.map(link => (
                <MobileNavLink key={link} href="#">{link}</MobileNavLink>
              ))}
              <MobileDivider />
              <MobileNavLink href="#">Login</MobileNavLink>
              {/* Full-width Sign Up button inside the mobile menu */}
              <BtnPrimary style={{ width: "100%" }}>Sign Up</BtnPrimary>
            </MobileMenu>
          )}
        </NavBar>

        {/* ── HERO ───────────────────────────────── */}
        <HeroInner>
          <HeroText>
            <HeroTitle>More than just shorter links</HeroTitle>
            <HeroSubtitle>
              Build your brand's recognition and get detailed insights on how
              your links are performing.
            </HeroSubtitle>
            <BtnPrimary>Get Started</BtnPrimary>
          </HeroText>

          {/* Inline SVG illustration — no external image dependency */}
          <HeroImage>
            <svg viewBox="0 0 480 380" xmlns="http://www.w3.org/2000/svg">
              {/* Background blob */}
              <ellipse cx="300" cy="220" rx="180" ry="160" fill="#F0F1F6"/>
              {/* Desk surface */}
              <rect x="160" y="230" width="220" height="14" rx="7" fill="#2ABAB4"/>
              {/* Desk legs */}
              <rect x="175" y="244" width="12" height="60" rx="6" fill="#2ABAB4"/>
              <rect x="355" y="244" width="12" height="60" rx="6" fill="#2ABAB4"/>
              {/* Monitor */}
              <rect x="250" y="150" width="120" height="85" rx="8" fill="#35323E"/>
              <rect x="256" y="156" width="108" height="73" rx="4" fill="#2d9cdb"/>
              {/* Monitor stand */}
              <rect x="300" y="235" width="20" height="14" rx="2" fill="#35323E"/>
              <rect x="288" y="249" width="44" height="6" rx="3" fill="#35323E"/>
              {/* Keyboard */}
              <rect x="240" y="228" width="80" height="10" rx="5" fill="#3A3054"/>
              {/* Chair seat shadow */}
              <ellipse cx="235" cy="305" rx="40" ry="8" fill="#2ABAB4" opacity="0.4"/>
              {/* Chair post */}
              <rect x="228" y="248" width="14" height="60" rx="7" fill="#2ABAB4"/>
              {/* Chair back */}
              <rect x="210" y="245" width="50" height="8" rx="4" fill="#35323E"/>
              {/* Person head */}
              <circle cx="232" cy="175" r="22" fill="#F5C5A3"/>
              {/* Person body */}
              <rect x="210" y="196" width="44" height="55" rx="18" fill="#2ABAB4"/>
              {/* Person arm */}
              <path d="M210 215 Q185 230 240 235"
                stroke="#2ABAB4" strokeWidth="14" fill="none" strokeLinecap="round"/>
              {/* Person hair */}
              <ellipse cx="232" cy="160" rx="20" ry="12" fill="#35323E"/>
              <ellipse cx="248" cy="168" rx="8" ry="14" fill="#35323E"/>
              {/* Plants */}
              <rect x="150" y="270" width="10" height="40" rx="5" fill="#5C8D3E"/>
              <ellipse cx="155" cy="265" rx="18" ry="22" fill="#48A94E"/>
              <ellipse cx="143" cy="275" rx="12" ry="16" fill="#5CB85C"/>
              <rect x="145" y="308" width="20" height="16" rx="4" fill="#3A3054"/>
              <rect x="360" y="295" width="8" height="25" rx="4" fill="#5C8D3E"/>
              <ellipse cx="364" cy="288" rx="13" ry="16" fill="#48A94E"/>
              <rect x="356" y="318" width="16" height="12" rx="3" fill="#3A3054"/>
            </svg>
          </HeroImage>
        </HeroInner>
      </HeroSection>

      {/* ── SHORTENER SECTION ──────────────────── */}
      {/*
        The ShortenerBox uses a negative top margin so it visually
        overlaps the bottom of the hero section.
      */}
      <div style={{ background: "#F0F1F6", paddingTop: "6rem" }}>
        <ShortenerBox>
          <ShortenerForm>
            <UrlInput
              type="url"
              placeholder="Shorten a link here..."
              value={inputUrl}
              // $error is a transient prop ($ prefix prevents it reaching the DOM)
              $error={error}
              onChange={e => {
                setInputUrl(e.target.value);
                // Clear error as soon as the user starts typing
                if (error) setError(false);
                if (apiError) setApiError("");
              }}
              // Allow submitting by pressing Enter
              onKeyDown={e => e.key === "Enter" && handleShorten()}
              aria-label="Enter URL to shorten"
              aria-invalid={error}
            />

            <ShortenBtn onClick={handleShorten} disabled={loading}>
              {/* Show spinner while waiting for the API response */}
              {loading ? <Spinner /> : "Shorten It!"}
            </ShortenBtn>
          </ShortenerForm>

          {/* Validation error: empty input */}
          {error && <ErrorMsg>Please add a link</ErrorMsg>}

          {/* API error: bad URL or network failure */}
          {apiError && <ErrorMsg>{apiError}</ErrorMsg>}
        </ShortenerBox>

        {/* ── LINKS LIST ─────────────────────────────
            Rendered below the shortener box.
            Each entry was saved to localStorage, so it survives a refresh.
        */}
        {links.length > 0 && (
          <LinksList>
            {links.map((link, idx) => (
              <LinkRow key={`${link.short}-${idx}`}>
                {/* Left: original long URL */}
                <OriginalUrl title={link.original}>{link.original}</OriginalUrl>

                {/* Right: shortened URL + copy button */}
                <LinkRowRight>
                  <ShortUrl>{link.short}</ShortUrl>
                  <CopyBtn
                    // $copied is a transient prop that controls the button's background color
                    $copied={copiedIndex === idx}
                    onClick={() => handleCopy(idx, link.short)}
                    aria-label={`Copy ${link.short}`}
                  >
                    {copiedIndex === idx ? "Copied!" : "Copy"}
                  </CopyBtn>
                </LinkRowRight>
              </LinkRow>
            ))}
          </LinksList>
        )}

        {/* ── ADVANCED STATISTICS ──────────────────── */}
        <StatsSection>
          <SectionTitle>Advanced Statistics</SectionTitle>
          <SectionSubtitle>
            Track how your links are performing across the web with our
            advanced statistics dashboard.
          </SectionSubtitle>

          <FeaturesGrid>
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} $offset={feature.offset}>
                {/* Circular icon badge protruding above the card */}
                <FeatureIconWrap>{feature.icon}</FeatureIconWrap>

                {/*
                  Horizontal connector bar shown between cards 1→2 and 2→3.
                  It's positioned absolutely so it appears to "connect" adjacent cards.
                  Hidden on mobile via styled-components media query.
                */}
                {i < FEATURES.length - 1 && <CardConnector />}

                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDesc>{feature.desc}</FeatureDesc>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </StatsSection>
      </div>

      {/* ── CTA BANNER ─────────────────────────── */}
      <CtaSection>
        <CtaTitle>Boost your links today</CtaTitle>
        <BtnPrimary>Get Started</BtnPrimary>
      </CtaSection>

      {/* ── FOOTER ─────────────────────────────── */}
      <Footer>
        <FooterInner>
          {/* Brand logo */}
          <div>
            <FooterLogo>Shortly</FooterLogo>
          </div>

          {/* Footer link columns */}
          {Object.entries(FOOTER_LINKS).map(([colTitle, items]) => (
            <div key={colTitle}>
              <FooterColTitle>{colTitle}</FooterColTitle>
              {items.map(item => (
                <FooterLink key={item} href="#">{item}</FooterLink>
              ))}
            </div>
          ))}

          {/* Social media icons */}
          <div>
            <SocialIcons>
              {SOCIAL_ICONS.map(({ name, svg }) => (
                <SocialLink key={name} href="#" aria-label={name}>
                  {svg}
                </SocialLink>
              ))}
            </SocialIcons>
          </div>
        </FooterInner>
      </Footer>
    </>
  );
}
