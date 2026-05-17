/** Rotas onde o botão flutuante Bassula aparece */
const CATALOG_PATHS = new Set([
  '/ofertas',
  '/alimentos',
  '/bebidas',
  '/higiene',
  '/pets',
  '/electrodomesticos',
  '/mais-vendidos',
  '/favoritos',
])

export function shouldShowBassulaFab(pathname: string): boolean {
  if (pathname === '/' || pathname === '/carrinho') return true
  if (pathname.startsWith('/produto/')) return true
  return CATALOG_PATHS.has(pathname)
}
