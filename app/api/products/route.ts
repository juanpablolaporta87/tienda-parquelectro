import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getProduct } from '@/lib/woocommerce'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    if (slug) {
      const product = await getProduct(slug)
      return NextResponse.json([product])
    }
    
    const products = await getProducts({
      page: parseInt(searchParams.get('page') || '1'),
      per_page: parseInt(searchParams.get('per_page') || '12'),
      category: searchParams.get('category') ? parseInt(searchParams.get('category')!) : undefined,
      search: searchParams.get('search') || undefined,
      orderby: (searchParams.get('orderby') as any) || 'date',
      order: (searchParams.get('order') as any) || 'desc',
    })
    return NextResponse.json(products)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
