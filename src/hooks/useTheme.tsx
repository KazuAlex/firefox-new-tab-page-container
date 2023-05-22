import { createContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { shallow } from 'zustand/shallow';
import useSettingsStore from '@/stores/useSettingsStore';
import Theme from '@/types/theme';

export type ThemeContextProps = {
  theme: Theme,
  setTheme: (theme: Theme) => void,
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.Light,
  setTheme: () => {},
});

export function useTheme() {
  const [theme, setTheme] = useSettingsStore(
    (state) => [state.theme, state.setTheme],
    shallow,
  );

  const providerValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  function ThemeProvider({ children }: PropsWithChildren) {
    return (
      <ThemeContext.Provider value={providerValue}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return { theme, setTheme, ThemeProvider };
}
