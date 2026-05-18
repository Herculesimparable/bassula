import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const DISCOUNTS = [
  { label: '−32%', top: '8%', left: '62%', delay: 0, tone: 'red' as const },
  { label: '−15%', top: '22%', left: '8%', delay: 0.35, tone: 'red' as const },
  { label: 'PROMO', top: '52%', left: '72%', delay: 0.7, tone: 'teal' as const },
  { label: '↓ AOA', top: '68%', left: '4%', delay: 1.05, tone: 'green' as const },
] as const

interface Props {
  className?: string
}

export function HeroRobotVisual({ className = '' }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`hero-robot ${className}`.trim()}
      aria-hidden
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="hero-robot__scene"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="hero-robot__glow"
          animate={reduceMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {DISCOUNTS.map((tag) => (
          <motion.span
            key={tag.label}
            className={`hero-robot__badge hero-robot__badge--${tag.tone}`}
            style={{ top: tag.top, left: tag.left } as CSSProperties}
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -8, 0], rotate: [-2, 2, -2] }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: tag.delay,
            }}
          >
            {tag.label}
          </motion.span>
        ))}

        <svg
          className="hero-robot__svg"
          viewBox="0 0 400 300"
          role="img"
          aria-label="Robô a empurrar carrinho de compras com descontos"
        >
          <defs>
            <linearGradient id="hero-robot-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="hero-robot-cart" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c41e3a" />
              <stop offset="100%" stopColor="#9f1239" />
            </linearGradient>
            <linearGradient id="hero-robot-screen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          {/* sombra */}
          <ellipse cx="200" cy="272" rx="120" ry="14" fill="rgba(15,23,42,0.12)" />

          {/* carrinho */}
          <g className="hero-robot__cart">
            <path
              d="M248 195 L248 155 L310 155 L330 195 L330 230 L255 230 Z"
              fill="none"
              stroke="url(#hero-robot-cart)"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <line x1="248" y1="175" x2="218" y2="175" stroke="#c41e3a" strokeWidth="4" strokeLinecap="round" />
            <rect x="258" y="162" width="28" height="22" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <rect x="292" y="168" width="18" height="28" rx="3" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <circle cx="268" cy="238" r="14" fill="#334155" className="hero-robot__wheel" />
            <circle cx="318" cy="238" r="14" fill="#334155" className="hero-robot__wheel hero-robot__wheel--2" />
            <circle cx="268" cy="238" r="6" fill="#94a3b8" />
            <circle cx="318" cy="238" r="6" fill="#94a3b8" />
          </g>

          {/* robô */}
          <g className="hero-robot__bot">
            <rect x="118" y="168" width="88" height="72" rx="14" fill="url(#hero-robot-body)" stroke="#64748b" strokeWidth="2" />
            <rect x="132" y="182" width="60" height="36" rx="8" fill="url(#hero-robot-screen)" />
            <text x="162" y="206" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800" fontFamily="system-ui,sans-serif">
              %
            </text>
            <rect x="108" y="148" width="52" height="44" rx="12" fill="url(#hero-robot-body)" stroke="#64748b" strokeWidth="2" />
            <circle cx="134" cy="168" r="7" fill="#22d3ee" className="hero-robot__eye" />
            <circle cx="152" cy="168" r="7" fill="#22d3ee" className="hero-robot__eye hero-robot__eye--2" />
            <line x1="130" y1="148" x2="130" y2="128" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="130" cy="122" r="6" fill="#c41e3a" />
            <path
              d="M206 200 L228 188"
              stroke="#94a3b8"
              strokeWidth="10"
              strokeLinecap="round"
              className="hero-robot__arm"
            />
            <path
              d="M118 200 L96 212"
              stroke="#94a3b8"
              strokeWidth="10"
              strokeLinecap="round"
              className="hero-robot__arm hero-robot__arm--left"
            />
            <rect x="128" y="238" width="22" height="28" rx="6" fill="#64748b" />
            <rect x="168" y="238" width="22" height="28" rx="6" fill="#64748b" />
          </g>

          {/* etiqueta no carrinho */}
          <g transform="translate(270, 148)">
            <rect x="0" y="0" width="52" height="26" rx="6" fill="#c41e3a" />
            <text x="26" y="18" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">
              −40%
            </text>
          </g>
        </svg>

        <p className="hero-robot__caption">Descontos em tempo real</p>
      </motion.div>
    </motion.div>
  )
}
