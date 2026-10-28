import React, { useState } from 'react';
import { Ico, BackButton, RETREAT_SEARCH } from './shell';
import {
  TT_DATA,
  RETREAT_FEATURES,
  RETREAT_ROOM_AMENITIES,
  RETREAT_BATHROOM_AMENITIES,
  RETREAT_SHARED_AMENITIES,
  RETREAT_HOUSE_RULES
} from '../data';

const NatureRetreatScreen = ({ go, goBack }) => {
  const property = TT_DATA.properties.find(p => p.id === 'p4');
  const galleryImgs = (property?.images || []).slice(0, 12);
  const [activeTab, setActiveTab] = useState('features');

  const experiences = [
    {
      title: 'Experience Local Artisans',
      desc: 'Discover the charm of local craftsmanship through simple demonstrations and hands-on workshops. Meet local artisans, explore handmade jewellery, weaving and jute crafts.',
      img: 'images/Natures-retreat/1.jpeg'
    },
    {
      title: 'Garden Fun for Kids',
      desc: 'Let the little hands explore nature through simple gardening and outdoor activities. A fun and joyful way for children to play, learn and enjoy the beauty of nature.',
      img: 'images/Natures-retreat/2.jpeg'
    },
    {
      title: 'Poolside Evenings & Summer Fun',
      desc: 'Relax, unwind and enjoy refreshing moments by the pool. During special weekends and group stays — cheerful poolside gatherings and summer vibes.',
      img: 'images/Natures-retreat/3.jpeg'
    },
  ];

  const CORE_FEATURE_CARDS = [
    { title: 'High Speed Internet', icon: 'wifi', desc: 'High-speed Wi-Fi throughout all rooms and shared retreat areas' },
    { title: 'Pool Area', icon: 'shield', desc: 'Swimming pool (7:00 AM – 8:00 PM) with bougainvillea sit-out' },
    { title: 'Common Kitchen', icon: 'gift', desc: '2nd floor induction cooking, utensils, microwave & large fridge' },
    { title: 'Laundry', icon: 'lock', desc: 'Common laundry on 2nd floor with rooftop terrace drying space' },
    { title: 'Library', icon: 'star', desc: 'Complete Works of Mother and Sri Aurobindo for quiet reading' },
    { title: 'Game Area', icon: 'sparkle', desc: 'Recreation & games situated between the 1st and 2nd floor' },
    { title: 'Parking', icon: 'pin', desc: 'Secure gated outdoor parking on an acre of private land' },
    { title: 'Power Backup', icon: 'check', desc: 'Full power backup ensuring comfortable, uninterrupted stays' },
    { title: 'Cactus Garden', icon: 'sun', desc: 'Curated exotic cactus garden right beside the swimming pool' },
    { title: 'Lily Pond', icon: 'heart', desc: 'Scenic lily pond, pergola, lawns and granite outdoor seating' },
  ];

  return (
    <div className="tt-page" style={{ paddingTop: 32, paddingBottom: 96 }}>
      <BackButton onClick={() => go('home')} label="Home" />
      <div className="tt-breadcrumb" style={{ marginBottom: 24 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Home</span><span>/</span>
        <span style={{ color: 'var(--ink)' }}>Nature Retreat</span>
      </div>

      {/* Nature Retreat Logo + Header */}
      <div style={{ marginBottom: 48, textAlign: 'center', maxWidth: 860, margin: '0 auto 48px' }}>
        <div className="tt-eyebrow">Near Auroville Matrimandir</div>
        <h1 className="tt-h1" style={{ marginTop: 12, marginBottom: 16, fontSize: 'clamp(26px, 3.2vw, 42px)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          TEMPLEANDTHORPE NATURE RETREAT, NEAR AUROVILLE MATRIMANDIR
        </h1>
        <p style={{ color: 'var(--text-soft)', fontSize: 17, lineHeight: 1.65, maxWidth: 740, margin: '0 auto 16px' }}>
          TempleAndThorpe Nature Retreat is a 12 room boutique stay amidst natural settings, with green forest backdrops, swimming pool and developing garden. The Self-Service boutique retreat is inspired by various Indian art forms from all regions.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: 0 }}>
          We are travellers, explorers and family friendly accommodation, looking to explore in and around Auroville and Pondicherry. 5–7 minutes from Matrimandir.
        </p>
      </div>

      {/* Hero Image */}
      <div className="tt-retreat-hero" style={{ height: 480, overflow: 'hidden', position: 'relative', marginBottom: 56, borderRadius: 'var(--radius, 4px)' }}>
        <img src="images/Auroville/1.jpeg" alt="TEMPLEANDTHORPE NATURE RETREAT, NEAR AUROVILLE MATRIMANDIR" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* 10 Core Features Grid */}
      <div style={{ maxWidth: 960, margin: '0 auto 64px' }}>
        <div className="tt-eyebrow" style={{ textAlign: 'center', marginBottom: 8 }}>Core Amenities</div>
        <h2 className="tt-h2" style={{ textAlign: 'center', marginBottom: 36 }}>Features inside Nature Retreat</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {CORE_FEATURE_CARDS.map(f => (
            <div key={f.title} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              padding: '20px 18px',
              border: '1px solid var(--line)',
              background: 'var(--bg-soft)',
              borderRadius: 'var(--radius, 4px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--ink)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Ico name={f.icon} size={15} />
                </span>
                <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{f.title}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Space & Detailed Amenities Section */}
      <div style={{ maxWidth: 960, margin: '0 auto 64px', border: '1px solid var(--line)', borderRadius: 'var(--radius, 4px)', overflow: 'hidden' }}>
        {/* Navigation tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', background: 'var(--bg-soft)', overflowX: 'auto' }}>
          {[
            { id: 'features', label: 'The Space & Rooms' },
            { id: 'room-amenities', label: 'In-Room & Bathroom' },
            { id: 'shared-facilities', label: 'Shared Facilities' },
            { id: 'house-rules', label: 'House Rules & Notes' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 24px',
                border: 'none',
                background: activeTab === tab.id ? 'var(--bg, #fff)' : 'transparent',
                fontWeight: activeTab === tab.id ? 600 : 500,
                color: activeTab === tab.id ? 'var(--ink)' : 'var(--text-soft)',
                borderBottom: activeTab === tab.id ? '2px solid var(--ink)' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: 14,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '36px 32px', background: 'var(--bg, #fff)' }}>
          {activeTab === 'features' && (
            <div>
              <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 12 }}>The Space</h3>
              <p style={{ color: 'var(--text)', fontSize: 16, lineHeight: 1.6, maxWidth: 820, marginBottom: 24 }}>
                12 Room Self Service boutique stay, in a quiet forest backdrop, set up in an acre of land.
                6 Nos. of Private Rooms, each with attached bath on the ground floor and another 6 Nos. of Private rooms with attached bath on the 1st floor.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 24 }}>
                <div style={{ padding: 20, background: 'var(--bg-soft)', border: '1px solid var(--line)' }}>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Ground Floor (6 Rooms)</div>
                  <div style={{ fontSize: 14, color: 'var(--text-soft)' }}>Private rooms with attached bath, easy garden & pool access</div>
                </div>
                <div style={{ padding: 20, background: 'var(--bg-soft)', border: '1px solid var(--line)' }}>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>1st Floor (6 Rooms)</div>
                  <div style={{ fontSize: 14, color: 'var(--text-soft)' }}>Private rooms with attached bath, elevated nature and canopy views</div>
                </div>
                <div style={{ padding: 20, background: 'var(--bg-soft)', border: '1px solid var(--line)' }}>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>2nd Floor Terrace</div>
                  <div style={{ fontSize: 14, color: 'var(--text-soft)' }}>Common kitchen, common laundry & large open terrace seating area</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'room-amenities' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
              <div>
                <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 16 }}>Room Amenities</h3>
                <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--text)', fontSize: 14 }}>
                  {RETREAT_ROOM_AMENITIES.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 16 }}>Bathroom Amenities</h3>
                <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--text)', fontSize: 14 }}>
                  {RETREAT_BATHROOM_AMENITIES.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'shared-facilities' && (
            <div>
              <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 16 }}>Shared Self Service Amenities</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {RETREAT_SHARED_AMENITIES.map(facility => (
                  <div key={facility} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--ink)', fontSize: 16 }}>✓</span>
                    <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>{facility}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, padding: 18, background: 'var(--bg-soft)', border: '1px solid var(--line)' }}>
                <strong>Guest Access:</strong> Guest has complete access to all common and shared spaces across the property.
              </div>
            </div>
          )}

          {activeTab === 'house-rules' && (
            <div>
              <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 16 }}>Other Things to Note & House Rules</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {RETREAT_HOUSE_RULES.map((rule, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 12, background: 'var(--bg-soft)', borderLeft: '3px solid var(--ink)' }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>•</span>
                    <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>{rule}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}>
                <em>During your stay: Messages and calls are the best way to reach us. For urgent and immediate needs, please call us.</em>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Experiences with Natures-retreat images */}
      <div className="tt-page" style={{ maxWidth: 960, marginBottom: 64 }}>
        <h2 className="tt-h2" style={{ textAlign: 'center', marginBottom: 40 }}>Life at the retreat</h2>
        <div className="tt-experience-list">
          {experiences.map((exp, i) => (
            <div key={exp.title} className={`tt-experience-row ${i % 2 === 0 ? 'tt-row' : 'tt-row-reverse'}`}>
              <div className="tt-experience-img-wrap">
                <img src={exp.img} alt={exp.title} />
              </div>
              <div className="tt-experience-text">
                <h3 className="tt-h3">{exp.title}</h3>
                <p className="tt-muted">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Preview */}
      <div style={{ marginTop: 48, maxWidth: 960, margin: '48px auto 0' }}>
        <h2 className="tt-h2" style={{ textAlign: 'center', marginBottom: 32 }}>A glimpse of the retreat</h2>
        <div className="tt-retreat-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, overflow: 'hidden' }}>
          {galleryImgs.map((src, i) => (
            <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img src={src} alt={`Nature Retreat ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: 80, textAlign: 'center', padding: 48, background: 'var(--bg-soft)' }}>
        <img
          src="nature-retreat-Logo.png"
          alt="Nature Retreat Logo"
          style={{ width: 120, height: 120, objectFit: 'contain', mixBlendMode: 'multiply', marginBottom: 16 }}
        />
        <h2 className="tt-h2" style={{ margin: '0 0 16px' }}>Ready to disconnect?</h2>
        <p className="tt-muted" style={{ fontSize: 16, marginBottom: 32, maxWidth: 540, margin: '0 auto 32px' }}>
          Reserve your stay at TEMPLEANDTHORPE NATURE RETREAT, NEAR AUROVILLE MATRIMANDIR and embrace simple living.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="tt-btn tt-btn-primary" onClick={() => go('search', RETREAT_SEARCH)}>
            View Rooms
          </button>
          <button className="tt-btn tt-btn-ghost" onClick={() => go('events')}>
            View Events <Ico name="arrow" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NatureRetreatScreen;
