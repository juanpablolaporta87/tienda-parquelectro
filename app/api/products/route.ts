import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/woocommerce'

export const dynamic = 'force-dynamic' // Evita errores de compilación

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}