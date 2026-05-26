import { motion } from 'framer-motion'
import { Github, Linkedin, Download } from 'lucide-react'

/*
 * Liens de navigation — sur mobile, scrollIntoView() fait descendre
 * l'utilisateur vers la section concernée (les sections ont un id="q2" etc.).
 * Sur desktop tout est visible, ces liens servent de repères visuels.
 */
const NAV = [
  { label: 'Compétences', id: 'q2' },
  { label: 'Projets',     id: 'q3' },
  { label: 'Contact',     id: 'q4' },
]

export default function Q1Identity() {
  const goTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    /*
     * whileHover : quand la souris entre dans ce quadrant, le fond
     * devient très légèrement plus clair. backgroundColor est une prop
     * de style inline que Framer Motion peut animer.
     * h-full : remplit toute la case de la grille (50vh sur desktop).
     */
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.025)' }}
      transition={{ duration: 0.35 }}
      className="h-full flex flex-col justify-between p-10 md:p-14"
    >

      {/* ══ HAUT : badge + NOM MASSIF ══ */}
      <div>
        {/* Numéro de quadrant + indicateur */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <span className="font-mono text-white/20 text-xs tracking-widest">01 / IDENTITÉ</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Disponible
          </span>
        </div>

        {/*
         * NOM EN TYPOGRAPHIE MASSIVE
         * clamp(minimum, préféré, maximum)
         * → adapte la taille entre 3.5rem (petit écran) et 7.5rem (grand écran)
         * → 8vw = 8% de la largeur du viewport, ce qui "colle" au quadrant
         * leading-[0.88] : supprime l'espace entre les lignes pour un effet "bloc"
         * tracking-tighter : rapproche les lettres entre elles
         */}
        <h1
          className="font-black leading-[0.88] tracking-tighter text-white"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' }}
        >
          <span className="block">ETHAN</span>
          <span className="block">CATHE-</span>
          <span className="block">BRAS</span>
        </h1>

        {/* Rôle — petit et discret sous le nom */}
        <p className="font-mono text-white/30 text-sm mt-5 leading-relaxed">
          Développeur Full-Stack<br />
          Systèmes &amp; Web · Epitech Marseille
        </p>
      </div>

      {/* ══ BAS : navigation + liens ══ */}
      <div>
        {/* Navigation vers les autres quadrants */}
        <nav className="mb-8">
          {NAV.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              /*
               * group active les classes group-hover sur les enfants.
               * Le "→" glisse de 4px à droite au survol grâce à
               * group-hover:translate-x-1 + transition-transform.
               */
              className="group flex items-center justify-between w-full py-3 border-t border-white/8 text-white/30 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <span className="text-sm font-medium tracking-wide">{label}</span>
              <span className="text-white/15 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-200 text-xs">
                →
              </span>
            </button>
          ))}
        </nav>

        {/* Liens sociaux + CV */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/EthanCathebras"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/20 hover:text-white transition-colors duration-200"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/ethan-cathebras"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/20 hover:text-white transition-colors duration-200"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="/CV-Ethan-Cathebras.pdf"
            download
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono text-white/25 hover:text-white border-b border-white/15 hover:border-white pb-0.5 transition-colors duration-200"
          >
            <Download size={11} />
            Télécharger le CV
          </a>
        </div>
      </div>

    </motion.div>
  )
}
