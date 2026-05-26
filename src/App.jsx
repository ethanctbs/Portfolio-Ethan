import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import LandingPage from './components/LandingPage'
import MainLayout from './components/MainLayout'

export default function App() {
  const [phase, setPhase] = useState('loading')

  return (
    <AnimatePresence mode="wait">
      {phase === 'loading' && (
        <LoadingScreen key="loading" onComplete={() => setPhase('landing')} />
      )}
      {phase === 'landing' && (
        <LandingPage key="landing" onEnter={() => setPhase('portfolio')} />
      )}
      {phase === 'portfolio' && (
        <MainLayout key="portfolio" />
      )}
    </AnimatePresence>
  )
}
