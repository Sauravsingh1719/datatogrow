'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Target, Users, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skills = [
    { name: 'Data Analysis', level: 95 },
    { name: 'Statistical Modeling', level: 88 },
    { name: 'Data Visualization', level: 92 },
    { name: 'Machine Learning', level: 85 },
  ]

  return (
    <section id="about" ref={ref} className="relative py-20 overflow-hidden bg-white">
      
      {/* --- UPDATED BACKGROUND: Wave Pattern --- */}
      <div className="absolute inset-0 h-full w-full bg-white">
        {/* Subtle wave pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#3B82F6" strokeWidth="0.9"/>
                <path d="M0,70 Q25,90 50,70 T100,70" fill="none" stroke="#6366F1" strokeWidth="0.9"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
          </svg>
        </div>
        
        {/* Subtle gradient overlays */}
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] bg-gradient-to-br from-blue-100/20 to-indigo-100/10 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 h-[400px] w-[400px] bg-gradient-to-tr from-blue-50/20 to-transparent rounded-full blur-3xl" />
      </div>
      {/* --- END BACKGROUND --- */}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
                  <TrendingUp size={16} />
                  About Me
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Transforming Data into <span className="text-blue-600">Business Value</span>
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  I'm a passionate data analyst with over 5 years of experience helping companies 
                  make data-driven decisions. My expertise lies in transforming complex business 
                  problems into analytical frameworks and delivering insights that drive measurable results.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  I specialize in predictive modeling, data visualization, and building scalable 
                  analytics solutions that have helped clients achieve an average of <span className="font-semibold text-blue-600">35% revenue growth</span> 
                  and <span className="font-semibold text-blue-600">50% improvement</span> in operational efficiency.
                </p>
              </motion.div>

              {/* Skills Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Core Competencies</h3>
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2 bg-slate-100">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        style={{ width: isInView ? `${skill.level}%` : '0%' }}
                      />
                    </Progress>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                {
                  icon: Target,
                  title: 'Data Strategy',
                  description: 'Aligning analytics with business objectives'
                },
                {
                  icon: Award,
                  title: 'Certified Pro',
                  description: 'Advanced analytics certifications'
                },
                {
                  icon: Users,
                  title: 'Leadership',
                  description: 'Cross-functional team management'
                },
                {
                  icon: TrendingUp,
                  title: 'High Growth',
                  description: 'Results-oriented approach'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="h-full bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                    <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                      <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <item.icon size={24} />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2 leading-tight">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-snug">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}