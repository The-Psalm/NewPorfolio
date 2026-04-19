import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { projects, featuredProjects } from '@/data/projects'
import type { Project } from '@/types'

const otherProjects = projects.filter(p => !p.featured)

// ─── Featured card — horizontal tile with 3D tilt ─────────
function FeaturedCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { setVariant } = useCursorContext()
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false); setVariant('default') }

  const showImage = !!project.image && !imgError

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { setHovered(true); setVariant('drag') }}
        onMouseLeave={handleMouseLeave}
        className="group cursor-none overflow-hidden"
        // thin bottom rule on hover becomes accent-coloured
      >
        {/* Image / placeholder */}
        <div
          className="relative w-full overflow-hidden mb-6"
          style={{ aspectRatio: '16/9', backgroundColor: 'var(--color-surface)' }}
        >
          {showImage ? (
            <>
              <img
                src={project.image}
                alt={`${project.title} preview`}
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700"
                style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,12,12,0.5) 0%, transparent 60%)' }} />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center select-none">
              {/* Subtle grid */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }} />
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 10vw, 8rem)',
                fontWeight: 400, color: 'var(--color-border)', lineHeight: 1,
              }}>
                0{index + 1}
              </span>
            </div>
          )}

          {/* Hover action overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center gap-3"
            style={{ backgroundColor: 'rgba(12,12,12,0.65)', backdropFilter: 'blur(4px)' }}
          >
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-bg)', backgroundColor: 'var(--color-text-primary)', padding: '0.6rem 1.25rem', borderRadius: '2px' }}>
                Live site ↗
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-primary)', border: '1px solid rgba(240,237,230,0.25)', padding: '0.6rem 1.25rem', borderRadius: '2px' }}>
                GitHub ↗
              </a>
            )}
          </motion.div>
        </div>

        {/* Meta */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 400, color: 'var(--color-text-primary)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            {project.title}
          </h3>
          <span className="mono-label shrink-0 pt-1">{project.year}</span>
        </div>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, fontWeight: 300, marginBottom: '1rem' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="mono-label px-2 py-0.5"
              style={{ border: '1px solid var(--color-border)', borderRadius: '2px', color: 'var(--color-text-secondary)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Hover indicator */}
        <div className="mt-6 h-px transition-colors duration-300"
          style={{ backgroundColor: hovered ? 'var(--color-accent)' : 'var(--color-border)' }} />
      </motion.div>
    </motion.div>
  )
}

// ─── Small card ───────────────────────────────────────────
function SmallCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const { setVariant } = useCursorContext()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 + index * 0.08 }}
      onMouseEnter={() => { setHovered(true); setVariant('hover') }}
      onMouseLeave={() => { setHovered(false); setVariant('default') }}
      className="cursor-none py-6 flex flex-col gap-3"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 400, color: 'var(--color-text-primary)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <span className="mono-label shrink-0 pt-0.5">{project.year}</span>
      </div>

      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-1">
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} className="mono-label px-2 py-0.5"
            style={{ border: '1px solid var(--color-border)', borderRadius: '2px' }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Accent underline on hover */}
      <div className="h-px transition-colors duration-300 mt-2"
        style={{ backgroundColor: hovered ? 'var(--color-accent)' : 'transparent' }} />
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────
export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-8% 0px' })
  const moreInView = useInView(moreRef, { once: true, margin: '-8% 0px' })

  return (
    <section id="projects" ref={sectionRef} className="section-padding section-bg" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container-wide">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16 lg:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mono-label mb-8"
            >
              Selected work
            </motion.p>

            <RevealText
              as="h2"
              splitBy="words"
              stagger={0.07}
              distance={40}
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight:    400,
                color:         'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                lineHeight:    1.05,
              } as React.CSSProperties}
            >
              Things I've built
            </RevealText>
          </div>

          {/* Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="shrink-0"
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 400, color: 'var(--color-text-secondary)', lineHeight: 1 }}>
              {String(projects.length).padStart(2, '0')}
            </span>
            <p className="mono-label mt-1">Projects total</p>
          </motion.div>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 mb-14 md:mb-16 lg:mb-20">
          {featuredProjects.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>

        {/* More projects */}
        {otherProjects.length > 0 && (
          <div ref={moreRef}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={moreInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mono-label mb-4"
            >
              More work
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10">
              {otherProjects.map((p, i) => (
                <SmallCard key={p.id} project={p} index={i} inView={moreInView} />
              ))}
              {/* Closing rule */}
              {otherProjects.map(p => (
                <div key={`rule-${p.id}`} className="hidden" />
              ))}
            </div>
            <div className="hr mt-0" />
          </div>
        )}

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={moreInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}
          >
            <span className="group-hover:text-[var(--color-text-primary)] transition-colors duration-200">
              View all on GitHub →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}