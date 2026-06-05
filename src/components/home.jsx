import React, { useState, useMemo } from 'react';
import { Ico, StripeImg, tt } from './shell';
import { TT_DATA } from '../data';

// ---------- HOME ----------
const HomeScreen = ({ go, setSearchCtx }) => {
  const [city, setCity] = useState('Pondicherry');
  const [checkIn, setCheckIn] = useState(tt.todayISO(1));
  const [checkOut, setCheckOut] = useState(tt.todayISO(4));
  const [guests, setGuests] = useState('2 guests · 1 room');

  const submit = () => { setSearchCtx({ city, checkIn, checkOut, guests }); go('search'); };

  return (
    <>
      {/* HERO */}
      <section className="tt-section-sm" style={{ paddingBottom: 0 }}>
        <div className="tt-page">
          <div className="tt-hero-grid" style={{ alignItems: 'center' }}>
            {/* LEFT */}
            <div>
              <h1 className="tt-display" style={{ marginTop: 0 }}>
                Explore stays that feel <span className="tt-italic-soft" style={{ color: 'var(--accent)' }}>modern,</span><br />
                calm, and unmistakably Indian.
              </h1>
              <p className="tt-sub" style={{ marginTop: 28, maxWidth: 560 }}>
                Inspired by the spirit of Temple And Towns Resorts. Clean design, smooth booking, and a platform built to scale.
              </p>
              <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
                <button className="tt-btn tt-btn-primary" onClick={submit}>Find a stay <Ico name="arrow" size={14} /></button>
                <a href="https://api.whatsapp.com/send/?phone=0000000000&text=Hi%2C+I%27d+like+to+chat+about+Temple+And+Towns+Resorts.&type=phone_number&app_absent=0"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 26px', background: 'var(--whatsapp)', color: '#fff', borderRadius: 'var(--pill)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
                  <Ico name="wa" size={15} /> Chat with us
                </a>
              </div>
            </div>

            {/* RIGHT — shorter featured photo card, no search inside */}
            <div className="tt-featured-card" style={{ aspectRatio: 'unset', height: 280 }}>
              <img src="images/hero_resort.png" alt="Featured Resort" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,22,40,0.35) 0%, rgba(10,22,40,0.05) 40%, rgba(10,22,40,0.55) 100%)', zIndex: 2 }} />
              <span className="tt-featured-label">Featured</span>
              <span className="tt-featured-meta">New destinations weekly</span>
              <div className="tt-featured-tags" style={{ gridTemplateColumns: '1fr 1fr', paddingTop: 32 }}>
                {[
                  { lbl: 'Temple stays', name: 'Sacred circuits' },
                  { lbl: 'Town escapes', name: 'Slow travel' },
                ].map(t => (
                  <div key={t.name} className="tt-featured-tile" onClick={() => go('search')}>
                    <div className="lbl">{t.lbl}</div>
                    <div className="name">{t.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH SEARCH BAR */}
        <div style={{ marginTop: 40, borderTop: '1px solid var(--line)' }}>
          <div className="tt-search" style={{
            borderRadius: 0,
            border: 'none',
            borderBottom: '1px solid var(--line)',
            gridTemplateColumns: '1.4fr 1fr 1fr 0.9fr auto',
          }}>
            <div className="tt-search-cell">
              <span className="lbl">Where</span>
              <select value={city} onChange={e => setCity(e.target.value)}>
                <option>Pondicherry</option>
                <option>Near Auroville</option>
                <option>Both cities</option>
              </select>
            </div>
            <div className="tt-search-cell">
              <span className="lbl">Check in</span>
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
            </div>
            <div className="tt-search-cell">
              <span className="lbl">Check out</span>
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
            </div>
            <div className="tt-search-cell">
              <span className="lbl">Guests</span>
              <select value={guests} onChange={e => setGuests(e.target.value)}>
                <option>1 guest · 1 room</option>
                <option>2 guests · 1 room</option>
                <option>3 guests · 1 room</option>
                <option>4 guests · 2 rooms</option>
                <option> more </option>

              </select>
            </div>
            <button className="tt-search-go" onClick={submit}>
              <Ico name="search" size={15} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* MOMENTS */}
      <section className="tt-section" style={{ overflow: 'hidden' }}>
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
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55 }}>Comming Soon..</p>
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
                    <div className="tt-journey-link">Comming Soon <Ico name="arrow" size={14} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
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
              <div key={p.id} className="tt-card" onClick={() => go('property', { propertyId: p.id })}>
                <div className="tt-card-media">
                  <img src={p.cover} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
                  <div className="tt-card-blurb">{p.blurb}</div>
                </div>
              </div>
            ))}
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
                <h2 className="tt-h2" style={{ marginTop: 14 }}>Browse, redirect, confirm.</h2>
                <p style={{ color: 'var(--text-soft)', marginTop: 16, fontSize: 16, lineHeight: 1.6 }}>
                  Our curated stays are hosted on Airbnb or Booking.com for a secure, fast, and instantly confirmed reservation experience.
                </p>
              </div>
              <div className="tt-how-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
                {[
                  { n: '01', t: 'Select property', d: 'Browse our collection of hand-picked stays in Pondicherry and Near Auroville to find the perfect fit.' },
                  { n: '02', t: 'Redirect securely', d: 'Click book on your selected stay to redirect immediately to its official Airbnb or Booking.com page.' },
                  { n: '03', t: 'Instantly confirm', d: 'Complete your booking on the partner platform with secure payment, and receive instant checkout confirmation.' },
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
          <div className="tt-loyalty-teaser" style={{ background: '#0a1628', color: '#fff', borderRadius: 6, padding: '64px 56px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'center' }}>
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
