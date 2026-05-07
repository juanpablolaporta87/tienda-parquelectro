"use client"

import { useState, useEffect } from "react" // Agregamos useEffect
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/woocommerce"
import { ArrowLeft, CheckCircle, Loader2, MessageCircle } from "lucide-react"

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "",
    company: "", address_1: "", city: "", state: "", postcode: "",
    customer_note: ""
  })

  const total = getTotal()

  // --- ARREGLO PARA VERCEL ---
  // Redirigimos solo cuando el componente ya cargó en el navegador
  useEffect(() => {
    if (items.length === 0 && !success) {
      router.push("/carrito")
    }
  }, [items, router, success])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billing: { ...form, country: "AR" },
          customer_note: form.customer_note,
          payment_method: "bacs",
          payment_method_title: "Transferencia bancaria",
          line_items: items.map(i => ({ product_id: i.id, quantity: i.quantity })),
        }),
      })
      if (res.ok) {
        setSuccess(true)
        clearCart()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">¡Pedido recibido!</h1>
        <p className="text-muted-foreground max-w-md">
          Gracias por tu compra. Nos pondremos en contacto a la brevedad para coordinar el pago y el envío.
        </p>
        <a href="https://wa.me/5491112345678?text=Hola! Acabo de hacer un pedido en Parquelectro."
          target="_blank" rel="noopener noreferrer">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <MessageCircle className="w-5 h-5 mr-2" />
            Confirmar por WhatsApp
          </Button>
        </a>
        <Link href="/"><Button variant="ghost">Volver al inicio</Button></Link>
      </div>
      <Footer />
    </div>
  )

  // Si no hay items, no mostramos nada mientras el useEffect redirige
  if (items.length === 0) return null

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/carrito"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-2xl font-bold text-foreground">Finalizar Pedido</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border/50 space-y-4">
              <h2 className="font-bold text-foreground">Datos de contacto</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Nombre *</label>
                  <Input name="first_name" value={form.first_name} onChange={handleChange} required
                    className="bg-input border-border focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Apellido *</label>
                  <Input name="last_name" value={form.last_name} onChange={handleChange} required
                    className="bg-input border-border focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Email *</label>
                  <Input name="email" type="email" value={form.email} onChange={handleChange} required
                    className="bg-input border-border focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Teléfono / WhatsApp *</label>
                  <Input name="phone" value={form.phone} onChange={handleChange} required
                    className="bg-input border-border focus:border-primary" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Empresa / Negocio</label>
                  <Input name="company" value={form.company} onChange={handleChange}
                    className="bg-input border-border focus:border-primary" />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/50 space-y-4">
              <h2 className="font-bold text-foreground">Dirección de envío</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Dirección *</label>
                  <Input name="address_1" value={form.address_1} onChange={handleChange} required
                    className="bg-input border-border focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Ciudad *</label>
                  <Input name="city" value={form.city} onChange={handleChange} required
                    className="bg-input border-border focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Provincia</label>
                  <Input name="state" value={form.state} onChange={handleChange}
                    className="bg-input border-border focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Código Postal</label>
                  <Input name="postcode" value={form.postcode} onChange={handleChange}
                    className="bg-input border-border focus:border-primary" />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/50 space-y-4">
              <h2 className="font-bold text-foreground">Notas del pedido</h2>
              <textarea name="customer_note" value={form.customer_note} onChange={handleChange}
                placeholder="Instrucciones especiales, consultas sobre el pedido..."
                rows={3}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none" />
            </div>

            <Button type="submit" disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold">
              {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Procesando...</> : "Confirmar Pedido"}
            </Button>
          </form>

          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-card border border-border/50 space-y-4 sticky top-24">
              <h2 className="font-bold text-foreground">Tu pedido</h2>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm gap-2">
                    <span className="text-muted-foreground line-clamp-1 flex-1">{item.name} ×{item.quantity}</span>
                    <span className="font-medium text-foreground flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/50 pt-3 flex justify-between font-bold text-foreground text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
                <p className="font-semibold text-primary mb-1">💳 Forma de pago</p>
                <p>Transferencia bancaria / Efectivo. Coordinamos por WhatsApp al confirmar el pedido.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}