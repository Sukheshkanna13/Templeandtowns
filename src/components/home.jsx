import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Ico, StripeImg, tt } from './shell';
import { TT_DATA } from '../data';

// ---------- Floating Hero Overlay ----------
// Fixed to bottom-center of viewport, fades out on scroll.
// Positioned purely by viewport dimensions — not dependent on any element.
const HeroFloatOverlay = ({ onCta }) => {
  const [opacity, setOpacity] = useState(1);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        // Fade out completely within 150px of scroll
        const scrollY = window.scrollY || window.pageYOffset;
        const fadeEnd = 150;
        const newOpacity = Math.max(0, 1 - scrollY / fadeEnd);
        setOpacity(newOpacity);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render at all when fully invisible (performance)
  if (opacity <= 0) return null;

  return (
    <div
      className="tt-hero-float-overlay"
      style={{ opacity, pointerEvents: opacity < 0.1 ? 'none' : 'auto' }}
      aria-hidden={opacity < 0.1}
    >
      <h1 className="tt-display tt-text-c tt-hero-float-title">
        Explore stays that feel <span className="tt-italic-soft">modern,</span><br />
        calm, and unmistakably Indian.
      </h1>
      <button className="tt-btn tt-btn-primary tt-btn-lg tt-hero-float-btn" onClick={onCta}>
        Find a stay <Ico name="arrow" size={14} />
      </button>
    </div>
  );
};

// ---------- Property Carousel Component ----------
// Supports: arrow buttons (desktop + mobile) + touch swipe (mobile)
const PropertyCarousel = ({ p, go }) => {
  const [idx, setIdx] = useState(0);
  const imgs = p.images || [p.cover];
  const touchRef = useRef({ startX: 0, startY: 0, isDragging: false });
  const [dragOffset, setDragOffset] = useState(0);

  const next = (e) => { e.stopPropagation(); setIdx((idx + 1) % imgs.length); };
  const prev = (e) => { e.stopPropagation(); setIdx((idx - 1 + imgs.length) % imgs.length); };

  // Touch swipe handlers
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    touchRef.current = { startX: touch.clientX, startY: touch.clientY, isDragging: true };
    setDragOffset(0);
  };

  const onTouchMove = (e) => {
    if (!touchRef.current.isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchRef.current.startX;
    const dy = touch.clientY - touchRef.current.startY;

    // If vertical scroll is dominant, bail out
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dx) < 10) {
      return;
    }

    // Prevent page scroll while swiping horizontally
    if (Math.abs(dx) > 10) {
      e.preventDefault();
    }

    // Rubber-band effect at edges: dampen drag when at first/last image
    let offset = dx;
    if ((idx === 0 && dx > 0) || (idx === imgs.length - 1 && dx < 0)) {
      offset = dx * 0.3; // rubber-band
    }
    setDragOffset(offset);
  };

  const onTouchEnd = () => {
    if (!touchRef.current.isDragging) return;
    touchRef.current.isDragging = false;

    const threshold = 50; // px needed to trigger slide change
    if (dragOffset < -threshold && idx < imgs.length - 1) {
      setIdx(idx + 1);
    } else if (dragOffset > threshold && idx > 0) {
      setIdx(idx - 1);
    }
    setDragOffset(0);
  };

  // Calculate transform — base slide position + real-time drag offset
  const trackTransform = `translateX(calc(-${idx * 100}% + ${dragOffset}px))`;
  const trackTransition = dragOffset !== 0 ? 'none' : undefined; // disable transition while dragging

  return (
    <div className="tt-card" onClick={() => go('property', { propertyId: p.id })}>
      <div
        className="tt-card-media"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="tt-slider-track"
          style={{
            transform: trackTransform,
            ...(trackTransition ? { transition: trackTransition } : {}),
          }}
        >
          {imgs.map((src, i) => (
            <img key={i} src={src} alt={p.name} className="tt-slider-img" loading="lazy" />
          ))}
        </div>
        
        {/* SLIDER CONTROLS — visible on desktop (hover) and mobile (always) */}
        <button className="tt-slider-btn prev" onClick={prev}><Ico name="arrowL" size={14} /></button>
        <button className="tt-slider-btn next" onClick={next}><Ico name="arrow" size={14} /></button>

        {/* DOTS — show a condensed set on mobile */}
        <div className="tt-slider-dots">
          {imgs.map((_, i) => (
            <div key={i} className={`tt-dot ${i === idx ? 'active' : ''}`} />
          ))}
        </div>

        <div className="tt-card-tags">
          <span className="tt-tag">{p.city === 'pondicherry' ? 'White Town' : 'Near Auroville'}</span>
          <span className="tt-tag tt-tag-dark">★ {p.rating}</span>
        </div>
      </div>
      <div className="tt-card-body">
        <div className="tt-card-row">
          <span className="tt-card-name">{p.name}</span>
          <span className="tt-card-price">{p.from}</span>
        </div>
        <div className="tt-card-area">{p.area}</div>
      </div>
    </div>
  );
};

// ---------- HOME ----------
const HomeScreen = ({ go, setSearchCtx }) => {
  const [city, setCity] = useState('Pondicherry');
  const [checkIn, setCheckIn] = useState(tt.todayISO(1));
  const [checkOut, setCheckOut] = useState(tt.todayISO(4));
  const [guests, setGuests] = useState('2 guests · 1 room');

  const submit = () => { setSearchCtx({ city, checkIn, checkOut, guests }); go('search'); };

  return (
    <>
      {/* HERO — Full Bleed Marriott style */}
      <section className="tt-hero-full">
        <img src="images/hero_resort.png" alt="Hero" className="tt-hero-bg-full" />
        <div className="tt-hero-overlay-white" />

        {/* Sticky floating search pill — sticks to top as you scroll */}
        <div className="tt-hero-sticky-pill">
          <div className="tt-nav-search-pill" onClick={() => go('search')}>
            <div className="pill-content">
              <div className="cell">
                <span className="lbl">Where to?</span>
                <span className="val">{city}</span>
              </div>
              <div className="sep" />
              <div className="cell">
                <span className="lbl">Check in</span>
                <span className="val">{tt.fmtDate(checkIn)}</span>
              </div>
              <div className="sep" />
              <div className="cell">
                <span className="lbl">Check out</span>
                <span className="val">{tt.fmtDate(checkOut)}</span>
              </div>
            </div>
            <div className="search-icon-circle">
              <Ico name="search" size={16} />
            </div>
          </div>
        </div>
        
        {/* Hero content removed — now rendered as a floating viewport overlay below */}
      </section>

      {/* Floating overlay — fixed to bottom-center of viewport, fades on scroll */}
      <HeroFloatOverlay onCta={submit} />

      {/* FEATURED PROPERTIES — Carousel based */}
      <section className="tt-section">
        <div className="tt-page">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="tt-eyebrow">Featured stays</div>
              <h2 className="tt-h2" style={{ marginTop: 14, marginBottom: 0 }}>Hand-picked, this season.</h2>
            </div>
            <button className="tt-btn-link" onClick={() => go('search')}>See all stays →</button>
          </div>
          <div className="tt-grid-3">
            {TT_DATA.properties.slice(0, 3).map(p => (
              <PropertyCarousel key={p.id} p={p} go={go} />
            ))}
          </div>
        </div>
      </section>

      {/* MOMENTS — Infinite "Ring Around" Carousel */}
      <section className="tt-section" style={{ overflow: 'hidden', paddingTop: 40 }}>
        <div className="tt-page">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, gap: 24, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 620 }}>
              <h2 className="tt-h2" style={{ margin: 0 }}>Moments from our Vacation imagined by AI</h2>
              <p style={{ marginTop: 12, color: 'var(--text-soft)', fontSize: 16 }}>Temple towns, coastlines, and community</p>
            </div>
            <button className="tt-btn-link" onClick={() => go('search')}>See all stays →</button>
          </div>
        </div>

        <div className="tt-moments-carousel-container">
          <div className="tt-moments-carousel-track">
            <div className="tt-moments-carousel-group">
              {[
                { label: 'pottery', cap: 'Pottery, Near Auroville' },
                { label: 'temple-courtyard', cap: 'Sandalwood courtyards' },
                { label: 'sea-evening', cap: 'Promenade, dusk' },
                { label: 'street-food', cap: 'White Town evenings' },
                { label: 'morning-yoga', cap: 'Yoga Near Auroville' },
                { label: 'banyan-tree', cap: 'Nature walks' },
              ].map(m => (
                <div key={m.label} className="tt-moments-carousel-item">
                  <img src={`images/${m.label}.png`} alt={m.cap} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.45) 100%)', zIndex: 1 }} />
                  <span className="tt-moment-cap">{m.cap}</span>
                </div>
              ))}
            </div>
            <div className="tt-moments-carousel-group" aria-hidden="true">
              {[
                { label: 'pottery', cap: 'Pottery, Near Auroville' },
                { label: 'temple-courtyard', cap: 'Sandalwood courtyards' },
                { label: 'sea-evening', cap: 'Promenade, dusk' },
                { label: 'street-food', cap: 'White Town evenings' },
                { label: 'morning-yoga', cap: 'Yoga Near Auroville' },
                { label: 'banyan-tree', cap: 'Nature walks' },
              ].map(m => (
                <div key={`${m.label}-dup`} className="tt-moments-carousel-item">
                  <img src={`images/${m.label}.png`} alt={m.cap} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.45) 100%)', zIndex: 1 }} />
                  <span className="tt-moment-cap">{m.cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DARK FEATURED JOURNEYS */}
      <section className="tt-section-sm">
        <div className="tt-page">
          <div className="tt-dark-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ maxWidth: 720 }}>
                <div className="tt-eyebrow">Uncover destinations</div>
                <h2 className="tt-h2" style={{ marginTop: 14, marginBottom: 14 }}>Featured journeys</h2>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55 }}>Coming Soon..</p>
              </div>
              <button className="tt-btn-link" style={{ color: '#fff' }} onClick={() => go('search')}>Explore stays →</button>
            </div>
            <div className="tt-journey-grid">
              {[
                { cat: 'Retreat', title: 'Mangroove', loc: 'Pondicherry', label: 'nature' },
                { cat: 'Heritage', title: 'Coastline', loc: 'White-Town', label: 'coastal' },
                { cat: 'Culture', title: 'Culture', loc: 'Near Auroville', label: 'temple' },
              ].map(j => (
                <div key={j.title} className="tt-journey">
                  <img src={`images/${j.label}.png`} alt={j.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)', zIndex: 1 }} />
                  <span className="tt-journey-cat">{j.cat}</span>
                  <div className="tt-journey-body">
                    <div className="tt-journey-title">{j.title}</div>
                    <div className="tt-journey-loc">{j.loc}</div>
                    <div className="tt-journey-link">Coming Soon <Ico name="arrow" size={14} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="tt-section" style={{ paddingTop: 0 }}>
        <div className="tt-page">
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 80 }}>
            <div className="tt-how-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}>
              <div>
                <div className="tt-eyebrow">How booking works</div>
                <h2 className="tt-h2" style={{ marginTop: 14 }}>Explore, Request, Stay.</h2>
                <p style={{ color: 'var(--text-soft)', marginTop: 16, fontSize: 16, lineHeight: 1.6 }}>
                  Our curated stays offer a personalized booking experience. Connect with us directly to ensure your stay is perfectly tailored to your needs.
                </p>
              </div>
              <div className="tt-how-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
                {[
                  { n: '01', t: 'Select property', d: 'Browse our collection of hand-picked stays in Pondicherry and Near Auroville to find your ideal retreat.' },
                  { n: '02', t: 'Request to book', d: 'Click "Request to Book" to start a WhatsApp conversation with our team with your preferred dates.' },
                  { n: '03', t: 'Direct confirmation', d: 'Receive a personalized confirmation and direct support for a seamless check-in experience.' },
                ].map(s => (
                  <div key={s.n} style={{ borderTop: '1px solid var(--ink)', paddingTop: 20 }}>
                    <div style={{ fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Monaco, monospace", fontSize: 26, fontWeight: '600', color: 'var(--accent)' }}>{s.n}</div>
                    <h3 className="tt-h3" style={{ marginTop: 14, marginBottom: 8 }}>{s.t}</h3>
                    <p style={{ color: 'var(--text-soft)', margin: 0, lineHeight: 1.55, fontSize: 15 }}>{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAYFARER REWARDS */}
      <section className="tt-section-sm" style={{ paddingTop: 0 }}>
        <div className="tt-page">
          <div className="tt-loyalty-teaser" style={{ background: '#0a1628', color: '#fff', borderRadius: 24, padding: '64px 56px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div className="tt-eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>Wayfarer Rewards</div>
              <h2 className="tt-h1" style={{ color: '#fff', marginTop: 16, marginBottom: 16 }}>
                Wayfarer Rewards.<br />
                <span className="tt-italic-soft" style={{ color: '#a4a6f0' }}>Stay more, earn more.</span>
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, maxWidth: 480, margin: 0 }}>
                Earn points every night. Unlock early check-ins, room upgrades, and exclusive rates. Our guests earn points from their very first stay.
              </p>
              <button onClick={() => go('loyalty')}
                style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 32, padding: '18px 34px', background: '#fff', color: '#0a1628', borderRadius: 'var(--pill)', fontSize: 16, fontWeight: 600 }}>
                Explore Rewards <Ico name="arrow" size={15} />
              </button>
            </div>
            <div>
              {[
                { tier: 'Bronze', range: '0 – 499 pts', perks: 'Coming soon' },
                { tier: 'Silver', range: '500 – 1999 pts', perks: 'Coming soon' },
                { tier: 'Gold', range: '2000+ pts', perks: 'Coming soon' },
              ].map(t => (
                <div key={t.tier} style={{ borderTop: '1px solid rgba(255,255,255,0.12)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 17 }}>{t.tier}</div>
                    <div style={{ fontSize: 13, opacity: 0.65, marginTop: 2 }}>{t.range}</div>
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.85 }}>{t.perks}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeScreen;
