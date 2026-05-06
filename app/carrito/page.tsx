"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/woocommerce"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const total = getTotal()
  const isBulk = items.some(i => i.quantity >= 10)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Tu Carrito</h1>
          <span className="text-sm text-muted-foreground">({items.length} {items.length === 1 ? "producto" : "productos"})</span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <ShoppingBag className="w-20 h-20 text-muted-foreground/30" />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Tu carrito está vacío</h2>
              <p className="text-muted-foreground">Explorá nuestro catálogo y encontrá los mejores precios mayoristas.</p>
            </div>
            <Link href="/">
              <Button className="bg-primary text-primary-foreground">Ver Productos</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground line-clamp-2 mb-1">{item.name}</h3>
                    {item.sku && <p className="text-xs text-muted-foreground mb-2">SKU: {item.sku}</p>}
                    <p className="text-sm font-semibold text-primary">{formatPrice(item.price)} c/u</p>
                    {item.quantity >= 10 && (
                      <span className="text-xs text-green-500 font-medium">✓ Precio mayorista aplicado</span>
                    )}
                  </div>
                  <div className="flex flex-col items-end justify-between gap-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1">
                      <button className="w-7 h-7 flex items-center justify-center hover:text-primary transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button className="w-7 h-7 flex items-center justify-center hover:text-primary transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-bold text-foreground">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive transition-colors">
                Vaciar carrito
              </button>
            </div>

            {/* Resumen */}
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-card border border-border/50 space-y-4">
                <h2 className="font-bold text-foreground text-lg">Resumen del pedido</h2>
                <div className="space-y-2 text-sm">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-muted-foreground">
                      <span className="line-clamp-1 flex-1 mr-2">{item.name} x{item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/50 pt-3">
                  <div className="flex justify-between font-bold text-foreground text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                  {isBulk && (
                    <p className="text-xs text-green-500 mt-1">✓ Descuento mayorista aplicado en algunos productos</p>
                  )}
                </div>
                <Link href="/checkout" className="block">
                  <Button className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold">
                    Finalizar Pedido
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                  Coordinamos el pago y envío por WhatsApp
                </p>
              </div>

              {/* Beneficios mayorista */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-2">💡 Tip Mayorista</p>
                <p className="text-xs text-muted-foreground">
                  Comprando 10+ unidades de un mismo producto activás el precio mayorista automáticamente.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
