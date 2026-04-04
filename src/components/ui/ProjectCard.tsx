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
          border:          '1px solid rgba(214,204,208,0.08)',
          boxShadow: hovered
            ? '0 24px 60px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(118,57,72,0.2)'
            : '0 12px 40px -24px rgba(0,0,0,0.4)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { setHovered(true); setVariant('drag') }}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden cursor-none transition-shadow duration-500"
      >
        {/* Corner accent */}
        <div
          className="pointer-events-none absolute top-0 right-0 z-[1] w-24 h-24 rounded-bl-[2.5rem]"
          style={{
            background: 'linear-gradient(135deg, rgba(118,57,72,0.18), transparent 65%)',
          }}
          aria-hidden
        />

        {/* Visual area */}
        <div
          className="relative w-full aspect-[16/9] overflow-hidden"
          style={{
            background:
              'linear-gradient(145deg, rgba(118,57,72,0.22) 0%, rgba(13,10,11,0.95) 48%, rgba(118,57,72,0.12) 100%)',
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(214,204,208,0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(214,204,208,0.08) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 70% 40%, rgba(118,57,72,0.35), transparent 55%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display select-none"
              style={{
                fontSize:   'clamp(5rem, 12vw, 9rem)',
                fontWeight: 300,
                color:      'rgba(214,204,208,0.06)',
                lineHeight: 1,
                textShadow: '0 0 80px rgba(118,57,72,0.15)',
              }}
            >
              0{index + 1}
            </span>
          </div>

          {/* Year + featured label */}
          <div className="absolute left-4 top-4 z-[2] flex flex-wrap items-center gap-2">
            <span
              className="font-sans text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
              style={{
                color: 'rgba(214,204,208,0.75)',
                backgroundColor: 'rgba(13,10,11,0.55)',
                border: '1px solid rgba(214,204,208,0.12)',
              }}
            >
              {project.year}
            </span>
            <span
              className="font-sans text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
              style={{
                color: 'rgba(118,57,72,0.95)',
                backgroundColor: 'rgba(118,57,72,0.12)',
                border: '1px solid rgba(118,57,72,0.25)',
              }}
            >
              Featured
            </span>
          </div>

          {/* Hover overlay with links */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center gap-4 sm:gap-6 z-[3] px-4"
            style={{ backgroundColor: 'rgba(13,10,11,0.78)', backdropFilter: 'blur(6px)' }}
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
        <div className="p-6 md:p-8 relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-px opacity-60"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(118,57,72,0.45), transparent)',
            }}
            aria-hidden
          />
          <div className="mb-3">
            <h3
              className="font-display leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: '#D6CCD0' }}
            >
              {project.title}
            </h3>
          </div>

          <p
            className="font-sans text-sm leading-relaxed mb-6"
            style={{ color: 'rgba(214,204,208,0.58)' }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[11px] px-3 py-1 rounded-full tracking-[0.06em]"
                style={{
                  backgroundColor: 'rgba(118,57,72,0.12)',
                  color:           'rgba(214,204,208,0.7)',
                  border:          '1px solid rgba(118,57,72,0.22)',
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
      className="group relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-none overflow-hidden"
      style={{
        backgroundColor: hovered ? 'rgba(118,57,72,0.07)' : 'rgba(214,204,208,0.02)',
        borderColor:     hovered ? 'rgba(118,57,72,0.38)'  : 'rgba(214,204,208,0.08)',
        boxShadow: hovered ? '0 18px 44px -22px rgba(0,0,0,0.45)' : 'none',
      }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-[3px] transition-transform duration-300 origin-top"
        style={{
          background: 'linear-gradient(to bottom, #763948, rgba(118,57,72,0.2))',
          transform: hovered ? 'scaleY(1)' : 'scaleY(0.35)',
          opacity: hovered ? 1 : 0.45,
        }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -right-2 -top-3 font-display select-none tabular-nums"
        style={{
          fontSize: '4.5rem',
          lineHeight: 1,
          color: 'rgba(118,57,72,0.07)',
        }}
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex items-start justify-between gap-4 mb-4 relative z-[1]">
        <span
          className="font-sans text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
          style={{
            color: 'rgba(214,204,208,0.55)',
            backgroundColor: 'rgba(118,57,72,0.1)',
            border: '1px solid rgba(118,57,72,0.2)',
          }}
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
        className="font-display mb-2.5 leading-snug relative z-[1]"
        style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.45rem)', fontWeight: 400, color: '#D6CCD0' }}
      >
        {project.title}
      </h3>

      <p
        className="font-sans text-xs leading-relaxed mb-5 line-clamp-2 relative z-[1]"
        style={{ color: 'rgba(214,204,208,0.48)' }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 relative z-[1]">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="font-sans text-[10px] px-2.5 py-1 rounded-full tracking-[0.06em]"
            style={{
              backgroundColor: 'rgba(118,57,72,0.1)',
              color:           'rgba(214,204,208,0.6)',
              border: '1px solid rgba(118,57,72,0.15)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}