import React, { useState } from 'react';
import { Ico, BackButton } from './shell';
import {
  TT_DATA,
  RETREAT_ROOM_AMENITIES,
  RETREAT_BATHROOM_AMENITIES,
  RETREAT_HOUSE_RULES
} from '../data';

const StarRating = ({ rating, size = 13 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
    <span style={{ color: 'var(--ink)', fontSize: size }}>★</span>
    <span style={{ fontWeight: 600, fontSize: size }}>{rating}</span>
  </span>
);

export const NatureRetreatScreen = ({ go, goBack }) => {
  // All properties & rooms belonging to Nature Retreat (auroville)
  const retreatProperties = TT_DATA.properties.filter(p => p.city === 'auroville');
  const propertyP4 = TT_DATA.properties.find(p => p.id === 'p4');
  const galleryImgs = (propertyP4?.images || []).slice(0, 8);

  // Accordion open/close state for dropdown sections
  const [openAccordions, setOpenAccordions] = useState({
    amenities: true,
    rooms: false,
    rules: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToRooms = () => {
    const el = document.getElementById('rooms-to-book');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onBookRoom = (e, property) => {
    e.stopPropagation();
    if (property.bookingUrl) {
      window.open(property.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      go('property', { propertyId: property.id });
    }
  };

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

  const DETAILED_FACILITIES = [
    {
      title: '1 Acre Developing Garden, Cactus Garden & Lily Pond',
      icon: 'sun',
      tag: 'Nature & Landscape',
      desc: 'Expansive lush open grounds featuring manicured lawns, shaded walking trails, granite outdoor seatings, potted bougainvilleas, an exotic curated cactus garden, and a tranquil freshwater lily pond. Ideal for morning walks, quiet meditation, or relaxing in nature.',
    },
    {
      title: '2nd Floor Common Self-Service Kitchen',
      icon: 'gift',
      tag: 'Self-Service Dining',
      desc: 'A dedicated, fully equipped guest kitchen on the second floor. Includes dual induction stovetops, microwave oven, double-door refrigerator, electric kettle, cookware, utensils, dinnerware, cutlery, and dining seating so guests can easily prepare breakfast, tea, and warm meals.',
    },
    {
      title: '2nd Floor Common Laundry & Open Terrace',
      icon: 'lock',
      tag: 'Guest Laundry',
      desc: 'Automatic washing machine, complimentary laundry detergent, wash sinks, and heavy-duty drying racks on the second-floor sunny open terrace with tree-canopy breezes. (Note: Drying clothes on room verandas or walls is prohibited).',
    },
    {
      title: 'Swimming Pool Area',
      icon: 'shield',
      tag: '7:00 AM – 8:00 PM',
      desc: 'A pristine freshwater swimming pool nestled in natural greenery, surrounded by potted bougainvilleas and comfortable poolside loungers. Outdoor shower is provided; please use dedicated striped pool towels available in-room.',
    },
    {
      title: 'High Speed Internet (Mesh Wi-Fi)',
      icon: 'wifi',
      tag: 'High-Speed Fibre',
      desc: 'Reliable high-speed fibre mesh Wi-Fi network with uninterrupted coverage across all 12 guest rooms, shared kitchen, dining area, library, and pool patio. Tested for Zoom calls and remote work.',
    },
    {
      title: 'Library & Reading Nook',
      icon: 'star',
      tag: 'Books & Literature',
      desc: 'Quiet reading lounge offering the Complete Works of Sri Aurobindo and The Mother, regional Indian art publications, architectural books, and contemporary literature for calm afternoons.',
    },
    {
      title: 'Game Area & Lawn Recreation',
      icon: 'sparkle',
      tag: 'Recreation',
      desc: 'Indoor and outdoor leisure hub located between the 1st and 2nd floor with Carrom board, Chess, Scrabble, playing cards, board games, and outdoor badminton racquets for family fun.',
    },
    {
      title: 'Secure Gated Parking',
      icon: 'pin',
      tag: 'Free On-Site',
      desc: 'Spacious, gated, and secure parking inside the private 1-acre compound with ample space for multiple cars, SUVs, and rental two-wheelers. Safe access with locked gates.',
    },
    {
      title: '100% Inverter & Power Backup',
      icon: 'check',
      tag: 'Uninterrupted Comfort',
      desc: 'Automated inverter and generator backup system ensuring seamless lighting, ceiling fans, Wi-Fi connectivity, and charging stations remain active during any local power cuts.',
    },
    {
      title: 'Self-Service Hospitality & WhatsApp Concierge',
      icon: 'heart',
      tag: '24/7 Host Support',
      desc: 'Independent self check-in flexibility, digital local travel guides for Auroville and Pondicherry, cafe recommendations, and attentive hosts reachable on call and WhatsApp throughout your stay.',
    },
  ];

  return (
    <div className="tt-page" style={{ paddingTop: 32, paddingBottom: 96 }}>
      {/* Navigation */}
      <BackButton onClick={() => go('home')} label="Home" />
      <div className="tt-breadcrumb" style={{ marginBottom: 24 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Home</span><span>/</span>
        <span style={{ color: 'var(--ink)' }}>Nature Retreat</span>
      </div>

      {/* ========================================================= */}
      {/* 1. ORIGINAL / PREVIOUS DESIGN CORE LAYOUT (COMES FIRST)   */}
      {/* ========================================================= */}

      {/* Header */}
      <div style={{ marginBottom: 48, textAlign: 'center', maxWidth: 780, margin: '0 auto 48px' }}>
        <div className="tt-eyebrow">Near Auroville</div>
        <h1 className="tt-h1" style={{ marginTop: 12, marginBottom: 16 }}>Temple And Thorpe Resorts Nature Retreat</h1>
        <p style={{ color: 'var(--text-soft)', fontSize: 18, lineHeight: 1.6, margin: 0 }}>
          Nestled in the peaceful surroundings Near Auroville, designed for resting and simple living.
          12 Rooms with attached baths, Swimming Pool, Parking, Garden on a one acre facility. 5-7 minutes from Matrimandir.
        </p>
      </div>

      {/* Hero Image Banner */}
      <div className="tt-retreat-hero" style={{ height: 480, overflow: 'hidden', position: 'relative', marginBottom: 64, borderRadius: 4 }}>
        <img
          src="images/Auroville/1.jpeg"
          alt="Temple And Thorpe Nature Retreat"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '6px 12px', borderRadius: 'var(--pill)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, backdropFilter: 'blur(6px)' }}>
          <Ico name="pin" size={13} /> Near Auroville Matrimandir · 1 Acre Compound
        </div>
      </div>

      {/* What Makes This Place Special (Original 6-Highlight Grid) */}
      <div style={{ maxWidth: 880, margin: '0 auto 64px' }}>
        <h2 className="tt-h2" style={{ textAlign: 'center', marginBottom: 32 }}>What makes this place special</h2>
        <div className="tt-highlights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { icon: 'wifi', title: 'High-speed Wi-Fi', desc: 'Stay connected throughout the property' },
            { icon: 'sun', title: 'One Acre Garden', desc: 'Lush greenery and peaceful open spaces' },
            { icon: 'shield', title: 'Swimming Pool', desc: 'Refreshing pool for guests of all ages' },
            { icon: 'bed', title: '12 Rooms', desc: 'Comfortable rooms with attached baths' },
            { icon: 'lock', title: 'Free Parking', desc: 'Secure on-site parking available' },
            { icon: 'gift', title: 'Near Matrimandir', desc: '5-7 minutes from the iconic Matrimandir' },
          ].map(h => (
            <div key={h.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 20, border: '1px solid var(--line)', background: '#fff', borderRadius: 4 }}>
              <Ico name={h.icon} size={20} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{h.title}</div>
                <div className="tt-muted" style={{ fontSize: 13, marginTop: 4 }}>{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Life at the Retreat (Original 3-Row Experiences with Natures-Retreat Images) */}
      <div style={{ maxWidth: 880, margin: '0 auto 64px' }}>
        <h2 className="tt-h2" style={{ textAlign: 'center', marginBottom: 40 }}>Life at the retreat</h2>
        <div className="tt-experience-list">
          {experiences.map((exp, i) => (
            <div key={exp.title} className={`tt-experience-row ${i % 2 === 0 ? 'tt-row' : 'tt-row-reverse'}`}>
              <div className="tt-experience-img-wrap" style={{ borderRadius: 4, overflow: 'hidden' }}>
                <img src={exp.img} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div className="tt-experience-text">
                <h3 className="tt-h3">{exp.title}</h3>
                <p className="tt-muted">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* A Glimpse of the Retreat (Original 8-Image Gallery Preview) */}
      <div style={{ marginTop: 48, marginBottom: 64 }}>
        <h2 className="tt-h2" style={{ textAlign: 'center', marginBottom: 32 }}>A glimpse of the retreat</h2>
        <div className="tt-retreat-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, overflow: 'hidden', borderRadius: 4 }}>
          {galleryImgs.map((src, i) => (
            <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--bg-soft)' }}>
              <img
                src={src}
                alt={`Nature Retreat ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Original CTA Section with Nature Retreat Logo */}
      <div style={{ marginTop: 64, marginBottom: 80, textAlign: 'center', padding: '48px 32px', background: 'var(--bg-soft)', borderRadius: 4, border: '1px solid var(--line)' }}>
        <img
          src="nature-retreat-Logo.png"
          alt="Nature Retreat Logo"
          style={{ width: 120, height: 120, objectFit: 'contain', mixBlendMode: 'multiply', marginBottom: 16 }}
        />
        <h2 className="tt-h2" style={{ margin: '0 0 16px' }}>Ready to disconnect?</h2>
        <p className="tt-muted" style={{ fontSize: 16, marginBottom: 32, maxWidth: 540, margin: '0 auto 32px', lineHeight: 1.6 }}>
          Reserve your stay at the Nature Retreat and embrace the simple living. Direct online booking with instant confirmation.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="tt-btn tt-btn-primary" onClick={scrollToRooms}>
            Book a Room ↓
          </button>
          <button className="tt-btn tt-btn-ghost" onClick={() => go('events')}>
            View Events <Ico name="arrow" size={14} />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DROPDOWN-BASED OPENERS (EXPANDABLE FEATURE DETAILS)    */}
      {/* ========================================================= */}
      <section style={{ maxWidth: 960, margin: '0 auto 80px', paddingTop: 24, borderTop: '2px solid var(--line)' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="tt-eyebrow">Comprehensive Property Guide</div>
          <h2 className="tt-h2" style={{ marginTop: 8, marginBottom: 12 }}>
            Explore Facilities, Rooms &amp; Retreat Guidelines
          </h2>
          <p className="tt-muted" style={{ margin: 0, fontSize: 15, maxWidth: 640, margin: '0 auto' }}>
            Click each section below to inspect all facilities, common kitchen &amp; laundry equipment, room architecture, and stay rules.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* ACCORDION 1: 10 Core Facilities Detailed */}
          <div style={{ border: '1px solid var(--line)', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
            <button
              onClick={() => toggleAccordion('amenities')}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                background: openAccordions.amenities ? 'var(--bg-soft)' : '#fff',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>🌿</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 17, color: 'var(--ink)' }}>
                    10 Core Facilities &amp; Amenities Explained in Detail
                  </div>
                  <div className="tt-muted" style={{ fontSize: 13, marginTop: 2 }}>
                    Gardens, 2nd-floor common kitchen, laundry, swimming pool, Wi-Fi &amp; services
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 18, color: 'var(--ink)', transform: openAccordions.amenities ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                ▼
              </span>
            </button>

            {openAccordions.amenities && (
              <div style={{ padding: '24px', borderTop: '1px solid var(--line)', background: '#fff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                  {DETAILED_FACILITIES.map(f => (
                    <div
                      key={f.title}
                      style={{
                        padding: 18,
                        borderRadius: 4,
                        background: 'var(--bg-soft)',
                        border: '1px solid var(--line)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
                            <Ico name={f.icon} size={16} /> {f.title}
                          </div>
                          <span className="tt-chip tt-chip-tonal" style={{ fontSize: 10, padding: '3px 8px' }}>
                            {f.tag}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.6 }}>
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ACCORDION 2: Space & Room Specifications */}
          <div style={{ border: '1px solid var(--line)', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
            <button
              onClick={() => toggleAccordion('rooms')}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                background: openAccordions.rooms ? 'var(--bg-soft)' : '#fff',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>🏡</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 17, color: 'var(--ink)' }}>
                    The Space, 12 Rooms &amp; In-Room Specifications
                  </div>
                  <div className="tt-muted" style={{ fontSize: 13, marginTop: 2 }}>
                    Bed configurations, split AC, smart TV, attached bathrooms &amp; furniture
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 18, color: 'var(--ink)', transform: openAccordions.rooms ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                ▼
              </span>
            </button>

            {openAccordions.rooms && (
              <div style={{ padding: '24px', borderTop: '1px solid var(--line)', background: '#fff' }}>
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Architecture &amp; Layout</h4>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
                    TempleAndThorpe Nature Retreat is a 12-room boutique stay set across one full acre of private land with a quiet green forest backdrop.
                    There are <strong>6 Private Rooms on the Ground Floor</strong> (direct veranda access to lawns and garden) and <strong>6 Private Rooms on the 1st Floor</strong> (elevated tree-canopy views and natural light).
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 16 }}>
                  <div style={{ padding: 16, background: 'var(--bg-soft)', borderRadius: 4, border: '1px solid var(--line)' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Ico name="bed" size={15} /> In-Room Comforts
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-soft)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {RETREAT_ROOM_AMENITIES.slice(0, 8).map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ padding: 16, background: 'var(--bg-soft)', borderRadius: 4, border: '1px solid var(--line)' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Ico name="sparkle" size={15} /> Electronics &amp; Appliances
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-soft)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {RETREAT_ROOM_AMENITIES.slice(8).map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ padding: 16, background: 'var(--bg-soft)', borderRadius: 4, border: '1px solid var(--line)' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Ico name="shield" size={15} /> Private Attached Bathroom
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-soft)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {RETREAT_BATHROOM_AMENITIES.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                      <li>Instant Geyser Hot Water (24x7)</li>
                      <li>High water pressure shower</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ACCORDION 3: House Rules & Guidelines */}
          <div style={{ border: '1px solid var(--line)', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
            <button
              onClick={() => toggleAccordion('rules')}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                background: openAccordions.rules ? 'var(--bg-soft)' : '#fff',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>📋</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 17, color: 'var(--ink)' }}>
                    House Rules, Pool Etiquette &amp; Self-Service Guidelines
                  </div>
                  <div className="tt-muted" style={{ fontSize: 13, marginTop: 2 }}>
                    Pool timings (7 AM–8 PM), terrace drying rule, gate closure &amp; quiet hours
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 18, color: 'var(--ink)', transform: openAccordions.rules ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                ▼
              </span>
            </button>

            {openAccordions.rules && (
              <div style={{ padding: '24px', borderTop: '1px solid var(--line)', background: '#fff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                  <div style={{ padding: 16, background: 'var(--bg-soft)', borderRadius: 4, border: '1px solid var(--line)' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, color: 'var(--ink)' }}>
                      🏊 Swimming Pool Etiquette
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-soft)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <li>Pool hours are strictly <strong>7:00 AM – 8:00 PM</strong>.</li>
                      <li>Mandatory shower before stepping into the pool.</li>
                      <li>Proper nylon/polyester swimming attire required.</li>
                      <li>Use striped pool towels provided (do not use white bath towels).</li>
                      <li>No glassware or food permitted near the pool edge.</li>
                    </ul>
                  </div>

                  <div style={{ padding: 16, background: 'var(--bg-soft)', borderRadius: 4, border: '1px solid var(--line)' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, color: 'var(--ink)' }}>
                      🍳 Kitchen &amp; Laundry Conduct
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-soft)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <li>Common kitchen is self-service on the 2nd floor.</li>
                      <li>Wash used pots, dishes, and wipe induction cooktop after use.</li>
                      <li>All clothes must be dried on the <strong>2nd-floor terrace drying area</strong>.</li>
                      <li>Drying clothes on room porches, verandas, or compound walls is strictly prohibited.</li>
                    </ul>
                  </div>

                  <div style={{ padding: 16, background: 'var(--bg-soft)', borderRadius: 4, border: '1px solid var(--line)' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, color: 'var(--ink)' }}>
                      🔒 Property &amp; Community Rules
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-soft)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <li><strong>Keep all compound gates closed at all times</strong> to prevent roaming cattle/goats from damaging the gardens.</li>
                      <li>Quiet hours are observed between <strong>10:00 PM and 7:00 AM</strong>.</li>
                      <li>Strictly 100% no-smoking inside rooms or enclosed areas.</li>
                      <li>Zero alcohol and no illicit substances on the premises.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. ADD-ON ROOMS TO BOOK (AT THE VERY BOTTOM OF THE PAGE)  */}
      {/* ========================================================= */}
      <section id="rooms-to-book" style={{ marginBottom: 48, paddingTop: 32, borderTop: '2px solid var(--line)' }}>
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 36px' }}>
          <div className="tt-eyebrow">Instant Online Reservation</div>
          <h2 className="tt-h2" style={{ marginTop: 8, marginBottom: 12 }}>
            Available Rooms at Nature Retreat ({retreatProperties.length} Stays)
          </h2>
          <p className="tt-muted" style={{ fontSize: 16, margin: 0, lineHeight: 1.6 }}>
            Choose your private room — Ground Floor garden access or First Floor tree canopy views.
            Direct instant booking with verified live calendars on Airbnb &amp; Booking.com.
          </p>
        </div>

        {/* Room Catalogue Cards with Shuffled, Distinct Photos */}
        <div style={{ display: 'grid', gap: 24, maxWidth: 960, margin: '0 auto' }}>
          {retreatProperties.map(p => (
            <div
              key={p.id}
              className="tt-card"
              style={{ flexDirection: 'row', display: 'flex', alignItems: 'stretch', maxHeight: 310, cursor: 'pointer' }}
              onClick={() => go('property', { propertyId: p.id })}
            >
              {/* Distinct Room Cover Photo */}
              <div style={{ flex: '0 0 380px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={p.cover}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div className="tt-card-tags">
                  <span className="tt-tag">{p.area.split('·')[1]?.trim() || 'Near Auroville'}</span>
                  <span className="tt-tag tt-tag-dark" style={{ marginLeft: 6 }}>Self-Service Stay</span>
                </div>
              </div>

              {/* Room Card Body */}
              <div style={{ flex: 1, padding: '24px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="tt-eyebrow" style={{ fontSize: 11 }}>{p.area}</div>
                  <h3 className="tt-h3" style={{ marginTop: 6, marginBottom: 8, fontSize: 19 }}>
                    {p.name}
                  </h3>
                  <div style={{ marginBottom: 10 }}><StarRating rating={p.rating} size={14} /></div>
                  <p className="tt-line-clamp-2" style={{ color: 'var(--text-soft)', margin: 0, fontSize: 14, lineHeight: 1.55 }}>
                    {p.blurb}
                  </p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                    {['King Bed', 'Attached Bath', '1.5T AC', 'Smart TV', 'Kitchen Access'].map(a => (
                      <span key={a} className="tt-chip tt-chip-tonal" style={{ fontSize: 11, padding: '4px 8px' }}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                  <div>
                    <span className="tt-muted" style={{ fontSize: 13 }}>Online booking · Instant confirmation</span>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                      {p.bookingUrl && /airbnb/.test(p.bookingUrl) ? 'Self-Service Stay · Airbnb Booking' : 'Self-Service Stay · Booking.com'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      className="tt-btn tt-btn-ghost tt-btn-sm"
                      onClick={(e) => { e.stopPropagation(); go('property', { propertyId: p.id }); }}
                    >
                      Room Details
                    </button>
                    <button
                      className="tt-btn tt-btn-primary tt-btn-sm"
                      onClick={(e) => onBookRoom(e, p)}
                    >
                      Book now <Ico name="arrow" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Backward-compatible alias for search.jsx
export const NatureRetreatShowcase = NatureRetreatScreen;

export default NatureRetreatScreen;
