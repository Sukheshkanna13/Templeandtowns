/* global React, Ico */

const NatureRetreatScreen = ({ go }) => {
  const property = TT_DATA.properties.find(p => p.id === 'p4');
  const galleryImgs = (property?.images || []).slice(0, 8);

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

  return (
    <div className="tt-page" style={{ paddingTop: 32, paddingBottom: 96 }}>
      <div style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Home</span><span>/</span>
        <span style={{ color: 'var(--ink)' }}>Nature Retreat</span>
      </div>

      {/* Nature Retreat Logo + Header */}
      <div style={{ marginBottom: 48, textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
        <div className="tt-eyebrow">Auroville</div>
        <h1 className="tt-h1" style={{ marginTop: 12, marginBottom: 16 }}>Temple And Towns Resorts Nature Retreat</h1>
        <p style={{ color: 'var(--text-soft)', fontSize: 18, lineHeight: 1.6 }}>
          Nestled in the peaceful surroundings of Auroville, designed for resting and simple living.
          12 Rooms with attached baths, Swimming Pool, Parking, Garden on a one acre facility. 5-7 minutes from Matrimandir. 🪷
        </p>
      </div>

      {/* Hero Image */}
      <div className="tt-retreat-hero" style={{ height: 480, borderRadius: 12, overflow: 'hidden', position: 'relative', marginBottom: 64 }}>
        <img src="images/Auroville/1.jpeg" alt="Nature Retreat" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* Property Highlights */}
      <div style={{ maxWidth: 800, margin: '0 auto', marginBottom: 64 }}>
        <h2 className="tt-h2" style={{ textAlign: 'center', marginBottom: 32 }}>What makes this place special</h2>
        <div className="tt-highlights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { icon: 'wifi', title: 'High-speed Wi-Fi', desc: 'Stay connected throughout the property' },
            { icon: 'sun', title: 'One Acre Garden', desc: 'Lush greenery and peaceful open spaces' },
            { icon: 'shield', title: 'Swimming Pool', desc: 'Refreshing pool for guests of all ages' },
            { icon: 'bed', title: '12 Rooms', desc: 'Comfortable rooms with attached baths' },
            { icon: 'lock', title: 'Free Parking', desc: 'Secure on-site parking available' },
            { icon: 'gift', title: 'Near Matrimandir', desc: '5-7 minutes from the iconic Matrimandir' },
          ].map(h => (
            <div key={h.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 20, border: '1px solid var(--line)', borderRadius: 8 }}>
              <Ico name={h.icon} size={20} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{h.title}</div>
                <div className="tt-muted" style={{ fontSize: 13, marginTop: 4 }}>{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experiences with Natures-retreat images */}
      <div style={{ maxWidth: 800, margin: '0 auto', marginBottom: 64 }}>
        <h2 className="tt-h2" style={{ textAlign: 'center', marginBottom: 40 }}>Life at the retreat</h2>
        <div style={{ display: 'grid', gap: 48 }}>
          {experiences.map((exp, i) => (
            <div key={exp.title} className="tt-experience-row" style={{ display: 'flex', gap: 32, alignItems: 'center', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
              <div style={{ flex: 1, height: 280, borderRadius: 8, overflow: 'hidden' }}>
                <img src={exp.img} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ flex: 1, padding: 16 }}>
                <h3 className="tt-h3" style={{ marginBottom: 12 }}>{exp.title}</h3>
                <p className="tt-muted" style={{ fontSize: 16, lineHeight: 1.6 }}>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Preview */}
      <div style={{ marginTop: 48 }}>
        <h2 className="tt-h2" style={{ textAlign: 'center', marginBottom: 32 }}>A glimpse of the retreat</h2>
        <div className="tt-retreat-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, borderRadius: 8, overflow: 'hidden' }}>
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
      <div style={{ marginTop: 80, textAlign: 'center', padding: 48, background: 'var(--bg-soft)', borderRadius: 12 }}>
        <img
          src="images/Natures-retreat/natureretreat-Logo.jpeg"
          alt="Nature Retreat Logo"
          style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 8, marginBottom: 16 }}
        />
        <h2 className="tt-h2" style={{ margin: '0 0 16px' }}>Ready to disconnect?</h2>
        <p className="tt-muted" style={{ fontSize: 16, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
          Reserve your stay at the Nature Retreat and embrace the simple living.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="tt-btn tt-btn-primary" onClick={() => go('property', { propertyId: 'p4' })}>
            View Property Details
          </button>
          <button className="tt-btn tt-btn-ghost" onClick={() => go('events')}>
            View Events <Ico name="arrow" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

window.NatureRetreatScreen = NatureRetreatScreen;
