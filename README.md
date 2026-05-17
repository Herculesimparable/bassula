# Bassula — Comparação de Preços

Plataforma web responsiva para comparar preços de supermercados em **Angola** (Kero, Candando, Shoprite, Alimenta) e internacionalmente.

## Site público (qualquer rede / dispositivo)

| Alojamento | URL | Notas |
|------------|-----|--------|
| **Vercel** (recomendado) | https://bassula.vercel.app | URLs limpas (`/ofertas`, `/alimentos`); acesso global HTTPS |
| GitHub Pages | https://herculesimparable.github.io/bassula/ | Backup automático em cada push |

Funciona **sem Cursor** e **sem o seu PC ligado**: o código está no GitHub; Vercel e GitHub Pages compilam e servem o site na nuvem.

### Ligar Vercel ao GitHub (uma vez)

1. Entrar em [vercel.com](https://vercel.com) com a conta GitHub `Herculesimparable`
2. **Add New Project** → importar `Herculesimparable/bassula`
3. Deixar as definições por defeito (lê `vercel.json` automaticamente)
4. **Deploy** — cada `git push` na `main` actualiza o site

O ficheiro `vercel.json` na raiz do projeto configura o build Vite e as rotas da SPA (React Router).

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra http://localhost:5173

## Build

```bash
npm run build          # local / preview
npm run build:pages    # igual ao deploy GitHub Pages
npm run preview:pages  # testar com base /bassula/
```

## Repositório

https://github.com/Herculesimparable/bassula

## Apoio

Telefone: **+244 923 000 000** · Email: apoio@bassula.ao
