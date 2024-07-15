import { ChangeEvent, ReactElement, useRef, useState } from 'react';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import useEffectOnce from '@/hooks/useEffectOnce';

export type DragDropFileInputProps = {
  dragDropTitle?: string;
  browseTitle?: string;
  icon?: ReactElement;
  helperText?: string;
  onSelected?(files: File[]): void;
};

export default function DragDropFileInput({
  dragDropTitle = 'Drop files here',
  browseTitle = 'Browse',
  icon,
  helperText,
  onSelected,
}: DragDropFileInputProps) {
  const zoneRef = useRef<HTMLElement>(null);
  const [isHovering, setHovering] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { palette } = useTheme();

  useEffectOnce(() => {
    zoneRef.current?.addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();
      setHovering(true);
    });
    zoneRef.current?.addEventListener('dragleave', (e: DragEvent) => {
      e.preventDefault();
      setHovering(false);
    });
    zoneRef.current?.addEventListener('dragend', (e: DragEvent) => {
      e.preventDefault();
      setHovering(false);
    });
    zoneRef.current?.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault();
      setHovering(false);
      if (e.dataTransfer?.files) {
        const files: File[] = [];
        for (const file of e.dataTransfer.files) {
          files.push(file);
        }
        onSelected && onSelected(files);
      }
    });
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    if (onSelected && input.files) {
      const files: File[] = [];
      for (const file of input.files) {
        files.push(file);
      }
      onSelected(files);
      input.value = '';
    }
  }

  return (
    <Box
      ref={zoneRef}
      width="100%"
      py={3.5}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: isHovering ? 'primary.main' : alpha(palette.text.primary, 0.7),
        bgcolor: alpha(palette.text.primary, 0.1),
      }}
    >
      <Stack alignItems="center" gap={1.5}>
        <Box sx={{ color: isHovering ? 'primary.main' : 'inherit' }}>
          {icon ?? <UploadFileIcon sx={{ fontSize: '3rem' }} />}
        </Box>
        <Stack alignItems="center" gap={0.5}>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            {dragDropTitle}
            <span style={{ opacity: 0.7 }}> OR </span>
            <Box
              component="span"
              tabIndex={0}
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                transition: '0.4s',
                '&:hover': {
                  color: 'primary.dark',
                },
              }}
              onClick={() => inputRef.current?.click()}
            >
              {browseTitle}
            </Box>
          </Typography>
          {helperText && (
            <Typography component="p" variant="caption" sx={{ opacity: 0.8 }}>
              {helperText}
            </Typography>
          )}
        </Stack>
        <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={handleChange} />
      </Stack>
    </Box>
  );
}
