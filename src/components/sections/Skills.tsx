// components/sections/Skills.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const skillData = [
  { name: 'Python', value: 95, category: 'Programming' },
  { name: 'SQL', value: 90, category: 'Database' },
  { name: 'Tableau', value: 92, category: 'Visualization' },
  { name: 'Power BI', value: 88, category: 'Visualization' },
  { name: 'R', value: 85, category: 'Programming' },
  { name: 'Excel', value: 95, category: 'Tools' },
  { name: 'Machine Learning', value: 82, category: 'Advanced' },
  { name: 'AWS', value: 78, category: 'Cloud' },
]

const categoryData = [
  { name: 'Programming', value: 90 },
  { name: 'Visualization', value: 90 },
  { name: 'Database', value: 88 },
  { name: 'Tools', value: 85 },
  { name: 'Advanced', value: 82 },
  { name: 'Cloud', value: 78 },
]

const COLORS = ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState('technical')

  return (
    <section id="skills" ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
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
              {skillData.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                        <span className="text-2xl font-bold text-blue-600">{skill.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.value}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{skill.category}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Skill Proficiency</CardTitle>
                  <CardDescription>Detailed breakdown of technical skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={skillData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Skill Categories</CardTitle>
                  <CardDescription>Distribution across different domains</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}