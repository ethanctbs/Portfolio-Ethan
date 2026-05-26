import { motion } from 'framer-motion'
import { skillCategories } from '../data/skills'

export default function Q2Skills() {
  return (
    /*
     * whileHover : légère teinte bleue au survol du quadrant
     * (14, 165, 233) = la valeur RGB de accent-500 (#0ea5e9)
     */
    <motion.div
      whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.04)' }}
      transition={{ duration: 0.35 }}
      className="h-full flex flex-col p-10 md:p-14"
    >

      {/* ══ En-tête du quadrant ══ */}
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <span className="font-mono text-white/20 text-xs tracking-widest">02 / COMPÉTENCES</span>
        {/* Compteur total de technologies */}
        <span className="font-mono text-white/15 text-xs">
          {skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)} technologies
        </span>
      </div>

      {/*
       * TITRE DE SECTION en typographie massive
       * Sert de point d'ancrage visuel dans la grille
       */}
      <h2
        className="font-black leading-none tracking-tighter text-white mb-8 md:mb-12"
        style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
      >
        SKILLS
      </h2>

      {/*
       * LISTE DES CATÉGORIES — typographie pure, aucune carte
       * Chaque ligne = un flex avec catégorie à gauche, skills à droite
       * divide-y divide-white/8 = fine ligne de 1px entre chaque ligne
       */}
      <div className="flex-1 flex flex-col justify-center divide-y divide-white/8">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            /*
             * group : active les classes group-hover sur les enfants
             * hover:bg-white/[0.025] : fond légèrement éclairci sur la ligne
             */
            className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-5 hover:bg-white/[0.025] px-2 -mx-2 transition-colors duration-200 rounded"
          >
            {/* Nom de la catégorie */}
            <span className="font-mono text-xs text-white/25 uppercase tracking-[0.18em] sm:w-24 flex-shrink-0 group-hover:text-accent-400 transition-colors duration-200">
              {cat.label}
            </span>

            {/*
             * skills.join(' · ') : concatène tous les skills en une chaîne
             * séparée par le caractère point médian "·"
             */}
            <p className="text-white/55 text-sm font-medium leading-relaxed group-hover:text-white/75 transition-colors duration-200">
              {cat.skills.join(' · ')}
            </p>
          </motion.div>
        ))}
      </div>

    </motion.div>
  )
}
