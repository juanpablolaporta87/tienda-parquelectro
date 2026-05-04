'use client'

import useSWR from 'swr'
import type { WooProduct, WooCategory } from '@/lib/woocommerce'

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface UseProductsParams {
  page?: number
  per_page?: number
  category?: number
  search?: string
  on_sale?: boolean
  orderby?: string
  order?: string
}

export function useProducts(params?: UseProductsParams) {
  const searchParams = new URLSearchParams()
  
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.per_page) searchParams.set('per_page', params.per_page.toString())
  if (params?.category) searchParams.set('category', params.category.toString())
  if (params?.search) searchParams.set('search', params.search)
  if (params?.on_sale) searchParams.set('on_sale', 'true')
  if (params?.orderby) searchParams.set('orderby', params.orderby)
  if (params?.order) searchParams.set('order', params.order)

  const query = searchParams.toString()
  const url = `/api/products${query ? `?${query}` : ''}`

  const { data, error, isLoading, mutate } = useSWR<WooProduct[]>(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Cache por 1 minuto
  })

  return {
    products: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useCategories() {
  const { data, error, isLoading } = useSWR<WooCategory[]>('/api/categories', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // Cache por 5 minutos
  })

  return {
    categories: data || [],
    isLoading,
    isError: error,
  }
}
