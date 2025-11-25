'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Save, ArrowLeft, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  featured: boolean;
  approved: boolean;
}

export default function EditTestimonial() {
  const router = useRouter()
  const params = useParams()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [rating, setRating] = useState(5)
  const [formData, setFormData] = useState<Testimonial | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchTestimonial(params.id as string)
    }
  }, [params.id])

  const fetchTestimonial = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`)
      if (response.ok) {
        const data = await response.json()
        setFormData(data)
        setRating(data.rating)
      } else {
        setError('Failed to fetch testimonial')
      }
    } catch (error) {
      console.error('Error fetching testimonial:', error)
      setError('Error loading testimonial')
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
      const response = await fetch(`/api/testimonials/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          rating
        }),
      })

      if (response.ok) {
        router.push('/admin/testimonials')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to update testimonial')
      }
    } catch (error) {
      console.error('Error updating testimonial:', error)
      setError('Error updating testimonial')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
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
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Testimonial</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => router.push('/admin/testimonials')}>
          Back to Testimonials
        </Button>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Testimonial Not Found</h1>
        <Button onClick={() => router.push('/admin/testimonials')}>
          Back to Testimonials
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/admin/testimonials')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Testimonials
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Testimonial</h1>
          <p className="text-gray-600 mt-1">Update client testimonial details</p>
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Save size={16} className="mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Information */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>
                  Enter the client's details and company information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-medium">
                      Position *
                    </Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="CEO"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">
                    Company *
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="TechCorp Inc."
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Content */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Testimonial Content</CardTitle>
                <CardDescription>
                  Write the testimonial quote and set the rating
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Rating */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Rating</Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={32}
                          className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {rating} out of 5 stars
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium">
                    Testimonial Quote *
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Vikram provided exceptional data analysis that transformed our business operations. Her insights were invaluable..."
                    rows={6}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="approved" className="text-sm font-medium">
                    Approved
                  </Label>
                  <Switch
                    id="approved"
                    checked={formData.approved}
                    onCheckedChange={(checked) => setFormData({ ...formData, approved: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured" className="text-sm font-medium">
                    Featured
                  </Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  How the testimonial will appear on your site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic text-sm">
                    "{formData.content || 'Testimonial content will appear here...'}"
                  </p>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">
                      {formData.name || 'Client Name'}
                    </div>
                    <div className="text-gray-600">
                      {formData.position || 'Position'} at {formData.company || 'Company'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Approved:</strong> Testimonials must be approved to appear on your public site.</p>
                  <p><strong>Featured:</strong> Featured testimonials are highlighted on your portfolio.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}