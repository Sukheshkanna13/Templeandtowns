import React, { useState, useMemo, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Ico, StripeImg, tt } from './shell';
import { TT_DATA } from '../data';
import { useResortData } from '../dataStore';

// ---------- Hero Section Slides (2 images crossfading every 4s with 0.5s transition) ----------
const HERO_SLIDES = [
  {
    desktopWebp: 'images/hero/hero-desktop.webp',
    desktopJpg: 'images/hero/hero-desktop.jpg',
    mobileWebp: 'images/hero/hero-mobile.webp',
    mobileJpg: 'images/hero/hero-mobile.jpg',
    alt: 'Temple And Thorpe Resorts Nature Retreat — garden pavilion and lily pond at sunset',
    className: 'tt-hero-slide-1',
  },
  {
    desktopJpg: 'images/hero-2.jpg',
    mobileJpg: 'images/hero-2.jpg',
    alt: 'Temple And Thorpe Resorts Nature Retreat — illuminated night garden, gazebo and pathway',
    className: 'tt-hero-slide-2',
  },
];

// ---------- Property Carousel Component ----------
// Supports: arrow buttons (desktop + mobile) + touch swipe (mobile)
const PropertyCarousel = ({ p, go }) => {
  const [idx, setIdx] = useState(0);
  const imgs = p.images || [p.cover];
  const touchRef = useRef({ startX: 0, startY: 0, isDragging: false });
  const [dragOffset, setDragOffset] = useState(0);

  const next = (e) => { e.stopPropagation(); setIdx((idx + 1) % imgs.length); };
  const prev = (e) => { e.stopPropagation(); setIdx((idx - 1 + imgs.length) % imgs.length); };

  // Touch swipe handlers for inner card photos
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    touchRef.current = { startX: touch.clientX, startY: touch.clientY, isDragging: true };
    setDragOffset(0);
  };

  const onTouchMove = (e) => {
    if (!touchRef.current.isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchRef.current.startX;
    const dy = touch.clientY - touchRef.current.startY;

    // If vertical scroll is dominant, bail out
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dx) < 10) {
      return;
    }

    if (Math.abs(dx) > 10) {
      e.stopPropagation();
    }

    // Rubber-band effect at edges: dampen drag when at first/last image
    let offset = dx;
    if ((idx === 0 && dx > 0) || (idx === imgs.length - 1 && dx < 0)) {
      offset = dx * 0.3;
    }
    setDragOffset(offset);
  };

  const onTouchEnd = () => {
    if (!touchRef.current.isDragging) return;
    touchRef.current.isDragging = false;

    const threshold = 40; // px needed to trigger slide change
    if (dragOffset < -threshold && idx < imgs.length - 1) {
      setIdx(idx + 1);
    } else if (dragOffset > threshold && idx > 0) {
      setIdx(idx - 1);
    }
    setDragOffset(0);
  };

  const trackTransform = `translateX(calc(-${idx * 100}% + ${dragOffset}px))`;
  const trackTransition = dragOffset !== 0 ? 'none' : undefined;

  const onBookNow = (e) => {
    e.stopPropagation();
    if (p.bookingUrl) {
      window.open(p.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      go('property', { propertyId: p.id });
    }
  };

  return (
    <div className="tt-card" onClick={() => go('property', { propertyId: p.id })}>
      <div
        className="tt-card-media"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="tt-slider-track"
          style={{
            transform: trackTransform,
            ...(trackTransition ? { transition: trackTransition } : {}),
          }}
        >
          {imgs.map((src, i) => (
            <img key={i} src={src} alt={p.name} className="tt-slider-img" loading="lazy" />
          ))}
        </div>
        
        {/* SLIDER CONTROLS — visible on hover (desktop) and mobile */}
        <button className="tt-slider-btn prev" onClick={prev} aria-label="Previous photo">
          <Ico name="arrowL" size={14} />
        </button>
        <button className="tt-slider-btn next" onClick={next} aria-label="Next photo">
          <Ico name="arrow" size={14} />
        </button>

        {/* DOTS */}
        <div className="tt-slider-dots">
          {imgs.slice(0, Math.min(imgs.length, 12)).map((_, i) => (
            <div key={i} className={`tt-dot ${i === idx ? 'active' : ''}`} />
          ))}
        </div>

        {/* Top Tags matching revised design: left tags + right rating */}
        <div className="tt-card-tags">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="tt-tag">{p.city === 'pondicherry' ? 'White Town' : 'Near Auroville'}</span>
            <span className="tt-tag tt-tag-dark">Self-Service</span>
          </div>
          <span className="tt-tag tt-tag-dark">★ {p.rating}</span>
        </div>
      </div>

      <div className="tt-card-body">
        <div className="tt-card-row" style={{ alignItems: 'flex-start', gap: 12 }}>
          <span className="tt-card-name" style={{ fontSize: 16, lineHeight: 1.35, fontWeight: 600 }}>
            {p.name}
          </span>
          <button className="tt-btn-card-cta" onClick={onBookNow}>
            Book now
          </button>
        </div>
        <div className="tt-card-area" style={{ marginTop: 6, fontSize: 13, color: 'var(--text-soft)' }}>
          {p.area}
        </div>
      </div>
    </div>
  );
};

// ---------- Generic infinite slow-flow carousel (reliable auto-scroll, drag, arrows, pause on hover/touch) ----------
const FlowCarousel = forwardRef(({ items, renderItem, wrapClass, trackClass, slotClass, step = 374, autoScroll = true }, ref) => {
  const scrollRef = useRef(null);
  const posRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  // Triple duplicated list for seamless wrap on wide screens
  const displayList = useMemo(() => [...items, ...items, ...items], [items]);

  // Continuous auto-scroll loop with subpixel precision (~36px/second)
  useEffect(() => {
    if (!autoScroll) return;
    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min(now - lastTime, 64);
      lastTime = now;

      const el = scrollRef.current;
      if (!isPausedRef.current && el && !isDraggingRef.current) {
        posRef.current += 0.036 * dt;

        if (el.children.length >= items.length * 2) {
          const child0 = el.children[0];
          const childN = el.children[items.length];
          if (child0 && childN) {
            const cycleWidth = childN.offsetLeft - child0.offsetLeft;
            if (cycleWidth > 0) {
              if (posRef.current >= cycleWidth) {
                posRef.current -= cycleWidth;
                el.scrollLeft -= cycleWidth;
              } else if (posRef.current < 0) {
                posRef.current += cycleWidth;
                el.scrollLeft += cycleWidth;
              }
            }
          }
        }
        el.scrollLeft = Math.floor(posRef.current);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [items.length, autoScroll]);

  const pause = () => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const resumeAfter = (ms = 1400) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (scrollRef.current) {
        posRef.current = scrollRef.current.scrollLeft;
      }
      isPausedRef.current = false;
    }, ms);
  };

  useImperativeHandle(ref, () => ({
    prev: () => {
      pause();
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -step, behavior: 'smooth' });
        posRef.current = Math.max(0, scrollRef.current.scrollLeft - step);
      }
      resumeAfter(2400);
    },
    next: () => {
      pause();
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
        posRef.current = scrollRef.current.scrollLeft + step;
      }
      resumeAfter(2400);
    },
  }));

  // Sync position on native scroll (e.g. mobile horizontal swipe or trackpad)
  const onNativeScroll = () => {
    if (isPausedRef.current || isDraggingRef.current) {
      if (scrollRef.current) {
        posRef.current = scrollRef.current.scrollLeft;
      }
    }
  };

  const handleTouchStart = () => {
    pause();
  };

  const handleTouchEnd = () => {
    if (scrollRef.current) {
      posRef.current = scrollRef.current.scrollLeft;
    }
    resumeAfter(1600);
  };

  const handleMouseEnter = () => {
    pause();
  };

  const handleMouseLeave = () => {
    if (scrollRef.current) {
      posRef.current = scrollRef.current.scrollLeft;
    }
    resumeAfter(800);
  };

  // Mouse Drag Handlers
  const onMouseDown = (e) => {
    if (e.button !== 0 || e.target.closest('button')) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    pause();
  };

  const onMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    posRef.current = scrollRef.current.scrollLeft;
  };

  const onMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      if (scrollRef.current) {
        posRef.current = scrollRef.current.scrollLeft;
      }
      resumeAfter(1200);
    }
  };

  return (
    <div
      className={wrapClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={trackClass}
        ref={scrollRef}
        onScroll={onNativeScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
      >
        {displayList.map((item, index) => (
          <div
            key={index}
            className={slotClass}
            aria-hidden={index >= items.length ? true : undefined}
            onClickCapture={(e) => {
              if (hasDraggedRef.current) {
                e.stopPropagation();
              }
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
});

// ---------- Real-Time Rooms Infinite Carousel ----------
const RealtimeRoomsCarousel = forwardRef(({ properties, go, autoScroll = true }, ref) => (
  <FlowCarousel
    ref={ref}
    items={properties}
    renderItem={(p) => <PropertyCarousel p={p} go={go} />}
    wrapClass="tt-realtime-carousel-wrap"
    trackClass="tt-realtime-carousel-track"
    slotClass="tt-realtime-card-slot"
    step={374}
    autoScroll={autoScroll}
  />
));

// ---------- Featured Stays Section with Arrow Nav & Infinite Loop Track ----------
const FeaturedStaysSection = ({ go }) => {
  const carouselRef = useRef(null);
  const data = useResortData();
  const autoScroll = data.homepage?.autoScrollStays !== false;

  // Ordered real-time rooms matching revised design screenshot:
  // Nature Retreat rooms first (p5, p7, p8, p6), then White Town stays (p1, p2, p3), then retreat p4
  const rooms = useMemo(() => {
    const order = ['p5', 'p7', 'p8', 'p6', 'p1', 'p2', 'p3', 'p4'];
    const properties = data.properties || TT_DATA.properties;
    const map = new Map(properties.map(p => [p.id, p]));
    const list = order.map(id => map.get(id)).filter(Boolean);
    properties.forEach(p => {
      if (!list.includes(p)) list.push(p);
    });
    return list;
  }, [data.properties]);

  return (
    <section className="tt-section" style={{ paddingBottom: 24 }}>
      <div className="tt-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="tt-eyebrow" style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 12 }}>
              Featured stays
            </div>
            <h2 className="tt-h2" style={{ marginTop: 12, marginBottom: 0 }}>
              Hand-picked, this season.
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                className="tt-carousel-arrow-btn"
                onClick={() => carouselRef.current?.prev()}
                aria-label="Previous stays"
                title="Previous stays"
              >
                <Ico name="arrowL" size={14} />
              </button>
              <button
                className="tt-carousel-arrow-btn"
                onClick={() => carouselRef.current?.next()}
                aria-label="Next stays"
                title="Next stays"
              >
                <Ico name="arrow" size={14} />
              </button>
            </div>
            <button className="tt-btn-link" onClick={() => go('search')} style={{ fontSize: 14 }}>
              See all stays →
            </button>
          </div>
        </div>
      </div>

      <RealtimeRoomsCarousel ref={carouselRef} properties={rooms} go={go} autoScroll={autoScroll} />
    </section>
  );
};

// ---------- Moments Carousel — dynamic with touch pause, custom links & admin sync ----------
const MOMENTS = [
  { id: 'm1', label: 'pottery', cap: 'Pottery, Near Auroville', img: 'images/pottery.png', link: 'https://www.instagram.com/reel/', type: 'photo' },
  { id: 'm2', label: 'sea-evening', cap: 'Promenade, dusk', img: 'images/sea-evening.png', link: 'https://www.instagram.com/reel/', type: 'photo' },
  { id: 'm3', label: 'morning-yoga', cap: 'Yoga Near Auroville', img: 'images/morning-yoga.png', link: 'https://www.instagram.com/reel/', type: 'photo' },
  { id: 'm4', label: 'banyan-tree', cap: 'Nature walks in Auroville', img: 'images/banyan-tree.png', link: 'https://www.instagram.com/reel/', type: 'photo' },
  { id: 'm5', label: 'street-food', cap: 'White Town evenings', img: 'images/street-food.png', link: 'https://www.instagram.com/reel/', type: 'photo' },
];

const MomentsCarousel = () => {
  const data = useResortData();
  const [isPaused, setIsPaused] = useState(false);
  const autoScroll = data.homepage?.autoScrollMoments !== false;
  const list = (data.moments && data.moments.length > 0) ? data.moments : MOMENTS;

  const renderItem = (m, keyPrefix) => {
    const imgSrc = m.img || (m.label ? `images/${m.label}.png` : '');
    const handleClick = () => {
      if (m.link) {
        window.open(m.link, '_blank', 'noopener,noreferrer');
      }
    };

    return (
      <div
        key={`${keyPrefix}-${m.id || m.label}`}
        className="tt-moments-carousel-item"
        style={{ cursor: m.link ? 'pointer' : 'default' }}
        onClick={handleClick}
        title={m.link ? `Open ${m.cap}` : m.cap}
      >
        <img
          src={imgSrc}
          alt={m.cap}
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.45) 100%)', zIndex: 1 }} />
        <span className="tt-moment-cap">{m.cap}</span>
      </div>
    );
  };

  return (
    <div
      className="tt-moments-carousel-container"
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="tt-moments-carousel-track"
        style={{
          animationPlayState: (!autoScroll || isPaused) ? 'paused' : 'running',
          ...(!autoScroll ? { animation: 'none', display: 'flex', overflowX: 'auto', gap: 16 } : {})
        }}
      >
        <div className="tt-moments-carousel-group">
          {list.map((m) => renderItem(m, 'grp1'))}
        </div>
        {autoScroll && (
          <div className="tt-moments-carousel-group" aria-hidden="true">
            {list.map((m) => renderItem(m, 'grp2'))}
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- Guest Reviews Section — sliding carousel with compact boxes & "See more" expansion ----------
const GuestReviewsSection = () => {
  const carouselRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const data = useResortData();

  // Newest first; add `initial` for the avatar.
  const reviews = useMemo(
    () => (data.reviews || TT_DATA.reviews).map((rv) => ({ ...rv, initial: (rv.name || 'G').trim().charAt(0).toUpperCase() })),
    [data.reviews]
  );

  return (
    <section className="tt-section" style={{ paddingTop: 32, paddingBottom: 56 }}>
      <div className="tt-page">
        <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="tt-eyebrow" style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 12 }}>
              Guest reviews
            </div>
            <h2 className="tt-h2" style={{ marginTop: 12, marginBottom: 0 }}>
              What guests are saying
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              className="tt-carousel-arrow-btn"
              onClick={() => carouselRef.current?.prev()}
              aria-label="Previous reviews"
              title="Previous reviews"
            >
              <Ico name="arrowL" size={14} />
            </button>
            <button
              className="tt-carousel-arrow-btn"
              onClick={() => carouselRef.current?.next()}
              aria-label="Next reviews"
              title="Next reviews"
            >
              <Ico name="arrow" size={14} />
            </button>
          </div>
        </div>
      </div>

      <FlowCarousel
        ref={carouselRef}
        items={reviews}
        wrapClass="tt-reviews-scroll-container"
        trackClass="tt-reviews-track"
        slotClass="tt-review-slot"
        step={360}
        renderItem={(rv) => (
          <div className={`tt-review-card ${expanded ? 'expanded' : 'compact'}`}>
            <div className="tt-review-card-header">
              <div className="tt-review-author-wrap">
                <div className="tt-review-avatar">{rv.initial}</div>
                <div className="tt-review-meta">
                  <div className="tt-review-author">{rv.name}</div>
                  <div className="tt-review-date">
                    {rv.badge ? `${rv.badge} · ` : ''}{rv.when}
                  </div>
                </div>
              </div>
              <div className="tt-review-stars">
                {Array.from({ length: rv.rating || 5 }).map((_, si) => (
                  <Ico key={si} name="star" size={13} />
                ))}
              </div>
            </div>

            <p className="tt-review-text">{rv.text}</p>
          </div>
        )}
      />

      {/* "See more" trigger button at bottom to pump down / expand all comment boxes */}
      <div className="tt-page" style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
        <button
          className="tt-btn-reviews-expand"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? 'See less' : 'See more'}
          <span className={`tt-expand-chevron ${expanded ? 'open' : ''}`}>
            <Ico name="arrow" size={12} />
          </span>
        </button>
      </div>
    </section>
  );
};

// ---------- HOME SCREEN ----------
const HomeScreen = ({ go, setSearchCtx }) => {
  const [city, setCity] = useState('Both cities');
  const [checkIn, setCheckIn] = useState(tt.todayISO(1));
  const [checkOut, setCheckOut] = useState(tt.todayISO(4));
  const [guests, setGuests] = useState('2 guests · 1 room');

  const resortData = useResortData();
  const hp = resortData.homepage || {};
  const heroLine1 = hp.heroLine1 ?? 'TEMPLEANDTHORPE NATURE RETREAT,';
  const heroLine2 = hp.heroLine2 ?? 'NEAR AUROVILLE MATRIMANDIR';
  const holdSeconds = Math.max(1, Number(hp.holdSeconds) || 10);
  const fadeSeconds = Math.max(0.2, Number(hp.fadeSeconds) || 1.2);

  const heroSlides = (hp.heroSlides && hp.heroSlides.length > 0) ? hp.heroSlides : HERO_SLIDES;

  // Hero section fading images with dynamic hold time and fade time
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroSlides.length);
    }, holdSeconds * 1000);
    return () => clearInterval(timer);
  }, [holdSeconds, heroSlides.length]);

  const submit = () => { setSearchCtx({ city, checkIn, checkOut, guests }); go('search'); };

  return (
    <>
      {/* HERO — Full Bleed Marriott style with dynamic slide crossfade */}
      <section className="tt-hero-full">
        <div className="tt-hero-slides-wrap">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className={`tt-hero-slide ${slide.className || ''} ${i === heroIdx ? 'active' : ''}`}
              style={{ transition: `opacity ${fadeSeconds}s ease-in-out` }}
            >
              <picture>
                {slide.mobileWebp && <source media="(max-width: 768px)" srcSet={slide.mobileWebp} type="image/webp" />}
                {slide.mobileJpg && <source media="(max-width: 768px)" srcSet={slide.mobileJpg} />}
                {slide.desktopWebp && <source srcSet={slide.desktopWebp} type="image/webp" />}
                <img
                  src={slide.desktopJpg}
                  alt={slide.alt || 'Temple And Thorpe Resorts'}
                  className="tt-hero-bg-full"
                  fetchpriority={i === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              </picture>
            </div>
          ))}
        </div>

        <div className="tt-hero-overlay-white" />

        {/* Top middle: floating search pill showcasing stays redirect (matching exact screenshot & git logs) */}
        <div className="tt-hero-sticky-pill">
          <div
            className="tt-nav-search-pill"
            onClick={() => go('search')}
            role="button"
            tabIndex={0}
            aria-label="Search stays"
          >
            <div className="pill-content">
              <div className="cell">
                <span className="lbl">WHERE TO?</span>
                <span className="val">{city}</span>
              </div>
              <div className="sep" />
              <div className="cell">
                <span className="lbl">CHECK IN</span>
                <span className="val">{tt.fmtDate(checkIn)}</span>
              </div>
              <div className="sep" />
              <div className="cell">
                <span className="lbl">CHECK OUT</span>
                <span className="val">{tt.fmtDate(checkOut)}</span>
              </div>
            </div>
            <div className="search-icon-circle">
              <Ico name="search" size={16} />
            </div>
          </div>
        </div>

        {/* Bottom of hero: resort title text at bottom of main page */}
        <div className="tt-hero-caption-wrap">
          <h1 className="tt-hero-resort-title">
            {heroLine1}
            {heroLine2 ? <><br />{heroLine2}</> : null}
          </h1>
        </div>
      </section>

      {/* 1. FEATURED STAYS — Infinite Looping Real-Time Rooms Carousel + Navigation */}
      <FeaturedStaysSection go={go} />

      {/* 2. MOMENTS — Interactive Carousel with touch pause + drag scroll */}
      <section className="tt-section" style={{ overflow: 'hidden', paddingTop: 24, paddingBottom: 40 }}>
        <div className="tt-page">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, gap: 24, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 620 }}>
              <h2 className="tt-h2" style={{ margin: 0 }}>Moments from our vacation.</h2>
            </div>
            <button className="tt-btn-link" onClick={() => go('search')}>See all stays →</button>
          </div>
        </div>

        <MomentsCarousel />
      </section>

      {/* 3. GUEST REVIEWS — Horizontal Review Cards Carousel */}
      <GuestReviewsSection />

      {/* 4. DARK FEATURED JOURNEYS */}
      <section className="tt-section-sm">
        <div className="tt-page">
          <div className="tt-dark-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, gap: 24, flexWrap: 'wrap' }}>
              <div>
                <div className="tt-eyebrow">FEATURED STAYS</div>
                <h2 className="tt-h2" style={{ marginTop: 14, marginBottom: 14 }}>Hand-picked, this season.</h2>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55 }}>Coming Soon..</p>
              </div>
              <button className="tt-btn-link" onClick={() => go('search')}>Explore stays →</button>
            </div>
            <div className="tt-journey-grid">
              {[
                { cat: 'Retreat', title: 'Mangroove', loc: 'Pondicherry', label: 'nature' },
                { cat: 'Heritage', title: 'Coastline', loc: 'White-Town', label: 'coastal' },
                { cat: 'Culture', title: 'Culture', loc: 'Near Auroville Matrimandir', label: 'temple' },
              ].map(j => (
                <div key={j.title} className="tt-journey">
                  <img src={`images/${j.label}.png`} alt={j.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)', zIndex: 1 }} />
                  <span className="tt-journey-cat">{j.cat}</span>
                  <div className="tt-journey-body">
                    <div className="tt-journey-title">{j.title}</div>
                    <div className="tt-journey-loc">{j.loc}</div>
                    <div className="tt-journey-link">Coming Soon <Ico name="arrow" size={14} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="tt-section" style={{ paddingTop: 0 }}>
        <div className="tt-page">
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 80, textAlign: 'center' }}>
            <div style={{ maxWidth: 640, margin: '0 auto' }}>
              <div className="tt-eyebrow">HOW BOOKING WORKS</div>
              <h2 className="tt-h2" style={{ marginTop: 14 }}>Explore, Request, Stay.</h2>
              <p style={{ color: 'var(--text-soft)', marginTop: 16, fontSize: 17, lineHeight: 1.6 }}>
                Our curated stays offer a personalized booking experience. Connect with us directly to ensure your stay is perfectly tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WAYFARER REWARDS */}
      <section className="tt-section-sm" style={{ paddingTop: 0 }}>
        <div className="tt-page">
          <div className="tt-loyalty-teaser" style={{ background: 'var(--bg-soft)', color: 'var(--ink)', padding: '64px 56px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'center', border: '1px solid var(--line)' }}>
            <div>
              <div className="tt-eyebrow">WAYFARER REWARDS</div>
              <h2 className="tt-h2" style={{ marginTop: 14, marginBottom: 16 }}>
                Stay more, earn more.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-soft)', lineHeight: 1.55, maxWidth: 480, margin: 0 }}>
                Earn points every night. Unlock early check-ins, room upgrades, and exclusive rates. Our guests earn points from their very first stay.
              </p>
              <button onClick={() => go('loyalty')}
                style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 32, padding: '18px 34px', background: 'var(--ink)', color: '#fff', fontSize: 16, fontWeight: 600 }}>
                Explore Rewards <Ico name="arrow" size={15} />
              </button>
            </div>
            <div>
              {[
                { tier: 'Bronze', range: '0 – 499 pts', perks: 'Coming soon' },
                { tier: 'Silver', range: '500 – 1999 pts', perks: 'Coming soon' },
                { tier: 'Gold', range: '2000+ pts', perks: 'Coming soon' },
              ].map(t => (
                <div key={t.tier} style={{ borderTop: '1px solid var(--line-strong)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 17 }}>{t.tier}</div>
                    <div className="tt-muted" style={{ fontSize: 13, marginTop: 2 }}>{t.range}</div>
                  </div>
                  <div className="tt-muted" style={{ fontSize: 13 }}>{t.perks}</div>
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
