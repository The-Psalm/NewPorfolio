import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RevealTextProps {
  children: string
  className?: string
  /** 'words' splits by word, 'chars' splits by character */
  splitBy?: 'words' | 'chars'
  /** Delay before the animation starts (seconds) */
  delay?: number
  /** Stagger between each word/char (seconds) */
  stagger?: number
  /** How far up each piece travels (px) */
  distance?: number
  /** Only animate once, or every time it enters the viewport */
  once?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

/**
 * Splits text into words or characters and reveals them
 * with a staggered upward animation on scroll entry.
 *
 * Usage:
 *   <RevealText as="h2" splitBy="words" delay={0.1}>
 *     Hello, I'm Samuel
 *   </RevealText>
 */
export function RevealText({
  children,
  className,
  splitBy = 'words',
  delay = 0,
  stagger = 0.06,
  distance = 40,
  once = true,
  as: Tag = 'p',
}: RevealTextProps) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once, margin: '-10% 0px' })

  const pieces = splitBy === 'chars'
    ? children.split('')
    : children.split(' ')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren:   delay,
      },
    },
  }

  const pieceVariants = {
    hidden:  { y: distance, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
        ease:     [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={cn('overflow-hidden', className)}>
      <motion.span
        style={{ display: 'flex', flexWrap: 'wrap', gap: splitBy === 'words' ? '0.25em' : '0' }}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {pieces.map((piece, i) => (
          <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              variants={pieceVariants}
            >
              {piece}
              {splitBy === 'words' && i < pieces.length - 1 ? '' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}