import { Link } from 'react-router-dom'
import { ProductImage } from './ProductImage'
import { categories } from '../data/products'
import { categoryImageAlt, categoryImageFallbacks } from '../data/images'
import { useApp } from '../context/AppContext'
import { applyHomeCategoryTarget, homeCategoryHref } from '../utils/categories'

export function CategoryGrid() {
  const { setActiveCategory, setSearchQuery } = useApp()

  const handleCategoryClick = (slug: string) => {
    applyHomeCategoryTarget(slug, setActiveCategory, setSearchQuery)
  }

  return (
    <section className="section section--categories" aria-labelledby="categories-title">
      <div className="container">
        <div className="section-header section-header--categories">
          <div>
            <h2 id="categories-title">Categorias mais vendidas</h2>
            <p className="section-subtitle">Explore os corredores mais procurados em Luanda</p>
          </div>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={homeCategoryHref(cat.slug)}
              className="category-card"
              onClick={() => handleCategoryClick(cat.slug)}
              aria-label={`Ver produtos: ${cat.name}`}
            >
              <div className="category-card__media">
                <ProductImage
                  src={cat.image}
                  alt={categoryImageAlt(cat.slug, cat.name)}
                  className="category-card__img"
                  fallbacks={categoryImageFallbacks(cat.slug, cat.name)}
                />
              </div>
              <span className="category-card__label">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
