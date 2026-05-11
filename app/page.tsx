import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingCart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { getProducts, formatPrice, getProductImage } from "@/lib/woocommerce"

export default async function Home() {
  const productos = await getProducts()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <section className="py-20 bg-slate-50 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Parquelectro</h1>
        <p className="mt-4 text-xl text-muted-foreground">Electrónica con envío rápido en AMBA.</p>
      </section>

      <section id="productos" className="container mx-auto py-16 px-4">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="text-yellow-500" />
          <h2 className="text-3xl font-bold">Nuestros Productos</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <Link key={producto.id} href={`/producto/${producto.slug}`}>
              <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={getProductImage(producto)}
                      alt={producto.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <h3 className="font-semibold text-sm leading-tight line-clamp-2">{producto.name}</h3>
                  <p className="text-2xl font-bold mt-2 text-primary">
                    {formatPrice(producto.price)}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full gap-2">
                    <ShoppingCart className="h-4 w-4" /> Comprar
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}