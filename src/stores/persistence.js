import { writable } from 'svelte/store';

/**
 * Creates a writable store that syncs with localStorage.
 * @param {string} key - The localStorage key.
 * @param {any} startValue - The initial value if no data exists in localStorage.
 * @returns {import('svelte/store').Writable<any>}
 */
export function persistentStore(key, startValue) {
  // Check if we are running in a browser environment
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  
  let initialValue = startValue;
  
  if (isBrowser) {
    const json = localStorage.getItem(key);
    if (json) {
      try {
        initialValue = JSON.parse(json);
      } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
      }
    }
  }

  const store = writable(initialValue);

  if (isBrowser) {
    store.subscribe(value => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
}
