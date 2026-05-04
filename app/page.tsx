import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { ProductGrid } from "@/components/product-grid"
import { WholesaleBanner } from "@/components/wholesale-banner"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <ProductGrid />
        <WholesaleBanner />
      </main>
      <Footer />
    </div>
  )
}
