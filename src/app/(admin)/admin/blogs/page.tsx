'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  BookOpen,
  EyeOff,
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
  comments: number;
  featured: boolean;
  published: boolean;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [newsletterLoading, setNewsletterLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      if (response.ok) {
        const data = await response.json()
        setBlogs(data)
      } else {
        console.error('Failed to fetch blogs')
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    setActionLoading(`delete-${id}`)
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== id))
      } else {
        const errorData = await response.json()
        console.error('Failed to delete blog:', errorData)
        alert('Failed to delete blog post')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Error deleting blog post')
    } finally {
      setActionLoading(null)
    }
  }

  const togglePublish = async (blog: BlogPost) => {
    setActionLoading(`publish-${blog._id}`)
    try {
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !blog.published }),
      })

      if (response.ok) {
        setBlogs(blogs.map(b => b._id === blog._id ? { ...b, published: !b.published } : b))
      } else {
        const errorData = await response.json()
        console.error('Failed to update blog:', errorData)
        alert('Failed to update blog post')
      }
    } catch (error) {
      console.error('Error updating blog:', error)
      alert('Error updating blog post')
    } finally {
      setActionLoading(null)
    }
  }

  const sendNewsletter = async (id: string, title: string) => {
    if (!confirm(`Send newsletter notification about "${title}" to all subscribers?`)) return

    setNewsletterLoading(id)
    try {
      const response = await fetch(`/api/blogs/${id}/newsletter`, {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        alert(`✅ Newsletter sent successfully to ${data.sentTo} subscribers!`)
      } else {
        alert(`❌ Failed to send newsletter: ${data.message}`)
      }
    } catch (error) {
      console.error('Error sending newsletter:', error)
      alert('❌ Error sending newsletter')
    } finally {
      setNewsletterLoading(null)
    }
  }

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-1">Manage your blog content and publications</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus size={20} className="mr-2" />
            New Blog Post
          </Button>
        </Link>
      </div>

      {}
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search blog posts..."
                className="pl-10 bg-gray-50 border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-gray-300">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="border-gray-300">
                Sort By
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{blogs.length}</div>
                <div className="text-blue-100">Total Posts</div>
              </div>
              <BookOpen size={24} className="text-blue-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{blogs.filter(b => b.published).length}</div>
                <div className="text-green-100">Published</div>
              </div>
              <Eye size={24} className="text-green-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{blogs.filter(b => b.featured).length}</div>
                <div className="text-purple-100">Featured</div>
              </div>
              <Calendar size={24} className="text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>
            {filteredBlogs.length} blog posts found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first blog post.</p>
              <Link href="/admin/blogs/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus size={20} className="mr-2" />
                  Create Blog Post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 mb-4 sm:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                      <div className="flex gap-1">
                        {blog.featured && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                            Featured
                          </Badge>
                        )}
                        <Badge variant={blog.published ? "default" : "outline"} className={
                          blog.published 
                            ? "bg-green-100 text-green-700 border-green-200" 
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }>
                          {blog.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{blog.category}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                      <span>•</span>
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {blog.published ? (
                      <Link href={`/blog/${blog._id}`} target="_blank">
                        <Button variant="outline" size="sm" className="border-gray-300">
                          <Eye size={16} />
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-300"
                        onClick={() => alert('Preview only available for published posts')}
                        title="Preview only available for published posts"
                      >
                        <EyeOff size={16} />
                      </Button>
                    )}
                    <Link href={`/admin/blogs/edit/${blog._id}`}>
                      <Button variant="outline" size="sm" className="border-gray-300">
                        <Edit size={16} />
                      </Button>
                    </Link>
                    
                    {}
                    {blog.published && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                        onClick={() => sendNewsletter(blog._id, blog.title)}
                        disabled={newsletterLoading === blog._id}
                        title="Send newsletter to subscribers"
                      >
                        {newsletterLoading === blog._id ? (
                          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={16} className="mr-1" />
                            Notify
                          </>
                        )}
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-gray-300 ${
                        blog.published ? 'text-orange-600 border-orange-300' : 'text-green-600 border-green-300'
                      }`}
                      onClick={() => togglePublish(blog)}
                      disabled={actionLoading === `publish-${blog._id}`}
                    >
                      {actionLoading === `publish-${blog._id}` ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        blog.published ? 'Unpublish' : 'Publish'
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => deleteBlog(blog._id)}
                      disabled={actionLoading === `delete-${blog._id}`}
                    >
                      {actionLoading === `delete-${blog._id}` ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}