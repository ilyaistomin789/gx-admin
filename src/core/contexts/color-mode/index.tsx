import { RefineThemes } from '@refinedev/antd';
import { ConfigProvider, theme } from 'antd';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

export type Mode = 'dark' | 'light';

type ColorModeContextType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType,
);

export const useColorModeContext = () => useContext(ColorModeContext);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem('colorMode') as Mode;
  const isSystemPreferenceDark = window?.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  const systemPreference: Mode = isSystemPreferenceDark ? 'dark' : 'light';
  const [mode, setMode] = useState<Mode>(
    colorModeFromLocalStorage || systemPreference,
  );

  useEffect(() => {
    window.localStorage.setItem('colorMode', mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
        theme={{
          ...RefineThemes.Blue,
          algorithm: mode === 'light' ? defaultAlgorithm : darkAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
