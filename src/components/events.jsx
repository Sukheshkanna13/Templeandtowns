import React from 'react';
import { Ico, BackButton } from './shell';

const EventsPage = ({ go, goBack }) => {
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
    <div className="tt-page tt-events-page">
      {/* Back + Breadcrumbs */}
      <BackButton onClick={() => go('retreat')} label="Back to retreat" />
      <div className="tt-breadcrumb tt-events-crumb">
        <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Home</span><span>/</span>
        <span style={{ cursor: 'pointer' }} onClick={() => go('retreat')}>Nature Retreat</span><span>/</span>
        <span style={{ color: 'var(--ink)' }}>Events</span>
      </div>

      {/* Header */}
      <div className="tt-events-header">
        <div className="tt-eyebrow">Nature Retreat · Near Auroville</div>
        <h1 className="tt-h1 tt-events-title">
          Meaningful <span className="tt-italic-soft" style={{ color: 'var(--accent)', fontWeight: 600 }}>memories.</span>
        </h1>
        <p className="tt-events-intro">
          Simple, thoughtfully curated experiences that connect you with nature, local culture
          and the peaceful spirit of Near Auroville.
        </p>
      </div>

      {/* Events list — clean card UI, no images */}
      <div className="tt-events-list">
        {events.map((ev) => (
          <div key={ev.title} className="tt-event-card">
            {/* Icon circle */}
            <div className="tt-event-icon" style={{
              background: `color-mix(in oklch, ${ev.accent} 12%, transparent)`,
              color: ev.accent
            }}>
              <Ico name={ev.icon} size={22} />
            </div>

            {/* Content */}
            <div className="tt-event-body">
              <h3 className="tt-event-name">{ev.title}</h3>
              <p className="tt-event-desc tt-muted">{ev.desc}</p>
              <div className="tt-event-actions">
                <button
                  className="tt-btn tt-btn-primary tt-btn-sm"
                  onClick={() => {
                    const msg = `Hi, I am interested in booking the "${ev.title}" experience at the Nature Retreat Near Auroville.`;
                    window.open(`https://wa.me/0000000000?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                >
                  <Ico name="wa" size={14} /> Request to book
                </button>
                <span className="tt-muted tt-event-via">via WhatsApp</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="tt-events-cta">
        <h2 className="tt-h2" style={{ margin: '0 0 12px' }}>Want to see the property?</h2>
        <p className="tt-muted tt-events-cta-text">
          Explore the Nature Retreat — 12 rooms, swimming pool, garden, and more.
        </p>
        <div className="tt-events-cta-actions">
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

export default EventsPage;
