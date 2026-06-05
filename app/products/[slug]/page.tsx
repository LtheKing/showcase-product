import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { getAllProductSlugs, getProductBySlug } from "@/data/products";

type PageProps = {
  params: Promise<{ slug: string }>;
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

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <div className="mx-auto max-w-[1920px] px-4 py-8 md:px-8 md:py-12 lg:px-10">
          <ProductDetailView product={product} />
        </div>
      </main>
    </>
  );
}
