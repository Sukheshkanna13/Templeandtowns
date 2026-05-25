/* global React, Ico, StripeImg, tt, TT_DATA */
const { useState, useMemo, useEffect } = React;

// ---------- SEARCH ----------
const SearchScreen = ({ go, searchCtx, setSearchCtx }) => {
  const [cityFilter, setCityFilter] = useState(searchCtx?.city || 'Pondicherry');
  const [checkIn, setCheckIn] = useState(searchCtx?.checkIn || '2026-05-12');
  const [checkOut, setCheckOut] = useState(searchCtx?.checkOut || '2026-05-15');
  const [guests, setGuests] = useState(searchCtx?.guests || '2 guests · 1 room');

  const matches = useMemo(() => TT_DATA.properties.filter(p => {
    if (cityFilter === 'Both cities') return true;
    const filterNorm = cityFilter.toLowerCase().includes('auroville') ? 'auroville' : cityFilter.toLowerCase();
    const cityNorm = p.city.toLowerCase().includes('auroville') ? 'auroville' : p.city.toLowerCase();
    return cityNorm === filterNorm;
  }).sort((a, b) => b.rating - a.rating),
    [cityFilter]);

  const updateSearch = () => {
    if (setSearchCtx) setSearchCtx({ city: cityFilter, checkIn, checkOut, guests });
  };

  return (
    <div className="tt-page" style={{ paddingTop: 56, paddingBottom: 96 }}>
      <div style={{ marginBottom: 32 }}>
        <div className="tt-eyebrow">Stays</div>
        <h1 className="tt-h1" style={{ marginTop: 12, marginBottom: 0 }}>Find your stay in <span className="tt-italic-soft" style={{ color: 'var(--accent)' }}>{cityFilter}</span></h1>
      </div>

      <div className="tt-search">
        <div className="tt-search-cell">
          <span className="lbl">Where</span>
          <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
            <option>Pondicherry</option><option>Near Auroville</option><option>Both cities</option>
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
          </select>
        </div>
        <button className="tt-search-go" onClick={updateSearch}><Ico name="search" size={14} /> Update</button>
      </div>

      <div style={{ marginTop: 40, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 className="tt-h3" style={{ margin: 0 }}>{matches.length} stays · {tt.fmtDate(checkIn)} → {tt.fmtDate(checkOut)}</h2>
      </div>

      <div style={{ display: 'grid', gap: 20 }}>
        {matches.map(p => (
          <div key={p.id} className="tt-card" style={{ flexDirection: 'row', display: 'flex', alignItems: 'stretch', maxHeight: 310 }} onClick={() => go('property', { propertyId: p.id })}>
            <div style={{ flex: '0 0 380px', position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
              <img src={p.cover} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div className="tt-card-tags">
                <span className="tt-tag">{p.city === 'pondicherry' ? 'White Town' : 'Near Auroville'}</span>
                <span className="tt-tag tt-tag-dark">★ {p.rating}</span>
              </div>
            </div>
            <div style={{ flex: 1, padding: '24px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="tt-eyebrow" style={{ fontSize: 11 }}>{p.area}</div>
                <h3 className="tt-h3" style={{ marginTop: 8, marginBottom: 8 }}>{p.name}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0, fontSize: 15, lineHeight: 1.55 }}>{p.blurb}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                  {(TT_DATA.rooms[p.id] || [{}])[0]?.amenities?.slice(0, 3).map(a => (
                    <span key={a} className="tt-chip tt-chip-tonal" style={{ cursor: 'default' }}>{a}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
                <span className="tt-muted" style={{ fontSize: 13 }}>{tt.nightsBetween(checkIn, checkOut) || 3} nights · pricing on request</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 600 }}>{p.from}</div>
                  <button className="tt-btn tt-btn-primary tt-btn-sm" style={{ marginTop: 8 }}>View stay <Ico name="arrow" size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {matches.length === 0 && <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>No stays found for this location.</div>}
      </div>
    </div>
  );
};
window.SearchScreen = SearchScreen;

// ---------- PROPERTY ----------
const PropertyScreen = ({ go, params, searchCtx, startBooking }) => {
  const property = TT_DATA.properties.find(p => p.id === params.propertyId);
  const rooms = TT_DATA.rooms[property.id] || [];
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]?.id);
  const [showGallery, setShowGallery] = useState(false);
  const room = rooms.find(r => r.id === selectedRoom);
  const onBook = () => startBooking({ property, room });
  const nights = tt.nightsBetween(searchCtx?.checkIn, searchCtx?.checkOut) || 3;
  const imgs = property.images || [];
  const galleryImages = imgs.slice(5);

  /* detect mobile viewport for sticky CTA */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="tt-page" style={{ paddingTop: 32, paddingBottom: isMobile ? 120 : 96 }}>
      <div style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Stays</span><span>/</span>
        <span style={{ cursor: 'pointer' }} onClick={() => go('search')}>{property.city === 'pondicherry' ? 'White Town' : 'Near Auroville'}</span><span>/</span>
        <span style={{ color: 'var(--ink)' }}>{property.name}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div className="tt-eyebrow">{property.area}</div>
          <h1 className="tt-h1" style={{ margin: '12px 0 0' }}>{property.name}</h1>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 12, color: 'var(--text-soft)', fontSize: 15 }}>
            <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Ico name="star" size={13} /> {property.rating} · {property.reviews} reviews</span>
            <span>·</span><span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Ico name="pin" size={14} /> {property.area}</span>
          </div>
        </div>
      </div>

      <div className="tt-property-gallery" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 8, height: 520, borderRadius: 6, overflow: 'hidden' }}>
        <div style={{ gridRow: '1 / 3', overflow: 'hidden' }}>
          <img src={imgs[0] || property.cover} alt={property.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        {imgs.slice(1, 5).map((src, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <img src={src} alt={`${property.name} ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ))}
      </div>
      {galleryImages.length > 0 && (
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <button className="tt-btn tt-btn-ghost tt-btn-sm" onClick={() => setShowGallery(v => !v)}>
            {showGallery ? 'Hide photos' : `Show all ${imgs.length} photos`}
          </button>
        </div>
      )}
      {showGallery && (
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, borderRadius: 6, overflow: 'hidden' }} className="tt-retreat-gallery">
          {galleryImages.map((src, i) => (
            <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: 4 }}>
              <img src={src} alt={`${property.name} gallery ${i + 6}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      )}

      <div className="tt-property-layout" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, marginTop: 64 }}>
        <div>
          <p style={{ color: 'var(--text)', fontSize: 17, lineHeight: 1.6, marginTop: 0, fontWeight: 400 }}>{property.blurb}</p>

          <div className="tt-highlights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 32 }}>
            {[
              { i: 'wifi', t: 'High-speed Wi-Fi', d: 'Mesh coverage everywhere, fibre uplink' },
              { i: 'sun', t: 'Garden & courtyard', d: 'Open until 22:00, lit at dusk' },
              { i: 'shield', t: 'Verified host', d: 'Personally approved by our team' },
              { i: 'gift', t: 'Welcome amenity', d: 'A small gift from the city, every stay' },
            ].map(a => (
              <div key={a.t} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', borderTop: '1px solid var(--line)', paddingTop: 18 }}>
                <Ico name={a.i} size={20} />
                <div>
                  <div style={{ fontWeight: 600 }}>{a.t}</div>
                  <div className="tt-muted" style={{ fontSize: 13, marginTop: 4 }}>{a.d}</div>
                </div>
              </div>
            ))}
          </div>

          <hr className="tt-hr" style={{ marginTop: 48 }} />

          <h3 className="tt-h2" style={{ marginTop: 0 }}>Choose a room</h3>
          <p className="tt-muted" style={{ marginTop: 4, fontSize: 14 }}>Real-time availability for your selected dates.</p>
          <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
            {rooms.map(r => (
              <label key={r.id} className={`tt-room-card${selectedRoom === r.id ? ' selected' : ''}`}>
                <div style={{ borderRadius: 4, overflow: 'hidden', height: 96 }}>
                  <img src={imgs[rooms.indexOf(r)] || imgs[0] || property.cover} alt={r.type} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 17 }}>{r.type}</div>
                  <div className="tt-muted" style={{ fontSize: 13, marginTop: 4 }}>{r.beds} · {r.size} · up to {r.capacity} guests</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                    {r.amenities.slice(0, 3).map(a => <span key={a} className="tt-chip tt-chip-tonal" style={{ fontSize: 11, padding: '4px 10px' }}>{a}</span>)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <input type="radio" name="room" checked={selectedRoom === r.id} onChange={() => setSelectedRoom(r.id)} style={{ position: 'absolute', opacity: 0 }} />
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{r.price}</div>
                </div>
              </label>
            ))}
          </div>

          <hr className="tt-hr" style={{ marginTop: 48 }} />

          <h3 className="tt-h2" style={{ marginTop: 0 }}>What guests are saying</h3>
          <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
            {TT_DATA.reviews.map(rv => (
              <div key={rv.name} style={{ padding: 24, background: 'var(--bg-soft)', borderRadius: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13 }}>{rv.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{rv.name}</div>
                      <div className="tt-muted" style={{ fontSize: 12 }}>{rv.tier} · {rv.when}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>{Array.from({ length: rv.rating }).map((_, i) => <Ico key={i} name="star" size={13} />)}</div>
                </div>
                <p style={{ margin: '12px 0 0', color: 'var(--text-soft)', fontSize: 15, lineHeight: 1.6 }}>{rv.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="tt-property-sidebar">
          <div className="tt-summary">
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 4, color: 'var(--ink)' }}>{property.from}</div>

            <div style={{ marginTop: 20, border: '1px solid var(--line)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ padding: 14, borderRight: '1px solid var(--line)' }}>
                  <div className="tt-muted" style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Check in</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{tt.fmtDate(searchCtx?.checkIn || '2026-05-12')}</div>
                </div>
                <div style={{ padding: 14 }}>
                  <div className="tt-muted" style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Check out</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{tt.fmtDate(searchCtx?.checkOut || '2026-05-15')}</div>
                </div>
              </div>
              <div style={{ padding: 14, borderTop: '1px solid var(--line)' }}>
                <div className="tt-muted" style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Guests</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{searchCtx?.guests || '2 guests · 1 room'}</div>
              </div>
            </div>

            <button className="tt-btn tt-btn-primary tt-btn-lg tt-w-full" style={{ marginTop: 20 }} onClick={onBook}>
              Request to book <Ico name="arrow" size={14} />
            </button>
            <p className="tt-muted" style={{ fontSize: 12, textAlign: 'center', marginTop: 12 }}>You won&rsquo;t be charged yet · Host approves first</p>
            <hr className="tt-hr" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 16 }}><span>Pricing</span><span>Request on WhatsApp</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA bar */}
      {isMobile && (
        <div className="tt-mobile-cta-bar">
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{property.from}</div>
            <div className="tt-muted" style={{ fontSize: 12 }}>{nights} nights · on request</div>
          </div>
          <button className="tt-btn tt-btn-primary" onClick={onBook}>
            Request to book <Ico name="arrow" size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
window.PropertyScreen = PropertyScreen;
