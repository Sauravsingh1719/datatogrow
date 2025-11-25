'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Download, Calendar, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen pt-10 relative flex items-center justify-center overflow-hidden">
      {}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,64,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px] animate-pulse-slow" />
      </div>
      
      {}
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
          className="absolute top-1/4 left-10 w-6 h-6 bg-blue-500/20 rounded-full blur-sm"
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
          className="absolute top-1/3 right-20 w-8 h-8 bg-indigo-500/20 rounded-full blur-sm"
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
          className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-purple-500/20 rounded-full blur-sm"
        />
      </div>

          <div className='py-[5%]'>
      {}
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-lg"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">Available for new projects</span>
          </motion.div>

          {}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Data
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Intelligence
            </span>
            That Drives Growth
          </motion.h1>
          
          {}
          <motion.p 
            className="text-xl md:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Senior Data Analyst transforming complex datasets into <span className="font-semibold text-blue-600">actionable insights</span> that drive revenue growth and operational efficiency for forward-thinking companies.
          </motion.p>

          {}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 px-8 py-6 text-lg">
              <Download className="mr-2" size={20} />
              Download Resume
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 px-8 py-6 text-lg group">
              <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Watch Demo
            </Button>
          </motion.div>

          {}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { number: '50+', label: 'Projects Delivered', suffix: '' },
              { number: '35', label: 'Revenue Growth', suffix: '%' },
              { number: '98', label: 'Client Satisfaction', suffix: '%' },
              { number: '5', label: 'Years Experience', suffix: '+' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}<span className="text-blue-600">{stat.suffix}</span>
                </div>
                <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      </div>

      {}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm text-gray-500 font-medium">Scroll to explore</div>
          <ChevronDown size={24} className="text-gray-400" />
        </div>
      </motion.div>

      {}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
    </section>
  )
}