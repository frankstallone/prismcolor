'use client';
import { PaletteConfig } from '@/utilities/types';
import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { ColorPicker } from './color-picker';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface PaletteKeyEditorProps {
  palette: PaletteConfig;
  onChange: (updatedPalette: PaletteConfig) => void;
}

export function PaletteKeyEditor({ palette, onChange }: PaletteKeyEditorProps) {
  const [keys, setKeys] = useState<string[]>(palette.keys || []);
  const [newKey, setNewKey] = useState('');

  const handleAddKey = () => {
    if (newKey) {
      const updatedKeys = [...keys, newKey];
      setKeys(updatedKeys);
      onChange({ ...palette, keys: updatedKeys });
      setNewKey('');
    }
  };

  const handleRemoveKey = (index: number) => {
    const updatedKeys = keys.filter((_, i) => i !== index);
    setKeys(updatedKeys);
    onChange({ ...palette, keys: updatedKeys });
  };

  const handleColorPicked = (color: string, index: number) => {
    const updatedKeys = [...keys];
    updatedKeys[index] = color;
    setKeys(updatedKeys);
    onChange({ ...palette, keys: updatedKeys });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        <Input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Add new color key (hex or CSS color)"
          className="flex-1"
        />
        <Button onClick={handleAddKey}>Add Key</Button>
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
            <Button secondary onClick={() => handleRemoveKey(index)}>
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
