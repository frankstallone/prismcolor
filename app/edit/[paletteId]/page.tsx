'use client';
import { PaletteKeyEditor } from '@/components/palette-key-editor';
import { PalettePreview } from '@/components/palette-preview';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { usePaletteStore } from '@/app/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Text, Strong } from '@/components/text';
import { Heading } from '@/components/heading';
import { memo, use } from 'react';

interface PageProps {
  params: Promise<{ paletteId: string }>;
}

const EditPaletteForm = memo(function EditPaletteForm({ params }: PageProps) {
  const { paletteId } = use(params);
  const router = useRouter();
  const paletteSeed = usePaletteStore((state) => state.paletteSeed);
  const updatePalette = usePaletteStore((state) => state.updatePalette);
  const editingPalette = usePaletteStore((state) => state.editingPalette);
  const previewPalette = usePaletteStore((state) => state.previewPalette);
  const setEditingPalette = usePaletteStore((state) => state.setEditingPalette);
  const updateEditingPalette = usePaletteStore(
    (state) => state.updateEditingPalette
  );

  const paletteIndex = paletteSeed.findIndex((p) => p.semantic === paletteId);
  const palette = paletteSeed[paletteIndex];

  useEffect(() => {
    if (palette) {
      setEditingPalette(palette);
    }
  }, [palette, setEditingPalette]);

  if (!palette || !editingPalette || !previewPalette) {
    return <Text>Palette not found</Text>;
  }

  const handleSave = () => {
    updatePalette(paletteIndex, editingPalette);
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
            value={editingPalette.semantic}
            onChange={(e) =>
              updateEditingPalette({
                ...editingPalette,
                semantic: e.target.value,
              })
            }
          />
        </div>

        <div>
          <Strong className="block mb-2">Color Keys</Strong>
          <PaletteKeyEditor
            palette={editingPalette}
            onChange={updateEditingPalette}
          />
        </div>

        <div>
          <Strong className="block mb-4">Preview</Strong>
          <PalettePreview swatches={previewPalette.swatches} />
        </div>
      </div>
    </div>
  );
});

export default EditPaletteForm;
