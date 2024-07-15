import { Bar, Line } from 'react-chartjs-2';

import ReceiptIcon from '@mui/icons-material/Receipt';
import StraightenIcon from '@mui/icons-material/Straighten';
import TimelineIcon from '@mui/icons-material/Timeline';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import 'chart.js/auto';

import {
  forestCoverProgression,
  forestLossProgression,
  lastFiveGainLossProgression,
  observation,
} from '@/features/observation/observation.data';

export default function ZonePageMapAnalysis() {
  return (
    <Stack rowGap={3}>
      <Box component="section">
        <Typography
          component="h3"
          variant="h6"
          sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}
        >
          <StraightenIcon />
          Métriques
        </Typography>
        <TableContainer>
          <Table sx={{ '& td:last-child, & th:last-child': { textAlign: 'right' } }}>
            <TableHead>
              <TableRow>
                <TableCell>Caractéristiques</TableCell>
                <TableCell>Valeurs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>NDVI moyenne</TableCell>
                <TableCell>{observation.ndvi.mean}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NDVI médian</TableCell>
                <TableCell>{observation.ndvi.median}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Déviation standart du NDVI</TableCell>
                <TableCell>{observation.ndvi.standardDeviation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Densité moyenne de canopée</TableCell>
                <TableCell>{observation.canopy.meanDensity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Couverture totale de canopée</TableCell>
                <TableCell>{observation.canopy.totalCover} km²</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Couverture totale de la végétation</TableCell>
                <TableCell>{observation.vegetation.totalCover} km²</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fraction de la végétation</TableCell>
                <TableCell>{observation.vegetation.fraction}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estimation de la biomasse</TableCell>
                <TableCell>{observation.biomassEstimation} tonnes / ha</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Evapotranspiration (ET)</TableCell>
                <TableCell>{observation.evapotranspiration} mm / jour</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Température au niveau du sol (ET)</TableCell>
                <TableCell>{observation.landSurfaceTemperature}°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Humidité du sol</TableCell>
                <TableCell>{observation.soilMoisture} m³ / m³</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box component="section">
        <Typography
          component="h3"
          variant="h6"
          sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}
        >
          <TimelineIcon />
          Progressions
        </Typography>
        <Line data={forestCoverProgression} />
        <Line data={forestLossProgression} />
        <Bar data={lastFiveGainLossProgression} />
      </Box>
      <Box component="section">
        <Typography
          component="h3"
          variant="h6"
          sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}
        >
          <ReceiptIcon />
          Facturation
        </Typography>
        <Table sx={{ '& td:last-child, & th:last-child': { textAlign: 'right' } }}>
          <TableHead>
            <TableRow>
              <TableCell>Dénomination</TableCell>
              <TableCell>Montant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Payé</TableCell>
              <TableCell>56,899Ar</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Non-payé</TableCell>
              <TableCell>21,987Ar</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>78,886Ar</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Stack>
  );
}
