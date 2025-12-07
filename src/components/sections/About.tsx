'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Briefcase, Calendar, Building2 } from 'lucide-react'
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

  const experience = [
    {
      period: '2023 - Present',
      role: 'Senior Data Analyst',
      company: 'TechFlow Analytics',
      description: 'Leading predictive modeling initiatives and optimizing data pipelines for enterprise clients.'
    },
    {
      period: '2021 - 2023',
      role: 'Data Analyst',
      company: 'Growth Metrics Inc.',
      description: 'Spearheaded customer behavior analysis resulting in a 20% increase in retention rates.'
    },
    {
      period: '2019 - 2021',
      role: 'Junior Analyst',
      company: 'DataStream Solutions',
      description: 'Assisted in building automated dashboards and maintaining large-scale SQL databases.'
    }
  ]

  return (
    <section id="about" ref={ref} className="relative py-20 overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-16">
            
            {}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                className="mb-10"
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
                  analytics solutions that have helped clients achieve an average of <span className="font-semibold text-blue-600">35% revenue growth</span>.
                </p>
              </motion.div>

              {}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Core Competencies</h3>
                {skills.map((skill) => (
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

            {}
            <div className="relative pl-6 lg:pl-10">
               <motion.h3 
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2"
              >
                <Briefcase className="text-blue-600" />
                Professional Journey
              </motion.h3>

              {}
              <div className="relative border-l-2 border-slate-200 ml-3 space-y-12">
                {experience.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.4 + (index * 0.2), duration: 0.5 }}
                    className="relative pl-8 group"
                  >
                    {}
                    <span 
                      className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white bg-blue-600 shadow-md group-hover:scale-125 group-hover:bg-blue-500 transition-all duration-300" 
                    />
                    
                    {}
                    <div className="bg-slate-50 hover:bg-white p-5 rounded-xl border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <h4 className="text-lg font-bold text-slate-900">{item.role}</h4>
                        <span className="inline-flex items-center text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                          <Calendar size={12} className="mr-1" />
                          {item.period}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm font-medium text-slate-700 mb-3">
                        <Building2 size={14} className="mr-1.5 text-slate-400" />
                        {item.company}
                      </div>
                      
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}