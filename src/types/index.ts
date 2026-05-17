export type Currency = 'AOA' | 'USD' | 'EUR'

export type NavGroup =
  | 'ofertas'
  | 'alimentos'
  | 'bebidas'
  | 'higiene'
  | 'pets'
  | 'electrodomesticos'
  | 'vendidos'
  | 'novos'

export interface StorePrice {
  storeId: string
  storeName: string
  price: number
  promo?: number
}

export interface Product {
  id: string
  name: string
  category: string
  image: string
  unit: string
  prices: StorePrice[]
  badge?: string
  section: 'ofertas' | 'carrinho' | 'vendidos' | 'frescos'
  groups: NavGroup[]
}

export interface CartItem {
  productId: string
  storeId: string
  quantity: number
}

export interface Category {
  id: string
  name: string
  image: string
  slug: string
}

export interface StoreLocation {
  id: string
  name: string
  address: string
  city: string
  phone: string
  lat: number
  lng: number
  hours: string
}
