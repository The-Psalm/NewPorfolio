import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { skills, levelLabel } from '@/data/skills'
import type { Skill } from '@/types'

// ─── Category filter tabs ─────────────────────────────────
const categories: { key: Skill['category'] | 'all'; label: string }[] = [
  { key: 'all',      label: 'All'      },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend',  label: 'Backend'  },
  { key: 'tools',    label: 'Tools'    },
]

// ─── Level bar widths ─────────────────────────────────────
const levelWidth: Record<Skill['level'], string> = {
  1: '35%',
  2: '68%',
  3: '95%',
}

// ─── Single skill row ─────────────────────────────────────
function SkillRow({
  skill,
  index,
  inView,
}: {
  skill:  Skill
  index:  number
  inView: boolean
}) {
  const { setVariant } = useCursorContext()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); setVariant('hover') }}
      onMouseLeave={() => { setHovered(false); setVariant('default') }}
      className="group flex items-center gap-4 py-4 border-b cursor-none"
      style={{ borderColor: 'rgba(214,204,208,0.07)' }}
    >
      {/* Skill name */}
      <span
        className="font-sans text-sm w-40 shrink-0 transition-colors duration-200"
        style={{ color: hovered ? '#D6CCD0' : 'rgba(214,204,208,0.7)' }}
      >
        {skill.name}
      </span>

      {/* Animated bar */}
      <div
        className="flex-1 h-px relative overflow-visible"
        style={{ backgroundColor: 'rgba(214,204,208,0.08)' }}
      >
        <motion.div
          className="absolute top-0 left-0 h-px"
          style={{ backgroundColor: hovered ? '#D6CCD0' : '#763948' }}
          initial={{ width: '0%' }}
          animate={inView ? { width: levelWidth[skill.level] } : { width: '0%' }}
          transition={{
            duration: 1.1,
            delay:    0.1 + index * 0.05,
            ease:     [0.16, 1, 0.3, 1],
          }}
        />
        {/* Dot at end of bar */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: hovered ? '#D6CCD0' : '#763948' }}
          initial={{ left: '0%', opacity: 0 }}
          animate={inView
            ? { left: levelWidth[skill.level], opacity: 1 }
            : { left: '0%', opacity: 0 }
          }
          transition={{
            duration: 1.1,
            delay:    0.1 + index * 0.05,
            ease:     [0.16, 1, 0.3, 1],
          }}
        />
      </div>

      {/* Level label */}
      <span
        className="font-sans text-xs w-20 text-right shrink-0 tracking-wide transition-colors duration-200"
        style={{ color: hovered ? 'rgba(214,204,208,0.6)' : 'rgba(214,204,208,0.25)' }}
      >
        {levelLabel[skill.level]}
      </span>
    </motion.div>
  )
}

// ─── Category pill ────────────────────────────────────────
function FilterPill({
  label,
  active,
  onClick,
}: {
  label:   string
  active:  boolean
  onClick: () => void
}) {
  const { setVariant } = useCursorContext()

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => setVariant('default')}
      className="relative px-5 py-2 rounded-full font-sans text-xs tracking-[0.12em] uppercase transition-colors duration-300 cursor-none overflow-hidden"
      style={{
        color: active ? '#D6CCD0' : 'rgba(214,204,208,0.4)',
        border: `1px solid ${active ? 'rgba(118,57,72,0.6)' : 'rgba(214,204,208,0.1)'}`,
      }}
    >
      {active && (
        <motion.span
          layoutId="pill-bg"
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: 'rgba(118,57,72,0.2)' }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  )
}

// ─── Main component ───────────────────────────────────────
export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const listRef    = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-10% 0px' })
  const listInView = useInView(listRef,    { once: true, margin: '-5% 0px'  })

  const [activeCategory, setActiveCategory] = useState<Skill['category'] | 'all'>('all')

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <section
      id="skills"
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
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
                Capabilities
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
              What I work with
            </RevealText>
          </div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <FilterPill
                key={cat.key}
                label={cat.label}
                active={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Skills list + side panel ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

          {/* Skill rows — takes 2 columns */}
          <div ref={listRef} className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((skill, i) => (
                <SkillRow
                  key={skill.name}
                  skill={skill}
                  index={i}
                  inView={listInView}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Side panel — currently learning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Currently learning card */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: 'rgba(118,57,72,0.06)',
                borderColor:     'rgba(118,57,72,0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: '#763948' }}
                />
                <span
                  className="font-sans text-xs tracking-[0.15em] uppercase"
                  style={{ color: 'rgba(214,204,208,0.45)' }}
                >
                  Currently learning
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {['React Native & Expo', 'WebGL / GLSL Shaders', 'System Design'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-4 h-px shrink-0"
                      style={{ backgroundColor: 'rgba(118,57,72,0.5)' }}
                    />
                    <span
                      className="font-sans text-sm"
                      style={{ color: 'rgba(214,204,208,0.65)' }}
                    >
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Philosophy card */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: 'rgba(214,204,208,0.02)',
                borderColor:     'rgba(214,204,208,0.07)',
              }}
            >
              <span
                className="font-sans text-xs tracking-[0.15em] uppercase block mb-4"
                style={{ color: 'rgba(214,204,208,0.3)' }}
              >
                Approach
              </span>
              <p
                className="font-display italic leading-snug"
                style={{
                  fontSize:   '1.3rem',
                  color:      'rgba(214,204,208,0.6)',
                  fontWeight: 300,
                }}
              >
                "Learn it by building something real with it."
              </p>
            </div>

            {/* Skill count summary */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div
                  className="font-display"
                  style={{ fontSize: '2rem', color: '#763948', lineHeight: 1 }}
                >
                  {skills.filter(s => s.level === 3).length}
                </div>
                <div
                  className="font-sans text-xs tracking-wider uppercase mt-1"
                  style={{ color: 'rgba(214,204,208,0.3)' }}
                >
                  Expert
                </div>
              </div>
              <div
                className="w-px h-10 self-center"
                style={{ backgroundColor: 'rgba(214,204,208,0.1)' }}
              />
              <div className="text-center">
                <div
                  className="font-display"
                  style={{ fontSize: '2rem', color: 'rgba(118,57,72,0.7)', lineHeight: 1 }}
                >
                  {skills.filter(s => s.level === 2).length}
                </div>
                <div
                  className="font-sans text-xs tracking-wider uppercase mt-1"
                  style={{ color: 'rgba(214,204,208,0.3)' }}
                >
                  Proficient
                </div>
              </div>
              <div
                className="w-px h-10 self-center"
                style={{ backgroundColor: 'rgba(214,204,208,0.1)' }}
              />
              <div className="text-center">
                <div
                  className="font-display"
                  style={{ fontSize: '2rem', color: 'rgba(118,57,72,0.4)', lineHeight: 1 }}
                >
                  {skills.filter(s => s.level === 1).length}
                </div>
                <div
                  className="font-sans text-xs tracking-wider uppercase mt-1"
                  style={{ color: 'rgba(214,204,208,0.3)' }}
                >
                  Familiar
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}