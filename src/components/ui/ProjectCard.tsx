import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import type { Project } from '@/types'

// ─── Shared image / placeholder area ─────────────────────
function ProjectVisual({
  project,
  index,
  hovered,
}: {
  project: Project
  index: number
  hovered: boolean
}) {
  const [imgError, setImgError] = useState(false)
  const showImage = !!project.image && !imgError

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: '16 / 9',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      {/* ── Real screenshot ─────────────────────── */}
      {showImage && (
        <>
          <img
            src={project.image}
            alt={`${project.title} preview`}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          />
          {/* Subtle dark tint so overlay text stays readable */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(12,12,12,0.55) 0%, rgba(12,12,12,0.1) 50%, transparent 100%)',
            }}
          />
        </>
      )}

      {/* ── Placeholder — shown when no image or load fails ── */}
      {!showImage && (
        <>
          {/* Grid texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(var(--color-border) 1px, transparent 1px),
                linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
              `,
              backgroundSize: '52px 52px',
              opacity: 0.6,
            }}
          />
          {/* Faded number */}
          <div className="absolute inset-0 flex items-center justify-center select-none">
            <span
              className="font-display"
              style={{
                fontSize: 'clamp(5rem, 12vw, 9rem)',
                fontWeight: 300,
                color: 'var(--color-border)',
                lineHeight: 1,
              }}
            >
              0{index + 1}
            </span>
          </div>
          {/* "Add screenshot" nudge — only visible in dev / when no image */}
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-[0.15em] uppercase whitespace-nowrap"
            style={{ color: 'var(--color-text-secondary)', opacity: 0.5 }}
          >
            Add project.image path to show preview
          </div>
        </>
      )}

      {/* ── Hover overlay with action links ─────── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 flex items-center justify-center gap-4"
        style={{
          backgroundColor: 'rgba(12,12,12,0.72)',
          backdropFilter: 'blur(6px)',
        }}
      >
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-medium tracking-wide transition-colors duration-200 border"
            style={{ backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
          >
            Live preview
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-medium tracking-wide transition-colors duration-200 border"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
          >
            GitHub
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </motion.div>
    </div>
  )
}

// ─── Featured card — large, 3D tilt ──────────────────────
export function FeaturedProjectCard({
  project,
  index,
  inView,
}: {
  project: Project
  index: number
  inView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { setVariant } = useCursorContext()
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 180, damping: 28 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 180, damping: 28 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
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
      transition={{ duration: 0.85, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { setHovered(true); setVariant('drag') }}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden cursor-none"
      >
        {/* Image / placeholder area */}
        <ProjectVisual project={project} index={index} hovered={hovered} />

        {/* Card body */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3
              className="font-display leading-tight"
              style={{ fontSize: 'clamp(1.55rem, 2.8vw, 2.1rem)', fontWeight: 400, color: 'var(--color-text-primary)' }}
            >
              {project.title}
            </h3>
            <span
              className="mono-label shrink-0 mt-1"
            >
              {project.year}
            </span>
          </div>

          <p
            className="font-sans text-sm leading-relaxed mb-5"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-xs px-3 py-1 rounded-full tracking-wide"
                style={{
                  backgroundColor: 'rgba(240, 237, 230, 0.04)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
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

// ─── Small card — compact grid ────────────────────────────
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
      transition={{ duration: 0.65, delay: 0.1 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); setVariant('hover') }}
      onMouseLeave={() => { setHovered(false); setVariant('default') }}
      className="group relative rounded-2xl border overflow-hidden transition-colors duration-300 cursor-none"
      style={{
        backgroundColor: hovered ? 'var(--color-surface)' : 'var(--color-bg)',
        borderColor: hovered ? 'var(--color-accent)' : 'var(--color-border)',
      }}
    >
      {/* Thumbnail strip — only if image exists */}
      {project.image && (
        <div className="w-full overflow-hidden" style={{ height: '120px' }}>
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover object-top transition-transform duration-500"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-2">
          <span
            className="mono-label"
            style={{ color: 'var(--color-accent)' }}
          >
            {project.year}
          </span>
          <motion.svg
            width="14" height="14" viewBox="0 0 16 16" fill="none"
            animate={{ x: hovered ? 0 : 5, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M3 13L13 3M13 3H6M13 3v7" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>

        <h3
          className="font-display mb-2 leading-snug"
          style={{ fontSize: '1.35rem', fontWeight: 400, color: 'var(--color-text-primary)' }}
        >
          {project.title}
        </h3>

        <p
          className="font-sans text-xs leading-relaxed mb-4 line-clamp-2"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-sans text-[10px] px-2.5 py-0.5 rounded-full tracking-wide"
              style={{
                backgroundColor: 'rgba(240, 237, 230, 0.04)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}