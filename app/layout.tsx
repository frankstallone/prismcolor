import '@/app/globals.css';
import type { Metadata } from 'next';
import type React from 'react';
import { ApplicationLayout } from './application-layout';
// import { create } from 'zustand';
import { paletteSeed } from '@/utilities/data';
import { createPalette } from '../utilities';

export const metadata: Metadata = {
  title: {
    template: '%s - PrismColor',
    default: 'PrismColor',
  },
  description: '',
};

// type prismStore = {
//   delegate: Delegate;
//   model: Model;
//   setDelegateContrast: (contrast: string) => void;
// };

// export const usePrismStore = create<prismStore>((set) => ({
//   delegate: {
//     optimization: 'Universal',
//     contrast: 'CIE L* (d65)',
//     editing: null,
//   },
//   setDelegateContrast: (contrast: string) =>
//     set((state) => ({ delegate: { ...state.delegate, contrast } })),
//   model: new PaletteModel(paletteSeed),
// }));

const palette = createPalette(paletteSeed);
console.log(palette.values[0].swatches);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <ApplicationLayout>{children}</ApplicationLayout>
      </body>
    </html>
  );
}
