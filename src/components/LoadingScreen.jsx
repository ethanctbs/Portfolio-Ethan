import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const MESSAGES = [
  'Initialisation du système...',
  'Chargement du profil de Ethan Cathebras...',
  'Compilation des projets...',
  'Vérification des connexions...',
  'Prêt.',
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const DURATION = 2600
    const TICK = 20
    const step = 100 / (DURATION / TICK)

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + step, 100)
        if (next >= 100) {
          clearInterval(progressTimer)
          setTimeout(onComplete, 450)
        }
        return next
      })
    }, TICK)

    const msgInterval = Math.floor(DURATION / MESSAGES.length)
    let count = 0
    const msgTimer = setInterval(() => {
      count += 1
      if (count >= MESSAGES.length) clearInterval(msgTimer)
      setMsgIdx(i => Math.min(i + 1, MESSAGES.length - 1))
    }, msgInterval)

    return () => {
      clearInterval(progressTimer)
      clearInterval(msgTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs text-slate-400 uppercase tracking-[0.3em]">
            Portfolio
          </p>
          <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Ethan <span className="text-blue-600">Cathebras</span>
          </div>
        </div>

        <div className="w-64 md:w-80">
          <div className="h-px w-full rounded-full overflow-hidden bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <motion.span
              key={msgIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xs text-slate-400 truncate"
            >
              {MESSAGES[msgIdx]}
            </motion.span>
            <span className="font-mono text-xs text-slate-300 shrink-0">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
