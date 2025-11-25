// components/sections/About.tsx
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
    <section id="about" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent" />
      </div>

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
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <TrendingUp size={16} />
                  About Me
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Transforming Data into <span className="text-blue-600">Business Value</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  I'm a passionate data analyst with over 5 years of experience helping companies 
                  make data-driven decisions. My expertise lies in transforming complex business 
                  problems into analytical frameworks and delivering insights that drive measurable results.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Competencies</h3>
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2 bg-gray-200">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
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
              {/* Feature Cards */}
              {[
                {
                  icon: Target,
                  title: 'Data-Driven Strategy',
                  description: 'Aligning analytics with business objectives'
                },
                {
                  icon: Award,
                  title: 'Certified Professional',
                  description: 'Advanced analytics certifications'
                },
                {
                  icon: Users,
                  title: 'Team Leadership',
                  description: 'Cross-functional team management'
                },
                {
                  icon: TrendingUp,
                  title: 'Growth Focused',
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
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <item.icon className="text-white" size={24} />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 -right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-20 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl" />
    </section>
  )
}