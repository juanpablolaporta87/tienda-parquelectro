"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { calculateBulkPrice, getProductImage } from "@/lib/woocommerce"

export default function CategoryPage() {
  const params = useParams()
  const [products, setProducts] = useState<any[]>([])
  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        // Obtener categoría por slug
        const catRes = await fetch(`/api/categories?slug=${params.slug}`)
        const cats = await catRes.json()
        if (cats.length > 0) {
          setCategory(cats[0])
          const prodRes = await fetch(`/api/products?category=${cats[0].id}&per_page=24&page=1`)
          const prods = await prodRes.json()
          setProducts(prods)
          setHasMore(prods.length === 24)
        }
      } catch { }
      finally { setLoading(false) }
    }
    if (params.slug) load()
  }, [params.slug])

  const loadMore = async () => {
    const nextPage = page + 1
    const res = await fetch(`/api/products?category=${category.id}&per_page=24&page=${nextPage}`)
    const more = await res.json()
    setProducts(prev => [...prev, ...more])
    setPage(nextPage)
    setHasMore(more.length === 24)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {category?.name || "Categoría"}
            </h1>
            {category?.count && (
              <p className="text-sm text-muted-foreground">{category.count} productos</p>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(p => (
                <ProductCard key={p.id}
                  id={p.id} slug={p.slug} name={p.name}
                  image={getProductImage(p)}
                  unitPrice={parseFloat(p.price) || 0}
                  bulkPrice={calculateBulkPrice(p.price, 0.15)}
                  category={p.categories[0]?.name || category?.name || ""}
                />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-10">
                <Button variant="outline" onClick={loadMore}
                  className="border-primary/50 text-primary hover:bg-primary/10 px-8">
                  Cargar más productos
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No hay productos en esta categoría.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
