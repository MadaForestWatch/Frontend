import { useState } from 'react';

import { Box, FormControlLabel, FormGroup, Stack, Switch, Typography } from '@mui/material';

export type ZoneLegend = {
  label: string;
  timeSpan: [number, number];
  color: string;
};

export type ZonePageMapLegendProps = {
  data: ZoneLegend;
  defaultEnabled?: boolean;
};

export default function ZonePageMapLegend({
  data,
  defaultEnabled = false,
}: ZonePageMapLegendProps) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  return (
    <Stack direction="row" alignItems="flex-start" sx={{ columnGap: 1.5 }}>
      <Box sx={{ width: 28, height: 28, background: data.color, borderRadius: '50%' }}></Box>
      <Box>
        <Typography variant="body2" gutterBottom>
          {data.label}
        </Typography>
        <Typography variant="caption" gutterBottom>
          {data.timeSpan[0]} - {data.timeSpan[1]}
        </Typography>
        <Box>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={enabled} onChange={() => setEnabled((e) => !e)} />}
              label="Afficher"
            />
          </FormGroup>
        </Box>
      </Box>
    </Stack>
  );
}
