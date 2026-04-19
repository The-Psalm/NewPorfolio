import { CursorProvider } from '@/components/cursor/CustomCursor'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import { Testimonials } from '@/components/sections/Testimonials'
import { FadeUp } from '@/components/ui/FadeUp'

function AppInner() {
  useSmoothScroll()

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
      <Navbar />
      <main>
        {/* Hero has its own entrance — no wrapper needed */}
        <Hero />
        <FadeUp distance={28} duration={0.7}>
          <About />
        </FadeUp>
        <FadeUp distance={28} duration={0.7} delay={0.04}>
          <Projects />
        </FadeUp>
        <FadeUp distance={28} duration={0.7} delay={0.04}>
          <Skills />
        </FadeUp>
        <FadeUp distance={28} duration={0.7} delay={0.04}>
          <Testimonials />
        </FadeUp>
        <FadeUp distance={28} duration={0.7} delay={0.04}>
          <Contact />
        </FadeUp>
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