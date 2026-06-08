import { imgSrc, listImagesByPrefix } from "@/lib/img-catalog";
import { productDetailHref } from "@/lib/product-link";

export type OuterSectionItem = {
  title: string;
  image: string;
  alt: string;
  href: string;
};

const ITEM_CONFIG = [
  {
    title: "LONG CARDIGAN",
    alt: "Outer long cardigan — HijabFirst",
    productSlug: "pashmina-instant-cream",
    colorId: "camel",
  },
  {
    title: "KIMONO OUTER",
    alt: "Kimono outer modest wear",
    productSlug: "pashmina-instant-cream",
    colorId: "plum",
  },
  {
    title: "TRENCH COAT",
    alt: "Trench coat outer",
    productSlug: "chiffon-square-mauve",
    colorId: "mauve",
  },
  {
    title: "OVERSIZED BLAZER",
    alt: "Oversized blazer outer",
    productSlug: "instant-jersey-plum",
    colorId: "black",
  },
] as const;

export function getOuterSectionItems(): OuterSectionItem[] {
  const files = listImagesByPrefix("outer");
  if (files.length === 0) return [];

  return files.map((file, index) => {
    const config = ITEM_CONFIG[index] ?? {
      title: `OUTER ${index + 1}`,
      alt: `Outer collection ${index + 1} — HijabFirst`,
      productSlug: "pashmina-instant-cream",
      colorId: "plum",
    };

    const imageFile = file.replace(/\.(jpe?g|png|webp|avif|gif)$/i, "");

    return {
      title: config.title,
      alt: config.alt,
      image: imgSrc(file),
      href: productDetailHref(config.productSlug, {
        color: config.colorId,
        image: imageFile,
      }),
    };
  });
}
