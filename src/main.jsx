import React, { useState, useEffect } from 'react';
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
  "accentHue": 202,
  "buttonShape": "pill"
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState('home');
  const [params, setParams] = useState({});
  const [searchCtx, setSearchCtx] = useState({ city: 'Pondicherry', checkIn: tt.todayISO(1), checkOut: tt.todayISO(4), guests: '2 guests · 1 room' });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', `oklch(0.58 0.16 ${tweaks.accentHue})`);
    root.style.setProperty('--accent-deep', `oklch(0.34 0.13 ${tweaks.accentHue})`);
    root.style.setProperty('--accent-soft', `oklch(0.96 0.04 ${tweaks.accentHue})`);
    root.style.setProperty('--pill', tweaks.buttonShape === 'pill' ? '980px' : '12px');
  }, [tweaks]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, params]);

  const go = (s, p = {}) => {
    setScreen(s); setParams(p);
  };

  return (
    <>
      <UtilityBar go={go}/>
      <Navbar screen={screen} go={go}/>
      <main>
        {screen === 'home'     && <HomeScreen go={go} setSearchCtx={setSearchCtx}/>}
        {screen === 'search'   && <SearchScreen go={go} searchCtx={searchCtx} setSearchCtx={setSearchCtx}/>}
        {screen === 'property' && <PropertyScreen go={go} params={params} searchCtx={searchCtx}/>}
        {screen === 'loyalty'  && <LoyaltyScreen go={go}/>}
        {screen === 'things'   && <ThingsScreen go={go}/>}
        {screen === 'retreat'  && <NatureRetreatScreen go={go}/>}
        {screen === 'events'   && <EventsPage go={go}/>}
        {screen === 'cause'    && <CauseScreen go={go}/>}
      </main>
      <Footer screen={screen}/>
      <WhatsAppFab/>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Color">
          <TweakSlider label="Accent hue" min={180} max={280} value={tweaks.accentHue} onChange={v => setTweak('accentHue', v)} />
        </TweakSection>
        <TweakSection title="Shape">
          <TweakRadio label="Buttons" value={tweaks.buttonShape} onChange={v => setTweak('buttonShape', v)}
            options={[{value:'pill', label:'Pill'},{value:'rounded', label:'Rounded'}]}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
