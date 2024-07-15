import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Link as MUILink,
  FormControl,
  FormHelperText,
  Alert,
  Paper,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

import PasswordTextField from '@/components/PasswordTextField';
import { SIGNIN_ROUTE_PATH, SIGNUP_ROUTE_PATH } from '@/features/auth/auth.constants';
import { useAuthStore } from '@/features/auth/auth.store';
import FacebookOAuthBtn from '@/features/auth/components/FacebookOAuthBtn';
import GoogleOAuthBtn from '@/features/auth/components/GoogleOAuthBtn';

const signupFormSchema = Yup.object().shape({
  firstname: Yup.string().required('Your first name is required'),
  lastname: Yup.string().required('Your last name is required'),
  email: Yup.string()
    .required('Your e-mail address is required')
    .email('The e-mail address is invalid'),
  password: Yup.string()
    .required('You must provide a password')
    .min(8, 'The password must contain at least 8 characters'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'The password confirmation is wrong',
  ),
  agreeTC: Yup.boolean().default(false).isTrue('You must agree with the Terms & Conditions'),
});

export default function SignUpPage() {
  const navigate = useNavigate();

  const { signIn } = useAuthStore();

  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupFormSchema),
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignupFormSubmit = handleSubmit(async () => {
    setErrorMsg(null);
    setSubmitting(true);

    await signupWithEmailPassword();

    setSubmitting(false);

    signIn();

    enqueueSnackbar('Inscription réussie', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    });

    navigate('/zones', {
      state: { from: SIGNUP_ROUTE_PATH },
    });
  });

  function signupWithEmailPassword() {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  }

  return (
    <Paper sx={{ width: '100%', maxWidth: 540 }}>
      <Box px={5} py={6}>
        {/* Header */}
        <Box component="header" mb={4}>
          <Typography component="h1" variant="h4" gutterBottom>
            Créer un compte
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Inscrivez-vous afin de commencer à observer des zones forestières.
          </Typography>
        </Box>
        {/* Sign up form */}
        <form noValidate autoComplete="off" onSubmit={handleSignupFormSubmit}>
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}
          <Stack gap={2.5}>
            <TextField
              required
              label="Nom"
              variant="filled"
              size="small"
              fullWidth
              {...register('firstname')}
              disabled={isSubmitting}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
            <TextField
              required
              label="Prénom"
              variant="filled"
              size="small"
              fullWidth
              {...register('lastname')}
              disabled={isSubmitting}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
            <TextField
              type="email"
              required
              label="Adresse e-mail"
              size="small"
              variant="filled"
              fullWidth
              {...register('email')}
              disabled={isSubmitting}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <PasswordTextField
              required
              label="Mot de passe"
              size="small"
              {...register('password')}
              disabled={isSubmitting}
              error={!!errors.password}
              helperText={errors.password?.message ?? 'Must contain at least 8 characters'}
            />
            <TextField
              type="password"
              required
              label="Confirmez votre mot de passe"
              size="small"
              variant="filled"
              fullWidth
              {...register('passwordConfirmation')}
              disabled={isSubmitting}
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation?.message}
            />
            {/* Agreement to Terms & Conditions */}
            <FormControl error={!!errors.agreeTC} disabled={isSubmitting}>
              <FormControlLabel
                label={
                  <Typography variant="body2">
                    J'accepte les{' '}
                    <MUILink component={Link} to="/terms">
                      Termes et Conditions
                    </MUILink>
                  </Typography>
                }
                control={<Checkbox {...register('agreeTC')} />}
              />
              {errors.agreeTC && <FormHelperText>{errors.agreeTC.message}</FormHelperText>}
            </FormControl>
            <LoadingButton type="submit" loading={isSubmitting} variant="contained" size="large">
              S'inscrire
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
          py={0.8}
        >
          OU
        </Typography>
        {/* Social Logins */}
        <Stack gap={1.5}>
          <GoogleOAuthBtn disabled={isSubmitting} />
          <FacebookOAuthBtn disabled={isSubmitting} />
        </Stack>
        {/* Link to Sign up */}
        <Typography variant="body2" sx={{ mt: 4 }}>
          <Box component="span" sx={{ opacity: 0.8 }}>
            Vous êtes déjà inscrit?{' '}
          </Box>
          <MUILink component={Link} to={SIGNIN_ROUTE_PATH} sx={{ fontWeight: 700 }}>
            Se connecter
          </MUILink>
        </Typography>
      </Box>
    </Paper>
  );
}
