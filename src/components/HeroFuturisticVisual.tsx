import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const STORES = ['Kero', 'Candando', 'Shoprite', 'Alimenta'] as const

const ORBIT = [
  { name: STORES[0], delay: 0, angle: 0 },
  { name: STORES[1], delay: 0.4, angle: 90 },
  { name: STORES[2], delay: 0.8, angle: 180 },
  { name: STORES[3], delay: 1.2, angle: 270 },
] as const

interface Props {
  className?: string
}

export function HeroFuturisticVisual({ className = '' }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={`hero-fx ${className}`.trim()} aria-hidden>
      <motion.div
        className="hero-fx__stage"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <motion.div
          className="hero-fx__grid-floor"
          animate={reduceMotion ? undefined : { opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="hero-fx__beam" />
        <div className="hero-fx__beam hero-fx__beam--2" />

        <div className="hero-fx__ring hero-fx__ring--outer" />
        <div className="hero-fx__ring hero-fx__ring--mid" />
        <div className="hero-fx__ring hero-fx__ring--inner" />

        <div className="hero-fx__scan" />

        <div className="hero-fx__particles">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="hero-fx__particle" style={{ '--i': i } as CSSProperties} />
          ))}
        </div>

        <div className="hero-fx__orbit">
          {ORBIT.map((node) => (
            <motion.div
              key={node.name}
              className="hero-fx__node"
              style={{ '--angle': `${node.angle}deg` } as CSSProperties}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -6, 0],
                      boxShadow: [
                        '0 0 12px rgba(34, 211, 238, 0.35)',
                        '0 0 22px rgba(225, 29, 72, 0.5)',
                        '0 0 12px rgba(34, 211, 238, 0.35)',
                      ],
                    }
              }
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: node.delay,
              }}
            >
              <span className="hero-fx__node-dot" />
              {node.name}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="hero-fx__core"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    '0 0 40px rgba(225, 29, 72, 0.35), 0 0 80px rgba(8, 145, 178, 0.2)',
                    '0 0 55px rgba(225, 29, 72, 0.55), 0 0 100px rgba(8, 145, 178, 0.35)',
                    '0 0 40px rgba(225, 29, 72, 0.35), 0 0 80px rgba(8, 145, 178, 0.2)',
                  ],
                }
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="hero-fx__core-ring" />
          <span className="hero-fx__core-label">Bassula</span>
          <motion.span
            className="hero-fx__core-price"
            animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="hero-fx__arrow">↓</span>
            <span className="hero-fx__amount">−32%</span>
          </motion.span>
          <span className="hero-fx__core-sub">preço mín.</span>

          <motion.div
            className="hero-fx__ticker"
            animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>AOA</span>
            <span className="hero-fx__ticker-sep">·</span>
            <span>live</span>
          </motion.div>
        </motion.div>

        <svg className="hero-fx__lines" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="hero-fx-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#e11d48" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="120" fill="none" stroke="url(#hero-fx-grad)" strokeWidth="1" strokeDasharray="4 12" className="hero-fx__svg-spin" />
          <circle cx="200" cy="200" r="88" fill="none" stroke="rgba(225,29,72,0.35)" strokeWidth="1" strokeDasharray="2 8" className="hero-fx__svg-spin-rev" />
        </svg>
      </motion.div>
    </div>
  )
}
