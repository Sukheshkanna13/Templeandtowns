import { useState, useEffect } from 'react';
import { TT_DATA as DEFAULT_DATA } from './data';

const STORAGE_KEY = 'tt_resort_data_cache';

// Read cached data from localStorage if available, otherwise use bundled defaults
const getInitialData = () => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && Array.isArray(parsed.properties) && parsed.properties.length > 0) {
        return { ...DEFAULT_DATA, ...parsed };
      }
    }
  } catch (e) {
    // fallback to bundled defaults
  }
  return DEFAULT_DATA;
};

// Global reactive data store
let globalData = getInitialData();
const listeners = new Set();

export const getLiveResortData = () => globalData;

export const setLiveResortData = (newData) => {
  globalData = { ...DEFAULT_DATA, ...newData };
  // Keep TT_DATA in-memory object synced for any direct property lookups
  if (Array.isArray(newData.properties)) DEFAULT_DATA.properties = newData.properties;
  if (newData.rooms) DEFAULT_DATA.rooms = newData.rooms;
  if (Array.isArray(newData.reviews)) DEFAULT_DATA.reviews = newData.reviews;
  if (Array.isArray(newData.cities)) DEFAULT_DATA.cities = newData.cities;
  if (newData.homepage) DEFAULT_DATA.homepage = newData.homepage;
  if (Array.isArray(newData.moments)) DEFAULT_DATA.moments = newData.moments;
  if (Array.isArray(newData.thingsToDo)) DEFAULT_DATA.thingsToDo = newData.thingsToDo;
  if (Array.isArray(newData.events)) DEFAULT_DATA.events = newData.events;
  if (newData.cause) DEFAULT_DATA.cause = newData.cause;
  if (newData.rewards) DEFAULT_DATA.rewards = newData.rewards;
  if (newData.contact) DEFAULT_DATA.contact = newData.contact;
  if (Array.isArray(newData.bookings)) DEFAULT_DATA.bookings = newData.bookings;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globalData));
  } catch (e) {
    // quota exceeded or private mode
  }
  listeners.forEach(fn => fn(globalData));
};

// Fetch live data.json from Hostinger domain
export const fetchLiveServerData = async () => {
  try {
    const res = await fetch(`./data.json?_t=${Date.now()}`);
    if (res.ok) {
      const json = await res.json();
      if (json && Array.isArray(json.properties) && json.properties.length > 0) {
        setLiveResortData(json);
        return json;
      }
    }
  } catch (err) {
    // Server fetch fallback (e.g. offline or dev)
  }
  return globalData;
};

// Hook for React components to subscribe to live reactive resort data
export const useResortData = () => {
  const [data, setData] = useState(globalData);

  useEffect(() => {
    listeners.add(setData);
    return () => listeners.delete(setData);
  }, []);

  return data;
};
