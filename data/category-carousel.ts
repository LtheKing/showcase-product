import { productDetailHref } from "@/lib/product-link";

export type CategoryCarouselItem = {
  label: string;
  productSlug: string;
  colorId: string;
  imageFile: string;
  alt: string;
};

const ITEMS: CategoryCarouselItem[] = [
  {
    label: "HIJAB",
    productSlug: "instant-jersey-plum",
    colorId: "cream",
    imageFile: "hijab1",
    alt: "Hijab cream — koleksi favorit",
  },
  {
    label: "INSTANT",
    productSlug: "instant-jersey-plum",
    colorId: "plum",
    imageFile: "hijab2",
    alt: "Hijab instant plum",
  },
  {
    label: "CHIFFON",
    productSlug: "chiffon-square-mauve",
    colorId: "mauve",
    imageFile: "hijab3",
    alt: "Hijab chiffon square",
  },
  {
    label: "GAMIS",
    productSlug: "pashmina-instant-cream",
    colorId: "camel",
    imageFile: "hijab4",
    alt: "Gamis modest wear",
  },
  {
    label: "INNER",
    productSlug: "pashmina-instant-cream",
    colorId: "charcoal",
    imageFile: "hijab5",
    alt: "Inner hijab",
  },
  {
    label: "ACCESSORIES",
    productSlug: "pashmina-instant-cream",
    colorId: "terracotta",
    imageFile: "hijab6",
    alt: "Aksesoris modest wear",
  },
];

export function getCategoryCarouselItems() {
  return ITEMS.map((item) => ({
    ...item,
    href: productDetailHref(item.productSlug, {
      color: item.colorId,
      image: item.imageFile,
    }),
  }));
}
