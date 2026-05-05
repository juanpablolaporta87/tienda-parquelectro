import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nuestros Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Aquí es donde luego vincularemos tu CSV para que se carguen solos */}
        <div className="border p-4 rounded-lg shadow">
          <div className="aspect-square bg-gray-100 mb-4 rounded italic flex items-center justify-center text-gray-400">
            Imagen del producto
          </div>
          <h2 className="font-semibold text-xl">Producto de Electrónica</h2>
          <p className="text-gray-600 my-2">Descripción breve del producto.</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold text-blue-600">$0.00</span>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Comprar</button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Link href="/" className="text-purple-600 hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
