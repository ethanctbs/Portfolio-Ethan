import { motion } from 'framer-motion'
import { Mail, Download, Github, Linkedin } from 'lucide-react'

export default function Q4Contact() {
  return (
    /*
     * Ce quadrant est le CTA principal — son hover est le plus marqué :
     * une teinte bleue plus prononcée (0.08 au lieu de 0.04)
     * pour signifier "c'est ici qu'on agit".
     * group : appliqué ici pour que les enfants réagissent au hover du parent.
     */
    <motion.div
      whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.08)' }}
      transition={{ duration: 0.35 }}
      className="group h-full flex flex-col justify-between p-10 md:p-14"
    >

      {/* ══ En-tête ══ */}
      <span className="font-mono text-white/20 text-xs tracking-widest">
        04 / CONTACT
      </span>

      {/*
       * MESSAGE MASSIF — le cœur visuel du quadrant
       * Chaque ligne est un lien vers l'email.
       * group-hover:text-white : la couleur passe de semi-opaque à blanc
       * quand la souris est sur le quadrant (grâce au `group` sur le parent).
       */}
      <div>
        <a
          href="mailto:ethan.cathebras@epitech.eu"
          className="block"
          aria-label="Envoyer un email"
        >
          <h2
            className="font-black leading-[0.9] tracking-tighter text-white/20 group-hover:text-white transition-colors duration-500 cursor-pointer"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 7rem)' }}
          >
            <span className="block">DISONS</span>
            <span className="block">BONJOUR.</span>
          </h2>
        </a>

        {/* Email cliquable, discret */}
        <a
          href="mailto:ethan.cathebras@epitech.eu"
          className="inline-flex items-center gap-2 mt-6 text-xs font-mono text-white/25 hover:text-accent-400 border-b border-white/10 hover:border-accent-400 pb-0.5 transition-colors duration-200"
        >
          <Mail size={11} />
          ethan.cathebras@epitech.eu
        </a>
      </div>

      {/* ══ BAS : liens rapides ══ */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href="/CV-Ethan-Cathebras.pdf"
          download
          className="inline-flex items-center gap-1.5 text-xs font-mono text-white/20 hover:text-white border-b border-white/10 hover:border-white pb-0.5 transition-colors duration-200"
        >
          <Download size={11} />
          Télécharger le CV
        </a>

        <a
          href="https://github.com/EthanCathebras"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-white/20 hover:text-white transition-colors duration-200"
          aria-label="GitHub"
        >
          <Github size={13} />
          GitHub
        </a>

        <a
          href="https://linkedin.com/in/ethan-cathebras"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-white/20 hover:text-white transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <Linkedin size={13} />
          LinkedIn
        </a>
      </div>

    </motion.div>
  )
}
