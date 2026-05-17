import type { NavGroup } from '../types'
import { getAllProductCategories } from '../utils/categories'

export const utilityLinks = [
  { path: '/sobre', navKey: 'nav.about' },
  { path: '/ajuda', navKey: 'nav.help' },
]

export const mainNav = [
  { path: '/ofertas', navKey: 'nav.ofertas', group: 'ofertas' as NavGroup },
  { path: '/alimentos', navKey: 'nav.alimentos', group: 'alimentos' as NavGroup },
  { path: '/bebidas', navKey: 'nav.bebidas', group: 'bebidas' as NavGroup },
  { path: '/higiene', navKey: 'nav.higiene', group: 'higiene' as NavGroup },
  { path: '/pets', navKey: 'nav.pets', group: 'pets' as NavGroup },
  {
    path: '/electrodomesticos',
    navKey: 'nav.electrodomesticos',
    group: 'electrodomesticos' as NavGroup,
  },
  { path: '/mais-vendidos', navKey: 'nav.maisVendidos', group: 'vendidos' as NavGroup },
  { path: '/favoritos', navKey: 'nav.favoritos', group: null },
]

/** Sincronizado com `products.ts` via getAllProductCategories(). */
export const filterCategories = getAllProductCategories()

export const CALL_CENTER = '+244923000000'
export const CALL_CENTER_DISPLAY = '+244 923 000 000'
export const SUPPORT_EMAIL = 'apoio@bassula.ao'
