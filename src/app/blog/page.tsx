
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, User, ArrowRight, Clock, Eye, MessageCircle, Search, Filter, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
        
        // Set featured post (first featured or first post)
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

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/20 pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/20 pt-20">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen size={16} />
            Data Insights Blog
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Data Analytics <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sharing knowledge, insights, and best practices in data analysis, 
            visualization, and machine learning for modern businesses.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search articles..."
                className="pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <Button variant="outline" className="border-gray-300 bg-white/80 backdrop-blur-sm rounded-xl">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              {['Latest', 'Popular', 'Featured'].map((sort) => (
                <Button
                  key={sort}
                  variant="outline"
                  className="border-gray-300 bg-white/80 backdrop-blur-sm rounded-xl"
                >
                  {sort}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 border-0 shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <CardContent className="p-8 text-white flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-4 bg-white/20 text-white border-0">
                    Featured Article
                  </Badge>
                  <CardTitle className="text-3xl mb-4 text-white">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription className="text-blue-100 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-6 text-blue-200 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <div className="flex gap-3 mb-6">
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-white/10 text-white border-white/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${featuredPost._id}`}>
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 w-fit">
                      Read Full Article
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </CardContent>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen size={40} className="text-white" />
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2">In-Depth Guide</h3>
                    <p className="text-blue-100">Complete walkthrough with examples</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <Tabs defaultValue="all" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-12 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category.toLowerCase().replace(' ', '-')}
                className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No blog posts found.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="group"
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
                            {post.category}
                          </Badge>
                          {post.featured && (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="flex-grow">
                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs bg-gray-100">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between w-full text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              {post.readTime}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Eye size={14} />
                              {post.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle size={14} />
                              {post.comments}
                            </div>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.article>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Additional tab contents would go here */}
          <TabsContent value="data-visualization" className="mt-0">
            <div className="text-center py-12">
              <p className="text-gray-600">Data Visualization articles coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <Card className="bg-gradient-to-br from-slate-900 to-blue-900 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">Stay Updated with Data Insights</h3>
              <p className="text-blue-200 mb-6 max-w-md mx-auto">
                Get the latest articles on data analytics, machine learning, and business intelligence delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 rounded-xl flex-1"
                />
                <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl">
                  Subscribe
                </Button>
              </div>
              <p className="text-blue-300 text-sm mt-4">
                No spam. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}