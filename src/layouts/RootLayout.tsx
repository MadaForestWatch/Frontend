import { Outlet } from 'react-router-dom';

import { Stack } from '@mui/material';

import AppBar from './AppBar';
import SignOutDialog from '@/features/auth/components/SignOutDialog';

export default function RootLayout() {
  return (
    <Stack direction="column" sx={{ minHeight: '100vh' }}>
      <AppBar />
      <Outlet />
      <SignOutDialog />
    </Stack>
  );
}
