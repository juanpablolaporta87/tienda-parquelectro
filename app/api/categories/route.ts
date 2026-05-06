import { NextRequest, NextResponse } from 'next/server'
import { getCategories } from '@/lib/woocommerce'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const categories = await getCategories({ hide_empty: true, per_page: 50 })
    if (slug) return NextResponse.json(categories.filter(c => c.slug === slug))
    return NextResponse.json(categories)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
