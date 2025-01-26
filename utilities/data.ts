import type { PaletteConfig } from './types';

export const paletteSeed: PaletteConfig[] = [
  { index: 1, semantic: 'primary', keys: ['oklch(52.95% 0.1609 244.63)'] },
  { index: 2, semantic: 'secondary', keys: ['#867356', '#3a2f1e', '#cec6b9'] },
  { index: 3, semantic: 'positive', keys: ['#007c00'] },
  { index: 4, semantic: 'negative', keys: ['#d80000'] },
  { index: 5, semantic: 'highlight', keys: ['#ffc107'] },
  {
    index: 6,
    semantic: 'info',
    keys: ['#035ef9', '#d2e3ff', '#013391', '#0248c3', '#91b9ff'],
  },
  { index: 7, semantic: 'system', keys: ['#0A66D8'] },
  { index: 8, semantic: 'neutral', keys: null },
];

export const targets = [
  100, 97.5, 95, 92.5, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25,
  20, 15, 10, 5, 0,
];
export const luminosities = targets;
export const weights = [
  '000',
  '025',
  '050',
  '075',
  '100',
  '150',
  '200',
  '250',
  '300',
  '350',
  '400',
  '450',
  '500',
  '550',
  '600',
  '650',
  '700',
  '750',
  '800',
  '850',
  '900',
  '950',
  '999',
];
export const semantics = [
  'primary',
  'secondary',
  'tertiary',
  'positive',
  'negative',
  'highlight',
  'attention',
  'info',
  'system',
  'neutral',
];

export const universal = Object.freeze({
  name: 'Universal',
  values: [
    { target: 100, universalWeight: 0, weight: '000' },
    { target: 97.5, universalWeight: 25, weight: '025' },
    { target: 95, universalWeight: 50, weight: '050' },
    { target: 92.5, universalWeight: 75, weight: '075' },
    { target: 90, universalWeight: 100, weight: '100' },
    { target: 85, universalWeight: 150, weight: '150' },
    { target: 80, universalWeight: 200, weight: '200' },
    { target: 75, universalWeight: 250, weight: '250' },
    { target: 70, universalWeight: 300, weight: '300' },
    { target: 65, universalWeight: 350, weight: '350' },
    { target: 60, universalWeight: 400, weight: '400' },
    { target: 55, universalWeight: 450, weight: '450' },
    { target: 50, universalWeight: 500, weight: '500' },
    { target: 45, universalWeight: 550, weight: '550' },
    { target: 40, universalWeight: 600, weight: '600' },
    { target: 35, universalWeight: 650, weight: '650' },
    { target: 30, universalWeight: 700, weight: '700' },
    { target: 25, universalWeight: 750, weight: '750' },
    { target: 20, universalWeight: 800, weight: '800' },
    { target: 15, universalWeight: 850, weight: '850' },
    { target: 10, universalWeight: 900, weight: '900' },
    { target: 5, universalWeight: 950, weight: '950' },
    { target: 0, universalWeight: 999, weight: '999' },
  ],
});

export const genome = Object.freeze({
  name: 'Genome',
  values: [
    { target: 100, universalWeight: 0, weight: '000' },
    { target: 97.5, universalWeight: 25, weight: '015' },
    { target: 95, universalWeight: 50, weight: '025' },
    { target: 92.5, universalWeight: 75, weight: undefined },
    { target: 90, universalWeight: 100, weight: '050' },
    { target: 85, universalWeight: 150, weight: undefined },
    { target: 80, universalWeight: 200, weight: '075' },
    { target: 75, universalWeight: 250, weight: undefined },
    { target: 70, universalWeight: 300, weight: '085' },
    { target: 65, universalWeight: 350, weight: undefined },
    { target: 60, universalWeight: 400, weight: '100' },
    { target: 55, universalWeight: 450, weight: '200' },
    { target: 50, universalWeight: 500, weight: '300' },
    { target: 45, universalWeight: 550, weight: '400' },
    { target: 40, universalWeight: 600, weight: '500' },
    { target: 35, universalWeight: 650, weight: undefined },
    { target: 30, universalWeight: 700, weight: '600' },
    { target: 25, universalWeight: 750, weight: undefined },
    { target: 20, universalWeight: 800, weight: '700' },
    { target: 15, universalWeight: 850, weight: '800' },
    { target: 10, universalWeight: 900, weight: '900' },
    { target: 5, universalWeight: 950, weight: undefined },
    { target: 0, universalWeight: 999, weight: '950' },
  ],
});

export const materialDesign = Object.freeze({
  name: 'Material Design',
  values: [
    { target: 100, universalWeight: 0, weight: undefined },
    { target: 97.5, universalWeight: 25, weight: undefined },
    { target: 95, universalWeight: 50, weight: '50' },
    { target: 92.5, universalWeight: 75, weight: undefined },
    { target: 90, universalWeight: 100, weight: undefined },
    { target: 85, universalWeight: 150, weight: '100' },
    { target: 80, universalWeight: 200, weight: undefined },
    { target: 75, universalWeight: 250, weight: undefined },
    { target: 70, universalWeight: 300, weight: '200' },
    { target: 65, universalWeight: 350, weight: undefined },
    { target: 60, universalWeight: 400, weight: undefined },
    { target: 55, universalWeight: 450, weight: '300' },
    { target: 50, universalWeight: 500, weight: '400' },
    { target: 45, universalWeight: 550, weight: undefined },
    { target: 40, universalWeight: 600, weight: '500' },
    { target: 35, universalWeight: 650, weight: '600' },
    { target: 30, universalWeight: 700, weight: '700' },
    { target: 25, universalWeight: 750, weight: '800' },
    { target: 20, universalWeight: 800, weight: '900' },
    { target: 15, universalWeight: 850, weight: undefined },
    { target: 10, universalWeight: 900, weight: undefined },
    { target: 5, universalWeight: 950, weight: undefined },
    { target: 0, universalWeight: 999, weight: undefined },
  ],
});

export const adobeSpectrum = Object.freeze({
  name: 'Adobe Spectrum',
  values: [
    { target: 100, universalWeight: 0, weight: undefined },
    { target: 97.5, universalWeight: 25, weight: undefined },
    { target: 95, universalWeight: 50, weight: '100' },
    { target: 92.5, universalWeight: 75, weight: undefined },
    { target: 90, universalWeight: 100, weight: '200' },
    { target: 85, universalWeight: 150, weight: '300' },
    { target: 80, universalWeight: 200, weight: '400' },
    { target: 75, universalWeight: 250, weight: '500' },
    { target: 70, universalWeight: 300, weight: undefined },
    { target: 65, universalWeight: 350, weight: '600' },
    { target: 60, universalWeight: 400, weight: '700' },
    { target: 55, universalWeight: 450, weight: undefined },
    { target: 50, universalWeight: 500, weight: '800' },
    { target: 45, universalWeight: 550, weight: '900' },
    { target: 40, universalWeight: 600, weight: undefined },
    { target: 35, universalWeight: 650, weight: '1000' },
    { target: 30, universalWeight: 700, weight: '1100' },
    { target: 25, universalWeight: 750, weight: '1200' },
    { target: 20, universalWeight: 800, weight: undefined },
    { target: 15, universalWeight: 850, weight: '1300' },
    { target: 10, universalWeight: 900, weight: undefined },
    { target: 5, universalWeight: 950, weight: undefined },
    { target: 0, universalWeight: 999, weight: undefined },
  ],
});

export const ibmCarbon = Object.freeze({
  name: 'IBM Carbon',
  values: [
    { target: 100, universalWeight: 0, weight: undefined },
    { target: 97.5, universalWeight: 25, weight: undefined },
    { target: 95, universalWeight: 50, weight: '10' },
    { target: 92.5, universalWeight: 75, weight: undefined },
    { target: 90, universalWeight: 100, weight: '20' },
    { target: 85, universalWeight: 150, weight: undefined },
    { target: 80, universalWeight: 200, weight: '30' },
    { target: 75, universalWeight: 250, weight: undefined },
    { target: 70, universalWeight: 300, weight: '40' },
    { target: 65, universalWeight: 350, weight: undefined },
    { target: 60, universalWeight: 400, weight: '50' },
    { target: 55, universalWeight: 450, weight: undefined },
    { target: 50, universalWeight: 500, weight: undefined },
    { target: 45, universalWeight: 550, weight: '60' },
    { target: 40, universalWeight: 600, weight: undefined },
    { target: 35, universalWeight: 650, weight: '70' },
    { target: 30, universalWeight: 700, weight: undefined },
    { target: 25, universalWeight: 750, weight: '80' },
    { target: 20, universalWeight: 800, weight: undefined },
    { target: 15, universalWeight: 850, weight: '90' },
    { target: 10, universalWeight: 900, weight: undefined },
    { target: 5, universalWeight: 950, weight: '100' },
    { target: 0, universalWeight: 999, weight: undefined },
  ],
});

export const materialDesign3 = Object.freeze({
  name: 'Material Design (M3)',
  values: [
    { target: 100, universalWeight: 0, weight: '100' },
    { target: 97.5, universalWeight: 25, weight: '98' },
    { target: 95, universalWeight: 50, weight: '95' },
    { target: 92.5, universalWeight: 75, weight: undefined },
    { target: 90, universalWeight: 100, weight: '90' },
    { target: 85, universalWeight: 150, weight: undefined },
    { target: 80, universalWeight: 200, weight: '80' },
    { target: 75, universalWeight: 250, weight: undefined },
    { target: 70, universalWeight: 300, weight: '70' },
    { target: 65, universalWeight: 350, weight: undefined },
    { target: 60, universalWeight: 400, weight: '60' },
    { target: 55, universalWeight: 450, weight: undefined },
    { target: 50, universalWeight: 500, weight: '50' },
    { target: 45, universalWeight: 550, weight: undefined },
    { target: 40, universalWeight: 600, weight: '40' },
    { target: 35, universalWeight: 650, weight: '35' },
    { target: 30, universalWeight: 700, weight: '30' },
    { target: 25, universalWeight: 750, weight: '25' },
    { target: 20, universalWeight: 800, weight: '20' },
    { target: 15, universalWeight: 850, weight: '15' },
    { target: 10, universalWeight: 900, weight: '10' },
    { target: 5, universalWeight: 950, weight: '5' },
    { target: 0, universalWeight: 999, weight: '0' },
  ],
});

export const saleforceLightning = Object.freeze({
  name: 'Saleforce Lightning',
  values: [
    { target: 100, universalWeight: 0, weight: undefined },
    { target: 97.5, universalWeight: 25, weight: undefined },
    { target: 95, universalWeight: 50, weight: '95' },
    { target: 92.5, universalWeight: 75, weight: undefined },
    { target: 90, universalWeight: 100, weight: '90' },
    { target: 85, universalWeight: 150, weight: undefined },
    { target: 80, universalWeight: 200, weight: '80' },
    { target: 75, universalWeight: 250, weight: undefined },
    { target: 70, universalWeight: 300, weight: '70' },
    { target: 65, universalWeight: 350, weight: undefined },
    { target: 60, universalWeight: 400, weight: '60' },
    { target: 55, universalWeight: 450, weight: undefined },
    { target: 50, universalWeight: 500, weight: '50' },
    { target: 45, universalWeight: 550, weight: undefined },
    { target: 40, universalWeight: 600, weight: '40' },
    { target: 35, universalWeight: 650, weight: undefined },
    { target: 30, universalWeight: 700, weight: '30' },
    { target: 25, universalWeight: 750, weight: undefined },
    { target: 20, universalWeight: 800, weight: '20' },
    { target: 15, universalWeight: 850, weight: '15' },
    { target: 10, universalWeight: 900, weight: '10' },
    { target: 5, universalWeight: 950, weight: undefined },
    { target: 0, universalWeight: 999, weight: undefined },
  ],
});

export const antDesign = Object.freeze({
  name: 'Ant Design',
  values: [
    { target: 100, universalWeight: 0, weight: undefined },
    { target: 97.5, universalWeight: 25, weight: undefined },
    { target: 95, universalWeight: 50, weight: '1' },
    { target: 92.5, universalWeight: 75, weight: undefined },
    { target: 90, universalWeight: 100, weight: '2' },
    { target: 85, universalWeight: 150, weight: undefined },
    { target: 80, universalWeight: 200, weight: '3' },
    { target: 75, universalWeight: 250, weight: '4' },
    { target: 70, universalWeight: 300, weight: undefined },
    { target: 65, universalWeight: 350, weight: '5' },
    { target: 60, universalWeight: 400, weight: '6' },
    { target: 55, universalWeight: 450, weight: undefined },
    { target: 50, universalWeight: 500, weight: undefined },
    { target: 45, universalWeight: 550, weight: '7' },
    { target: 40, universalWeight: 600, weight: undefined },
    { target: 35, universalWeight: 650, weight: '8' },
    { target: 30, universalWeight: 700, weight: undefined },
    { target: 25, universalWeight: 750, weight: '9' },
    { target: 20, universalWeight: 800, weight: '10' },
    { target: 15, universalWeight: 850, weight: undefined },
    { target: 10, universalWeight: 900, weight: undefined },
    { target: 5, universalWeight: 950, weight: undefined },
    { target: 0, universalWeight: 999, weight: undefined },
  ],
});

export const accessiblePalette = Object.freeze({
  name: 'Accessible Palette',
  values: [
    { target: 100, universalWeight: 0, weight: undefined },
    { target: 97.5, universalWeight: 25, weight: '50' },
    { target: 95, universalWeight: 50, weight: '100' },
    { target: 92.5, universalWeight: 75, weight: undefined },
    { target: 90, universalWeight: 100, weight: undefined },
    { target: 85, universalWeight: 150, weight: '200' },
    { target: 80, universalWeight: 200, weight: undefined },
    { target: 75, universalWeight: 250, weight: '300' },
    { target: 70, universalWeight: 300, weight: undefined },
    { target: 65, universalWeight: 350, weight: '400' },
    { target: 60, universalWeight: 400, weight: '500' },
    { target: 55, universalWeight: 450, weight: undefined },
    { target: 50, universalWeight: 500, weight: '600' },
    { target: 45, universalWeight: 550, weight: undefined },
    { target: 40, universalWeight: 600, weight: '700' },
    { target: 35, universalWeight: 650, weight: undefined },
    { target: 30, universalWeight: 700, weight: '800' },
    { target: 25, universalWeight: 750, weight: '900' },
    { target: 20, universalWeight: 800, weight: undefined },
    { target: 15, universalWeight: 850, weight: undefined },
    { target: 10, universalWeight: 900, weight: undefined },
    { target: 5, universalWeight: 950, weight: undefined },
    { target: 0, universalWeight: 999, weight: undefined },
  ],
});

export const colorBox = Object.freeze({
  name: 'ColorBox',
  values: [
    { target: 100, universalWeight: 0, weight: undefined },
    { target: 97.5, universalWeight: 25, weight: undefined },
    { target: 95, universalWeight: 50, weight: '0' },
    { target: 92.5, universalWeight: 75, weight: undefined },
    { target: 90, universalWeight: 100, weight: '0.5' },
    { target: 85, universalWeight: 150, weight: '1' },
    { target: 80, universalWeight: 200, weight: undefined },
    { target: 75, universalWeight: 250, weight: '1.5' },
    { target: 70, universalWeight: 300, weight: '2' },
    { target: 65, universalWeight: 350, weight: undefined },
    { target: 60, universalWeight: 400, weight: '3' },
    { target: 55, universalWeight: 450, weight: undefined },
    { target: 50, universalWeight: 500, weight: '4' },
    { target: 45, universalWeight: 550, weight: undefined },
    { target: 40, universalWeight: 600, weight: '5' },
    { target: 35, universalWeight: 650, weight: '6' },
    { target: 30, universalWeight: 700, weight: '7' },
    { target: 25, universalWeight: 750, weight: undefined },
    { target: 20, universalWeight: 800, weight: '8' },
    { target: 15, universalWeight: 850, weight: undefined },
    { target: 10, universalWeight: 900, weight: '9' },
    { target: 5, universalWeight: 950, weight: undefined },
    { target: 0, universalWeight: 999, weight: '10' },
  ],
});
