import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import { tt } from './components/shell';
import { UtilityBar, Navbar, Footer, WhatsAppFab } from './components/shell';
import HomeScreen from './components/home';
import { SearchScreen, PropertyScreen } from './components/search';
import { LoyaltyScreen, CauseScreen, ThingsScreen } from './components/account';
import NatureRetreatScreen from './components/retreat';
import EventsPage from './components/events';
import { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakRadio } from './components/tweaks-panel';

const TWEAK_DEFAULTS = {
  "buttonShape": "rounded"
};

// ---------- Hash-based routing helpers ----------
const VALID_SCREENS = ['home', 'search', 'property', 'loyalty', 'things', 'retreat', 'events', 'cause'];

const parseHash = () => {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return { screen: 'home', params: {} };
  const [path, query] = hash.split('?');
  const screen = VALID_SCREENS.includes(path) ? path : 'home';
  const params = {};
  if (query) {
    query.split('&').forEach(pair => {
      const [k, v] = pair.split('=');
      if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
  }
  return { screen, params };
};

const encodeHash = (screen, params = {}) => {
  const query = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  return `#/${screen}${query ? '?' + query : ''}`;
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Initialize state from current hash on mount
  const initial = parseHash();
  const [screen, setScreen] = useState(initial.screen);
  const [params, setParams] = useState(initial.params);
  const [searchCtx, setSearchCtx] = useState({ city: 'Both cities', checkIn: tt.todayISO(1), checkOut: tt.todayISO(4), guests: '2 guests · 1 room' });

  // Flag to distinguish programmatic go() calls from browser back/forward
  const isProgrammatic = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--pill', '0px');
  }, [tweaks]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, params]);

  // Listen for browser back/forward (hashchange)
  useEffect(() => {
    const onHashChange = () => {
      if (isProgrammatic.current) {
        isProgrammatic.current = false;
        return; // Skip — this hashchange was triggered by our go() call
      }
      const { screen: s, params: p } = parseHash();
      setScreen(s);
      setParams(p);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Set initial hash if empty (first visit with no hash)
  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', encodeHash('home'));
    }
  }, []);

  const go = useCallback((s, p = {}) => {
    isProgrammatic.current = true;
    setScreen(s);
    setParams(p);
    window.location.hash = encodeHash(s, p);
  }, []);

  // Real browser back — triggers hashchange which updates state
  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <>
      <Navbar screen={screen} params={params} go={go} searchCtx={searchCtx}/>
      <main>
        {screen === 'home'     && <HomeScreen go={go} setSearchCtx={setSearchCtx}/>}
        {screen === 'search'   && <SearchScreen go={go} goBack={goBack} params={params} searchCtx={searchCtx} setSearchCtx={setSearchCtx}/>}
        {screen === 'property' && <PropertyScreen go={go} goBack={goBack} params={params} searchCtx={searchCtx}/>}
        {screen === 'loyalty'  && <LoyaltyScreen go={go} goBack={goBack}/>}
        {screen === 'things'   && <ThingsScreen go={go} goBack={goBack}/>}
        {screen === 'retreat'  && <NatureRetreatScreen go={go} goBack={goBack}/>}
        {screen === 'events'   && <EventsPage go={go} goBack={goBack}/>}
        {screen === 'cause'    && <CauseScreen go={go} goBack={goBack}/>}
      </main>
      <Footer screen={screen}/>
      <WhatsAppFab/>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Shape">
          <TweakRadio label="Buttons" value={tweaks.buttonShape} onChange={v => setTweak('buttonShape', v)}
            options={[{value:'pill', label:'Pill'},{value:'rounded', label:'Rounded'}]}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
