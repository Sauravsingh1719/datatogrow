'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ContactCTA() {
  return (
    <section id="contact" className="py-10 border-t border-gray-100 bg-white">
      <div className="container mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 max-w-5xl mx-auto"
        >
            
          {}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center justify-center md:justify-start gap-2 tracking-tight">
              Have an idea in mind?
              <Sparkles className="text-blue-500 w-5 h-5" />
            </h2>
            <p className="text-gray-500 text-base">
              Let's simplify the complex and transform your data into growth.
            </p>
          </div>

          {}
          <div className="flex-shrink-0">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-gray-900 text-white hover:bg-blue-600 transition-all duration-300 font-medium px-8 h-11 rounded-full shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                Let's Connect
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  )
}