import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import type { CursorVariant } from '@/types'

export function useCursor() {
  const cursorDotRef   = useRef<HTMLDivElement>(null)
  const cursorBlobRef  = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement>(null)
  const variantRef     = useRef<CursorVariant>('default')
  const posRef         = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot   = cursorDotRef.current
    const blob  = cursorBlobRef.current
    const trail = cursorTrailRef.current
    if (!dot || !blob) return

    // Centre-anchor all elements so position == cursor centre, then park off-screen
    const centred = { xPercent: -50, yPercent: -50 }
    gsap.set([dot, blob], centred)
    if (trail) gsap.set(trail, centred)

    gsap.set([dot, blob], { x: -200, y: -200 })
    if (trail) gsap.set(trail, { x: -200, y: -200 })

    let lastX    = -200
    let lastY    = -200
    let lastTime = performance.now()
    let hasMoved = false

    // Respect accessibility preferences for motion.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = prefersReducedMotion.matches
    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches
    }
    prefersReducedMotion.addEventListener('change', onReducedMotionChange)

    // Speed-driven sparks state (DOM-based; capped for performance).
    const sparkEls = new Set<HTMLDivElement>()
    let lastSparkTime = 0
    const sparkCooldownMs = 140
    const maxActiveSparks = 22

    // ── Idle breathing ──────────────────────────────────────
    let idleTimer: gsap.core.Tween    | null = null
    let idleTl:    gsap.core.Timeline | null = null

    const startIdleBreath = () => {
      idleTl = gsap.timeline({ repeat: -1, yoyo: true })
        .to(blob, { scale: 1.3, duration: 1.5, ease: 'sine.inOut' }, 0)
      if (trail) idleTl.to(trail, { scale: 1.15, duration: 1.8, ease: 'sine.inOut' }, 0.3)
    }

    const stopIdleBreath = () => {
      if (idleTl) { idleTl.kill(); idleTl = null }
      const targets = trail ? [blob, trail] : [blob]
      gsap.to(targets, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    const resetIdle = () => {
      if (idleTimer) idleTimer.kill()
      stopIdleBreath()
      idleTimer = gsap.delayedCall(2.5, startIdleBreath)
    }

    // ── Mouse move ──────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const now   = performance.now()
      if (!hasMoved) {
        hasMoved = true
        posRef.current = { x: e.clientX, y: e.clientY }
        lastX = e.clientX
        lastY = e.clientY
        lastTime = now
        // Park all cursor elements immediately (no initial velocity artifacts).
        gsap.set(dot, { x: e.clientX, y: e.clientY, rotation: 0, scaleX: 1, scaleY: 1 })
        gsap.set(blob, { x: e.clientX, y: e.clientY })
        if (trail) gsap.set(trail, { x: e.clientX, y: e.clientY })
        resetIdle()
        return
      }

      // Clamp dt to avoid huge velocity spikes after tab switching / throttling.
      const dt = Math.min(Math.max(now - lastTime, 1), 40)
      const vx    = (e.clientX - lastX) / dt
      const vy    = (e.clientY - lastY) / dt
      const speed = Math.sqrt(vx * vx + vy * vy)         // px/ms
      const speedN = Math.min(speed / 1.25, 1)
      const angle = Math.atan2(vy, vx) * (180 / Math.PI) // degrees

      posRef.current = { x: e.clientX, y: e.clientY }

      // Velocity squish — elongate dot in direction of travel
      const stretch = Math.min(1 + speed * 12, 3)
      const squish  = Math.max(1 / stretch, 0.35)

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        rotation: angle,
        scaleX: stretch,
        scaleY: squish,
        duration: 0.06,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      // Elastic snap back to perfect circle
      gsap.to(dot, {
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        duration: 0.55,
        ease: 'elastic.out(1, 0.4)',
        delay: 0.07,
        overwrite: 'auto',
      })

      // Blob: fluid spring follow
      gsap.to(blob, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      // Trail: ghost ring with extra lag
      if (trail) {
        gsap.to(trail, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.95,
          ease: 'power2.out',
          overwrite: 'auto',
          opacity: 0.14 + speedN * 0.42,
          scale: 1 + speedN * 0.18,
          boxShadow: `0 0 ${12 + speedN * 26}px rgba(118,57,72,${0.04 + speedN * 0.18})`,
        })
      }

      // Speed sparks (balanced: only on fast movement).
      if (!reducedMotion && speedN > 0.38 && now - lastSparkTime > sparkCooldownMs && sparkEls.size < maxActiveSparks) {
        lastSparkTime = now
        const theta = angle * (Math.PI / 180)
        // Keep spark creation small and capped.
        const count = Math.round(4 + speedN * 8)
        const baseDist = 16 + speedN * 60
        const spreadDeg = 28 + speedN * 30

        for (let i = 0; i < count; i++) {
          if (sparkEls.size >= maxActiveSparks) break

          const spark = document.createElement('div')
          const size = 1.6 + Math.random() * (2.0 + speedN * 1.2)
          const alpha = 0.65 + speedN * 0.25
          const isWine = Math.random() > 0.55

          sparkEls.add(spark)

          Object.assign(spark.style, {
            position:      'fixed',
            top:           '0',
            left:          '0',
            width:         `${size}px`,
            height:        `${size}px`,
            borderRadius:  '999px',
            background:    isWine ? `rgba(118,57,72,${alpha})` : `rgba(214,204,208,${alpha})`,
            pointerEvents: 'none',
            zIndex:        '10000',
            willChange:    'transform,opacity',
            boxShadow:     isWine ? '0 0 14px rgba(118,57,72,0.35)' : '0 0 14px rgba(214,204,208,0.25)',
          })

          document.body.appendChild(spark)
          gsap.set(spark, { x: e.clientX, y: e.clientY, xPercent: -50, yPercent: -50, opacity: 1 })

          const rand = (Math.random() - 0.5) * spreadDeg
          const t = theta + (rand * Math.PI) / 180
          const dist = baseDist + Math.random() * 22

          gsap.to(spark, {
            x: e.clientX + Math.cos(t) * dist,
            y: e.clientY + Math.sin(t) * dist,
            duration: 0.42 + Math.random() * 0.22,
            opacity: 0,
            scale: 0.2 + Math.random() * 0.35,
            ease: 'power3.out',
            onComplete: () => {
              sparkEls.delete(spark)
              spark.remove()
            },
          })
        }
      }

      lastX    = e.clientX
      lastY    = e.clientY
      lastTime = now
      resetIdle()
    }

    // ── Click ripple ─────────────────────────────────────────
    const spawnRipple = (x: number, y: number) => {
      // Layered rings make the click feel more "alive" without needing canvas.
      const count = 3

      for (let i = 0; i < count; i++) {
        const ring = document.createElement('div')
        const size = 9 + i * 2
        const borderAlpha = 0.75 - i * 0.18

        Object.assign(ring.style, {
          position:      'fixed',
          top:           '0',
          left:          '0',
          width:         `${size}px`,
          height:        `${size}px`,
          borderRadius:  '50%',
          border:        `1.5px solid rgba(214,204,208,${borderAlpha})`,
          pointerEvents: 'none',
          zIndex:        '9998',
          willChange:    'transform,opacity',
        })

        document.body.appendChild(ring)

        // Match the cursor "center anchoring" approach (xPercent/yPercent).
        gsap.set(ring, { x, y, xPercent: -50, yPercent: -50, scale: 1, opacity: 1 })

        gsap.to(ring, {
          scale:   6.5 + i * 0.9,
          opacity: 0,
          duration: 0.62 + i * 0.06,
          ease: 'power2.out',
          delay: i * 0.025,
          onComplete: () => ring.remove(),
        })
      }
    }

    const onDown = (e: MouseEvent) => {
      spawnRipple(e.clientX, e.clientY)
      // Dot compresses on press
      gsap.to(dot, { scale: 0.45, duration: 0.1, ease: 'power3.in', overwrite: 'auto' })
    }

    const onUp = () => {
      // Dot bounces back
      gsap.to(dot, { scale: 1, duration: 0.5, ease: 'elastic.out(1.2, 0.35)', overwrite: 'auto' })
    }

    resetIdle()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      if (idleTimer) idleTimer.kill()
      if (idleTl)    idleTl.kill()

      prefersReducedMotion.removeEventListener('change', onReducedMotionChange)

      // Remove any remaining sparks to avoid DOM buildup on unmount.
      gsap.killTweensOf(Array.from(sparkEls))
      sparkEls.forEach((el) => el.remove())
      sparkEls.clear()
    }
  }, [])

  // ── Variant morphing ────────────────────────────────────────
  const setVariant = useCallback((variant: CursorVariant) => {
    const blob = cursorBlobRef.current
    if (!blob || variantRef.current === variant) return
    variantRef.current = variant

    const blobStyles: Record<CursorVariant, gsap.TweenVars> = {
      default: {
        width:           40,
        height:          40,
        backgroundColor: 'rgba(118,57,72,0)',
        borderColor:     'rgba(214,204,208,0.45)',
        borderWidth:     '1.5px',
        boxShadow:       '0 0 12px 2px rgba(118,57,72,0.08)',
        mixBlendMode:    'normal',
        duration:        0.4,
        ease:            'back.out(2)',
      },
      hover: {
        width:           64,
        height:          64,
        backgroundColor: 'rgba(118,57,72,0.08)',
        borderColor:     'rgba(214,204,208,0.85)',
        borderWidth:     '1px',
        boxShadow:       '0 0 22px 4px rgba(118,57,72,0.22)',
        mixBlendMode:    'normal',
        duration:        0.4,
        ease:            'back.out(2)',
      },
      text: {
        width:           80,
        height:          24,
        backgroundColor: 'rgba(214,204,208,0.88)',
        borderColor:     'transparent',
        borderWidth:     '0px',
        boxShadow:       'none',
        mixBlendMode:    'difference',
        duration:        0.35,
        ease:            'power3.out',
      },
      drag: {
        width:           72,
        height:          72,
        backgroundColor: 'rgba(118,57,72,0.18)',
        borderColor:     'rgba(118,57,72,0.7)',
        borderWidth:     '1px',
        boxShadow:       '0 0 28px 6px rgba(118,57,72,0.25)',
        mixBlendMode:    'normal',
        duration:        0.4,
        ease:            'back.out(1.5)',
      },
    }

    gsap.to(blob, blobStyles[variant])
  }, [])

  return { cursorDotRef, cursorBlobRef, cursorTrailRef, setVariant, posRef }
}
