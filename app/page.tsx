import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingCart, Zap, Truck, Shield, Package, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProducts, formatPrice, getProductImage } from "@/lib/woocommerce"

export default async function Home() {
  const productos = await getProducts()
  const productosConStock = productos.filter(p => p.images?.length > 0 && p.price)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* HERO */}
      <section className="relative bg-[#1B2C6B] overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5A623]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9B59B6]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#F5A623]/15 border border-[#F5A623]/30 rounded-full px-4 py-1.5">
                <Zap className="w-3.5 h-3.5 text-[#F5A623]" />
                <span className="text-xs font-semibold text-[#F5A623] uppercase tracking-wider">Distribución Mayorista</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Electrónica al<br />
                <span className="text-[#F5A623]">mejor precio</span><br />
                <span className="text-[#2ECC40]">mayorista</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed max-w-md">
                Más de 370 productos en stock. Envíos en 24hs al AMBA. Precios sin intermediarios para revendedores y comercios.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#productos">
                  <Button className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#1B2C6B] font-bold px-8 h-12 text-base">
                    Ver productos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="https://wa.me/5491112345678?text=Hola%2C%20quiero%20info%20sobre%20precios%20mayoristas"
                  target="_blank" rel="noopener noreferrer">
                  <Button variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 hover:text-white px-8 h-12 text-base">
                    Consultar por WhatsApp
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                {[
                  { value: "370+", label: "Productos" },
                  { value: "24hs", label: "Envío AMBA" },
                  { value: "100%", label: "Garantía" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-black text-[#F5A623]">{value}</p>
                    <p className="text-xs text-white/50 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid de productos destacados en el hero */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {productosConStock.slice(0, 4).map((p, i) => (
                <Link key={p.id} href={`/producto/${p.slug}`}
                  className={`group relative bg-white/10 backdrop-blur rounded-2xl overflow-hidden border border-white/10 hover:border-[#F5A623]/50 transition-all duration-300 ${i === 0 ? 'row-span-2' : ''}`}>
                  <div className={`relative w-full ${i === 0 ? 'h-64' : 'h-28'} bg-white/5`}>
                    <Image src={getProductImage(p)} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-white text-xs font-medium line-clamp-1">{p.name}</p>
                    <p className="text-[#F5A623] text-sm font-bold mt-0.5">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Envío 24hs al AMBA", color: "text-[#1B2C6B]" },
              { icon: Package, label: "Stock real disponible", color: "text-[#F5A623]" },
              { icon: Shield, label: "Garantía en todos los productos", color: "text-[#2ECC40]" },
              { icon: Star, label: "Precios mayoristas", color: "text-[#9B59B6]" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-3 py-2">
                <Icon className={`w-5 h-5 shrink-0 ${color}`} />
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="container mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-[#1B2C6B]">Nuestros Productos</h2>
            <p className="text-gray-500 text-sm mt-1">{productosConStock.length} productos disponibles</p>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#F5A623]" />
            <span className="text-sm font-semibold text-gray-600">Stock actualizado</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {productosConStock.map((producto) => {
            const stockBajo = producto.stock_quantity !== null && producto.stock_quantity <= 3 && producto.stock_quantity > 0
            const sinStock = producto.stock_status === "outofstock"

            return (
              <Link key={producto.id} href={`/producto/${producto.slug}`} className="group">
                <div className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:shadow-[#1B2C6B]/10 hover:-translate-y-1 flex flex-col h-full ${sinStock ? 'opacity-60' : 'border-gray-100 hover:border-[#1B2C6B]/20'}`}>
                  {/* Imagen */}
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={getProductImage(producto)}
                      alt={producto.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {stockBajo && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ¡Últimas unidades!
                        </span>
                      )}
                      {sinStock && (
                        <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Sin stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="text-xs font-medium text-gray-700 line-clamp-2 flex-1 leading-tight mb-2">
                      {producto.name}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-base font-black text-[#1B2C6B]">
                        {formatPrice(producto.price)}
                      </p>
                      <button
                        disabled={sinStock}
                        className={`w-full text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
                          sinStock
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#1B2C6B] text-white hover:bg-[#1B2C6B]/90 group-hover:bg-[#F5A623] group-hover:text-[#1B2C6B]'
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
      </section>

      {/* SECCIÓN MAYORISTA */}
      <section id="mayorista" className="bg-[#1B2C6B]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-black text-white">Programa Mayorista</h2>
            <p className="text-white/70 text-lg">
              Descuentos especiales por volumen. A partir de 10 unidades del mismo producto aplicamos precio mayorista automáticamente.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              {[
                { desde: "1–9 u.", desc: "Precio minorista", color: "border-white/20" },
                { desde: "10–49 u.", desc: "10% de descuento", color: "border-[#F5A623]/50" },
                { desde: "50+ u.", desc: "Precio especial", color: "border-[#2ECC40]/50" },
              ].map(({ desde, desc, color }) => (
                <div key={desde} className={`bg-white/5 border ${color} rounded-2xl p-5 text-center`}>
                  <p className="text-lg font-black text-white">{desde}</p>
                  <p className="text-sm text-white/60 mt-1">{desc}</p>
                </div>
              ))}
            </div>
            <a href="https://wa.me/5491112345678?text=Hola%2C%20quiero%20información%20sobre%20el%20programa%20mayorista"
              target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#1B2C6B] font-bold px-10 h-12 text-base">
                Consultar precios mayoristas
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
