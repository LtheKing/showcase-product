import fs from "fs";
import path from "path";

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

const SOURCE_DIR = path.join(process.cwd(), "img");
const PUBLIC_DIR = path.join(process.cwd(), "public", "img");

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/** Semua gambar katalog — baca dari img/ (sumber), fallback public/img */
export function listCatalogImages(): string[] {
  const fromSource = readDir(SOURCE_DIR);
  if (fromSource.length > 0) return fromSource;
  return readDir(PUBLIC_DIR);
}

/** Gambar dengan prefix nama file, mis. "outer" → outer1.webp, outer-2.jpg */
export function listImagesByPrefix(prefix: string): string[] {
  const normalized = prefix.toLowerCase();
  return listCatalogImages().filter((f) =>
    f.toLowerCase().startsWith(normalized)
  );
}

export function imgSrc(filename: string): string {
  return `/img/${encodeURIComponent(filename)}`;
}

export function getCatalogImageAt(index: number): string | null {
  const files = listCatalogImages();
  const file = files[index];
  return file ? imgSrc(file) : null;
}

/** Cari file by nama, mis. "hijab2" → hijab2.webp */
export function resolveImageFile(name: string): string | null {
  const files = listCatalogImages();
  const base = name.replace(/\.(jpe?g|png|webp|avif|gif)$/i, "").toLowerCase();
  const candidates = new Set(
    [name, `${base}.webp`, `${base}.jpg`, `${base}.jpeg`, `${base}.png`].map((c) =>
      c.toLowerCase()
    )
  );

  const found =
    files.find((f) => candidates.has(f.toLowerCase())) ??
    files.find((f) => f.toLowerCase().startsWith(`${base}.`));

  return found ? imgSrc(found) : null;
}

export function galleryForIndices(
  primaryIndex: number,
  secondaryIndex: number,
  alt: string
): { src: string; alt: string }[] {
  const files = listCatalogImages();
  if (files.length === 0) return [];

  const primary = files[primaryIndex] ?? files[0];
  const secondary = files[secondaryIndex] ?? primary;

  return [
    { src: imgSrc(primary), alt: `${alt} — produk` },
    { src: imgSrc(secondary), alt: `${alt} — model` },
  ];
}
