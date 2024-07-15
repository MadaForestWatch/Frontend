import React, { forwardRef, useId, useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

export type PasswordTextFieldProps = {
  name?: string;
  label?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'outlined';
  startAdornment?: React.ReactElement;
  size?: 'small' | 'medium';
  helperText?: string;
  error?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const PasswordTextField = forwardRef<unknown, PasswordTextFieldProps>((props, ref) => {
  const {
    name,
    label,
    value,
    variant = 'filled',
    required,
    disabled,
    startAdornment,
    size,
    helperText,
    error,
    onChange,
    onBlur,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const id = useId();

  const Input = variant === 'outlined' ? OutlinedInput : FilledInput;

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  return (
    <FormControl
      variant={variant}
      size={size}
      required={required}
      disabled={disabled}
      error={error}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        ref={ref}
        id={id}
        type={showPassword ? 'text' : 'password'}
        name={name}
        startAdornment={startAdornment}
        size={size}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});

export default PasswordTextField;
