import { motion } from 'framer-motion'
import { Github, ExternalLink, Star } from 'lucide-react'
import { projects } from '../data/projects'

/* Couleurs des badges de catégorie */
const CAT_COLORS = {
  Système:     'text-blue-400   border-blue-500/25   bg-blue-500/8',
  Réseau:      'text-purple-400 border-purple-500/25 bg-purple-500/8',
  Jeu:         'text-emerald-400 border-emerald-500/25 bg-emerald-500/8',
  Compilateur: 'text-orange-400 border-orange-500/25 bg-orange-500/8',
}

/*
 * Carte projet — style "module / fichier" avec barre de titre façon IDE.
 * index : utilisé pour décaler l'animation d'entrée (stagger).
 */
function ProjectCard({ project, index }) {
  const catColor = CAT_COLORS[project.category] ?? 'text-white/50 border-white/15 bg-white/5'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      /*
       * whileHover : ombre avec teinte accent au survol → effet "glow"
       * Le module-card gère déjà la bordure (border-white/8 → border-white/15)
       */
      whileHover={{ boxShadow: '0 0 0 1px rgba(56,189,248,0.15), 0 8px 30px rgba(14,165,233,0.08)' }}
      className="module-card overflow-hidden flex flex-col group"
    >
      {/* ── Barre de titre : dots + badges ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-white/[0.015] flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-500/45" />
          <div className="w-2 h-2 rounded-full bg-amber-500/45" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/45" />
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${catColor}`}>
            {project.category}
          </span>
          {project.featured && (
            <Star size={11} className="text-amber-400" fill="currentColor" />
          )}
        </div>
      </div>

      {/* ── Corps de la carte ── */}
      <div className="flex-1 flex flex-col p-5 gap-3">
        {/* Titre */}
        <h3 className="font-bold text-white text-lg leading-tight group-hover:text-accent-400 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description courte */}
        <p className="text-white/40 text-sm leading-relaxed flex-1">
          {project.shortDesc}
        </p>

        {/* Tags techno */}
        <div className="flex flex-wrap gap-1.5">
          {project.techs.map((t) => (
            /*
             * whileHover sur chaque tag : effet "glow" bleu individuel.
             * boxShadow avec rgba(56,189,248,...) = couleur accent-400
             */
            <motion.span
              key={t}
              whileHover={{ boxShadow: '0 0 8px rgba(56,189,248,0.35)' }}
              className="tag cursor-default"
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Liens */}
        <div className="flex items-center gap-4 pt-1">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-white/25 hover:text-accent-400 transition-colors duration-200"
          >
            <Github size={12} />
            Code source
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-400/60 hover:text-accent-400 transition-colors duration-200"
            >
              <ExternalLink size={12} />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function SectionProjects() {
  return (
    /* overflow-y-auto : cette section peut défiler en interne */
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-10 pb-8">

        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <p className="font-mono text-white/20 text-xs uppercase tracking-[0.2em] mb-2">
            Réalisations
          </p>
          <h2
            className="font-black leading-none tracking-tighter text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            PROJETS
          </h2>
          <p className="text-white/30 text-sm font-mono mt-2">
            {projects.length} modules · Survoler pour le glow
          </p>
        </motion.div>

        {/*
         * Grille fluide de cartes — grid-cols-1 → 2 → 3 selon la largeur.
         * auto-rows-fr : toutes les lignes ont la même hauteur (fraction = 1fr).
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </div>
  )
}
