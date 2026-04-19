import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { siteConfig } from '@/data/constants'

const socials = [
  { key: 'github',   label: 'GitHub'   },
  { key: 'instagram', label: 'Instagram' },
  { key: 'twitter',  label: 'Twitter / X' },
  { key: 'whatsapp',  label: 'Whatsapp' },
]

function SocialRow({ href, label, index, inView }: { href: string; label: string; index: number; inView: boolean }) {
  const { setVariant } = useCursorContext()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
      onMouseEnter={() => { setHovered(true); setVariant('hover') }}
      onMouseLeave={() => { setHovered(false); setVariant('default') }}
      className="flex items-center justify-between py-5 cursor-none"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <span
        className="transition-colors duration-200"
        style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 400, color: hovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
      >
        {label}
      </span>
      <motion.span
        animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ color: hovered ? 'var(--color-accent)' : 'var(--color-text-secondary)', fontSize: '0.85rem' }}
      >
        ↗
      </motion.span>
    </motion.a>
  )
}

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-8% 0px' })
  const { setVariant } = useCursorContext()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socialLinks: { href: string; label: string }[] = [
    { href: siteConfig.github,   label: 'GitHub'     },
    { href: siteConfig.instagram, label: 'Instagram'   },
    { href: siteConfig.twitter,  label: 'Twitter / X' },
    { href: siteConfig.whatsapp,  label: 'Whatsapp' },
  ]

  return (
    <section id="contact" ref={sectionRef} className="section-padding section-bg" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container-wide">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mono-label mb-10"
        >
          Contact
        </motion.p>

        {/* Large heading */}
        <div className="mb-20">
          <RevealText
            as="h2"
            splitBy="words"
            stagger={0.07}
            distance={40}
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2.6rem, 6vw, 5.5rem)',
              fontWeight:    400,
              color:         'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              lineHeight:    1.0,
            } as React.CSSProperties}
          >
            Got a project in mind?
          </RevealText>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">

          {/* Left — email + availability */}
          <div className="flex flex-col gap-10">

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="inline-flex items-center gap-2.5 self-start"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#6EBF8B' }} />
              <span className="mono-label" style={{ color: 'var(--color-text-secondary)' }}>Available for work</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, fontWeight: 300, maxWidth: '40ch' }}
            >
              I'm open to freelance work and interesting collaborations — whether it's a full product build, a landing page, or just a conversation.
            </motion.p>

            {/* Email display */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col gap-2"
            >
              <p className="mono-label mb-2">Email</p>
              <MagneticWrapper strength={0.15}>
                <button
                  onClick={copyEmail}
                  onMouseEnter={() => setVariant('hover')}
                  onMouseLeave={() => setVariant('default')}
                  className="cursor-none group flex items-baseline gap-4"
                >
                  <span
                    className="group-hover:text-[var(--color-accent)] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', fontWeight: 400, color: 'var(--color-text-primary)' }}
                  >
                    {siteConfig.email}
                  </span>
                  <motion.span
                    key={copied ? 'copied' : 'copy'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mono-label"
                    style={{ color: copied ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.span>
                </button>
              </MagneticWrapper>
            </motion.div>
          </div>

          {/* Right — socials + CTA */}
          <div className="flex flex-col gap-10">

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="mono-label mb-2">Find me on</p>
              {/* Opening rule */}
              <div className="hr" />
              {socialLinks.map((s, i) => (
                <SocialRow key={s.label} href={s.href} label={s.label} index={i} inView={inView} />
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <MagneticWrapper strength={0.25}>
                <a
                  href={siteConfig.whatsapp}
                  onMouseEnter={() => setVariant('hover')}
                  onMouseLeave={() => setVariant('default')}
                  className="group cursor-none flex items-center justify-center gap-3 w-full py-5 transition-colors duration-300"
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-secondary)',
                  }}
                  onMouseOver={e => {
                    ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-accent)'
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-primary)'
                  }}
                  onMouseOut={e => {
                    ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border)'
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)'
                  }}
                >
                  Send me a message →
                </a>
              </MagneticWrapper>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}