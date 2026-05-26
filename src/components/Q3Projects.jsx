import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'

export default function Q3Projects() {
  /*
   * hoveredIndex : mémorise quel projet est survolé (-1 = aucun).
   * On l'utilise pour afficher la description du projet en bas du quadrant.
   */
  const [hoveredIndex, setHoveredIndex] = useState(-1)

  const activeProject = hoveredIndex >= 0 ? projects[hoveredIndex] : null

  return (
    <div className="h-full flex flex-col p-10 md:p-14">

      {/* ══ En-tête ══ */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <span className="font-mono text-white/20 text-xs tracking-widest">03 / PROJETS</span>
        <span className="font-mono text-white/15 text-xs">{projects.length} projets</span>
      </div>

      {/* Titre de section */}
      <h2
        className="font-black leading-none tracking-tighter text-white mb-6 md:mb-8"
        style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
      >
        PROJETS
      </h2>

      {/*
       * LISTE DE PROJETS — chaque ligne est interactive
       * onMouseEnter/Leave met à jour hoveredIndex
       * Le projet actif change de couleur via la classe conditionnelle
       */}
      <div className="flex-1 flex flex-col justify-center divide-y divide-white/8">
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 + i * 0.06 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(-1)}
            /*
             * group : active les classes group-hover sur les enfants
             * cursor-pointer : confirme visuellement que la ligne est cliquable
             */
            className="group flex items-center justify-between py-3 md:py-4 px-2 -mx-2 transition-colors duration-200 hover:bg-white/[0.025] rounded"
          >
            {/* Gauche : numéro + titre */}
            <div className="flex items-baseline gap-4">
              {/* Numéro en filigrane */}
              <span className="font-mono text-white/15 text-xs tabular-nums w-5 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/*
               * Le titre change de couleur si c'est le projet survolé.
               * hoveredIndex === i ? texte accent : texte normal
               * La transition CSS (transition-colors) adoucit le changement.
               */}
              <span
                className="font-semibold text-base md:text-lg transition-colors duration-200"
                style={{ color: hoveredIndex === i ? '#38bdf8' : 'rgba(255,255,255,0.65)' }}
              >
                {project.title}
              </span>
            </div>

            {/* Droite : catégorie + flèche */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-white/20 text-xs font-mono hidden sm:block">
                {project.category}
              </span>
              {/* Flèche diagonale — s'intensifie au survol */}
              <ArrowUpRight
                size={14}
                className="text-white/10 group-hover:text-white/50 transition-colors duration-200"
              />
            </div>
          </motion.a>
        ))}
      </div>

      {/*
       * ZONE DE DESCRIPTION en bas du quadrant
       * AnimatePresence gère l'animation d'entrée/sortie :
       *   - mode="wait" → attend que l'ancienne description disparaisse
       *     avant d'afficher la nouvelle (évite les chevauchements)
       *   - key={activeProject.id} → quand le projet change, React
       *     perçoit un nouvel élément → AnimatePresence rejoue l'animation
       */}
      <div className="h-12 mt-4 flex items-end">
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.p
              key={activeProject.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="text-white/35 text-xs font-mono leading-relaxed"
            >
              {activeProject.shortDesc}
              {activeProject.featured && (
                <span className="ml-2 text-amber-400/60">★</span>
              )}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
