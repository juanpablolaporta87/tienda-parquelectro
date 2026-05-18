import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingCart, Zap, Truck, Shield, Package, ArrowRight, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProducts, formatPrice, getProductImage } from "@/lib/woocommerce"

export default async function Home() {
  const productos = await getProducts()
  const productosConStock = productos.filter(p => p.images?.length > 0 && p.price)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <section className="relative bg-white overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EEF1FB] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFF8ED] rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container mx-auto px-4 py-14 lg:py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/30 rounded-full px-4 py-1.5">
                <Zap className="w-3.5 h-3.5 text-[#F5A623]" />
                <span className="text-xs font-bold text-[#F5A623] uppercase tracking-wider">Distribución Mayorista AMBA</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-[#1B2C6B] leading-tight">
                Electrónica al<br />
                <span className="text-[#F5A623]">mejor precio</span><br />
                <span className="text-[#2ECC40]">mayorista</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                Más de 370 productos en stock. Envíos en 24hs al AMBA. Precios sin intermediarios para revendedores y comercios.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#productos">
                  <Button className="bg-[#1B2C6B] hover:bg-[#1B2C6B]/90 text-white font-bold px-8 h-12 text-base rounded-2xl">
                    Ver productos <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="https://wa.me/5491112345678?text=Hola%2C%20quiero%20info%20sobre%20precios%20mayoristas" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-[#2ECC40] text-[#2ECC40] hover:bg-[#2ECC40]/5 px-8 h-12 text-base rounded-2xl font-semibold">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                  </Button>
                </a>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                {[
                  { value: "370+", label: "Productos", bg: "bg-[#EEF1FB]", color: "text-[#1B2C6B]" },
                  { value: "24hs", label: "Envío AMBA", bg: "bg-[#FFF8ED]", color: "text-[#F5A623]" },
                  { value: "100%", label: "Garantía", bg: "bg-[#EDFBF0]", color: "text-[#2ECC40]" },
                ].map(({ value, label, bg, color }) => (
                  <div key={label} className={`${bg} rounded-2xl p-4 text-center`}>
                    <p className={`text-2xl font-black ${color}`}>{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {productosConStock.slice(0, 4).map((p, i) => (
                <Link key={p.id} href={`/producto/${p.slug}`}
                  className={`group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-[#1B2C6B]/20 hover:shadow-lg transition-all duration-300 ${i === 0 ? 'row-span-2' : ''}`}>
                  <div className={`relative w-full ${i === 0 ? 'h-64' : 'h-28'} bg-white`}>
                    <Image src={getProductImage(p)} alt={p.name} fill className="object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3 border-t border-gray-100">
                    <p className="text-gray-700 text-xs font-medium line-clamp-1">{p.name}</p>
                    <p className="text-[#1B2C6B] text-sm font-black mt-0.5">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Envío 24hs al AMBA", sub: "Entrega rápida y segura", bg: "bg-[#EDFBF0]", icon_color: "text-[#2ECC40]" },
              { icon: Package, label: "Stock real disponible", sub: "Actualizado en tiempo real", bg: "bg-[#FFF8ED]", icon_color: "text-[#F5A623]" },
              { icon: Shield, label: "Garantía incluida", sub: "En todos los productos", bg: "bg-[#F3EEFF]", icon_color: "text-[#9B59B6]" },
              { icon: Star, label: "Precios mayoristas", sub: "Sin intermediarios", bg: "bg-[#EEF1FB]", icon_color: "text-[#1B2C6B]" },
            ].map(({ icon: Icon, label, sub, bg, icon_color }) => (
              <div key={label} className={`${bg} rounded-2xl p-5 flex items-start gap-4`}>
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Icon className={`w-5 h-5 ${icon_color}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="bg-gray-50">
        <div className="container mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-black text-[#1B2C6B]">Nuestros Productos</h2>
              <p className="text-gray-400 text-sm mt-1">{productosConStock.length} productos disponibles</p>
            </div>
            <div className="flex items-center gap-2 bg-[#EDFBF0] px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#2ECC40] animate-pulse" />
              <span className="text-xs font-semibold text-[#2ECC40]">Stock en vivo</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {productosConStock.map((producto) => {
              const stockBajo = producto.stock_quantity !== null && producto.stock_quantity <= 3 && producto.stock_quantity > 0
              const sinStock = producto.stock_status === "outofstock"
              return (
                <Link key={producto.id} href={`/producto/${producto.slug}`} className="group">
                  <div className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full ${sinStock ? 'opacity-60 border-gray-100' : 'border-gray-100 hover:border-[#1B2C6B]/20'}`}>
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <Image src={getProductImage(producto)} alt={producto.name} fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {stockBajo && (
                          <span className="bg-[#FFF8ED] text-[#F5A623] border border-[#F5A623]/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            ¡Últimas unidades!
                          </span>
                        )}
                        {sinStock && (
                          <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">Sin stock</span>
                        )}
                      </div>
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="text-xs font-medium text-gray-600 line-clamp-2 flex-1 leading-tight mb-2">{producto.name}</h3>
                      <div className="space-y-2">
                        <p className="text-sm font-black text-[#1B2C6B]">{formatPrice(producto.price)}</p>
                        <button disabled={sinStock}
                          className={`w-full text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                            sinStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-[#EEF1FB] text-[#1B2C6B] hover:bg-[#1B2C6B] hover:text-white group-hover:bg-[#F5A623] group-hover:text-[#1B2C6B]'
                          }`}>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          {sinStock ? 'Sin stock' : 'Agregar'}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* MAYORISTA */}
      <section id="mayorista" className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#EEF1FB] rounded-full px-4 py-1.5">
              <Zap className="w-3.5 h-3.5 text-[#1B2C6B]" />
              <span className="text-xs font-bold text-[#1B2C6B] uppercase tracking-wider">Programa Mayorista</span>
            </div>
            <h2 className="text-3xl font-black text-[#1B2C6B]">Precios por volumen</h2>
            <p className="text-gray-500 text-lg">Descuentos automáticos según la cantidad. Sin trámites, sin formularios.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              {[
                { desde: "1–9 u.", desc: "Precio minorista", bg: "bg-gray-50", border: "border-gray-200", color: "text-gray-700" },
                { desde: "10–49 u.", desc: "10% de descuento", bg: "bg-[#FFF8ED]", border: "border-[#F5A623]/40", color: "text-[#F5A623]" },
                { desde: "50+ u.", desc: "Precio especial", bg: "bg-[#EDFBF0]", border: "border-[#2ECC40]/40", color: "text-[#2ECC40]" },
              ].map(({ desde, desc, bg, border, color }) => (
                <div key={desde} className={`${bg} border ${border} rounded-2xl p-6 text-center`}>
                  <p className={`text-2xl font-black ${color}`}>{desde}</p>
                  <p className="text-sm text-gray-500 mt-1">{desc}</p>
                </div>
              ))}
            </div>
            <a href="https://wa.me/5491112345678?text=Hola%2C%20quiero%20información%20sobre%20el%20programa%20mayorista" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#1B2C6B] hover:bg-[#1B2C6B]/90 text-white font-bold px-10 h-12 text-base rounded-2xl">
                <MessageCircle className="w-5 h-5 mr-2" /> Consultar precios mayoristas
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
