import { AboutCurators } from "@/components/AboutCurators";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MediaShowcase } from "@/components/MediaShowcase";
import { OrderCta } from "@/components/OrderCta";
import { ProductCategories } from "@/components/ProductCategories";
import { SiteFooter } from "@/components/SiteFooter";

/** Re-run server scan of public/media periodically so new files show without a full redeploy. */
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[var(--bloom-cream)]">
        <Hero />
        <AboutCurators />
        <ProductCategories />
        <MediaShowcase />
        <OrderCta />
      </main>
      <SiteFooter />
    </>
  );
}
