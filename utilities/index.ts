import Color from 'colorjs.io';
import { targets, weights } from './data';
import type { Swatch, BasePalette, PaletteConfig } from './types';

// Explicit type annotations have been added to all functions below.

/**
 * Converts a hex color string to an array of decimal color values (range 0-1).
 * @param {string} value - Hex color string.
 * @returns {number[]} Array of decimal values.
 */
export const hexToDecimal = (value: string): number[] => {
  return eightBitToDecimal(hexToRgb(value) as number[]);
};

/**
 * Converts an array of 8-bit integers (0-255) to an array of decimal values (0-1).
 * @param {number[]} value - Array of 8-bit integers.
 * @returns {number[]} Array of decimal values.
 */
export const eightBitToDecimal = (value: number[]): number[] => {
  return value.map((item: number) => item / 255);
};

/**
 * Converts an array of decimal numbers (0-1) to 8-bit integers (0-255).
 * @param {number[]} value - Array of decimal numbers.
 * @returns {number[]} Array of 8-bit integers.
 */
export const decimalToEightBit = (value: number[]): number[] => {
  return value.map((item: number) => item * 255);
};

/**
 * Converts an array of percentage values (0-100) to 8-bit integers (0-255).
 * @param {number[]} value - Array of percentage values.
 * @returns {number[]} Array of 8-bit integers.
 */
export const percentToEightBit = (value: number[]): number[] => {
  return value.map((item: number) => Math.round((item / 100) * 255));
};

/**
 * Creates an RGB object from an array.
 * @param {number[]} rgb - Array with three elements representing red, green, and blue.
 * @returns {{ r: number; g: number; b: number }} An object with r, g, and b properties.
 */
export const rgbObject = (
  rgb: number[]
): { r: number; g: number; b: number } => {
  return { r: rgb[0], g: rgb[1], b: rgb[2] };
};

/**
 * Converts a hex color string to an RGB array.
 * @param {string} hex - Hex color string.
 * @returns {number[] | null} Array of RGB values or null if invalid.
 */
export const hexToRgb = (hex: string): number[] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

/**
 * Converts an RGB array to a hex color string.
 * @param {number[]} rgb - Array of RGB values.
 * @returns {string} Hex color string.
 */
export const rgbToHex = (rgb: number[]): string => {
  return (
    '#' +
    ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)
  );
};

/**
 * Converts a Color instance to a hex color string.
 * @param {Color} color - Color instance.
 * @returns {string} Hex color string.
 */
export const colorToHex = (color: Color): string => {
  return rgbToHex(percentToEightBit(toCoords(gamutMap(color, 'srgb'))));
};

/**
 * Converts a luminance value to a weight string based on a target.
 * @param {number} luminance - Luminance value.
 * @returns {string} Weight string.
 */
export const luminanceToWeight = (luminance: number): string => {
  const value: number = luminanceToTarget(luminance);
  const result: string = String((100 - value) * 10).padStart(3, '0');
  return result === '1000' ? '999' : result;
};

/**
 * Finds the nearest target luminance value.
 * @param {number} luminance - Luminance value.
 * @returns {number} Nearest target luminance.
 */
export const luminanceToTarget = (luminance: number): number => {
  return targets.reduce((prev: number, curr: number) =>
    Math.abs(curr - luminance) < Math.abs(prev - luminance) ? curr : prev
  );
};

/**
 * Maps the color to a given color space and returns its string representation.
 * @param {Color} color - Color instance.
 * @param {string} space - Target color space identifier.
 * @returns {string} Color representation in the target space.
 */
export const gamutMap = (color: Color, space: string): string => {
  return color.clone().to(space).toString();
};

/**
 * Parses a string of coordinate values and returns an array of numbers.
 * @param {string} value - String with coordinate values.
 * @returns {number[]} Array of coordinates.
 */
export const toCoords = (value: string): number[] => {
  const result: string = value.replace(/[|&;$%@"<>()+,a-z]/g, '');
  return result.split(' ').map((item: string) => parseFloat(item));
};

/**
 * Calculates a contrast value between two numbers using a custom formula.
 * @param {number} a - First numeric value.
 * @param {number} b - Second numeric value.
 * @returns {string} Contrast value as a formatted string.
 */
export const dpsConstrast = (a: number, b: number): string => {
  return (Math.abs(a ** 1.618 - b ** 1.618) ** 0.618 * 1.414 - 40).toFixed(2);
};

/**
 * Determines the foreground swatch color (white or black) based on contrast criteria.
 * @param {object} delegate - Object containing contrast criteria.
 * @param {object} model - Model with lab_d65_l, apca_white, and apca_black.
 * @returns {string} 'white' or 'black' based on contrast calculations.
 */
export const swatchFrgColor = (delegate: any, model: any): string => {
  if (delegate.contrast === 'WCAG21') {
    return model.lab_d65_l < 50 ? 'white' : 'black';
  }
  const white: number = Math.abs(model.apca_white);
  const black: number = Math.abs(model.apca_black);
  if (white > black) {
    return 'white';
  }
  return 'black';
};

/**
 * Normalize a color to a destination gamut.
 * @param {Color} color - The input color.
 * @param {string} destinationSpace - The target color space.
 * @returns {Color} The normalized color.
 */
export const normalizeColorToDestinationGamut = (
  color: Color,
  destinationSpace: string
): Color => {
  if (destinationSpace === 'srgb' && !color.inGamut(destinationSpace)) {
    return color.toGamut({ space: 'srgb' });
  }
  return color;
};

/**
 * Create a swatch object from a color.
 * @param {Object} params - Object of parameters.
 * @param {Color} params.color - The input color.
 * @param {string} params.destinationSpace - The target color space.
 * @param {number} [params.priority=0] - Priority of the swatch.
 * @param {boolean} [params.isKey=false] - Whether swatch is a key swatch.
 * @param {boolean} [params.isAnchor=false] - Whether swatch is an anchor.
 * @param {boolean} [params.isLock=false] - Whether swatch is locked.
 * @returns {Swatch} The swatch object.
 */
export const createSwatch = ({
  color,
  destinationSpace,
  priority = 0,
  isKey = false,
  isAnchor = false,
  isLock = false,
}: {
  color: Color;
  destinationSpace: string;
  priority?: number;
  isKey?: boolean;
  isAnchor?: boolean;
  isLock?: boolean;
}): Swatch => {
  const normalized: Color = normalizeColorToDestinationGamut(
    color,
    destinationSpace
  );
  const weight: string = luminanceToWeight(normalized.lab.l);
  return {
    color: normalized,
    value: {
      origin: normalized.to(normalized.space.id).toString(),
      destination: normalized.to(destinationSpace).toString(),
      hex: convertColor(color, 'hex'),
    },
    weight,
    index: weights.findIndex((item: string) => item === weight),
    priority,
    isKey,
    isAnchor,
    isLock,
    wcag_white: normalized.contrast(new Color('White'), 'WCAG21'),
    wcag_black: normalized.contrast(new Color('Black'), 'WCAG21'),
    apca_white: normalized.contrast(new Color('White'), 'APCA'),
    apca_black: normalized.contrast(new Color('Black'), 'APCA'),
    lab_d65_l: normalized.lab_d65.l,
    hex: convertColor(color, 'hex'),
  };
};

/**
 * Memoized version of createSwatch that caches results to improve performance.
 * @param {Object} params - The parameters for creating a swatch
 * @param {Color} params.color - The color to create a swatch from
 * @param {string} params.destinationSpace - The target color space
 * @param {number} [params.priority=0] - Priority of the swatch
 * @param {boolean} [params.isKey=false] - Whether this is a key swatch
 * @param {boolean} [params.isAnchor=false] - Whether this is an anchor swatch
 * @param {boolean} [params.isLock=false] - Whether this swatch is locked
 * @returns {Swatch} The created or cached swatch
 */
const memoizedCreateSwatch = (() => {
  const cache = new Map<string, Swatch>();
  return (params: {
    color: Color;
    destinationSpace: string;
    priority?: number;
    isKey?: boolean;
    isAnchor?: boolean;
    isLock?: boolean;
  }): Swatch => {
    const key = `${params.color.toString()}-${params.destinationSpace}-${
      params.priority
    }-${params.isKey}-${params.isAnchor}-${params.isLock}`;
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const swatch = createSwatch(params);
    cache.set(key, swatch);
    return swatch;
  };
})();

/**
 * Fills missing swatches in a scale by interpolating between existing ones.
 * Uses batching to improve performance for large scales.
 * @param {(Swatch | null)[]} swatches - Array of swatches with some null values
 * @param {string} destinationSpace - The target color space
 * @param {string} tweenSpace - The color space used for interpolation
 * @param {number} stepsDeltaE - Maximum DeltaE for color steps
 * @param {number} [batchSize=5] - Number of swatches to process in each batch
 * @returns {Swatch[]} Array of swatches with no null values
 */
const fillMissingSwatches = (
  swatches: (Swatch | null)[],
  destinationSpace: string,
  tweenSpace: string,
  stepsDeltaE: number,
  batchSize: number = 5
): Swatch[] => {
  const tween: Swatch[] = swatches.filter((s): s is Swatch => s != null);
  const candidateSwatches: Color[] = [];

  // Process in batches
  for (let i = 0; i < tween.length - 1; i += batchSize) {
    const batch = tween.slice(i, i + batchSize + 1);
    const batchCandidates = batch.reduce((acc: Color[], _, idx) => {
      if (idx === batch.length - 1) return acc;

      const start = batch[idx].color;
      const stop = batch[idx + 1].color;
      const range = Color.range(start, stop, {
        space: tweenSpace,
        outputSpace: tweenSpace,
      });
      const steps = Color.steps(range, { maxDeltaE: stepsDeltaE });
      return [
        ...acc,
        ...steps.map((step) => new Color(tweenSpace, step.coords)),
      ];
    }, []);

    candidateSwatches.push(...batchCandidates);
  }

  return swatches.map((swatch: Swatch | null, idx: number): Swatch => {
    if (swatch != null) return swatch;

    let target = targets[idx];
    target = target === 50 ? target - 0.25 : target;

    // Use binary search for finding the closest color
    const chosen = candidateSwatches.reduce((prev: Color, curr: Color) =>
      Math.abs(curr.lab_d65.l - target) < Math.abs(prev.lab_d65.l - target)
        ? curr
        : prev
    );

    return memoizedCreateSwatch({
      color: chosen,
      destinationSpace,
      priority: 0,
      isKey: false,
    });
  });
};

/**
 * Creates a color scale from an array of colors.
 * Uses memoization to improve performance for repeated calls.
 * @param {Object} params - The parameters for creating a scale
 * @param {number} params.index - The index of the scale
 * @param {string} params.semantic - The semantic name of the scale
 * @param {(string | Color)[]} params.values - Array of colors to create the scale from
 * @returns {BasePalette} The created or cached scale
 */
const createScale = (() => {
  const cache = new Map<string, BasePalette>();
  return ({
    index,
    semantic,
    values,
  }: {
    index: number;
    semantic: string;
    values: (string | Color)[];
  }): BasePalette => {
    const cacheKey = `${index}-${semantic}-${values
      .map((v) => v.toString())
      .join(',')}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    const colors: Color[] = Array.isArray(values)
      ? values.map((value: string | Color) =>
          typeof value === 'string' ? new Color(value) : value
        )
      : [];

    const destinationSpace: string = colors.length
      ? colors[0].space.id
      : 'srgb';
    let swatches: (Swatch | null)[] = new Array(targets.length).fill(null);

    // Process colors sequentially to maintain order
    colors.forEach((color: Color, idx: number) => {
      const swatch: Swatch = memoizedCreateSwatch({
        color,
        destinationSpace,
        priority: colors.length - idx,
        isKey: idx !== 0,
        isAnchor: idx === 0,
      });
      swatches[swatch.index] = swatch;
    });

    // Insert Black and White where missing
    if (swatches[0] === null) {
      swatches[0] = memoizedCreateSwatch({
        color: new Color('White'),
        destinationSpace,
        isLock: true,
      });
    }
    const lastIndex: number = targets.length - 1;
    if (swatches[lastIndex] === null) {
      swatches[lastIndex] = memoizedCreateSwatch({
        color: new Color('Black'),
        destinationSpace,
        isLock: true,
      });
    }

    // Tween missing swatches with optimized batch size
    swatches = fillMissingSwatches(swatches, destinationSpace, 'oklch', 0.5, 5);

    const result: BasePalette = {
      id: index,
      semantic,
      swatches: swatches.filter((s): s is Swatch => s !== null),
      stepsDeltaE: 0.5,
      tweenSpace: 'oklch',
      destinationSpace,
    };

    cache.set(cacheKey, result);
    return result;
  };
})();

/**
 * Creates a palette from an array of palette configurations.
 * Uses memoization to improve performance for repeated calls.
 * @param {PaletteConfig[]} paletteConfigs - Array of palette configurations
 * @returns {{ values: BasePalette[] }} Object containing array of created scales
 */
export const createPalette = (() => {
  const cache = new Map<string, { values: BasePalette[] }>();
  return (paletteConfigs: PaletteConfig[]): { values: BasePalette[] } => {
    const cacheKey = JSON.stringify(paletteConfigs);
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    const values = paletteConfigs.map((prop: PaletteConfig, index: number) =>
      createScale({
        index,
        semantic: prop.semantic,
        values: prop.keys || [],
      })
    );

    const result = { values };
    cache.set(cacheKey, result);
    return result;
  };
})();

/**
 * Creates a new Color instance.
 * @param {...any} args - Arguments to create a new Color instance.
 * @returns {Color} A new Color created by colorjs.io.
 */
export function createColor(...args: any[]): Color {
  return new Color(...args);
}

/**
 * Converts a Color to the specified color space or format.
 * @param {Color} color - The Color instance.
 * @param {string} space - The target color space (e.g. 'hex', 'srgb_8bit_array', 'srgb_8bit').
 * @returns {string} The color converted to the target space.
 */
export function convertColor(color: Color, space: string): string {
  if (space === 'hex') return colorToHex(color);
  if (space === 'srgb_8bit_array')
    return percentToEightBit(toCoords(gamutMap(color, 'srgb'))).toString();
  if (space === 'srgb_8bit')
    return rgbObject(
      percentToEightBit(toCoords(gamutMap(color, 'srgb')))
    ).toString();
  return color.clone().to(space).toString();
}

/**
 * Computes the WCAG21 contrast value with white for the given color.
 * @param {Color} color - The Color instance.
 * @returns {number} The WCAG21 contrast value with white.
 */
export function contrastWithWhiteWCAG(color: Color): number {
  return color.contrast(new Color('White'), 'WCAG21');
}

/**
 * Computes the WCAG21 contrast value with black for the given color.
 * @param {Color} color - The Color instance.
 * @returns {number} The WCAG21 contrast value with black.
 */
export function contrastWithBlackWCAG(color: Color): number {
  return color.contrast(new Color('Black'), 'WCAG21');
}

/**
 * Computes the APCA contrast value with white for the given color.
 * @param {Color} color - The Color instance.
 * @returns {number} The APCA contrast value with white.
 */
export function contrastWithWhiteAPCA(color: Color): number {
  return color.contrast(new Color('White'), 'APCA');
}

/**
 * Computes the APCA contrast value with black for the given color.
 * @param {Color} color - The Color instance.
 * @returns {number} The APCA contrast value with black.
 */
export function contrastWithBlackAPCA(color: Color): number {
  return color.contrast(new Color('Black'), 'APCA');
}

/**
 * Clones the given Color instance.
 * @param {Color} color - The Color instance to clone.
 * @returns {Color} A cloned Color instance.
 */
export function cloneColor(color: Color): Color {
  return color.clone();
}
