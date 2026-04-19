import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { getLenis } from '@/hooks/useSmoothScroll'
import { siteConfig } from '@/data/constants'

const services = [
  {
    number: '01',
    title: 'Web Design & Development',
    body: 'Clean, fast, mobile-first websites built to convert visitors into customers. Every pixel is intentional — no templates, no shortcuts.',
    icon: '◈',
  },
  {
    number: '02',
    title: 'Web Application Development',
    body: 'Full-scale apps with custom backends — user authentication, databases, dashboards, APIs. Built to scale as your business grows.',
    icon: '◉',
  },
  {
    number: '03',
    title: 'E-commerce & Integrations',
    body: 'Online stores, payment integrations, booking systems, and third-party API connections. Your business logic, built exactly how you need it.',
    icon: '◎',
  },
]

const proofPoints = [
  { index: '01', value: 'Fast Delivery',        detail: 'Most projects delivered in 1–3 weeks. No waiting months for something that should take days.',                        tag: 'Timeline'   },
  { index: '02', value: 'Full-Stack, Solo',      detail: 'Design, frontend, and backend — all handled by one person. No miscommunication, no handoffs, no excuses.',           tag: 'Capability' },
  { index: '03', value: 'Honest Pricing',        detail: 'Premium-quality work at rates that make sense for growing businesses and early-stage founders.',                      tag: 'Value'      },
  { index: '04', value: 'Always Communicative',  detail: "You stay in the loop at every stage — updates, questions, revisions. You're never left guessing.",                   tag: 'Process'    },
]

const stats = [
  { value: '3+',  label: 'Years building' },
  { value: '20+', label: 'Projects shipped' },
  { value: '100%', label: 'Client satisfaction' },
]

// ─── Portrait ─────────────────────────────────────────────
function Portrait({ inView }: { inView: boolean }) {
  const [imgErr, setImgErr] = useState(false)
  const showImg = !!siteConfig.portrait && !imgErr

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', width: '100%' }}
    >
      {/* Offset accent block behind the image */}
      <motion.div
        initial={{ opacity: 0, x: 12, y: 12 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate(14px, 14px)',
          border: '1px solid var(--color-accent)',
          borderRadius: '4px',
          opacity: 0.25,
          zIndex: 0,
        }}
      />

      {/* Glow ring */}
      <div style={{
        position: 'absolute',
        inset: '-1px',
        borderRadius: '4px',
        background: 'linear-gradient(135deg, rgba(196,168,130,0.35) 0%, transparent 50%, rgba(196,168,130,0.12) 100%)',
        zIndex: 0,
        filter: 'blur(1px)',
      }} />

      {/* Main image container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          borderRadius: '4px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid rgba(196,168,130,0.2)',
          zIndex: 1,
        }}
      >
        {showImg ? (
          <>
            <img
              src={siteConfig.portrait}
              alt="Samuel Ayomide"
              onError={() => setImgErr(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
            {/* Subtle duotone overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(12,12,12,0.55) 0%, transparent 55%)',
            }} />
          </>
        ) : (
          /* Fallback */
          <>
            {/* Fine grid pattern */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(196,168,130,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,168,130,0.04) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />
            {/* Radial vignette */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(196,168,130,0.06) 0%, transparent 70%)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '1rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 8vw, 6rem)',
                fontWeight: 400,
                color: 'var(--color-accent)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                fontStyle: 'italic',
                opacity: 0.9,
              }}>
                SA
              </span>
              <span className="mono-label" style={{ textAlign: 'center', lineHeight: 1.6, maxWidth: '14ch', opacity: 0.3 }}>
                Add portrait to siteConfig
              </span>
            </div>
          </>
        )}

        {/* Corner brackets — all four corners */}
        {/* TL */}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', width: '1.5rem', height: '1.5rem', borderTop: '1.5px solid var(--color-accent)', borderLeft: '1.5px solid var(--color-accent)', opacity: 0.8 }} />
        {/* TR */}
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', width: '1.5rem', height: '1.5rem', borderTop: '1.5px solid var(--color-accent)', borderRight: '1.5px solid var(--color-accent)', opacity: 0.8 }} />
        {/* BL */}
        <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', width: '1.5rem', height: '1.5rem', borderBottom: '1.5px solid var(--color-accent)', borderLeft: '1.5px solid var(--color-accent)', opacity: 0.8 }} />
        {/* BR */}
        <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', width: '1.5rem', height: '1.5rem', borderBottom: '1.5px solid var(--color-accent)', borderRight: '1.5px solid var(--color-accent)', opacity: 0.8 }} />

        {/* Name badge pinned to bottom */}
        <div style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.25rem',
          right: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.95rem',
            fontWeight: 400,
            color: 'rgba(240,237,230,0.85)',
            letterSpacing: '-0.01em',
            fontStyle: 'italic',
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
          }}>
            Samuel Adebusuyi
          </span>
          <span className="mono-label" style={{ color: 'var(--color-accent)', opacity: 0.8 }}>
            Lagos, NG
          </span>
        </div>
      </div>

      {/* Availability badge — floats below */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.6 }}
        style={{
          marginTop: '1rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          padding: '0.4rem 0.85rem',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', backgroundColor: '#6EBF8B', display: 'inline-block', flexShrink: 0 }} />
        <span className="mono-label" style={{ color: 'var(--color-text-secondary)' }}>Open to new projects</span>
      </motion.div>
    </motion.div>
  )
}

// ─── Service card ─────────────────────────────────────────
function ServiceCard({ s, i, inView }: { s: typeof services[number]; i: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      key={s.number}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: '3px',
        padding: 'clamp(1.25rem, 2.5vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: hovered ? 'var(--color-surface)' : 'transparent',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        borderColor: hovered ? 'rgba(196,168,130,0.25)' : 'var(--color-border)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top strip on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, var(--color-accent), transparent)',
          transformOrigin: 'left',
        }}
      />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="mono-label" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>{s.number}</span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          color: hovered ? 'var(--color-accent)' : 'rgba(196,168,130,0.3)',
          transition: 'color 0.3s ease',
          lineHeight: 1,
        }}>{s.icon}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
        fontWeight: 400,
        color: 'var(--color-text-primary)',
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
      }}>
        {s.title}
      </h3>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(0.8125rem, 1vw, 0.9rem)',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.8,
        fontWeight: 300,
      }}>
        {s.body}
      </p>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────
export function About() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const proofRef    = useRef<HTMLDivElement>(null)
  const inView         = useInView(sectionRef,  { once: true, margin: '-8% 0px' })
  const servicesInView = useInView(servicesRef, { once: true, margin: '-8% 0px' })
  const proofInView    = useInView(proofRef,    { once: true, margin: '-8% 0px' })
  const { setVariant } = useCursorContext()

  const scrollToContact = () => {
    const lenis = getLenis()
    const target = document.querySelector('#contact')
    if (lenis && target) lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.6 })
  }

  return (
    <section id="about" ref={sectionRef} className="section-padding section-bg" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container-wide">

        {/* ── Section label ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="mono-label mb-14 sm:mb-20"
        >
          About
        </motion.p>

        {/* ══════════════════════════════════════════════════
            HERO BLOCK — portrait left / bio right at md+
        ══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 md:gap-16 lg:gap-24 mb-24 sm:mb-32">

          {/* Portrait column */}
          <div style={{ maxWidth: '380px' }} className="mx-auto md:mx-0 w-full">
            <Portrait inView={inView} />
          </div>

          {/* Bio column */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'clamp(2rem, 5vw, 3rem)' }}>

            {/* Large heading */}
            <div style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(2rem, 3.8vw, 3.4rem)',
                fontWeight:    400,
                color:         'var(--color-text-primary)',
                letterSpacing: '-0.025em',
                lineHeight:    1.06,
              }}>
              <RevealText as="h2" splitBy="words" stagger={0.07} distance={40}>
                Your business deserves a website that works as hard as you do.
              </RevealText>
            </div>

            {/* Bio paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.9,
                fontWeight: 300,
                maxWidth: '50ch',
                borderLeft: '2px solid var(--color-accent)',
                paddingLeft: '1.25rem',
                opacity: 0.85,
              }}
            >
              A slow, outdated, or non-existent web presence costs you customers every
              day. I build digital products that look credible, load fast, and turn
              visitors into paying clients — handling design, frontend, and backend
              myself so nothing gets lost in translation.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              style={{
                display: 'flex',
                gap: 'clamp(1.5rem, 4vw, 3rem)',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--color-border)',
                paddingTop: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              }}
            >
              {stats.map((stat) => (
                <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    fontWeight: 400,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    fontStyle: 'italic',
                  }}>
                    {stat.value}
                  </span>
                  <span className="mono-label" style={{ color: 'var(--color-text-secondary)', opacity: 0.65 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.58 }}
            >
              <MagneticWrapper strength={0.2}>
                <button
                  onClick={scrollToContact}
                  onMouseEnter={() => setVariant('hover')}
                  onMouseLeave={() => setVariant('default')}
                  className="cursor-none group"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-primary)',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '0.7rem 1.4rem',
                    transition: 'border-color 0.25s, color 0.25s',
                  }}
                  onMouseOver={e => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.borderColor = 'var(--color-accent)'
                    el.style.color = 'var(--color-accent)'
                  }}
                  onMouseOut={e => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.borderColor = 'var(--color-border)'
                    el.style.color = 'var(--color-text-primary)'
                  }}
                >
                  Start a project
                  <span style={{ fontSize: '0.9rem' }}>→</span>
                </button>
              </MagneticWrapper>
            </motion.div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SERVICES — card grid
        ══════════════════════════════════════════════════ */}
        <div ref={servicesRef}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '1.25rem',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={servicesInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mono-label"
            >
              What I do
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              animate={servicesInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mono-label"
              style={{ opacity: 0.35 }}
            >
              3 services
            </motion.span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {services.map((s, i) => (
              <ServiceCard key={s.number} s={s} i={i} inView={servicesInView} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            WHY WORK WITH ME
        ══════════════════════════════════════════════════ */}
        <div ref={proofRef} className="mt-20 sm:mt-28">
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '1.25rem',
            marginBottom: 0,
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={proofInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mono-label"
            >
              Why work with me
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              animate={proofInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mono-label"
              style={{ opacity: 0.35 }}
            >
              4 reasons
            </motion.span>
          </div>

          {proofPoints.map((pt, i) => (
            <motion.div
              key={pt.value}
              initial={{ opacity: 0, y: 24 }}
              animate={proofInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderBottom: '1px solid var(--color-border)',
                padding: 'clamp(1.25rem, 2.5vw, 2rem) 0',
                display: 'grid',
                gridTemplateColumns: 'clamp(1.75rem, 3.5vw, 2.75rem) 1fr auto',
                alignItems: 'start',
                gap: 'clamp(0.75rem, 2.5vw, 2.5rem)',
              }}
            >
              <span className="mono-label" style={{ paddingTop: '0.4rem', color: 'var(--color-accent)', opacity: 0.7 }}>
                {pt.index}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 0 }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.15rem, 2.2vw, 2rem)',
                  fontWeight: 400,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  fontStyle: 'italic',
                }}>
                  {pt.value}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.8125rem, 1vw, 0.9375rem)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}>
                  {pt.detail}
                </p>
              </div>
              <span
                className="mono-label hidden sm:inline-block"
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  padding: '0.28rem 0.6rem',
                  color: 'var(--color-text-secondary)',
                  whiteSpace: 'nowrap',
                  marginTop: '0.25rem',
                  flexShrink: 0,
                }}
              >
                {pt.tag}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════
            MARQUEE
        ══════════════════════════════════════════════════ */}
        <div
          className="mt-20 sm:mt-28 -mx-5 sm:-mx-8 md:-mx-12 lg:-mx-16 overflow-hidden"
          style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '0.875rem 0' }}
        >
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(2)].map((_, di) =>
              ['React', '—', 'Next.js', '—', 'Django', '—', 'TypeScript', '—', 'Three.js', '—',
               'REST APIs', '—', 'Tailwind CSS', '—', 'Python', '—', 'UI / UX', '—'].map((item, i) => (
                <span
                  key={`${di}-${i}`}
                  className="mono-label shrink-0"
                  style={{ color: item === '—' ? 'var(--color-accent)' : 'var(--color-text-secondary)', opacity: item === '—' ? 0.5 : 1 }}
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