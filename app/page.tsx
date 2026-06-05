import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { MostLovedSection } from "@/components/home/MostLovedSection";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <MostLovedSection />
      </main>
    </>
  );
}
