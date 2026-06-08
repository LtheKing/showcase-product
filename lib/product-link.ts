import type { Product } from "@/data/products";
import { resolveImageFile } from "@/lib/img-catalog";

export function productDetailHref(
  slug: string,
  opts?: { color?: string; image?: string }
): string {
  const params = new URLSearchParams();
  if (opts?.color) params.set("color", opts.color);
  if (opts?.image) params.set("image", opts.image);
  const query = params.toString();
  return `/products/${slug}${query ? `?${query}` : ""}`;
}

/** Ambil "hijab1" dari "/img/hijab1.webp" */
export function imageFileFromSrc(src: string): string | undefined {
  if (!src.startsWith("/img/")) return undefined;
  const filename = decodeURIComponent(src.split("/").pop() ?? "");
  return filename.replace(/\.(jpe?g|png|webp|avif|gif)$/i, "");
}

function colorMatchesImageFile(
  colorImage: string | undefined,
  imageFile: string
): boolean {
  if (!colorImage) return false;
  const target = resolveImageFile(imageFile);
  if (target && colorImage === target) return true;
  const base = imageFile.replace(/\.(jpe?g|png|webp|avif|gif)$/i, "").toLowerCase();
  return colorImage.toLowerCase().includes(base);
}

/** Tentukan warna awal dari query ?color= atau ?image= */
export function resolveInitialColorId(
  product: Product,
  colorParam?: string | null,
  imageParam?: string | null
): string {
  const fallback = product.colors.find((c) => c.available) ?? product.colors[0];

  if (colorParam) {
    const byColor = product.colors.find((c) => c.id === colorParam && c.available);
    if (byColor) return byColor.id;
  }

  if (imageParam) {
    const byImage = product.colors.find(
      (c) => c.available && colorMatchesImageFile(c.image, imageParam)
    );
    if (byImage) return byImage.id;
  }

  return fallback.id;
}
