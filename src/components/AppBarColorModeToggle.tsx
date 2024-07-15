import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useColorMode } from '@/lib/mui';

export default function AppBarColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorModeToggleTitle = 'Mode ' + (colorMode === 'light' ? 'nuit' : 'jour');

  const Icon = colorMode === 'dark' ? DarkModeOutlinedIcon : LightModeOutlinedIcon;

  return (
    <Tooltip title={colorModeToggleTitle} onClick={() => toggleColorMode()}>
      <IconButton aria-label="Changer de thème">
        <Icon sx={{ opacity: '0.9' }} />
      </IconButton>
    </Tooltip>
  );
}
