import Image from "next/image";
import Link from "next/link";
import { getMostLovedItems } from "@/data/most-loved";

function isLocalSrc(src: string) {
  return src.startsWith("/");
}

export function MostLovedSection() {
  const items = getMostLovedItems();

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-4 py-14 md:px-8 md:py-20 lg:px-10">
      <div className="mx-auto w-full max-w-[1920px]">
        <h2 className="text-center text-[11px] font-semibold tracking-[0.28em] text-black md:text-xs">
          MOST LOVED
        </h2>

        <div
          className={`mt-10 grid gap-3 md:gap-4 lg:mt-12 lg:gap-5 ${
            items.length === 1
              ? "grid-cols-1 max-w-sm mx-auto"
              : items.length === 2
                ? "grid-cols-2 max-w-2xl mx-auto"
                : items.length === 3
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-2 md:grid-cols-4"
          }`}
        >
          {items.map((item) => (
            <Link key={item.title} href={item.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#f0eeec]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized={isLocalSrc(item.image)}
                />
              </div>
              <p className="mt-4 text-center text-[10px] font-medium tracking-[0.16em] text-black md:text-[11px]">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
