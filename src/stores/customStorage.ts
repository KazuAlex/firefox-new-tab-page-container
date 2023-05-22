import type { StateStorage } from 'zustand/middleware';

export default {
  getItem: async (key: string) => {
    const result = await browser.storage.local.get(key);
    if (result[key] && typeof result[key] !== 'string') {
      return JSON.stringify(result[key]);
    }
    return null;
  },
  setItem: async (key: string, value: string) => {
    await browser.storage.local.set({ [key]: JSON.parse(value) });
  },
  removeItem: async (key: string) => {
    await browser.storage.local.remove(key);
  },
} as StateStorage;
