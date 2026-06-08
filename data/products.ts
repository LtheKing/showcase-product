import { getCatalogImageAt, resolveImageFile } from "@/lib/img-catalog";
import { buildProductColors } from "@/lib/product-colors";

export type ColorGroup = "core" | "limited";

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
  group: ColorGroup;
  available: boolean;
  image?: string;
};

export type ProductSize = {
  id: string;
  label: string;
  available: boolean;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type HeroSlot = "left" | "center" | "right";

export type Product = {
  slug: string;
  heroSlot: HeroSlot;
  title: string;
  category: string;
  categoryLabel: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  colors: ProductColor[];
  sizes: ProductSize[];
  description: string;
};

function primaryImage(index: number, alt: string): ProductImage[] {
  const src = getCatalogImageAt(index) ?? getCatalogImageAt(0);
  if (!src) return [];
  return [{ src, alt }];
}

function primaryImageFile(file: string, alt: string): ProductImage[] {
  const src = resolveImageFile(file);
  if (!src) return [];
  return [{ src, alt }];
}

function buildProducts(): Product[] {
  const p0 = getCatalogImageAt(0);
  const p1 = getCatalogImageAt(1) ?? p0;
  const p2 = getCatalogImageAt(2) ?? p0;

  return [
    {
      slug: "instant-jersey-plum",
      heroSlot: "left",
      title: "HIJAB INSTANT JERSEY PLUM",
      category: "hijab",
      categoryLabel: "Hijab",
      price: 189_000,
      rating: 4.9,
      reviewCount: 128,
      images: primaryImageFile("hijab2", "Hijab instant jersey plum"),
      colors: buildProductColors(
        [
          { id: "plum", name: "Plum", hex: "#5c3d52", group: "core", available: true, imageFile: "hijab2" },
          { id: "cream", name: "Cream", hex: "#e8dfd4", group: "core", available: true, imageFile: "hijab1" },
          { id: "black", name: "Black", hex: "#1a1a1a", group: "core", available: true, imageFile: "hijab12" },
          { id: "mauve", name: "Soft Mauve", hex: "#9a7b8a", group: "limited", available: true, imageIndex: 3 },
          { id: "sage", name: "Sage", hex: "#8a9a86", group: "limited", available: false, imageIndex: 4 },
        ],
        0
      ),
      sizes: [{ id: "one-size", label: "ONE SIZE", available: true }],
      description:
        "Hijab instant berbahan jersey premium, nyaman dipakai seharian. Pas di kepala, tidak perlu peniti.",
    },
    {
      slug: "chiffon-square-mauve",
      heroSlot: "center",
      title: "HIJAB CHIFFON SQUARE MAUVE",
      category: "hijab",
      categoryLabel: "Hijab",
      price: 159_000,
      rating: 4.8,
      reviewCount: 94,
      images: primaryImageFile("hijab2", "Hijab chiffon square mauve"),
      colors: buildProductColors(
        [
          { id: "mauve", name: "Mauve", hex: "#9a7b8a", group: "core", available: true, imageFile: "hijab3" },
          { id: "ivory", name: "Ivory", hex: "#f5f0e8", group: "core", available: true, imageFile: "hijab2" },
          { id: "black", name: "Black", hex: "#1a1a1a", group: "core", available: true, imageFile: "hijab12" },
          { id: "dusty-rose", name: "Dusty Rose", hex: "#c9a0a0", group: "limited", available: true, imageIndex: 4 },
          { id: "olive", name: "Olive", hex: "#6b705c", group: "limited", available: false, imageIndex: 5 },
        ],
        1
      ),
      sizes: [{ id: "one-size", label: "ONE SIZE", available: true }],
      description:
        "Hijab chiffon square ringan dan breathable. Tekstur halus, mudah diatur, cocok untuk cuaca tropis.",
    },
    {
      slug: "pashmina-instant-cream",
      heroSlot: "right",
      title: "HIJAB PASHMINA INSTANT CREAM",
      category: "hijab",
      categoryLabel: "Hijab",
      price: 219_000,
      rating: 5,
      reviewCount: 67,
      images: primaryImageFile("hijab3", "Hijab pashmina instant cream"),
      colors: buildProductColors(
        [
          { id: "plum", name: "Plum", hex: "#5c3d52", group: "core", available: true, imageFile: "hijab3" },
          { id: "cream", name: "Cream", hex: "#e8dfd4", group: "core", available: true, imageFile: "hijab1" },
          { id: "camel", name: "Camel", hex: "#b8956b", group: "core", available: true, imageFile: "hijab4" },
          { id: "charcoal", name: "Charcoal", hex: "#4a4a4a", group: "core", available: true, imageFile: "hijab5" },
          { id: "terracotta", name: "Terracotta", hex: "#c17c5c", group: "limited", available: true, imageFile: "hijab6" },
          { id: "forest", name: "Forest", hex: "#3d5c4a", group: "limited", available: false, imageIndex: 6 },
        ],
        2
      ),
      sizes: [{ id: "one-size", label: "ONE SIZE", available: true }],
      description:
        "Pashmina instant dengan fall elegan. Lembut di kulit, tampilan rapi untuk acara formal maupun daily.",
    },
  ];
}

export const PRODUCTS: Product[] = buildProducts();

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductByHeroSlot(slot: HeroSlot): Product | undefined {
  return PRODUCTS.find((p) => p.heroSlot === slot);
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
