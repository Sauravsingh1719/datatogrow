// app/page.tsx
'use client'
import { motion } from 'framer-motion'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Testimonials from '@/components/sections/Testimonials'
import ContactCTA from '@/components/sections/Contact'

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen"
    >
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <ContactCTA />
    </motion.div>
  )
}