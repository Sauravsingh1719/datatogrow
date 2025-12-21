'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
// Ensure you have these UI components or remove/replace if not needed
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Github, 
  Database, 
  Terminal, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Target, 
  FlaskConical, 
  PieChart, 
  Presentation, 
  Truck, 
  Workflow, 
  Server, 
  FileSpreadsheet,
  MessageSquare,
  Flag,
  Zap
} from 'lucide-react'

const businessData = [
  { 
    name: 'Business & Product Analytics', 
    description: 'Specialized in food delivery, logistics, and marketplaces. Analyzing market fit and operational efficiency.',
    icon: TrendingUp 
  },
  { 
    name: 'Experiment Design & A/B Testing', 
    description: 'End-to-end testing for pricing, promos, loyalty programs, and subscription models to drive lift.',
    icon: FlaskConical 
  },
  { 
    name: 'Funnel & Cohort Analysis', 
    description: 'Deep dive into user activation, retention loops, and churn prevention strategies.',
    icon: Users 
  },
  { 
    name: 'Customer & Loyalty Analytics', 
    description: 'RFM modeling, user segmentation, and identifying key drivers for Customer Lifetime Value (CLV).',
    icon: PieChart 
  },
  { 
    name: 'Operational Analytics', 
    description: 'Monitoring order delays, cancellations, and contact center performance to optimize logistics.',
    icon: Truck 
  },
  { 
    name: 'Defining KPIs & Frameworks', 
    description: 'Establishing North-Star metrics and supporting KPI trees to align teams on success.',
    icon: Target 
  },
  { 
    name: 'Storytelling & Decision Support', 
    description: 'Creating executive decks, summaries, and dashboards that drive C-suite decision making.',
    icon: Presentation 
  },
]

const toolsData = [
  { 
    name: 'SQL (Redshift, ClickHouse, PG)', 
    description: 'Built 20+ analytical data marts. Expert in complex joins, window functions, and performance tuning.',
    icon: Database,
    link: 'https://github.com/vikram1840/Sql-Data-Analysis',
    // We pass the component itself here
    LinkIcon: Github 
  },
  { 
    name: 'Python (Pandas, NumPy)', 
    description: 'Automated reporting scripts and performed ad-hoc statistical analysis using Scikit-learn.',
    icon: Terminal,
    link: 'https://github.com/vikram1840/Python-Data-Analysis',
    LinkIcon: Github 
  },
  { 
    name: 'BI / Visualization', 
    description: 'Superset & Tableau development. Designed interactive dashboards for real-time operational monitoring.',
    icon: PieChart,
    link: 'https://public.tableau.com/app/profile/vikram.kumar2253/vizzes',
    // We pass the string path to the image in the public folder here
    LinkIcon: '/tableau.png' 
  },
  { 
    name: 'Modeling & Pipelines', 
    description: 'Experience with dbt for transformation and Airflow for orchestration of data workflows.',
    icon: Workflow 
  },
  { 
    name: 'Cloud & Infrastructure', 
    description: 'AWS (S3, Redshift) management, handling JSON data structures, and basic geospatial analysis.',
    icon: Server 
  },
  { 
    name: 'Advanced Excel & Git', 
    description: 'Complex financial modeling in Excel and version control for analytical codebases.',
    icon: FileSpreadsheet 
  },
]

const leadershipData = [
  { 
    name: 'Leading Initiatives', 
    description: 'Owning the analytics roadmap and translating abstract business problems into concrete analytical plans.',
    icon: Flag 
  },
  { 
    name: 'Mentorship', 
    description: 'Guiding junior analysts on query optimization, dashboard best practices, and metric design.',
    icon: Users 
  },
  { 
    name: 'Cross-Functional Partnership', 
    description: 'Bridging the gap between Product, Operations, Finance, and Marketing stakeholders.',
    icon: Workflow 
  },
  { 
    name: 'Executive Communication', 
    description: 'Presenting complex insights to non-technical C-level stakeholders with clarity and impact.',
    icon: MessageSquare 
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const SkillCard = ({ item, index }: any) => {
    // Extract the customized icon for the link
    const { LinkIcon } = item;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.05 }}
        className="h-full"
      >
        <div className="h-full p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group">
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <item.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {item.name}
              </h3>
            </div>
            
            {/* DYNAMIC LINK ICON LOGIC */}
            {item.link && LinkIcon && (
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-slate-900 transition-colors flex items-center justify-center"
              >
                {/* Check if LinkIcon is a string (image path) or a Component (Lucide Icon) */}
                {typeof LinkIcon === 'string' ? (
                  <img 
                    src={LinkIcon} 
                    alt={`${item.name} link`} 
                    className="w-[18px] h-[18px] object-contain opacity-60 hover:opacity-100 transition-opacity" 
                  />
                ) : (
                  <LinkIcon size={18} />
                )}
              </a>
            )}
          </div>
          
          <p className="text-sm text-slate-600 leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="skills" ref={ref} className="py-20 lg:py-24 relative overflow-hidden bg-slate-50/50">
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold tracking-wide text-slate-600 shadow-sm mb-4">
                <Zap size={14} className="text-blue-600" />
                Skills & Tools
             </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              Expertise 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900"> Matrix</span>
              
              </h2>
            <p className="text-slate-600 mt-3 text-lg font-light max-w-xl">
              Strategic frameworks, technical stack, and leadership capabilities honed over 15+ years.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
             <a 
               href="https://github.com/vikram1840" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
             >
                <Github size={16} className="mr-2" />
                View Code Repos
             </a>
          </motion.div>
        </div>

        <Tabs defaultValue="business" className="w-full">
          
          <div className="mb-10 overflow-x-auto pb-2 scrollbar-hide">
            <TabsList className="bg-white p-1.5 h-auto inline-flex rounded-xl border border-slate-200 shadow-sm">
              {['business', 'tools', 'leadership'].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="px-6 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all capitalize"
                >
                  {tab === 'business' ? 'Business & Analytics' : tab === 'tools' ? 'Tools & Tech' : 'Leadership'}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="business" className="mt-0 focus-visible:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessData.map((skill, index) => (
                <SkillCard key={index} item={skill} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="mt-0 focus-visible:outline-none">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsData.map((skill, index) => (
                <SkillCard key={index} item={skill} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leadership" className="mt-0 focus-visible:outline-none">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {leadershipData.map((item, index) => (
                <SkillCard key={index} item={item} index={index} />
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </section>
  )
}