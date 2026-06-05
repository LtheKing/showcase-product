import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { AnnouncementBar } from "./AnnouncementBar";

const NAV_ITEMS = ["HIJAB", "GAMIS", "INNER", "ACCESSORIES"] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <AnnouncementBar />
      <div className="border-b border-neutral-200/80">
        <div className="mx-auto flex h-[72px] max-w-[1920px] items-center px-6 lg:px-10">
          <Link
            href="/"
            className="mr-8 shrink-0 font-sans text-[1.35rem] font-bold lowercase leading-none tracking-tight text-black lg:mr-10 lg:text-[1.5rem]"
            aria-label="HijabFirst home"
          >
            hijabfirst
          </Link>

          <nav
            className="hidden flex-1 items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href={`/collections/${item.toLowerCase()}`}
                className="text-[11px] font-medium tracking-[0.14em] text-black transition-opacity hover:opacity-60"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-5 lg:gap-7">
            <button
              type="button"
              className="text-black transition-opacity hover:opacity-60"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>

            <Link
              href="/account"
              className="hidden items-center gap-2 text-black transition-opacity hover:opacity-60 sm:flex"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
              <span className="border-b border-black pb-px text-[10px] font-medium tracking-[0.12em]">
                SIGN IN / SIGN UP
              </span>
            </Link>

            <Link
              href="/wishlist"
              className="text-black transition-opacity hover:opacity-60"
              aria-label="Wishlist"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>

            <Link
              href="/cart"
              className="relative text-black transition-opacity hover:opacity-60"
              aria-label="Shopping bag, 0 items"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-medium text-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
