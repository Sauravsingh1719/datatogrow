// app/admin/testimonials/page.tsx - ENHANCED VERSION
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  Users,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  featured: boolean;
  approved: boolean;
  createdAt: string;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      } else {
        console.error('Failed to fetch testimonials')
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    setActionLoading(`delete-${id}`)
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setTestimonials(testimonials.filter(testimonial => testimonial._id !== id))
      } else {
        const errorData = await response.json()
        console.error('Failed to delete testimonial:', errorData)
        alert('Failed to delete testimonial')
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      alert('Error deleting testimonial')
    } finally {
      setActionLoading(null)
    }
  }

  const toggleApproval = async (testimonial: Testimonial) => {
    setActionLoading(`approval-${testimonial._id}`)
    try {
      const response = await fetch(`/api/testimonials/${testimonial._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: !testimonial.approved }),
      })

      if (response.ok) {
        setTestimonials(testimonials.map(t => 
          t._id === testimonial._id ? { ...t, approved: !t.approved } : t
        ))
      } else {
        const errorData = await response.json()
        console.error('Failed to update testimonial:', errorData)
        alert('Failed to update testimonial')
      }
    } catch (error) {
      console.error('Error updating testimonial:', error)
      alert('Error updating testimonial')
    } finally {
      setActionLoading(null)
    }
  }

  const toggleFeatured = async (testimonial: Testimonial) => {
    setActionLoading(`featured-${testimonial._id}`)
    try {
      const response = await fetch(`/api/testimonials/${testimonial._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !testimonial.featured }),
      })

      if (response.ok) {
        setTestimonials(testimonials.map(t => 
          t._id === testimonial._id ? { ...t, featured: !t.featured } : t
        ))
      } else {
        const errorData = await response.json()
        console.error('Failed to update testimonial:', errorData)
        alert('Failed to update testimonial')
      }
    } catch (error) {
      console.error('Error updating testimonial:', error)
      alert('Error updating testimonial')
    } finally {
      setActionLoading(null)
    }
  }

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.content.toLowerCase().includes(searchQuery.toLowerCase())
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600 mt-1">Manage client testimonials and reviews</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus size={20} className="mr-2" />
            Add Testimonial
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search testimonials..."
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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{testimonials.length}</div>
                <div className="text-blue-100">Total Testimonials</div>
              </div>
              <Users size={24} className="text-blue-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{testimonials.filter(t => t.approved).length}</div>
                <div className="text-green-100">Approved</div>
              </div>
              <CheckCircle size={24} className="text-green-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{testimonials.filter(t => t.featured).length}</div>
                <div className="text-purple-100">Featured</div>
              </div>
              <Star size={24} className="text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials List */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Testimonials</CardTitle>
          <CardDescription>
            {filteredTestimonials.length} testimonials found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTestimonials.length === 0 ? (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials found</h3>
              <p className="text-gray-600 mb-6">Get started by adding your first testimonial.</p>
              <Link href="/admin/testimonials/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus size={20} className="mr-2" />
                  Add Testimonial
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredTestimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="flex flex-col lg:flex-row lg:items-start justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                          <div className="flex gap-1">
                            {testimonial.featured && (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                                Featured
                              </Badge>
                            )}
                            <Badge variant={testimonial.approved ? "default" : "outline"} className={
                              testimonial.approved 
                                ? "bg-green-100 text-green-700 border-green-200" 
                                : "bg-orange-100 text-orange-700 border-orange-200"
                            }>
                              {testimonial.approved ? 'Approved' : 'Pending'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {testimonial.position} at {testimonial.company}
                        </div>
                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
                    <div className="text-sm text-gray-500 mt-3">
                      Added {new Date(testimonial.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-gray-300 ${
                        testimonial.approved ? 'text-orange-600 border-orange-300' : 'text-green-600 border-green-300'
                      }`}
                      onClick={() => toggleApproval(testimonial)}
                      disabled={actionLoading === `approval-${testimonial._id}`}
                    >
                      {actionLoading === `approval-${testimonial._id}` ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        testimonial.approved ? 'Unapprove' : 'Approve'
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-gray-300 ${
                        testimonial.featured ? 'text-gray-600' : 'text-purple-600 border-purple-300'
                      }`}
                      onClick={() => toggleFeatured(testimonial)}
                      disabled={actionLoading === `featured-${testimonial._id}`}
                    >
                      {actionLoading === `featured-${testimonial._id}` ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        testimonial.featured ? 'Unfeature' : 'Feature'
                      )}
                    </Button>
                    <Link href={`/admin/testimonials/edit/${testimonial._id}`}>
                      <Button variant="outline" size="sm" className="border-gray-300">
                        <Edit size={16} />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => deleteTestimonial(testimonial._id)}
                      disabled={actionLoading === `delete-${testimonial._id}`}
                    >
                      {actionLoading === `delete-${testimonial._id}` ? (
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