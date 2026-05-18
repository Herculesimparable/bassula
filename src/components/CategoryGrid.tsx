import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ProductImage } from './ProductImage'
import { categories } from '../data/products'
import { categoryImageAlt, categoryImageFallbacks } from '../data/images'
import { useApp } from '../context/AppContext'
import { applyHomeCategoryTarget, homeCategoryHref } from '../utils/categories'
import { useTranslation } from '../context/LocaleContext'

export function CategoryGrid() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const { setActiveCategory, setSearchQuery } = useApp()

  const handleCategoryClick = (slug: string) => {
    applyHomeCategoryTarget(slug, setActiveCategory, setSearchQuery)
  }

  return (
    <motion.section
      className="section section--categories"
      aria-labelledby="categories-title"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container">
        <div className="section-header section-header--categories">
          <div>
            <h2 id="categories-title">{t('home.categories')}</h2>
            <p className="section-subtitle">{t('home.categoriesDesc')}</p>
          </div>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={homeCategoryHref(cat.slug)}
              className="category-card"
              onClick={() => handleCategoryClick(cat.slug)}
              aria-label={t('aria.categoryProducts', { name: cat.name })}
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
    </motion.section>
  )
}
