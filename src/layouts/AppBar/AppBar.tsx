import React, { Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useTheme, alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MUILink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import styles from './AppBar.module.css';

import AppBarColorModeToggle from '../../components/AppBarColorModeToggle';
import AppLogo from '@/components/AppLogo';
import { SIGNIN_ROUTE_PATH, SIGNUP_ROUTE_PATH } from '@/features/auth/auth.constants';
import { useAuthStore } from '@/features/auth/auth.store';
import AppBarUserMenuLoader from '@/features/auth/components/AppBarUserMenu/AppBarUserMenuLoader';

const AppBarUserMenu = React.lazy(() => import('@/features/auth/components/AppBarUserMenu'));

const navLinks: Record<'to' | 'label', string>[] = [
  { label: 'Tarifs', to: '/pricing' },
  { label: 'Catalogues', to: '/catalogues' },
  { label: 'Nous contacter', to: '/contact' },
];

export default function AppBar() {
  const { pathname } = useLocation();

  const { palette } = useTheme();

  const { isAuthenticated } = useAuthStore();

  return (
    <Paper
      elevation={1}
      component="nav"
      sx={{
        position: 'sticky',
        top: 0,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'divider',
        height: '4rem',
        borderRadius: '0',
        zIndex: 1000,
      }}
      style={{ boxShadow: 'none' }}
    >
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Stack direction="row" alignItems="center">
              {/* Mobile sidenav toggle */}
              <Tooltip title="Navigation menu">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 1, display: { xs: 'inline-flex', md: 'none' } }}
                >
                  <MenuIcon sx={{ opacity: '0.7' }} />
                </IconButton>
              </Tooltip>
              {/* Logo */}
              <AppLogo height={56} />
              {/* Desktop navigation links */}
              <Stack
                component="ul"
                aria-label="Desktop navigation"
                direction="row"
                sx={{
                  padding: 0,
                  listStyle: 'none',
                  height: '100%',
                  ml: 3,
                  my: 0,
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                {navLinks.map((link) => {
                  const matches = pathname.startsWith(link.to);
                  return (
                    <Box component="li" key={link.to}>
                      <Typography
                        component={Link}
                        to={link.to}
                        className={[styles.desktopLink, matches ? 'active' : ''].join(' ')}
                        sx={{
                          '&.active::after': { opacity: '1' },
                          '&:hover': { backgroundColor: alpha(palette.text.primary, 0.08) },
                          color: matches ? palette.primary.main : undefined,
                          opacity: matches ? 1 : undefined,
                        }}
                      >
                        {link.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" gap={3}>
              {/* Color mode toggle */}
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <AppBarColorModeToggle />
              </Box>
              {/* Get started */}
              <Button
                component={Link}
                to={'/survet-area'}
                variant="contained"
                color="primary"
                startIcon={<VisibilityOutlinedIcon />}
              >
                Démarrer
              </Button>
              {/* Authentication links */}
              {!isAuthenticated ? (
                <Stack direction="row" alignItems="center" gap={2.5}>
                  <MUILink
                    component={Link}
                    to={SIGNIN_ROUTE_PATH}
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                    Connexion
                  </MUILink>
                  <MUILink
                    component={Link}
                    to={SIGNUP_ROUTE_PATH}
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                    Inscription
                  </MUILink>
                </Stack>
              ) : (
                <Stack direction="row" alignItems="center" gap={2.5}>
                  {/* Auth user menu */}
                  <Suspense fallback={<AppBarUserMenuLoader />}>
                    <AppBarUserMenu />
                  </Suspense>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Paper>
  );
}
