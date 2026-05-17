import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getProductById, products } from '../data/products'
import type { CartItem, Currency, NavGroup, Product } from '../types'
import { cartLineKey } from '../utils/cart'

export interface MegaNavState {
  path: string
  label: string
  group: NavGroup
}

interface Toast {
  id: number
  message: string
  type: 'success' | 'info' | 'error'
}

interface AppState {
  currency: Currency
  setCurrency: (c: Currency) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  activeCategory: string
  setActiveCategory: (c: string) => void
  priceMax: number | null
  setPriceMax: (v: number | null) => void
  cart: CartItem[]
  cartCount: number
  addToCart: (product: Product, quantity?: number, storeId?: string, navigateToCart?: boolean) => void
  removeFromCart: (productId: string, storeId: string) => void
  updateQuantity: (productId: string, storeId: string, qty: number) => void
  clearCart: () => void
  getCartProducts: () => { item: CartItem; product: Product }[]
  wishlist: string[]
  toggleWishlist: (productId: string) => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  filterDrawerOpen: boolean
  setFilterDrawerOpen: (open: boolean) => void
  accountOpen: boolean
  setAccountOpen: (open: boolean) => void
  accountMode: 'login' | 'register'
  setAccountMode: (m: 'login' | 'register') => void
  openMegaNav: MegaNavState | null
  setOpenMegaNav: (s: MegaNavState | null) => void
  toasts: Toast[]
  showToast: (message: string, type?: Toast['type']) => void
  subscribed: boolean
  subscribe: (email: string) => boolean
}

const AppContext = createContext<AppState | null>(null)

function loadCart(): CartItem[] {
  try {
    const raw = JSON.parse(localStorage.getItem('bassula-cart') || '[]') as CartItem[]
    return raw.filter((i) => getProductById(i.productId))
  } catch {
    return []
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('bassula-currency')
    return (saved as Currency) || 'AOA'
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('todos')
  const [priceMax, setPriceMax] = useState<number | null>(null)
  const [cart, setCart] = useState<CartItem[]>(loadCart)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('bassula-wishlist') || '[]')
    } catch {
      return []
    }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [accountMode, setAccountMode] = useState<'login' | 'register'>('login')
  const [openMegaNav, setOpenMegaNav] = useState<MegaNavState | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [subscribed, setSubscribed] = useState(
    () => localStorage.getItem('bassula-subscribed') === 'true',
  )

  useEffect(() => {
    localStorage.setItem('bassula-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('bassula-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c)
    localStorage.setItem('bassula-currency', c)
  }, [])

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
  }, [])

  const addToCart = useCallback(
    (product: Product, quantity = 1, storeId?: string, _navigateToCart?: boolean) => {
      const best = product.prices.reduce((a, b) =>
        (a.promo ?? a.price) < (b.promo ?? b.price) ? a : b,
      )
      const sid = storeId ?? best.storeId
      const store =
        product.prices.find((p) => p.storeId === sid) ?? best
      const qty = Math.max(1, quantity)
      const lineKey = cartLineKey(product.id, sid)
      setCart((prev) => {
        const existing = prev.find(
          (i) => cartLineKey(i.productId, i.storeId) === lineKey,
        )
        if (existing) {
          return prev.map((i) =>
            cartLineKey(i.productId, i.storeId) === lineKey
              ? { ...i, quantity: i.quantity + qty }
              : i,
          )
        }
        return [...prev, { productId: product.id, storeId: sid, quantity: qty }]
      })
      showToast(`${qty}x ${product.name} — ${store.storeName}`)
    },
    [showToast],
  )

  const removeFromCart = useCallback(
    (productId: string, storeId: string) => {
      const lineKey = cartLineKey(productId, storeId)
      setCart((prev) =>
        prev.filter((i) => cartLineKey(i.productId, i.storeId) !== lineKey),
      )
      showToast('Produto removido do carrinho', 'info')
    },
    [showToast],
  )

  const updateQuantity = useCallback((productId: string, storeId: string, qty: number) => {
    const lineKey = cartLineKey(productId, storeId)
    if (qty < 1) {
      setCart((prev) =>
        prev.filter((i) => cartLineKey(i.productId, i.storeId) !== lineKey),
      )
      return
    }
    setCart((prev) =>
      prev.map((i) =>
        cartLineKey(i.productId, i.storeId) === lineKey ? { ...i, quantity: qty } : i,
      ),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const getCartProducts = useCallback(() => {
    return cart
      .map((item) => {
        const product = getProductById(item.productId)
        if (!product) return null
        const hasStore = product.prices.some((p) => p.storeId === item.storeId)
        if (!hasStore) return null
        return { item, product }
      })
      .filter((x): x is { item: CartItem; product: Product } => x !== null)
  }, [cart])

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const has = prev.includes(productId)
        showToast(has ? 'Removido dos favoritos' : 'Adicionado aos favoritos')
        return has ? prev.filter((id) => id !== productId) : [...prev, productId]
      })
    },
    [showToast],
  )

  const subscribe = useCallback(
    (email: string) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false
      localStorage.setItem('bassula-subscribed', 'true')
      localStorage.setItem('bassula-email', email)
      setSubscribed(true)
      showToast('Subscrição confirmada! Receberá 20% na primeira compra.')
      return true
    },
    [showToast],
  )

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart])

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      searchQuery,
      setSearchQuery,
      activeCategory,
      setActiveCategory,
      priceMax,
      setPriceMax,
      cart,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartProducts,
      wishlist,
      toggleWishlist,
      cartOpen,
      setCartOpen,
      menuOpen,
      setMenuOpen,
      filterDrawerOpen,
      setFilterDrawerOpen,
      accountOpen,
      setAccountOpen,
      accountMode,
      setAccountMode,
      openMegaNav,
      setOpenMegaNav,
      toasts,
      showToast,
      subscribed,
      subscribe,
    }),
    [
      currency,
      searchQuery,
      activeCategory,
      priceMax,
      cart,
      cartCount,
      wishlist,
      cartOpen,
      menuOpen,
      filterDrawerOpen,
      accountOpen,
      accountMode,
      openMegaNav,
      toasts,
      subscribe,
      subscribed,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartProducts,
      toggleWishlist,
      setCurrency,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

// re-export for catalog count
export { products }
