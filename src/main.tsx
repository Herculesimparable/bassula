import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { HERO_IMAGE } from './data/images'
import { publicAsset } from './utils/publicAsset'
import './index.css'

const rootEl = document.documentElement
rootEl.style.setProperty('--app-promo-bg-image', `url(${HERO_IMAGE})`)
rootEl.style.setProperty('--newsletter-bg-image', `url(${publicAsset('images/categories/frutas.jpg?v=10')})`)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

