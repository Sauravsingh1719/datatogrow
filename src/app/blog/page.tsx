'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Calendar, ArrowRight, Clock, Eye, MessageCircle, Search, Filter, BookOpen, Sparkles, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

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
  
  // Newsletter subscription state
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
        
        // Find featured or take the latest one
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
        
        // Clear success message after 5 seconds
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

  // Filter Logic
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Exclude featured post from grid if it's currently displayed as featured (optional preference)
  const gridPosts = filteredPosts.filter(post => post._id !== featuredPost?._id)

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">Loading insights...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with abstract background */}
      <div className="relative bg-white pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-50" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-50 via-transparent to-transparent opacity-50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
              <Sparkles className="w-3.5 h-3.5 mr-2 inline-block" />
              Data Engineering & Analytics
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Unlock the Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Data</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              Explore in-depth articles, tutorials, and industry insights designed to help you master the modern data stack.
            </p>
            
            {/* Search Bar in Hero */}
            <div className="relative max-w-xl mx-auto shadow-xl shadow-blue-900/5 rounded-2xl">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                placeholder="Search articles, topics, or keywords..."
                className="w-full pl-12 pr-4 py-6 bg-white border-0 ring-1 ring-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl text-lg transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Category Tabs */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <Tabs 
            defaultValue="All Posts" 
            onValueChange={setSelectedCategory} 
            className="w-full flex justify-center"
          >
            <TabsList className="h-auto p-1 bg-white border border-slate-200 rounded-full shadow-sm inline-flex">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full px-5 py-2.5 text-sm font-medium data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Featured Post (Only show if no search/filter active) */}
        {featuredPost && searchQuery === '' && selectedCategory === 'All Posts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={24} />
              Featured Story
            </h2>
            <Link href={`/blog/${featuredPost._id}`} className="block group">
              <Card className="border-0 bg-slate-900 text-white overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <BookOpen size={200} />
                </div>
                <div className="grid md:grid-cols-12 gap-0 relative z-10">
                  <div className="md:col-span-8 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                        {featuredPost.category}
                      </Badge>
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-slate-300 text-lg mb-8 line-clamp-3 max-w-2xl">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs">
                          {featuredPost.author.charAt(0)}
                        </div>
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-slate-400">
                        <Clock size={14} />
                        {featuredPost.readTime}
                      </div>
                      <Button variant="link" className="text-white p-0 ml-auto md:ml-6 group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                  {/* Decorative Gradient Side */}
                  <div className="md:col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 min-h-[200px] md:min-h-full" />
                </div>
              </Card>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              {searchQuery ? 'Search Results' : (selectedCategory === 'All Posts' ? 'Latest Articles' : selectedCategory)}
            </h2>
            <span className="text-slate-500 text-sm">{filteredPosts.length} articles</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">No articles found</h3>
              <p className="text-slate-500">Try adjusting your search or category filter.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All Posts')
                }}
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
                      <Card className="h-full border border-slate-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
                        <CardHeader className="p-0">
                          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 w-full" />
                        </CardHeader>
                        <CardContent className="p-6 flex-grow">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-0 font-normal">
                              {post.category}
                            </Badge>
                            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                              <Clock size={12} />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {post.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0 border-t border-slate-50 mt-auto flex items-center justify-between text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                              <Eye size={14} />
                              {post.views}
                            </span>
                            <span className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                              <MessageCircle size={14} />
                              {post.comments}
                            </span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 rounded-3xl overflow-hidden p-8 md:p-16 text-center">
            {/* Abstract Shapes */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 transform translate-x-1/2 translate-y-1/2" />
            
            {/* Floating sparkles */}
            <div className="absolute top-4 right-4 animate-pulse">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Never Miss an Insight
              </h2>
              <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                Join <span className="text-blue-400 font-semibold">5,000+ data professionals</span> who receive 
                exclusive articles, tutorials, and industry analysis every week. Be the first to know when 
                we publish new content.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 h-12 rounded-xl focus-visible:ring-blue-500 focus-visible:border-blue-500 backdrop-blur-sm"
                    disabled={isSubscribing}
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={isSubscribing}
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Subscribing...
                      </>
                    ) : 'Get Free Updates'}
                  </Button>
                </div>
                
                {/* Status Messages */}
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
                    {subscriptionStatus.type === 'success' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span className="text-sm">{subscriptionStatus.message}</span>
                  </motion.div>
                )}
                
                <p className="text-slate-400 text-xs mt-4">
                  By subscribing, you agree to our Privacy Policy. We respect your inbox — no spam, just valuable insights.
                </p>
              </form>
              
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Weekly updates
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Exclusive content
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  No spam, ever
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}