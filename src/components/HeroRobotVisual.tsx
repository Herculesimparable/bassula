import type { CSSProperties, MouseEvent, TouchEvent } from 'react'
import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useTranslation } from '../context/LocaleContext'
import { publicAsset } from '../utils/publicAsset'

const HERO_ROBOT_IMAGE = publicAsset('images/hero/hero-robot-3d.png')

/** Ciclo de “caminhada” 3D — empurra o carrinho com balanço e profundidade */
const WALK_3D = {
  y: [0, -32, -14, -36, -10, 0],
  x: [0, 42, 20, -28, 12, 0],
  rotateY: [-18, -8, 14, 8, -16, -18],
  rotateX: [6, -5, 4, -6, 5, 6],
  z: [0, 55, 20, 60, 15, 0],
}

const WALK_TRANSITION = {
  duration: 3,
  repeat: Infinity,
  ease: 'easeInOut' as const,
}

const IMG_BOB = {
  scale: [1, 1.07, 1.02, 1.08, 1],
  rotateZ: [0, 1.2, -0.8, 1, 0],
}

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

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const spring = { stiffness: 160, damping: 14, mass: 0.5 }

  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [14, -14]), spring)
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-18, 18]), spring)

  function updatePointer(clientX: number, clientY: number) {
    if (reduceMotion || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    pointerX.set((clientX - rect.left) / rect.width - 0.5)
    pointerY.set((clientY - rect.top) / rect.height - 0.5)
  }

  function onPointerMove(e: MouseEvent<HTMLDivElement>) {
    updatePointer(e.clientX, e.clientY)
  }

  function onTouchMove(e: TouchEvent<HTMLDivElement>) {
    const touch = e.touches[0]
    if (touch) updatePointer(touch.clientX, touch.clientY)
  }

  function resetPointer() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      className={`hero-robot ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={stageRef}
        className="hero-robot__stage"
        onMouseMove={onPointerMove}
        onMouseLeave={resetPointer}
        onTouchMove={onTouchMove}
        onTouchEnd={resetPointer}
      >
        <motion.div
          className="hero-robot__aura"
          animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="hero-robot__grid" aria-hidden />

        {DISCOUNTS.map((tag) => (
          <motion.span
            key={tag.label}
            className={`hero-robot__badge hero-robot__badge--${tag.tone} hero-robot__badge--glass`}
            style={{ top: tag.top, left: tag.left } as CSSProperties}
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -14, 0], x: [0, 6, 0], scale: [1, 1.1, 1] }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: tag.delay,
            }}
          >
            {tag.label}
          </motion.span>
        ))}

        <motion.div
          className="hero-robot__walker"
          animate={reduceMotion ? undefined : WALK_3D}
          transition={WALK_TRANSITION}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            className="hero-robot__shadow"
            animate={
              reduceMotion
                ? undefined
                : {
                    scaleX: [1, 1.2, 0.92, 1.18, 1],
                    opacity: [0.35, 0.55, 0.3, 0.5, 0.35],
                  }
            }
            transition={WALK_TRANSITION}
            aria-hidden
          />

          <motion.div
            className="hero-robot__card-3d"
            style={
              reduceMotion
                ? undefined
                : {
                    rotateX: tiltX,
                    rotateY: tiltY,
                    transformStyle: 'preserve-3d',
                  }
            }
          >
            <motion.div
              className="hero-robot__scan"
              aria-hidden
              animate={reduceMotion ? undefined : { opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src={HERO_ROBOT_IMAGE}
              alt={t('hero.robotAlt')}
              className="hero-robot__img"
              width={640}
              height={640}
              loading="eager"
              decoding="async"
              draggable={false}
              animate={reduceMotion ? undefined : IMG_BOB}
              transition={WALK_TRANSITION}
            />
          </motion.div>
        </motion.div>

        <p className="hero-robot__caption">{t('hero.robotCaption')}</p>
      </motion.div>
    </motion.div>
  )
}
