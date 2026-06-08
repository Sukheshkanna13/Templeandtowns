import React, { useState, useEffect, useRef, useMemo } from 'react';
import { WA_URL } from '../data';

// ---------- Inline SVG icons — 1.5px stroke, editorial ----------
export const Ico = ({ name, size = 16, className = '' }) => {
  const s = size;
  const props = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", className: `tt-ico ${className}` };
  switch (name) {
    case 'search': return <svg {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
    case 'pin': return <svg {...props}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>;
    case 'cal': return <svg {...props}><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>;
    case 'user': return <svg {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.6-4 4.5-6 8-6s6.4 2 8 6" /></svg>;
    case 'arrow': return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case 'arrowL': return <svg {...props}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>;
    case 'check': return <svg {...props}><path d="m5 12 4.5 4.5L19 7" /></svg>;
    case 'x': return <svg {...props}><path d="M6 6l12 12M18 6 6 18" /></svg>;
    case 'star': return <svg {...props} fill="currentColor" stroke="none"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9 6.7 19.7l1.1-5.9-4.3-4.1 5.9-.8L12 3.5Z" /></svg>;
    case 'wifi': return <svg {...props}><path d="M5 12.5a10 10 0 0 1 14 0M8 16a6 6 0 0 1 8 0" /><circle cx="12" cy="19" r="1.2" fill="currentColor" /></svg>;
    case 'spark': return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></svg>;
    case 'shield': return <svg {...props}><path d="M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>;
    case 'gift': return <svg {...props}><rect x="3.5" y="9" width="17" height="11" rx="1.5" /><path d="M3.5 13h17M12 9v11M8 9c-1.7 0-3-1.1-3-2.5S6.3 4 8 4c2 0 4 5 4 5s2-5 4-5c1.7 0 3 1.1 3 2.5S17.7 9 16 9" /></svg>;
    case 'lock': return <svg {...props}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>;
    case 'bed': return <svg {...props}><path d="M3 19v-9M21 19v-5M3 14h18M3 10c0-1 .8-2 2-2h7v6" /><circle cx="7" cy="11" r="1.5" /></svg>;
    case 'users': return <svg {...props}><circle cx="9" cy="8" r="3.5" /><path d="M3 20c1-3.5 3.4-5 6-5s5 1.5 6 5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21 20c-.4-2.4-1.7-3.9-3.5-4.6" /></svg>;
    case 'sun': return <svg {...props}><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" /></svg>;
    case 'menu': return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case 'wa': return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5 0-.2 0-.3 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.9-1.4.2-.6.2-1.2.1-1.4-.1-.1-.3-.2-.5-.3M12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.3 4.7 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2" /></svg>;
    case 'phone': return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2.06 4.18 2 2 0 0 1 4.05 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>;
    default: return null;
  }
};

// ---------- Photo helpers ----------
const PHOTO_LIBRARY = {
  'colonial villa exterior, courtyard': 'photo-1564501049412-61c2a3083791',
  'seafront balcony view, palms': 'photo-1571896349842-33c89424de2d',
  'garden hotel courtyard': 'photo-1582719508461-905c673771fd',
  'modern boutique facade': 'photo-1566073771259-6a8506099945',
  'loft suite interior': 'photo-1631049307264-da0ec9d70304',
  'residence atrium pool': 'photo-1551882547-ff40c63fe5fa',
  'pondicherry · skyline placeholder': 'photo-1582553081821-5b8fcfd94850',
  'near auroville · skyline placeholder': 'photo-1596176530529-78163a4f7af2',
  'bedroom': 'photo-1611892440504-42a792e24d32',
  'bathroom': 'photo-1552321554-5fefe8c9ef14',
  'lobby': 'photo-1590490360182-c33d57733427',
  'garden': 'photo-1505873242700-f289a29e1e0f',
  // featured / journeys
  'temple': 'photo-1604608672516-f1b9b1d80cce',
  'resort': 'photo-1582719508461-905c673771fd',
  'nature': 'photo-1518709268805-4e9042af2176',
  'coastal': 'photo-1507525428034-b723cf961d3e',
  'heritage': 'photo-1599661046289-e31897846e41',
  // travel for a cause
  'cause-sandalwood': 'photo-1480714378408-67cf0d13bc1b',
  'cause-coastal': 'photo-1445019980597-93fa8acb246c',
  'cause-artisan': 'photo-1507525428034-b723cf961d3e',
  // moments
  'pottery': 'photo-1565193566173-7a0ee3dbe261',
  'temple-courtyard': 'photo-1518002054494-3a6f94352e9d',
  'sea-evening': 'photo-1502343334121-26ac28b21c89',
  'street-food': 'photo-1505253758473-96b7015fcd40',
  'morning-yoga': 'photo-1526404746294-6648a44b7e90',
  'banyan-tree': 'photo-1518709268805-4e9042af2176',
};
const FALLBACK_IDS = [
  'photo-1507525428034-b723cf961d3e', 'photo-1519046904884-53103b34b206',
  'photo-1493558103817-58b2924bce98', 'photo-1502602898657-3e91760cbb34',
  'photo-1480714378408-67cf0d13bc1b', 'photo-1514565131-fce0801e5785',
  'photo-1542359649-31e03cd4d909', 'photo-1445019980597-93fa8acb246c',
];
const photoFor = (label) => {
  if (!label) return null;
  const key = String(label).toLowerCase().trim();
  for (const k in PHOTO_LIBRARY) if (k.toLowerCase() === key) return PHOTO_LIBRARY[k];
  let h = 0; for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return FALLBACK_IDS[h % FALLBACK_IDS.length];
};
const unsplashUrl = (id, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

export const StripeImg = ({ tone, label, ratio }) => {
  const isLocal = label && (label.startsWith('images/') || label.endsWith('.png') || label.endsWith('.jpg') || label.endsWith('.jpeg'));
  const id = isLocal ? null : photoFor(label);
  const src = isLocal ? label : (id ? unsplashUrl(id) : null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  return (
    <div className="tt-img" style={{ aspectRatio: ratio || '4/3' }}>
      <div className="tt-img-stripes" style={{ '--tone': tone || 'oklch(0.9 0.04 230)', opacity: loaded && !errored ? 0 : 0.85, transition: 'opacity .5s ease' }} />
      {src && !errored ? (
        <img
          src={src}
          alt={label || ''}
          loading="lazy"
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: loaded ? 1 : 0, zIndex: 1 }}
        />
      ) : null}
    </div>
  );
};



// ---------- formatters ----------
const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};
const fmtDateLong = (iso) => {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};
const nightsBetween = (a, b) => {
  if (!a || !b) return 0;
  const da = new Date(a + 'T00:00:00'); const db = new Date(b + 'T00:00:00');
  return Math.max(0, Math.round((db - da) / 86400000));
};
const todayISO = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
export const tt = { inr, fmtDate, fmtDateLong, nightsBetween, todayISO };

// ---------- Logo system revised to use single files (TTR-Logo.png / nature-retreat-Logo.png) ----------

// ---------- Top utility bar ----------
export const UtilityBar = ({ go }) => (
  <div className="tt-utility">
    <div className="tt-utility-inner">
      <div className="tt-utility-left">
        <span className="tt-utility-support">Reservations &amp; support</span>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 500 }}>
          <span className="tt-wa-dot"><Ico name="wa" size={14} /></span>
          +91-0000000000
        </a>
      </div>
      <div className="tt-utility-right">
        <a onClick={() => go('search')}>Trip Planner</a>
        <a onClick={() => go('retreat')}>Nature Retreat</a>
      </div>
    </div>
  </div>
);

// ---------- Main Navbar ----------
export const Navbar = ({ screen, go, searchCtx }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'search', label: 'Stays' },
    { id: 'things', label: 'Things to do' },
    { id: 'retreat', label: 'Nature Retreat' },
    { id: 'cause', label: 'Travel for Cause' },
    { id: 'events', label: 'Events' },
  ];
  const isActive = (id) => screen === id || (id === 'search' && ['home', 'property', 'book', 'wa-sent'].includes(screen));
  const close = () => setMenuOpen(false);

  const isHome = screen === 'home';

  return (
    <nav className={`tt-nav ${isHome ? 'tt-nav-home' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="tt-nav-inner tt-nav-dual-layout">
        {/* LEFT: LOGO + INLINE SEARCH PILL */}
        <div className="tt-nav-left-group">
          <div className="tt-logo tt-logo-static" onClick={() => { go('home'); close(); }}>
            <img src={screen === 'retreat' ? 'nature-retreat-Logo.png' : 'TTR-Logo.png'} alt="Temple And Towns Resorts" className="tt-logo-img" />
          </div>

          {/* Compact search pill in navbar */}
          {isHome && (
            <div className="tt-nav-pill-inline" onClick={() => go('search')}>
              <div className="cell">
                <span className="lbl">Where to?</span>
                <span className="val">{searchCtx?.city || 'Pondicherry'}</span>
              </div>
              <div className="sep" />
              <div className="cell">
                <span className="lbl">Dates</span>
                <span className="val">{tt.fmtDate(searchCtx?.checkIn)} – {tt.fmtDate(searchCtx?.checkOut)}</span>
              </div>
              <div className="search-icon-circle">
                <Ico name="search" size={14} />
              </div>
            </div>
          )}
        </div>

        {/* CENTER: DESKTOP NAV LINKS */}
        <div className="tt-nav-links">
          {links.map(l => (
            <span key={l.id}
              className={`tt-nav-link${isActive(l.id) ? ' active' : ''}`}
              onClick={() => { go(l.id); close(); }}>{l.label}</span>
          ))}
        </div>

        {/* RIGHT: SUPPORT + HAMBURGER */}
        <div className="tt-nav-right-static">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
             className="tt-nav-support">
            <span className="tt-wa-dot"><Ico name="wa" size={16} /></span>
            <span className="text-hide-mobile">Support</span>
          </a>
          <button className="tt-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            {menuOpen ? <Ico name="x" size={20} /> : <Ico name="menu" size={20} />}
          </button>
        </div>
      </div>

      {/* DROPDOWN MENU */}
      {menuOpen && (
        <div className="tt-mobile-menu">
          {links.map(l => (
            <span key={l.id} className="tt-mobile-link" onClick={() => { go(l.id); close(); }}>{l.label}</span>
          ))}
          <a onClick={() => { go('search'); close(); }} className="tt-mobile-wa" style={{ cursor: 'pointer' }}>
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
};

// ---------- Footer ----------
export const Footer = ({ screen }) => {
  const helpWaUrl = (topic) => {
    const text = `Hi, I need assistance with the following: ${topic}.`;
    return `https://api.whatsapp.com/send/?phone=0000000000&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
  };

  return (
    <footer className="tt-footer">
      <div className="tt-page">
        <div className="tt-footer-grid">
          <div>
            <div className="tt-logo" style={{ marginBottom: 18 }}>
              <img src={screen === 'retreat' ? 'nature-retreat-Logo.png' : 'TTR-Logo.png'} alt="Temple And Towns Resorts" className="tt-logo-img" style={{ height: 48, width: 48 }} />
            </div>
            <p style={{ color: 'var(--text-soft)', fontSize: 14, maxWidth: 340, lineHeight: 1.6, margin: 0 }}>
              Modern, calm, unmistakably Indian. A small, hand-picked collection of stays across temple towns and quiet coastlines — designed to feel premium without feeling heavy.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, fontSize: 13, color: 'var(--text-muted)' }}>
              <a>Instagram</a><span>·</span><a>Journal</a>
            </div>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li><a href={helpWaUrl('Cancellation')} target="_blank" rel="noopener noreferrer">Cancellation</a></li>
              <li><a href={helpWaUrl('Contact host')} target="_blank" rel="noopener noreferrer">Contact host</a></li>
              <li><a href={helpWaUrl('Privacy')} target="_blank" rel="noopener noreferrer">Privacy</a></li>
              <li><a href={helpWaUrl('Terms')} target="_blank" rel="noopener noreferrer">Terms</a></li>
              <li><a href={helpWaUrl('Sitemap')} target="_blank" rel="noopener noreferrer">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div className="tt-footer-bottom" style={{ marginTop: 64, paddingTop: 28, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}>
          <span>© 2026 Temple And Towns Resorts LLP · Pondicherry &amp; Near Auroville</span>
          <span>INR · English ·</span>
        </div>
      </div>
    </footer>
  );
};

// ---------- Floating WhatsApp ----------
export const WhatsAppFab = () => (
  <a className="tt-wa-fab" href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with Support">
    <Ico name="wa" size={26} />
  </a>
);
