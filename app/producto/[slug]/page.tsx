"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft, Package, Truck, Shield, ChevronRight, Loader2, Plus, Minus, MessageCircle } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { formatPrice, calculateBulkPrice } from "@/lib/woocommerce"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products?slug=${params.slug}`)
        const data = await res.json()
        if (data && data.length > 0) setProduct(data[0])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    if (params.slug) fetchProduct()
  }, [params.slug])

  const handleAddToCart = () => {
    if (!product) return
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.images[0]?.src || "/placeholder.jpg",
      sku: product.sku,
    }, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const unitPrice = product ? parseFloat(product.price) : 0
  const bulkPrice = calculateBulkPrice(unitPrice, 0.15)
  const whatsappMsg = product ? `Hola! Quiero consultar sobre: ${product.name}` : ""

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Producto no encontrado</h1>
        <Link href="/"><Button>Volver al inicio</Button></Link>
      </div>
      <Footer />
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4" />
          {product.categories[0] && (
            <>
              <Link href={`/categoria/${product.categories[0].slug}`} className="hover:text-primary transition-colors">
                {product.categories[0].name}
              </Link>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-border/50">
              <Image
                src={product.images[0]?.src || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1, 5).map((img: any) => (
                  <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden bg-white border border-border/50 cursor-pointer hover:border-primary/50 transition-colors">
                    <Image src={img.src} alt={img.alt || product.name} fill className="object-contain p-2" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {product.categories[0] && (
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {product.categories[0].name}
              </span>
            )}
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              {product.name}
            </h1>
            {product.sku && (
              <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
            )}

            {/* Precios */}
            <div className="space-y-3 p-5 rounded-xl bg-card border border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Precio Unitario</span>
                <span className="text-lg font-semibold text-foreground">{formatPrice(unitPrice)}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
                <div>
                  <span className="text-sm font-bold text-primary">Precio x10+</span>
                  <p className="text-xs text-muted-foreground">Ahorrás {Math.round((1 - bulkPrice/unitPrice)*100)}%</p>
                </div>
                <span className="text-xl font-bold text-primary">{formatPrice(bulkPrice)}</span>
              </div>
            </div>

            {/* Cantidad */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Cantidad:</span>
              <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {quantity >= 10 && (
                <span className="text-xs text-primary font-medium">¡Precio mayorista aplicado!</span>
              )}
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold h-12"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {added ? "¡Agregado!" : "Agregar al Carrito"}
              </Button>
              <a
                href={`https://wa.me/5491112345678?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full h-12 border-green-500/50 text-green-500 hover:bg-green-500/10">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Consultar por WhatsApp
                </Button>
              </a>
            </div>

            {/* Beneficios */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
              {[
                { icon: Truck, label: "Envíos a todo el país" },
                { icon: Package, label: "Stock disponible" },
                { icon: Shield, label: "Garantía incluida" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card border border-border/30 text-center">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            {/* Descripción */}
            {product.short_description && (
              <div className="pt-4 border-t border-border/50">
                <h3 className="font-semibold text-foreground mb-3">Descripción</h3>
                <div
                  className="text-sm text-muted-foreground leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
