import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface MagneticOptions {
  /** How strongly the element is pulled toward the cursor. 0.3 = subtle, 0.7 = strong */
  strength?: number
  /** How fast it snaps back when the cursor leaves */
  returnDuration?: number
}

export function useMagneticEffect<T extends HTMLElement>(
  options: MagneticOptions = {}
) {
  const { strength = 0.45, returnDuration = 0.7 } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect   = el.getBoundingClientRect()
      const centerX = rect.left + rect.width  / 2
      const centerY = rect.top  + rect.height / 2
      const deltaX  = (e.clientX - centerX) * strength
      const deltaY  = (e.clientY - centerY) * strength

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: returnDuration,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength, returnDuration])

  return ref
}