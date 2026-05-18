import { publicAsset } from '../utils/publicAsset'

/**
 * Imagens locais — 1 ficheiro por produto em public/images/products/{id}.jpg
 * Regenerar com correspondência correcta: npm run images:fetch
 */
const V = '8' // incrementar após nova descarga para limpar cache do browser

const product = (id: string) => publicAsset(`images/products/${id}.jpg?v=${V}`)
const cat = (slug: string) => publicAsset(`images/categories/${slug}.jpg?v=${V}`)

/** Promoções já alinhadas com categorias da home (fallback se falhar o JPG local) */
const CATEGORY_PROMO: Partial<Record<string, string>> = {
  frutas: publicAsset('promo/promo-frutas.jpg?v=8'),
  padaria: publicAsset('promo/promo-padaria.jpg?v=8'),
  electrodomesticos: publicAsset('promo/promo-electro.jpg?v=8'),
  vinhos: publicAsset('promo/promo-wine.jpg?v=8'),
  verdura: publicAsset('images/categories/verdura.jpg?v=8'),
  brinquedos: publicAsset('images/categories/brinquedos.jpg?v=8'),
  sanitarios: publicAsset('images/categories/sanitarios.jpg?v=8'),
}

export const PROMO_WINE_IMAGE = publicAsset('promo/promo-wine.jpg?v=8')
export const PROMO_DISCOUNT_IMAGE = publicAsset('promo/promo-discount.jpg?v=8')

/** Textos alt em pt-AO para cartões de categoria */
export const CATEGORY_IMAGE_ALT: Record<string, string> = {
  frutas: 'Frutas frescas variadas',
  padaria: 'Pão fresco e produtos de padaria',
  vinhos: 'Vinho tinto com rodelas de queijo',
  peixaria: 'Filetes de salmão',
  carnes: 'Carnes e aves frescas',
  bebidas: 'Cerveja e bebidas',
  higiene: 'Produtos de higiene e cuidados pessoais',
  mercearia: 'Arroz e mercearia',
  electrodomesticos: 'Electrodomésticos para cozinha e lar',
  verdura: 'Verduras e legumes frescos',
  brinquedos: 'Brinquedos para crianças',
  sanitarios: 'Produtos sanitários e de limpeza',
}

/** Nome do produto por ID (legenda ↔ imagem) */
export const PRODUCT_IMAGE_LABELS: Record<string, string> = {
  '1': 'Leite UHT',
  '2': 'Arroz',
  '3': 'Azeite',
  '4': 'Pão de forma',
  '5': 'Morangos',
  '6': 'Abacate',
  '7': 'Frango',
  '8': 'Iogurte',
  '9': 'Queijo',
  '10': 'Massa esparguete',
  '11': 'Café',
  '12': 'Cerveja pack',
  '13': 'Vinho tinto',
  '14': 'Champô',
  '15': 'Pasta de dentes',
  '16': 'Papel higiénico',
  '17': 'Bolachas chocolate',
  '18': 'Sumo de laranja',
  '19': 'Detergente roupa',
  '20': 'Ração cão',
  '21': 'Bananas',
  '22': 'Tomate cherry',
  '23': 'Maçã',
  '24': 'Água mineral',
  '25': 'Bife',
  '26': 'Salmão',
  '27': 'Atum enlatado',
  '28': 'Cereais',
  '29': 'Leite em pó',
  '30': 'Croissant',
  '31': 'Refrigerante cola',
  '32': 'Cerveja',
  '33': 'Manteiga',
  '34': 'Spray limpeza',
  '35': 'Ração gato',
  '36': 'Fraldas',
  '37': 'Ralador',
  '38': 'Creme facial',
  '39': 'Chá verde',
  '40': 'Snacks cão',
  '41': 'Micro-ondas',
  '42': 'Frigorífico',
  '43': 'Máquina de lavar',
  '44': 'Liquidificadora',
  '45': 'Ferro de engomar',
  '46': 'Chaleira elétrica',
  '47': 'Ventoinha',
  '48': 'Aspirador',
}

const CATEGORY_PHOTOS: Record<string, string> = {
  Frutas: cat('frutas'),
  Doces: product('17'),
  'Carnes e aves': cat('carnes'),
  'Peixes e frutos do mar': cat('peixaria'),
  'Leite e derivados': product('1'),
  Padaria: cat('padaria'),
  'Massas e grãos': product('2'),
  'Molhos e condimentos': product('3'),
  Óleos: product('3'),
  Bebidas: cat('bebidas'),
  'Sucos e refrigerantes': product('18'),
  'Cuidados pessoais': cat('higiene'),
  'Limpeza e higiene': product('19'),
  'Higiene animal': product('20'),
  Infantil: product('36'),
  Mercearia: cat('mercearia'),
  'Electrodomésticos de cozinha': product('41'),
  'Frigoríficos e congeladores': product('42'),
  'Máquinas de lavar': product('43'),
  'Pequenos eletrodomésticos': product('44'),
  Climatização: product('47'),
}

export function productImage(productId: string, _categoryName?: string): string {
  return product(productId)
}

export function categoryImage(slug: string): string {
  return cat(slug)
}

/** Imagem neutra de alimentos (sem texto) quando falha o carregamento */
export const FOOD_PLACEHOLDER = publicAsset('images/categories/mercearia.jpg?v=8')

export function placeholderForProduct(_name?: string): string {
  return FOOD_PLACEHOLDER
}

export function categoryImageFallbacks(slug: string, name: string): string[] {
  const promo = CATEGORY_PROMO[slug]
  return [...new Set([cat(slug), promo, placeholderForProduct(name)].filter(Boolean) as string[])]
}

export function categoryImageAlt(slug: string, name: string): string {
  return CATEGORY_IMAGE_ALT[slug] ?? name
}

export const PLACEHOLDER_IMAGE = product('1')

export const HERO_IMAGE = publicAsset(`images/hero.jpg?v=${V}`)

export const BG_ANGOLA_MAIN = HERO_IMAGE

export const BG_ANGOLA_HERO = HERO_IMAGE

export function productImageFallbacks(
  productId: string,
  categoryName: string,
  name?: string,
): string[] {
  return [
    product(productId),
    CATEGORY_PHOTOS[categoryName],
    cat('mercearia'),
    name ? placeholderForProduct(name) : PLACEHOLDER_IMAGE,
  ].filter((url, i, arr) => arr.indexOf(url) === i)
}
