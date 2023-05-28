import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import SortOrder from '@/types/sort-order';
import Theme from '@/types/theme';
import storage from './customStorage';

export type SettingsState = {
  theme: Theme,
  setTheme: (theme: Theme) => void,
  ignoredContainers: string,
  setIgnoredContainers: (value: string) => void,
  sortOrder: SortOrder,
  setSortOrder: (value: SortOrder) => void,
};

export default create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        theme: Theme.System,
        setTheme: (theme: Theme) => set((state) => ({ ...state, theme })),
        ignoredContainers: '',
        setIgnoredContainers: (value: string) => set((state) => ({ ...state, ignoredContainers: value })),
        sortOrder: SortOrder.Default,
        setSortOrder: (value: SortOrder) => set((state) => ({ ...state, sortOrder: value })),
      }),
      {
        name: 'settings',
        storage: createJSONStorage(() => storage),
      },
    ),
    { enabled: import.meta.env.DEV },
  ),
);
