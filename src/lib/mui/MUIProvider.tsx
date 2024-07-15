import { PropsWithChildren, useMemo, useState } from 'react';

import { type PaletteMode } from '@mui/material';
import CSSBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ColorModeContext, ColorModeContextValue } from './color-mode.context';

export function MUIProvider({ children }: PropsWithChildren) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

  const colorModeContextValue = useMemo<ColorModeContextValue>(
    () => ({
      colorMode: mode,
      toggleColorMode,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  function toggleColorMode(nextMode?: PaletteMode) {
    setMode(nextMode ?? (mode === 'light' ? 'dark' : 'light'));
  }

  return (
    <ColorModeContext.Provider value={colorModeContextValue}>
      <ThemeProvider theme={theme}>
        <CSSBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
