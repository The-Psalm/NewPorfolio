import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { RevealText } from '@/components/ui/RevealText'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { skills, levelLabel } from '@/data/skills'
import type { Skill } from '@/types'

const categories: { key: Skill['category'] | 'all'; label: string }[] = [
  { key: 'all',      label: 'All'      },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend',  label: 'Backend'  },
  { key: 'tools',    label: 'Tools'    },
]

const levelWidth: Record<Skill['level'], string> = { 1: '35%', 2: '68%', 3: '95%' }

// ─── Single row ───────────────────────────────────────────
function SkillRow({ skill, index, inView }: { skill: Skill; index: number; inView: boolean }) {
  const { setVariant } = useCursorContext()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); setVariant('hover') }}
      onMouseLeave={() => { setHovered(false); setVariant('default') }}
      className="group flex items-center gap-3 py-3 sm:gap-4 sm:py-4 cursor-none"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <span
        className="shrink-0 transition-colors duration-200"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.8125rem, 1vw, 0.9375rem)',
          fontWeight: 400,
          width: 'clamp(7rem, 14vw, 11rem)',
          color: hovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        }}
      >
        {skill.name}
      </span>

      {/* Bar track */}
      <div className="flex-1 relative" style={{ height: '1px', backgroundColor: 'var(--color-border)' }}>
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{ backgroundColor: hovered ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
          initial={{ width: '0%' }}
          animate={inView ? { width: levelWidth[skill.level] } : { width: '0%' }}
          transition={{ duration: 1.2, delay: 0.1 + index * 0.04, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* End dot */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: hovered ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
          initial={{ left: '0%', opacity: 0 }}
          animate={inView ? { left: levelWidth[skill.level], opacity: 1 } : { left: '0%', opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.1 + index * 0.04, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Label */}
      <span
        className="shrink-0 transition-colors duration-200"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', width: '5rem', textAlign: 'right', color: hovered ? 'var(--color-text-secondary)' : 'rgba(240,237,230,0.2)' }}
      >
        {levelLabel[skill.level]}
      </span>
    </motion.div>
  )
}

// ─── Filter pill ──────────────────────────────────────────
function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const { setVariant } = useCursorContext()

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => setVariant('default')}
      className="cursor-none transition-colors duration-200"
      style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.6875rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding:       '0.4rem 0.875rem',
        borderRadius:  '2px',
        border:        `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
        color:         active ? 'var(--color-accent)' : 'var(--color-text-secondary)',
        backgroundColor: active ? 'transparent' : 'transparent',
      }}
    >
      {label}
    </button>
  )
}

// ─── Section ──────────────────────────────────────────────
export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const listRef    = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-8% 0px' })
  const listInView = useInView(listRef,    { once: true, margin: '-5% 0px' })
  const [activeCategory, setActiveCategory] = useState<Skill['category'] | 'all'>('all')

  const filtered = activeCategory === 'all' ? skills : skills.filter(s => s.category === activeCategory)

  return (
    <section id="skills" ref={sectionRef} className="section-padding section-bg" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container-wide">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mono-label mb-8"
            >
              Capabilities
            </motion.p>

            <div style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight:    400,
                color:         'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                lineHeight:    1.05,
              }}>
              <RevealText as="h2" splitBy="words" stagger={0.07} distance={40}>
                What I work with
              </RevealText>
            </div>
          </div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2 shrink-0"
          >
            {categories.map(cat => (
              <FilterPill
                key={cat.key}
                label={cat.label}
                active={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
              />
            ))}
          </motion.div>
        </div>

        {/* Skills list + side panel */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_15rem] lg:grid-cols-[1fr_18rem] gap-12 md:gap-14 lg:gap-20">

          {/* Skill rows */}
          <div ref={listRef}>
            {/* Opening rule */}
            <div className="hr mb-0" />
            <AnimatePresence mode="popLayout">
              {filtered.map((s, i) => (
                <SkillRow key={s.name} skill={s} index={i} inView={listInView} />
              ))}
            </AnimatePresence>
          </div>

          {/* Side panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col gap-8"
          >
            {/* Currently learning */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              <p className="mono-label mb-6">Currently learning</p>
              <div className="flex flex-col gap-4">
                {['React Native & Expo', 'WebGL / GLSL Shaders', 'System Design'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-accent)' }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontWeight: 300 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              <p className="mono-label mb-4">Approach</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                "Learn it by building something real with it."
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              {[
                { n: skills.filter(s => s.level === 3).length, label: 'Expert' },
                { n: skills.filter(s => s.level === 2).length, label: 'Proficient' },
                { n: skills.filter(s => s.level === 1).length, label: 'Familiar' },
              ].map(({ n, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, color: 'var(--color-accent)', lineHeight: 1 }}>{n}</span>
                  <span className="mono-label">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}