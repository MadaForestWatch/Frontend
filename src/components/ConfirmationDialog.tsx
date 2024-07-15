import React, { PropsWithChildren } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  DialogProps,
  ButtonProps,
  Dialog,
  DialogTitle,
  Stack,
  DialogContent,
  DialogActions,
  Button,
  Paper,
} from '@mui/material';

export type ConfirmationDialogProps = DialogProps &
  PropsWithChildren<{
    open: boolean;
    title: string;
    titleIcon?: React.ReactElement;
    closeBtnLabel?: string;
    confirmBtnLabel?: string;
    confirmBtnProps?: ButtonProps;
    loading?: boolean;
    onClose?(): void;
    onConfirm?(): void;
  }>;

export default function ConfirmationDialog({
  children,
  open,
  title,
  titleIcon,
  closeBtnLabel = 'Close',
  confirmBtnLabel = 'Confirm',
  confirmBtnProps = {},
  loading = false,
  PaperComponent = Paper,
  PaperProps = { sx: { maxWidth: 350, width: '100%' } },
  onClose,
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} PaperComponent={PaperComponent} PaperProps={PaperProps} onClose={onClose}>
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          {titleIcon}
          <div>{title}</div>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ opacity: loading ? 0.5 : 1 }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          {closeBtnLabel}
        </Button>
        <LoadingButton loading={loading} {...confirmBtnProps} onClick={onConfirm}>
          {confirmBtnLabel}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
