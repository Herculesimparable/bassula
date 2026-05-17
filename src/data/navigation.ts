import type { NavGroup } from '../types'
import { getAllProductCategories } from '../utils/categories'

export const utilityLinks = [
  { path: '/sobre', label: 'Sobre nós' },
  { path: '/ajuda', label: 'Atendimento ao Cliente' },
]

export const mainNav = [
  { path: '/ofertas', label: 'Ofertas', group: 'ofertas' as NavGroup },
  { path: '/alimentos', label: 'Alimentos', group: 'alimentos' as NavGroup },
  { path: '/bebidas', label: 'Bebidas', group: 'bebidas' as NavGroup },
  { path: '/higiene', label: 'Higiene e cosméticos', group: 'higiene' as NavGroup },
  { path: '/pets', label: 'Produtos para pets', group: 'pets' as NavGroup },
  {
    path: '/electrodomesticos',
    label: 'Electrodomésticos',
    group: 'electrodomesticos' as NavGroup,
  },
  { path: '/mais-vendidos', label: 'Mais vendidos', group: 'vendidos' as NavGroup },
  { path: '/favoritos', label: 'Favoritos', group: null },
]

/** Sincronizado com `products.ts` via getAllProductCategories(). */
export const filterCategories = getAllProductCategories()

export const CALL_CENTER = '+244923000000'
export const CALL_CENTER_DISPLAY = '+244 923 000 000'
export const SUPPORT_EMAIL = 'apoio@bassula.ao'
