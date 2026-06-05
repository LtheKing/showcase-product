"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { formatIdr } from "@/lib/format-idr";
import { StarRating } from "./StarRating";

type ProductDetailViewProps = {
  product: Product;
};

function isLocalSrc(src: string) {
  return src.startsWith("/");
}

function ColorSwatch({
  hex,
  name,
  selected,
  available,
  onSelect,
}: {
  hex: string;
  name: string;
  selected: boolean;
  available: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!available}
      title={name}
      aria-label={`${name}${!available ? " — sold out" : selected ? " — selected" : ""}`}
      className={`relative h-9 w-9 rounded-full transition md:h-10 md:w-10 ${
        selected ? "ring-2 ring-black ring-offset-2" : "ring-1 ring-neutral-300"
      } ${!available ? "cursor-not-allowed opacity-50" : "hover:ring-black"}`}
      style={{ backgroundColor: hex }}
    >
      {!available && (
        <span
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <span className="h-px w-full rotate-45 bg-neutral-600" />
        </span>
      )}
    </button>
  );
}

function resolveColorImage(
  product: Product,
  colorId: string
): { src: string; alt: string } {
  const color = product.colors.find((c) => c.id === colorId);
  const src =
    color?.image ??
    product.images[0]?.src ??
    "/img/placeholder.webp";
  const alt = `${product.title} — ${color?.name ?? "produk"}`;
  return { src, alt };
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const defaultColor =
    product.colors.find((c) => c.available) ?? product.colors[0];
  const defaultSize =
    product.sizes.find((s) => s.available) ?? product.sizes[0];

  const [selectedColorId, setSelectedColorId] = useState(defaultColor.id);
  const [selectedSizeId, setSelectedSizeId] = useState(defaultSize.id);

  const selectedColor = useMemo(
    () => product.colors.find((c) => c.id === selectedColorId) ?? defaultColor,
    [product.colors, selectedColorId, defaultColor]
  );

  const activeImage = useMemo(
    () => resolveColorImage(product, selectedColorId),
    [product, selectedColorId]
  );

  const coreColors = product.colors.filter((c) => c.group === "core");
  const limitedColors = product.colors.filter((c) => c.group === "limited");

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Satu gambar — berubah saat warna dipilih */}
      <div className="lg:col-span-7">
        <div className="relative mx-auto aspect-[3/4] max-w-[720px] overflow-hidden bg-[#f0eeec] lg:max-w-none">
          <Image
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            className="object-cover object-center transition-opacity duration-300"
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
            unoptimized={isLocalSrc(activeImage.src)}
          />
        </div>
      </div>

      <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
        <nav className="mb-4 text-[10px] tracking-[0.14em] text-neutral-500">
          <Link href={`/collections/${product.category}`} className="hover:text-black">
            {product.categoryLabel.toUpperCase()}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.title}</span>
        </nav>

        <h1 className="text-[1.35rem] font-semibold leading-tight tracking-[0.06em] text-black md:text-[1.5rem]">
          {product.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <p className="text-[15px] font-medium text-black">{formatIdr(product.price)}</p>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-8">
          <p className="text-[11px] tracking-[0.08em] text-black">
            <span className="font-medium">Core:</span> {selectedColor.name}
            {selectedColor.group === "core" && (
              <Link
                href={`/collections/${product.category}`}
                className="ml-1 underline underline-offset-2"
              >
                (Shop All)
              </Link>
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {coreColors.map((color) => (
              <ColorSwatch
                key={color.id}
                hex={color.hex}
                name={color.name}
                selected={selectedColorId === color.id}
                available={color.available}
                onSelect={() => setSelectedColorId(color.id)}
              />
            ))}
          </div>
        </div>

        {limitedColors.length > 0 && (
          <div className="mt-6">
            <p className="text-[11px] font-medium tracking-[0.08em] text-black">Limited:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {limitedColors.map((color) => (
                <ColorSwatch
                  key={color.id}
                  hex={color.hex}
                  name={color.name}
                  selected={selectedColorId === color.id}
                  available={color.available}
                  onSelect={() => setSelectedColorId(color.id)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-neutral-200 pt-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[11px] font-medium tracking-[0.08em] text-black">Size</span>
            <Link
              href="/size-guide"
              className="text-[11px] tracking-[0.08em] text-black underline underline-offset-2"
            >
              Size Guide
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.id}
                type="button"
                disabled={!size.available}
                onClick={() => setSelectedSizeId(size.id)}
                className={`min-w-[100px] border px-6 py-3 text-[11px] font-medium tracking-[0.14em] transition ${
                  selectedSizeId === size.id
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 bg-white text-black hover:border-black"
                } ${!size.available ? "cursor-not-allowed opacity-40" : ""}`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-8">
          <p className="text-[13px] leading-relaxed text-neutral-700">{product.description}</p>
          <p className="mt-4 text-[11px] text-neutral-500">
            Selected: {selectedColor.name} ·{" "}
            {product.sizes.find((s) => s.id === selectedSizeId)?.label}
          </p>
        </div>
      </div>
    </div>
  );
}
