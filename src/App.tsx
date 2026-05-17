import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
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
const StaticPage = lazy(() => import('./pages/StaticPage').then((m) => ({ default: m.StaticPage })))
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
                    <CatalogPage group="ofertas" title="Ofertas" defaultBadge="Oferta" />
                  </Lazy>
                }
              />
              <Route
                path="alimentos"
                element={
                  <Lazy>
                    <CatalogPage group="alimentos" title="Alimentos" />
                  </Lazy>
                }
              />
              <Route
                path="bebidas"
                element={
                  <Lazy>
                    <CatalogPage group="bebidas" title="Bebidas" />
                  </Lazy>
                }
              />
              <Route
                path="higiene"
                element={
                  <Lazy>
                    <CatalogPage group="higiene" title="Higiene e cosméticos" />
                  </Lazy>
                }
              />
              <Route
                path="pets"
                element={
                  <Lazy>
                    <CatalogPage group="pets" title="Produtos para pets" />
                  </Lazy>
                }
              />
              <Route
                path="electrodomesticos"
                element={
                  <Lazy>
                    <CatalogPage group="electrodomesticos" title="Electrodomésticos" />
                  </Lazy>
                }
              />
              <Route
                path="mais-vendidos"
                element={
                  <Lazy>
                    <CatalogPage group="vendidos" title="Mais vendidos" defaultBadge="Mais vendido" />
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
                    <StaticPage title="Sobre nós">
                      <p>
                        A Bassula é a plataforma líder em comparação de preços de supermercados em Angola e no
                        mundo. Ajudamos famílias a poupar em cada compra, mostrando onde cada produto está mais
                        barato.
                      </p>
                      <p>Trabalhamos com Kero, Candando, Shoprite, Alimenta Angola e redes internacionais.</p>
                      <p>
                        Consulte também a página de{' '}
                        <Link to="/creditos-imagens">créditos e autorização de imagens</Link> do site.
                      </p>
                    </StaticPage>
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
                    <StaticPage title="Centro de ajuda">
                      <h3>Envios</h3>
                      <p>Entregas em Luanda em 24–48h. Outras províncias: 3–5 dias úteis.</p>
                      <h3>Devoluções</h3>
                      <p>Devolução gratuita até 7 dias após a entrega em produtos não perecíveis.</p>
                      <h3>Pagamentos</h3>
                      <p>Multicaixa, Visa, Mastercard, transferência e dinheiro na entrega.</p>
                    </StaticPage>
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
