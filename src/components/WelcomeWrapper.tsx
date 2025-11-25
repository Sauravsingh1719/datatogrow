// components/WelcomeWrapper.tsx
'use client'

import { useState, useEffect } from 'react'
import WelcomeScreen from './WelcomeScreen'

export default function WelcomeWrapper({ children }: { children: React.ReactNode }) {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    // Small delay to ensure welcome screen animation completes before showing content
    setTimeout(() => setShowContent(true), 200)
  }

  // Optional: Skip welcome screen if returning visitor
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome')
    if (hasSeenWelcome) {
      setShowWelcome(false)
      setShowContent(true)
    } else {
      sessionStorage.setItem('hasSeenWelcome', 'true')
    }
  }, [])

  return (
    <>
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      {showContent && children}
    </>
  )
}