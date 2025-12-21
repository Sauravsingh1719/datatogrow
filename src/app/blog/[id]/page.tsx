'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ArrowRight, TrendingUp, User, ChevronLeft, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import '../../globals.css'

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
  comments: number;
  featured: boolean;
  published: boolean;
  coverImage?: string;
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isBookmarked, setIsBookmarked] = useState(false)

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
        const currentPost = await fetchBlogPost(params.id as string)
        if (currentPost) {
          await fetchRelatedPosts(currentPost.category, currentPost._id)
        }
        setLoading(false)
      }
      loadData()
    }
  }, [params.id])

  const fetchBlogPost = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`)
      if (response.ok) {
        const post: BlogPost = await response.json()
        if (post.published) {
          setBlogPost(post)
          return post
        } else {
          setError('This blog post is not published yet.')
        }
      } else {
        setError('Blog post not found.')
      }
    } catch (error) {
      console.error('Error fetching blog post:', error)
      setError('Error loading blog post.')
    }
    return null
  }

  const fetchRelatedPosts = async (category: string, currentId: string) => {
    try {
      const response = await fetch(`/api/blogs?category=${encodeURIComponent(category)}&limit=3`)
      if (response.ok) {
        const data = await response.json()
        const filtered = data.filter((post: BlogPost) => post._id !== currentId).slice(0, 3)
        setRelatedPosts(filtered)
      }
    } catch (error) {
      console.error("Failed to load related posts", error)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost?.title,
        text: blogPost?.excerpt,
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
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Loading Article...</p>
        </div>
      </div>
    )
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="bg-slate-100 text-slate-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Layers size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Content Unavailable</h1>
          <p className="text-slate-500 mb-6 text-sm">{error || "We couldn't find the article you're looking for."}</p>
          <Button 
            onClick={() => router.push('/blog')} 
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            Return to Blog
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mt-[4%] bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,#000000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      {}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between max-w-4xl">
          <Link href="/blog">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 -ml-2 gap-2"
            >
              <ChevronLeft size={18} />
              <span className="font-medium">Back to Blog</span>
            </Button>
          </Link>
          
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider hidden md:inline-block mr-4">
              {blogPost.readTime}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-full transition-colors ${isBookmarked ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
            </Button>
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

      <main className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            
            {}
            <div className="p-8 md:p-12 lg:p-16 pb-0 md:pb-0 lg:pb-0">
               <div className="flex gap-2 mb-6">
                 {}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold tracking-wide text-slate-700">
                    <Layers size={12} className="text-blue-600" />
                    {blogPost.category}
                  </span>
                  {blogPost.featured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wide text-blue-700">
                      <TrendingUp size={12} /> Featured
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-[1.15] tracking-tight">
                  {blogPost.title}
                </h1>

                <p className="text-xl text-slate-500 mb-8 leading-relaxed font-light">
                  {blogPost.excerpt}
                </p>

                {}
                <div className="flex items-center justify-between border-t border-slate-100 pt-8 pb-8">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-slate-200">
                      <AvatarFallback className="bg-slate-900 text-white font-bold text-sm">
                        {blogPost.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-slate-900 text-sm leading-none mb-1">{blogPost.author}</p>
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                        <Calendar size={12} />
                        <span>
                          {new Date(blogPost.date).toLocaleDateString('en-US', {
                            month: 'long', day: 'numeric', year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            {}
            {blogPost.coverImage && (
              <div className="w-full aspect-[2/1] relative bg-slate-100">
                <img 
                  src={blogPost.coverImage} 
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {}
            <div className="p-8 md:p-12 lg:p-16">
              <div 
                className="
                  prose prose-lg max-w-none 
                  prose-slate
                  prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                  prose-p:text-slate-600 prose-p:leading-relaxed
                  prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-900 prose-strong:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-700 prose-blockquote:not-italic prose-blockquote:font-medium
                  prose-code:text-slate-900 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
                  prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:shadow-xl
                  prose-img:rounded-2xl prose-img:shadow-lg prose-img:border prose-img:border-slate-100
                  prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-blue-500
                  prose-ol:list-decimal prose-ol:pl-6 prose-li:marker:text-slate-900
                  prose-hr:border-slate-100 prose-hr:my-12
                "
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {}
              <div className="flex flex-wrap gap-2 mt-16 pt-8 border-t border-slate-100">
                {blogPost.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-100 cursor-pointer transition-colors"
                  >
                  </span>
                ))}
              </div>
            </div>
          </div>

          {}
          <div className="mt-8 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <Avatar className="h-16 w-16 border-2 border-slate-100">
                <AvatarFallback className="bg-slate-900 text-white text-xl font-bold">
                  {blogPost.author.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Written by {blogPost.author}</h3>
                <p className="text-slate-500 mb-4 text-sm leading-relaxed max-w-xl">
                  Specialist in data analytics and engineering. Sharing insights about modern data stacks, visualization, and decision intelligence.
                </p>
                <div className="flex gap-2 justify-center sm:justify-start">
                  <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-600 hover:text-slate-900">
                    View Profile
                  </Button>
                </div>
              </div>
          </div>
        </motion.article>

        {}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto pt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Read Next</h2>
              <Link href="/blog">
                <Button variant="link" className="text-blue-600 hover:text-blue-800 gap-1 p-0 font-medium">
                  View all <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link href={`/blog/${post._id}`} key={post._id} className="group h-full block">
                  <article className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
                    
                    {}
                    <div className="h-32 overflow-hidden bg-slate-100 relative group-hover:bg-slate-50 transition-colors">
                        {post.coverImage ? (
                           <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                          <>
                             <div className="absolute -right-4 -top-8 w-24 h-24 bg-blue-100/50 rounded-full blur-xl"></div>
                             <div className="absolute left-4 bottom-4 w-12 h-12 bg-indigo-100/50 rounded-full blur-lg"></div>
                          </>
                        )}
                        <div className="absolute top-3 left-3">
                           <span className="bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
                              {post.category}
                           </span>
                        </div>
                    </div>
                    
                    <div className="flex-1 p-5 flex flex-col">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium mb-2">
                        <Calendar size={10} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <Clock size={10} />
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      
                      <div className="flex items-center gap-1 text-xs font-medium text-blue-600 mt-auto">
                        Read Article <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
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