# Bassula — Comparação de Preços

Plataforma web responsiva para comparar preços de supermercados em **Angola** (Kero, Candando, Shoprite, Alimenta) e internacionalmente.

## Site público (principal)

| Alojamento | URL |
|------------|-----|
| **GitHub Pages** (principal) | **https://herculesimparable.github.io/bassula/** |
| Vercel (espelho opcional) | https://bassula.vercel.app |

Cada `git push` na branch `main` actualiza automaticamente o site no GitHub Pages.

### URLs do site

- Início: https://herculesimparable.github.io/bassula/
- Ofertas: https://herculesimparable.github.io/bassula/ofertas
- Pesquisa: https://herculesimparable.github.io/bassula/pesquisa?q=agua
- Carrinho: https://herculesimparable.github.io/bassula/carrinho

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra http://localhost:5173

## Build

```bash
npm run build          # preview local (base /)
npm run build:pages    # igual ao deploy GitHub Pages (base /bassula/)
npm run preview:pages  # testar com base /bassula/
npm run release        # imagens + verify + build completo
```

## Repositório

https://github.com/Herculesimparable/bassula
