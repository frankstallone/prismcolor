import { PaletteEditForm } from '@/app/components/palette-edit-form';
import { paletteSeed } from '@/utilities/data';
import { Text } from '@/components/text';

interface PageProps {
  params: { paletteId: string };
}

export default function EditPalettePage({ params }: PageProps) {
  const { paletteId } = params;
  const palette = paletteSeed.find((p) => p.semantic === paletteId);

  if (!palette) {
    return <Text>Palette not found</Text>;
  }

  return <PaletteEditForm paletteId={paletteId} initialPalette={palette} />;
}
