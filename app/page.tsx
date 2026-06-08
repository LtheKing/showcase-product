import { SiteHeader } from "@/components/layout/SiteHeader";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { HeroSection } from "@/components/home/HeroSection";
import { MostLovedSection } from "@/components/home/MostLovedSection";
import { OuterSection } from "@/components/home/OuterSection";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <ScrollFadeIn y={16} duration={600}>
        <CategoryCarousel />
      </ScrollFadeIn>
      <main>
        <ScrollFadeIn delay={50}>
          <HeroSection />
        </ScrollFadeIn>
        <MostLovedSection />
        <OuterSection />
      </main>
    </>
  );
}
