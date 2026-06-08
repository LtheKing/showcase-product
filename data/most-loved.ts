import { imgSrc, listCatalogImages } from "@/lib/img-catalog";
import { productDetailHref } from "@/lib/product-link";

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
    productSlug: "instant-jersey-plum",
    colorId: "plum",
  },
  {
    title: "CHIFFON SQUARE",
    alt: "Hijab chiffon square — best seller",
    productSlug: "chiffon-square-mauve",
    colorId: "mauve",
  },
  {
    title: "PASHMINA",
    alt: "Pashmina instant — pilihan pelanggan",
    productSlug: "pashmina-instant-cream",
    colorId: "camel",
  },
  {
    title: "BEST SELLERS",
    alt: "Koleksi hijab terlaris HijabFirst",
    productSlug: "instant-jersey-plum",
    colorId: "cream",
  },
] as const;

export function getMostLovedItems(): MostLovedItem[] {
  const files = listCatalogImages();
  if (files.length === 0) return [];

  const uniqueFiles = files.slice(0, 4);

  return ITEM_CONFIG.slice(0, uniqueFiles.length).map((item, index) => {
    const file = uniqueFiles[index];
    const imageFile = file.replace(/\.(jpe?g|png|webp|avif|gif)$/i, "");

    return {
      title: item.title,
      alt: item.alt,
      image: imgSrc(file),
      href: productDetailHref(item.productSlug, {
        color: item.colorId,
        image: imageFile,
      }),
    };
  });
}
