import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MagneticWrapper } from './MagneticWrapper'
import { useCursorContext } from '@/components/cursor/CustomCursor'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
  magnetic?: boolean
  disabled?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className,
  magnetic = true,
  disabled = false,
}: ButtonProps) {
  const { setVariant } = useCursorContext()

  const sizeClass = size === 'sm' ? 'px-4 py-2 text-xs'
    : size === 'lg' ? 'px-8 py-4 text-base'
    : 'px-6 py-3 text-sm'

  const el = (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => setVariant('default')}
      className={cn(
        'relative group inline-flex items-center gap-2 rounded-full font-sans font-medium tracking-wide overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none',
        sizeClass,
        variant === 'primary' && 'text-[#D6CCD0]',
        variant === 'outline' && 'text-[#D6CCD0]',
        variant === 'ghost'   && 'text-[rgba(214,204,208,0.65)] hover:text-[#D6CCD0]',
        className,
      )}
      style={{
        backgroundColor: variant === 'primary' ? '#763948' : 'transparent',
        border: variant === 'outline' ? '1px solid rgba(118,57,72,0.6)' : 'none',
      }}
    >
      {variant === 'outline' && (
        <span
          className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full"
          style={{ backgroundColor: '#763948' }}
          aria-hidden="true"
        />
      )}
      {variant === 'primary' && (
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )

  return magnetic ? <MagneticWrapper strength={0.35}>{el}</MagneticWrapper> : el
}