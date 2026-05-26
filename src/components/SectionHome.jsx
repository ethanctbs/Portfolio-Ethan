import { motion } from 'framer-motion'
import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import { projects } from '../data/projects'
import { skillCategories } from '../data/skills'

/* Animation fade-up réutilisable, avec délai configurable */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 10 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.35, delay, ease: [0.4, 0, 0.2, 1] },
})

/* Toutes les technologies aplaties en une seule liste */
const allTechs = skillCategories.flatMap(c => c.skills)

export default function SectionHome() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-4">

        {/* ══ 1. EN-TÊTE ══ */}
        <motion.div {...fadeUp(0)} className="flex items-start justify-between">
          <div>
            {/*
             * Titre de section "Dashboard" — text-lg, pas géant.
             * Le nom d'Ethan est dans la sidebar, pas ici.
             */}
            <h1 className="text-lg font-semibold text-white tracking-tight">Dashboard</h1>
            <p className="text-xs font-mono text-white/25 mt-0.5">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          {/* Badge disponibilité */}
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono border border-white/10 text-white/35 px-2.5 py-1 rounded-full">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            Disponible · Stage / Alternance
          </span>
        </motion.div>

        {/* ══ 2. STATS (3 cartes égales) ══ */}
        <motion.div {...fadeUp(0.05)} className="grid grid-cols-3 gap-3">
          {[
            { value: '2+',    label: 'années de pratique', meta: 'depuis 2022'      },
            { value: '15+',   label: 'projets réalisés',   meta: 'C · Python · JS'  },
            { value: 'Bac+2', label: 'Epitech Marseille',  meta: 'Promo 2027'       },
          ].map(({ value, label, meta }) => (
            <div key={label} className="module-card p-5">
              {/* Grande valeur chiffrée */}
              <div className="text-2xl font-bold text-accent-400 leading-none">{value}</div>
              <div className="text-[13px] text-white/55 mt-2 font-medium">{label}</div>
              <div className="text-[11px] font-mono text-white/20 mt-0.5">{meta}</div>
            </div>
          ))}
        </motion.div>

        {/* ══ 3. BIO + PROJETS VEDETTES (split 3/5 + 2/5) ══ */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

          {/* Bio — occupe 3/5 */}
          <motion.div {...fadeUp(0.1)} className="md:col-span-3 module-card p-6">
            <p className="text-[11px] font-mono text-white/25 uppercase tracking-widest mb-4">
              À propos
            </p>

            <p className="text-[13px] text-white/65 leading-relaxed">
              Étudiant en 2ème année à{' '}
              <span className="text-white font-medium">Epitech Marseille</span>,
              je développe des applications allant du bas niveau système (C, POSIX)
              aux interfaces React modernes.
            </p>
            <p className="text-[13px] text-white/65 leading-relaxed mt-2">
              Passionné par les défis techniques, le code propre et l'open source.
              Disponible pour des stages, alternances ou projets freelance.
            </p>

            {/* Liens sociaux intégrés dans la bio */}
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/5">
              <a href="mailto:ethan.cathebras@epitech.eu"
                 className="flex items-center gap-1.5 text-[11px] font-mono text-white/30 hover:text-accent-400 transition-colors">
                <Mail size={11} /> ethan.cathebras@epitech.eu
              </a>
              <a href="https://github.com/EthanCathebras" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1.5 text-[11px] font-mono text-white/30 hover:text-white transition-colors">
                <Github size={11} /> GitHub
              </a>
              <a href="/CV-Ethan-Cathebras.pdf" download
                 className="ml-auto flex items-center gap-1.5 text-[11px] font-mono text-white/30 hover:text-accent-400 transition-colors">
                <Download size={11} /> CV
              </a>
            </div>
          </motion.div>

          {/* Projets vedettes — occupe 2/5 */}
          <motion.div {...fadeUp(0.15)} className="md:col-span-2 module-card p-5 flex flex-col">
            <p className="text-[11px] font-mono text-white/25 uppercase tracking-widest mb-4">
              Featured
            </p>

            {/*
             * filter(p.featured) : ne montre que les projets marqués "vedettes"
             * dans projects.js
             */}
            <div className="flex-1 divide-y divide-white/5">
              {projects.filter(p => p.featured).map(p => (
                <a
                  key={p.id}
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <span className="text-[13px] font-medium text-white/60 group-hover:text-white transition-colors duration-150 block">
                      {p.title}
                    </span>
                    <span className="text-[11px] font-mono text-white/20 mt-0.5 block">
                      {p.category} · {p.techs[0]}
                    </span>
                  </div>
                  <ArrowUpRight size={13} className="text-white/15 group-hover:text-accent-400 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>

            <a href="https://github.com/EthanCathebras" target="_blank" rel="noopener noreferrer"
               className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-white/20 hover:text-white/50 transition-colors flex items-center gap-1">
              <Github size={10} />
              Voir tous les dépôts
            </a>
          </motion.div>
        </div>

        {/* ══ 4. STACK TECHNIQUE (pleine largeur) ══ */}
        <motion.div {...fadeUp(0.2)} className="module-card p-5">
          <p className="text-[11px] font-mono text-white/25 uppercase tracking-widest mb-4">
            Stack technique · {allTechs.length} technologies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {allTechs.map(tech => (
              <span key={tech} className="tag cursor-default">{tech}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
