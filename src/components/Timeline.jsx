import { motion } from 'framer-motion'

const EVENTS = [
  {
    date: 'Avant 2022',
    title: 'Collège Gabriel Péri',
    subtitle: 'Gardanne',
    description: 'Premières années de formation et découverte des outils numériques.',
    tag: 'Scolarité',
    tagClass: 'text-slate-400',
    dotClass: 'bg-slate-400',
    current: false,
  },
  {
    date: '2022 – 2025',
    title: 'Lycée Marie Madeleine Fourcade',
    subtitle: 'Bac STI2D — Spécialité SIN',
    description: 'Spécialisation en Systèmes d\'Information et Numérique. Apprentissage des bases de l\'informatique, des réseaux et de l\'électronique.',
    tag: 'Formation',
    tagClass: 'text-blue-500',
    dotClass: 'bg-blue-500',
    current: false,
  },
  {
    date: '2025 (Été)',
    title: 'Agent en blanchisserie — APHM',
    subtitle: 'Marseille',
    description: 'Expérience professionnelle au sein de l\'Assistance Publique - Hôpitaux de Marseille. Développement de la rigueur et du travail en équipe dans une grande structure.',
    tag: 'Expérience',
    tagClass: 'text-emerald-500',
    dotClass: 'bg-emerald-500',
    current: false,
  },
  {
    date: 'Sept. 2025 – Présent',
    title: 'Epitech Marseille',
    subtitle: '1ère année — Promo 2028',
    description: 'Formation d\'Expert en Technologies de l\'Information. Focus sur l\'IA, la Cyber-sécurité et le développement Full-Stack.',
    tag: 'En cours',
    tagClass: 'text-indigo-500',
    dotClass: 'bg-indigo-500',
    current: true,
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
}

const DATE_H   = 44
const DOT_R    = 6
const LINE_TOP = DATE_H + DOT_R // 50 px

export default function Timeline() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* ── Mobile: vertical list ── */}
      <div className="md:hidden space-y-5">
        {EVENTS.map((event, i) => (
          <motion.div key={i} variants={itemVariants} className="flex gap-4">
            <div className="flex flex-col items-center pt-0.5 shrink-0">
              {event.current && (
                <span className={`absolute w-3 h-3 rounded-full animate-ping opacity-40 ${event.dotClass}`} />
              )}
              <div className={`w-2.5 h-2.5 rounded-full border-2 border-white shrink-0 ${event.dotClass}`} />
              {i < EVENTS.length - 1 && (
                <div className="w-px flex-1 bg-slate-200 mt-1.5" />
              )}
            </div>
            <div className="pb-4 min-w-0">
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">
                {event.date}
              </p>
              <p className={`font-mono text-[10px] font-semibold uppercase tracking-widest mb-1 ${event.tagClass}`}>
                {event.tag}
              </p>
              <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                {event.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-1">{event.subtitle}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Desktop: horizontal frise ── */}
      <div className="hidden md:block relative">
        {/* Horizontal line centered on dots */}
        <div
          className="absolute left-0 right-0 h-px bg-slate-200 pointer-events-none"
          style={{ top: LINE_TOP }}
        />

        <div className="flex w-full">
          {EVENTS.map((event, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`flex-1 min-w-0 flex flex-col ${i < EVENTS.length - 1 ? 'pr-8' : ''}`}
            >
              {/* Date above line */}
              <div className="flex items-end pb-2" style={{ height: DATE_H }}>
                <p className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">
                  {event.date}
                </p>
              </div>

              {/* Dot on line */}
              <div className="relative mb-5">
                {event.current && (
                  <span className="absolute -top-[2px] -left-[2px] block w-4 h-4 rounded-full bg-indigo-400/25 animate-ping" />
                )}
                <span
                  className={`block w-3 h-3 rounded-full border-2 ${event.dotClass}`}
                  style={{ borderColor: '#ffffff' }}
                />
              </div>

              {/* Content below line */}
              <p className={`font-mono text-[10px] font-semibold uppercase tracking-widest mb-1.5 ${event.tagClass}`}>
                {event.tag}
              </p>
              <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                {event.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-1.5">
                {event.subtitle}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
