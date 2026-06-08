import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { getCategoryCarouselItems } from "@/data/category-carousel";
import { resolveImageFile } from "@/lib/img-catalog";

function isLocalSrc(src: string) {
  return src.startsWith("/");
}

export function CategoryCarousel() {
  const items = getCategoryCarouselItems();

  return (
    <section
      className="border-b border-neutral-200 bg-white lg:hidden"
      aria-label="Shop by category"
    >
      <Link
        href="/account"
        className="flex items-center justify-center gap-2 border-b border-neutral-200 py-3 text-[10px] font-medium tracking-[0.14em] text-black"
      >
        <User className="h-4 w-4" strokeWidth={1.5} />
        SIGN IN / SIGN UP
      </Link>

      <div className="category-carousel-scroll overflow-x-auto overscroll-x-contain">
        <ul className="flex w-max gap-3 px-4 py-4">
          {items.map((item) => {
            const src = resolveImageFile(item.imageFile);
            if (!src) return null;

            return (
              <li key={item.label} className="w-[88px] shrink-0 snap-start sm:w-[100px]">
                <Link href={item.href} className="group block">
                  <div className="relative aspect-square overflow-hidden bg-[#f0eeec]">
                    <Image
                      src={src}
                      alt={item.alt}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-active:scale-105"
                      sizes="100px"
                      unoptimized={isLocalSrc(src)}
                    />
                  </div>
                  <p className="mt-2 text-center text-[9px] font-semibold tracking-[0.12em] text-black sm:text-[10px]">
                    {item.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
