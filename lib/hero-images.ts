import { getCatalogImageAt, imgSrc, listCatalogImages } from "@/lib/img-catalog";

const PREFERRED_FILES = ["hijab1.webp", "hijab2.webp", "hijab3.webp"] as const;

const ALT_BY_SLOT = {
  left: "HijabFirst — hijab instant jersey plum",
  center: "HijabFirst — koleksi hijab terbaru",
  right: "HijabFirst — modest wear premium",
} as const;

const FALLBACK = {
  left: {
    src: "https://images.unsplash.com/photo-1610701596007-1773e97c8d68?w=800&q=80",
    alt: ALT_BY_SLOT.left,
  },
  center: {
    src: "https://images.unsplash.com/photo-1583292650899-7ee93832cace?w=900&q=80",
    alt: ALT_BY_SLOT.center,
  },
  right: {
    src: "https://images.unsplash.com/photo-1617627143750-d86bc21e33f8?w=700&q=80",
    alt: ALT_BY_SLOT.right,
  },
} as const;

export type HeroImage = { src: string; alt: string };
export type HeroImages = {
  left: HeroImage;
  center: HeroImage;
  right: HeroImage;
};

function resolveByFilename(preferred: string, allFiles: string[]): string | null {
  const exact = allFiles.find((f) => f.toLowerCase() === preferred.toLowerCase());
  return exact ?? null;
}

/** Hero tiles — pakai hijab1/2/3 jika ada, else urutan file di folder img */
export function getHeroImages(): HeroImages {
  const allFiles = listCatalogImages();
  const slots = ["left", "center", "right"] as const;
  const used = new Set<string>();

  const result: HeroImages = {
    left: { ...FALLBACK.left },
    center: { ...FALLBACK.center },
    right: { ...FALLBACK.right },
  };

  if (allFiles.length === 0) return result;

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const preferred = PREFERRED_FILES[i];

    const filename =
      resolveByFilename(preferred, allFiles) ??
      allFiles.find((f) => !used.has(f)) ??
      allFiles[0];

    if (filename) {
      used.add(filename);
      result[slot] = { src: imgSrc(filename), alt: ALT_BY_SLOT[slot] };
    }
  }

  return result;
}

export { getCatalogImageAt, listCatalogImages };
