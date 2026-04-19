import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useCursor } from '@/hooks/useCursor'
import type { CursorVariant } from '@/types'

// ─── Context ──────────────────────────────────────────────
interface CursorContextValue {
  setVariant: (variant: CursorVariant) => void
}

const CursorContext = createContext<CursorContextValue>({
  setVariant: () => {},
})

export function useCursorContext() {
  return useContext(CursorContext)
}

// ─── Provider ─────────────────────────────────────────────
interface CursorProviderProps {
  children: ReactNode
}

export function CursorProvider({ children }: CursorProviderProps) {
  const { cursorDotRef, cursorBlobRef, cursorTrailRef, setVariant } = useCursor()
  const getEligible = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: fine)').matches
  }

  const [isVisible, setIsVisible] = useState(getEligible)
  const [isLargeScreen, setIsLargeScreen] = useState(() => {
    return getEligible()
  })
  const prevBodyCursor = useRef<string | null>(null)

  useEffect(() => {
    // Prefer a pointer-precision check over viewport width.
    // This avoids cases where `min-width` / `hover` heuristics disagree with actual input.
    const mq = window.matchMedia('(pointer: fine)')
    setIsLargeScreen(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsLargeScreen(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    // Keep the system cursor visible when the custom cursor is disabled.
    if (typeof document === 'undefined') return

    const body = document.body
    if (!body) return

    if (prevBodyCursor.current === null) {
      prevBodyCursor.current = body.style.cursor || null
    }

    if (!isLargeScreen) {
      setIsVisible(false)
      body.style.cursor = 'auto'
      return
    }

    body.style.cursor = 'none'
    setIsVisible(true) // show immediately on eligible devices

    const show = () => setIsVisible(true)
    const hide = () => setIsVisible(false)

    window.addEventListener('blur', hide)
    window.addEventListener('focus', show)

    return () => {
      window.removeEventListener('blur', hide)
      window.removeEventListener('focus', show)
      // Restore the prior cursor style so we don't leave the page in an unexpected state.
      if (prevBodyCursor.current !== null) {
        body.style.cursor = prevBodyCursor.current
      } else {
        body.style.cursor = ''
      }
    }
  }, [isLargeScreen])

  if (!isLargeScreen) {
    return (
      <CursorContext.Provider value={{ setVariant }}>
        {children}
      </CursorContext.Provider>
    )
  }

  /* NOTE: no CSS transform: translate(-50%,-50%) on any cursor element.
     GSAP handles centering via xPercent:-50 / yPercent:-50 set in useCursor. */
  const base: React.CSSProperties = {
    position:      'fixed',
    top:           0,
    left:          0,
    pointerEvents: 'none',
    opacity:       isVisible ? 1 : 0,
    transition:    'opacity 0.35s ease',
    borderRadius:  '50%',
  }

  return (
    <CursorContext.Provider value={{ setVariant }}>
      {children}

      {/* ── Trail ring — slowest, most diffuse ─────────────── */}
      <div
        ref={cursorTrailRef}
        aria-hidden="true"
        style={{
          ...base,
          width:       70,
          height:      70,
          border:      '1px solid rgba(240, 237, 230, 0.08)',
          background:  'transparent',
          zIndex:      9995,
          willChange:  'transform',
        }}
      />

      {/* ── Blob ring — spring follow, morphs on variant ───── */}
      <div
        ref={cursorBlobRef}
        aria-hidden="true"
        style={{
          ...base,
          width:       40,
          height:      40,
          border:      '1px solid rgba(240, 237, 230, 0.3)',
          background:  'transparent',
          zIndex:      9996,
          willChange:  'transform, width, height',
        }}
      />

      {/* ── Dot — snaps instantly, squishes on fast movement ─ */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        style={{
          ...base,
          width:       6,
          height:      6,
          background:  'var(--color-text-primary)',
          zIndex:      9999,
          willChange:  'transform',
        }}
      />
    </CursorContext.Provider>
  )
}
