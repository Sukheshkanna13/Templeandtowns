/* global React, Ico, StripeImg, tt, TT_DATA */
const { useState, useMemo } = React;

// ---------- BOOKINGS ----------
const BookingsScreen = ({ go, bookings }) => {
  const [tab, setTab] = useState('Upcoming');
  const list = bookings.filter(b => tab === 'Upcoming' ? b.state !== 'completed' : b.state === 'completed');
  const stateMeta = { awaiting: ['Awaiting host', '#dba049'], approved: ['Approved · pay now', '#1f8a5b'], confirmed: ['Confirmed', '#1f8a5b'], completed: ['Completed', '#7d8294'] };
  return (
    <div className="tt-page" style={{ paddingTop: 56, paddingBottom: 96 }}>
      <div className="tt-eyebrow">Account</div>
      <h1 className="tt-h1" style={{ margin: '12px 0 0' }}>Your bookings</h1>
      <div style={{ display: 'flex', gap: 0, marginTop: 32, borderBottom: '1px solid var(--line)' }}>
        {['Upcoming', 'Past'].map(t => (
          <button key={t} onClick={() => setTab(t)} className="tt-btn-link" style={{ padding: '14px 20px', borderBottom: `2px solid ${tab === t ? 'var(--ink)' : 'transparent'}`, marginBottom: '-1px', fontWeight: tab === t ? 600 : 400, color: tab === t ? 'var(--ink)' : 'var(--text-muted)' }}>{t}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 16, marginTop: 32 }}>
        {list.length === 0 && <div style={{ padding: 80, textAlign: 'center', color: 'var(--text-muted)' }}>Nothing here yet. <span style={{ color: 'var(--ink)', cursor: 'pointer' }} onClick={() => go('home')}>Find a stay →</span></div>}
        {list.map(b => (
          <div key={b.id} className="tt-card" style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }} onClick={() => go('flow', { bookingId: b.id })}>
            <div style={{ flex: '0 0 220px', position: 'relative' }}>
              <StripeImg label={b.property} tone="oklch(0.88 0.04 230)" ratio="auto" />
            </div>
            <div style={{ flex: 1, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="tt-eyebrow" style={{ fontSize: 11 }}>{b.id}</div>
                <h3 className="tt-h3" style={{ marginTop: 6, marginBottom: 6 }}>{b.property}</h3>
                <div className="tt-muted" style={{ fontSize: 14 }}>{tt.fmtDate(b.checkIn)} → {tt.fmtDate(b.checkOut)} · {b.guests}</div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 12, fontWeight: 600, color: stateMeta[b.state][1] }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: stateMeta[b.state][1] }} />
                  {stateMeta[b.state][0]}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 20, fontWeight: 600 }}>{tt.inr(b.total)}</div>
                <div className="tt-btn-link" style={{ marginTop: 8, fontSize: 13 }}>Manage →</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
window.BookingsScreen = BookingsScreen;

// ---------- LOYALTY — COMING SOON ----------
const LoyaltyScreen = ({ go }) => (
  <div className="tt-page" style={{ paddingTop: 56, paddingBottom: 96 }}>
    <div className="tt-eyebrow">Wayfarer Rewards</div>
    <h1 className="tt-h1" style={{ margin: '12px 0 24px' }}>
      Stay more,{' '}
      <span className="tt-italic-soft" style={{ color: 'var(--accent)' }}>earn more.</span>
    </h1>
    <div style={{ maxWidth: 560, fontSize: 17, color: 'var(--text-soft)', lineHeight: 1.6 }}>
      Our loyalty programme is coming soon. Earn points every night, unlock discounts, room upgrades, and priority booking — exclusively for our earliest guests.
    </div>

    <div className="tt-loyalty-tiers" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 48 }}>
      {[
        { n: 'Bronze', min: '0 – 499', perks: ['Welcome amenity', 'Base rate access'] },
        { n: 'Silver', min: '500 – 1,999', perks: ['5% off every stay', 'Early check-in'] },
        { n: 'Gold', min: '2,000+', perks: ['10% off every stay', 'Room upgrades', 'Priority queue'] },
      ].map(t => (
        <div key={t.n} className="tt-loyalty-tier-card" style={{ padding: 28, border: '1px solid var(--line)', borderRadius: 6 }}>
          <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', sans-serif", fontSize: 28, fontWeight: '700', color: 'var(--ink)' }}>{t.n}</div>
          <div className="tt-muted" style={{ fontSize: 13, marginTop: 4 }}>{t.min} pts</div>
          <ul style={{ margin: '16px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {t.perks.map(p => (
              <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-soft)' }}>
                <Ico name="check" size={14} /> {p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="tt-loyalty-card" style={{ marginTop: 56, padding: 40, background: '#0a1628', color: '#fff', borderRadius: 6, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20, maxWidth: 560 }}>
      <div className="tt-eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>Be the first to earn</div>
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
        Book your first stay via WhatsApp and we'll manually credit your founding-guest points when the programme launches.
      </p>
      <a href="https://api.whatsapp.com/send/?phone=0000000000&text=Hi%2C+I%27d+like+to+chat+about+Temple+And+Towns+Resorts.&type=phone_number&app_absent=0"
        target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 26px', background: '#fff', color: '#0a1628', borderRadius: 'var(--pill)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
        <Ico name="wa" size={15} /> Chat &amp; book now
      </a>
    </div>

    <button className="tt-btn-link" style={{ marginTop: 40 }} onClick={() => go('home')}>← Back to home</button>
  </div>
);
window.LoyaltyScreen = LoyaltyScreen;

// ---------- TRAVEL FOR A CAUSE ----------
const CauseScreen = ({ go }) => (
  <div>
    <section className="tt-section" style={{ paddingTop: 64 }}>
      <div className="tt-page">
        <div className="tt-eyebrow">CSR &amp; community</div>
        <h1 className="tt-display" style={{ marginTop: 16 }}>Travel that <span className="tt-italic-soft" style={{ color: 'var(--accent)' }}>gives back.</span></h1>
        <p style={{ maxWidth: 640, marginTop: 24, fontSize: 17, lineHeight: 1.55, color: 'var(--text-soft)' }}>
          A portion of every booking funds restoration of temple craft, artisan livelihoods, and coastal cleanup near our properties. Choose a cause when you book.
        </p>
      </div>
    </section>
    <section className="tt-section" style={{ paddingTop: 0 }}>
      <div className="tt-page">
        <div className="tt-grid-3">
          {[
            { t: 'Sandalwood restoration', loc: 'Karnataka', d: 'Replanting native sandalwood with Forest Dept.', label: 'cause-sandalwood', raised: '₹4.2L', goal: '₹10L', pct: '42%' },
            { t: 'Pondicherry coastal cleanup', loc: 'Tamil Nadu', d: 'Weekly beach cleans and turtle hatchery support.', label: 'cause-coastal', raised: '₹2.8L', goal: '₹6L', pct: '46.6%' },
            { t: 'Artisan grants', loc: 'Pan-India', d: 'Direct grants to potters, weavers, brassworkers.', label: 'cause-artisan', raised: '₹5.1L', goal: '₹8L', pct: '63.75%' },
          ].map(c => (
            <div key={c.t} className="tt-card" style={{ cursor: 'pointer' }}
              onClick={() => {
                const text = `Hi, I'd like to book a stay and support the ${c.t} cause.`;
                const waUrl = `https://api.whatsapp.com/send/?phone=0000000000&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
                window.open(waUrl, '_blank', 'noopener,noreferrer');
              }}>
              <div className="tt-card-media"><StripeImg label={c.label} tone="oklch(0.85 0.05 145)" ratio="auto" /></div>
              <div className="tt-card-body">
                <div className="tt-eyebrow" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-muted)' }}>{c.loc}</div>
                <h3 className="tt-h3" style={{ marginTop: 6, marginBottom: 8, fontSize: 20 }}>{c.t}</h3>
                <p className="tt-muted" style={{ fontSize: 14, margin: 0, lineHeight: 1.5 }}>{c.d}</p>
                <div style={{ marginTop: 20 }}>
                  <div style={{ height: 6, background: 'var(--bg-soft)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: c.pct, height: '100%', background: 'oklch(0.65 0.15 190)', borderRadius: 3 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 13 }}>
                    <span style={{ fontWeight: 500, color: 'var(--ink)' }}><b style={{ fontWeight: 700 }}>{c.raised}</b> raised</span>
                    <span className="tt-muted" style={{ fontWeight: 400 }}>of {c.goal}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
window.CauseScreen = CauseScreen;

// ---------- GUEST FOLIO ----------
const FolioScreen = ({ go, user, bookings }) => {
  const b = bookings.find(x => x.state === 'confirmed' || x.state === 'completed') || bookings[0];
  if (!b) return <div className="tt-page" style={{ padding: '120px 0', textAlign: 'center', color: 'var(--text-muted)' }}>No active stay yet. <span style={{ color: 'var(--ink)', cursor: 'pointer' }} onClick={() => go('home')}>Book one →</span></div>;
  const lines = [{ d: 'Room · Garden Suite × 3 nights', a: 26400 }, { d: 'Breakfast for two', a: 1800 }, { d: 'Spa · Abhyanga 60min', a: 3500 }, { d: 'Bar · evening', a: 980 }];
  const total = lines.reduce((s, l) => s + l.a, 0);
  return (
    <div className="tt-page" style={{ paddingTop: 56, paddingBottom: 96, maxWidth: 980 }}>
      <div className="tt-eyebrow">Guest folio · live</div>
      <h1 className="tt-h1" style={{ margin: '12px 0 0' }}>Your stay at {b.property.name}</h1>
      <div className="tt-muted" style={{ marginTop: 8 }}>Folio #{b.id}-F · {tt.fmtDate(b.checkIn)} → {tt.fmtDate(b.checkOut)}</div>
      <div className="tt-folio-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 56, marginTop: 40 }}>
        <div>
          <div style={{ border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', background: 'var(--bg-soft)', display: 'grid', gridTemplateColumns: '1fr 120px', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              <span>Description</span><span style={{ textAlign: 'right' }}>Amount</span>
            </div>
            {lines.map((l, i) => (
              <div key={i} style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 120px', borderTop: '1px solid var(--line)', fontSize: 15 }}>
                <span>{l.d}</span><span style={{ textAlign: 'right' }}>{tt.inr(l.a)}</span>
              </div>
            ))}
            <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 120px', borderTop: '2px solid var(--ink)', fontWeight: 700, fontSize: 17 }}>
              <span>Running total</span><span style={{ textAlign: 'right' }}>{tt.inr(total)}</span>
            </div>
          </div>
          <h3 className="tt-h3" style={{ marginTop: 40 }}>Add to your stay</h3>
          <div className="tt-addon-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 16 }}>
            {[{ t: 'Sunset boat', p: 1800 }, { t: 'Cooking class', p: 1200 }, { t: 'Heritage walk', p: 600 }].map(x => (
              <div key={x.t} style={{ padding: 20, border: '1px solid var(--line)', borderRadius: 6, cursor: 'pointer' }}>
                <div style={{ fontWeight: 600 }}>{x.t}</div>
                <div className="tt-muted" style={{ fontSize: 13, marginTop: 4 }}>{tt.inr(x.p)} per person</div>
                <button className="tt-btn-link" style={{ marginTop: 12, fontSize: 13 }}>Add to folio →</button>
              </div>
            ))}
          </div>
        </div>
        <aside>
          <div className="tt-summary">
            <div className="tt-eyebrow">Settlement</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{tt.inr(total)}</div>
            <div className="tt-muted" style={{ fontSize: 13, marginTop: 4 }}>Auto-charged on checkout · {tt.fmtDate(b.checkOut)}</div>
            <hr className="tt-hr" />
            <button className="tt-btn tt-btn-primary tt-w-full">Settle now</button>
            <button className="tt-btn tt-btn-ghost tt-w-full" style={{ marginTop: 8 }}>Email PDF receipt</button>
          </div>
        </aside>
      </div>
    </div>
  );
};
window.FolioScreen = FolioScreen;

// ---------- EXPERIENCES / THINGS / EVENTS (lightweight) ----------
const ListPage = ({ eyebrow, title, sub, items }) => (
  <div className="tt-page" style={{ paddingTop: 56, paddingBottom: 96 }}>
    <div className="tt-eyebrow">{eyebrow}</div>
    <h1 className="tt-h1" style={{ margin: '12px 0 0' }}>{title}</h1>
    <p style={{ color: 'var(--text-soft)', marginTop: 12, fontSize: 16, maxWidth: 620 }}>{sub}</p>
    <div className="tt-grid-3" style={{ marginTop: 48 }}>
      {items.map(it => (
        <div key={it.t} className="tt-card">
          <div className="tt-card-media"><StripeImg label={it.label} tone={it.tone} ratio="auto" /></div>
          <div className="tt-card-body">
            <div className="tt-eyebrow" style={{ fontSize: 11 }}>{it.cat}</div>
            <h3 className="tt-h3" style={{ marginTop: 6, marginBottom: 8 }}>{it.t}</h3>
            <p className="tt-muted" style={{ fontSize: 14, margin: 0 }}>{it.d}</p>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>{it.price}</span>
              <button className="tt-btn-link" style={{ fontSize: 13 }}>Book →</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ExperienceScreen = ({ go }) => <ListPage eyebrow="Experiences" title={<>Curated days, <span className="tt-italic-soft" style={{ color: 'var(--accent)' }}>locally led.</span></>} sub="Pottery in Pondicherry. Yoga Near Auroville." items={[
  { cat: 'Pondicherry', t: 'Pottery & wheel throwing', d: 'Half day in a French quarter studio.', price: 'Request to book', label: 'pottery', tone: 'oklch(0.85 0.06 60)' },
  { cat: 'Near Auroville', t: 'Sunrise yoga & breakfast', d: 'Two hours of yoga, then a slow breakfast.', price: 'Request to book', label: 'yoga', tone: 'oklch(0.88 0.05 145)' },
  { cat: 'Coast', t: 'Catamaran sunset', d: 'Local fishermen, bottled water, biscuits.', price: 'Request to book', label: 'boat', tone: 'oklch(0.85 0.06 215)' },
  { cat: 'Pondicherry', t: 'Indo-French dinner', d: 'Pop-up at a private home in White Town.', price: 'Request to book', label: 'dinner', tone: 'oklch(0.84 0.06 30)' },
]} />;
window.ExperienceScreen = ExperienceScreen;

const ThingsScreen = ({ go }) => <ListPage eyebrow="Things to do" title={<>Beyond the room.</>} sub="A short list, hand-picked by hosts. Book on the spot or save for later." items={[
  { cat: 'Outdoor', t: 'Cycling the East Coast Road', d: 'Half-day ride, cycle and helmet time', price: 'Request to book', label: 'images/coastal_cycling.png', tone: 'oklch(0.85 0.06 220)' },
  { cat: 'Wellness', t: 'Abhyanga massage', d: 'Sixty minutes of warm-oil bliss.', price: 'Request to book', label: 'images/spa_abhyanga.png', tone: 'oklch(0.88 0.04 60)' },
  { cat: 'Crafts', t: 'Block-printing class', d: 'Take home what you print.', price: 'Request to book', label: 'images/block_printing.png', tone: 'oklch(0.86 0.06 30)' },
]} />;
window.ThingsScreen = ThingsScreen;

const EventsScreen = ({ go }) => <ListPage eyebrow="Nature Retreat Events" title={<>Meaningful memories.</>} sub="At Temple And Towns Resorts Nature Retreat - enjoy simple, thoughtfully curated experiences that connect you with nature, local culture and the peaceful spirit of Near Auroville. 🪷" items={[
  { cat: 'Near Auroville', t: 'Experience Local Artisans', d: 'Discover the charm of local craftsmanship through simple demonstrations and hands-on workshops. Meet local artisans, explore handmade jewellery, weaving and jute crafts. Take home a little piece of Near Auroville with you.', price: 'Request to book', label: 'craft', tone: 'oklch(0.85 0.06 30)' },
  { cat: 'Near Auroville', t: 'Garden Fun for Kids', d: 'Let the little hands explore nature through simple gardening and outdoor activities. A fun and joyful way for children to play, learn and enjoy the beauty of nature.', price: 'Request to book', label: 'garden', tone: 'oklch(0.84 0.07 145)' },
  { cat: 'Near Auroville', t: 'Poolside Evenings & Summer Fun', d: 'Relax, unwind and enjoy refreshing moments by the pool. During special weekends and group stays - guests can enjoy cheerful poolside gatherings, family fun and summer vibes.', price: 'Request to book', label: 'coastal', tone: 'oklch(0.87 0.05 200)' },
  { cat: 'Near Auroville', t: 'Robotics & Creative Tech', d: 'Beginner-friendly robotics and creative technology sessions designed for curious young minds. Led by our in-house tech enthusiast - children can explore, build, and learn through hands-on activities.', price: 'Request to book', label: 'tech', tone: 'oklch(0.86 0.05 250)' },
]} />;
window.EventsScreen = EventsScreen;

