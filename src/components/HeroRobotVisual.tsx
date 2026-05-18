import type { CSSProperties, MouseEvent, TouchEvent } from 'react'
import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from '../context/LocaleContext'
import { publicAsset } from '../utils/publicAsset'

const HERO_ROBOT_IMAGE = publicAsset('images/hero/hero-robot-3d.png')

const DISCOUNTS = [
  { label: '−32%', top: '6%', left: '58%', delay: 0, tone: 'red' as const },
  { label: '−15%', top: '18%', left: '4%', delay: 0.35, tone: 'red' as const },
  { label: 'PROMO', top: '48%', left: '68%', delay: 0.7, tone: 'teal' as const },
  { label: '↓ AOA', top: '62%', left: '2%', delay: 1.05, tone: 'green' as const },
] as const

interface Props {
  className?: string
}

export function HeroRobotVisual({ className = '' }: Props) {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  function updatePointer(clientX: number, clientY: number) {
    if (isDragging || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width - 0.5) * 28
    const y = ((clientY - rect.top) / rect.height - 0.5) * -20
    setTilt({ x, y })
  }

  function onPointerMove(e: MouseEvent<HTMLDivElement>) {
    updatePointer(e.clientX, e.clientY)
  }

  function onTouchMove(e: TouchEvent<HTMLDivElement>) {
    if (isDragging) return
    const touch = e.touches[0]
    if (touch) updatePointer(touch.clientX, touch.clientY)
  }

  function resetPointer() {
    if (!isDragging) setTilt({ x: 0, y: 0 })
  }

  const tiltStyle = {
    '--tilt-x': `${tilt.x}deg`,
    '--tilt-y': `${tilt.y}deg`,
  } as CSSProperties

  return (
    <motion.div
      className={`hero-robot hero-robot--live ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={stageRef}
        className="hero-robot__stage"
        onMouseMove={onPointerMove}
        onMouseLeave={resetPointer}
        onTouchMove={onTouchMove}
        onTouchEnd={resetPointer}
      >
        <div className="hero-robot__aura" aria-hidden />
        <div className="hero-robot__grid" aria-hidden />

        <motion.div
          className="hero-robot__mover"
          drag
          dragConstraints={stageRef}
          dragElastic={0.22}
          dragMomentum
          whileDrag={{ scale: 1.05, zIndex: 10 }}
          whileHover={{ scale: 1.02 }}
          onDragStart={() => {
            setIsDragging(true)
            setTilt({ x: 0, y: 0 })
          }}
          onDragEnd={() => setIsDragging(false)}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          {DISCOUNTS.map((tag) => (
            <span
              key={tag.label}
              className={`hero-robot__badge hero-robot__badge--${tag.tone} hero-robot__badge--glass hero-robot__badge--float`}
              style={
                {
                  top: tag.top,
                  left: tag.left,
                  animationDelay: `${tag.delay}s`,
                } as CSSProperties
              }
            >
              {tag.label}
            </span>
          ))}

          <div className="hero-robot__walker">
            <div className="hero-robot__shadow" aria-hidden />
            <div className="hero-robot__card-3d" style={tiltStyle}>
              <div className="hero-robot__scan" aria-hidden />
              <img
                src={HERO_ROBOT_IMAGE}
                alt={t('hero.robotAlt')}
                className="hero-robot__img"
                width={640}
                height={640}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          </div>
        </motion.div>

        <p className="hero-robot__caption">{t('hero.robotCaption')}</p>
      </div>
    </motion.div>
  )
}
