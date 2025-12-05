'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, Eye, MessageCircle, Bookmark, ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import '../../globals.css' // Adjust path if needed

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
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          <p className="text-slate-500 font-medium animate-pulse">Loading Article...</p>
        </div>
      </div>
    )
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="bg-red-50 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Content Unavailable</h1>
          <p className="text-slate-600 mb-6">{error || "We couldn't find the article you're looking for."}</p>
          <Button onClick={() => router.push('/blog')} variant="default">
            Return to Blog
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900 py-[4%]">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 -ml-2"
            onClick={() => router.push('/blog')}
          >
            <ArrowLeft size={18} className="mr-2" />
            <span className="font-medium">All Posts</span>
          </Button>
          
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-xs text-slate-400 font-mono hidden md:inline-block mr-4">
              {blogPost.readTime} READ
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-full transition-colors ${isBookmarked ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:bg-slate-100'}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-slate-500 hover:bg-slate-100"
              onClick={handleShare}
            >
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header Section */}
          <header className="mb-12">
            <div className="flex gap-2 mb-6">
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors">
                {blogPost.category}
              </Badge>
              {blogPost.featured && (
                <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 gap-1">
                  <TrendingUp size={12} /> Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              {blogPost.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 mb-8 leading-relaxed font-light">
              {blogPost.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center justify-between border-y border-slate-100 py-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border border-slate-200">
                  <AvatarFallback className="bg-slate-900 text-white font-bold">
                    {blogPost.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{blogPost.author}</p>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Calendar size={12} />
                    <span>
                      {new Date(blogPost.date).toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-slate-400 text-sm">
                <div className="flex items-center gap-1.5" title="Views">
                    <Eye size={16} /> <span className="hidden sm:inline">{blogPost.views}</span>
                </div>
                <div className="flex items-center gap-1.5" title="Comments">
                    <MessageCircle size={16} /> <span className="hidden sm:inline">{blogPost.comments}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {blogPost.coverImage && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-sm border border-slate-100 aspect-video relative">
              <img 
                src={blogPost.coverImage} 
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* CONTENT BODY - Tiptap Optimized */}
          <div className="bg-white">
            <div 
              className="
                prose prose-lg max-w-none 
                prose-headings:text-slate-900 prose-headings:font-bold
                prose-p:text-slate-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900
                prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:rounded-xl prose-pre:p-6
                prose-img:rounded-xl prose-img:shadow-md
                prose-ul:list-disc prose-ul:pl-6
                prose-ol:list-decimal prose-ol:pl-6
              "
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-16 pt-8 border-t border-slate-100 mt-12">
            {blogPost.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Bio */}
          <div className="bg-slate-50 rounded-2xl p-8 mb-20 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
             <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarFallback className="bg-slate-800 text-white text-2xl font-bold">
                  {blogPost.author.charAt(0)}
                </AvatarFallback>
             </Avatar>
             <div className="flex-1">
               <h3 className="text-lg font-bold text-slate-900 mb-2">Written by {blogPost.author}</h3>
               <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                 Specialist in modern web technologies. Sharing insights about React, Next.js, and system design.
               </p>
               <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50">
                 View Profile
               </Button>
             </div>
          </div>
        </motion.article>

        {/* Read Next Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto pt-16 border-t border-slate-200">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Read Next</h2>
              <Link href="/blog">
                <Button variant="link" className="text-blue-600 hover:text-blue-800 gap-1 p-0">
                  View all posts <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Link href={`/blog/${post._id}`} key={post._id} className="group h-full">
                  <article className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="h-48 overflow-hidden bg-slate-100 relative">
                       {post.coverImage ? (
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <span className="text-4xl font-bold opacity-20">{post.title.charAt(0)}</span>
                          </div>
                       )}
                       <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white text-slate-800 text-xs font-bold shadow-sm">
                            {post.category}
                          </Badge>
                       </div>
                    </div>
                    
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <Calendar size={12} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <Clock size={12} />
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mt-auto">
                        Read Article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
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