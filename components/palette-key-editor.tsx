'use client';
import { PaletteConfig } from '@/utilities/types';
import { memo, useCallback, useRef, useMemo } from 'react';
import { Button } from './button';
import { Input } from './input';
import { ColorPicker } from './color-picker';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface PaletteKeyEditorProps {
  palette: PaletteConfig;
  onChange: (updatedPalette: PaletteConfig) => void;
}

const PaletteKeyEditor = memo(function PaletteKeyEditor({
  palette,
  onChange,
}: PaletteKeyEditorProps) {
  const keys = useMemo(() => palette.keys || [], [palette.keys]);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedOnChange = useCallback(
    (updatedPalette: PaletteConfig) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        onChange(updatedPalette);
      }, 0);
    },
    [onChange]
  );

  const handleAddKey = useCallback(
    (newKey: string) => {
      if (newKey) {
        const updatedKeys = [...keys, newKey];
        onChange({ ...palette, keys: updatedKeys });
      }
    },
    [keys, palette, onChange]
  );

  const handleRemoveKey = useCallback(
    (index: number) => {
      const updatedKeys = keys.filter((_, i) => i !== index);
      onChange({ ...palette, keys: updatedKeys });
    },
    [keys, palette, onChange]
  );

  const handleColorPicked = useCallback(
    (color: string, index: number) => {
      const updatedKeys = [...keys];
      updatedKeys[index] = color;
      debouncedOnChange({ ...palette, keys: updatedKeys });
    },
    [keys, palette, debouncedOnChange]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        <Input
          type="text"
          placeholder="Add new color key (hex or CSS color)"
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddKey(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
        <Button
          onClick={() =>
            handleAddKey(
              (document.querySelector('input[type="text"]') as HTMLInputElement)
                ?.value || ''
            )
          }
        >
          Add Key
        </Button>
      </div>

      <div className="space-y-2">
        {keys.map((key, index) => (
          <div key={index} className="flex items-center gap-4">
            <Input
              type="text"
              value={key}
              onChange={(e) => handleColorPicked(e.target.value, index)}
              className="flex-1"
            />
            <ColorPicker
              value={key}
              onChange={(color) => handleColorPicked(color, index)}
            />
            <Button outline onClick={() => handleRemoveKey(index)}>
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
});

export { PaletteKeyEditor };
