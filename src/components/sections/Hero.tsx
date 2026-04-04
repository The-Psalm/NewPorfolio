import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { HeroScene } from '@/components/three/Scene'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { getLenis } from '@/hooks/useSmoothScroll'

export function Hero() {
  const containerRef   = useRef<HTMLElement>(null)
  const { setVariant } = useCursorContext()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const sceneY  = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const scrollTo = (id: string) => {
    const lenis  = getLenis()
    const target = document.querySelector(id)
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
      {/* ── 3D scene ─────────────────────────────────── */}
      <motion.div
        style={{ y: sceneY }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <HeroScene />
      </motion.div>

      {/* ── Vignette ──────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 80% at 72% 50%, transparent 20%, #0D0A0B 85%)',
          willChange: 'opacity, transform, filter',
        }}
        animate={{
          opacity: [0.72, 0.86, 0.72],
          scale: [1, 1.02, 1],
          filter: ['saturate(1)', 'saturate(1.06)', 'saturate(1)'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* ── Content ───────────────────────────────────── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 container-wide"
      >
        <div className="max-w-[720px]">

          {/* ── Name + availability ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6 sm:mb-7 flex-wrap"
          >
            <span
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-sans font-bold text-[10px] tracking-wider shrink-0"
              style={{ backgroundColor: '#763948', color: '#D6CCD0' }}
            >
              SA
            </span>
            <span
              className="font-sans text-sm tracking-[0.14em]"
              style={{ color: 'rgba(214,204,208,0.55)' }}
            >
              Adebusuyi Samuel Ayomide
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: '#a3e635' }}
              />
              <span
                className="font-sans text-xs tracking-wide"
                style={{ color: 'rgba(163,230,53,0.7)' }}
              >
                Available for hire
              </span>
            </span>
          </motion.div>

          {/* ── Headline — three lines, last italic wine ── */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily:    '"Cormorant Garamond", Georgia, serif',
                fontSize:      'clamp(2.8rem, 7.2vw, 6.8rem)',
                fontWeight:    300,
                lineHeight:    0.93,
                color:         '#D6CCD0',
                letterSpacing: '-0.02em',
              }}
            >
              I build websites
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily:    '"Cormorant Garamond", Georgia, serif',
                fontSize:      'clamp(2.8rem, 7.2vw, 6.8rem)',
                fontWeight:    300,
                lineHeight:    0.93,
                color:         '#D6CCD0',
                letterSpacing: '-0.02em',
              }}
            >
              & web applications
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily:    '"Cormorant Garamond", Georgia, serif',
                fontSize:      'clamp(2.8rem, 7.2vw, 6.8rem)',
                fontWeight:    300,
                fontStyle:     'italic',
                lineHeight:    0.93,
                color:         '#763948',
                letterSpacing: '-0.02em',
              }}
            >
              for businesses.
            </motion.h1>
          </div>

          {/* ── Value prop ───────────────────────────── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans leading-relaxed mb-5"
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              color:    'rgba(214,204,208,0.6)',
              maxWidth: '52ch',
              lineHeight: 1.85,
            }}
          >
            Full-stack developer based in{' '}
            <span style={{ color: '#D6CCD0' }}>Lagos, Nigeria</span>.
            I design and develop fast, modern digital products — from
            business landing pages and e-commerce stores to full-scale
            web apps with custom backends.
          </motion.p>

          {/* ── Service chips ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2 mb-10 sm:mb-12"
          >
            {['Landing Pages', 'Web Apps', 'E-commerce', 'API & Backend', 'UI / UX'].map(
              (service) => (
                <span
                  key={service}
                  className="font-sans text-xs px-3 py-1.5 rounded-full tracking-[0.1em]"
                  style={{
                    backgroundColor: 'rgba(118,57,72,0.12)',
                    color:           'rgba(214,204,208,0.6)',
                    border:          '1px solid rgba(118,57,72,0.22)',
                  }}
                >
                  {service}
                </span>
              )
            )}
          </motion.div>

          {/* ── CTAs ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticWrapper strength={0.35}>
              <button
                onClick={() => scrollTo('#contact')}
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
                className="relative group px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-sans text-sm font-medium tracking-wide overflow-hidden cursor-none"
                style={{ backgroundColor: '#763948', color: '#D6CCD0' }}
              >
                <span
                  className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full"
                  style={{ backgroundColor: '#5E2D3A' }}
                  aria-hidden="true"
                />
                <span className="relative z-10">Hire me</span>
              </button>
            </MagneticWrapper>

            <MagneticWrapper strength={0.3}>
              <button
                onClick={() => scrollTo('#projects')}
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
                className="relative group px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-sans text-sm font-medium tracking-wide overflow-hidden cursor-none transition-colors duration-300"
                style={{
                  border: '1px solid rgba(214,204,208,0.18)',
                  color:  'rgba(214,204,208,0.65)',
                }}
              >
                <span
                  className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full"
                  style={{ backgroundColor: 'rgba(214,204,208,0.06)' }}
                  aria-hidden="true"
                />
                <span className="relative z-10 group-hover:text-[#D6CCD0] transition-colors duration-300">
                  See my work
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
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span
          className="font-sans text-[10px] tracking-[0.25em] uppercase"
          style={{ color: 'rgba(214,204,208,0.3)' }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10 overflow-hidden"
          style={{ backgroundColor: 'rgba(214,204,208,0.08)' }}
        >
          <motion.div
            className="w-full h-1/2"
            style={{ backgroundColor: '#763948' }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* ── Bottom fade ───────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0D0A0B)' }}
      />
    </section>
  )
}