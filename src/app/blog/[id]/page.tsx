'use client'

import { motion } from 'framer-motion'
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

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
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchBlogPost(params.id as string)
    }
  }, [params.id])

  const fetchBlogPost = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`)
      if (response.ok) {
        const post: BlogPost = await response.json()
        if (post.published) {
          setBlogPost(post)
        } else {
          setError('This blog post is not published yet.')
        }
      } else {
        setError('Blog post not found.')
      }
    } catch (error) {
      console.error('Error fetching blog post:', error)
      setError('Error loading blog post.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/20 pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/20 pt-20">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/20 pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <header className="text-center mb-12">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0 mb-4">
              {blogPost.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blogPost.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {blogPost.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{blogPost.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-gray-100">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share Button */}
            <Button variant="outline" className="border-gray-300">
              <Share2 size={16} className="mr-2" />
              Share Article
            </Button>
          </header>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none prose-blue prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enjoyed this article?</h3>
              <p className="text-gray-600 mb-6">
                Share your thoughts in the comments or explore more articles on data analytics.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/blog">
                  <Button variant="outline">
                    Read More Articles
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button>
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
          </footer>
        </motion.article>
      </div>
    </div>
  )
}