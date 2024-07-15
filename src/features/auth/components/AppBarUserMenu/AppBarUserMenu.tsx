import { useState } from 'react';
import { Link } from 'react-router-dom';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  Box,
  Divider,
  IconProps,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  SvgIconTypeMap,
  Typography,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { useAuthStore } from '../../auth.store';
import AppBarUserMenuLoader from './AppBarUserMenuLoader';
import UserAvatar from '@/features/profile/components/UserAvatar';
import { getFullName } from '@/features/profile/profile.helpers';

type LinkOptions = {
  to: string;
  label: string;
  Icon: OverridableComponent<SvgIconTypeMap<IconProps, 'svg'>> & {
    muiName: string;
  };
};

const links: LinkOptions[] = [
  { to: '/account/profile', label: 'Profile', Icon: AccountCircleOutlinedIcon },
  { to: '/account/settings', label: 'Settings', Icon: SettingsOutlinedIcon },
];

export default function AppBarUserMenu() {
  const { authProfile, authUser, toggleSignOutModal } = useAuthStore();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (!authProfile) {
    return <AppBarUserMenuLoader />;
  }

  function handleSignOut() {
    setAnchorEl(null);
    toggleSignOutModal(true);
  }

  return (
    <>
      {/* Avatar toggle */}
      <Box
        component="button"
        aria-describedby={id}
        sx={{
          background: 'none',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: open ? 'primary.main' : 'transparent',
          padding: 0.25,
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <UserAvatar profile={authProfile} />
      </Box>
      {/* Menu content */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuList sx={{ width: 280 }}>
          {/* Avatar + Full name + Email */}
          <MenuItem>
            <Stack direction="row" alignItems="center" spacing={1}>
              <UserAvatar profile={authProfile} size={45} />
              <Box>
                <Typography variant="body2">{getFullName(authProfile)}</Typography>
                <Typography variant="body2" fontStyle={'normal'} sx={{ opacity: 0.7 }}>
                  {authUser?.email}
                </Typography>
              </Box>
            </Stack>
          </MenuItem>
          <Divider />
          {/* Links */}
          {links.map(({ to, label, Icon }) => (
            <MenuItem key={to} component={Link} to={to}>
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          ))}
          {/* Sign out action */}
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
