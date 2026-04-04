import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { FeaturedProjectCard, SmallProjectCard } from '@/components/ui/ProjectCard'
import { projects, featuredProjects } from '@/data/projects'

const otherProjects = projects.filter((p) => !p.featured)

export function Projects() {
  const sectionRef   = useRef<HTMLDivElement>(null)
  const gridRef      = useRef<HTMLDivElement>(null)
  const inView       = useInView(sectionRef, { once: true, margin: '-10% 0px' })
  const gridInView   = useInView(gridRef,    { once: true, margin: '-10% 0px' })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ backgroundColor: '#0D0A0B' }}
    >
      {/* Atmospheric depth — stays subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 520px at 18% 8%, rgba(118,57,72,0.12), transparent 55%), radial-gradient(700px 480px at 92% 72%, rgba(118,57,72,0.06), transparent 50%)',
        }}
      />

      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ backgroundColor: 'rgba(214,204,208,0.06)' }}
      />

      <div className="container-wide relative z-10">

        {/* ── Header ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px" style={{ backgroundColor: '#763948' }} />
              <span
                className="font-sans text-xs tracking-[0.2em] uppercase"
                style={{ color: 'rgba(214,204,208,0.45)' }}
              >
                Selected work
              </span>
            </motion.div>

            <RevealText
              as="h2"
              splitBy="words"
              delay={0.05}
              stagger={0.08}
              distance={50}
              className="leading-[1.02] mb-4"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize:   'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 300,
                color:      '#D6CCD0',
              } as React.CSSProperties}
            >
              Things I've built
            </RevealText>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-display italic text-lg sm:text-xl leading-relaxed"
              style={{ color: 'rgba(214,204,208,0.38)' }}
            >
              Product, web apps, and client work — each with a clear purpose.
            </motion.p>
          </div>

          {/* Project count — framed stat */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center gap-5 shrink-0 rounded-2xl px-6 py-4 border self-start lg:self-end"
            style={{
              borderColor: 'rgba(214,204,208,0.08)',
              backgroundColor: 'rgba(214,204,208,0.02)',
            }}
          >
            <span
              className="font-display italic tabular-nums"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.25rem)', color: 'rgba(118,57,72,0.55)', lineHeight: 1 }}
            >
              {String(projects.length).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-0.5">
              <span
                className="font-sans text-[10px] tracking-[0.22em] uppercase"
                style={{ color: 'rgba(214,204,208,0.35)' }}
              >
                Total
              </span>
              <span
                className="font-sans text-xs tracking-widest uppercase"
                style={{ color: 'rgba(214,204,208,0.45)' }}
              >
                projects
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Featured projects grid ───────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          {featuredProjects.map((project, i) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Other projects ───────────────────────────── */}
        {otherProjects.length > 0 && (
          <div ref={gridRef}>
            {/* Sub-header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-10"
            >
              <span
                className="font-sans text-xs tracking-[0.2em] uppercase"
                style={{ color: 'rgba(214,204,208,0.4)' }}
              >
                More work
              </span>
              <div className="flex-1 flex items-center gap-3 min-w-0">
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: 'rgba(214,204,208,0.08)' }}
                />
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: 'rgba(118,57,72,0.5)' }}
                  aria-hidden
                />
                <div
                  className="h-px flex-1 max-w-[120px]"
                  style={{ backgroundColor: 'rgba(214,204,208,0.05)' }}
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((project, i) => (
                <SmallProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  inView={gridInView}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── GitHub CTA ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 flex justify-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-sans text-sm tracking-[0.12em] uppercase transition-all duration-300 border"
            style={{
              color: 'rgba(214,204,208,0.55)',
              borderColor: 'rgba(214,204,208,0.12)',
              backgroundColor: 'rgba(214,204,208,0.02)',
            }}
          >
            <span className="group-hover:text-[#D6CCD0] transition-colors duration-300">
              View all on GitHub
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
          </a>
        </motion.div>
      </div>
    </section>
  )
}