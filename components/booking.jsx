/* global React, Ico, StripeImg, tt, TT_DATA, WA_URL */
const { useState } = React;

const buildWaMessage = ({ property, room, checkIn, checkOut, guests, nights, guest, total }) => [
  `Hi! I'd like to book a stay at *${property.name}*.`,
  `Room: ${room?.type || 'N/A'}`,
  `Location: ${property.area}`,
  `Check-in: ${checkIn}  →  Check-out: ${checkOut} (${nights} night${nights !== 1 ? 's' : ''})`,
  `Guests: ${guests}`,
  `Name: ${guest.name}`,
  `Phone: ${guest.phone}`,
  `Email: ${guest.email}`,
  `Expected arrival: ${guest.arrival}`,
  guest.requests ? `Special requests: ${guest.requests}` : null,
].filter(Boolean).join('\n');

// ---------- BOOKING WIZARD ----------
const BookingWizard = ({ go, ctx, onSubmit }) => {
  const [step, setStep] = useState(0);
  const [guestName, setGuestName]     = useState('');
  const [guestEmail, setGuestEmail]   = useState('');
  const [guestPhone, setGuestPhone]   = useState('');
  const [arrival, setArrival]         = useState('Late afternoon · ~17:00');
  const [requests, setRequests]       = useState('');
  const [agree, setAgree]             = useState(false);

  const nights   = tt.nightsBetween(ctx.checkIn, ctx.checkOut) || 3;
  const labels   = ['Trip details', 'About you', 'Review & request'];

  const next = () => {
    if (step < 2) { setStep(s => s + 1); return; }
    const guest = { name: guestName || 'Guest', email: guestEmail, phone: guestPhone, arrival, requests };
    const ctx2  = { ...ctx, guest, nights };
    const msg   = buildWaMessage(ctx2);
    window.open(`https://wa.me/918553441449?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    onSubmit(ctx2);
  };

  return (
    <div className="tt-page" style={{ paddingTop: 56, paddingBottom: 96, maxWidth: 1100 }}>
      <button className="tt-btn-link" onClick={() => go('property', { propertyId: ctx.property.id })}>← Back to {ctx.property.name}</button>
      <div className="tt-eyebrow" style={{ marginTop: 24 }}>Booking request</div>
      <h1 className="tt-h1" style={{ margin: '12px 0 0' }}>Tell us about your stay</h1>

      {/* Stepper */}
      <div className="tt-booking-stepper" style={{ display: 'flex', gap: 0, marginTop: 40, marginBottom: 40, borderBottom: '1px solid var(--line)', overflowX: 'auto' }}>
        {labels.map((l, i) => (
          <div key={l} onClick={() => i < step && setStep(i)}
            style={{ flex: 1, minWidth: 120, padding: '16px 8px', borderBottom: `2px solid ${i === step ? 'var(--ink)' : 'transparent'}`, cursor: i < step ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 10, marginBottom: '-1px' }}>
            <span style={{ width: 24, height: 24, borderRadius: '50%', background: i <= step ? 'var(--ink)' : 'var(--bg-soft)', color: i <= step ? '#fff' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontWeight: i === step ? 600 : 400, color: i <= step ? 'var(--ink)' : 'var(--text-muted)', fontSize: 14, whiteSpace: 'nowrap' }}>{l}</span>
          </div>
        ))}
      </div>

      <div className="tt-booking-layout" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 56 }}>
        <div>
          {step === 0 && (
            <div>
              <h3 className="tt-h3">Confirm your dates</h3>
              <div className="tt-date-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
                <div className="tt-field"><label>Check in</label><div className="tt-field-val">{tt.fmtDate(ctx.checkIn)}</div></div>
                <div className="tt-field"><label>Check out</label><div className="tt-field-val">{tt.fmtDate(ctx.checkOut)}</div></div>
                <div className="tt-field"><label>Nights</label><div className="tt-field-val">{nights}</div></div>
              </div>
              <h3 className="tt-h3" style={{ marginTop: 40 }}>Estimated arrival</h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                {['Morning · before 12:00','Afternoon · 12-16:00','Late afternoon · ~17:00','Evening · after 19:00'].map(a => (
                  <span key={a} onClick={() => setArrival(a)} className={`tt-chip ${arrival === a ? 'tt-chip-active' : ''}`}>{a}</span>
                ))}
              </div>
              <h3 className="tt-h3" style={{ marginTop: 40 }}>Anything we should know?</h3>
              <textarea className="tt-textarea" rows={4} value={requests} onChange={e => setRequests(e.target.value)} placeholder="Allergies, accessibility needs, celebrations…"/>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="tt-h3">Lead guest</h3>
              <div style={{ display: 'grid', gap: 16, marginTop: 20 }}>
                <div className="tt-field"><label>Full name</label><input value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Your full name"/></div>
                <div className="tt-guest-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="tt-field"><label>Email</label><input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder="you@example.com"/></div>
                  <div className="tt-field"><label>Phone</label><input type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder="+91 98 XXXX XXXX"/></div>
                </div>
              </div>
              <p className="tt-muted" style={{ marginTop: 16, fontSize: 13 }}>Your details will be shared with the host to confirm your booking via WhatsApp.</p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="tt-h3">Review your request</h3>
              <div style={{ marginTop: 20, padding: 24, border: '1px solid var(--line)', borderRadius: 6 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 80, height: 80, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={ctx.property.cover} alt={ctx.property.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div className="tt-eyebrow" style={{ fontSize: 11 }}>{ctx.property.area}</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>{ctx.property.name}</div>
                    <div className="tt-muted" style={{ fontSize: 13, marginTop: 2 }}>{ctx.room?.type}</div>
                  </div>
                </div>
                <hr className="tt-hr"/>
                <div style={{ display: 'grid', gap: 8, fontSize: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}><span className="tt-muted">Dates</span><span style={{ textAlign:'right' }}>{tt.fmtDate(ctx.checkIn)} → {tt.fmtDate(ctx.checkOut)} · {nights} nights</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}><span className="tt-muted">Guests</span><span>{ctx.guests}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}><span className="tt-muted">Arrival</span><span>{arrival}</span></div>
                  {guestName && <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}><span className="tt-muted">Guest</span><span>{guestName}</span></div>}
                </div>
              </div>
              <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 24, cursor: 'pointer' }}>
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} style={{ marginTop: 4, accentColor: 'var(--ink)', flexShrink: 0 }}/>
                <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>I understand this booking request will be confirmed via WhatsApp. Cancellations are free up to 48 hours before check-in.</span>
              </label>
              <div style={{ marginTop: 20, padding: 16, background: 'oklch(0.97 0.05 145)', borderRadius: 6, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Ico name="wa" size={18}/>
                <span style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.5 }}>Clicking Submit will open WhatsApp with your details pre-filled. Our team responds within a few hours.</span>
              </div>
            </div>
          )}

          <div className="tt-booking-nav" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--line)', gap: 12, flexWrap: 'wrap' }}>
            <button className="tt-btn tt-btn-ghost" onClick={() => step === 0 ? go('property', { propertyId: ctx.property.id }) : setStep(s => s - 1)}>← Back</button>
            <button className="tt-btn tt-btn-primary" onClick={next} disabled={step === 2 && !agree}>
              {step === 2
                ? <><Ico name="wa" size={14}/>&nbsp;Send via WhatsApp</>
                : <>Continue <Ico name="arrow" size={14}/></>
              }
            </button>
          </div>
        </div>

        <aside className="tt-booking-aside">
          <div className="tt-summary">
            <div className="tt-eyebrow">Summary</div>
            <div style={{ marginTop: 16, fontWeight: 600, fontSize: 17 }}>{ctx.property.name}</div>
            <div className="tt-muted" style={{ fontSize: 13, marginTop: 2 }}>{ctx.room?.type}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}><span>Pricing</span><span>Request on WhatsApp</span></div>
            </div>
            <p className="tt-muted" style={{ fontSize: 12, marginTop: 12 }}>Availability and payment will be arranged via WhatsApp with our team.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};
window.BookingWizard = BookingWizard;

// ---------- WHATSAPP BOOKING CONFIRMATION ----------
const WhatsAppSentScreen = ({ go, booking }) => (
  <div style={{ paddingTop: 80, paddingBottom: 96, textAlign: 'center' }}>
    <div className="tt-page" style={{ maxWidth: 680 }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--whatsapp)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, boxShadow: '0 14px 36px -8px rgba(37,211,102,0.45)' }}>
        <Ico name="wa" size={32}/>
      </div>
      <div className="tt-eyebrow" style={{ marginBottom: 14 }}>Booking request sent</div>
      <h1 className="tt-h1" style={{ marginTop: 0 }}>You&rsquo;re one step away!</h1>
      <p style={{ color: 'var(--text-soft)', marginTop: 16, fontSize: 17, lineHeight: 1.6, maxWidth: 480, margin: '16px auto 0' }}>
        Your request for <strong>{booking?.property?.name}</strong> has been sent via WhatsApp.
        Our team will confirm availability and share a payment link within a few hours.
      </p>

      <div style={{ marginTop: 48, padding: '28px 32px', background: 'var(--bg-soft)', borderRadius: 6, textAlign: 'left' }}>
        <div className="tt-eyebrow" style={{ marginBottom: 20 }}>What happens next</div>
        {[
          { n: '01', t: 'We review your request', d: 'Our team checks availability and responds on WhatsApp — usually within 2 hours.' },
          { n: '02', t: 'You receive a payment link', d: 'A secure payment link will be shared on WhatsApp. Pay to lock in your room.' },
          { n: '03', t: 'Pack your bags', d: 'Booking confirmed. All check-in details arrive before your stay.' },
        ].map(s => (
          <div key={s.n} style={{ display: 'flex', gap: 16, marginTop: 20, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 22, fontStyle: 'italic', color: 'var(--accent)', flexShrink: 0, lineHeight: 1.3 }}>{s.n}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{s.t}</div>
              <div style={{ fontSize: 14, color: 'var(--text-soft)', marginTop: 4, lineHeight: 1.5 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
        <button className="tt-btn tt-btn-ghost" onClick={() => go('home')}>Back to home</button>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer"
           style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 26px', background:'var(--whatsapp)', color:'#fff', borderRadius:'var(--pill)', fontSize:15, fontWeight:500, textDecoration:'none' }}>
          <Ico name="wa" size={15}/> Open WhatsApp
        </a>
      </div>
    </div>
  </div>
);
window.WhatsAppSentScreen = WhatsAppSentScreen;
