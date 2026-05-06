import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/woocommerce'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const order = await createOrder(body)
    return NextResponse.json(order)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}