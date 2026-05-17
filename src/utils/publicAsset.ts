/** Caminho público com suporte a GitHub Pages (`/bassula/`). */
export function publicAsset(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalized}`
}
