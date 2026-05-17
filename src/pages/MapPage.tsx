import { ExternalLink, MapPin, Phone } from 'lucide-react'
import { BackButton } from '../components/BackButton'
import { storeLocations } from '../data/stores-locations'

export function MapPage() {
  const center = storeLocations[0]

  return (
    <main className="page-map">
      <div className="container">
        <BackButton />
        <h1 className="page-title">Lojas e mapa</h1>
        <p className="page-subtitle">
          Encontre supermercados parceiros em Angola. Compare preços e escolha a loja mais próxima.
        </p>

        <div className="map-layout">
          <div className="map-embed">
            <iframe
              title="Mapa de lojas Bassula"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.15}%2C${center.lat - 0.1}%2C${center.lng + 0.15}%2C${center.lat + 0.1}&layer=mapnik&marker=${center.lat}%2C${center.lng}`}
              loading="lazy"
            />
          </div>
          <div className="store-list">
            {storeLocations.map((store) => (
              <article key={store.id} className="store-card">
                <h3>
                  <MapPin size={18} />
                  {store.name}
                </h3>
                <p>{store.address}</p>
                <p>{store.city} · {store.hours}</p>
                <a href={`tel:${store.phone}`} className="store-phone">
                  <Phone size={16} />
                  {store.phone}
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline btn-sm"
                >
                  <ExternalLink size={16} />
                  Abrir no Google Maps
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
