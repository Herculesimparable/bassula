import type { Currency, NavGroup, Product, StorePrice } from '../types'

const rates: Record<Currency, number> = {
  AOA: 1,
  USD: 1 / 850,
  EUR: 1 / 920,
}

export function getBestPrice(prices: StorePrice[]): StorePrice {
  return prices.reduce((best, current) => {
    const bestVal = current.promo ?? current.price
    const currBest = best.promo ?? best.price
    return bestVal < currBest ? current : best
  })
}

export function getLowestValue(prices: StorePrice[]): number {
  const best = getBestPrice(prices)
  return best.promo ?? best.price
}

export function formatPrice(value: number, currency: Currency): string {
  if (currency === 'AOA') {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      maximumFractionDigits: 0,
    }).format(value)
  }
  const converted = value >= 50 ? value * rates[currency] : value
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'pt-PT', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(converted)
}

export function getDisplayPrice(price: StorePrice, currency: Currency): number {
  const val = price.promo ?? price.price
  if (currency === 'AOA') return val
  if (price.price < 50) return val
  return val * rates[currency]
}

export function filterProducts(
  list: Product[],
  query: string,
  category?: string,
  priceMax?: number | null,
): Product[] {
  const q = query.trim().toLowerCase()
  return list.filter((p) => {
    const lowest = getLowestValue(p.prices)
    const matchQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.prices.some((s) => s.storeName.toLowerCase().includes(q))
    const matchCat =
      !category ||
      category === 'todos' ||
      p.category.toLowerCase() === category.toLowerCase() ||
      p.category.toLowerCase().includes(category.toLowerCase())
    const matchPrice = priceMax == null || lowest <= priceMax
    return matchQuery && matchCat && matchPrice
  })
}

export function filterByGroup(list: Product[], group: NavGroup): Product[] {
  return list.filter((p) => p.groups.includes(group))
}
