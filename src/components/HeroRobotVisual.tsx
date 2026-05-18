import type { CSSProperties, MouseEvent } from 'react'
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
  const spring = { stiffness: 120, damping: 18, mass: 0.6 }

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), spring)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), spring)

  function onPointerMove(e: MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onPointerLeave() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      className={`hero-robot ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={stageRef}
        className="hero-robot__stage"
        onMouseMove={onPointerMove}
        onMouseLeave={onPointerLeave}
      >
        <motion.div
          className="hero-robot__aura"
          animate={reduceMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
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
                : { y: [0, -10, 0], scale: [1, 1.05, 1] }
            }
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: tag.delay,
            }}
          >
            {tag.label}
          </motion.span>
        ))}

        <motion.div
          className="hero-robot__card-3d"
          style={
            reduceMotion
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }
          }
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <motion.div className="hero-robot__shine" aria-hidden />
          <motion.div className="hero-robot__scan" aria-hidden />
          <motion.img
            src={HERO_ROBOT_IMAGE}
            alt={t('hero.robotAlt')}
            className="hero-robot__img"
            width={640}
            height={640}
            loading="eager"
            decoding="async"
            draggable={false}
            animate={reduceMotion ? undefined : { scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.div
          className="hero-robot__floor"
          animate={reduceMotion ? undefined : { opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />

        <p className="hero-robot__caption">{t('hero.robotCaption')}</p>
      </motion.div>
    </motion.div>
  )
}
