import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, Mail } from 'lucide-react'
import { projects } from '../data/projects'
import { skillCategories } from '../data/skills'

/* ─────────────────────────────────────────────
 * COMPOSANT : une ligne de projet
 * ─────────────────────────────────────────────
 * Affiche le titre + catégorie sur une ligne.
 * Au survol (desktop) ou au clic (mobile),
 * la description se déroule avec AnimatePresence.
 */
function ProjectRow({ project, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border-b border-white/8 group"
      onMouseEnter={() => setOpen(true)}   // desktop : ouvre au survol
      onMouseLeave={() => setOpen(false)}  // desktop : ferme en quittant
      onClick={() => setOpen(v => !v)}     // mobile  : bascule au tap
    >
      {/* ── Ligne principale ── */}
      <div className="flex items-center justify-between px-12 md:px-16 py-8 cursor-default hover:bg-white/[0.025] transition-colors duration-200">

        {/* Gauche : numéro + titre */}
        <div className="flex items-baseline gap-6 min-w-0">
          {/* Numéro en filigrane */}
          <span className="text-white/15 font-mono text-xs tabular-nums flex-shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          {/*
           * Titre en grand — group-hover:text-accent-400 :
           * la classe `group` est sur le parent (.group),
           * ce qui permet de changer la couleur du titre
           * dès que la souris entre dans la zone parente.
           */}
          <h3 className="font-bold text-white group-hover:text-accent-400 transition-colors duration-300 truncate"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
            {project.title}
          </h3>
        </div>

        {/* Droite : catégorie + icône */}
        <div className="flex items-center gap-4 flex-shrink-0 ml-4">
          <span className="text-white/25 text-xs font-mono hidden sm:block">
            {project.category}
          </span>
          <ArrowUpRight
            size={15}
            className="text-white/15 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          />
        </div>
      </div>

      {/* ── Détails dépliables ── */}
      {/*
       * AnimatePresence gère l'entrée et la sortie de l'élément du DOM.
       * initial={false} = pas d'animation à la première passe.
       * height: 0 → 'auto' : la hauteur s'étend vers la vraie taille.
       */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-12 md:px-16 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              {/* Description + techs */}
              <div>
                <p className="text-white/40 text-sm leading-relaxed max-w-md">
                  {project.shortDesc}
                </p>
                {/* Badges technos — sobres, juste bordure */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.techs.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono text-white/25 border border-white/10 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* Lien GitHub */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // empêche le toggle du détail
                className="inline-flex items-center gap-1.5 text-xs font-mono text-white/30 hover:text-white border-b border-white/15 hover:border-white pb-0.5 transition-colors flex-shrink-0"
              >
                <Github size={12} />
                Voir le code
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


/* ─────────────────────────────────────────────
 * COMPOSANT PRINCIPAL : tout le contenu défilant
 * ─────────────────────────────────────────────
 */
export default function RightPanel() {
  return (
    <div className="min-h-full">

      {/* ══════════════════════════════════════
          SECTION PROJETS
          ══════════════════════════════════════ */}
      <section id="projects">

        {/* Titre de section en typographie massive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-12 md:px-16 pt-16 pb-10 border-b border-white/8"
        >
          {/* Label discret au-dessus */}
          <p className="font-mono text-white/20 text-xs uppercase tracking-[0.25em] mb-4">
            Réalisations
          </p>
          {/*
           * Titre géant — `leading-none` supprime l'interligne par défaut
           * pour que le texte "colle" sans espace vide au-dessus/dessous.
           */}
          <h2
            className="font-black leading-none tracking-tighter text-white"
            style={{ fontSize: 'clamp(4rem, 9vw, 9rem)' }}
          >
            PROJETS
          </h2>
        </motion.div>

        {/* Liste des projets */}
        <div>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <ProjectRow project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════
          SECTION COMPÉTENCES
          ══════════════════════════════════════ */}
      <section id="skills" className="border-t border-white/8">

        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="px-12 md:px-16 pt-16 pb-10 border-b border-white/8"
        >
          <p className="font-mono text-white/20 text-xs uppercase tracking-[0.25em] mb-4">
            Technologies
          </p>
          <h2
            className="font-black leading-none tracking-tighter text-white"
            style={{ fontSize: 'clamp(4rem, 9vw, 9rem)' }}
          >
            SKILLS
          </h2>
        </motion.div>

        {/*
         * Compétences en typographie pure : pas de cartes, pas d'icônes.
         * Juste le nom de la catégorie en petit + les techs en grand.
         * Une fine ligne sépare chaque catégorie.
         */}
        <div className="divide-y divide-white/8">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="px-12 md:px-16 py-10 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16"
            >
              {/* Catégorie — petite, tout en majuscules */}
              <span className="font-mono text-white/25 text-xs uppercase tracking-[0.2em] md:w-28 flex-shrink-0">
                {cat.label}
              </span>
              {/*
               * Skills séparés par un point médian "·"
               * join() les concatène en une seule chaîne lisible
               */}
              <p className="text-white/70 font-medium text-lg md:text-xl leading-relaxed">
                {cat.skills.join(' · ')}
              </p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════
          SECTION CONTACT
          ══════════════════════════════════════ */}
      <section id="contact" className="border-t border-white/8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="px-12 md:px-16 py-20"
        >
          <p className="font-mono text-white/20 text-xs uppercase tracking-[0.25em] mb-6">
            Contact
          </p>

          {/* Email en très grand — c'est lui le CTA principal */}
          <a
            href="mailto:ethan.cathebras@epitech.eu"
            className="group block"
          >
            <p
              className="font-black leading-none tracking-tighter text-white/20 group-hover:text-white transition-colors duration-300"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
            >
              ethan.cathebras
              <br />
              @epitech.eu
            </p>
          </a>

          {/* Sous-texte */}
          <p className="text-white/25 text-sm font-mono mt-8 max-w-xs leading-relaxed">
            Disponible pour des stages, alternances<br />
            ou projets en freelance.
          </p>

          {/* Lien email icône */}
          <a
            href="mailto:ethan.cathebras@epitech.eu"
            className="inline-flex items-center gap-2 mt-8 text-xs font-mono text-white/30 hover:text-white border-b border-white/15 hover:border-white pb-0.5 transition-colors"
          >
            <Mail size={12} />
            Envoyer un message
          </a>
        </motion.div>

        {/* Pied de page minimal */}
        <div className="border-t border-white/8 px-12 md:px-16 py-6 flex items-center justify-between">
          <span className="font-mono text-white/15 text-xs">Ethan Cathebras · 2025</span>
          <span className="font-mono text-white/10 text-xs">Epitech Marseille</span>
        </div>
      </section>

    </div>
  )
}
