import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Send, Download } from 'lucide-react'

export default function SectionContact() {
  /* Champs du formulaire — contrôlés par React */
  const [name,    setName]    = useState('')
  const [message, setMessage] = useState('')
  const [sent,    setSent]    = useState(false)

  /*
   * handleSend : ouvre le client mail avec le sujet et le corps pré-remplis.
   * encodeURIComponent() transforme les caractères spéciaux (espaces, accents)
   * en URL valide pour le lien mailto:.
   */
  const handleSend = (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    const subject = encodeURIComponent(`Portfolio — ${name}`)
    const body    = encodeURIComponent(message)
    window.open(`mailto:ethan.cathebras@epitech.eu?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="h-full overflow-y-auto flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xl">

        {/* ══════════════════════════════════════
            FENÊTRE TERMINAL
            ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="module-card overflow-hidden"
        >
          {/* Barre de titre */}
          <div className="flex items-center gap-2 px-4 h-9 border-b border-white/8 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/55" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/55" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/55" />
            </div>
            <span className="ml-3 font-mono text-[11px] text-white/20">contact.sh</span>
          </div>

          {/* Corps du terminal */}
          <div className="p-6 font-mono space-y-5">

            {/* Commande d'initialisation */}
            <div>
              <p className="text-white/25 text-xs">$ ./contact.sh --init</p>
              <p className="text-white/40 text-xs mt-1 pl-3">
                &gt; Connexion avec ethan.cathebras@epitech.eu...{' '}
                <span className="text-emerald-400">OK</span>
              </p>
            </div>

            {/* Formulaire stylisé en terminal */}
            <form onSubmit={handleSend} className="space-y-4">

              {/* Champ prénom */}
              <div className="space-y-1.5">
                <label className="text-white/25 text-xs">$ identify_sender</label>
                <div className="flex items-center gap-2 pl-3">
                  <span className="text-accent-400/60 text-xs flex-shrink-0">&gt;</span>
                  {/*
                   * Input sans bordure visible — seulement un border-b (underline).
                   * background: transparent → intégré au fond du terminal.
                   * focus:border-accent-400 : la ligne se colore à la saisie.
                   */}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="votre prénom"
                    className="flex-1 bg-transparent border-b border-white/15 focus:border-accent-400 outline-none text-sm text-white/70 placeholder:text-white/15 py-1 transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              {/* Champ message */}
              <div className="space-y-1.5">
                <label className="text-white/25 text-xs">$ compose_message</label>
                <div className="flex gap-2 pl-3">
                  <span className="text-accent-400/60 text-xs flex-shrink-0 mt-1.5">&gt;</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="votre message..."
                    rows={3}
                    className="flex-1 bg-transparent border-b border-white/15 focus:border-accent-400 outline-none text-sm text-white/70 placeholder:text-white/15 py-1 resize-none transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              {/* Bouton envoi */}
              <div className="pl-3">
                <p className="text-white/25 text-xs mb-2">$ send --execute</p>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    sent
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'btn-primary'
                  }`}
                >
                  <Send size={13} />
                  {sent ? 'Message envoyé ✓' : 'Envoyer le message'}
                </motion.button>
              </div>
            </form>

            {/* Séparateur */}
            <div className="border-t border-white/8 pt-4 space-y-2">
              <p className="text-white/20 text-xs">$ links --all</p>

              {/* Liens directs */}
              <div className="pl-3 space-y-2">
                {[
                  { label: 'email',    value: 'ethan.cathebras@epitech.eu', href: 'mailto:ethan.cathebras@epitech.eu', Icon: Mail     },
                  { label: 'github',   value: 'EthanCathebras',             href: 'https://github.com/EthanCathebras',          Icon: Github   },
                  { label: 'linkedin', value: 'ethan-cathebras',            href: 'https://linkedin.com/in/ethan-cathebras',    Icon: Linkedin },
                  { label: 'cv',       value: 'télécharger le PDF',         href: '/CV-Ethan-Cathebras.pdf',                    Icon: Download, download: true },
                ].map(({ label, value, href, Icon, download }) => (
                  <a
                    key={label}
                    href={href}
                    target={download ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    download={download}
                    className="flex items-center gap-3 text-xs group"
                  >
                    <span className="text-accent-400/50 w-16 flex-shrink-0">{label}</span>
                    <span className="text-white/25 group-hover:text-white/70 transition-colors duration-200 flex items-center gap-1.5">
                      <Icon size={11} />
                      {value}
                    </span>
                  </a>
                ))}
              </div>

              {/* Curseur clignotant */}
              <div className="flex items-center gap-1.5 text-white/15 pt-2">
                <span className="text-xs">$</span>
                <span className="w-2 h-3.5 bg-accent-400/45 animate-pulse rounded-sm" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
