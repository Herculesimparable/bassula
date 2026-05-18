import { Suspense, type ReactNode } from 'react'
import { lazyWithRetry } from './utils/lazyImport'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './styles/theme.css'
import './App.css'
import './styles/top-sellers.css'
import './bassula.css'
import './futuristic.css'
import './styles/buttons.css'
import { AppProvider } from './context/AppContext'
import { LocaleProvider } from './context/LocaleContext'
import { AppProviders } from './providers/AppProviders'
import { Layout } from './components/Layout'
import { PageLoader } from './components/PageLoader'
import { ErrorBoundary } from './components/ErrorBoundary'

const HomePage = lazyWithRetry(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const CatalogPage = lazyWithRetry(() =>
  import('./pages/CatalogPage').then((m) => ({ default: m.CatalogPage })),
)
const SearchPage = lazyWithRetry(() =>
  import('./pages/SearchPage').then((m) => ({ default: m.SearchPage })),
)
const CartPage = lazyWithRetry(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })))
const MapPage = lazyWithRetry(() => import('./pages/MapPage').then((m) => ({ default: m.MapPage })))
const ContactPage = lazyWithRetry(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const FavoritesPage = lazyWithRetry(() =>
  import('./pages/FavoritesPage').then((m) => ({ default: m.FavoritesPage })),
)
const ProductDetailPage = lazyWithRetry(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })),
)
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const HelpPage = lazyWithRetry(() => import('./pages/HelpPage').then((m) => ({ default: m.HelpPage })))
const ImageCreditsPage = lazyWithRetry(() =>
  import('./pages/ImageCreditsPage').then((m) => ({ default: m.ImageCreditsPage })),
)
const PrivacyPage = lazyWithRetry(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })),
)
const SecurityPage = lazyWithRetry(() =>
  import('./pages/SecurityPage').then((m) => ({ default: m.SecurityPage })),
)
const TermsPage = lazyWithRetry(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })))

function Lazy({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

function routerBasename(): string | undefined {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/') return undefined
  return base.replace(/\/$/, '')
}

export default function App() {
  return (
    <AppProviders>
      <LocaleProvider>
        <BrowserRouter basename={routerBasename()}>
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
                path="pesquisa"
                element={
                  <Lazy>
                    <SearchPage />
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
                path="novos"
                element={
                  <Lazy>
                    <CatalogPage group="novos" defaultBadge="Novo" />
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
              <Route
                path="privacidade"
                element={
                  <Lazy>
                    <PrivacyPage />
                  </Lazy>
                }
              />
              <Route
                path="seguranca"
                element={
                  <Lazy>
                    <SecurityPage />
                  </Lazy>
                }
              />
              <Route
                path="termos"
                element={
                  <Lazy>
                    <TermsPage />
                  </Lazy>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          </AppProvider>
        </BrowserRouter>
      </LocaleProvider>
    </AppProviders>
  )
}
