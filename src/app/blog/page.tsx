'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Calendar, ArrowRight, Clock, Eye, MessageCircle, Search, Filter, BookOpen, Sparkles, TrendingUp, CheckCircle, AlertCircle, Layers, Zap, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'

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

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Posts')
  
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blogs')
      if (response.ok) {
        const posts: BlogPost[] = await response.json()
        const publishedPosts = posts.filter(post => post.published)
        setBlogPosts(publishedPosts)
        
        const featured = publishedPosts.find(post => post.featured) || publishedPosts[0]
        setFeaturedPost(featured || null)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    'All Posts',
    'Data Visualization',
    'Machine Learning',
    'Data Quality',
    'Database',
    'Industry Trends',
    'Communication',
    'Data Engineering'
  ]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setSubscriptionStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      })
      return
    }
    
    setIsSubscribing(true)
    setSubscriptionStatus({ type: null, message: '' })
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: newsletterEmail,
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubscriptionStatus({
          type: 'success',
          message: data.message || 'Successfully subscribed! Check your email for a welcome message.'
        })
        setNewsletterEmail('')
        
        setTimeout(() => {
          setSubscriptionStatus({ type: null, message: '' })
        }, 5000)
      } else {
        setSubscriptionStatus({
          type: 'error',
          message: data.message || 'Failed to subscribe. Please try again.'
        })
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setSubscriptionStatus({
        type: 'error',
        message: 'Network error. Please try again.'
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const gridPosts = filteredPosts.filter(post => post._id !== featuredPost?._id)

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Loading insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {}
      <div className="relative pt-32 pb-20 overflow-hidden">
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
             <div className="absolute inset-0 bg-[linear-gradient(30deg,#000000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
         </div>
         <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold tracking-wide text-slate-600 shadow-sm mb-6">
               <Zap size={14} className="text-blue-600" />
               Insights & Updates
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.15]">
              Unlock the Power of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900">
                Data Intelligence
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light">
              Explore in-depth articles, tutorials, and industry insights designed to help you master the modern data stack.
            </p>
            
            <div className="relative max-w-xl mx-auto group">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative shadow-2xl shadow-slate-200/50 rounded-full">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  placeholder="Search articles, topics, or keywords..."
                  className="w-full pl-14 pr-6 py-7 bg-white border-slate-200 rounded-full text-lg placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24 relative z-10 max-w-7xl">
        
        {}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <Tabs 
            defaultValue="All Posts" 
            onValueChange={setSelectedCategory} 
            className="w-full flex justify-center"
          >
            <TabsList className="h-auto p-1.5 bg-slate-100/80 border border-slate-200 rounded-xl inline-flex shadow-inner">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {}
        {featuredPost && searchQuery === '' && selectedCategory === 'All Posts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-4 px-1">
               <TrendingUp className="text-blue-600" size={20} />
               <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Featured Story</span>
            </div>

            <Link href={`/blog/${featuredPost._id}`} className="block group">
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-800">
                
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(30deg,#ffffff_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.1]"></div>
                </div>
                
                <div className="grid md:grid-cols-12 gap-0 relative z-10">
                  <div className="md:col-span-8 p-8 md:p-12 flex flex-col justify-center">
                    
                    <div className="flex items-center gap-3 mb-6">
                      <Badge className="bg-blue-600 text-white border-0 px-3 py-1 hover:bg-blue-700">
                        {featuredPost.category}
                      </Badge>
                      <span className="text-slate-400 text-sm flex items-center gap-1.5 font-medium">
                        <Calendar size={14} />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-slate-300 text-lg mb-8 line-clamp-3 max-w-2xl leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-6 pt-4 border-t border-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-sm">
                          {featuredPost.author.charAt(0)}
                        </div>
                        <div>
                           <div className="text-sm font-medium text-white">{featuredPost.author}</div>
                           <div className="text-xs text-slate-400">Author</div>
                        </div>
                      </div>
                      
                      <div className="h-8 w-px bg-slate-800"></div>

                      <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                        <Clock size={16} />
                        {featuredPost.readTime}
                      </div>

                      <div className="ml-auto text-white group-hover:translate-x-2 transition-transform duration-300">
                         <ArrowRight size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden min-h-[200px] md:min-h-full border-l border-slate-800">
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform duration-700">
                         <BookOpen size={120} className="text-blue-500 blur-sm" />
                      </div>
                      <div className="absolute inset-0 bg-slate-900/20"></div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {searchQuery ? 'Search Results' : (selectedCategory === 'All Posts' ? 'Latest Articles' : selectedCategory)}
            </h2>
            <span className="text-slate-500 text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">{filteredPosts.length} articles</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Search className="text-slate-400" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your search or category filter.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All Posts')
                }}
                className="border-slate-200 text-slate-600 hover:text-slate-900"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {(selectedCategory === 'All Posts' && !searchQuery ? gridPosts : filteredPosts).map((post, index) => (
                  <motion.div
                    layout
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/blog/${post._id}`} className="group h-full block">
                      <div className="h-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                        
                        {}
                        <div className="h-48 relative overflow-hidden bg-slate-100 border-b border-slate-100 group-hover:bg-slate-50 transition-colors">
                            {post.coverImage ? (
                                <img 
                                  src={post.coverImage} 
                                  alt={post.title} 
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                            ) : (
                                <>
                                    {}
                                    <div className="absolute inset-0 opacity-[0.08]">
                                        <div className="absolute inset-0 bg-[linear-gradient(30deg,#000000_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                                    </div>

                                    {}
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors"></div>

                                    {}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:text-blue-600 group-hover:border-blue-200 transition-all duration-300">
                                            <BarChart3 size={24} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            {}
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                                    {post.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex items-center gap-2 mb-3 text-xs text-slate-400 font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {post.readTime}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6">
                            {post.excerpt}
                          </p>
                          
                          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
                             <div className="flex gap-2">
                                {post.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded text-slate-500">
                                        {tag}
                                    </span>
                                ))}
                             </div>
                             
                             <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                    <Eye size={14} /> {post.views}
                                </span>
                             </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden p-8 md:p-16 text-center shadow-2xl shadow-slate-900/20">
             <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(30deg,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>
             </div>
             
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800/50 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border border-white/10 rounded-2xl mb-6 backdrop-blur-sm">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Never Miss an Insight
              </h2>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed font-light">
                Join <span className="text-white font-medium">5,000+ data professionals</span> who receive 
                exclusive articles and tutorials.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address" 
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12 rounded-xl focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:border-transparent backdrop-blur-sm"
                    disabled={isSubscribing}
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={isSubscribing}
                    className="h-12 px-8 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
                  >
                    {isSubscribing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2" />
                        Joining...
                      </>
                    ) : 'Subscribe'}
                  </Button>
                </div>
                
                {subscriptionStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg backdrop-blur-sm ${
                      subscriptionStatus.type === 'success' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {subscriptionStatus.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span className="text-sm">{subscriptionStatus.message}</span>
                  </motion.div>
                )}
                
                <p className="text-slate-500 text-xs mt-4">
                  No spam, just valuable insights. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}