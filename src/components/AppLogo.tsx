import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type AppLogoProps = {
  color?: string;
  width?: string | number;
  height?: string | number;
};

export default function AppLogo({ color = 'inherit', width, height }: AppLogoProps) {
  return (
    <Box
      component={Link}
      to="/"
      aria-label="Go to home"
      title="Go to home"
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color,
        columnGap: 1,
        position: 'relative',
        zIndex: 5,
      }}
    >
      <img src="/logo.png" alt="Pointeo" className="block w-11" width={width} height={height} />
      <Typography
        noWrap
        sx={{
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        MadaForestWatch
      </Typography>
    </Box>
  );
}
