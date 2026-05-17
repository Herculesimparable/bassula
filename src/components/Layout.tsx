import { ScrollRestoration } from './ScrollRestoration'
import { useApp } from '../context/AppContext'
import { Header } from './Header'
import { Footer } from './Footer'
import { CartPanel } from './CartPanel'
import { AccountPanel } from './AccountPanel'
import { Toasts } from './Toasts'
import { PageTransition } from './PageTransition'
import { BassulaFab } from './BassulaFab'

export function Layout() {
  const { cartOpen, setCartOpen, accountOpen, setAccountOpen } = useApp()

  return (
    <div className="site-shell">
      <ScrollRestoration />
      <Header />
      <main className="site-main">
        <PageTransition />
      </main>
      <Footer />
      {(cartOpen || accountOpen) && (
        <div
          className="overlay"
          onClick={() => {
            setCartOpen(false)
            setAccountOpen(false)
          }}
        />
      )}
      <CartPanel />
      <AccountPanel />
      <Toasts />
      <BassulaFab />
    </div>
  )
}
