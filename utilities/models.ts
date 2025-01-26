import Color from 'colorjs.io';
import {
  colorToHex,
  percentToEightBit,
  toCoords,
  gamutMap,
  rgbObject,
  luminanceToWeight,
} from './index';
import { targets, weights } from './data';

export class SwatchModel {
  constructor(args) {
    const { color, destinationSpace, priority, isKey, isAnchor, isLock } = args;

    this.color = this.normalizeColorToDestinationGamut(color, destinationSpace);
    this.value = {
      origin: color.to(color.space.id).toString(),
      destination: color.to(destinationSpace).toString(),
      hex: color.as('hex'),
    };
    this.weight = luminanceToWeight(color.lab.l);
    this.index = weights.findIndex((item) => item === this.weight);
    this.priority = priority ? priority : 0;
    this.isKey = isKey;
    this.isAnchor = isAnchor;
    this.isLock = isLock;
    this.wcag_white = color.contrast(new Color('White'), 'WCAG21');
    this.wcag_black = color.contrast(new Color('Black'), 'WCAG21');
    this.apca_white = color.contrast(new Color('White'), 'APCA');
    this.apca_black = color.contrast(new Color('Black'), 'APCA');
    this.lab_d65_l = color.lab_d65.l;
    this.hex = color.as('hex');
  }

  normalizeColorToDestinationGamut(color, destinationSpace) {
    if (destinationSpace === 'srgb' && !color.inGamut(destinationSpace)) {
      const result = color.toGamut({ space: 'srgb' });
      return result;
    }
    return color;
  }
}

export class ColorModel extends Color {
  constructor(...args) {
    super(...args);
    this.wcag_white = this.contrast(new Color('White'), 'WCAG21');
    this.wcag_black = this.contrast(new Color('Black'), 'WCAG21');
    this.apca_white = this.contrast(new Color('White'), 'APCA');
    this.apca_black = this.contrast(new Color('Black'), 'APCA');
  }

  as(space) {
    if (space === 'hex') return colorToHex(this);
    if (space === 'srgb_8bit_array')
      return percentToEightBit(toCoords(gamutMap(this, 'srgb')));
    if (space === 'srgb_8bit')
      return rgbObject(percentToEightBit(toCoords(gamutMap(this, 'srgb'))));
    return this.clone().to(space).toString();
  }
}

export class PaletteModel {
  values = [];

  constructor(props) {
    if (!Array.isArray(props)) return;
    props.forEach((prop, index) => {
      const semantic = prop.semantic;
      const keys = prop.keys;
      const model = new ScaleModel(index, semantic, keys);
      this.values.push(model);
    });
  }
}

export class ScaleModel {
  id = 0;
  semantic = null;
  swatches = [];
  stepsDeltaE = 0.5;
  tweenSpace = 'oklch';

  constructor(index, semantic, values) {
    this.id = index;
    this.semantic = semantic;
    this.destinationSpace = 'srgb';

    this.init = (values) => {
      this.id = index;
      this.swatches = Array.apply(null, Array(targets.length)).map(
        (item) => null
      );

      if (typeof values[0] === 'string' || values[0] instanceof String) {
        values = values.map((value) => new ColorModel(value));
      }

      if (values.length)
        this.destinationSpace =
          values && values.length ? values[0].space.id : null;

      values.forEach((color, index) => {
        const swatchModel = new SwatchModel({
          color: color,
          destinationSpace: this.destinationSpace,
          priority: values.length - index,
          isKey: index === 0 ? false : true,
          isAnchor: index === 0 ? true : false,
        });
        this.swatches[swatchModel.index] = swatchModel;
      });
    };

    this.init(Array.isArray(values) ? values : []);
    this.insertBlackAndWhite();
    this.tweenSwatches();
  }

  cleaner() {
    this.swatches.forEach((item) => (item.color = null));
  }

  insertBlackAndWhite() {
    const targetsLength = targets.length - 1;
    if (this.swatches[0] === null) {
      const color = new ColorModel('White');
      this.swatches[0] = new SwatchModel({
        color: color,
        destinationSpace: this.destinationSpace,
        isLock: true,
      });
    }
    if (this.swatches[targetsLength] === null) {
      const color = new ColorModel('Black');
      this.swatches[targetsLength] = new SwatchModel({
        color: color,
        destinationSpace: this.destinationSpace,
        isLock: true,
      });
    }
  }

  tweenSwatches() {
    const candidateSwatches = [];
    const tween = this.swatches.filter((swatch) => swatch);

    for (let i = 0; i + 1 < tween.length; i++) {
      const start = tween[i].color;
      const stop = tween[i + 1].color;
      const range = ColorModel.range(start, stop, {
        space: this.tweenSpace,
        outputSpace: this.tweenSpace,
      });
      const steps = ColorModel.steps(range, { maxDeltaE: this.stepsDeltaE });
      steps.forEach((item) => {
        const color = new ColorModel(this.tweenSpace, item.coords);
        candidateSwatches.push(color);
      });
    }

    this.swatches.forEach((swatch, idx) => {
      if (swatch === null) {
        let target = targets[idx];

        /*
         * L* 50 needs to tweak slightly lighter to reliably pass WCAG 4.5:1
         * This difference is not visually noticable.
         */
        target = target === 50 ? target - 0.25 : target;

        const color = candidateSwatches.reduce(function (prev, curr) {
          return Math.abs(curr.lab_d65.l - target) <
            Math.abs(prev.lab_d65.l - target)
            ? curr
            : prev;
        });
        this.swatches[idx] = new SwatchModel({
          color: color,
          destinationSpace: this.destinationSpace,
          isKey: false,
        });
      }
    });

    candidateSwatches.length = 0;
  }
}
