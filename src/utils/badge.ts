/** Maps legacy PT badge labels from product data to i18n keys. */
export function badgeI18nKey(badge: string | undefined): string | undefined {
  if (!badge) return undefined
  if (badge === 'Oferta') return 'catalog.badgeOffer'
  if (badge === 'Mais vendido') return 'catalog.badgeTopSeller'
  return undefined
}
