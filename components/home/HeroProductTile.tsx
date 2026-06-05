import Image from "next/image";
import Link from "next/link";

type HeroProductTileProps = {
  href: string;
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

function isLocalSrc(src: string) {
  return src.startsWith("/");
}

export function HeroProductTile({
  href,
  src,
  alt,
  priority = false,
  className = "",
  imageClassName = "object-cover object-center",
  sizes = "(max-width: 1024px) 100vw, 33vw",
}: HeroProductTileProps) {
  return (
    <Link
      href={href}
      className={`group/tile relative block overflow-hidden transition-all duration-500 ease-out group-hover/hero:scale-[0.97] group-hover/hero:opacity-75 group-hover/hero:brightness-95 hover:z-30 hover:!scale-[1.04] hover:!opacity-100 hover:!brightness-100 hover:shadow-[0_24px_48px_rgba(0,0,0,0.18)] ${className}`}
      aria-label={`Lihat detail produk — ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`transition-transform duration-500 ease-out group-hover/tile:scale-105 ${imageClassName}`}
        sizes={sizes}
        priority={priority}
        unoptimized={isLocalSrc(src)}
      />
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/tile:bg-black/5" />
    </Link>
  );
}
