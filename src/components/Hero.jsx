import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const item = {
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
}

export default function Hero() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center px-6 relative">

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-mono text-[11px] text-white/25 uppercase tracking-[0.2em] mb-10"
      >
        Portfolio · 2025
      </motion.p>

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="text-center space-y-3"
      >
        <motion.h1
          variants={item}
          className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-none"
        >
          Ethan Cathebras
        </motion.h1>

        <motion.p
          variants={item}
          className="font-mono text-[13px] text-white/35 tracking-wide"
        >
          Développeur Full-Stack · Epitech Marseille
        </motion.p>

        <motion.div
          variants={item}
          className="flex items-center justify-center gap-2 pt-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="font-mono text-[11px] text-white/25">
            Disponible · Stage / Alternance
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="flex items-center gap-6 mt-14"
      >
        <a
          href="https://github.com/EthanCathebras"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[12px] text-white/30 hover:text-white/70 transition-colors border-b border-white/10 hover:border-white/30 pb-px"
        >
          GitHub
        </a>
        <span className="text-white/10">·</span>
        <a
          href="mailto:ethan.cathebras@epitech.eu"
          className="font-mono text-[12px] text-white/30 hover:text-white/70 transition-colors border-b border-white/10 hover:border-white/30 pb-px"
        >
          Email
        </a>
        <span className="text-white/10">·</span>
        <a
          href="/CV-Ethan-Cathebras.pdf"
          download
          className="font-mono text-[12px] text-white/30 hover:text-accent-400 transition-colors border-b border-white/10 hover:border-accent-400/50 pb-px"
        >
          CV.pdf
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} className="text-white/15" />
        </motion.div>
      </motion.div>

    </section>
  )
}
