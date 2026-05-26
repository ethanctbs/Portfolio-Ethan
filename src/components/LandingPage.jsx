import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function LandingPage({ onEnter }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Subtle top gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(59,130,246,0.06), transparent)',
        }}
      />

      <div className="relative z-10 text-center px-6 select-none">
        <motion.h1
          className="font-black tracking-tighter leading-none text-slate-900 uppercase"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 11rem)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          ETHAN
          <br />
          <span className="text-blue-600">CATHEBRAS</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-base text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          Développeur Full-Stack · IA & Cyber-sécurité · Epitech Marseille · 1ère année
        </motion.p>

        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          whileHover={{ boxShadow: '0 0 0 2px rgba(59,130,246,0.25)' }}
          whileTap={{ scale: 0.97 }}
          className="mt-12 inline-flex items-center gap-3 px-8 py-4 rounded-full
                     border border-slate-200 text-slate-700 text-sm font-medium
                     hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
        >
          Entrer dans l'expérience
          <ArrowRight size={16} strokeWidth={2} />
        </motion.button>
      </div>

      <motion.p
        className="absolute bottom-8 font-mono text-xs text-slate-300 uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        2025 — Portfolio
      </motion.p>
    </motion.div>
  )
}
