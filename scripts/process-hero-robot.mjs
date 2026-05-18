/**
 * Remove light background from hero robot PNG → true alpha transparency.
 * Run: node scripts/process-hero-robot.mjs
 */
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const input = path.join(__dirname, '../public/images/hero/hero-robot-3d.png')
const output = input

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info

for (let i = 0; i < data.length; i += channels) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  const maxC = Math.max(r, g, b)
  const minC = Math.min(r, g, b)
  const sat = maxC === 0 ? 0 : (maxC - minC) / maxC

  if (lum > 248 && sat < 0.08) {
    data[i + 3] = 0
  } else if (lum > 220 && sat < 0.12) {
    const fade = Math.max(0, Math.min(255, Math.floor((255 - lum) * 4.5)))
    data[i + 3] = Math.min(data[i + 3], fade)
  } else if (lum > 200 && sat < 0.18) {
    const fade = Math.max(0, Math.min(255, Math.floor((240 - lum) * 3)))
    data[i + 3] = Math.min(data[i + 3], fade)
  }
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(output)

console.log(`OK: transparent PNG → ${output} (${width}x${height})`)
