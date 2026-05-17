import { Headphones, Scale, Shield, Truck } from 'lucide-react'
import { featureItems } from '../data/products'

const icons = { truck: Truck, shield: Shield, scale: Scale, headphones: Headphones }

export function FeaturesBar() {
  return (
    <section className="features-bar" aria-label="Vantagens">
      <div className="container">
        <div className="features-grid">
          {featureItems.map((f) => {
            const Icon = icons[f.icon as keyof typeof icons]
            return (
              <article key={f.title} className="feature-item">
                <div className="feature-icon">
                  <Icon size={22} />
                </div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

