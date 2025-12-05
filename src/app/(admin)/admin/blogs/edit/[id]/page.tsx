'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Save, ArrowLeft, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import TiptapEditor from '@/components/TipTapEditor'

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  date: string;
}

export default function EditBlogPost() {
  const router = useRouter()
  const params = useParams()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<BlogPost | null>(null)
  const [newTag, setNewTag] = useState('')
  const [error, setError] = useState('')

  const categories = [
    'Data Visualization',
    'Machine Learning',
    'Database',
    'Industry Trends',
    'Communication',
    'Data Engineering'
  ]

  useEffect(() => {
    if (params.id) {
      fetchBlogPost(params.id as string)
    }
  }, [params.id])

  const fetchBlogPost = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`)
      if (response.ok) {
        const data = await response.json()
        setFormData(data)
      } else {
        setError('Failed to fetch blog post')
      }
    } catch (error) {
      console.error('Error fetching blog post:', error)
      setError('Error loading blog post')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/blogs/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/blogs')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to update blog post')
      }
    } catch (error) {
      console.error('Error updating blog post:', error)
      setError('Error updating blog post')
    } finally {
      setSaving(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && formData && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    if (formData) {
      setFormData({
        ...formData,
        tags: formData.tags.filter(tag => tag !== tagToRemove)
      })
    }
  }

  const handleContentChange = (htmlContent: string) => {
    if (formData) {
      setFormData({
        ...formData,
        content: htmlContent
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error && !formData) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Blog Post</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => router.push('/admin/blogs')}>
          Back to Blogs
        </Button>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
        <Button onClick={() => router.push('/admin/blogs')}>
          Back to Blogs
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/admin/blogs')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Blogs
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="text-gray-600 mt-1">Update your blog post content and settings</p>
        </div>
        <div className="flex gap-2">
          {formData.published && (
            <Button 
              variant="outline" 
              className="border-gray-300"
              onClick={() => window.open(`/blog/${formData._id}`, '_blank')}
            >
              <Eye size={16} className="mr-2" />
              Preview
            </Button>
          )}
          <Button 
            onClick={handleSubmit}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save size={16} className="mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {}
          <div className="lg:col-span-2 space-y-6">
            {}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Post Title</CardTitle>
                <CardDescription>
                  Add a compelling title for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter blog post title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="text-lg font-medium"
                  required
                />
              </CardContent>
            </Card>

            {}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Excerpt</CardTitle>
                <CardDescription>
                  Write a short description that will appear in blog listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter a brief excerpt..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                />
              </CardContent>
            </Card>

            {}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Write your blog post content with rich text editor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TiptapEditor
                  content={formData.content}
                  onChange={handleContentChange}
                  placeholder="Write your blog post content here..."
                />
              </CardContent>
            </Card>
          </div>

          {}
          <div className="space-y-6">
            {}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured" className="text-sm font-medium">
                    Featured Post
                  </Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="published" className="text-sm font-medium">
                    Published
                  </Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </CardContent>
            </Card>

            {}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Read Time</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="5 min read"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                />
              </CardContent>
            </Card>

            {}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add relevant tags for your post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}