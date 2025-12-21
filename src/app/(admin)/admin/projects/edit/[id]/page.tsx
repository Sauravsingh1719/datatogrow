'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Save, ArrowLeft, Plus, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
// Import the Tiptap Editor
import TiptapEditor from '@/components/TipTapEditor'

type ProjectData = {
  title: string
  description: string
  shortDescription: string
  technologies: string[]
  results: string[]
  liveLink: string
  githubLink: string
  imageUrl: string
  featured: boolean
  category: string
  order: number
}

export default function EditProject() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string

  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [formData, setFormData] = useState<ProjectData>({
    title: '',
    description: '',
    shortDescription: '',
    technologies: [],
    results: [],
    liveLink: '#',
    githubLink: '#',
    imageUrl: '/api/placeholder/600/400',
    featured: false,
    category: 'Analytics',
    order: 0
  })
  const [newTech, setNewTech] = useState('')
  const [newResult, setNewResult] = useState('')

  const categories = [
    'Dashboard',
    'Machine Learning',
    'Optimization',
    'Data Quality',
    'Visualization',
    'Analytics'
  ]

  // Fetch project data on load
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`)
        if (response.ok) {
          const data = await response.json()
          setFormData(data)
        } else {
          console.error('Failed to fetch project')
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      fetchProject()
    }
  }, [projectId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/projects')
        router.refresh() // Refresh the page to show updated data
      }
    } catch (error) {
      console.error('Error updating project:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/projects')
        router.refresh()
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    } finally {
      setShowDeleteDialog(false)
    }
  }

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech.trim()]
      })
      setNewTech('')
    }
  }

  const removeTechnology = (techToRemove: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(tech => tech !== techToRemove)
    })
  }

  const addResult = () => {
    if (newResult.trim() && !formData.results.includes(newResult.trim())) {
      setFormData({
        ...formData,
        results: [...formData.results, newResult.trim()]
      })
      setNewResult('')
    }
  }

  const removeResult = (resultToRemove: string) => {
    setFormData({
      ...formData,
      results: formData.results.filter(result => result !== resultToRemove)
    })
  }

  // Specific handler for Tiptap changes
  const handleDescriptionChange = (content: string) => {
    setFormData(prev => ({ ...prev, description: content }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this project
              and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
          <p className="text-gray-600 mt-1">Update project details</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save size={16} className="mr-2" />
            {saving ? 'Saving...' : 'Update Project'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Project Title</CardTitle>
                <CardDescription>
                  Add a compelling title for your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter project title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="text-lg font-medium"
                  required
                />
              </CardContent>
            </Card>

            {/* Description - UPDATED WITH TIPTAP */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Description</CardTitle>
                <CardDescription>
                  Write a detailed description of your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TiptapEditor
                  content={formData.description}
                  onChange={handleDescriptionChange}
                />
              </CardContent>
            </Card>

            {/* Short Description */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Short Description</CardTitle>
                <CardDescription>
                  Brief summary for project cards (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Brief summary..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured" className="text-sm font-medium">
                    Featured Project
                  </Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>
                <div>
                  <Label htmlFor="order" className="text-sm font-medium mb-2 block">
                    Display Order
                  </Label>
                  <Input
                    id="order"
                    type="number"
                    min="0"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category */}
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

            {/* Links */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Project Links</CardTitle>
                <CardDescription>
                  Add live demo and GitHub links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="liveLink" className="text-sm font-medium mb-1 block">
                    Live Demo URL
                  </Label>
                  <Input
                    id="liveLink"
                    placeholder="https://example.com"
                    value={formData.liveLink}
                    onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="githubLink" className="text-sm font-medium mb-1 block">
                    GitHub Repository URL
                  </Label>
                  <Input
                    id="githubLink"
                    placeholder="https://github.com/username/project"
                    value={formData.githubLink}
                    onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Technologies</CardTitle>
                <CardDescription>
                  Add technologies used in this project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a technology..."
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  />
                  <Button type="button" onClick={addTechnology} variant="outline">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map(tech => (
                    <div
                      key={tech}
                      className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Key Results</CardTitle>
                <CardDescription>
                  Add measurable results and achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a result..."
                    value={newResult}
                    onChange={(e) => setNewResult(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResult())}
                  />
                  <Button type="button" onClick={addResult} variant="outline">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.results.map(result => (
                    <div
                      key={result}
                      className="flex items-center justify-between bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm"
                    >
                      {result}
                      <button
                        type="button"
                        onClick={() => removeResult(result)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <X size={14} />
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