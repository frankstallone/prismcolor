import { create } from 'zustand';
import { paletteSeed } from '@/utilities/data';
import { createPalette } from '@/utilities';
import type { Model, PaletteConfig } from '@/utilities/types';

interface PaletteStore {
  paletteSeed: PaletteConfig[];
  palettes: Model;
  updatePaletteSeed: (newSeed: PaletteConfig[]) => void;
  updatePalette: (index: number, updatedConfig: PaletteConfig) => void;
}

export const usePaletteStore = create<PaletteStore>((set) => ({
  paletteSeed,
  palettes: createPalette(paletteSeed),
  updatePaletteSeed: (newSeed) =>
    set({
      paletteSeed: newSeed,
      palettes: createPalette(newSeed),
    }),
  updatePalette: (index: number, updatedConfig: PaletteConfig) =>
    set((state) => {
      const newSeed = [...state.paletteSeed];
      newSeed[index] = updatedConfig;
      return {
        paletteSeed: newSeed,
        palettes: createPalette(newSeed),
      };
    }),
}));
