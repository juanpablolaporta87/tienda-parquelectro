"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft, Package, Truck, Shield, ChevronRight, Loader2, Plus, Minus, MessageCircle, CreditCard, AlertTriangle } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { formatPrice, calculateBulkPrice } from "@/lib/utils-price"

const WC_URL = process.env.NEXT_PUBLIC_WC_URL || "https://parquelectro.com"
const WHATSAPP = "5491112345678"

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)
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

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-[#1B2C6B]" />
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
        <Link href="/"><Button className="bg-[#1B2C6B] text-white">Volver al inicio</Button></Link>
      </div>
      <Footer />
    </div>
  )

  const unitPrice = parseFloat(product.price) || 0
  const bulkPrice = calculateBulkPrice(unitPrice, 10)
  const stock = product.stock_quantity
  const sinStock = product.stock_status === "outofstock" || stock === 0
  const stockBajo = stock !== null && stock <= 3 && stock > 0
  const maxQuantity = stock !== null ? stock : 999
  const whatsappMsg = `Hola! Quiero consultar sobre: ${product.name}`

  const handleAddToCart = () => {
    if (!product || sinStock) return
    addItem({
      id: product.id,
      name: product.name,
      price: unitPrice,
      image: product.images[0]?.src || "/placeholder.jpg",
      sku: product.sku,
    }, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleComprarAhora = () => {
    // Redirigir al checkout de WooCommerce con el producto
    const checkoutUrl = `${WC_URL}/?add-to-cart=${product.id}&quantity=${quantity}`
    window.open(checkoutUrl, '_blank')
  }

  const increaseQty = () => {
    if (quantity < maxQuantity) setQuantity(q => q + 1)
  }
  const decreaseQty = () => setQuantity(q => Math.max(1, q - 1))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#1B2C6B] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Inicio
          </Link>
          <ChevronRight className="w-4 h-4" />
          {product.categories[0] && (
            <>
              <Link href={`/categoria/${product.categories[0].slug}`} className="hover:text-[#1B2C6B] transition-colors">
                {product.categories[0].name}
              </Link>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
          <span className="text-gray-600 line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imágenes */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
              <Image
                src={product.images[imgIdx]?.src || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
              {stockBajo && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  ¡Últimas {stock} unidades!
                </div>
              )}
              {sinStock && (
                <div className="absolute top-3 left-3 bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Sin stock
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.slice(0, 5).map((img: any, i: number) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-white border-2 transition-colors ${imgIdx === i ? 'border-[#1B2C6B]' : 'border-gray-100 hover:border-gray-300'}`}>
                    <Image src={img.src} alt={img.alt || product.name} fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {product.categories[0] && (
              <span className="text-xs font-bold uppercase tracking-widest text-[#9B59B6]">
                {product.categories[0].name}
              </span>
            )}
            <h1 className="text-2xl lg:text-3xl font-black text-[#1B2C6B] leading-tight">
              {product.name}
            </h1>
            {product.sku && (
              <p className="text-sm text-gray-400">SKU: {product.sku}</p>
            )}

            {/* Precios */}
            <div className="space-y-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Precio unitario</span>
                <span className="text-xl font-black text-[#1B2C6B]">{formatPrice(unitPrice)}</span>
              </div>
              {unitPrice > 0 && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#1B2C6B]/5 border border-[#1B2C6B]/10">
                  <div>
                    <span className="text-sm font-bold text-[#1B2C6B]">Precio x10+ unidades</span>
                    <p className="text-xs text-gray-400">Ahorrás 10%</p>
                  </div>
                  <span className="text-xl font-black text-[#F5A623]">{formatPrice(bulkPrice)}</span>
                </div>
              )}
              {stock !== null && (
                <p className="text-xs text-gray-400 text-right">
                  {sinStock ? '❌ Sin stock' : `✅ ${stock} unidades disponibles`}
                </p>
              )}
            </div>

            {/* Cantidad */}
            {!sinStock && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={decreaseQty} disabled={quantity <= 1}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-bold text-[#1B2C6B]">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={increaseQty} disabled={quantity >= maxQuantity}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {quantity >= maxQuantity && stock !== null && (
                  <span className="text-xs text-red-500 font-medium">Stock máximo alcanzado</span>
                )}
                {quantity >= 10 && (
                  <span className="text-xs text-[#2ECC40] font-bold">¡Precio mayorista aplicado!</span>
                )}
              </div>
            )}

            {/* Botones */}
            <div className="flex flex-col gap-3">
              <Button
                disabled={sinStock}
                onClick={handleComprarAhora}
                className="h-13 bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#1B2C6B] font-black text-base py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">
                <CreditCard className="w-5 h-5 mr-2" />
                {sinStock ? 'Sin stock' : 'Comprar ahora'}
              </Button>
              <Button
                variant="outline"
                disabled={sinStock}
                onClick={handleAddToCart}
                className="h-12 border-[#1B2C6B]/30 text-[#1B2C6B] hover:bg-[#1B2C6B]/5 font-semibold rounded-xl disabled:opacity-50">
                <ShoppingCart className="w-5 h-5 mr-2" />
                {added ? '✓ ¡Agregado al carrito!' : 'Agregar al carrito'}
              </Button>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank" rel="noopener noreferrer">
                <Button variant="ghost"
                  className="w-full h-11 text-green-600 hover:bg-green-50 hover:text-green-700 font-medium rounded-xl border border-green-200">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Consultar por WhatsApp
                </Button>
              </a>
            </div>

            {/* Beneficios */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              {[
                { icon: Truck, label: "Envíos AMBA 24hs", color: "text-[#1B2C6B]" },
                { icon: Package, label: "Stock disponible", color: "text-[#F5A623]" },
                { icon: Shield, label: "Garantía oficial", color: "text-[#2ECC40]" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white border border-gray-100 text-center">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="text-xs text-gray-500 leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Descripción */}
            {product.short_description && (
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-bold text-[#1B2C6B] mb-3">Descripción</h3>
                <div
                  className="text-sm text-gray-600 leading-relaxed prose max-w-none"
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
