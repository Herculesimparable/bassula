import { Link } from 'react-router-dom'
import { BackButton } from '../components/BackButton'

export function ImageCreditsPage() {
  return (
    <main className="page-static">
      <div className="container container-narrow">
        <BackButton />
        <h1 className="page-title">Créditos de imagens</h1>
        <p className="page-subtitle">
          Utilização autorizada para o website Bassula — pesquisa, descarga e apresentação de fotos alinhadas
          a cada produto.
        </p>

        <section className="static-block">
          <h2>Autorização</h2>
          <p>
            O responsável pelo projeto Bassula autorizou expressamente a pesquisa na internet, a descarga e a
            utilização das imagens exibidas neste site (supermercados em Angola e fontes internacionais), para
            fins de comparação de preços e demonstração da plataforma.
          </p>
        </section>

        <section className="static-block">
          <h2>Fontes</h2>
          <ul className="credits-list">
            <li>
              <a href="https://world.openfoodfacts.org" target="_blank" rel="noopener noreferrer">
                Open Food Facts
              </a>{' '}
              — fotografias de embalagens e produtos alimentares (licença aberta ODbL).
            </li>
            <li>
              <a href="https://loremflickr.com" target="_blank" rel="noopener noreferrer">
                LoremFlickr
              </a>{' '}
              — frutas, carnes, peixes e electrodomésticos (tags fixas por produto).
            </li>
            <li>Redes Kero, Candando, Shoprite, Alimenta Angola e outras — referência de catálogo quando disponível.</li>
          </ul>
        </section>

        <section className="static-block">
          <h2>Armazenamento local</h2>
          <p>
            As imagens estão guardadas em <code>public/images/products/</code> (um ficheiro por produto, ex.{' '}
            <code>2.jpg</code> = Arroz). Isto garante carregamento rápido e correspondência estável entre legenda e
            foto.
          </p>
          <p>
            Para atualizar todas as imagens: <code>npm run images:fetch</code>
          </p>
        </section>

        <p>
          <Link to="/sobre" className="btn-outline">
            Voltar a Sobre nós
          </Link>
        </p>
      </div>
    </main>
  )
}
