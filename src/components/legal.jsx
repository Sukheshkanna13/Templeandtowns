import React, { useState } from 'react';
import { Ico, BackButton, RETREAT_SEARCH } from './shell';
import { TT_DATA, WA_URL } from '../data';

// ==========================================
// 1. CANCELLATION POLICY SCREEN
// ==========================================
export const CancellationScreen = ({ go, goBack }) => {
  const [activeTab, setActiveTab] = useState('standard');

  const waCancellationUrl = () => {
    const text = "Hi, I have a query regarding cancellation / rescheduling my reservation with Temple And Thorpe Resorts.";
    return `https://api.whatsapp.com/send/?phone=0000000000&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
  };

  return (
    <div className="tt-page" style={{ paddingTop: 32, paddingBottom: 96 }}>
      <BackButton onClick={goBack || (() => go('home'))} label="Back" />
      <div className="tt-breadcrumb" style={{ marginBottom: 24 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Home</span><span>/</span>
        <span style={{ color: 'var(--ink)' }}>Cancellation &amp; Refund Policy</span>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 840, marginBottom: 40 }}>
        <div className="tt-eyebrow">Policies &amp; Guarantees</div>
        <h1 className="tt-h1" style={{ marginTop: 12, marginBottom: 16 }}>
          Cancellation &amp; <span className="tt-italic-soft" style={{ color: 'var(--accent)' }}>Refund Policy</span>
        </h1>
        <p style={{ color: 'var(--text-soft)', fontSize: 17, lineHeight: 1.65, margin: 0 }}>
          Clear, transparent cancellation terms aligned with Airbnb and hospitality industry standards.
          Whether you booked through Airbnb, Booking.com, or directly via WhatsApp Concierge, here is everything you need to know.
        </p>
      </div>

      {/* 3 Core Highlight Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 48 }}>
        <div style={{ padding: 24, background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius, 4px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#1f8a5b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico name="check" size={16} />
            </span>
            <div style={{ fontWeight: 600, fontSize: 16 }}>100% Full Refund</div>
          </div>
          <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.55 }}>
            Cancel up to <strong>5 days before check-in</strong> (2:00 PM IST) or within <strong>48 hours of booking</strong> (if booking was made at least 14 days prior to arrival).
          </div>
        </div>

        <div style={{ padding: 24, background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius, 4px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#dba049', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico name="spark" size={16} />
            </span>
            <div style={{ fontWeight: 600, fontSize: 16 }}>50% Partial Refund</div>
          </div>
          <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.55 }}>
            Cancel between <strong>5 days and 24 hours</strong> before check-in (2:00 PM IST) and receive a 50% refund on accommodation charges.
          </div>
        </div>

        <div style={{ padding: 24, background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius, 4px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#7d8294', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico name="lock" size={16} />
            </span>
            <div style={{ fontWeight: 600, fontSize: 16 }}>Non-Refundable</div>
          </div>
          <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.55 }}>
            Cancellations made <strong>under 24 hours</strong> before check-in, no-shows, or early departures during stay are non-refundable.
          </div>
        </div>
      </div>

      {/* Policy Details Accordion / Tabs */}
      <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius, 4px)', overflow: 'hidden', marginBottom: 48 }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', background: 'var(--bg-soft)', overflowX: 'auto' }}>
          {[
            { id: 'standard', label: 'Timeline & Milestones' },
            { id: 'platforms', label: 'Airbnb vs Direct Bookings' },
            { id: 'reschedule', label: 'Rescheduling & Changes' },
            { id: 'weather', label: 'Weather & Force Majeure' },
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
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: 32, background: 'var(--bg, #fff)' }}>
          {activeTab === 'standard' && (
            <div>
              <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 16 }}>Standard Cancellation Timeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 140, fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>48-Hour Grace Period</div>
                  <div style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                    If you booked at least 14 days before your arrival date, you may cancel within 48 hours of booking confirmation for a full 100% refund.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                  <div style={{ minWidth: 140, fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>&gt; 5 Days Before</div>
                  <div style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                    Full refund of accommodation costs if cancelled 5 full days prior to 2:00 PM check-in on arrival day.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                  <div style={{ minWidth: 140, fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>5 Days to 24 Hours</div>
                  <div style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                    50% refund of the total reservation room amount.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                  <div style={{ minWidth: 140, fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>&lt; 24 Hours / No-Show</div>
                  <div style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                    Reservations cancelled within 24 hours of 2:00 PM arrival time or no-shows are non-refundable.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'platforms' && (
            <div>
              <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 16 }}>Platform-Specific Booking Terms</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                <div style={{ padding: 20, border: '1px solid var(--line)', background: 'var(--bg-soft)' }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Ico name="star" size={16} /> Bookings via Airbnb
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55, margin: 0 }}>
                    If your stay was reserved via Airbnb (e.g. White Town 1BHK, 2BHK, or Nature Retreat rooms 105, 106, 205, 206), all cancellations, alterations, and refund disbursements are processed directly through your Airbnb account in adherence to the Moderate/Firm policy active at booking time.
                  </p>
                </div>
                <div style={{ padding: 20, border: '1px solid var(--line)', background: 'var(--bg-soft)' }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Ico name="pin" size={16} /> Direct &amp; WhatsApp Reservations
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55, margin: 0 }}>
                    Direct reservations arranged through our concierge desk follow the 48-hour free cancellation policy. Approved refunds are credited directly to your original payment mode (UPI, Netbanking, or Card) within 3–5 business days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reschedule' && (
            <div>
              <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 16 }}>Rescheduling &amp; Date Changes</h3>
              <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6, marginBottom: 16 }}>
                We understand travel schedules can change. Guests may request a one-time date modification without cancellation penalties under the following conditions:
              </p>
              <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--text-soft)' }}>
                <li>Rescheduling request must be communicated at least <strong>72 hours before check-in</strong>.</li>
                <li>New dates are subject to property and room type availability.</li>
                <li>If the new dates fall under peak or holiday pricing, any tariff difference will apply.</li>
                <li>Rescheduled stays must be completed within 6 months of original booking.</li>
              </ul>
            </div>
          )}

          {activeTab === 'weather' && (
            <div>
              <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 16 }}>Weather Disruptions &amp; Force Majeure</h3>
              <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6, marginBottom: 16 }}>
                Given our coastal proximity in Pondicherry and Near Auroville, tropical storms or severe weather alerts occasionally occur along the Coromandel Coast.
              </p>
              <div style={{ padding: 18, background: 'var(--bg-soft)', borderLeft: '4px solid var(--ink)', fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55 }}>
                In the event of official government red alerts, declared cyclone emergencies, or state-mandated travel restrictions, guests are offered <strong>100% stay credits</strong> valid for 12 months or complimentary date shifts.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Need Help CTA */}
      <div style={{ padding: 32, background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius, 4px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 600 }}>Need to cancel or modify your reservation?</h3>
          <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: 14 }}>
            Reach out to our reservations team directly on WhatsApp or call our support desk.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href={waCancellationUrl()} target="_blank" rel="noopener noreferrer" className="tt-btn tt-btn-primary">
            <Ico name="wa" size={16} /> Contact Support
          </a>
          <button className="tt-btn tt-btn-ghost" onClick={() => go('contact')}>
            Contact Info
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 2. TERMS AND CONDITIONS SCREEN
// ==========================================
export const TermsScreen = ({ go, goBack }) => {
  return (
    <div className="tt-page" style={{ paddingTop: 32, paddingBottom: 96 }}>
      <BackButton onClick={goBack || (() => go('home'))} label="Back" />
      <div className="tt-breadcrumb" style={{ marginBottom: 24 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Home</span><span>/</span>
        <span style={{ color: 'var(--ink)' }}>Terms &amp; Conditions</span>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 840, marginBottom: 40 }}>
        <div className="tt-eyebrow">Stay Agreement &amp; House Rules</div>
        <h1 className="tt-h1" style={{ marginTop: 12, marginBottom: 16 }}>
          Terms &amp; <span className="tt-italic-soft" style={{ color: 'var(--accent)' }}>Conditions</span>
        </h1>
        <p style={{ color: 'var(--text-soft)', fontSize: 17, lineHeight: 1.65, margin: 0 }}>
          Welcome to Temple And Thorpe Resorts. By making a reservation or staying at our properties across Pondicherry White Town and Near Auroville Matrimandir, you agree to comply with these terms, house rules, and safety guidelines.
        </p>
      </div>

      {/* Content Blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 900 }}>

        {/* Section 1: Check-in, Check-out & Govt ID */}
        <div style={{ padding: 28, border: '1px solid var(--line)', background: 'var(--bg, #fff)', borderRadius: 'var(--radius, 4px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>1</span>
            <h2 className="tt-h3" style={{ margin: 0 }}>Check-in, Check-out &amp; Mandatory Identification</h2>
          </div>
          <ul style={{ margin: 0, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--text)', fontSize: 14, lineHeight: 1.55 }}>
            <li><strong>Check-in Time:</strong> 2:00 PM IST onwards. Early check-in is subject to prior request and room availability.</li>
            <li><strong>Check-out Time:</strong> 11:00 AM IST. Late check-out must be pre-arranged with the concierge.</li>
            <li><strong>Mandatory Government Photo ID:</strong> In compliance with Indian statutory law and local police regulations, every adult guest must present valid government photo identification (Aadhaar, Passport, Driver's License, or Voter ID) upon arrival.</li>
            <li><strong>International Guests:</strong> Foreign nationals must present a valid passport and Indian visa, and complete the statutory Form C registration upon check-in.</li>
          </ul>
        </div>

        {/* Section 2: Nature Retreat House Rules */}
        <div style={{ padding: 28, border: '1px solid var(--line)', background: 'var(--bg-soft)', borderRadius: 'var(--radius, 4px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>2</span>
            <h2 className="tt-h3" style={{ margin: 0 }}>TEMPLEANDTHORPE NATURE RETREAT, NEAR AUROVILLE MATRIMANDIR — Rules &amp; Notes</h2>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55, marginTop: 4, marginBottom: 16 }}>
            Our Nature Retreat is a 12-room self-service boutique sanctuary set across an acre of land in a peaceful forest backdrop. To preserve its calm atmosphere and garden ecosystem:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ padding: 16, background: '#fff', border: '1px solid var(--line)' }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Ico name="lock" size={16} /> Keep All Gates Closed
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                Kindly keep all boundary and entry gates closed at all times. Roaming cows and goats in the rural Auroville periphery can enter and damage the entire developing garden and fruit trees in moments.
              </div>
            </div>

            <div style={{ padding: 16, background: '#fff', border: '1px solid var(--line)' }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Ico name="shield" size={16} /> Swimming Pool Etiquette
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                Pool hours are <strong>7:00 AM – 8:00 PM</strong>. <strong>NO LIFEGUARD ON DUTY</strong>; swim at your own risk. Mandatory shower before entering. Synthetic swimwear required. Please use provided striped pool towels (room bath towels are strictly for room use). Children must be supervised.
              </div>
            </div>

            <div style={{ padding: 16, background: '#fff', border: '1px solid var(--line)' }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Ico name="sun" size={16} /> Clothes Drying Area
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                Please do not dry clothes or towels on the porch, balconies, or perimeter walls. A dedicated outdoor drying area with clotheslines is located on the second-floor terrace.
              </div>
            </div>

            <div style={{ padding: 16, background: '#fff', border: '1px solid var(--line)' }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Ico name="gift" size={16} /> Self-Service Kitchen &amp; Facilities
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                Common kitchen on 2nd floor includes induction cooking, microwave, cookware, and fridge. Guests are expected to wash and return utensils after use. Common laundry and small library are shared resources.
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: White Town Properties */}
        <div style={{ padding: 28, border: '1px solid var(--line)', background: 'var(--bg, #fff)', borderRadius: 'var(--radius, 4px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>3</span>
            <h2 className="tt-h3" style={{ margin: 0 }}>White Town Heritage Stays Guidelines</h2>
          </div>
          <ul style={{ margin: 0, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--text)', fontSize: 14, lineHeight: 1.55 }}>
            <li><strong>Residential Setting:</strong> Our White Town apartments (Madhubani 1, Madhubani 2, and 2BHK 1st Floor) are situated in the quiet French Quarter. Please observe quiet hours between 10:00 PM and 7:00 AM out of courtesy for neighborhood families.</li>
            <li><strong>Independent Floors:</strong> Guests enjoy private floor access with functional kitchens and balconies. Please turn off air conditioners, geysers, and appliances when stepping out for beach walks or dining.</li>
          </ul>
        </div>

        {/* Section 4: Prohibited Activities */}
        <div style={{ padding: 28, border: '1px solid var(--line)', background: '#fff5f5', borderRadius: 'var(--radius, 4px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#b42318', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>4</span>
            <h2 className="tt-h3" style={{ margin: 0, color: '#912018' }}>Strictly Prohibited Conduct &amp; Zero Tolerance</h2>
          </div>
          <ul style={{ margin: 0, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10, color: '#7a271a', fontSize: 14, lineHeight: 1.55 }}>
            <li><strong>No Smoking Indoors:</strong> 100% Smoke-Free. Smoking or vaping inside rooms, bathrooms, or enclosed premises is strictly prohibited. Smoking is allowed only in designated outdoor open zones. Violation incurs a ₹3,000 deep-cleaning fee.</li>
            <li><strong>No Illegal Drugs or Alcohol Abuse:</strong> Strictly no narcotics or illicit substances on any TTR property. Violation results in immediate eviction without refund and notification to local law enforcement authorities.</li>
            <li><strong>No Unregistered Parties:</strong> Commercial events, loud DJ systems, and unregistered overnight guests are strictly disallowed unless booked as an exclusive property buyout.</li>
            <li><strong>Maximum Room Capacities:</strong> Strictly enforced as per your reservation voucher. Extra undeclared guests cannot be accommodated.</li>
          </ul>
        </div>

        {/* Section 5: Damages & Liability */}
        <div style={{ padding: 28, border: '1px solid var(--line)', background: 'var(--bg, #fff)', borderRadius: 'var(--radius, 4px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>5</span>
            <h2 className="tt-h3" style={{ margin: 0 }}>Property Damage &amp; Personal Valuables Disclaimer</h2>
          </div>
          <ul style={{ margin: 0, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--text)', fontSize: 14, lineHeight: 1.55 }}>
            <li><strong>Damage &amp; Breakage:</strong> Guests are liable for any physical damage, stained linens, broken fixtures, or missing appliances during their stay. Replacement or repair costs will be billed directly.</li>
            <li><strong>Valuables Disclaimer:</strong> Guests are responsible for safeguarding their cash, jewellery, laptops, and personal belongings. TTR is not liable for loss or damage to personal items left unattended.</li>
            <li><strong>Communication During Stay:</strong> Messages and phone calls are the quickest way to reach us. For urgent or emergency needs, please call our 24/7 concierge directly.</li>
          </ul>
        </div>

      </div>

      {/* Footer Navigation */}
      <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <button className="tt-btn tt-btn-primary" onClick={() => go('cancellation')}>
          View Cancellation Policy
        </button>
        <button className="tt-btn tt-btn-ghost" onClick={() => go('privacy')}>
          View Privacy Policy
        </button>
      </div>
    </div>
  );
};


// ==========================================
// 3. PRIVACY POLICY SCREEN
// ==========================================
export const PrivacyScreen = ({ go, goBack }) => {
  return (
    <div className="tt-page" style={{ paddingTop: 32, paddingBottom: 96 }}>
      <BackButton onClick={goBack || (() => go('home'))} label="Back" />
      <div className="tt-breadcrumb" style={{ marginBottom: 24 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Home</span><span>/</span>
        <span style={{ color: 'var(--ink)' }}>Privacy Policy</span>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 840, marginBottom: 40 }}>
        <div className="tt-eyebrow">Data Protection</div>
        <h1 className="tt-h1" style={{ marginTop: 12, marginBottom: 16 }}>
          Privacy <span className="tt-italic-soft" style={{ color: 'var(--accent)' }}>Policy</span>
        </h1>
        <p style={{ color: 'var(--text-soft)', fontSize: 17, lineHeight: 1.65, margin: 0 }}>
          Your privacy is important to us. This policy details what data Temple And Thorpe Resorts collects, why we collect it, how it is safeguarded, and your rights as our guest.
        </p>
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 860 }}>
        <div style={{ padding: 24, border: '1px solid var(--line)', background: 'var(--bg, #fff)' }}>
          <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 10 }}>1. Information We Collect</h3>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            When you inquire, reserve, or stay with us, we collect:
          </p>
          <ul style={{ margin: '10px 0 0', paddingLeft: 20, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            <li>Contact Information: Full name, phone number, email address.</li>
            <li>Reservation Details: Check-in &amp; check-out dates, room type, guest count, and special stay requests.</li>
            <li>Statutory Identity Proof: Government-issued ID details (Aadhaar, Passport, Driving License) and Form C for international guests as mandated by Indian hotel regulations and local police departments.</li>
          </ul>
        </div>

        <div style={{ padding: 24, border: '1px solid var(--line)', background: 'var(--bg, #fff)' }}>
          <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 10 }}>2. How We Use Your Information</h3>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            <li>To confirm, process, and manage your accommodation bookings.</li>
            <li>To send stay itineraries, GPS directions, Wi-Fi credentials, and arrival instructions.</li>
            <li>To coordinate room cleaning, amenities, and concierge travel recommendations.</li>
            <li>To fulfill mandatory police registration laws and official guest register maintenance.</li>
          </ul>
        </div>

        <div style={{ padding: 24, border: '1px solid var(--line)', background: 'var(--bg, #fff)' }}>
          <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 10 }}>3. No Third-Party Data Selling</h3>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            We strictly do <strong>NOT</strong> sell, rent, or trade your personal information to third-party marketing companies, advertisers, or lead brokers. Your data is used exclusively for your stay with Temple And Thorpe Resorts.
          </p>
        </div>

        <div style={{ padding: 24, border: '1px solid var(--line)', background: 'var(--bg, #fff)' }}>
          <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 10 }}>4. Third-Party Booking Channels</h3>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            If you booked through Airbnb or Booking.com, personal information shared through those platforms is also governed by their respective privacy policies and security frameworks.
          </p>
        </div>

        <div style={{ padding: 24, border: '1px solid var(--line)', background: 'var(--bg, #fff)' }}>
          <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 10 }}>5. Data Security &amp; Contact</h3>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            We implement administrative and technical measures to protect your personal records. For any privacy queries or data correction requests, contact our privacy desk at: <strong>privacy@templeandthorperesorts.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 4. CONTACT HOST SCREEN
// ==========================================
export const ContactScreen = ({ go, goBack }) => {
  const [stayChoice, setStayChoice] = useState('nature');
  const [guestName, setGuestName] = useState('');
  const [guestMsg, setGuestMsg] = useState('');

  const sendWaInquiry = () => {
    const propertyLabel = stayChoice === 'nature'
      ? 'TEMPLEANDTHORPE NATURE RETREAT, NEAR AUROVILLE MATRIMANDIR'
      : 'White Town Properties (Pondicherry)';
    const text = `Hi, I am ${guestName || 'a guest'}. I would like to inquire about ${propertyLabel}. ${guestMsg ? 'Query: ' + guestMsg : ''}`;
    window.open(`https://api.whatsapp.com/send/?phone=0000000000&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`, '_blank');
  };

  return (
    <div className="tt-page" style={{ paddingTop: 32, paddingBottom: 96 }}>
      <BackButton onClick={goBack || (() => go('home'))} label="Back" />
      <div className="tt-breadcrumb" style={{ marginBottom: 24 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Home</span><span>/</span>
        <span style={{ color: 'var(--ink)' }}>Contact Host</span>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 840, marginBottom: 40 }}>
        <div className="tt-eyebrow">Reservations &amp; Support</div>
        <h1 className="tt-h1" style={{ marginTop: 12, marginBottom: 16 }}>
          Contact <span className="tt-italic-soft" style={{ color: 'var(--accent)' }}>Host &amp; Concierge</span>
        </h1>
        <p style={{ color: 'var(--text-soft)', fontSize: 17, lineHeight: 1.65, margin: 0 }}>
          Messages and calls are the best way to reach us. Whether you need booking recommendations, check-in directions, or urgent assistance during your stay, we're here to help.
        </p>
      </div>

      {/* Grid of Contact Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 48 }}>
        <div style={{ padding: 24, border: '1px solid var(--line)', background: 'var(--bg-soft)', borderRadius: 'var(--radius, 4px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico name="wa" size={18} />
            </span>
            <div style={{ fontWeight: 600, fontSize: 16 }}>WhatsApp Concierge</div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55, margin: '0 0 16px' }}>
            Instant chat for availability, room photos, custom itineraries, and pre-booking questions.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="tt-btn tt-btn-primary tt-btn-sm" style={{ width: '100%' }}>
            Chat on WhatsApp →
          </a>
        </div>

        <div style={{ padding: 24, border: '1px solid var(--line)', background: 'var(--bg-soft)', borderRadius: 'var(--radius, 4px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico name="phone" size={18} />
            </span>
            <div style={{ fontWeight: 600, fontSize: 16 }}>Phone Helpline</div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55, margin: '0 0 16px' }}>
            Available 24/7 for in-house emergencies and 8:00 AM – 9:00 PM for general bookings.
          </p>
          <a href="tel:+910000000000" className="tt-btn tt-btn-ghost tt-btn-sm" style={{ width: '100%' }}>
            +91-0000000000
          </a>
        </div>

        <div style={{ padding: 24, border: '1px solid var(--line)', background: 'var(--bg-soft)', borderRadius: 'var(--radius, 4px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico name="pin" size={18} />
            </span>
            <div style={{ fontWeight: 600, fontSize: 16 }}>Locations</div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            <div><strong>Nature Retreat:</strong> Near Auroville Matrimandir, Kuilapalayam / Periphery.</div>
            <div style={{ marginTop: 6 }}><strong>White Town:</strong> French Quarter, 100m from Promenade Beach, Pondicherry.</div>
          </div>
        </div>
      </div>

      {/* Quick Direct Message Form */}
      <div style={{ maxWidth: 680, padding: 32, border: '1px solid var(--line)', background: 'var(--bg, #fff)', borderRadius: 'var(--radius, 4px)' }}>
        <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 8 }}>Send an Inquiry to the Host</h3>
        <p style={{ fontSize: 14, color: 'var(--text-soft)', marginBottom: 24 }}>
          Fill in your details below and click Send to open WhatsApp with your pre-formatted query.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Select Property</label>
            <select
              value={stayChoice}
              onChange={e => setStayChoice(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 'var(--radius, 4px)', background: '#fff', fontSize: 14 }}
            >
              <option value="nature">TEMPLEANDTHORPE NATURE RETREAT, NEAR AUROVILLE MATRIMANDIR</option>
              <option value="whitetown1">White Town 1BHK - 1st Floor (Madhubani 1)</option>
              <option value="whitetown2">White Town 1BHK - 2nd Floor (Madhubani 2)</option>
              <option value="whitetown2bhk">White Town 2BHK - 1st Floor (Rajasthani Decor)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Your Name</label>
            <input
              type="text"
              placeholder="e.g. Priya Sharma"
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 'var(--radius, 4px)', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Your Message / Dates / Questions</label>
            <textarea
              rows={4}
              placeholder="e.g. Planning a visit next weekend with family. Are ground floor rooms available?"
              value={guestMsg}
              onChange={e => setGuestMsg(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 'var(--radius, 4px)', fontSize: 14, resize: 'vertical' }}
            />
          </div>

          <button className="tt-btn tt-btn-primary" onClick={sendWaInquiry} style={{ marginTop: 8 }}>
            <Ico name="wa" size={16} /> Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 5. SITEMAP SCREEN
// ==========================================
export const SitemapScreen = ({ go, goBack }) => {
  return (
    <div className="tt-page" style={{ paddingTop: 32, paddingBottom: 96 }}>
      <BackButton onClick={goBack || (() => go('home'))} label="Back" />
      <div className="tt-breadcrumb" style={{ marginBottom: 24 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Home</span><span>/</span>
        <span style={{ color: 'var(--ink)' }}>Sitemap</span>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 840, marginBottom: 40 }}>
        <div className="tt-eyebrow">Directory</div>
        <h1 className="tt-h1" style={{ marginTop: 12, marginBottom: 16 }}>
          Website <span className="tt-italic-soft" style={{ color: 'var(--accent)' }}>Sitemap</span>
        </h1>
        <p style={{ color: 'var(--text-soft)', fontSize: 17, lineHeight: 1.65, margin: 0 }}>
          Quick index of all pages, properties, room profiles, curated experiences, and policies across Temple And Thorpe Resorts.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
        {/* Main Pages */}
        <div style={{ padding: 24, border: '1px solid var(--line)', background: 'var(--bg-soft)' }}>
          <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 16 }}>Main Pages</h3>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <li><a style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 500 }} onClick={() => go('home')}>Home Page</a></li>
            <li><a style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 500 }} onClick={() => go('search')}>Explore Stays (All Properties)</a></li>
            <li><a style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 500 }} onClick={() => go('retreat')}>TEMPLEANDTHORPE Nature Retreat Page</a></li>
            <li><a style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 500 }} onClick={() => go('events')}>Curated Retreat Events</a></li>
            <li><a style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 500 }} onClick={() => go('things')}>Things to Do &amp; Activities</a></li>
            <li><a style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 500 }} onClick={() => go('loyalty')}>Wayfarer Rewards</a></li>
            <li><a style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 500 }} onClick={() => go('cause')}>Travel for a Cause</a></li>
          </ul>
        </div>

        {/* Accommodations */}
        <div style={{ padding: 24, border: '1px solid var(--line)', background: 'var(--bg-soft)' }}>
          <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 16 }}>Properties &amp; Rooms</h3>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            {TT_DATA.properties.map(p => (
              <li key={p.id}>
                <a style={{ cursor: 'pointer', color: 'var(--ink)' }} onClick={() => go('property', { propertyId: p.id })}>
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Policy */}
        <div style={{ padding: 24, border: '1px solid var(--line)', background: 'var(--bg-soft)' }}>
          <h3 className="tt-h3" style={{ marginTop: 0, marginBottom: 16 }}>Help &amp; Legal Policies</h3>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <li><a style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 500 }} onClick={() => go('cancellation')}>Cancellation &amp; Refund Policy</a></li>
            <li><a style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 500 }} onClick={() => go('terms')}>Terms and Conditions &amp; House Rules</a></li>
            <li><a style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 500 }} onClick={() => go('privacy')}>Privacy Policy</a></li>
            <li><a style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 500 }} onClick={() => go('contact')}>Contact Host &amp; Concierge</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
