import { motion } from 'framer-motion'
import { Github, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'

function ProjectCard({ project, index }) {
  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className="group relative flex flex-col justify-between p-6 rounded-3xl border border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 min-h-[180px]"
    >
      {/* Top row: category + arrow */}
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.15em]">
          {project.category}
        </span>
        <ArrowUpRight
          size={14}
          className="text-white/15 group-hover:text-accent-400 transition-colors flex-shrink-0"
        />
      </div>

      {/* Title */}
      <div>
        <h3 className="text-[15px] font-semibold text-white/70 group-hover:text-white transition-colors duration-200 leading-snug mb-2">
          {project.title}
        </h3>
        <p className="text-[12px] text-white/30 leading-relaxed line-clamp-2">
          {project.shortDesc}
        </p>
      </div>

      {/* Techs */}
      <div className="flex flex-wrap gap-1 mt-4">
        {project.techs.slice(0, 3).map(t => (
          <span
            key={t}
            className="font-mono text-[10px] text-white/25 border border-white/8 rounded-full px-2 py-0.5"
          >
            {t}
          </span>
        ))}
        {project.techs.length > 3 && (
          <span className="font-mono text-[10px] text-white/15 px-1 py-0.5">
            +{project.techs.length - 3}
          </span>
        )}
      </div>
    </motion.a>
  )
}

export default function Projects() {
  return (
    <section className="h-screen w-full flex flex-col justify-center px-8 md:px-20 lg:px-32 overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mb-10"
      >
        <p className="font-mono text-[11px] text-white/20 uppercase tracking-[0.2em] mb-3">
          Réalisations
        </p>
        <div className="flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Projets
          </h2>
          <a
            href="https://github.com/EthanCathebras"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] text-white/20 hover:text-white/50 transition-colors"
          >
            <Github size={11} />
            Tous les dépôts
          </a>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

    </section>
  )
}
