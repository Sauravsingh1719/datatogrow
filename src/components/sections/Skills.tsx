'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Code, Database, Eye, Cpu } from 'lucide-react'


const skillData = [
  { 
    name: 'Python', 
    value: 95, 
    category: 'Programming',
    githubUrl: 'https://github.com/yourusername/python-projects',
    description: 'Advanced data analysis, automation, and ML pipelines',
    icon: Code
  },
  { 
    name: 'SQL', 
    value: 90, 
    category: 'Database',
    githubUrl: 'https://github.com/yourusername/sql-queries',
    description: 'Complex queries, optimization, and database design',
    icon: Database
  },
  { 
    name: 'Tableau', 
    value: 92, 
    category: 'Visualization',
    githubUrl: 'https://github.com/yourusername/tableau-dashboards',
    description: 'Interactive dashboards and business intelligence',
    icon: Eye
  },
  { 
    name: 'Power BI', 
    value: 88, 
    category: 'Visualization',
    githubUrl: 'https://github.com/yourusername/powerbi-reports',
    description: 'DAX calculations and enterprise reporting',
    icon: Eye
  },
  { 
    name: 'R', 
    value: 85, 
    category: 'Programming',
    githubUrl: 'https://github.com/yourusername/r-statistics',
    description: 'Statistical analysis and data visualization',
    icon: Code
  },
  { 
    name: 'Excel', 
    value: 95, 
    category: 'Tools',
    githubUrl: 'https://github.com/yourusername/excel-macros',
    description: 'Advanced formulas, VBA, and data modeling',
    icon: Cpu
  },
  { 
    name: 'Machine Learning', 
    value: 82, 
    category: 'Advanced',
    githubUrl: 'https://github.com/yourusername/ml-models',
    description: 'Predictive models and algorithm implementation',
    icon: Cpu
  },
  { 
    name: 'AWS', 
    value: 78, 
    category: 'Cloud',
    githubUrl: 'https://github.com/yourusername/aws-deployments',
    description: 'Cloud infrastructure and data pipelines',
    icon: Database
  },
]



const COLORS = ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState('technical')

  return (
    <section id="skills" ref={ref} className="py-20 relative overflow-hidden bg-white">
      
      {/* Updated Background */}
      <div className="absolute inset-0 h-full w-full bg-white">
        {/* Circuit/connection lines pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="#3B82F6"/>
                <circle cx="50" cy="10" r="1.5" fill="#6366F1"/>
                <circle cx="10" cy="50" r="1.5" fill="#8B5CF6"/>
                <circle cx="50" cy="50" r="1.5" fill="#3B82F6"/>
                <line x1="10" y1="10" x2="50" y2="10" stroke="#3B82F6" strokeWidth="8.0"/>
                <line x1="10" y1="10" x2="10" y2="50" stroke="#3B82F6" strokeWidth="8.0"/>
                <line x1="10" y1="50" x2="50" y2="50" stroke="#6366F1" strokeWidth="8.0"/>
                <line x1="50" y1="10" x2="50" y2="50" stroke="#8B5CF6" strokeWidth="8.0"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-gradient-to-b from-blue-50/30 via-transparent to-transparent blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Expertise</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive skills in data analysis, visualization, and business intelligence
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12">
            <TabsTrigger value="technical" className="text-lg py-3">Technical Skills</TabsTrigger>
            <TabsTrigger value="analytics" className="text-lg py-3">Skill Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="technical" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillData.map((skill, index) => {
                const Icon = skill.icon
                
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <CardContent className="p-6">
                        {/* Skill Header with Icon and GitHub Link */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">{skill.name}</h3>
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                {skill.category}
                              </span>
                            </div>
                          </div>
                          
                          {/* GitHub Link Button */}
                          {skill.githubUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-70 hover:opacity-100 transition-opacity"
                              asChild
                            >
                              <a 
                                href={skill.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                <Github className="w-4 h-4" />
                                <span className="text-xs">Repo</span>
                              </a>
                            </Button>
                          )}
                        </div>

                        {/* Skill Description */}
                        <p className="text-sm text-gray-600 mb-4">
                          {skill.description}
                        </p>


                        {/* View Projects Button */}
                        {skill.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-4 group-hover:bg-blue-50 transition-colors"
                            asChild
                          >
                            <a 
                              href={skill.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2"
                            >
                              <Github className="w-4 h-4" />
                              View Projects
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-8">
              {/* Centered Skill Proficiency Chart */}
              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader className="text-center">
                      <CardTitle>Skill Proficiency Distribution</CardTitle>
                      <CardDescription>
                        Detailed breakdown of technical skills across different categories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={skillData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="name" 
                              angle={-45}
                              textAnchor="end"
                              height={60}
                              tick={{ fontSize: 12 }}
                            />
                            <YAxis 
                              label={{ 
                                value: 'Proficiency (%)', 
                                angle: -90, 
                                position: 'insideLeft',
                                offset: -10
                              }}
                            />
                            <Tooltip 
                              formatter={(value) => [`${value}%`, 'Proficiency']}
                              labelFormatter={(label) => `Skill: ${label}`}
                              contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                            <Legend />
                            <Bar 
                              dataKey="value" 
                              name="Skill Proficiency" 
                              fill="#3B82F6" 
                              radius={[4, 4, 0, 0]}
                              maxBarSize={50}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

             
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Explore My GitHub</h3>
                  <p className="text-gray-600">
                    Check out real-world projects, code samples, and implementations for each skill.
                    All repositories include detailed documentation and sample datasets.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-gray-900 hover:bg-black text-white px-8"
                  asChild
                >
                  <a 
                    href="https://github.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <Github className="w-5 h-5" />
                    Visit GitHub Profile
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}