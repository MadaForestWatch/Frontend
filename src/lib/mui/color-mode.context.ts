import { createContext } from 'react';

import { type PaletteMode } from '@mui/material';

export type ColorModeContextValue = {
  colorMode: PaletteMode;
  toggleColorMode(mode?: PaletteMode): void;
};

export const ColorModeContext = createContext<ColorModeContextValue>({
  colorMode: 'light',
  toggleColorMode() {},
});
