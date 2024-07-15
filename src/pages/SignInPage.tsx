import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  InputAdornment,
  Link as MUILink,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import PasswordTextField from '@/components/PasswordTextField';
import { SIGNUP_ROUTE_PATH } from '@/features/auth/auth.constants';
import { useAuthStore } from '@/features/auth/auth.store';
import FacebookOAuthBtn from '@/features/auth/components/FacebookOAuthBtn';
import GoogleOAuthBtn from '@/features/auth/components/GoogleOAuthBtn';

type HistoryState = {
  from?: string;
};

export default function SignInPage() {
  const location = useLocation();

  const navigate = useNavigate();

  const { signIn } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleInputChange(setter: Dispatch<SetStateAction<string>>) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setter(e.target.value);
  }

  async function handleFormSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setErrorMsg(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);

    signIn();

    navigate((location.state as HistoryState)?.from ?? '/zones');

    enqueueSnackbar('Vous êtes connécté', {
      variant: 'success',
    });
  }

  return (
    <Paper elevation={2} sx={{ width: '100%', maxWidth: 480 }}>
      <Box px={4} py={4}>
        {/* Header */}
        <Box component="header" mb={4}>
          <Typography component="h1" variant="h4" gutterBottom>
            Connexion
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Connectez-vous à votre afin de suivre vos activités.
          </Typography>
        </Box>
        {/* Email + Password authentication */}
        <form noValidate autoComplete="off" onSubmit={handleFormSignIn}>
          <Stack gap={2.5}>
            <TextField
              type="email"
              label="Adresse e-mail"
              variant="filled"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              value={email}
              disabled={isLoading}
              error={!!errorMsg}
              helperText={errorMsg}
              onChange={handleInputChange(setEmail)}
            />
            <PasswordTextField
              label="Mot de passe"
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
              value={password}
              disabled={isLoading}
              error={!!errorMsg}
              helperText={errorMsg ?? undefined}
              onChange={handleInputChange(setPassword)}
            />
            <LoadingButton type="submit" loading={isLoading} variant="contained" size="large">
              Se connecter
            </LoadingButton>
          </Stack>
        </form>
        {/* Form & Social logins separator */}
        <Typography
          variant="overline"
          display="block"
          textAlign="center"
          fontSize={14}
          sx={{ opacity: 0.8 }}
          py={0.4}
        >
          OU
        </Typography>
        {/* Social Logins */}
        <Stack gap={1.5}>
          <GoogleOAuthBtn />
          <FacebookOAuthBtn />
        </Stack>
        {/* Link to Sign up */}
        <Typography variant="body2" sx={{ mt: 4 }}>
          <Box component="span" sx={{ opacity: 0.8 }}>
            Vous n'avez pas encore de compte?{' '}
          </Box>
          <MUILink component={Link} to={SIGNUP_ROUTE_PATH} sx={{ fontWeight: 700 }}>
            S'inscrire
          </MUILink>
        </Typography>
      </Box>
    </Paper>
  );
}
