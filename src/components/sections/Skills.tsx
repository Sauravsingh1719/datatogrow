'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Github, Code, Database, Eye, Cpu, Server, Terminal, ArrowRight } from 'lucide-react'

const skillData = [
  { 
    name: 'Python', 
    category: 'Programming',
    githubUrl: 'https://github.com/yourusername/python-projects',
    description: 'Auto-EDA pipelines & ML algorithms',
    icon: Terminal
  },
  { 
    name: 'SQL', 
    category: 'Database',
    githubUrl: 'https://github.com/yourusername/sql-queries',
    description: 'Complex querying, warehousing & optimization',
    icon: Database
  },
  { 
    name: 'Tableau', 
    category: 'Visualization',
    githubUrl: 'https://github.com/yourusername/tableau-dashboards',
    description: 'Interactive BI dashboards & storytelling',
    icon: Eye
  },
  { 
    name: 'Power BI', 
    category: 'Visualization',
    githubUrl: 'https://github.com/yourusername/powerbi-reports',
    description: 'DAX, Power Query & Enterprise reporting',
    icon: Eye
  },
  { 
    name: 'R Stats', 
    category: 'Analysis',
    githubUrl: 'https://github.com/yourusername/r-statistics',
    description: 'Statistical modeling & data visualization',
    icon: Code
  },
  { 
    name: 'Excel/VBA', 
    category: 'Tools',
    githubUrl: 'https://github.com/yourusername/excel-macros',
    description: 'Advanced Modeling, Macros & Automation',
    icon: Cpu
  },
  { 
    name: 'Machine Learning', 
    category: 'Advanced',
    githubUrl: 'https://github.com/yourusername/ml-models',
    description: 'Predictive modeling & SciKit-Learn',
    icon: Cpu
  },
  { 
    name: 'AWS Cloud', 
    category: 'Infrastructure',
    githubUrl: 'https://github.com/yourusername/aws-deployments',
    description: 'S3, Redshift & Data Pipelines',
    icon: Server
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="skills" ref={ref} className="py-12 relative overflow-hidden bg-slate-50">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
         <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-multiply" />
         <div className="absolute left-0 bottom-0 h-[500px] w-[500px] bg-indigo-500/10 blur-[100px] rounded-full mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900">Technical Arsenal</h2>
            {/* Mobile Swipe Hint */}
            <p className="text-xs text-blue-600 font-medium mt-1 md:hidden flex items-center gap-1">
              Swipe to explore <ArrowRight size={10} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
             <Button variant="outline" size="sm" className="gap-2 border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-colors bg-white h-9" asChild>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <Github size={14} />
                  <span className="hidden sm:inline">View Full Profile</span>
                  <span className="sm:hidden">GitHub</span>
                </a>
             </Button>
          </motion.div>
        </div>

        {/* RESPONSIVE LAYOUT CONTAINER:
            Mobile: Flexbox + Overflow-X (Horizontal Scroll)
            Desktop: Grid Layout
        */}
        <div className="
          flex overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide 
          md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0
        ">
          {skillData.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.05 }}
                // Mobile: Set fixed width (85% of screen) to encourage peeking
                className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 mr-4 md:mr-0 snap-center first:pl-0 last:pr-6"
              >
                <Card className="h-full border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 bg-white group">
                  <CardContent className="p-4">
                    
                    {/* SINGLE ROW HEADER */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm leading-none mb-1">{skill.name}</h4>
                          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      {skill.githubUrl && (
                        <a 
                          href={skill.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-all duration-200"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed pl-[44px]">
                      {skill.description}
                    </p>

                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}