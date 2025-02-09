'use client';
import { PaletteKeyEditor } from '@/components/palette-key-editor';
import { PalettePreview } from '@/components/palette-preview';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { usePaletteStore } from '@/app/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Text } from '@/components/text';
import { Heading } from '@/components/heading';
import { createPalette } from '@/utilities';

export default function EditPalette({
  params,
}: {
  params: { paletteId: string };
}) {
  const router = useRouter();
  const paletteSeed = usePaletteStore((state) => state.paletteSeed);
  const updatePalette = usePaletteStore((state) => state.updatePalette);

  const paletteIndex = paletteSeed.findIndex(
    (p) => p.semantic === params.paletteId
  );
  const palette = paletteSeed[paletteIndex];

  const [editedPalette, setEditedPalette] = useState(palette);
  const [previewPalette, setPreviewPalette] = useState(
    createPalette([palette]).values[0]
  );

  useEffect(() => {
    setPreviewPalette(createPalette([editedPalette]).values[0]);
  }, [editedPalette]);

  if (!palette) {
    return <Text>Palette not found</Text>;
  }

  const handleSave = () => {
    updatePalette(paletteIndex, editedPalette);
    router.push('/');
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <header className="flex items-center justify-between">
        <Heading level={1}>Edit {params.paletteId} Palette</Heading>
        <div className="flex gap-4">
          <Button onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </header>

      <div className="grid gap-8">
        <div>
          <Text weight="medium" className="mb-2">
            Semantic Name
          </Text>
          <Input
            type="text"
            value={editedPalette.semantic}
            onChange={(e) =>
              setEditedPalette({ ...editedPalette, semantic: e.target.value })
            }
          />
        </div>

        <div>
          <Text weight="medium" className="mb-2">
            Color Keys
          </Text>
          <PaletteKeyEditor
            palette={editedPalette}
            onChange={setEditedPalette}
          />
        </div>

        <div>
          <Text weight="medium" className="mb-4">
            Preview
          </Text>
          <PalettePreview swatches={previewPalette.swatches} />
        </div>
      </div>
    </div>
  );
}
