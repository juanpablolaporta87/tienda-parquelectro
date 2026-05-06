import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'

// Usamos las interfaces que ya tenías pero adaptadas a lo que realmente tiene tu CSV
export interface WooProduct {
  id: string | number
  name: string
  slug: string
  description: string
  price: string | number
  images: { src: string }[]
  categories: { name: string }[]
  date_created?: string
}

// Función central para leer el CSV desde la carpeta PUBLIC
async function getLocalProducts(): Promise<any[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'productos.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const { data } = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true
    });

    // Mapeamos los campos de Shopify a los que espera tu tienda
    return data.map((item: any) => ({
      id: item.Handle || Math.random(),
      name: item.Title || item.name,
      slug: item.Handle || item.handle,
      description: item['Body (HTML)'] || '',
      price: item['Variant Price'] || item.price || 0,
      images: [{ src: item['Image Src'] || item.image || '/images/placeholder.jpg' }],
      categories: [{ name: item.Type || item.category || 'Electrónica' }],
      date_created: new Date().toISOString() // Fecha ficticia para que no de error
    }));
  } catch (error) {
    console.error("Error leyendo el CSV:", error);
    return [];
  }
}

// ============================================
// FUNCIONES COMPATIBLES CON TU TIENDA
// ============================================

export async function getProducts(params?: any): Promise<WooProduct[]> {
  const products = await getLocalProducts();
  
  // Si hay búsqueda, filtramos
  if (params?.search) {
    return products.filter(p => 
      p.name.toLowerCase().includes(params.search.toLowerCase())
    );
  }

  return products;
}

export async function getProduct(slug: string): Promise<WooProduct> {
  const products = await getLocalProducts();
  const product = products.find(p => p.slug === slug);
  
  if (!product) throw new Error('Producto no encontrado');
  return product;
}

// Estos helpers mantienen la estética de tu tienda
export function formatPrice(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(num);
}

export function calculateBulkPrice(price: string | number, discount = 0.15): number {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return Math.round(num * (1 - discount));
}

export function getProductImage(product: any): string {
  return product.images[0]?.src || '/images/placeholder.jpg';
}