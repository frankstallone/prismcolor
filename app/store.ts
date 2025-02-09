import { create } from 'zustand';
import { paletteSeed } from '@/utilities/data';
import { createPalette } from '@/utilities';
import type { Model, PaletteConfig } from '@/utilities/types';

interface PaletteStore {
  paletteSeed: PaletteConfig[];
  palettes: Model;
  updatePaletteSeed: (newSeed: PaletteConfig[]) => void;
}

export const usePaletteStore = create<PaletteStore>(() => ({
  paletteSeed,
  palettes: createPalette(paletteSeed),
  updatePaletteSeed: (newSeed) => ({
    paletteSeed: newSeed,
    palettes: createPalette(newSeed),
  }),
}));
