export type Zone = {
  id: number;
  name: string;
  description: string;
  bbox: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
  area: number;
};
