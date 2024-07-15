import { Outlet } from 'react-router-dom';

import { Stack } from '@mui/material';

import forestBg from '@/assets/img/forest-bg.jpg';

function AuthRoutesLayout() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url("${forestBg}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        py: 6,
      }}
    >
      <Outlet />
    </Stack>
  );
}

export default AuthRoutesLayout;
