import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { HeroScene } from '@/components/three/Scene'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { getLenis } from '@/hooks/useSmoothScroll'
import { siteConfig } from '@/data/constants'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { setVariant } = useCursorContext()

  // Scroll-driven parallax on the 3D scene and text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const sceneY    = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY     = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity   = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const scrollToWork = () => {
    const lenis = getLenis()
    const target = document.querySelector('#projects')
    if (lenis && target) {
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.6 })
    }
  }

  const scrollToContact = () => {
    const lenis = getLenis()
    const target = document.querySelector('#contact')
    if (lenis && target) {
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.6 })
    }
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: '#0D0A0B' }}
    >
      {/* ── 3D Scene ──────────────────────────────────── */}
      <motion.div
        style={{ y: sceneY }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <HeroScene />
      </motion.div>

      {/* ── Radial vignette overlay ────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 70% 50%, transparent 30%, #0D0A0B 100%)',
        }}
      />

      {/* ── Content ───────────────────────────────────── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 section-padding container-wide"
      >
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="w-8 h-px"
              style={{ backgroundColor: '#763948' }}
            />
            <span
              className="font-sans text-xs tracking-[0.2em] uppercase"
              style={{ color: 'rgba(214,204,208,0.55)' }}
            >
              Full-Stack Developer · {siteConfig.location}
            </span>
          </motion.div>

          {/* Main heading */}
          <RevealText
            as="h1"
            splitBy="words"
            delay={0.35}
            stagger={0.09}
            distance={60}
            className="leading-[0.92] tracking-tight mb-6"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize:   'clamp(3.8rem, 9vw, 8.5rem)',
              fontWeight: 300,
              color:      '#D6CCD0',
            } as React.CSSProperties}
          >
            Building digital experiences
          </RevealText>

          {/* Secondary line — italic accent */}
          <RevealText
            as="h2"
            splitBy="words"
            delay={0.55}
            stagger={0.07}
            distance={40}
            className="leading-[0.92] tracking-tight mb-10"
            style={{
              fontFamily:  '"Cormorant Garamond", Georgia, serif',
              fontSize:    'clamp(3.8rem, 9vw, 8.5rem)',
              fontWeight:  300,
              fontStyle:   'italic',
              color:       '#763948',
            } as React.CSSProperties}
          >
            that feel alive.
          </RevealText>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base md:text-lg leading-relaxed mb-12 max-w-lg"
            style={{ color: 'rgba(214,204,208,0.55)' }}
          >
            Self-taught developer from Nigeria. I build fast, purposeful
            products — from solo projects like{' '}
            <span style={{ color: '#D6CCD0' }}>SafeSwap</span> to freelance
            sites that actually convert.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA */}
            <MagneticWrapper strength={0.35}>
              <button
                onClick={scrollToWork}
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
                className="relative group px-8 py-4 rounded-full font-sans text-sm font-medium tracking-wide overflow-hidden transition-all duration-300"
                style={{ backgroundColor: '#763948', color: '#D6CCD0' }}
              >
                <span
                  className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full"
                  style={{ backgroundColor: '#5E2D3A' }}
                  aria-hidden="true"
                />
                <span className="relative z-10">View my work</span>
              </button>
            </MagneticWrapper>

            {/* Secondary CTA */}
            <MagneticWrapper strength={0.3}>
              <button
                onClick={scrollToContact}
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
                className="relative group px-8 py-4 rounded-full font-sans text-sm font-medium tracking-wide overflow-hidden transition-all duration-300"
                style={{
                  border: '1px solid rgba(214,204,208,0.2)',
                  color:  'rgba(214,204,208,0.7)',
                }}
              >
                <span
                  className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full"
                  style={{ backgroundColor: 'rgba(214,204,208,0.07)' }}
                  aria-hidden="true"
                />
                <span className="relative z-10 group-hover:text-[#D6CCD0] transition-colors duration-300">
                  Get in touch
                </span>
              </button>
            </MagneticWrapper>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span
          className="font-sans text-[10px] tracking-[0.25em] uppercase"
          style={{ color: 'rgba(214,204,208,0.35)' }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12 overflow-hidden"
          style={{ backgroundColor: 'rgba(214,204,208,0.1)' }}
        >
          <motion.div
            className="w-full h-1/2"
            style={{ backgroundColor: '#763948' }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{
              duration:   1.4,
              repeat:     Infinity,
              ease:       'easeInOut',
            }}
          />
        </div>
      </motion.div>

      {/* ── Bottom fade to next section ───────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0D0A0B)',
        }}
      />
    </section>
  )
}