/* global React, Ico */

const EventsPage = ({ go }) => {
  const events = [
    {
      title: 'Experience Local Artisans',
      desc: 'Discover the charm of local craftsmanship through simple demonstrations and hands-on workshops. Meet local artisans, explore handmade jewellery, weaving and jute crafts. Take home a little piece of Near Auroville with you.',
      icon: 'spark',
      accent: 'oklch(0.58 0.16 30)',
    },
    {
      title: 'Garden Fun for Kids',
      desc: 'Let the little hands explore nature through simple gardening and outdoor activities. A fun and joyful way for children to play, learn and enjoy the beauty of nature.',
      icon: 'sun',
      accent: 'oklch(0.58 0.16 145)',
    },
    {
      title: 'Poolside Evenings & Summer Fun',
      desc: 'Relax, unwind and enjoy refreshing moments by the pool. During special weekends and group stays - guests can enjoy cheerful poolside gatherings, family fun and summer vibes.',
      icon: 'shield',
      accent: 'oklch(0.58 0.16 215)',
    },
    {
      title: 'Robotics & Creative Tech',
      desc: 'Beginner-friendly robotics and creative technology sessions designed for curious young minds. Led by our in-house tech enthusiast - children can explore, build, and learn through hands-on activities.',
      icon: 'gift',
      accent: 'oklch(0.58 0.16 270)',
    }
  ];

  return (
    <div className="tt-page" style={{ paddingTop: 32, paddingBottom: 96 }}>
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Home</span><span>/</span>
        <span style={{ cursor: 'pointer' }} onClick={() => go('retreat')}>Nature Retreat</span><span>/</span>
        <span style={{ color: 'var(--ink)' }}>Events</span>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}>
        <div className="tt-eyebrow">Nature Retreat · Near Auroville</div>
        <h1 className="tt-h1" style={{ marginTop: 12, marginBottom: 16 }}>
          Meaningful <span className="tt-italic-soft" style={{ color: 'var(--accent)' }}>memories.</span>
        </h1>
        <p style={{ color: 'var(--text-soft)', fontSize: 17, lineHeight: 1.65 }}>
          Simple, thoughtfully curated experiences that connect you with nature, local culture 
          and the peaceful spirit of Near Auroville. 🪷
        </p>
      </div>

      {/* Events list — clean card UI, no images */}
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: 20 }}>
          {events.map((ev, i) => (
            <div key={ev.title} className="tt-event-card" style={{ 
              display: 'flex', alignItems: 'flex-start', gap: 24, 
              padding: 32, borderRadius: 10, 
              border: '1px solid var(--line)', 
              background: '#fff',
              transition: 'box-shadow 0.25s ease, transform 0.25s ease',
              cursor: 'default'
            }}
              onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Icon circle */}
              <div className="tt-event-icon" style={{ 
                flex: '0 0 52px', height: 52, borderRadius: '50%', 
                background: `color-mix(in oklch, ${ev.accent} 12%, transparent)`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: ev.accent
              }}>
                <Ico name={ev.icon} size={22} />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 19, fontWeight: 600, margin: '0 0 8px', color: 'var(--ink)' }}>{ev.title}</h3>
                    <p className="tt-muted" style={{ fontSize: 15, lineHeight: 1.6, margin: 0 }}>{ev.desc}</p>
                  </div>
                </div>
                <div style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <button 
                    className="tt-btn tt-btn-primary tt-btn-sm" 
                    onClick={() => {
                      const msg = `Hi, I am interested in booking the "${ev.title}" experience at the Nature Retreat Near Auroville.`;
                      window.open(`https://wa.me/0000000000?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                  >
                    <Ico name="wa" size={14} /> Request to book
                  </button>
                  <span className="tt-muted" style={{ fontSize: 13 }}>via WhatsApp</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="tt-events-cta" style={{ marginTop: 72, textAlign: 'center', padding: 48, background: 'var(--bg-soft)', borderRadius: 12, maxWidth: 720, margin: '72px auto 0' }}>
        <h2 className="tt-h2" style={{ margin: '0 0 12px' }}>Want to see the property?</h2>
        <p className="tt-muted" style={{ fontSize: 15, maxWidth: 440, margin: '0 auto 28px' }}>
          Explore the Nature Retreat — 12 rooms, swimming pool, garden, and more.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="tt-btn tt-btn-primary" onClick={() => go('retreat')}>
            View Nature Retreat
          </button>
          <button className="tt-btn tt-btn-ghost" onClick={() => go('property', { propertyId: 'p4' })}>
            View Rooms <Ico name="arrow" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

window.EventsPage = EventsPage;
