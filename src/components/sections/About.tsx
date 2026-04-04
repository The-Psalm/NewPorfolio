import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { getLenis } from '@/hooks/useSmoothScroll'

// ─── What I offer cards ───────────────────────────────────
const services = [
  {
    number: '01',
    title:  'Web Design & Development',
    body:   'Clean, fast, mobile-first websites built to convert visitors into customers. Every pixel is intentional — no templates, no shortcuts.',
  },
  {
    number: '02',
    title:  'Web Application Development',
    body:   'Full-scale apps with custom backends — user authentication, databases, dashboards, APIs. Built to scale as your business grows.',
  },
  {
    number: '03',
    title:  'E-commerce & Integrations',
    body:   'Online stores, payment integrations, booking systems, and third-party API connections. Your business logic, built exactly how you need it.',
  }, 
  
]

// ─── Why hire me — concise proof points ──────────────────
const proofPoints = [
  {
    value: 'Fast',
    detail: 'Most projects delivered in 1–3 weeks, not months.',
  },
  {
    value: 'Full-stack',
    detail: 'One person handles design, frontend, and backend. No handoff delays.',
  },
  {
    value: 'Affordable',
    detail: 'Quality work at rates that make sense for growing businesses.',
  },
  {
    value: 'Communicative',
    detail: 'You stay in the loop at every stage. No disappearing acts.',
  },
]

// ─── Service card ─────────────────────────────────────────
function ServiceCard({
  service,
  index,
  inView,
}: {
  service: typeof services[0]
  index:   number
  inView:  boolean
}) {
  const { setVariant } = useCursorContext()
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); setVariant('hover') }}
      onMouseLeave={() => { setHovered(false); setVariant('default') }}
      className="group relative p-7 rounded-2xl border transition-all duration-400 cursor-none"
      style={{
        backgroundColor: hovered ? 'rgba(118,57,72,0.05)' : 'rgba(214,204,208,0.02)',
        borderColor:     'rgba(214,204,208,0.07)',
      }}
    >
      {/* Hover fill */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ backgroundColor: 'rgba(118,57,72,0.05)', border: '1px solid rgba(118,57,72,0.2)' }}
      />

      <div className="relative z-10">
        {/* Number */}
        <span
          className="font-display block mb-4 leading-none"
          style={{ fontSize: '2.2rem', color: 'rgba(118,57,72,0.35)', fontWeight: 300 }}
        >
          {service.number}
        </span>

        {/* Title */}
        <h3
          className="font-display mb-3 leading-snug"
          style={{ fontSize: '1.45rem', fontWeight: 400, color: '#D6CCD0' }}
        >
          {service.title}
        </h3>

        {/* Body */}
        <p
          className="font-sans text-sm leading-relaxed"
          style={{ color: 'rgba(214,204,208,0.5)' }}
        >
          {service.body}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────
export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const proofRef   = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-10% 0px' })
  const proofInView = useInView(proofRef,  { once: true, margin: '-10% 0px' })
  const { setVariant } = useCursorContext()

  const scrollToContact = () => {
    const lenis  = getLenis()
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
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ backgroundColor: 'rgba(214,204,208,0.06)' }}
      />

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
            What I do
          </span>
        </motion.div>

        {/* ── Header + hook ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <RevealText
              as="h2"
              splitBy="words"
              delay={0.05}
              stagger={0.07}
              distance={50}
              className="leading-[1.05]"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize:   'clamp(2.4rem, 5vw, 4.2rem)',
                fontWeight: 300,
                color:      '#D6CCD0',
              } as React.CSSProperties}
            >
              Your business deserves a website that works as hard as you do.
            </RevealText>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <p
              className="font-sans leading-relaxed"
              style={{
                fontSize: '1rem',
                color:    'rgba(214,204,208,0.55)',
                maxWidth: '44ch',
              }}
            >
              A slow, outdated, or non-existent web presence is costing you
              customers every day. I build digital products that look
              credible, load fast, and turn visitors into paying clients.
            </p>

            {/* CTA inline */}
            <MagneticWrapper strength={0.25}>
              <button
                onClick={scrollToContact}
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
                className="group inline-flex items-center gap-3 font-sans text-sm tracking-wide cursor-none self-start"
                style={{ color: '#D6CCD0' }}
              >
                {/* Text swap on hover */}
                <span className="relative overflow-hidden h-5">
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    Start a project
                  </span>
                  <span
                    className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                    style={{ color: '#763948' }}
                  >
                    Start a project
                  </span>
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </MagneticWrapper>
          </motion.div>
        </div>

        {/* ── Services grid ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Why hire me ───────────────────────────── */}
        <div ref={proofRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={proofInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-10"
          >
            <span
              className="font-sans text-xs tracking-[0.2em] uppercase"
              style={{ color: 'rgba(214,204,208,0.35)' }}
            >
              Why work with me
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: 'rgba(214,204,208,0.06)' }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {proofPoints.map((point, i) => (
              <motion.div
                key={point.value}
                initial={{ opacity: 0, y: 24 }}
                animate={proofInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay:    i * 0.09,
                  ease:     [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col gap-2 py-6 border-t"
                style={{ borderColor: 'rgba(214,204,208,0.08)' }}
              >
                <span
                  className="font-display"
                  style={{ fontSize: '1.7rem', color: '#763948', fontWeight: 400 }}
                >
                  {point.value}
                </span>
                <span
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: 'rgba(214,204,208,0.45)' }}
                >
                  {point.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Marquee ───────────────────────────────── */}
        <div className="mt-24 -mx-6 md:-mx-12 overflow-hidden border-y py-4"
          style={{ borderColor: 'rgba(214,204,208,0.07)' }}
        >
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(2)].map((_, di) =>
              ['React', '·', 'Django', '·', 'TypeScript', '·', 'Three.js', '·',
               'REST APIs', '·', 'Tailwind CSS', '·', 'Python', '·', 'UI / UX', '·'].map((item, i) => (
                <span
                  key={`${di}-${i}`}
                  className="font-sans text-sm tracking-[0.1em] uppercase shrink-0"
                  style={{
                    color: item === '·' ? '#763948' : 'rgba(214,204,208,0.35)',
                  }}
                >
                  {item}
                </span>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}