/** Rotas onde o botão flutuante Bassula aparece */
const CATALOG_PATHS = new Set([
  '/ofertas',
  '/alimentos',
  '/bebidas',
  '/higiene',
  '/pets',
  '/electrodomesticos',
  '/mais-vendidos',
  '/novos',
  '/favoritos',
])

export function shouldShowBassulaFab(pathname: string): boolean {
  if (pathname === '/' || pathname === '/carrinho' || pathname === '/pesquisa') return true
  if (pathname.startsWith('/produto/')) return true
  return CATALOG_PATHS.has(pathname)
}
