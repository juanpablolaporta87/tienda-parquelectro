import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/woocommerce'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validación básica
    if (!body.billing || !body.line_items || body.line_items.length === 0) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos: billing y line_items' },
        { status: 400 }
      )
    }

    const order = await createOrder({
      payment_method: body.payment_method || 'bacs',
      payment_method_title: body.payment_method_title || 'Transferencia bancaria',
      set_paid: false,
      billing: body.billing,
      shipping: body.shipping || body.billing,
      line_items: body.line_items,
      customer_note: body.customer_note,
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Error al crear el pedido' },
      { status: 500 }
    )
  }
}
