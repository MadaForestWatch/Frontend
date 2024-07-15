import { Observation } from './observation';

export const observation: Observation = {
  id: 1,
  ndvi: {
    mean: 0.65,
    median: 0.67,
    standardDeviation: 0.1,
  },
  canopy: {
    meanDensity: 0.75,
    totalCover: 120,
  },
  vegetation: {
    totalCover: 416,
    fraction: 0.7,
  },
  biomassEstimation: 500,
  evapotranspiration: 2.4,
  landSurfaceTemperature: 28,
  soilMoisture: 0.2,
};

export const forestCoverProgression = {
  labels: [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
    2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
  ],
  datasets: [
    {
      label: 'Surface de la couverture forestière en km²',
      data: [
        462, 455, 448, 450, 443, 438, 431, 435, 429, 422, 418, 415, 410, 412, 407, 402, 397, 394,
        389, 387, 385, 383, 381, 380, 380,
      ],
      borderColor: '#109310',
      fill: false,
    },
  ],
};

export const forestLossProgression = {
  labels: [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
    2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
  ],
  datasets: [
    {
      label: 'Surface perdue de la couverture forestière en km²',
      data: [
        5, 10, 15, 20, 18, 18, 25, 30, 28, 28, 35, 35, 40, 45, 50, 50, 55, 53, 60, 65, 70, 68, 75,
        80, 85,
      ],
      borderColor: '#ff0000',
      fill: false,
    },
  ],
};

export const lastFiveGainLossProgression = {
  labels: [2020, 2021, 2022, 2023, 2024],
  datasets: [
    {
      label: 'Surface de couverture forestière perdues en km²',
      data: [70, 68, 75, 80, 85], // Original values from the previous dataset
      borderColor: '#ff0000',
      backgroundColor: 'rgba(255, 0, 0, 0.4)',
      borderWidth: 1,
    },
    {
      label: 'Surface de couverture forestière créées en km²',
      data: [30, 25, 28, 32, 35], // Significantly lower values
      borderColor: '#0000ff',
      backgroundColor: 'rgba(0, 0, 255, 0.4)',
      borderWidth: 1,
    },
  ],
};
