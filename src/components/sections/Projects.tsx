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
      className="relative section-padding"
      style={{ backgroundColor: '#0D0A0B' }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ backgroundColor: 'rgba(214,204,208,0.06)' }}
      />

      <div className="container-wide">

        {/* ── Header ──────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
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
              className="leading-[1.0]"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize:   'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 300,
                color:      '#D6CCD0',
              } as React.CSSProperties}
            >
              Things I've built
            </RevealText>
          </div>

          {/* Project count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 shrink-0"
          >
            <span
              className="font-display italic"
              style={{ fontSize: '3rem', color: 'rgba(118,57,72,0.4)', lineHeight: 1 }}
            >
              {String(projects.length).padStart(2, '0')}
            </span>
            <span
              className="font-sans text-xs tracking-widest uppercase"
              style={{ color: 'rgba(214,204,208,0.3)' }}
            >
              projects
            </span>
          </motion.div>
        </div>

        {/* ── Featured projects grid ───────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
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
              className="flex items-center gap-4 mb-8"
            >
              <span
                className="font-sans text-xs tracking-[0.2em] uppercase"
                style={{ color: 'rgba(214,204,208,0.35)' }}
              >
                More work
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: 'rgba(214,204,208,0.06)' }}
              />
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
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-sans text-sm tracking-wide transition-colors duration-300"
            style={{ color: 'rgba(214,204,208,0.45)' }}
          >
            <span className="group-hover:text-[#D6CCD0] transition-colors duration-300">
              See everything on GitHub
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