'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { ExternalLink, Github, Loader2, Layers, ArrowRight, LineChart } from 'lucide-react'
import Autoplay from "embla-carousel-autoplay"
import { useRouter } from 'next/navigation'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"

interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
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
  
  const [api, setApi] = useState<CarouselApi>()
  const [scrollProgress, setScrollProgress] = useState(0)
  const router = useRouter()

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (!api) return

    const onScroll = () => {
      const progress = Math.max(0, Math.min(1, api.scrollProgress()))
      setScrollProgress(progress * 100)
    }

    api.on("scroll", onScroll)
    api.on("reInit", onScroll)

    return () => {
      api.off("scroll", onScroll)
      api.off("reInit", onScroll)
    }
  }, [api])

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
      <section className="py-20 bg-slate-50 min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-slate-900 animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Loading Projects...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-slate-50 min-h-[50vh] flex items-center justify-center">
        <div className="text-center px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">{error}</p>
          <button 
            onClick={fetchProjects}
            className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98]"
          >
            Retry Loading
          </button>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section className="py-20 bg-slate-50 min-h-[50vh] flex items-center justify-center">
        <div className="text-center px-6">
           <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
           <h2 className="text-xl font-bold text-slate-900 mb-2">No Projects Found</h2>
           <p className="text-slate-500">Check back later for new updates.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-14 lg:py-14 relative overflow-hidden bg-slate-50">
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold tracking-wide text-slate-600 shadow-sm mb-4">
               <Layers size={14} className="text-blue-600" />
               Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              Projects
            </h2>
            <p className="text-slate-600 mt-3 text-lg font-medium max-w-xl leading-relaxed">
              Real-world solutions delivering measurable business impact.
            </p>
          </div>
          
          <div className="md:hidden text-slate-400 text-sm flex items-center gap-2">
            <ArrowRight size={14} /> Swipe to explore
          </div>
        </motion.div>

        {}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 pb-4">
            {projects.map((project, index) => (
              <CarouselItem key={project._id} className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => router.push(`/projects/${project._id}`)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 flex flex-col h-full cursor-pointer"
                >
                  
                  {}
                  <div className="relative h-48 overflow-hidden bg-slate-900 border-b border-slate-200 shrink-0">
                    <div className="absolute inset-0 opacity-20">
                       <div className="absolute inset-0 bg-[linear-gradient(30deg,#ffffff_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.1]"></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/40"></div>

                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
                        <LineChart className="text-blue-400 w-10 h-10 mb-2 opacity-90" />
                      </div>
                      <span className="mt-3 text-[10px] font-medium tracking-widest text-slate-400 uppercase">Data Visualization</span>
                    </div>

                    {}
                    <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px] z-20">
                       {project.liveLink && project.liveLink !== '#' && (
                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white text-slate-900 p-3 rounded-full hover:scale-110 transition-transform shadow-lg hover:bg-blue-50"
                          title="View Live"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.githubLink && project.githubLink !== '#' && (
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-slate-800 text-white border border-slate-700 p-3 rounded-full hover:scale-110 transition-transform shadow-lg hover:bg-slate-700"
                          title="View Code"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    
                    {project.featured && (
                        <div className="absolute top-3 right-3 z-20 bg-blue-600/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white shadow-lg border border-white/10">
                          Featured
                        </div>
                    )}
                  </div>

                  {}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      {}
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="bg-slate-50 text-slate-600 border border-slate-100 px-2.5 py-1 rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="bg-slate-50 text-slate-400 border border-slate-100 px-2 py-1 rounded-md text-xs font-medium">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100">
                       <div className="space-y-2">
                        {project.results.slice(0, 2).map((result, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                            <span className="text-xs font-medium text-slate-700 leading-snug line-clamp-1">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex items-center justify-between mt-8">
             <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden mr-6 max-w-md hidden md:block">
                <div 
                  className="h-full bg-slate-900 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                />
             </div>

             <div className="flex gap-2 ml-auto">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 md:h-12 md:w-12 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm" />
                <CarouselNext className="static translate-y-0 h-10 w-10 md:h-12 md:w-12 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm" />
             </div>
          </div>

        </Carousel>

      </div>
    </section>
  )
}