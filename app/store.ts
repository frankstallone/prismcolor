import { create } from 'zustand';
import { paletteSeed } from '@/utilities/data';
import { createPalette } from '@/utilities';
import type { Model, PaletteConfig, BasePalette } from '@/utilities/types';

interface PaletteStore {
  paletteSeed: PaletteConfig[];
  palettes: Model;
  editingPalette: PaletteConfig | null;
  previewPalette: BasePalette | null;
  updatePaletteSeed: (newSeed: PaletteConfig[]) => void;
  updatePalette: (index: number, updatedConfig: PaletteConfig) => void;
  setEditingPalette: (palette: PaletteConfig) => void;
  updateEditingPalette: (palette: PaletteConfig) => void;
  setPreviewPalette: (palette: BasePalette) => void;
}

export const usePaletteStore = create<PaletteStore>((set) => ({
  paletteSeed,
  palettes: createPalette(paletteSeed),
  editingPalette: null,
  previewPalette: null,
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
  setEditingPalette: (palette) =>
    set(() => ({
      editingPalette: palette,
      previewPalette: createPalette([palette]).values[0],
    })),
  updateEditingPalette: (palette) =>
    set(() => ({
      editingPalette: palette,
      previewPalette: createPalette([palette]).values[0],
    })),
  setPreviewPalette: (palette) => set({ previewPalette: palette }),
}));
