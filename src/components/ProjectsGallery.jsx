import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'

const N = projects.length

const STATUS_STYLES = {
  'Terminé':          'border-emerald-200 bg-emerald-50 text-emerald-700',
  'Stable':           'border-emerald-200 bg-emerald-50 text-emerald-700',
  'En cours de V2':   'border-blue-200 bg-blue-50 text-blue-700',
  'Phase 1 terminée': 'border-amber-200 bg-amber-50 text-amber-700',
}

/* Stack positions — index 0 = front card */
function stackPos(i) {
  const sign = i % 2 === 0 ? 1 : -1
  return {
    x: sign * i * 3,
    y: i * 7,
    rotate: sign * (i + 1) * 1.8,
    scale: 1 - i * 0.03,
  }
}

/* Fan-out positions — wide parabolic arc */
function fanPos(i) {
  const off = i - (N - 1) / 2
  return {
    x: off * 155,
    y: Math.pow(off, 2) * 14,
    rotate: off * 11,
    scale: 1,
  }
}

/* Compact face shown on the card in the stack / fan */
function CardFace({ project, index }) {
  const statusStyle = STATUS_STYLES[project.status] ?? 'border-slate-200 bg-slate-50 text-slate-600'
  return (
    <div className="flex flex-col h-full p-7">
      <div className="flex items-start justify-between mb-auto">
        <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex flex-col items-end gap-1.5">
          <span className="font-mono text-[10px] text-slate-400 text-right leading-tight max-w-[110px]">
            {project.category}
          </span>
          <span className={`font-mono text-[9px] font-medium rounded-full px-1.5 py-0.5 border ${statusStyle}`}>
            {project.status}
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-xl tracking-tight leading-snug mb-2">
          {project.title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {project.shortDesc}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.techs.slice(0, 3).map(tech => (
            <span
              key={tech}
              className="font-mono text-[10px] text-slate-500 border border-slate-200
                         bg-slate-50 rounded-full px-2 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* Full detail shown in the expanded overlay */
function ExpandedContent({ project, onClose }) {
  const statusStyle = STATUS_STYLES[project.status] ?? 'border-slate-200 bg-slate-50 text-slate-600'
  return (
    <div className="p-7 md:p-9 relative">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-slate-200
                   bg-slate-50 flex items-center justify-center
                   text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
      >
        <X size={16} />
      </button>

      <div className="flex items-center gap-3 mb-6 pr-16 flex-wrap">
        <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">
          {project.category}
        </p>
        <span className={`font-mono text-[10px] font-medium rounded-full px-2.5 py-0.5 border ${statusStyle}`}>
          {project.status}
        </span>
      </div>

      <h3
        className="font-black text-slate-900 tracking-tighter leading-none mb-5"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        {project.title}
      </h3>

      <p className="text-lg text-slate-600 font-medium mb-4">
        {project.shortDesc}
      </p>

      <p className="text-base text-slate-500 leading-relaxed mb-6 max-w-3xl">
        {project.longDesc}
      </p>

      <div className="flex items-center gap-6 flex-wrap mb-10 py-4 border-y border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
          <span className="text-sm text-slate-500">{project.metric}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
          <span className="font-mono text-xs text-slate-400">{project.period}</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          {project.techs.map(tech => (
            <span
              key={tech}
              className="font-mono text-xs text-slate-500 border border-slate-200
                         bg-slate-50 rounded-full px-3 py-1.5"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium
                     text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Github size={14} />
          Voir sur GitHub
          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  )
}

export default function ProjectsGallery() {
  const [selected, setSelected] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const selectedProject = projects.find(p => p.id === selected) ?? null

  function open(id) { setSelected(id) }
  function close() { setSelected(null); setIsHovered(false); setHoveredCard(null) }

  return (
    <div className="relative">

      {/* ── MOBILE: scrollable vertical list ── */}
      {isMobile && (
        <div className="space-y-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              layoutId={`proj-card-${project.id}`}
              onClick={() => open(project.id)}
              className="cursor-pointer bg-white border border-slate-200 rounded-2xl
                         shadow-sm active:shadow-md transition-shadow"
              style={{ height: 148 }}
            >
              <CardFace project={project} index={i} />
            </motion.div>
          ))}
        </div>
      )}

      {/* ── DESKTOP: stacked → fan on hover ── */}
      {!isMobile && (
        <>
          <div
            className="relative flex items-start justify-center overflow-visible"
            style={{ height: 540 }}
            onMouseEnter={() => { if (!selected) setIsHovered(true) }}
            onMouseLeave={() => { if (!selected) { setIsHovered(false); setHoveredCard(null) } }}
          >
            {/* Ghost cards */}
            {[2, 1, 0].map(i => (
              <div
                key={`ghost-${i}`}
                className="absolute top-8 pointer-events-none rounded-3xl border border-slate-200 bg-slate-50"
                style={{
                  width: 272,
                  height: 380,
                  opacity: 0.28 - i * 0.08,
                  transform: `translateX(${(3 - i) * 5}px) translateY(${N * 7 + 8 + (3 - i) * 7}px) rotate(${((3 - i) % 2 === 0 ? 1 : -1) * (3 - i) * 1.5}deg)`,
                }}
              />
            ))}

            {/* Real cards */}
            {projects.map((project, i) => {
              const pos = isHovered ? fanPos(i) : stackPos(i)
              const isSelected = selected === project.id

              return (
                <motion.div
                  key={project.id}
                  layoutId={`proj-card-${project.id}`}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    rotate: pos.rotate,
                    scale: pos.scale,
                    opacity: isHovered && hoveredCard && hoveredCard !== project.id && !isSelected
                      ? 0.45
                      : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  whileHover={
                    isHovered && !isSelected
                      ? {
                          y: pos.y - 38,
                          scale: 1.09,
                          boxShadow: '0 24px 48px rgba(0,0,0,0.13)',
                          transition: { type: 'spring', stiffness: 400, damping: 22 },
                        }
                      : {}
                  }
                  onHoverStart={() => { if (isHovered && !isSelected) setHoveredCard(project.id) }}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => { if (!isSelected) open(project.id) }}
                  className={`absolute top-8 select-none bg-white border border-slate-200 rounded-3xl
                              ${isSelected ? 'pointer-events-none' : 'cursor-pointer'}`}
                  style={{
                    width: 272,
                    height: 380,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                    zIndex: hoveredCard === project.id ? 20 : (isHovered ? i + 1 : N - i),
                  }}
                >
                  <CardFace project={project} index={i} />
                </motion.div>
              )
            })}
          </div>

          {/* Hint */}
          <motion.p
            animate={{ opacity: isHovered || selected ? 0 : 0.65 }}
            transition={{ duration: 0.2 }}
            className="text-center font-mono text-xs text-slate-400 mt-4 pointer-events-none"
          >
            Survolez pour explorer · Cliquez pour voir les détails
          </motion.p>
        </>
      )}

      {/* ── Overlay ── */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-slate-900/10"
              onClick={close}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                key={`expanded-${selectedProject.id}`}
                layoutId={`proj-card-${selectedProject.id}`}
                transition={{ type: 'spring', stiffness: 240, damping: 30 }}
                className="pointer-events-auto w-full max-w-2xl max-h-[88vh] overflow-y-auto
                           bg-white border border-slate-200 rounded-3xl shadow-2xl"
              >
                <ExpandedContent project={selectedProject} onClose={close} />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
