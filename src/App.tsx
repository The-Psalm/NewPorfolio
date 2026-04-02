import { CursorProvider } from '@/components/cursor/CustomCursor'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'

function AppInner() {
  useSmoothScroll()

  return (
    <div className="relative" style={{ backgroundColor: '#0D0A0B', color: '#D6CCD0' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <CursorProvider>
      <AppInner />
    </CursorProvider>
  )
}

export default App