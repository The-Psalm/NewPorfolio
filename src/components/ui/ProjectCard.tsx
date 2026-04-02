import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import type { Project } from '@/types'

// ─── Featured card — large, tilt on mouse move ────────────
export function FeaturedProjectCard({
  project,
  index,
  inView,
}: {
  project: Project
  index: number
  inView: boolean
}) {
  const cardRef    = useRef<HTMLDivElement>(null)
  const { setVariant } = useCursorContext()
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]),  { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5)
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
    setVariant('default')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          backgroundColor: 'rgba(214,204,208,0.03)',
          border:          '1px solid rgba(214,204,208,0.07)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { setHovered(true); setVariant('drag') }}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden cursor-none"
      >
        {/* Visual area */}
        <div
          className="relative w-full aspect-[16/9] overflow-hidden"
          style={{ backgroundColor: 'rgba(118,57,72,0.08)' }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(118,57,72,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(118,57,72,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display select-none"
              style={{
                fontSize:   'clamp(5rem, 12vw, 9rem)',
                fontWeight: 300,
                color:      'rgba(118,57,72,0.2)',
                lineHeight: 1,
              }}
            >
              0{index + 1}
            </span>
          </div>

          {/* Hover overlay with links */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center gap-6"
            style={{ backgroundColor: 'rgba(13,10,11,0.75)', backdropFilter: 'blur(4px)' }}
          >
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full font-sans text-sm font-medium tracking-wide"
                style={{ backgroundColor: '#763948', color: '#D6CCD0' }}
                onClick={(e) => e.stopPropagation()}
              >
                Live site
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full font-sans text-sm font-medium tracking-wide"
                style={{ border: '1px solid rgba(214,204,208,0.3)', color: '#D6CCD0' }}
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
            )}
          </motion.div>
        </div>

        {/* Card body */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3
              className="font-display leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: '#D6CCD0' }}
            >
              {project.title}
            </h3>
            <span
              className="font-sans text-xs tracking-wider shrink-0 mt-1"
              style={{ color: 'rgba(214,204,208,0.3)' }}
            >
              {project.year}
            </span>
          </div>

          <p
            className="font-sans text-sm leading-relaxed mb-5"
            style={{ color: 'rgba(214,204,208,0.55)' }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-xs px-3 py-1 rounded-full tracking-wide"
                style={{
                  backgroundColor: 'rgba(118,57,72,0.15)',
                  color:           'rgba(214,204,208,0.65)',
                  border:          '1px solid rgba(118,57,72,0.25)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Small card — compact grid layout ────────────────────
export function SmallProjectCard({
  project,
  index,
  inView,
}: {
  project: Project
  index: number
  inView: boolean
}) {
  const { setVariant } = useCursorContext()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); setVariant('hover') }}
      onMouseLeave={() => { setHovered(false); setVariant('default') }}
      className="group relative p-6 rounded-2xl border transition-colors duration-300 cursor-none"
      style={{
        backgroundColor: hovered ? 'rgba(118,57,72,0.06)' : 'rgba(214,204,208,0.02)',
        borderColor:     hovered ? 'rgba(118,57,72,0.35)'  : 'rgba(214,204,208,0.07)',
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <span
          className="font-sans text-xs tracking-[0.15em] uppercase"
          style={{ color: 'rgba(118,57,72,0.7)' }}
        >
          {project.year}
        </span>
        <motion.div
          animate={{ x: hovered ? 0 : 6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="#763948"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      <h3
        className="font-display mb-2 leading-snug"
        style={{ fontSize: '1.4rem', fontWeight: 400, color: '#D6CCD0' }}
      >
        {project.title}
      </h3>

      <p
        className="font-sans text-xs leading-relaxed mb-4 line-clamp-2"
        style={{ color: 'rgba(214,204,208,0.45)' }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="font-sans text-[10px] px-2.5 py-0.5 rounded-full tracking-wide"
            style={{
              backgroundColor: 'rgba(118,57,72,0.12)',
              color:           'rgba(214,204,208,0.55)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}