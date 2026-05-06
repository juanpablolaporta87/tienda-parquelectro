"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2 } from "lucide-react"
import { calculateBulkPrice, getProductImage } from "@/lib/woocommerce"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const q = searchParams.get("q")
    if (q) { setQuery(q); doSearch(q) }
  }, [searchParams])

  async function doSearch(q: string) {
    if (!q.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(q)}&per_page=24`)
      const data = await res.json()
      setResults(data)
    } catch { setResults([]) }
    finally { setLoading(false) }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    doSearch(query)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto mb-10">
          <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Buscar Productos</h1>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Buscar en el catálogo..."
                className="pl-11 h-12 bg-input border-border focus:border-primary" />
            </div>
            <Button type="submit" className="h-12 px-6 bg-primary text-primary-foreground">Buscar</Button>
          </form>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground mb-6">{results.length} resultados para "{searchParams.get("q")}"</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map(p => (
                <ProductCard key={p.id}
                  id={p.id} slug={p.slug} name={p.name}
                  image={getProductImage(p)}
                  unitPrice={parseFloat(p.price) || 0}
                  bulkPrice={calculateBulkPrice(p.price, 0.15)}
                  category={p.categories[0]?.name || "Sin categoría"}
                />
              ))}
            </div>
          </>
        )}

        {!loading && query && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No se encontraron productos para "{query}"</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
