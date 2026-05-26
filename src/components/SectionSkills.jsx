import { motion } from 'framer-motion'
import { Code2, Server, Wrench } from 'lucide-react'
import { skillCategories } from '../data/skills'

/* Icône Lucide associée à chaque catégorie */
const ICONS = {
  Frontend: Code2,
  Backend:  Server,
  Outils:   Wrench,
}

/*
 * Niveaux de maîtrise subjectifs, illustratifs.
 * Servent uniquement à la barre de progression.
 */
const PROFICIENCY = { Frontend: 85, Backend: 75, Outils: 80 }

export default function SectionSkills() {
  const total = skillCategories.reduce((s, c) => s + c.skills.length, 0)

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-6">

        {/* ── En-tête ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="text-lg font-semibold text-white tracking-tight">Compétences</h1>
          <p className="text-[11px] font-mono text-white/25 mt-0.5">
            {total} technologies · 3 catégories
          </p>
        </motion.div>

        {/* ── Grille 3 colonnes ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => {
            const Icon    = ICONS[cat.label] ?? Code2
            const level   = PROFICIENCY[cat.label] ?? 70

            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="module-card p-5 flex flex-col gap-4"
              >
                {/* ── Header : icône + titre + score ── */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/*
                     * Icône colorée avec la couleur de catégorie (iconColor).
                     * Pas de fond coloré — juste l'icône, plus minimal.
                     */}
                    <Icon size={16} className={cat.iconColor} />
                    <h2 className={`font-semibold text-sm ${cat.iconColor}`}>
                      {cat.label}
                    </h2>
                  </div>
                  <span className="font-mono text-white/20 text-xs">
                    {cat.skills.length} techs
                  </span>
                </div>

                {/*
                 * BARRE DE PROGRESSION fine (1px)
                 * motion.div avec animate={{ width: `${level}%` }}
                 * → animée de 0 à la valeur cible lors de l'entrée de la section.
                 * bg-accent-500 : couleur unique (bleu ciel) — minimalisme radical.
                 */}
                <div className="h-px w-full bg-white/8 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                    className="h-full bg-accent-500"
                  />
                </div>
                <span className="text-[10px] font-mono text-white/20 -mt-2">
                  {level}% maîtrise estimée
                </span>

                {/*
                 * BADGES — chaque compétence est un badge "tag" (défini dans index.css).
                 * whileHover → glow bleu individuel pour un retour visuel précis.
                 */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map(skill => (
                    <motion.span
                      key={skill}
                      whileHover={{ boxShadow: '0 0 8px rgba(56,189,248,0.35)', scale: 1.04 }}
                      transition={{ duration: 0.12 }}
                      className="tag cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Résumé textuel en bas ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="module-card p-5"
        >
          <p className="text-[11px] font-mono text-white/25 uppercase tracking-widest mb-3">
            Résumé
          </p>
          <p className="text-[13px] text-white/50 leading-relaxed">
            Développement frontend avec <span className="text-white/75">React &amp; TypeScript</span>,
            bas niveau système en <span className="text-white/75">C / C++ / POSIX</span>,
            scripting et back-end avec <span className="text-white/75">Python &amp; Node.js</span>.
            Outillage pro : <span className="text-white/75">Git, Docker, Linux</span>.
          </p>
        </motion.div>

      </div>
    </div>
  )
}
