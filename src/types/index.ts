
// ─── Project Types ────────────────────────────────────────
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  url?: string
  repo?: string
  image?: string
  featured?: boolean
  year: number
}

// ─── Skill Types ──────────────────────────────────────────
export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'design'
  level: 1 | 2 | 3 // 1=familiar, 2=proficient, 3=expert
}

// ─── Nav Types ────────────────────────────────────────────
export interface NavLink {
  label: string
  href: string
}

// ─── Cursor Types ─────────────────────────────────────────
export type CursorVariant = 'default' | 'hover' | 'text' | 'drag'

export interface CursorState {
  variant: CursorVariant
  x: number
  y: number
}

// ─── Three.js Scene ───────────────────────────────────────
export interface SceneConfig {
  particleCount: number
  meshColor: string
  accentColor: string
}