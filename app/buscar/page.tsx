import { Suspense } from "react";
// Importa tus componentes de la tienda
import { ProductGrid } from "@/components/product-grid"; 

// 1. Creamos un componente interno que maneja la lógica de búsqueda
function BuscadorContenido() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Resultados de búsqueda</h1>
      {/* Aquí va tu ProductGrid o el componente que muestra los productos */}
      <ProductGrid /> 
    </div>
  );
}

// 2. La página principal "envuelve" al buscador en un Suspense
export default function BuscarPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg">Buscando productos en parquelectro...</p>
      </div>
    }>
      <BuscadorContenido />
    </Suspense>
  );
}
