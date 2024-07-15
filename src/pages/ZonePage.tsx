import { SyntheticEvent, useState } from 'react';

import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Paper, Stack, Tab, Typography } from '@mui/material';

import 'leaflet/dist/leaflet.css';

import ZonePageMap from '@/features/zone/ZonePageMap';
import ZonePageMapAnalysis from '@/features/zone/components/ZonePageMapAnalysis';
import ZonePageMapLegend, {
  ZonePageMapLegendProps,
} from '@/features/zone/components/ZonePageMapLegend';
import { ranomafanaZone } from '@/features/zone/zone.data';

const legends: ZonePageMapLegendProps[] = [
  {
    data: {
      label: 'Couverture forestière existante',
      timeSpan: [2000, 2024],
      color: '#109310',
    },
    defaultEnabled: true,
  },
  {
    data: {
      label: 'Couverture forestière perdue (Déforestation)',
      timeSpan: [2001, 2024],
      color: '#ff0000',
    },
  },
  {
    data: {
      label: 'Nouvelle couverture forestière',
      timeSpan: [2001, 2024],
      color: '#0000ff',
    },
  },
];

export default function ZonePage() {
  const [currentTab, setCurrentTab] = useState<'legends' | 'analysis'>('legends');

  function handleTabChange(_: SyntheticEvent, tab: 'legends' | 'analysis') {
    setCurrentTab(tab);
  }

  return (
    <Stack direction="row" sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
      <Paper sx={{ width: 580, maxHeight: `calc(100vh - 64px)`, overflowY: 'scroll' }}>
        <Box sx={{ px: 2, pt: 3 }}>
          <Typography component="h6" variant="body1" fontWeight={600} gutterBottom>
            {ranomafanaZone.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '3',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            gutterBottom
          >
            {ranomafanaZone.description}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Superficie observée:{' '}
            <Box component="span" sx={{ fontWeight: 'normal' }}>
              {ranomafanaZone.area} km²
            </Box>
          </Typography>
        </Box>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}>
            <TabList centered onChange={handleTabChange}>
              <Tab label="Légendes" value="legends" icon={<LayersIcon />} iconPosition="start" />
              <Tab label="Analyse" value="analysis" icon={<BarChartIcon />} iconPosition="start" />
            </TabList>
          </Box>
          <TabPanel value="legends">
            <Stack sx={{ rowGap: 1.5 }}>
              {legends.map((l, i) => (
                <ZonePageMapLegend key={i} data={l.data} defaultEnabled={l.defaultEnabled} />
              ))}
            </Stack>
          </TabPanel>
          <TabPanel value="analysis">
            <ZonePageMapAnalysis />
          </TabPanel>
        </TabContext>
      </Paper>
      <ZonePageMap />
    </Stack>
  );
}
