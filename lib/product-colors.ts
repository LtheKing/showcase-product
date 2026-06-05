import { getCatalogImageAt, resolveImageFile } from "@/lib/img-catalog";

type ColorGroup = "core" | "limited";

type ColorDef = {
  id: string;
  name: string;
  hex: string;
  group: ColorGroup;
  available: boolean;
  /** Nama file di img/, mis. "hijab2" */
  imageFile?: string;
  /** Index gambar di folder img/ (jika imageFile tidak diisi) */
  imageIndex?: number;
};

export function buildProductColors(defs: ColorDef[], fallbackIndex: number) {
  const fallback =
    getCatalogImageAt(fallbackIndex) ?? getCatalogImageAt(0) ?? undefined;

  return defs.map((def) => {
    const fromFile = def.imageFile ? resolveImageFile(def.imageFile) : null;
    const fromIndex =
      def.imageIndex !== undefined ? getCatalogImageAt(def.imageIndex) : null;
    const image = fromFile ?? fromIndex ?? fallback;

    return {
      id: def.id,
      name: def.name,
      hex: def.hex,
      group: def.group,
      available: def.available,
      image,
    };
  });
}
