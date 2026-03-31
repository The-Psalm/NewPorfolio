export type Skill = {
  name: string
  category: 'frontend' | 'backend' | 'tools'
  level: 1 | 2 | 3
}

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  repo?: string
  featured: boolean
  year: number
}
