'use client';
import { PaletteKeyEditor } from '@/components/palette-key-editor';
import { PalettePreview } from '@/components/palette-preview';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { usePaletteStore } from '@/app/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import { Text, Strong } from '@/components/text';
import { Heading } from '@/components/heading';
import { createPalette } from '@/utilities';

interface PageProps {
  params: { paletteId: string };
}

export default function EditPaletteForm({ params }: PageProps) {
  const { paletteId } = use(params);
  const router = useRouter();
  const paletteSeed = usePaletteStore((state) => state.paletteSeed);
  const updatePalette = usePaletteStore((state) => state.updatePalette);

  const paletteIndex = paletteSeed.findIndex((p) => p.semantic === paletteId);
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
        <Heading level={1}>Edit {paletteId} Palette</Heading>
        <div className="flex gap-4">
          <Button onClick={handleCancel} outline>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </header>

      <div className="grid gap-8">
        <div>
          <Strong className="block mb-2">Semantic Name</Strong>
          <Input
            type="text"
            value={editedPalette.semantic}
            onChange={(e) =>
              setEditedPalette({ ...editedPalette, semantic: e.target.value })
            }
          />
        </div>

        <div>
          <Strong className="block mb-2">Color Keys</Strong>
          <PaletteKeyEditor
            palette={editedPalette}
            onChange={setEditedPalette}
          />
        </div>

        <div>
          <Strong className="block mb-4">Preview</Strong>
          <PalettePreview swatches={previewPalette.swatches} />
        </div>
      </div>
    </div>
  );
}
