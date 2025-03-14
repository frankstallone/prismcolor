'use client';
import Image from 'next/image';
import { usePaletteStore } from './store';

export default function Home() {
  const palettes = usePaletteStore((state) => state.palettes);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-12 row-start-2 items-center sm:items-start w-full max-w-[1200px]">
        {palettes.values.map((palette) => (
          <div key={palette.semantic} className="w-full">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {palette.semantic}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4">
              {palette.swatches.map((swatch, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div
                    className="h-20 rounded-lg border border-gray-200"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="text-xs text-gray-600">{swatch.weight}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
