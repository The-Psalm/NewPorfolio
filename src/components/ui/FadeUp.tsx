/**
 * FadeUp — wraps children in a motion.div that fades in and rises
 * slightly as the element scrolls into view.
 *
 * Usage:
 *   <FadeUp>
 *     <p>Some content</p>
 *   </FadeUp>
 *
 *   <FadeUp delay={0.2} distance={24}>
 *     <h2>Heading</h2>
 *   </FadeUp>
 */
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeUpProps {
  children:  ReactNode
  delay?:    number   // seconds, default 0
  distance?: number   // px to travel, default 20
  duration?: number   // seconds, default 0.65
  className?: string
  style?:    React.CSSProperties
}

export function FadeUp({
  children,
  delay    = 0,
  distance = 20,
  duration = 0.65,
  className,
  style,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
