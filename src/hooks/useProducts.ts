import { useQuery } from '@tanstack/react-query'
import { products } from '../data/products'
import { filterByGroup } from '../utils/price'
import type { NavGroup } from '../types'

export function useProducts(group?: NavGroup) {
  return useQuery({
    queryKey: ['products', group ?? 'all'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 0))
      return group ? filterByGroup(products, group) : products
    },
    staleTime: Infinity,
    placeholderData: (prev) => prev,
  })
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 0))
      const p = products.find((x) => x.id === id)
      if (!p) throw new Error('Produto não encontrado')
      return p
    },
    enabled: Boolean(id),
    staleTime: Infinity,
  })
}
