'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ExternalLink, Github, BarChart3, Loader2 } from 'lucide-react'

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  results: string[];
  liveLink: string;
  githubLink: string;
  featured: boolean;
  category: string;
  order: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      } else {
        setError('Failed to load projects')
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      setError('Error loading projects')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="projects" className="py-20 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-20 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-red-600 mb-8">{error}</p>
          <button 
            onClick={fetchProjects}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600">No projects available yet.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-white">
      
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-world solutions delivering measurable business impact
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-slate-100"
            >
              {}
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  <BarChart3 size={64} className="text-white" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {project.liveLink && project.liveLink !== '#' && (
                    <a 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  {project.githubLink && project.githubLink !== '#' && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>

              {}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="flex-shrink-0 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 h-[4.5em]">
                  {project.description}
                </p>

                {}
                <div className="flex flex-wrap gap-2 mb-4 h-[32px] overflow-hidden">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs flex items-center">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {}
                <div className="space-y-2 border-t border-gray-100 pt-4">
                  {project.results.slice(0, 2).map((result, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="line-clamp-1">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}