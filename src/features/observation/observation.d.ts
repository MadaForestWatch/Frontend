export type Observation = {
  id: number;
  ndvi: {
    mean: number;
    median: number;
    standardDeviation: number;
  };
  canopy: {
    meanDensity: number;
    totalCover: number;
  };
  vegetation: {
    totalCover: number;
    fraction: number;
  };
  biomassEstimation: number;
  evapotranspiration: number;
  landSurfaceTemperature: number;
  soilMoisture: number;
};
