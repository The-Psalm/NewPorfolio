import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { siteConfig } from '@/data/constants'

// ─── Social link row ──────────────────────────────────────
function SocialLink({
  href,
  label,
  index,
  inView,
}: {
  href:   string
  label:  string
  index:  number
  inView: boolean
}) {
  const { setVariant } = useCursorContext()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); setVariant('hover') }}
      onMouseLeave={() => { setHovered(false); setVariant('default') }}
      className="group flex items-center justify-between py-4 border-b cursor-none"
      style={{ borderColor: 'rgba(214,204,208,0.07)' }}
    >
      <span
        className="font-sans text-sm tracking-wide transition-colors duration-200"
        style={{ color: hovered ? '#D6CCD0' : 'rgba(214,204,208,0.45)' }}
      >
        {label}
      </span>
      <motion.svg
        width="16" height="16" viewBox="0 0 16 16" fill="none"
        animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <path
          d="M3 13L13 3M13 3H6M13 3v7"
          stroke={hovered ? '#763948' : 'rgba(214,204,208,0.25)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.a>
  )
}

// ─── Main component ───────────────────────────────────────
export function Contact() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const inView      = useInView(sectionRef, { once: true, margin: '-10% 0px' })
  const { setVariant } = useCursorContext()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socials = [
    { href: siteConfig.github,   label: 'GitHub'   },
    { href: siteConfig.linkedin, label: 'LinkedIn' },
    { href: siteConfig.twitter,  label: 'Twitter'  },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ backgroundColor: '#0D0A0B' }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ backgroundColor: 'rgba(214,204,208,0.06)' }}
      />

      {/* Background large text watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display italic whitespace-nowrap"
          style={{
            fontSize:   'clamp(8rem, 20vw, 18rem)',
            fontWeight: 300,
            color:      'rgba(118,57,72,0.04)',
            lineHeight: 1,
          }}
        >
          Let's talk
        </span>
      </div>

      <div className="container-wide relative z-10">

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
            Contact
          </span>
        </motion.div>

        {/* ── Main grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — heading + availability */}
          <div className="flex flex-col gap-10">
            <RevealText
              as="h2"
              splitBy="words"
              delay={0.1}
              stagger={0.08}
              distance={55}
              className="leading-[1.0]"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize:   'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 300,
                color:      '#D6CCD0',
              } as React.CSSProperties}
            >
              Got a project in mind?
            </RevealText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-base leading-relaxed"
              style={{ color: 'rgba(214,204,208,0.55)', maxWidth: '38ch' }}
            >
              I'm currently available for freelance work and open to
              interesting collaborations. Whether it's a full product build,
              a landing page, or just a conversation — reach out.
            </motion.p>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full self-start"
              style={{
                backgroundColor: 'rgba(118,57,72,0.1)',
                border:          '1px solid rgba(118,57,72,0.25)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#a3e635' }}
              />
              <span
                className="font-sans text-sm tracking-wide"
                style={{ color: 'rgba(214,204,208,0.7)' }}
              >
                Available for work
              </span>
            </motion.div>

            {/* Email CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <span
                className="font-sans text-xs tracking-[0.15em] uppercase"
                style={{ color: 'rgba(214,204,208,0.3)' }}
              >
                Or drop a mail
              </span>

              <MagneticWrapper strength={0.2}>
                <button
                  onClick={copyEmail}
                  onMouseEnter={() => setVariant('hover')}
                  onMouseLeave={() => setVariant('default')}
                  className="group flex items-center gap-4 cursor-none"
                >
                  <span
                    className="font-display transition-colors duration-300"
                    style={{
                      fontSize:   'clamp(1.1rem, 2.5vw, 1.6rem)',
                      fontWeight: 300,
                      color:      '#D6CCD0',
                    }}
                  >
                    {siteConfig.email}
                  </span>
                  {/* Copy icon / confirmation */}
                  <motion.span
                    key={copied ? 'check' : 'copy'}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-sans text-xs tracking-wide px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: copied
                        ? 'rgba(163,230,53,0.15)'
                        : 'rgba(118,57,72,0.15)',
                      color: copied
                        ? '#a3e635'
                        : 'rgba(214,204,208,0.45)',
                      border: `1px solid ${copied ? 'rgba(163,230,53,0.3)' : 'rgba(118,57,72,0.25)'}`,
                    }}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.span>
                </button>
              </MagneticWrapper>
            </motion.div>
          </div>

          {/* Right — social links + form nudge */}
          <div className="flex flex-col gap-10">

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span
                className="font-sans text-xs tracking-[0.15em] uppercase block mb-2"
                style={{ color: 'rgba(214,204,208,0.3)' }}
              >
                Find me on
              </span>
              {socials.map((social, i) => (
                <SocialLink
                  key={social.label}
                  {...social}
                  index={i}
                  inView={inView}
                />
              ))}
            </motion.div>

            {/* Big CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticWrapper strength={0.3}>
                <a
                  href={`mailto:${siteConfig.email}`}
                  onMouseEnter={() => setVariant('hover')}
                  onMouseLeave={() => setVariant('default')}
                  className="group relative flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-sans text-sm font-medium tracking-widest uppercase overflow-hidden cursor-none transition-all duration-500"
                  style={{
                    border:          '1px solid rgba(118,57,72,0.4)',
                    color:           '#D6CCD0',
                    backgroundColor: 'rgba(118,57,72,0.05)',
                  }}
                >
                  {/* Hover fill */}
                  <span
                    className="absolute inset-0 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 rounded-2xl"
                    style={{ backgroundColor: '#763948' }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    Send me a message
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
                  </span>
                </a>
              </MagneticWrapper>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}