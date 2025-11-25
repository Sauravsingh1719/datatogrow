// components/WelcomeScreen.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const [currentGreeting, setCurrentGreeting] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const greetings = [
    { text: 'Hi', language: 'English' },
    { text: 'Hola', language: 'Spanish' },
    { text: 'Namaste', language: 'Hindi' },
    { text: 'Bonjour', language: 'French' },
    { text: 'Konnichiwa', language: 'Japanese' },
    { text: 'Hello', language: 'English' }
  ]

  useEffect(() => {
    const greetingTimer = setInterval(() => {
      setCurrentGreeting((prev) => {
        if (prev === greetings.length - 1) {
          clearInterval(greetingTimer)
          setIsExiting(true)
          setTimeout(onComplete, 1000) // Wait for exit animation
          return prev
        }
        return prev + 1
      })
    }, 800) // Change greeting every 800ms

    return () => clearInterval(greetingTimer)
  }, [greetings.length, onComplete])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: '-100%',
            transition: { 
              duration: 1.2, 
              ease: [0.4, 0, 0.2, 1] 
            } 
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 left-10 w-6 h-6 bg-white/10 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                y: [0, 30, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-1/3 right-20 w-8 h-8 bg-purple-400/20 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-blue-400/20 rounded-full blur-sm"
            />
          </div>

          {/* Main Content */}
          <div className="text-center relative z-10">
            <motion.div
              key={currentGreeting}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4">
                {greetings[currentGreeting].text}
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-purple-200 font-light"
              >
                {greetings[currentGreeting].language}
              </motion.p>
            </motion.div>

            {/* Progress Dots */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center space-x-2 mt-12"
            >
              {greetings.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentGreeting ? 'bg-white' : 'bg-white/30'
                  }`}
                  animate={{
                    scale: index === currentGreeting ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}