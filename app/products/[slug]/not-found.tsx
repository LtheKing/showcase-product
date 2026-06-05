import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function ProductNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-lg font-semibold tracking-wide">Product not found</h1>
        <Link
          href="/"
          className="mt-6 border border-black px-8 py-3 text-[11px] font-semibold tracking-[0.18em] hover:bg-black hover:text-white"
        >
          BACK TO HOME
        </Link>
      </main>
    </>
  );
}
