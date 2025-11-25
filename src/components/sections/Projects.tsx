'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github, BarChart3 } from 'lucide-react'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      title: 'E-commerce Sales Dashboard',
      description: 'Real-time sales analytics dashboard that increased conversion rate by 28% through actionable insights.',
      image: '/api/placeholder/600/400',
      technologies: ['Tableau', 'Python', 'SQL', 'AWS'],
      results: ['28% increase in conversion', '15% reduction in cart abandonment', 'Real-time inventory tracking'],
      liveLink: '#',
      githubLink: '#'
    },
    {
      title: 'Customer Churn Prediction',
      description: 'Machine learning model that predicts customer churn with 94% accuracy, saving $2M annually.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
      results: ['94% prediction accuracy', '$2M annual savings', '30% improvement in retention'],
      liveLink: '#',
      githubLink: '#'
    },
    {
      title: 'Supply Chain Optimization',
      description: 'Data-driven optimization model that reduced logistics costs by 22% and improved delivery times.',
      image: '/api/placeholder/600/400',
      technologies: ['R', 'Power BI', 'Azure', 'SQL Server'],
      results: ['22% cost reduction', '18% faster delivery', '99.8% on-time rate'],
      liveLink: '#',
      githubLink: '#'
    }
  ]

  return (
    <section id="projects" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  <BarChart3 size={64} className="text-white" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors">
                    <ExternalLink size={20} />
                  </button>
                  <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors">
                    <Github size={20} />
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="space-y-2">
                  {project.results.map((result, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {result}
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