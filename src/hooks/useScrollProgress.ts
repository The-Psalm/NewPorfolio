import { useRef } from 'react'
import { useScroll, useTransform, type MotionValue } from 'framer-motion'

interface ScrollProgressOptions {
  /** Offset for when the animation starts/ends relative to the viewport */
  offset?: string[]
}

interface ScrollProgressReturn {
  ref: React.RefObject<HTMLElement>
  scrollYProgress: MotionValue<number>
}

/**
 * Tracks the scroll progress of a specific element relative to the viewport.
 * Returns a 0–1 MotionValue you can pipe into useTransform().
 *
 * Usage:
 *   const { ref, scrollYProgress } = useScrollProgress()
 *   const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
 *   <motion.div ref={ref} style={{ opacity }} />
 */
export function useScrollProgress(
  options: ScrollProgressOptions = {}
): ScrollProgressReturn {
  const { offset = ['start end', 'end start'] } = options
  const ref = useRef<HTMLElement>(null!)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  })

  return { ref, scrollYProgress }
}

/**
 * Pre-built transform presets for common scroll animations.
 * Pass in the scrollYProgress MotionValue from useScrollProgress().
 */
export function useScrollFadeUp(scrollYProgress: MotionValue<number>) {
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])
  const y       = useTransform(scrollYProgress, [0, 0.2],         [40, 0])
  return { opacity, y }
}

export function useScrollFadeIn(scrollYProgress: MotionValue<number>) {
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.9, 1], [0, 1, 1, 0])
  return { opacity }
}

export function useScrollScale(scrollYProgress: MotionValue<number>) {
  const scale   = useTransform(scrollYProgress, [0, 0.3], [0.88, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0,    1])
  return { scale, opacity }
}

export function useScrollParallax(
  scrollYProgress: MotionValue<number>,
  distance = 80
) {
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2])
  return { y }
}