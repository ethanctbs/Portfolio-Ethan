import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Accueil',      href: '#hero'     },
  { label: 'Compétences',  href: '#skills'   },
  { label: 'Projets',      href: '#projects' },
  { label: 'Contact',      href: '#contact'  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/*
       * LOGO — coin supérieur gauche, fixed pour rester en place
       * z-50 le place au-dessus de tout le contenu
       */}
      <div className="fixed top-6 left-8 z-50">
        <a href="#hero" className="font-mono font-bold text-lg tracking-tight">
          <span className="text-accent-400">EC</span>
          <span className="text-white/30">.dev</span>
        </a>
      </div>

      {/*
       * LIENS DESKTOP — coin supérieur droit
       * hidden md:flex → masqués sur mobile, visibles à partir de md (768px)
       */}
      <nav className="fixed top-6 right-8 z-50 hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-sm text-white/35 hover:text-white transition-colors duration-200 font-medium tracking-wide"
          >
            {label}
          </a>
        ))}
        <a href="/CV-Ethan-Cathebras.pdf" download className="btn-primary text-sm py-2 px-4">
          <Download size={14} />
          CV
        </a>
      </nav>

      {/* BOUTON HAMBURGER — visible uniquement sur mobile */}
      <button
        onClick={() => setMenuOpen(v => !v)}
        className="fixed top-5 right-6 z-50 md:hidden text-white/50 hover:text-white transition-colors p-1"
        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/*
       * MENU MOBILE — panneau latéral droit
       * AnimatePresence gère l'animation d'entrée/sortie (x: 100% → 0)
       */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-navy-800/95 backdrop-blur-lg border-l border-white/8 px-8 py-28 flex flex-col gap-6 md:hidden"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-white/60 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="/CV-Ethan-Cathebras.pdf"
              download
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-4 justify-center"
            >
              <Download size={16} />
              Télécharger le CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
