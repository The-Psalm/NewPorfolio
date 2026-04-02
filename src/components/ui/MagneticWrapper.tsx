import type { ReactNode, CSSProperties } from 'react'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import { useCursorContext } from '@/components/cursor/CustomCursor'

interface MagneticWrapperProps {
  children: ReactNode
  strength?: number
  className?: string
  style?: CSSProperties
  cursorVariant?: 'hover' | 'drag' | 'default'
}

/**
 * Wrap any element — usually a button or link — to give it
 * a magnetic pull toward the cursor on hover.
 *
 * Usage:
 *   <MagneticWrapper strength={0.4}>
 *     <button>Hire me</button>
 *   </MagneticWrapper>
 */
export function MagneticWrapper({
  children,
  strength = 0.45,
  className,
  style,
  cursorVariant = 'hover',
}: MagneticWrapperProps) {
  const ref = useMagneticEffect<HTMLDivElement>({ strength })
  const { setVariant } = useCursorContext()

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
      onMouseEnter={() => setVariant(cursorVariant)}
      onMouseLeave={() => setVariant('default')}
    >
      {children}
    </div>
  )
}