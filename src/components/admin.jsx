import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Ico, tt } from './shell';
import { useResortData, setLiveResortData } from '../dataStore';

const FIXED_ADMIN_PASS = 'techno-temple';

export const AdminScreen = ({ go }) => {
  const storeData = useResortData();
  const [data, setData] = useState(() => JSON.parse(JSON.stringify(storeData)));

  // Sync internal state when external dataStore changes (if not actively editing)
  useEffect(() => {
    setData(JSON.parse(JSON.stringify(storeData)));
  }, [storeData]);

  // Authentication: Fixed password 'techno-temple' (no user ID)
  const [authed, setAuthed] = useState(() => {
    return sessionStorage.getItem('tt_admin_authed') === 'true';
  });
  const [passInput, setPassInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active navigation section
  const [activeTab, setActiveTab] = useState('homepage'); // 'homepage' matches screenshot default

  // Status & notifications
  const [statusMsg, setStatusMsg] = useState(null); // { type: 'success'|'error'|'info', text: string }
  const [isSaving, setIsSaving] = useState(false);

  // Stays management state
  const [filterCity, setFilterCity] = useState('all');
  const [staysSearch, setStaysSearch] = useState('');
  const [editingRoom, setEditingRoom] = useState(null);
  const [isNewRoom, setIsNewRoom] = useState(false);

  // Homepage live preview state
  const [previewSlideIdx, setPreviewSlideIdx] = useState(0);
  const [previewSecondsLeft, setPreviewSecondsLeft] = useState(10);

  // File upload input ref for direct photo uploading
  const fileInputRef = useRef(null);
  const [uploadTarget, setUploadTarget] = useState(null); // { type: 'roomCover' | 'roomGallery' | 'moment', targetId?: string }

  const showToast = (text, type = 'success') => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 5000);
  };

  // Login handler
  const handleLogin = (e) => {
    e?.preventDefault();
    if (passInput.trim() === FIXED_ADMIN_PASS) {
      sessionStorage.setItem('tt_admin_authed', 'true');
      setAuthed(true);
      setAuthError('');
      showToast('Welcome to Temple & Thorpe Admin Portal', 'info');
    } else {
      setAuthError('Incorrect password. Please enter the correct admin password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tt_admin_authed');
    setAuthed(false);
    setEditingRoom(null);
  };

  // Live save to Hostinger PHP server with data.json writing
  const handleSaveChanges = async () => {
    setIsSaving(true);
    setStatusMsg({ type: 'info', text: 'Saving changes live to server...' });

    // Update client reactive state & localStorage immediately
    setLiveResortData(data);

    try {
      const response = await fetch('./api/save.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: FIXED_ADMIN_PASS,
          payload: data,
        }),
      });

      if (response.ok) {
        const resJson = await response.json();
        if (resJson.success) {
          showToast('✅ Saved live to server! Website is updated.', 'success');
          setIsSaving(false);
          return;
        }
      }
      // If server returned non-200 or wasn't reachable (e.g., local dev)
      showToast('💾 Saved in local storage! For FileZilla deployment, click "Download data.json".', 'info');
    } catch (err) {
      // Offline or local development fallback
      showToast('💾 Saved locally! Click "Download data.json" to upload via FileZilla.', 'info');
    } finally {
      setIsSaving(false);
    }
  };

  // Download data.json backup for manual FileZilla upload
  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('📥 data.json downloaded! Drag and drop into public_html/ via FileZilla.', 'success');
  };

  // Homepage slideshow preview ticker
  const hpData = data.homepage || {};
  const holdTime = Math.max(1, Number(hpData.holdSeconds) || 10);
  const fadeTime = Math.max(0.2, Number(hpData.fadeSeconds) || 1.2);
  const heroSlides = hpData.heroSlides && hpData.heroSlides.length > 0
    ? hpData.heroSlides
    : [
        { desktopJpg: 'images/hero/hero-desktop.jpg', alt: 'Garden pavilion' },
        { desktopJpg: 'images/hero-2.jpg', alt: 'Lush greenery' },
      ];

  useEffect(() => {
    if (activeTab !== 'homepage' || heroSlides.length <= 1) return;
    setPreviewSecondsLeft(holdTime);

    const countdown = setInterval(() => {
      setPreviewSecondsLeft((prev) => {
        if (prev <= 1) {
          setPreviewSlideIdx((idx) => (idx + 1) % heroSlides.length);
          return holdTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [activeTab, holdTime, heroSlides.length]);

  // Image file upload handler (converts to base64 & uploads to server or local data URL)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    showToast('Uploading image...', 'info');
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;

      try {
        const res = await fetch('./api/save.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            password: FIXED_ADMIN_PASS,
            action: 'upload_image',
            base64,
            filename: file.name,
          }),
        });

        if (res.ok) {
          const resJson = await res.json();
          if (resJson.success && resJson.url) {
            applyUploadedImageUrl(resJson.url);
            showToast('✅ Photo uploaded directly to server!', 'success');
            return;
          }
        }
      } catch (err) {
        // Fallback to data URL
      }

      applyUploadedImageUrl(base64);
      showToast('Image applied! Click "Save changes" to persist.', 'success');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const applyUploadedImageUrl = (imgUrl) => {
    if (!uploadTarget) return;

    if (uploadTarget.type === 'roomCover' && editingRoom) {
      setEditingRoom((prev) => ({
        ...prev,
        cover: imgUrl,
        images: prev.images?.includes(imgUrl) ? prev.images : [imgUrl, ...(prev.images || [])],
      }));
    } else if (uploadTarget.type === 'roomGallery' && editingRoom) {
      setEditingRoom((prev) => ({
        ...prev,
        images: [...(prev.images || []), imgUrl],
      }));
    } else if (uploadTarget.type === 'moment' && uploadTarget.targetId) {
      setData((prev) => {
        const moments = (prev.moments || []).map((m) =>
          m.id === uploadTarget.targetId ? { ...m, img: imgUrl } : m
        );
        return { ...prev, moments };
      });
    } else if (uploadTarget.type === 'heroSlide') {
      setData((prev) => {
        const hp = { ...prev.homepage };
        const slides = [...(hp.heroSlides || heroSlides), { desktopJpg: imgUrl, alt: 'Custom slide' }];
        return { ...prev, homepage: { ...hp, heroSlides: slides } };
      });
    }
    setUploadTarget(null);
  };

  // Filtered properties for Stays tab
  const filteredStays = useMemo(() => {
    let list = data.properties || [];
    if (filterCity !== 'all') {
      list = list.filter((p) => p.city === filterCity);
    }
    if (staysSearch.trim()) {
      const q = staysSearch.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.area && p.area.toLowerCase().includes(q)) ||
          (p.bookingUrl && p.bookingUrl.toLowerCase().includes(q))
      );
    }
    return list;
  }, [data.properties, filterCity, staysSearch]);

  // LOGIN SCREEN
  if (!authed) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0a1628', margin: '0 0 6px 0' }}>
              Temple & Thorpe
            </h1>
            <div style={{ fontSize: 13, color: '#64748b', letterSpacing: '0.04em' }}>
              ADMIN PORTAL
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 20 }}>
              <label style={styles.fieldLabel}>ADMIN PASSWORD</label>
              <input
                type="password"
                placeholder="Enter password..."
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                autoFocus
                style={styles.textInput}
              />
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
                Fixed authentication password: <strong>techno-temple</strong>
              </div>
            </div>

            {authError && (
              <div style={styles.errorNotice}>
                {authError}
              </div>
            )}

            <button type="submit" style={styles.primaryBtnFull}>
              Sign In to Portal
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button
              onClick={() => go('home')}
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}
            >
              ← Back to public website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN ADMIN PORTAL LAYOUT
  return (
    <div style={styles.portalRoot}>
      {/* Hidden file input for direct photo uploading */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {/* LEFT DARK NAVY SIDEBAR (#0a1628) matching exact screenshots */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.brandTitle}>Temple & Thorpe</div>
          <div style={styles.brandSub}>Admin portal</div>
        </div>

        <nav style={styles.sidebarNav}>
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'stays', label: 'Stays' },
            { id: 'bookings', label: 'Manage bookings' },
            { id: 'homepage', label: 'Homepage' },
            { id: 'moments', label: 'Moments' },
            { id: 'things', label: 'Things to do' },
            { id: 'events', label: 'Events' },
            { id: 'cause', label: 'Travel for Cause' },
            { id: 'rewards', label: 'Rewards' },
            { id: 'contact', label: 'Contact' },
            { id: 'reviews', label: 'Reviews' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setEditingRoom(null);
                }}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {}),
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={styles.sidebarFooter}>
          <button
            onClick={() => go('home')}
            style={styles.sidebarActionBtn}
          >
            View website
          </button>
          <button
            onClick={handleLogout}
            style={styles.sidebarActionBtn}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main style={styles.mainContent}>
        {/* TOP BAR */}
        <header style={styles.topBar}>
          <div>
            <h1 style={styles.pageTitle}>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'stays' && (editingRoom ? 'Edit Stay' : 'Stays')}
              {activeTab === 'bookings' && 'Manage Bookings'}
              {activeTab === 'homepage' && 'Homepage'}
              {activeTab === 'moments' && 'Moments'}
              {activeTab === 'things' && 'Things to do'}
              {activeTab === 'events' && 'Events & Workshops'}
              {activeTab === 'cause' && 'Travel for Cause'}
              {activeTab === 'rewards' && 'Member Rewards & Privileges'}
              {activeTab === 'contact' && 'Contact & Location'}
              {activeTab === 'reviews' && 'Guest Reviews'}
            </h1>
            <div style={styles.pageSubtitle}>
              Changes are published to the website when you save.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={handleDownloadJson}
              title="Download data.json to upload via FileZilla to public_html/"
              style={styles.secondaryBtn}
            >
              📥 Download data.json
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={isSaving}
              style={styles.saveChangesBtn}
            >
              {isSaving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </header>

        {/* NOTIFICATION BANNER / TOAST */}
        {statusMsg && (
          <div
            style={{
              ...styles.statusBanner,
              ...(statusMsg.type === 'error'
                ? styles.statusError
                : statusMsg.type === 'info'
                ? styles.statusInfo
                : styles.statusSuccess),
            }}
          >
            {statusMsg.text}
          </div>
        )}

        {/* ---------------- SECTION 1: HOMEPAGE (SCREENSHOT 2) ---------------- */}
        {activeTab === 'homepage' && (
          <div style={styles.sectionContainer}>
            {/* Banner: Checkbox Automatically scroll Hand-picked stays */}
            <div style={styles.bannerBox}>
              <label style={styles.bannerLabel}>
                <input
                  type="checkbox"
                  checked={data.homepage?.autoScrollStays !== false}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      homepage: {
                        ...(prev.homepage || {}),
                        autoScrollStays: e.target.checked,
                      },
                    }))
                  }
                  style={styles.customCheckbox}
                />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0a1628' }}>
                  Automatically scroll Hand-picked stays
                </span>
              </label>
            </div>

            {/* Form Fields: Hero Line 1, Hero Line 2, Timings */}
            <div style={styles.formCard}>
              <div style={{ marginBottom: 20 }}>
                <label style={styles.fieldLabel}>HERO LINE 1</label>
                <input
                  type="text"
                  value={data.homepage?.heroLine1 ?? 'TEMPLEANDTHORPE NATURE RETREAT,'}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      homepage: {
                        ...(prev.homepage || {}),
                        heroLine1: e.target.value,
                      },
                    }))
                  }
                  style={styles.textInput}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={styles.fieldLabel}>HERO LINE 2</label>
                <input
                  type="text"
                  value={data.homepage?.heroLine2 ?? 'NEAR AUROVILLE MATRIMANDIR'}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      homepage: {
                        ...(prev.homepage || {}),
                        heroLine2: e.target.value,
                      },
                    }))
                  }
                  style={styles.textInput}
                />
              </div>

              <div style={styles.twoColRow}>
                <div>
                  <label style={styles.fieldLabel}>HOLD EACH PHOTO (SECONDS)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    step="1"
                    value={data.homepage?.holdSeconds ?? 10}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        homepage: {
                          ...(prev.homepage || {}),
                          holdSeconds: Number(e.target.value) || 10,
                        },
                      }))
                    }
                    style={styles.textInput}
                  />
                </div>

                <div>
                  <label style={styles.fieldLabel}>FADE TIME (SECONDS)</label>
                  <input
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={data.homepage?.fadeSeconds ?? 1.2}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        homepage: {
                          ...(prev.homepage || {}),
                          fadeSeconds: Number(e.target.value) || 1.2,
                        },
                      }))
                    }
                    style={styles.textInput}
                  />
                </div>
              </div>

              <div style={{ fontSize: 13, color: '#64748b', marginTop: 16, marginBottom: 12 }}>
                The top homepage photo holds, then fades into the next. This preview uses the times above.
              </div>

              {/* Status indicator matching screenshot */}
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
                Preview · photo {previewSlideIdx + 1} of {heroSlides.length} · next in {previewSecondsLeft}s
              </div>

              {/* Live Slideshow Preview Container */}
              <div style={styles.previewContainer}>
                {heroSlides.map((slide, i) => (
                  <img
                    key={i}
                    src={slide.desktopJpg}
                    alt={slide.alt || 'Slide'}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: i === previewSlideIdx ? 1 : 0,
                      transition: `opacity ${fadeTime}s ease-in-out`,
                    }}
                  />
                ))}
                <div style={styles.previewOverlayText}>
                  {data.homepage?.heroLine1 || 'TEMPLEANDTHORPE NATURE RETREAT,'}
                  <br />
                  {data.homepage?.heroLine2 || 'NEAR AUROVILLE MATRIMANDIR'}
                </div>
              </div>

              {/* Slide image list manager */}
              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 12 }}>
                  Hero Slides Management ({heroSlides.length} Photos)
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {heroSlides.map((slide, i) => (
                    <div key={i} style={styles.slideRow}>
                      <img
                        src={slide.desktopJpg}
                        alt="Slide thumbnail"
                        style={{ width: 80, height: 50, objectFit: 'cover', border: '1px solid #cbd5e1' }}
                      />
                      <input
                        type="text"
                        value={slide.desktopJpg}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => {
                            const hp = { ...prev.homepage };
                            const slides = [...(hp.heroSlides || heroSlides)];
                            slides[i] = { ...slides[i], desktopJpg: val };
                            return { ...prev, homepage: { ...hp, heroSlides: slides } };
                          });
                        }}
                        style={{ ...styles.textInput, flex: 1 }}
                        placeholder="Image URL or relative path"
                      />
                      {heroSlides.length > 1 && (
                        <button
                          onClick={() => {
                            setData((prev) => {
                              const hp = { ...prev.homepage };
                              const slides = (hp.heroSlides || heroSlides).filter((_, idx) => idx !== i);
                              return { ...prev, homepage: { ...hp, heroSlides: slides } };
                            });
                          }}
                          style={styles.outlineSmallBtn}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <button
                      onClick={() => {
                        setData((prev) => {
                          const hp = { ...prev.homepage };
                          const slides = [...(hp.heroSlides || heroSlides), { desktopJpg: 'images/hero/hero-desktop.jpg', alt: 'New slide' }];
                          return { ...prev, homepage: { ...hp, heroSlides: slides } };
                        });
                      }}
                      style={styles.secondaryBtn}
                    >
                      + Add Slide by URL
                    </button>
                    <button
                      onClick={() => {
                        setUploadTarget({ type: 'heroSlide' });
                        fileInputRef.current?.click();
                      }}
                      style={styles.secondaryBtn}
                    >
                      📷 Upload Slide Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SECTION 2: MOMENTS (SCREENSHOT 1) ---------------- */}
        {activeTab === 'moments' && (
          <div style={styles.sectionContainer}>
            {/* Banner: Checkbox Automatically scroll Moments from vacation */}
            <div style={styles.bannerBox}>
              <label style={styles.bannerLabel}>
                <input
                  type="checkbox"
                  checked={data.homepage?.autoScrollMoments !== false}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      homepage: {
                        ...(prev.homepage || {}),
                        autoScrollMoments: e.target.checked,
                      },
                    }))
                  }
                  style={styles.customCheckbox}
                />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0a1628' }}>
                  Automatically scroll Moments from vacation
                </span>
              </label>
            </div>

            <div style={{ fontSize: 13, color: '#475569', marginBottom: 24, lineHeight: 1.5 }}>
              Preview shows the card. Use reel reads the link and fills the cover. Upload a reel clip to make that card play. Remove deletes the card. Save publishes it.
            </div>

            {/* List of Moment Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {(data.moments || []).map((m, index) => {
                const imgSrc = m.img || (m.label ? `images/${m.label}.png` : 'images/pottery.png');

                return (
                  <div key={m.id || index} style={styles.momentCard}>
                    {/* Left Thumbnail Preview with caption overlay */}
                    <div style={styles.momentThumbWrap}>
                      <img
                        src={imgSrc}
                        alt={m.cap || 'Moment'}
                        style={styles.momentThumbImg}
                      />
                      <div style={styles.momentThumbOverlay} />
                      <div style={styles.momentThumbCaption}>{m.cap}</div>
                    </div>

                    {/* Right Form Fields */}
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: 16 }}>
                        <label style={styles.fieldLabel}>CAPTION</label>
                        <input
                          type="text"
                          value={m.cap || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setData((prev) => {
                              const moments = [...(prev.moments || [])];
                              moments[index] = { ...moments[index], cap: val };
                              return { ...prev, moments };
                            });
                          }}
                          style={styles.textInput}
                        />
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <label style={styles.fieldLabel}>INSTAGRAM, REEL, OR OTHER LINK</label>
                        <input
                          type="text"
                          placeholder="https://www.instagram.com/reel/..."
                          value={m.link || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setData((prev) => {
                              const moments = [...(prev.moments || [])];
                              moments[index] = { ...moments[index], link: val };
                              return { ...prev, moments };
                            });
                          }}
                          style={styles.textInput}
                        />
                      </div>

                      {/* Action buttons row: [Preview], [Use reel], [Remove] */}
                      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                        <button
                          onClick={() => {
                            if (m.link) window.open(m.link, '_blank');
                            else showToast('No destination link set', 'info');
                          }}
                          style={styles.darkActionBtn}
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => {
                            setUploadTarget({ type: 'moment', targetId: m.id });
                            fileInputRef.current?.click();
                          }}
                          style={styles.outlineActionBtn}
                        >
                          Replace photo
                        </button>
                        <button
                          onClick={() => {
                            if (m.link && m.link.includes('instagram.com')) {
                              showToast('Instagram link verified!', 'success');
                            } else {
                              showToast('Enter a valid link above', 'info');
                            }
                          }}
                          style={styles.outlineActionBtn}
                        >
                          Use reel
                        </button>
                        <button
                          onClick={() => {
                            setData((prev) => ({
                              ...prev,
                              moments: (prev.moments || []).filter((_, idx) => idx !== index),
                            }));
                            showToast('Moment card removed', 'info');
                          }}
                          style={styles.outlineActionBtn}
                        >
                          Remove
                        </button>
                      </div>

                      {/* Toggle segmented buttons: [PHOTO] [REEL CLIP] */}
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => {
                            setData((prev) => {
                              const moments = [...(prev.moments || [])];
                              moments[index] = { ...moments[index], type: 'photo' };
                              return { ...prev, moments };
                            });
                          }}
                          style={{
                            ...styles.toggleBtn,
                            ...(m.type !== 'reel' ? styles.toggleBtnActive : {}),
                          }}
                        >
                          PHOTO
                        </button>
                        <button
                          onClick={() => {
                            setData((prev) => {
                              const moments = [...(prev.moments || [])];
                              moments[index] = { ...moments[index], type: 'reel' };
                              return { ...prev, moments };
                            });
                          }}
                          style={{
                            ...styles.toggleBtn,
                            ...(m.type === 'reel' ? styles.toggleBtnActive : {}),
                          }}
                        >
                          REEL CLIP
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add New Moment Button */}
              <div>
                <button
                  onClick={() => {
                    const newMoment = {
                      id: 'moment_' + Date.now(),
                      label: 'custom-moment',
                      cap: 'New vacation moment',
                      img: 'images/pottery.png',
                      link: 'https://www.instagram.com/reel/',
                      type: 'photo',
                    };
                    setData((prev) => ({
                      ...prev,
                      moments: [...(prev.moments || []), newMoment],
                    }));
                    showToast('New moment card added!', 'info');
                  }}
                  style={styles.secondaryBtn}
                >
                  + Add new moment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SECTION 3: STAYS / ROOMS MANAGER ---------------- */}
        {activeTab === 'stays' && (
          <div style={styles.sectionContainer}>
            {!editingRoom ? (
              <>
                {/* Search & Filter Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <select
                      value={filterCity}
                      onChange={(e) => setFilterCity(e.target.value)}
                      style={styles.selectInput}
                    >
                      <option value="all">All Locations ({data.properties?.length || 0})</option>
                      <option value="pondicherry">Pondicherry White Town</option>
                      <option value="auroville">Near Auroville Nature Retreat</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Search room name or floor..."
                      value={staysSearch}
                      onChange={(e) => setStaysSearch(e.target.value)}
                      style={{ ...styles.textInput, width: 260 }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setIsNewRoom(true);
                      setEditingRoom({
                        id: 'p' + (data.properties.length + 1),
                        city: 'auroville',
                        theme: 'nature',
                        name: 'New Temple & Thorpe Room ' + (data.properties.length + 101),
                        area: 'Near Auroville · Nature Retreat',
                        blurb: 'Luxurious room nestled in peaceful garden surroundings with private ensuite bathroom.',
                        rating: 5.0,
                        from: 'Book now',
                        bookingUrl: 'https://airbnb.com/h/templeandthorpenewroom',
                        cover: 'images/Auroville/1.jpeg',
                        images: ['images/Auroville/1.jpeg', 'images/Auroville/2.jpeg', 'images/Auroville/3.jpeg'],
                        isSelfService: false,
                      });
                    }}
                    style={styles.darkActionBtn}
                  >
                    + Add New Room
                  </button>
                </div>

                {/* Stays List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {filteredStays.map((room) => (
                    <div key={room.id} style={styles.roomListCard}>
                      <img
                        src={room.cover || room.images?.[0] || 'images/Auroville/1.jpeg'}
                        alt={room.name}
                        style={{ width: 140, height: 100, objectFit: 'cover', border: '1px solid #cbd5e1' }}
                      />

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0a1628' }}>
                            {room.name}
                          </h3>
                          <span style={styles.cityBadge}>
                            {room.city === 'pondicherry' ? 'White Town' : 'Near Auroville'}
                          </span>
                        </div>

                        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
                          {room.area} · Rating: ★ {room.rating || 5.0}
                        </div>

                        <div style={{ fontSize: 12, color: '#0a1628', wordBreak: 'break-all' }}>
                          Booking link:{' '}
                          <a
                            href={room.bookingUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#5161CB', textDecoration: 'none' }}
                          >
                            {room.bookingUrl || 'None (in-app booking)'}
                          </a>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
                        <button
                          onClick={() => {
                            setIsNewRoom(false);
                            setEditingRoom({ ...room, images: Array.isArray(room.images) ? [...room.images] : [room.cover].filter(Boolean) });
                          }}
                          style={styles.darkActionBtn}
                        >
                          Edit Room
                        </button>
                        <button
                          onClick={() => {
                            // Duplicate room
                            const dup = {
                              ...room,
                              id: 'p' + (data.properties.length + 1) + '_' + Date.now().toString().slice(-4),
                              name: room.name + ' (Copy)',
                            };
                            setData((prev) => ({
                              ...prev,
                              properties: [...prev.properties, dup],
                            }));
                            showToast(`Room duplicated as "${dup.name}"`, 'success');
                          }}
                          style={styles.outlineSmallBtn}
                        >
                          Duplicate
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${room.name}"?`)) {
                              setData((prev) => ({
                                ...prev,
                                properties: prev.properties.filter((p) => p.id !== room.id),
                              }));
                              showToast('Room deleted', 'info');
                            }
                          }}
                          style={{ ...styles.outlineSmallBtn, color: '#dc2626', borderColor: '#fca5a5' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* ROOM EDITOR FORM */
              <div style={styles.formCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0a1628' }}>
                    {isNewRoom ? 'Create New Room' : `Editing: ${editingRoom.name}`}
                  </h2>
                  <button
                    onClick={() => setEditingRoom(null)}
                    style={styles.outlineSmallBtn}
                  >
                    ← Back to Room List
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={styles.fieldLabel}>ROOM TITLE / NAME</label>
                    <input
                      type="text"
                      value={editingRoom.name || ''}
                      onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                      style={styles.textInput}
                    />
                  </div>

                  <div>
                    <label style={styles.fieldLabel}>LOCATION / CITY</label>
                    <select
                      value={editingRoom.city || 'auroville'}
                      onChange={(e) => setEditingRoom({ ...editingRoom, city: e.target.value })}
                      style={styles.selectInput}
                    >
                      <option value="auroville">Near Auroville (Nature Retreat)</option>
                      <option value="pondicherry">Pondicherry (White Town)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={styles.fieldLabel}>AREA / SUBTITLE</label>
                    <input
                      type="text"
                      value={editingRoom.area || ''}
                      onChange={(e) => setEditingRoom({ ...editingRoom, area: e.target.value })}
                      style={styles.textInput}
                    />
                  </div>

                  <div>
                    <label style={styles.fieldLabel}>DESTINATION BACKLINK (AIRBNB OR DIRECT URL)</label>
                    <input
                      type="text"
                      placeholder="https://airbnb.com/h/..."
                      value={editingRoom.bookingUrl || ''}
                      onChange={(e) => setEditingRoom({ ...editingRoom, bookingUrl: e.target.value })}
                      style={styles.textInput}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={styles.fieldLabel}>STAR RATING</label>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      max="5"
                      value={editingRoom.rating || 4.9}
                      onChange={(e) => setEditingRoom({ ...editingRoom, rating: parseFloat(e.target.value) || 5.0 })}
                      style={styles.textInput}
                    />
                  </div>

                  <div>
                    <label style={styles.fieldLabel}>THEME</label>
                    <select
                      value={editingRoom.theme || 'nature'}
                      onChange={(e) => setEditingRoom({ ...editingRoom, theme: e.target.value })}
                      style={styles.selectInput}
                    >
                      <option value="nature">Nature</option>
                      <option value="town">Town</option>
                    </select>
                  </div>

                  <div>
                    <label style={styles.fieldLabel}>SELF-SERVICE APARTMENT?</label>
                    <div style={{ display: 'flex', alignItems: 'center', height: 42 }}>
                      <input
                        type="checkbox"
                        checked={!!editingRoom.isSelfService}
                        onChange={(e) => setEditingRoom({ ...editingRoom, isSelfService: e.target.checked })}
                        style={{ marginRight: 8, width: 18, height: 18 }}
                      />
                      <span style={{ fontSize: 13, color: '#0a1628' }}>Enable Self-Service badge</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={styles.fieldLabel}>ROOM DESCRIPTION / BLURB</label>
                  <textarea
                    rows={4}
                    value={editingRoom.blurb || ''}
                    onChange={(e) => setEditingRoom({ ...editingRoom, blurb: e.target.value })}
                    style={{ ...styles.textInput, height: 'auto', resize: 'vertical' }}
                  />
                </div>

                {/* Photo Gallery Manager */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <label style={styles.fieldLabel}>PHOTOS & GALLERY ({editingRoom.images?.length || 0})</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => {
                          setUploadTarget({ type: 'roomGallery' });
                          fileInputRef.current?.click();
                        }}
                        style={styles.secondaryBtn}
                      >
                        📷 Upload Photo
                      </button>
                      <button
                        onClick={() => {
                          const url = prompt('Enter relative path or image URL:');
                          if (url) {
                            setEditingRoom((prev) => ({
                              ...prev,
                              images: [...(prev.images || []), url.trim()],
                            }));
                          }
                        }}
                        style={styles.secondaryBtn}
                      >
                        + Add Image URL
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
                    {(editingRoom.images || []).map((imgUrl, i) => {
                      const isCover = editingRoom.cover === imgUrl;
                      return (
                        <div key={i} style={styles.photoThumbCard}>
                          <img
                            src={imgUrl}
                            alt={`Photo ${i + 1}`}
                            style={{ width: '100%', height: 90, objectFit: 'cover' }}
                          />
                          {isCover && <span style={styles.coverBadge}>COVER</span>}
                          <div style={styles.photoActionsRow}>
                            <button
                              onClick={() => setEditingRoom({ ...editingRoom, cover: imgUrl })}
                              title="Set as cover image"
                              style={{ ...styles.tinyBtn, fontWeight: isCover ? 700 : 400 }}
                            >
                              Cover
                            </button>
                            <button
                              onClick={() => {
                                const newImages = editingRoom.images.filter((_, idx) => idx !== i);
                                const newCover = isCover ? newImages[0] || '' : editingRoom.cover;
                                setEditingRoom({ ...editingRoom, images: newImages, cover: newCover });
                              }}
                              title="Remove image"
                              style={{ ...styles.tinyBtn, color: '#dc2626' }}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Save Room Buttons */}
                <div style={{ display: 'flex', gap: 12, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                  <button
                    onClick={() => {
                      setData((prev) => {
                        let props = [...(prev.properties || [])];
                        if (isNewRoom) {
                          props.push(editingRoom);
                        } else {
                          props = props.map((p) => (p.id === editingRoom.id ? editingRoom : p));
                        }
                        return { ...prev, properties: props };
                      });
                      setEditingRoom(null);
                      showToast(isNewRoom ? 'Room created! Click "Save changes" to publish.' : 'Room updated! Click "Save changes" to publish.', 'success');
                    }}
                    style={styles.darkActionBtn}
                  >
                    Confirm Room Changes
                  </button>
                  <button
                    onClick={() => setEditingRoom(null)}
                    style={styles.outlineActionBtn}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------- SECTION 4: DASHBOARD ---------------- */}
        {activeTab === 'dashboard' && (
          <div style={styles.sectionContainer}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{data.properties?.length || 0}</div>
                <div style={styles.statLabel}>Active Stays & Rooms</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{data.moments?.length || 0}</div>
                <div style={styles.statLabel}>Vacation Moments</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{data.reviews?.length || 0}</div>
                <div style={styles.statLabel}>Guest Reviews</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{data.bookings?.length || 0}</div>
                <div style={styles.statLabel}>Bookings Logged</div>
              </div>
            </div>

            <div style={styles.bannerBox}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0a1628', marginBottom: 6 }}>
                Hostinger Direct-FTP Architecture Status
              </div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                All saves write directly to <code>data.json</code> via <code>api/save.php</code> without requiring a Node.js daemon or VPS.
                You can also use <strong>[📥 Download data.json]</strong> at any time to export your data file and upload it manually to Hostinger's <code>public_html/</code> directory via FileZilla.
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0a1628', marginBottom: 16 }}>Quick Shortcuts</h3>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => setActiveTab('homepage')} style={styles.darkActionBtn}>
                  Edit Homepage Hero
                </button>
                <button onClick={() => setActiveTab('moments')} style={styles.secondaryBtn}>
                  Manage Moments
                </button>
                <button onClick={() => setActiveTab('stays')} style={styles.secondaryBtn}>
                  Add or Edit Rooms
                </button>
                <button onClick={() => go('home')} style={styles.secondaryBtn}>
                  Preview Live Website
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SECTION 5: MANAGE BOOKINGS ---------------- */}
        {activeTab === 'bookings' && (
          <div style={styles.sectionContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: '#64748b' }}>
                Track and record reservations and guest inquiries.
              </div>
              <button
                onClick={() => {
                  const newBk = {
                    id: 'BK-' + (1000 + (data.bookings?.length || 0) + 1),
                    guestName: 'Guest ' + ((data.bookings?.length || 0) + 1),
                    phone: '+91 99999 00000',
                    email: 'guest@example.com',
                    roomName: data.properties?.[0]?.name || 'Standard Room',
                    checkIn: tt.todayISO(2),
                    checkOut: tt.todayISO(5),
                    guests: '2 Guests',
                    totalAmount: '₹9,600',
                    status: 'Confirmed',
                  };
                  setData((prev) => ({
                    ...prev,
                    bookings: [newBk, ...(prev.bookings || [])],
                  }));
                  showToast('New booking record added', 'success');
                }}
                style={styles.darkActionBtn}
              >
                + Record New Booking
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(data.bookings || []).map((bk, i) => (
                <div key={bk.id || i} style={styles.bookingRow}>
                  <div style={{ minWidth: 90 }}>
                    <span style={styles.bookingIdBadge}>{bk.id}</span>
                  </div>
                  <div style={{ flex: 1.2 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628' }}>{bk.guestName}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{bk.phone} · {bk.email}</div>
                  </div>
                  <div style={{ flex: 1.5 }}>
                    <div style={{ fontSize: 13, color: '#0a1628', fontWeight: 500 }}>{bk.roomName}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{bk.checkIn} to {bk.checkOut} ({bk.guests})</div>
                  </div>
                  <div style={{ minWidth: 100, textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628' }}>{bk.totalAmount}</div>
                    <span
                      style={{
                        ...styles.statusTag,
                        backgroundColor: bk.status === 'Confirmed' ? '#dcfce7' : '#fef3c7',
                        color: bk.status === 'Confirmed' ? '#166534' : '#92400e',
                      }}
                    >
                      {bk.status}
                    </span>
                  </div>
                  <div style={{ minWidth: 80, textAlign: 'right' }}>
                    <button
                      onClick={() => {
                        setData((prev) => ({
                          ...prev,
                          bookings: prev.bookings.filter((_, idx) => idx !== i),
                        }));
                      }}
                      style={{ ...styles.outlineSmallBtn, color: '#dc2626' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- SECTION 6: THINGS TO DO ---------------- */}
        {activeTab === 'things' && (
          <div style={styles.sectionContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: '#64748b' }}>
                Curated activities and local experiences shown across search and explore pages.
              </div>
              <button
                onClick={() => {
                  const newAct = {
                    id: 'act_' + Date.now(),
                    title: 'New Curated Activity',
                    category: 'Culture & Nature',
                    area: 'Pondicherry & Auroville',
                    desc: 'Engaging experience hosted in collaboration with local artisans.',
                    image: 'images/Auroville/1.jpeg',
                  };
                  setData((prev) => ({
                    ...prev,
                    thingsToDo: [...(prev.thingsToDo || []), newAct],
                  }));
                  showToast('Activity added', 'info');
                }}
                style={styles.darkActionBtn}
              >
                + Add Activity
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(data.thingsToDo || []).map((act, i) => (
                <div key={act.id || i} style={styles.roomListCard}>
                  <img
                    src={act.image || 'images/Auroville/1.jpeg'}
                    alt={act.title}
                    style={{ width: 120, height: 90, objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#0a1628', marginBottom: 4 }}>
                      {act.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#5161CB', fontWeight: 600, marginBottom: 6 }}>
                      {act.category} · {act.area}
                    </div>
                    <div style={{ fontSize: 13, color: '#475569' }}>
                      {act.desc}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setData((prev) => ({
                          ...prev,
                          thingsToDo: prev.thingsToDo.filter((_, idx) => idx !== i),
                        }));
                      }}
                      style={{ ...styles.outlineSmallBtn, color: '#dc2626' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- SECTION 7: EVENTS ---------------- */}
        {activeTab === 'events' && (
          <div style={styles.sectionContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: '#64748b' }}>
                Upcoming workshops, sound baths, yoga sessions, and farm dinners.
              </div>
              <button
                onClick={() => {
                  const newEv = {
                    id: 'ev_' + Date.now(),
                    title: 'New Retreat Workshop',
                    date: 'Upcoming Weekend · 5:00 PM',
                    venue: 'Lotus Pavilion',
                    desc: 'A mindful workshop led by certified instructors.',
                    rsvpUrl: 'https://wa.me/919488888888',
                  };
                  setData((prev) => ({
                    ...prev,
                    events: [...(prev.events || []), newEv],
                  }));
                  showToast('Event added', 'info');
                }}
                style={styles.darkActionBtn}
              >
                + Add Event
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(data.events || []).map((ev, i) => (
                <div key={ev.id || i} style={styles.formCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#5161CB', textTransform: 'uppercase' }}>
                      {ev.date} · {ev.venue}
                    </span>
                    <button
                      onClick={() => {
                        setData((prev) => ({
                          ...prev,
                          events: prev.events.filter((_, idx) => idx !== i),
                        }));
                      }}
                      style={{ ...styles.outlineSmallBtn, color: '#dc2626' }}
                    >
                      Remove
                    </button>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={styles.fieldLabel}>EVENT TITLE</label>
                    <input
                      type="text"
                      value={ev.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setData((prev) => {
                          const evs = [...(prev.events || [])];
                          evs[i] = { ...evs[i], title: val };
                          return { ...prev, events: evs };
                        });
                      }}
                      style={styles.textInput}
                    />
                  </div>

                  <div>
                    <label style={styles.fieldLabel}>DESCRIPTION & DETAILS</label>
                    <textarea
                      rows={2}
                      value={ev.desc}
                      onChange={(e) => {
                        const val = e.target.value;
                        setData((prev) => {
                          const evs = [...(prev.events || [])];
                          evs[i] = { ...evs[i], desc: val };
                          return { ...prev, events: evs };
                        });
                      }}
                      style={{ ...styles.textInput, height: 'auto' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- SECTION 8: TRAVEL FOR CAUSE ---------------- */}
        {activeTab === 'cause' && (
          <div style={styles.sectionContainer}>
            <div style={styles.formCard}>
              <div style={{ marginBottom: 20 }}>
                <label style={styles.fieldLabel}>SECTION HEADLINE</label>
                <input
                  type="text"
                  value={data.cause?.title || 'Travel for a Cause · Green Living & Community'}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      cause: { ...(prev.cause || {}), title: e.target.value },
                    }))
                  }
                  style={styles.textInput}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={styles.fieldLabel}>SUBTITLE / IMPACT STATEMENT</label>
                <input
                  type="text"
                  value={data.cause?.subtitle || 'Every booking directly supports local reforestation.'}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      cause: { ...(prev.cause || {}), subtitle: e.target.value },
                    }))
                  }
                  style={styles.textInput}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={styles.fieldLabel}>IMPACT METRICS</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                  {(data.cause?.metrics || []).map((m, i) => (
                    <div key={i} style={{ border: '1px solid #cbd5e1', padding: 12, borderRadius: 2 }}>
                      <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>
                        {m.label}
                      </div>
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => {
                            const cause = { ...prev.cause };
                            const metrics = [...(cause.metrics || [])];
                            metrics[i] = { ...metrics[i], value: val };
                            return { ...prev, cause: { ...cause, metrics } };
                          });
                        }}
                        style={styles.textInput}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SECTION 9: REWARDS ---------------- */}
        {activeTab === 'rewards' && (
          <div style={styles.sectionContainer}>
            <div style={styles.formCard}>
              <div style={{ marginBottom: 20 }}>
                <label style={styles.fieldLabel}>REWARDS PROGRAM TITLE</label>
                <input
                  type="text"
                  value={data.rewards?.title || 'Temple & Thorpe Privileges'}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      rewards: { ...(prev.rewards || {}), title: e.target.value },
                    }))
                  }
                  style={styles.textInput}
                />
              </div>

              <label style={styles.fieldLabel}>DIRECT BOOKING PERKS</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(data.rewards?.perks || []).map((pk, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <input
                      type="text"
                      value={pk.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setData((prev) => {
                          const rewards = { ...prev.rewards };
                          const perks = [...(rewards.perks || [])];
                          perks[i] = { ...perks[i], title: val };
                          return { ...prev, rewards: { ...rewards, perks } };
                        });
                      }}
                      style={{ ...styles.textInput, flex: 1 }}
                    />
                    <input
                      type="text"
                      value={pk.desc}
                      onChange={(e) => {
                        const val = e.target.value;
                        setData((prev) => {
                          const rewards = { ...prev.rewards };
                          const perks = [...(rewards.perks || [])];
                          perks[i] = { ...perks[i], desc: val };
                          return { ...prev, rewards: { ...rewards, perks } };
                        });
                      }}
                      style={{ ...styles.textInput, flex: 2 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SECTION 10: CONTACT ---------------- */}
        {activeTab === 'contact' && (
          <div style={styles.sectionContainer}>
            <div style={styles.formCard}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={styles.fieldLabel}>PHONE NUMBER</label>
                  <input
                    type="text"
                    value={data.contact?.phone || '+91 94888 88888'}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        contact: { ...(prev.contact || {}), phone: e.target.value },
                      }))
                    }
                    style={styles.textInput}
                  />
                </div>

                <div>
                  <label style={styles.fieldLabel}>WHATSAPP NUMBER (WITH COUNTRY CODE)</label>
                  <input
                    type="text"
                    value={data.contact?.whatsapp || '919488888888'}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        contact: { ...(prev.contact || {}), whatsapp: e.target.value },
                      }))
                    }
                    style={styles.textInput}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={styles.fieldLabel}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={data.contact?.email || 'stay@templeandthorperesorts.com'}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      contact: { ...(prev.contact || {}), email: e.target.value },
                    }))
                  }
                  style={styles.textInput}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={styles.fieldLabel}>PROPERTY PHYSICAL ADDRESS</label>
                <textarea
                  rows={2}
                  value={data.contact?.address || 'Temple And Thorpe Nature Retreat, Near Matrimandir, Auroville'}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      contact: { ...(prev.contact || {}), address: e.target.value },
                    }))
                  }
                  style={{ ...styles.textInput, height: 'auto' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={styles.fieldLabel}>STANDARD CHECK-IN TIME</label>
                  <input
                    type="text"
                    value={data.contact?.checkInTime || '2:00 PM'}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        contact: { ...(prev.contact || {}), checkInTime: e.target.value },
                      }))
                    }
                    style={styles.textInput}
                  />
                </div>

                <div>
                  <label style={styles.fieldLabel}>STANDARD CHECK-OUT TIME</label>
                  <input
                    type="text"
                    value={data.contact?.checkOutTime || '11:00 AM'}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        contact: { ...(prev.contact || {}), checkOutTime: e.target.value },
                      }))
                    }
                    style={styles.textInput}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SECTION 11: REVIEWS ---------------- */}
        {activeTab === 'reviews' && (
          <div style={styles.sectionContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: '#64748b' }}>
                Guest reviews and testimonials shown on the homepage and stays pages ({data.reviews?.length || 0} reviews).
              </div>
              <button
                onClick={() => {
                  const newRev = {
                    name: 'Guest',
                    rating: 5,
                    when: 'Recent stay',
                    text: 'A truly memorable stay at Temple and Thorpe! Immaculate cleanliness and warm hospitality.',
                  };
                  setData((prev) => ({
                    ...prev,
                    reviews: [newRev, ...(prev.reviews || [])],
                  }));
                  showToast('New review added', 'success');
                }}
                style={styles.darkActionBtn}
              >
                + Add New Review
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(data.reviews || []).map((rev, i) => (
                <div key={i} style={styles.formCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: '#0a1628' }}>{rev.name}</span>
                      <span style={{ color: '#eab308' }}>{'★'.repeat(rev.rating || 5)}</span>
                      <span style={{ fontSize: 12, color: '#64748b' }}>· {rev.when}</span>
                    </div>
                    <button
                      onClick={() => {
                        setData((prev) => ({
                          ...prev,
                          reviews: prev.reviews.filter((_, idx) => idx !== i),
                        }));
                      }}
                      style={{ ...styles.outlineSmallBtn, color: '#dc2626' }}
                    >
                      Delete
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={rev.text || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setData((prev) => {
                        const reviews = [...(prev.reviews || [])];
                        reviews[i] = { ...reviews[i], text: val };
                        return { ...prev, reviews };
                      });
                    }}
                    style={{ ...styles.textInput, height: 'auto', resize: 'vertical' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Precise styling matching uploaded screenshots:
// Dark navy sidebar (#0a1628), 0px clean borders, high-contrast typography
const styles = {
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a1628',
    padding: 20,
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  loginCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    padding: '36px 32px',
    border: '1px solid #16243a',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  },
  portalRoot: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  sidebar: {
    width: 250,
    minWidth: 250,
    backgroundColor: '#0a1628',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    borderRight: '1px solid #16253c',
  },
  sidebarHeader: {
    padding: '24px 20px 18px 20px',
  },
  brandTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: '-0.01em',
  },
  brandSub: {
    fontSize: 12,
    color: '#8da2ba',
    marginTop: 2,
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '8px 12px',
    flex: 1,
  },
  navItem: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: 13.5,
    fontWeight: 400,
    padding: '10px 14px',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'background 0.15s ease, color 0.15s ease',
  },
  navItemActive: {
    backgroundColor: '#152238',
    color: '#ffffff',
    fontWeight: 500,
  },
  sidebarFooter: {
    padding: '16px 12px 20px 12px',
    borderTop: '1px solid #16253c',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  sidebarActionBtn: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: 6,
    color: '#cbd5e1',
    fontSize: 13,
    padding: '9px 14px',
    cursor: 'pointer',
  },
  mainContent: {
    flex: 1,
    padding: '32px 48px',
    maxWidth: 1100,
    overflowY: 'auto',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 20,
    flexWrap: 'wrap',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#0a1628',
    margin: '0 0 6px 0',
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#64748b',
  },
  saveChangesBtn: {
    backgroundColor: '#0a1628',
    color: '#ffffff',
    border: '1px solid #0a1628',
    borderRadius: 2,
    padding: '10px 22px',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  secondaryBtn: {
    backgroundColor: '#ffffff',
    color: '#0a1628',
    border: '1px solid #cbd5e1',
    borderRadius: 2,
    padding: '9px 16px',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
  },
  statusBanner: {
    padding: '12px 18px',
    marginBottom: 20,
    fontSize: 13.5,
    borderRadius: 2,
  },
  statusSuccess: {
    backgroundColor: '#ecfdf5',
    color: '#065f46',
    border: '1px solid #a7f3d0',
  },
  statusInfo: {
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    border: '1px solid #bfdbfe',
  },
  statusError: {
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    border: '1px solid #fecaca',
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  bannerBox: {
    backgroundColor: '#ffffff',
    border: '1px solid #0f172a',
    borderRadius: 2,
    padding: '16px 20px',
  },
  bannerLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
  },
  customCheckbox: {
    width: 18,
    height: 18,
    accentColor: '#0a1628',
    cursor: 'pointer',
  },
  formCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 2,
    padding: '24px 28px',
  },
  fieldLabel: {
    display: 'block',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: '#64748b',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  textInput: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: 2,
    fontSize: 14,
    color: '#0f172a',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  selectInput: {
    padding: '10px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: 2,
    fontSize: 14,
    color: '#0f172a',
    outline: 'none',
    backgroundColor: '#ffffff',
    fontFamily: 'inherit',
  },
  twoColRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
  },
  previewContainer: {
    width: '100%',
    height: 320,
    position: 'relative',
    backgroundColor: '#0a1628',
    border: '1px solid #cbd5e1',
    overflow: 'hidden',
  },
  previewOverlayText: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 700,
    textShadow: '0 2px 6px rgba(0,0,0,0.8)',
    lineHeight: 1.3,
  },
  slideRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '8px 12px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
  },
  momentCard: {
    display: 'flex',
    gap: 24,
    padding: 24,
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 2,
  },
  momentThumbWrap: {
    width: 180,
    height: 180,
    position: 'relative',
    flexShrink: 0,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
    border: '1px solid #cbd5e1',
  },
  momentThumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  momentThumbOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.65) 100%)',
  },
  momentThumbCaption: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 500,
  },
  darkActionBtn: {
    backgroundColor: '#0a1628',
    color: '#ffffff',
    border: 'none',
    padding: '8px 18px',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    borderRadius: 2,
  },
  outlineActionBtn: {
    backgroundColor: '#ffffff',
    color: '#0a1628',
    border: '1px solid #cbd5e1',
    padding: '8px 18px',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    borderRadius: 2,
  },
  outlineSmallBtn: {
    backgroundColor: '#ffffff',
    color: '#0a1628',
    border: '1px solid #cbd5e1',
    padding: '6px 12px',
    fontSize: 12,
    cursor: 'pointer',
    borderRadius: 2,
  },
  toggleBtn: {
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    padding: '7px 16px',
    fontSize: 12,
    fontWeight: 600,
    color: '#64748b',
    cursor: 'pointer',
    borderRadius: 2,
  },
  toggleBtnActive: {
    borderColor: '#0a1628',
    color: '#0a1628',
    backgroundColor: '#f8fafc',
  },
  roomListCard: {
    display: 'flex',
    gap: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    alignItems: 'center',
  },
  cityBadge: {
    fontSize: 11,
    fontWeight: 600,
    backgroundColor: '#eef2ff',
    color: '#4338ca',
    padding: '2px 8px',
    borderRadius: 2,
  },
  photoThumbCard: {
    position: 'relative',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
  },
  coverBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#0a1628',
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 700,
    padding: '2px 6px',
  },
  photoActionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 4,
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
  },
  tinyBtn: {
    background: 'none',
    border: 'none',
    fontSize: 11,
    cursor: 'pointer',
    color: '#0a1628',
    padding: '2px 4px',
  },
  statCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 700,
    color: '#0a1628',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  bookingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '14px 18px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
  },
  bookingIdBadge: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0a1628',
    backgroundColor: '#f1f5f9',
    padding: '4px 8px',
  },
  statusTag: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 2,
    marginTop: 4,
  },
  primaryBtnFull: {
    width: '100%',
    backgroundColor: '#0a1628',
    color: '#ffffff',
    border: 'none',
    padding: '12px 20px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  errorNotice: {
    backgroundColor: '#fef2f2',
    color: '#b91c1c',
    fontSize: 12.5,
    padding: '8px 12px',
    marginBottom: 16,
    border: '1px solid #fecaca',
  },
};

export default AdminScreen;
