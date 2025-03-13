'use client';
import { Swatch } from '@/utilities/types';
import { Badge } from './badge';
import { memo, useMemo } from 'react';

interface PalettePreviewProps {
  swatches: Swatch[];
}

const PalettePreview = memo(function PalettePreview({
  swatches,
}: PalettePreviewProps) {
  const swatchElements = useMemo(
    () =>
      swatches.map((swatch, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div
            className="h-20 rounded-lg border border-gray-200"
            style={{ backgroundColor: swatch.hex }}
          />
          <Badge color="zinc">{swatch.weight}</Badge>
        </div>
      )),
    [swatches]
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4">
      {swatchElements}
    </div>
  );
});

export { PalettePreview };
