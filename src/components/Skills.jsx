import { motion } from 'framer-motion'
import { skillCategories } from '../data/skills'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const rowVariants = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
}

export default function Skills() {
  return (
    <section className="h-screen w-full flex flex-col justify-center px-8 md:px-20 lg:px-32">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mb-14"
      >
        <p className="font-mono text-[11px] text-white/20 uppercase tracking-[0.2em] mb-3">
          Compétences
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Stack technique
        </h2>
      </motion.div>

      {/* Category rows */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="space-y-0"
      >
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.label}
            variants={rowVariants}
            className="flex flex-col md:flex-row md:items-start gap-4 md:gap-0 py-7 border-b border-white/5 last:border-b-0"
          >
            {/* Category label */}
            <div className="md:w-36 flex-shrink-0">
              <span className={`font-mono text-[11px] uppercase tracking-[0.15em] ${cat.iconColor}`}>
                {cat.label}
              </span>
              <p className="font-mono text-[10px] text-white/15 mt-0.5">
                {cat.skills.length} techs
              </p>
            </div>

            {/* Skills as inline text list */}
            <div className="flex-1 flex flex-wrap gap-x-6 gap-y-2">
              {cat.skills.map((skill, j) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + j * 0.04 }}
                  className="text-[13px] text-white/50 hover:text-white/85 transition-colors duration-200 cursor-default font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Index */}
            <div className="hidden md:block md:w-12 text-right">
              <span className="font-mono text-[10px] text-white/10">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </section>
  )
}
