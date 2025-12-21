'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Calendar, Building2, User } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const experience = [
    {
      period: 'Sept 2021 – Present',
      role: 'Senior Data Analyst',
      company: 'ARAM MEEM Ltd (ToYou) - Cyprus',
      description: 'Drive the customer experience analytics for a large-scale food-delivery business, defining CX and retention KPIs and building decision-ready dashboards for product, operations, sales and finance teams.'
    },
    {
      period: 'Jan 2015 – Aug 2021',
      role: 'Senior BI Developer',
      company: 'Amdocs Ltd - Cyprus',
      description: 'Led a team of 10 BI analysts and migrated 250+ enterprise reports to cloud infrastructure, significantly improving speed, scalability, and data governance.'
    },
    {
      period: 'Sept 2010 – Jan 2015',
      role: 'Network Analyst',
      company: 'Telecom - Bangalore, India',
      description: 'Assisted in building automated dashboards and maintaining large-scale SQL databases for network optimization.'
    }
  ]

  return (
    <section id="about" ref={ref} className="relative py-20 lg:py-24 overflow-hidden bg-white">
      {}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 to-transparent opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          
          {}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8 md:mb-10"
            >
              {}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold tracking-wide text-slate-600 shadow-sm mb-6">
                <User size={14} className="text-blue-600" />
                About Me
              </div>
              
              {}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.15]">
                Transforming chaos into <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900">
                  clear decisions.
                </span>
              </h2>
              
              {}
              <div className="space-y-6 text-black text-base md:text-lg leading-relaxed font-normal">
                <p>
                  I’m Vikram Kumar, a Senior Data Analyst with 15+ years of experience helping teams make better decisions with data. I specialize in taking vague business questions—like “Why is churn increasing?” or “Where are we leaking margin?”—and turning them into decision frameworks.

                </p>

                <p>
            I support a large-scale delivery business by building reliable KPI foundations and decision-ready dashboards used by Operations, Finance, Sales and CX team. My focus is always the same:<span className="font-medium text-slate-900"> improve customer experience, optimize operational cost, and grow sustainable revenue.</span>

                </p>
              </div>
            </motion.div>
          </div>

          {}
          <div className="relative lg:pt-2">
             <motion.h3 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2"
              >
                <Briefcase className="text-blue-600" size={20} />
                Professional Journey
              </motion.h3>

              <div className="relative border-l border-slate-200 ml-3 space-y-8">
                {experience.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                    className="relative pl-8 group"
                  >
                    {}
                    <span 
                      className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-white border-2 border-blue-600 group-hover:scale-125 transition-transform duration-300" 
                    />
                    
                    {}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                        <h4 className="text-lg font-bold text-slate-900">{item.role}</h4>
                        <span className="inline-flex items-center text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-200 w-fit shrink-0">
                          <Calendar size={12} className="mr-1.5" />
                          {item.period}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm font-medium text-blue-600 mb-3">
                        <Building2 size={14} className="mr-1.5" />
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

        </motion.div>
      </div>
    </section>
  )
}