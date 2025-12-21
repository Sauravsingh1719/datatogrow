'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { Calendar, ArrowLeft, Share2, Layers, ArrowRight, Github, ExternalLink, CheckCircle2, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  results: string[];
  liveLink: string;
  githubLink: string;
  imageUrl: string;
  featured: boolean;
  category: string;
  createdAt: string;
}

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  
  const [project, setProject] = useState<Project | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (params.id) {
      const loadData = async () => {
        setLoading(true)
        const currentProject = await fetchProject(params.id as string)
        if (currentProject) {
          await fetchRelatedProjects(currentProject.category, currentProject._id)
        }
        setLoading(false)
      }
      loadData()
    }
  }, [params.id])

  const fetchProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`)
      if (response.ok) {
        const data: Project = await response.json()
        setProject(data)
        return data
      } else {
        setError('Project not found.')
      }
    } catch (error) {
      console.error('Error fetching project:', error)
      setError('Error loading project.')
    }
    return null
  }

  const fetchRelatedProjects = async (category: string, currentId: string) => {
    try {
      const response = await fetch(`/api/projects?category=${encodeURIComponent(category)}`)
      if (response.ok) {
        const data = await response.json()
        const filtered = data.filter((p: Project) => p._id !== currentId).slice(0, 3)
        setRelatedProjects(filtered)
      }
    } catch (error) {
      console.error("Failed to load related projects", error)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project?.title,
        text: project?.shortDescription,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Loading Case Study...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="bg-slate-100 text-slate-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Layers size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Project Unavailable</h1>
          <p className="text-slate-500 mb-6 text-sm">{error || "We couldn't find the project you're looking for."}</p>
          <Button 
            onClick={() => router.push('/#projects')} 
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            Return to Portfolio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,#000000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-40"
        style={{ scaleX }}
      />

      {}
      <nav className="sticky top-17 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between max-w-4xl">
          <Link href="/#projects">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 -ml-2 gap-2"
            >
              <ArrowLeft size={18} />
              <span className="font-medium">Back to Projects</span>
            </Button>
          </Link>
          
          <div className="flex items-center gap-2">
            {project.liveLink && project.liveLink !== '#' && (
                 <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="hidden sm:flex text-blue-600 hover:bg-blue-50">
                        <ExternalLink size={16} className="mr-2"/> Visit Live
                    </Button>
                 </a>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              onClick={handleShare}
            >
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </nav>

      <main className="my-8 container mx-auto px-4 md:px-6 py-12 relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            
            <div className="p-8 md:p-12 lg:p-16 pb-0 md:pb-0 lg:pb-0">
                <div className="flex gap-2 mb-6">
                  {}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wide text-blue-700 uppercase">
                    <Layers size={12} />
                    {project.category}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-[1.15] tracking-tight">
                  {project.title}
                </h1>

                <p className="text-xl text-slate-500 mb-8 leading-relaxed font-light">
                  {project.shortDescription}
                </p>

                {}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 pt-8 pb-8 gap-4">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14}/>
                        {new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {project.liveLink && project.liveLink !== '#' && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                                <ExternalLink size={16} className="mr-2"/> Live Demo
                            </Button>
                        </a>
                    )}
                    {project.githubLink && project.githubLink !== '#' && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="rounded-full px-6 border-slate-300">
                                <Github size={16} className="mr-2"/> Source Code
                            </Button>
                        </a>
                    )}
                  </div>
                </div>
            </div>

            {}
            {project.imageUrl && project.imageUrl !== '/api/placeholder/600/400' && (
              <div className="w-full aspect-[16/9] relative bg-slate-100 border-y border-slate-100">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Tiptap HTML Content */}
            <div className="p-8 md:p-12 lg:p-16">
              <div 
                className="
                  prose prose-lg max-w-none 
                  prose-slate
                  prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                  prose-p:text-slate-600 prose-p:leading-relaxed
                  prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-900 prose-strong:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                  prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                  prose-img:rounded-2xl prose-img:shadow-lg prose-img:border prose-img:border-slate-100
                  prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-blue-500
                  prose-ol:list-decimal prose-ol:pl-6 prose-li:marker:text-slate-900
                  prose-hr:border-slate-100 prose-hr:my-12
                "
                dangerouslySetInnerHTML={{ __html: project.description }}
              />

              {}
              <div className="mt-12 pt-8 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Code2 size={16}/> Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-sm font-medium"
                    >
                        {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-800 shadow-xl text-white">
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                Project Outcomes
             </h3>
             <div className="grid md:grid-cols-2 gap-4">
                {project.results.map((result, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                        <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={20} />
                        <span className="text-slate-200 text-sm leading-relaxed">{result}</span>
                    </div>
                ))}
             </div>
          </div>
        </motion.article>

        {}
        {relatedProjects.length > 0 && (
          <section className="max-w-4xl mx-auto pt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">More in {project.category}</h2>
              <Link href="/#projects">
                <Button variant="link" className="text-blue-600 hover:text-blue-800 gap-1 p-0 font-medium">
                  View all <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <Link href={`/project/${p._id}`} key={p._id} className="group h-full block">
                  <article className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
                    
                    {}
                    <div className="h-40 overflow-hidden bg-slate-100 relative group-hover:bg-slate-50 transition-colors">
                        {p.imageUrl && p.imageUrl !== '/api/placeholder/600/400' ? (
                           <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                        ) : (
                           <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                               <Layers size={32}/>
                           </div>
                        )}
                    </div>
                    
                    <div className="flex-1 p-5 flex flex-col">
                      <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                          {p.shortDescription}
                      </p>
                      
                      <div className="flex items-center gap-1 text-xs font-medium text-blue-600 mt-auto">
                        View Case Study <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}