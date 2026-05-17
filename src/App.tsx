import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import './styles/theme.css'
import './App.css'
import './styles/buttons.css'
import './styles/top-sellers.css'
import './bassula.css'
import './futuristic.css'
import { AppProvider } from './context/AppContext'
import { LocaleProvider } from './context/LocaleContext'
import { AppProviders } from './providers/AppProviders'
import { Layout } from './components/Layout'
import { PageLoader } from './components/PageLoader'
import { ErrorBoundary } from './components/ErrorBoundary'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const CatalogPage = lazy(() => import('./pages/CatalogPage').then((m) => ({ default: m.CatalogPage })))
const CartPage = lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })))
const MapPage = lazy(() => import('./pages/MapPage').then((m) => ({ default: m.MapPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage').then((m) => ({ default: m.FavoritesPage })))
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })),
)
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const HelpPage = lazy(() => import('./pages/HelpPage').then((m) => ({ default: m.HelpPage })))
const ImageCreditsPage = lazy(() =>
  import('./pages/ImageCreditsPage').then((m) => ({ default: m.ImageCreditsPage })),
)

function Lazy({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

const AppRouter = import.meta.env.VITE_GITHUB_PAGES === 'true' ? HashRouter : BrowserRouter

export default function App() {
  return (
    <AppProviders>
      <LocaleProvider>
        <AppRouter>
          <AppProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route
                index
                element={
                  <Lazy>
                    <HomePage />
                  </Lazy>
                }
              />
              <Route
                path="ofertas"
                element={
                  <Lazy>
                    <CatalogPage group="ofertas" defaultBadge="Oferta" />
                  </Lazy>
                }
              />
              <Route
                path="alimentos"
                element={
                  <Lazy>
                    <CatalogPage group="alimentos" />
                  </Lazy>
                }
              />
              <Route
                path="bebidas"
                element={
                  <Lazy>
                    <CatalogPage group="bebidas" />
                  </Lazy>
                }
              />
              <Route
                path="higiene"
                element={
                  <Lazy>
                    <CatalogPage group="higiene" />
                  </Lazy>
                }
              />
              <Route
                path="pets"
                element={
                  <Lazy>
                    <CatalogPage group="pets" />
                  </Lazy>
                }
              />
              <Route
                path="electrodomesticos"
                element={
                  <Lazy>
                    <CatalogPage group="electrodomesticos" />
                  </Lazy>
                }
              />
              <Route
                path="mais-vendidos"
                element={
                  <Lazy>
                    <CatalogPage group="vendidos" defaultBadge="Mais vendido" />
                  </Lazy>
                }
              />
              <Route
                path="favoritos"
                element={
                  <Lazy>
                    <FavoritesPage />
                  </Lazy>
                }
              />
              <Route
                path="produto/:id"
                element={
                  <Lazy>
                    <ErrorBoundary>
                      <ProductDetailPage />
                    </ErrorBoundary>
                  </Lazy>
                }
              />
              <Route
                path="carrinho"
                element={
                  <Lazy>
                    <CartPage />
                  </Lazy>
                }
              />
              <Route
                path="mapa"
                element={
                  <Lazy>
                    <MapPage />
                  </Lazy>
                }
              />
              <Route
                path="contacto"
                element={
                  <Lazy>
                    <ContactPage />
                  </Lazy>
                }
              />
              <Route
                path="sobre"
                element={
                  <Lazy>
                    <AboutPage />
                  </Lazy>
                }
              />
              <Route
                path="creditos-imagens"
                element={
                  <Lazy>
                    <ImageCreditsPage />
                  </Lazy>
                }
              />
              <Route
                path="ajuda"
                element={
                  <Lazy>
                    <HelpPage />
                  </Lazy>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          </AppProvider>
        </AppRouter>
      </LocaleProvider>
    </AppProviders>
  )
}
