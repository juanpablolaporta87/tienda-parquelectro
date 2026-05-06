"use client"

import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Filter, Loader2 } from "lucide-react"
import { useProducts } from "@/hooks/use-products"
import { calculateBulkPrice, getProductImage } from "@/lib/woocommerce"

// Productos estáticos de fallback (cuando WooCommerce no está conectado)
const fallbackProducts = [
  {
    name: "TV Box TIME 4K Ultra HD con Control por Voz",
    image: "https://cdn.shopify.com/s/files/1/0796/0703/8180/files/WhatsAppImage2026-04-17at10.22.25.jpg?v=1776432270",
    unitPrice: 40200,
    bulkPrice: 26769,
    category: "TV Box",
    isNew: true
  },
  {
    name: "Estabilizador de Tensión Forza 1200VA FVR-1202A",
    image: "https://cdn.shopify.com/s/files/1/0796/0703/8180/files/REGULADOR-DE-VOLTAJE-FORZA-FVR-1202A.png?v=1777403743",
    unitPrice: 50170,
    bulkPrice: 33447,
    category: "Estabilizadores",
    isNew: true
  },
  {
    name: "Transmisor Receptor Bluetooth Noga NG-RBT04",
    image: "https://cdn.shopify.com/s/files/1/0796/0703/8180/files/ng-rbt04-pack2026-8b747af96fc697884317593283530866-1024-1024.webp?v=1777405304",
    unitPrice: 13500,
    bulkPrice: 8792,
    category: "Audio",
    isNew: false
  },
  {
    name: "Tira LED Neon RGB 5 Metros – TIME",
    image: "https://cdn.shopify.com/s/files/1/0796/0703/8180/files/kit-tira-de-led-neon-rgb-con-controladora-fuente-5mts_adf7e6c5-c24a-49b0-b6b4-68969f9e49e7.jpg?v=1776377991",
    unitPrice: 10560,
    bulkPrice: 7040,
    category: "Iluminación LED",
    isNew: true
  },
  {
    name: "Joystick Inalámbrico para PS4 – Control Compatible",
    image: "https://cdn.shopify.com/s/files/1/0796/0703/8180/files/WhatsAppImage2026-04-16at18.21.13.jpg?v=1776374556",
    unitPrice: 19500,
    bulkPrice: 12548,
    category: "Gaming",
    isNew: false
  },
  {
    name: "Cargador Kosmo 3.3A 3 Puertos USB + Cable Lightning",
    image: "https://cdn.shopify.com/s/files/1/0796/0703/8180/files/WhatsAppImage2026-04-28at18.11.40.jpg?v=1777410865",
    unitPrice: 4500,
    bulkPrice: 2803,
    category: "Cargadores",
    isNew: false
  },
  {
    name: "Cable Conversor VGA a HDMI con Audio – NOGA",
    image: "https://cdn.shopify.com/s/files/1/0796/0703/8180/files/hdmi-vga-cable-ce9aef9c5b33d3231b17473248967116-1024-1024.webp?v=1776375157",
    unitPrice: 3360,
    bulkPrice: 2240,
    category: "Cables",
    isNew: false
  },
  {
    name: "Subwoofer Bluetooth 5\" SEISA YX-BS518 – 120W",
    image: "https://cdn.shopify.com/s/files/1/0796/0703/8180/files/ca657d0626d6b6ffd5de4a342e1ff5df.webp?v=1776177537",
    unitPrice: 29500,
    bulkPrice: 19667,
    category: "Parlantes",
    isNew: true
  },
  {
    name: "Cargador de Notebook Universal – TIME",
    image: "https://cdn.shopify.com/s/files/1/0796/0703/8180/files/TMCN901.jpg?v=1776375870",
    unitPrice: 11500,
    bulkPrice: 7667,
    category: "Cargadores",
    isNew: false
  }
]

export function ProductGrid() {
  // Intentar cargar productos de WooCommerce
  const { products: wooProducts, isLoading, isError } = useProducts({ per_page: 12 })
  
  // Determinar si usar WooCommerce o fallback
  const useWooCommerce = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL && !isError && wooProducts.length > 0
  
  // Mapear productos de WooCommerce al formato del componente
  const products = useWooCommerce
    ? wooProducts.map(p => ({
        id: p.id,
        name: p.name,
        image: getProductImage(p),
        unitPrice: parseFloat(p.price) || 0,
        bulkPrice: calculateBulkPrice(p.price, 0.15),
        category: p.categories[0]?.name || "Sin categoría",
        isNew: p.date_created ? (new Date(p.date_created).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
      }))
    : fallbackProducts

  return (
    <section id="productos" className="py-16 lg:py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Catálogo Mayorista
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Productos <span className="text-neon-lime">Destacados</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Electrónica, audio y accesorios con precios exclusivos para mayoristas. Comprá en volumen y maximizá tu ganancia.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-border hover:border-primary/50">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
              Ver Todo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Cargando productos...</span>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id || index} {...product} />
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/50 text-primary hover:bg-primary/10 px-8"
          >
            Cargar Más Productos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
