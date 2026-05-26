import { motion } from 'framer-motion'
import { Github, Linkedin, Download } from 'lucide-react'
import { NAV_ITEMS } from '../data/nav'

export default function Navigation({ active, onChange }) {
  return (
    <>
      {/* ══ DESKTOP : sidebar verticale ══ */}
      <aside className="hidden md:flex flex-col w-52 flex-shrink-0 border-r border-white/5">

        {/*
         * En-tête : nom complet + rôle en toutes petites lettres.
         * Le nom est en text-sm — élégant et discret, pas géant.
         * C'est le seul endroit où le nom apparaît dans l'interface.
         */}
        <div className="px-5 py-4 border-b border-white/5 flex-shrink-0">
          <span className="block text-sm font-semibold text-white tracking-tight">
            Ethan Cathebras
          </span>
          <span className="block text-[11px] font-mono text-white/30 mt-0.5">
            Full-Stack Developer
          </span>
        </div>

        {/* Liens de navigation */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const isActive = active === id
            return (
              <motion.button
                key={id}
                onClick={() => onChange(id)}
                whileHover={{ x: isActive ? 0 : 2 }}
                transition={{ duration: 0.12 }}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2 rounded-md
                  text-[13px] font-medium text-left transition-colors duration-150
                  ${isActive
                    ? 'bg-accent-500/10 text-accent-400 border-l-2 border-accent-500'
                    : 'text-white/35 hover:text-white/80 hover:bg-white/5 border-l-2 border-transparent'
                  }
                `}
              >
                <Icon size={14} className="flex-shrink-0" />
                <span>{label}</span>
                {/*
                 * layoutId : Framer Motion déplace ce point animé
                 * entre les items actifs via une shared layout animation.
                 */}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="ml-auto w-1 h-1 rounded-full bg-accent-400"
                    transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
                  />
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* Pied : liens sociaux + CV */}
        <div className="px-4 py-3 border-t border-white/5 flex items-center gap-3">
          <a href="https://github.com/EthanCathebras" target="_blank" rel="noopener noreferrer"
             aria-label="GitHub" className="text-white/20 hover:text-white/70 transition-colors">
            <Github size={13} />
          </a>
          <a href="https://linkedin.com/in/ethan-cathebras" target="_blank" rel="noopener noreferrer"
             aria-label="LinkedIn" className="text-white/20 hover:text-white/70 transition-colors">
            <Linkedin size={13} />
          </a>
          <a href="/CV-Ethan-Cathebras.pdf" download
             className="ml-auto flex items-center gap-1 font-mono text-[10px] text-white/20 hover:text-white/60 border-b border-white/10 hover:border-white/30 pb-px transition-colors">
            <Download size={9} />
            CV
          </a>
        </div>
      </aside>

      {/* ══ MOBILE : barre d'onglets en bas ══ */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-white/5 bg-navy-900/95 backdrop-blur-md">
        <div className="flex items-center justify-around h-14 px-2">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const isActive = active === id
            return (
              <button key={id} onClick={() => onChange(id)}
                className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg transition-colors duration-150 ${
                  isActive ? 'text-accent-400' : 'text-white/25'
                }`}
              >
                <Icon size={17} />
                <span className="text-[10px] font-mono">{label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
