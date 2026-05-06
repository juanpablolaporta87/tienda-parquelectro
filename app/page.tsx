import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Zap } from "lucide-react"

// Esto simula los datos de tu tienda "Parquelectro"
const productosOferta = [
  { id: 1, nombre: "Smartwatch Pro", precio: "$45.000", imagen: "/placeholder.png" },
  { id: 2, nombre: "Auriculares Bluetooth", precio: "$12.500", imagen: "/placeholder.png" },
  { id: 3, nombre: "Cargador Carga Rápida", precio: "$8.900", imagen: "/placeholder.png" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-slate-50 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Parquelectro
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Tecnología de punta con envíos en 24hs a todo AMBA.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg">Ver Catálogo</Button>
          <Button variant="outline" size="lg">Ofertas del Día</Button>
        </div>
      </section>

      {/* Sección de Productos - Aquí es donde el link #productos funcionará */}
      <section id="productos" className="container mx-auto py-16 px-4">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="text-yellow-500" />
          <h2 className="text-3xl font-bold">Ofertas del Día</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productosOferta.map((prod) => (
            <Card key={prod.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  {/* Aquí irán las imágenes de tu automatización de GitHub */}
                  <span className="text-muted-foreground">Imagen Producto</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>{prod.nombre}</CardTitle>
                <p className="text-2xl font-bold mt-2">{prod.price || prod.precio}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" /> Comprar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
