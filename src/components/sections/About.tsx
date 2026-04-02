import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { getLenis } from '@/hooks/useSmoothScroll'
import { useScrollProgress, useScrollParallax } from '@/hooks/useScrollProgress'

// ─── Stats data ───────────────────────────────────────────
const stats = [
  { value: '3+',   label: 'Years building' },
  { value: '10+',  label: 'Projects shipped' },
  { value: '100%', label: 'Self-taught' },
  { value: '∞',    label: 'Curiosity' },
]

// ─── Marquee ticker ───────────────────────────────────────
const marqueeItems = [
  'React', '·', 'Django', '·', 'TypeScript', '·',
  'Three.js', '·', 'REST APIs', '·', 'Tailwind', '·',
  'Python', '·', 'Framer Motion', '·', 'React Native', '·',
]

function Marquee() {
  // Double the items so the loop is seamless
  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{ borderColor: 'rgba(214,204,208,0.08)' }}
    >
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration:   18,
          repeat:     Infinity,
          ease:       'linear',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-sans text-sm tracking-[0.12em] uppercase shrink-0"
            style={{
              color: item === '·'
                ? '#763948'
                : 'rgba(214,204,208,0.4)',
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Stat card ────────────────────────────────────────────
interface StatCardProps {
  value: string
  label: string
  index: number
  inView: boolean
}

function StatCard({ value, label, index, inView }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay:    0.1 + index * 0.08,
        ease:     [0.16, 1, 0.3, 1],
      }}
      className="p-6 rounded-2xl border flex flex-col gap-1"
      style={{
        backgroundColor: 'rgba(214,204,208,0.03)',
        borderColor:     'rgba(214,204,208,0.07)',
      }}
    >
      <span
        className="font-display text-4xl leading-none"
        style={{ color: '#763948' }}
      >
        {value}
      </span>
      <span
        className="font-sans text-xs tracking-[0.1em] uppercase"
        style={{ color: 'rgba(214,204,208,0.45)' }}
      >
        {label}
      </span>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────
export function About() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const inView      = useInView(sectionRef, { once: true, margin: '-15% 0px' })
  const { setVariant } = useCursorContext()

  const { ref: parallaxRef, scrollYProgress } = useScrollProgress()
  const { y: imgY } = useScrollParallax(scrollYProgress, 60)

  const scrollToContact = () => {
    const lenis = getLenis()
    const target = document.querySelector('#contact')
    if (lenis && target) {
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.6 })
    }
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding"
      style={{ backgroundColor: '#0D0A0B' }}
    >
      <div className="container-wide">

        {/* ── Section label ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="w-8 h-px" style={{ backgroundColor: '#763948' }} />
          <span
            className="font-sans text-xs tracking-[0.2em] uppercase"
            style={{ color: 'rgba(214,204,208,0.45)' }}
          >
            About
          </span>
        </motion.div>

        {/* ── Main grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — text */}
          <div className="flex flex-col gap-8">
            <RevealText
              as="h2"
              splitBy="words"
              delay={0.05}
              stagger={0.07}
              distance={50}
              className="leading-[1.05]"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize:   'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 300,
                color:      '#D6CCD0',
              } as React.CSSProperties}
            >
              Coded my first site on a phone. Haven't stopped since.
            </RevealText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5"
              style={{
                color:      'rgba(214,204,208,0.6)',
                fontFamily: '"Cabinet Grotesk", "DM Sans", sans-serif',
                fontSize:   '1.0rem',
                lineHeight: 1.8,
              }}
            >
              <p>
                I'm Samuel — a 17-year-old full-stack developer from Lagos, Nigeria.
                I started learning to code without a laptop, building projects on a
                phone screen until I saved up for one. That stubbornness is still
                the engine behind everything I build.
              </p>
              <p>
                I work across the full stack — React and TypeScript on the front,
                Django and REST on the back. Right now I'm deepening my work in{' '}
                <span style={{ color: '#D6CCD0' }}>3D web experiences</span> and{' '}
                <span style={{ color: '#D6CCD0' }}>mobile development</span>, and
                building SafeSwap — an escrow platform solving real trust problems
                in Nigerian informal markets.
              </p>
              <p>
                When I'm not coding I'm gaming, editing video, or studying how
                the best products in the world are designed.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticWrapper strength={0.3}>
                <button
                  onClick={scrollToContact}
                  onMouseEnter={() => setVariant('hover')}
                  onMouseLeave={() => setVariant('default')}
                  className="group flex items-center gap-3 font-sans text-sm tracking-wide"
                  style={{ color: '#D6CCD0' }}
                >
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                      Let's work together
                    </span>
                    <span
                      className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                      style={{ color: '#763948' }}
                    >
                      Let's work together
                    </span>
                  </span>
                  {/* Animated arrow */}
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    style={{ stroke: 'currentColor' }}
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </MagneticWrapper>
            </motion.div>
          </div>

          {/* Right — stats + image placeholder + marquee */}
          <div
            ref={parallaxRef as React.RefObject<HTMLDivElement>}
            className="flex flex-col gap-8"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  {...stat}
                  index={i}
                  inView={inView}
                />
              ))}
            </div>

            {/* Portrait placeholder — swap with real photo */}
            <motion.div
              style={{ y: imgY }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(214,204,208,0.04)',
                border:          '1px solid rgba(214,204,208,0.07)',
              } as React.CSSProperties}
            >
              {/* Placeholder grid pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(214,204,208,0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(214,204,208,0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span
                  className="font-sans text-xs tracking-[0.15em] uppercase"
                  style={{ color: 'rgba(214,204,208,0.25)' }}
                >
                  Photo coming soon
                </span>
                <span style={{ color: 'rgba(118,57,72,0.5)', fontSize: '2rem' }}>
                  SA
                </span>
              </div>
              {/* Wine corner accent */}
              <div
                className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-3xl"
                style={{ backgroundColor: 'rgba(118,57,72,0.15)' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Marquee ticker ─────────────────────────── */}
      <div className="mt-24">
        <Marquee />
      </div>
    </section>
  )
}