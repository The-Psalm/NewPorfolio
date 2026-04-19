import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCursorContext } from '@/components/cursor/CustomCursor'

const testimonials = [
  {
    quote:
      'Samuel delivered a production-ready web app in under two weeks. The code is clean, the UI is polished, and he communicated at every step. Genuinely one of the best developers I\'ve worked with.',
    name: 'Adaeze Okonkwo',
    role: 'Founder, Lura Health',
    index: '01',
  },
  {
    quote:
      'We hired Samuel to rebuild our e-commerce storefront and the results exceeded our expectations. Conversion rate went up 34% in the first month. He just gets it.',
    name: 'Marcus Reid',
    role: 'Head of Digital, Shelf & Co.',
    index: '02',
  },
  {
    quote:
      'What I appreciated most was the honesty. No jargon, no upselling — just straight answers and excellent execution. Our new booking system has saved us hours every week.',
    name: 'Funmi Adesanya',
    role: 'Owner, Adesanya Legal',
    index: '03',
  },
]

// ─── Large quote mark SVG ──────────────────────────────────
function QuoteMark() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, opacity: 0.6 }}
    >
      <path
        d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0L16 3.2C11.2 4.267 8.533 7.2 8 12H14.4V24H0ZM17.6 24V14.4C17.6 6.4 22.4 1.6 32 0L33.6 3.2C28.8 4.267 26.133 7.2 25.6 12H32V24H17.6Z"
        fill="var(--color-accent)"
      />
    </svg>
  )
}

// ─── Single testimonial card ───────────────────────────────
function TestimonialCard({
  testimonial,
  index,
  inView,
}: {
  testimonial: (typeof testimonials)[number]
  index: number
  inView: boolean
}) {
  const { setVariant } = useCursorContext()

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => setVariant('default')}
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: '3px',
        padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        backgroundColor: 'var(--color-surface)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        transition: 'border-color 0.3s ease',
      }}
      whileHover={{ borderColor: 'rgba(196,168,130,0.3)' }}
    >
      {/* Subtle accent stripe at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, var(--color-accent) 0%, transparent 100%)`,
          opacity: 0.5,
        }}
      />

      {/* Header: quote mark + index */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <QuoteMark />
        <span
          className="mono-label"
          style={{ color: 'var(--color-accent)', opacity: 0.45 }}
        >
          {testimonial.index}
        </span>
      </div>

      {/* Quote text */}
      <blockquote
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 1.35vw, 1.175rem)',
          fontWeight: 400,
          color: 'var(--color-text-primary)',
          lineHeight: 1.75,
          letterSpacing: '-0.01em',
          fontStyle: 'italic',
          margin: 0,
          flex: 1,
        }}
      >
        "{testimonial.quote}"
      </blockquote>

      {/* Attribution */}
      <footer style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          {testimonial.name}
        </span>
        <span
          className="mono-label"
          style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
        >
          {testimonial.role}
        </span>
      </footer>
    </motion.article>
  )
}

// ─── Section ──────────────────────────────────────────────
export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-8% 0px' })

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding section-bg"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container-wide">

        {/* ── Header row ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mono-label"
            >
              Testimonials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                maxWidth: '18ch',
                margin: 0,
              }}
            >
              Clients who trusted the work.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
              fontWeight: 300,
              maxWidth: '38ch',
              margin: 0,
            }}
          >
            Real feedback from founders and teams I've had the pleasure of building for.
          </motion.p>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.index} testimonial={t} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Closing note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mono-label"
          style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', opacity: 0.4 }}
        >
          More available on request
        </motion.p>

      </div>
    </section>
  )
}
