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
      transition={{ duration: 0.5, delay: 0.2 }}
      className="min-h-screen"
    >
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Testimonials />
      <ContactCTA />
    </motion.div>
  )
}