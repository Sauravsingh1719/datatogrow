// components/WelcomeWrapper.tsx
'use client'

import { useState, useEffect } from 'react'
import WelcomeScreen from './WelcomeScreen'

export default function WelcomeWrapper({ children }: { children: React.ReactNode }) {
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome')
    if (hasSeenWelcome) {
      setShowWelcome(false)
    } else {
      sessionStorage.setItem('hasSeenWelcome', 'true')
    }
  }, [])

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
  }

  return (
    <>
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      {!showWelcome && children}
    </>
  )
}