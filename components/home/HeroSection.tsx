import Link from "next/link";
import type { Product } from "@/data/products";
import { getProductByHeroSlot } from "@/data/products";
import { getHeroImages } from "@/lib/hero-images";
import { imageFileFromSrc, productDetailHref, resolveInitialColorId } from "@/lib/product-link";
import { HeroProductTile } from "./HeroProductTile";

function heroProductHref(product: Product, imageSrc: string) {
  const imageFile = imageFileFromSrc(imageSrc);
  if (!imageFile) return `/products/${product.slug}`;
  const colorId = resolveInitialColorId(product, null, imageFile);
  return productDetailHref(product.slug, { color: colorId, image: imageFile });
}

function CollectionStamp() {
  return (
    <div
      className="absolute -bottom-5 -right-5 z-10 flex h-[80px] w-[80px] items-center justify-center rounded-full border border-neutral-300/60 bg-hf-stamp text-center shadow-sm md:-bottom-6 md:-right-6 md:h-[88px] md:w-[88px]"
      aria-hidden
    >
      <p className="font-serif text-[8px] font-medium uppercase leading-tight tracking-[0.08em] text-neutral-700 md:text-[9px]">
        Hijab
        <br />
        First
        <br />
        &apos;26
      </p>
    </div>
  );
}

export function HeroSection() {
  const HERO_IMAGES = getHeroImages();
  const leftProduct = getProductByHeroSlot("left");
  const centerProduct = getProductByHeroSlot("center");
  const rightProduct = getProductByHeroSlot("right");

  return (
    <section className="relative w-full bg-[#f5f4f2]">
      <div className="group/hero grid w-full grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] md:gap-1 lg:gap-2">
        {/* Kiri — portrait full height */}
        <div className="relative min-h-[85vw] w-full md:min-h-[calc(100vh-7.5rem)]">
          {leftProduct && (
            <HeroProductTile
              href={heroProductHref(leftProduct, HERO_IMAGES.left.src)}
              src={HERO_IMAGES.left.src}
              alt={HERO_IMAGES.left.alt}
              priority
              className="absolute inset-0 h-full w-full"
              imageClassName="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
        </div>

        {/* Tengah — headline + framed image */}
        <div className="flex w-full flex-col bg-[#f5f4f2] px-5 py-10 md:min-h-[calc(100vh-7.5rem)] md:px-6 md:py-12 lg:px-8">
          <div className="shrink-0 text-center md:pt-2 lg:pt-6">
            <h1 className="font-serif text-[2rem] font-normal italic leading-[1.08] tracking-tight text-black sm:text-[2.5rem] md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem]">
              Soft Mauve &amp; Cream Voile
            </h1>
            <p className="mt-3 text-[10px] font-semibold tracking-[0.22em] text-black md:text-[11px]">
              NEW HIJAB COLLECTION
            </p>
          </div>

          <div className="relative mt-8 flex flex-1 items-center justify-center md:mt-6">
            <div className="relative w-full max-w-none">
              <div className="relative aspect-[5/4] w-full overflow-visible border-[8px] border-white bg-white shadow-sm md:aspect-[4/5] lg:border-[10px]">
                {centerProduct && (
                  <HeroProductTile
                    href={heroProductHref(centerProduct, HERO_IMAGES.center.src)}
                    src={HERO_IMAGES.center.src}
                    alt={HERO_IMAGES.center.alt}
                    priority
                    className="absolute inset-0 h-full w-full"
                    sizes="(max-width: 768px) 100vw, 38vw"
                  />
                )}
              </div>
              <CollectionStamp />
            </div>
          </div>
        </div>

        {/* Kanan — portrait + CTA */}
        <div className="relative min-h-[85vw] w-full md:min-h-[calc(100vh-7.5rem)]">
          {rightProduct && (
            <HeroProductTile
              href={heroProductHref(rightProduct, HERO_IMAGES.right.src)}
              src={HERO_IMAGES.right.src}
              alt={HERO_IMAGES.right.alt}
              priority
              className="absolute inset-0 h-full w-full"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
        </div>
      </div>

      {/* CTA — mobile: centered di bawah hero; desktop: pojok kanan bawah seperti Alo */}
      <div className="flex justify-center bg-[#f5f4f2] px-6 pb-10 pt-8 md:contents">
        <Link
          href="/products/instant-jersey-plum"
          className="z-20 inline-flex w-full max-w-[280px] items-center justify-center border border-black bg-white px-7 py-3.5 text-[10px] font-semibold tracking-[0.18em] text-black transition hover:bg-black hover:text-white sm:w-auto sm:min-w-[200px] md:absolute md:bottom-8 md:right-8 md:w-auto md:max-w-none md:min-w-[160px] md:px-8 md:py-3.5 md:text-[11px] lg:bottom-10 lg:right-12"
        >
          SHOP NEW ARRIVALS
        </Link>
      </div>
    </section>
  );
}
