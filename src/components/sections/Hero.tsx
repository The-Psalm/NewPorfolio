import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { HeroScene } from '@/components/three/Scene'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { getLenis } from '@/hooks/useSmoothScroll'

const FADE = { initial: { opacity: 0 }, animate: { opacity: 1 } }

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { setVariant } = useCursorContext()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const sceneY  = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const scrollTo = (id: string) => {
    const lenis  = getLenis()
    const target = document.querySelector(id)
    if (lenis && target) lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.6 })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}
    >
      {/* ── 3D wireframe background ── */}
      <motion.div
        style={{ y: sceneY, position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.5 }}
        aria-hidden="true"
      >
        <HeroScene />
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
      />

      {/* Main content */}
      <motion.div style={{ opacity }} className="relative z-20 container-wide">

        {/* Mono label */}
        <motion.p
          {...FADE}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mono-label mb-6 sm:mb-8"
        >
          Adebusuyi Samuel Ayomide — Full-stack Developer
        </motion.p>

        {/* Headline — three masked lines */}
        <div className="overflow-hidden mb-2 sm:mb-3">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 7vw, 8rem)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}
          >
            I build websites
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-2 sm:mb-3">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 7vw, 8rem)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}
          >
            &amp; web applications
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-10 sm:mb-14">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.51, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 7vw, 8rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--color-accent)' }}
          >
            for businesses.
          </motion.h1>
        </div>

        {/* Description + CTAs */}
        <motion.div
          {...FADE}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-10"
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', color: 'var(--color-text-secondary)', maxWidth: '44ch', lineHeight: 1.8, fontWeight: 300 }}>
            Based in Lagos, Nigeria. I design and develop fast, modern digital
            products — from business landing pages to full-scale web apps with
            custom backends.
          </p>

          <div className="flex items-center gap-5 sm:gap-6 shrink-0">
            <MagneticWrapper strength={0.3}>
              <button
                onClick={() => scrollTo('#contact')}
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
                className="cursor-none group"
              >
                <span
                  className="group-hover:opacity-75 transition-opacity duration-200"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-bg)', backgroundColor: 'var(--color-text-primary)', display: 'block', padding: '0.8rem 1.6rem', borderRadius: '2px' }}
                >
                  Hire me
                </span>
              </button>
            </MagneticWrapper>

            <MagneticWrapper strength={0.25}>
              <button
                onClick={() => scrollTo('#projects')}
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
                className="cursor-none group"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}
              >
                <span className="group-hover:text-[var(--color-text-primary)] transition-colors duration-200">
                  See my work ↓
                </span>
              </button>
            </MagneticWrapper>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}