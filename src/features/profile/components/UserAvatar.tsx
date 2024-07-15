import { Avatar } from '@mui/material';

import { Profile } from '../profile';
import { getFullName } from '../profile.helpers';

export type UserAvatarProps = {
  profile: Profile;
  size?: number;
};

export default function UserAvatar({ size = 40, profile }: UserAvatarProps) {
  const avatarFallback = profile.firstname.charAt(0);

  return (
    <Avatar
      src={profile.avatarURL ?? undefined}
      alt={getFullName(profile)}
      sx={{ width: size, height: size, bgcolor: 'primary.main' }}
    >
      {avatarFallback}
    </Avatar>
  );
}
