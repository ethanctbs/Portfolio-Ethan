import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download } from 'lucide-react'

/*
 * Liens de navigation — pointent vers des sections du panneau droit.
 * On intercepte le clic pour forcer scrollIntoView()
 * (un simple <a href="#id"> scrollerait la window, pas le panneau droit).
 */
const NAV_LINKS = [
  { label: 'Projets',     id: 'projects' },
  { label: 'Compétences', id: 'skills'   },
  { label: 'Contact',     id: 'contact'  },
]

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/EthanCathebras',         icon: Github   },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ethan-cathebras',    icon: Linkedin },
  { label: 'Email',    href: 'mailto:ethan.cathebras@epitech.eu',          icon: Mail     },
]

export default function LeftPanel() {
  /*
   * scrollIntoView() remonte jusqu'au premier ancêtre "scrollable".
   * Ici, c'est le <main> du panneau droit (overflow-y-auto).
   * La window ne bouge pas.
   */
  const goTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    /*
     * h-full + flex flex-col + justify-between :
     * le contenu est réparti sur toute la hauteur du panneau —
     * nom en haut, nav au milieu, contacts en bas.
     */
    <div className="h-full flex flex-col justify-between p-12 md:p-14 border-b md:border-b-0 md:border-r border-black/8">

      {/* ══ HAUT : nom et rôle ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Indicateur de disponibilité */}
        <div className="flex items-center gap-2 text-xs font-mono text-navy-900/35 mb-10 md:mb-16">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Disponible — Epitech 2025
        </div>

        {/*
         * NOM MASSIF
         * clamp(min, preferred, max) : la taille s'adapte à la largeur
         * du viewport. Sur un 1440px, 6.5vw ≈ 94px. Sur mobile, 3rem.
         * font-black = font-weight: 900
         * leading-[0.88] = interligne très serré pour un effet bloc
         */}
        <h1
          className="font-black leading-[0.88] tracking-tighter text-navy-900"
          style={{ fontSize: 'clamp(3rem, 6.5vw, 7rem)' }}
        >
          <span className="block">ETHAN</span>
          <span className="block">CATHE-</span>
          <span className="block">BRAS</span>
        </h1>

        {/* Rôle — petit, discret, style terminal */}
        <p className="font-mono text-navy-900/35 text-sm mt-6 leading-relaxed">
          Développeur Full-Stack<br />
          Systèmes &amp; Web
        </p>
      </motion.div>

      {/* ══ MILIEU : navigation ══ */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {NAV_LINKS.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => goTo(e, id)}
            /*
             * group : active les classes group-hover sur les enfants
             * border-t border-black/8 : fine ligne de 1px entre chaque lien
             */
            className="group flex items-center justify-between py-5 border-t border-black/8 last:border-b text-navy-900/40 hover:text-navy-900 transition-colors duration-200"
          >
            <span className="text-sm font-medium tracking-wide">{label}</span>
            {/* Flèche qui glisse au survol */}
            <span className="text-navy-900/20 group-hover:text-navy-900 group-hover:translate-x-1 transition-all duration-200 text-xs">
              →
            </span>
          </a>
        ))}
      </motion.nav>

      {/* ══ BAS : liens sociaux + CV ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="space-y-6"
      >
        {/* Icônes sociales */}
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-navy-900/25 hover:text-navy-900 transition-colors duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Bouton CV — la seule vraie couleur du panneau gauche */}
        <a
          href="/CV-Ethan-Cathebras.pdf"
          download
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-navy-900/50 hover:text-navy-900 transition-colors duration-200 border-b border-navy-900/20 hover:border-navy-900 pb-0.5"
        >
          <Download size={12} />
          Télécharger le CV
        </a>
      </motion.div>

    </div>
  )
}
