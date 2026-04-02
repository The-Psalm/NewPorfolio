import { motion } from 'framer-motion'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { navLinks, siteConfig } from '@/data/constants'
import { getLenis } from '@/hooks/useSmoothScroll'

export function Footer() {
  const { setVariant } = useCursorContext()
  const year = new Date().getFullYear()

  const handleNavClick = (href: string) => {
    const lenis = getLenis()
    const target = document.querySelector(href)
    if (lenis && target) {
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.4 })
    }
  }

  const scrollToTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { duration: 1.6 })
  }

  return (
    <footer
      className="relative border-t"
      style={{
        backgroundColor: '#0D0A0B',
        borderColor:     'rgba(214,204,208,0.07)',
      }}
    >
      <div className="container-wide px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Left — branding */}
          <div className="flex flex-col gap-2">
            <MagneticWrapper strength={0.2}>
              <button
                onClick={scrollToTop}
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
                className="flex items-center gap-2 cursor-none"
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-sans font-bold"
                  style={{ backgroundColor: '#763948', color: '#D6CCD0' }}
                >
                  SA
                </span>
                <span
                  className="font-sans text-sm font-medium tracking-[0.12em] uppercase"
                  style={{ color: 'rgba(214,204,208,0.6)' }}
                >
                  Samuel
                </span>
              </button>
            </MagneticWrapper>
            <p
              className="font-sans text-xs"
              style={{ color: 'rgba(214,204,208,0.25)', paddingLeft: '2.25rem' }}
            >
              {siteConfig.location}
            </p>
          </div>

          {/* Centre — nav links */}
          <nav className="flex flex-wrap items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => setVariant('text')}
                onMouseLeave={() => setVariant('default')}
                className="font-sans text-xs tracking-[0.1em] uppercase transition-colors duration-200 cursor-none"
                style={{ color: 'rgba(214,204,208,0.35)' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right — back to top */}
          <MagneticWrapper strength={0.3}>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
              className="group flex items-center gap-2 font-sans text-xs tracking-[0.1em] uppercase cursor-none transition-colors duration-200"
              style={{ color: 'rgba(214,204,208,0.35)' }}
            >
              <span className="group-hover:text-[#D6CCD0] transition-colors duration-200">
                Back to top
              </span>
              <motion.svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="transition-transform duration-300 group-hover:-translate-y-1"
              >
                <path
                  d="M7 11V3M3 7l4-4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>
          </MagneticWrapper>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t"
          style={{ borderColor: 'rgba(214,204,208,0.05)' }}
        >
          <p
            className="font-sans text-xs"
            style={{ color: 'rgba(214,204,208,0.2)' }}
          >
            © {year} {siteConfig.name}. Built with React, Three.js & Framer Motion.
          </p>
          <p
            className="font-sans text-xs"
            style={{ color: 'rgba(214,204,208,0.15)' }}
          >
            Designed & developed by Samuel
          </p>
        </div>
      </div>
    </footer>
  )
}