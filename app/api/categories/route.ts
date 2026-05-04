import { NextResponse } from 'next/server'
import { getCategories } from '@/lib/woocommerce'

export async function GET() {
  try {
    const categories = await getCategories({
      per_page: 100,
      hide_empty: true,
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Error al obtener categorías' },
      { status: 500 }
    )
  }
}
