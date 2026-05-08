import { NextResponse } from 'next/server'
import { getProducts, getProduct } from '@/lib/woocommerce'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (slug) {
    const product = await getProduct(slug)
    return NextResponse.json(product ? [product] : [])
  }

  const products = await getProducts()
  return NextResponse.json(products)
}