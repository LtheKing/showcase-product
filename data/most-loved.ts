import { imgSrc, listCatalogImages } from "@/lib/img-catalog";

export type MostLovedItem = {
  title: string;
  image: string;
  alt: string;
  href: string;
};

const ITEM_CONFIG = [
  {
    title: "INSTANT HIJAB",
    alt: "Instant hijab — koleksi favorit",
    href: "/products/instant-jersey-plum",
  },
  {
    title: "CHIFFON SQUARE",
    alt: "Hijab chiffon square — best seller",
    href: "/products/chiffon-square-mauve",
  },
  {
    title: "PASHMINA",
    alt: "Pashmina instant — pilihan pelanggan",
    href: "/products/pashmina-instant-cream",
  },
  {
    title: "BEST SELLERS",
    alt: "Koleksi hijab terlaris HijabFirst",
    href: "/collections/hijab",
  },
] as const;

/** Ambil 4 gambar unik pertama dari folder img — tanpa duplikat/hardcode hijab3 */
export function getMostLovedItems(): MostLovedItem[] {
  const files = listCatalogImages();

  if (files.length === 0) {
    return [];
  }

  const uniqueFiles = files.slice(0, 4);

  return ITEM_CONFIG.slice(0, uniqueFiles.length).map((item, index) => ({
    title: item.title,
    alt: item.alt,
    href: item.href,
    image: imgSrc(uniqueFiles[index]),
  }));
}
