import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";
import { getAllProductSlugs, getProductBySlug } from "@/data/products";
import { resolveInitialColorId } from "@/lib/product-link";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ color?: string; image?: string }>;
};

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} – HijabFirst`,
    description: product.description,
  };
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { color, image } = await searchParams;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const initialColorId = resolveInitialColorId(product, color, image);

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <div className="mx-auto max-w-[1920px] px-4 py-8 md:px-8 md:py-12 lg:px-10">
          <ScrollFadeIn y={24}>
            <ProductDetailView product={product} initialColorId={initialColorId} />
          </ScrollFadeIn>
        </div>
      </main>
    </>
  );
}
