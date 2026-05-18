import type { Category, NavGroup, Product } from '../types'
import { buildFullCatalog } from './buildCatalog'
import { categoryImage, productImage } from './images'

export const categories: Category[] = [
  { id: '1', name: 'Frutas', slug: 'frutas', image: categoryImage('frutas') },
  { id: '2', name: 'Padaria', slug: 'padaria', image: categoryImage('padaria') },
  { id: '3', name: 'Vinhos', slug: 'vinhos', image: categoryImage('vinhos') },
  { id: '4', name: 'Peixaria', slug: 'peixaria', image: categoryImage('peixaria') },
  { id: '5', name: 'Carnes', slug: 'carnes', image: categoryImage('carnes') },
  { id: '6', name: 'Bebidas', slug: 'bebidas', image: categoryImage('bebidas') },
  { id: '7', name: 'Higiene', slug: 'higiene', image: categoryImage('higiene') },
  { id: '8', name: 'Mercearia', slug: 'mercearia', image: categoryImage('mercearia') },
  {
    id: '9',
    name: 'Electrodomésticos',
    slug: 'electrodomesticos',
    image: categoryImage('electrodomesticos'),
  },
  { id: '10', name: 'Verdura', slug: 'verdura', image: categoryImage('verdura') },
  { id: '11', name: 'Brinquedos', slug: 'brinquedos', image: categoryImage('brinquedos') },
  { id: '12', name: 'Sanitários', slug: 'sanitarios', image: categoryImage('sanitarios') },
]

function p(
  id: string,
  name: string,
  category: string,
  _imageId: string,
  unit: string,
  section: Product['section'],
  groups: NavGroup[],
  prices: { storeId: string; storeName: string; price: number; promo?: number }[],
  badge?: string,
): Product {
  return { id, name, category, image: productImage(id, category), unit, section, groups, prices, badge }
}

const baseProducts: Product[] = [
  p('1', 'Leite UHT Meio Gordo 1L', 'Leite e derivados', '1550586808-ef763c3d4f2', '1 L', 'carrinho', ['ofertas', 'alimentos'], [
    { storeId: 'kero', storeName: 'Kero', price: 890, promo: 750 },
    { storeId: 'candando', storeName: 'Candando', price: 920 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 850 },
  ], 'Oferta'),
  p('2', 'Arroz Agulha 5kg', 'Massas e grãos', '1586209587009-36cbe0a3d0f1', '5 kg', 'carrinho', ['ofertas', 'alimentos'], [
    { storeId: 'kero', storeName: 'Kero', price: 4500, promo: 3990 },
    { storeId: 'alimenta', storeName: 'Alimenta Angola', price: 4200 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 4350 },
  ], 'Oferta'),
  p('3', 'Azeite Extra Virgem 750ml', 'Óleos', '1474979648983-9d3c3f0d878b', '750 ml', 'ofertas', ['ofertas', 'alimentos'], [
    { storeId: 'candando', storeName: 'Candando', price: 3200, promo: 2800 },
    { storeId: 'kero', storeName: 'Kero', price: 3100 },
  ], 'Oferta'),
  p('4', 'Pão de Forma Integral', 'Padaria', '1509440159596-024908877f35', '500 g', 'carrinho', ['ofertas', 'alimentos'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 650, promo: 520 },
    { storeId: 'kero', storeName: 'Kero', price: 590 },
  ], 'Oferta'),
  p('5', 'Morangos Frescos 400g', 'Frutas', '1464966088849-7d0e2f8e8b6e', '400 g', 'carrinho', ['ofertas', 'alimentos'], [
    { storeId: 'kero', storeName: 'Kero', price: 1800, promo: 1490 },
    { storeId: 'candando', storeName: 'Candando', price: 1750 },
  ], 'Oferta'),
  p('6', 'Abacate Hass unidade', 'Frutas', '1523042130041-5e9c6b0e8b6e', '1 un', 'carrinho', ['ofertas', 'alimentos'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 450, promo: 380 },
    { storeId: 'kero', storeName: 'Kero', price: 420 },
  ], 'Oferta'),
  p('7', 'Frango Inteiro Fresco', 'Carnes e aves', '1607620401052-94d007f69a8f', '1.2 kg', 'carrinho', ['ofertas', 'alimentos', 'vendidos'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 2800, promo: 2490 },
    { storeId: 'kero', storeName: 'Kero', price: 2650 },
  ], 'Oferta'),
  p('8', 'Iogurte Natural Pack 4', 'Leite e derivados', '1571216711018-0f1e0a1d9f6c', '4 un', 'carrinho', ['ofertas', 'alimentos'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 980, promo: 850 },
    { storeId: 'kero', storeName: 'Kero', price: 920 },
  ], 'Oferta'),
  p('9', 'Queijo Flamengo Fatias', 'Leite e derivados', '1452193370444-9ec884674d7a', '200 g', 'carrinho', ['ofertas', 'alimentos'], [
    { storeId: 'candando', storeName: 'Candando', price: 1100, promo: 880 },
    { storeId: 'kero', storeName: 'Kero', price: 1050 },
  ], 'Oferta'),
  p('10', 'Massa Espaguete 500g', 'Massas e grãos', '1621996340255-e9e6f1240b9c', '500 g', 'carrinho', ['ofertas', 'alimentos', 'vendidos'], [
    { storeId: 'kero', storeName: 'Kero', price: 450, promo: 350 },
    { storeId: 'candando', storeName: 'Candando', price: 420 },
  ], 'Oferta'),
  p('11', 'Café Torrado Moído 250g', 'Mercearia', '1559057868-56629f04bf74', '250 g', 'ofertas', ['ofertas', 'alimentos', 'bebidas'], [
    { storeId: 'kero', storeName: 'Kero', price: 2200, promo: 1890 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 2100 },
  ], 'Oferta'),
  p('12', 'Cerveja Nacional Pack 6', 'Bebidas', '1618884245677-4e3e3e3e3e3e', '6 un', 'ofertas', ['ofertas', 'bebidas'], [
    { storeId: 'candando', storeName: 'Candando', price: 3500, promo: 2990 },
    { storeId: 'kero', storeName: 'Kero', price: 3200 },
  ], 'Oferta'),
  p('13', 'Vinho Tinto Reserva', 'Bebidas', '1510815219348-6d2d39e290b9', '750 ml', 'ofertas', ['ofertas', 'bebidas'], [
    { storeId: 'candando', storeName: 'Candando', price: 2800, promo: 2400 },
    { storeId: 'kero', storeName: 'Kero', price: 2650 },
  ], 'Oferta'),
  p('14', 'Champô Hidratante 400ml', 'Cuidados pessoais', '1522338243663-be99c6245be5', '400 ml', 'ofertas', ['ofertas', 'higiene'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 1890, promo: 1590 },
    { storeId: 'kero', storeName: 'Kero', price: 1750 },
  ], 'Oferta'),
  p('15', 'Pasta de Dentes Branqueadora', 'Cuidados pessoais', '1628177600786-6439679d8b6e', '75 ml', 'ofertas', ['ofertas', 'higiene'], [
    { storeId: 'kero', storeName: 'Kero', price: 650, promo: 520 },
    { storeId: 'candando', storeName: 'Candando', price: 620 },
  ], 'Oferta'),
  p('16', 'Papel Higiénico Pack 12', 'Limpeza e higiene', '1585428291124-aa6c8d3c3c3c', '12 rolos', 'ofertas', ['ofertas', 'higiene'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 2200, promo: 1890 },
    { storeId: 'kero', storeName: 'Kero', price: 2100 },
  ], 'Oferta'),
  p('17', 'Bolachas de Chocolate', 'Doces', '1558964541-7a0e2f8e8b6e', '300 g', 'carrinho', ['ofertas', 'alimentos'], [
    { storeId: 'kero', storeName: 'Kero', price: 890, promo: 750 },
    { storeId: 'alimenta', storeName: 'Alimenta Angola', price: 850 },
  ], 'Oferta'),
  p('18', 'Sumo de Laranja Natural 1L', 'Sucos e refrigerantes', '1622483662024-d060814a101f', '1 L', 'carrinho', ['ofertas', 'bebidas'], [
    { storeId: 'kero', storeName: 'Kero', price: 1100, promo: 950 },
    { storeId: 'candando', storeName: 'Candando', price: 1050 },
  ], 'Oferta'),
  p('19', 'Detergente Roupa 2L', 'Limpeza e higiene', '1563452693562-507a6bfdfe40', '2 L', 'ofertas', ['ofertas', 'higiene'], [
    { storeId: 'kero', storeName: 'Kero', price: 1890, promo: 1600 },
    { storeId: 'alimenta', storeName: 'Alimenta Angola', price: 1750 },
  ], 'Oferta'),
  p('20', 'Ração Cão Adulto 3kg', 'Higiene animal', '1587306146061-7a0e2f8e8b6e', '3 kg', 'ofertas', ['ofertas', 'pets'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 4500, promo: 3990 },
    { storeId: 'kero', storeName: 'Kero', price: 4200 },
  ], 'Oferta'),
  p('21', 'Bananas da Madeira 1kg', 'Frutas', '1571776111010-6d05f1f0a8b6', '1 kg', 'carrinho', ['alimentos', 'vendidos'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 1200 },
    { storeId: 'kero', storeName: 'Kero', price: 1050, promo: 980 },
  ]),
  p('22', 'Tomate Cherry 250g', 'Frutas', '1546092743-0fddf5fbec0c', '250 g', 'carrinho', ['alimentos'], [
    { storeId: 'candando', storeName: 'Candando', price: 890 },
    { storeId: 'kero', storeName: 'Kero', price: 820 },
  ]),
  p('23', 'Maçã Gala 1kg', 'Frutas', '1560807812-4e850a6aa616', '1 kg', 'carrinho', ['alimentos', 'vendidos'], [
    { storeId: 'kero', storeName: 'Kero', price: 1450 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 1380 },
  ]),
  p('24', 'Água Mineral Pack 6', 'Bebidas', '1523363036739-892b73b1e93d', '6 un', 'carrinho', ['bebidas', 'vendidos'], [
    { storeId: 'alimenta', storeName: 'Alimenta Angola', price: 1800 },
    { storeId: 'kero', storeName: 'Kero', price: 1750 },
  ]),
  p('25', 'Bife de Vazia Angus', 'Carnes e aves', '1603048297202-c08178aecb12', '500 g', 'vendidos', ['alimentos', 'vendidos'], [
    { storeId: 'candando', storeName: 'Candando', price: 5200 },
    { storeId: 'kero', storeName: 'Kero', price: 4900 },
  ], 'Mais vendido'),
  p('26', 'Salmão Fresco Filete', 'Peixes e frutos do mar', '1519708227418-c8fd9a32b3a2', '300 g', 'vendidos', ['alimentos', 'vendidos'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 4500, promo: 3990 },
    { storeId: 'kero', storeName: 'Kero', price: 4200 },
  ], 'Mais vendido'),
  p('27', 'Atum Enlatado 4un', 'Peixes e frutos do mar', '1544947950-f15307f7f07e', '4 latas', 'vendidos', ['alimentos', 'vendidos'], [
    { storeId: 'kero', storeName: 'Kero', price: 2200 },
    { storeId: 'alimenta', storeName: 'Alimenta Angola', price: 2100 },
  ], 'Mais vendido'),
  p('28', 'Cereais Integrais 500g', 'Massas e grãos', '1511690740398-9a0e2f8e8b6e', '500 g', 'vendidos', ['alimentos', 'vendidos'], [
    { storeId: 'kero', storeName: 'Kero', price: 1890 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 1750 },
  ], 'Mais vendido'),
  p('29', 'Leite em Pó Instantâneo 400g', 'Leite e derivados', '1563636613816-94821a1a1a1a', '400 g', 'vendidos', ['alimentos', 'vendidos'], [
    { storeId: 'candando', storeName: 'Candando', price: 2100 },
    { storeId: 'kero', storeName: 'Kero', price: 1990 },
  ], 'Mais vendido'),
  p('30', 'Croissant Manteiga 4un', 'Padaria', '1555503726-4f27f7324b1c', '4 un', 'carrinho', ['alimentos', 'novos'], [
    { storeId: 'kero', storeName: 'Kero', price: 480 },
    { storeId: 'alimenta', storeName: 'Alimenta Angola', price: 450 },
  ], 'Mais vendido'),
  p('31', 'Refrigerante Cola 2L', 'Sucos e refrigerantes', '1629203864796-9661b1a1a1a1', '2 L', 'vendidos', ['bebidas', 'vendidos'], [
    { storeId: 'kero', storeName: 'Kero', price: 890 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 850 },
  ], 'Mais vendido'),
  p('32', 'Cerveja Importada 330ml', 'Bebidas', '1618884245677-4e3e3e3e3e3e', '330 ml', 'vendidos', ['bebidas', 'vendidos'], [
    { storeId: 'candando', storeName: 'Candando', price: 450 },
    { storeId: 'kero', storeName: 'Kero', price: 420 },
  ], 'Mais vendido'),
  p('33', 'Manteiga com Sal 250g', 'Leite e derivados', '1588167316678-418f4a7a3029', '250 g', 'carrinho', ['alimentos'], [
    { storeId: 'kero', storeName: 'Kero', price: 750 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 720 },
  ]),
  p('34', 'Spray Multiusos 750ml', 'Limpeza e higiene', '1563452693562-507a6bfdfe40', '750 ml', 'frescos', ['higiene'], [
    { storeId: 'kero', storeName: 'Kero', price: 1200 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 1150 },
  ]),
  p('35', 'Ração Gato Premium 2kg', 'Higiene animal', '1587306146061-7a0e2f8e8b6e', '2 kg', 'frescos', ['pets'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 3800 },
    { storeId: 'kero', storeName: 'Kero', price: 3650 },
  ]),
  p('36', 'Fraldas Tamanho M 28un', 'Infantil', '1584464496163-6161a1a1a1a1', '28 un', 'frescos', ['higiene', 'novos'], [
    { storeId: 'candando', storeName: 'Candando', price: 4200 },
    { storeId: 'kero', storeName: 'Kero', price: 3990 },
  ], 'Novo'),
  p('37', 'Ralador Inox Profissional', 'Mercearia', '1556911220999-7a0e2f8e8b6e', '1 un', 'frescos', ['novos', 'higiene'], [
    { storeId: 'kero', storeName: 'Kero', price: 3500 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 3200 },
  ], 'Novo'),
  p('38', 'Creme Facial Hidratante', 'Cuidados pessoais', '1556228720960-7a0e2f8e8b6e', '50 ml', 'frescos', ['higiene', 'novos'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 2800 },
    { storeId: 'candando', storeName: 'Candando', price: 2650 },
  ], 'Novo'),
  p('39', 'Chá Verde Premium 20saq', 'Bebidas', '1556677370-7a0e2f8e8b6e', '20 saq', 'frescos', ['bebidas', 'novos'], [
    { storeId: 'kero', storeName: 'Kero', price: 890 },
    { storeId: 'alimenta', storeName: 'Alimenta Angola', price: 850 },
  ], 'Novo'),
  p('40', 'Snacks para Cão 500g', 'Higiene animal', '1587306146061-7a0e2f8e8b6e', '500 g', 'frescos', ['pets', 'novos'], [
    { storeId: 'kero', storeName: 'Kero', price: 1200 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 1100 },
  ], 'Novo'),
  p('41', 'Micro-ondas 20L', 'Electrodomésticos de cozinha', '2724748', '1 un', 'ofertas', ['electrodomesticos', 'ofertas'], [
    { storeId: 'kero', storeName: 'Kero', price: 45000, promo: 39900 },
    { storeId: 'candando', storeName: 'Candando', price: 42000 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 43500 },
  ], 'Oferta'),
  p('42', 'Frigorífico Combinado 300L', 'Frigoríficos e congeladores', '2345959', '1 un', 'vendidos', ['electrodomesticos', 'vendidos'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 185000 },
    { storeId: 'kero', storeName: 'Kero', price: 179000, promo: 172000 },
  ], 'Mais vendido'),
  p('43', 'Máquina de Lavar 7kg', 'Máquinas de lavar', '5591667', '1 un', 'vendidos', ['electrodomesticos', 'vendidos'], [
    { storeId: 'candando', storeName: 'Candando', price: 95000 },
    { storeId: 'kero', storeName: 'Kero', price: 92000 },
  ], 'Mais vendido'),
  p('44', 'Liquidificadora 1.5L', 'Pequenos eletrodomésticos', '3094490', '1 un', 'ofertas', ['electrodomesticos', 'ofertas'], [
    { storeId: 'kero', storeName: 'Kero', price: 8900, promo: 7500 },
    { storeId: 'alimenta', storeName: 'Alimenta Angola', price: 8200 },
  ], 'Oferta'),
  p('45', 'Ferro de Engomar a Vapor', 'Pequenos eletrodomésticos', '5591473', '1 un', 'frescos', ['electrodomesticos'], [
    { storeId: 'shoprite', storeName: 'Shoprite', price: 6500 },
    { storeId: 'kero', storeName: 'Kero', price: 6200 },
  ]),
  p('46', 'Chaleira Elétrica 1.7L', 'Electrodomésticos de cozinha', '269838', '1 un', 'frescos', ['electrodomesticos'], [
    { storeId: 'kero', storeName: 'Kero', price: 4500 },
    { storeId: 'candando', storeName: 'Candando', price: 4200 },
  ]),
  p('47', 'Ventoinha de Mesa', 'Climatização', '1454807', '1 un', 'frescos', ['electrodomesticos', 'novos'], [
    { storeId: 'kero', storeName: 'Kero', price: 12000 },
    { storeId: 'shoprite', storeName: 'Shoprite', price: 11500 },
  ], 'Novo'),
  p('48', 'Aspirador Vertical', 'Pequenos eletrodomésticos', '4108710', '1 un', 'ofertas', ['electrodomesticos', 'ofertas'], [
    { storeId: 'candando', storeName: 'Candando', price: 28000, promo: 24900 },
    { storeId: 'kero', storeName: 'Kero', price: 26500 },
  ], 'Oferta'),
]

/** Catálogo completo: produtos base + expansão até 20 por categoria de filtro */
export const products: Product[] = buildFullCatalog(baseProducts)

export const featureItems = [
  { icon: 'truck', titleKey: 'features.fast.title', descKey: 'features.fast.desc' },
  { icon: 'shield', titleKey: 'features.quality.title', descKey: 'features.quality.desc' },
  { icon: 'scale', titleKey: 'features.fair.title', descKey: 'features.fair.desc' },
  { icon: 'headphones', titleKey: 'features.support.title', descKey: 'features.support.desc' },
]

export const footerMenuLinks = [
  { key: 'nav.ofertas', path: '/ofertas' },
  { key: 'nav.alimentos', path: '/alimentos' },
  { key: 'nav.bebidas', path: '/bebidas' },
  { key: 'nav.electrodomesticos', path: '/electrodomesticos' },
  { key: 'nav.maisVendidos', path: '/mais-vendidos' },
  { key: 'nav.favoritos', path: '/favoritos' },
]

export const footerCategoryLinks = [
  { key: 'footer.frutas', path: '/alimentos' },
  { key: 'footer.padaria', path: '/alimentos' },
  { key: 'footer.carnes', path: '/alimentos' },
  { key: 'footer.peixaria', path: '/alimentos' },
  { key: 'nav.bebidas', path: '/bebidas' },
  { key: 'nav.higiene', path: '/higiene' },
]

export const footerInfoLinks = [
  { key: 'footer.faq', path: '/ajuda' },
  { key: 'footer.returns', path: '/ajuda' },
  { key: 'footer.support', path: '/contacto' },
  { key: 'footer.stores', path: '/mapa' },
  { key: 'footer.shipping', path: '/ajuda' },
  { key: 'footer.terms', path: '/sobre' },
  { key: 'footer.payments', path: '/ajuda' },
  { key: 'footer.cookies', path: '/sobre' },
]

export const footerAccountLinks = [
  { key: 'nav.favoritos', path: '/favoritos' },
  { key: 'cart.title', path: '/carrinho' },
  { key: 'footer.myOrders', path: '/carrinho' },
  { key: 'footer.settings', path: '/sobre' },
]

export function getProductById(id: string): Product | undefined {
  return products.find((x) => x.id === id)
}

export function getProductsByGroup(group: NavGroup): Product[] {
  return products.filter((p) => p.groups.includes(group))
}
