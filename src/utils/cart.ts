import type { CartItem } from '../types'

export function cartLineKey(productId: string, storeId: string): string {
  return `${productId}::${storeId}`
}

export function cartLineKeyFromItem(item: CartItem): string {
  return cartLineKey(item.productId, item.storeId)
}
