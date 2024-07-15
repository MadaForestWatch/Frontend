import { PropsWithChildren } from 'react';

import { Box, Button, Stack } from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';

const AuthButton = styled(Button)({
  textTransform: 'none',
});

export type OAuthBtnProps = PropsWithChildren<{
  iconProps: Record<'src' | 'alt', string>;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}>;

export default function OAuthBtn({ iconProps, children, disabled, onClick }: OAuthBtnProps) {
  const { palette } = useTheme();

  return (
    <AuthButton
      variant="outlined"
      color="inherit"
      size="large"
      fullWidth
      disabled={disabled}
      sx={{ borderColor: alpha(palette.text.primary, 0.4) }}
      onClick={onClick}
    >
      <Stack direction="row" alignItems="center" gap={1.5}>
        <Box component="img" src={iconProps.src} alt={iconProps.alt} sx={{ width: 22 }} />
        <span>{children}</span>
      </Stack>
    </AuthButton>
  );
}
