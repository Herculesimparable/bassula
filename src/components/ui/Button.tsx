import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type Ref } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'icon'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  /** Animação framer-motion em CTAs principais */
  animated?: boolean
  className?: string
  children: ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    to?: undefined
  }

type ButtonAsLink = CommonProps &
  Omit<LinkProps, keyof CommonProps | 'children'> & {
    to: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

function buildClassName({
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  className = '',
}: Pick<CommonProps, 'variant' | 'size' | 'fullWidth' | 'loading' | 'className'>) {
  const sizeClass = size === 'md' ? '' : `btn-${size}`
  return [
    'btn',
    `btn-${variant}`,
    sizeClass,
    fullWidth ? 'btn-full' : '',
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      fullWidth,
      loading,
      animated = false,
      className = '',
      children,
      ...rest
    },
    ref,
  ) {
    const reduceMotion = useReducedMotion()
    const useMotion = animated && !reduceMotion && variant === 'primary'
    const classes = buildClassName({ variant, size, fullWidth, loading, className })

    const content = (
      <>
        {loading && <span className="btn__spinner" aria-hidden />}
        {children}
      </>
    )

    const motionProps = useMotion
      ? { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } }
      : {}

    if ('to' in rest && rest.to) {
      const { to, ...linkRest } = rest as ButtonAsLink
      return (
        <Link
          ref={ref as Ref<HTMLAnchorElement>}
          to={to}
          className={classes}
          aria-disabled={loading || undefined}
          {...linkRest}
        >
          {content}
        </Link>
      )
    }

    const { disabled, type = 'button', ...buttonRest } = rest as ButtonAsButton

    if (useMotion) {
      return (
        <motion.button
          ref={ref as React.Ref<HTMLButtonElement>}
          type={type}
          className={classes}
          disabled={disabled || loading}
          {...motionProps}
          {...(buttonRest as object)}
        >
          {content}
        </motion.button>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        disabled={disabled || loading}
        {...buttonRest}
      >
        {content}
      </button>
    )
  },
)
