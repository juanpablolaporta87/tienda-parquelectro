import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Zap } from "lucide-react";

export default async function Home() {
  // 1. Leemos el archivo CSV desde la carpeta lib
  const filePath = path.join(process.cwd(), 'lib', 'productos.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // 2. Parseamos los datos
  const { data } = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
  });

  // 3. Limpiamos los datos (Shopify suele repetir filas por variantes, filtramos para ver productos únicos)
  const productos = data.slice(0, 20); // Tomamos los primeros 20 para probar

  return (
    <div className="flex flex-col min-h-screen">
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
          {productos.map((prod: any, index: number) => (
            <Card key={index} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                  {prod['Image Src'] ? (
                    <img 
                      src={prod['Image Src']} 
                      alt={prod['Title']} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">Sin imagen</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg leading-tight">{prod['Title']}</CardTitle>
                <p className="text-2xl font-bold mt-2">
                  ${prod['Variant Price'] || 'Consultar'}
                </p>
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
