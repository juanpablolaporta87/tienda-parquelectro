// WooCommerce API Client
// Documentación: https://woocommerce.github.io/woocommerce-rest-api-docs/

const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || ''
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || ''
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || ''

// Tipos de WooCommerce
export interface WooProduct {
  id: number
  name: string
  slug: string
  permalink: string
  type: string
  status: string
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  stock_quantity: number | null
  stock_status: string
  categories: WooCategory[]
  images: WooImage[]
  attributes: WooAttribute[]
  meta_data: WooMeta[]
}

export interface WooCategory {
  id: number
  name: string
  slug: string
  parent: number
  description: string
  image: WooImage | null
  count: number
}

export interface WooImage {
  id: number
  src: string
  name: string
  alt: string
}

export interface WooAttribute {
  id: number
  name: string
  options: string[]
}

export interface WooMeta {
  id: number
  key: string
  value: string
}

export interface WooOrder {
  id: number
  status: string
  currency: string
  total: string
  customer_id: number
  billing: WooAddress
  shipping: WooAddress
  line_items: WooLineItem[]
}

export interface WooAddress {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email?: string
  phone?: string
}

export interface WooLineItem {
  product_id: number
  quantity: number
  name?: string
  price?: number
}

// Cliente base para hacer requests
async function wooFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${WOOCOMMERCE_URL}/wp-json/wc/v3${endpoint}`
  
  // Autenticación básica
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `WooCommerce API error: ${response.status}`)
  }

  return response.json()
}

// ============================================
// PRODUCTOS
// ============================================

export async function getProducts(params?: {
  page?: number
  per_page?: number
  category?: number
  search?: string
  on_sale?: boolean
  featured?: boolean
  orderby?: 'date' | 'price' | 'popularity' | 'rating'
  order?: 'asc' | 'desc'
}): Promise<WooProduct[]> {
  const searchParams = new URLSearchParams()
  
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.per_page) searchParams.set('per_page', params.per_page.toString())
  if (params?.category) searchParams.set('category', params.category.toString())
  if (params?.search) searchParams.set('search', params.search)
  if (params?.on_sale) searchParams.set('on_sale', 'true')
  if (params?.featured) searchParams.set('featured', 'true')
  if (params?.orderby) searchParams.set('orderby', params.orderby)
  if (params?.order) searchParams.set('order', params.order)

  const query = searchParams.toString()
  return wooFetch<WooProduct[]>(`/products${query ? `?${query}` : ''}`)
}

export async function getProduct(idOrSlug: number | string): Promise<WooProduct> {
  if (typeof idOrSlug === 'number') {
    return wooFetch<WooProduct>(`/products/${idOrSlug}`)
  }
  
  // Si es slug, buscamos por slug
  const products = await wooFetch<WooProduct[]>(`/products?slug=${idOrSlug}`)
  if (products.length === 0) {
    throw new Error('Producto no encontrado')
  }
  return products[0]
}

export async function getFeaturedProducts(limit = 8): Promise<WooProduct[]> {
  return getProducts({ featured: true, per_page: limit })
}

export async function getProductsOnSale(limit = 8): Promise<WooProduct[]> {
  return getProducts({ on_sale: true, per_page: limit })
}

// ============================================
// CATEGORÍAS
// ============================================

export async function getCategories(params?: {
  page?: number
  per_page?: number
  parent?: number
  hide_empty?: boolean
}): Promise<WooCategory[]> {
  const searchParams = new URLSearchParams()
  
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.per_page) searchParams.set('per_page', params.per_page.toString())
  if (params?.parent !== undefined) searchParams.set('parent', params.parent.toString())
  if (params?.hide_empty) searchParams.set('hide_empty', 'true')

  const query = searchParams.toString()
  return wooFetch<WooCategory[]>(`/products/categories${query ? `?${query}` : ''}`)
}

export async function getCategory(id: number): Promise<WooCategory> {
  return wooFetch<WooCategory>(`/products/categories/${id}`)
}

// ============================================
// ÓRDENES (para crear pedidos desde el frontend)
// ============================================

export async function createOrder(orderData: {
  payment_method?: string
  payment_method_title?: string
  set_paid?: boolean
  billing: WooAddress
  shipping?: WooAddress
  line_items: WooLineItem[]
  customer_note?: string
}): Promise<WooOrder> {
  return wooFetch<WooOrder>('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  })
}

export async function getOrder(id: number): Promise<WooOrder> {
  return wooFetch<WooOrder>(`/orders/${id}`)
}

// ============================================
// HELPERS
// ============================================

// Formatear precio en pesos argentinos
export function formatPrice(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

// Calcular precio mayorista (ejemplo: 15% de descuento por 10+ unidades)
export function calculateBulkPrice(price: string | number, discount = 0.15): number {
  const num = typeof price === 'string' ? parseFloat(price) : price
  return Math.round(num * (1 - discount))
}

// Obtener imagen principal o placeholder
export function getProductImage(product: WooProduct): string {
  return product.images[0]?.src || '/images/placeholder-product.jpg'
}
