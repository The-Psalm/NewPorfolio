import type { Skill } from '@/types'
import { motion } from 'framer-motion'
import { useCursorContext } from '@/components/cursor/CustomCursor'

interface SkillBadgeProps {
  skill: Skill
  index?: number
}

const levelColors: Record<Skill['level'], string> = {
  1: 'rgba(118,57,72,0.4)',
  2: 'rgba(118,57,72,0.7)',
  3: '#763948',
}

const levelLabels: Record<Skill['level'], string> = {
  1: 'Familiar',
  2: 'Proficient',
  3: 'Expert',
}

export function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  const { setVariant } = useCursorContext()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => setVariant('default')}
      className="group flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300"
      style={{
        border: '1px solid rgba(214,204,208,0.08)',
        backgroundColor: 'rgba(214,204,208,0.02)',
      }}
      whileHover={{
        backgroundColor: 'rgba(118,57,72,0.06)',
        borderColor: 'rgba(118,57,72,0.3)',
      }}
    >
      <span
        className="font-sans text-sm"
        style={{ color: 'rgba(214,204,208,0.8)' }}
      >
        {skill.name}
      </span>
      <span
        className="font-sans text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full"
        style={{
          color: levelColors[skill.level],
          border: `1px solid ${levelColors[skill.level]}`,
        }}
      >
        {levelLabels[skill.level]}
      </span>
    </motion.div>
  )
}