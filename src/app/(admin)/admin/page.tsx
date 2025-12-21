'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  MessageCircle, 
  Mail, 
  Eye, 
  TrendingUp, 
  Users,
  FileText,
  Calendar,
  Plus
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface DashboardStats {
  blogs: {
    total: number;
    published: number;
    draft: number;
  };
  testimonials: {
    total: number;
    approved: number;
    pending: number;
  };
  messages: {
    total: number;
    unread: number;
    read: number;
  };
}

interface Activity {
  _id: string;
  type: 'blog' | 'testimonial' | 'message';
  action: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, blogsResponse, testimonialsResponse, messagesResponse] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/blogs'),
        fetch('/api/testimonials'),
        fetch('/api/contact')
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Generate recent activity from actual data
      const activities: Activity[] = []
      
      if (blogsResponse.ok) {
        const blogs = await blogsResponse.json()
        const recentBlogs = blogs
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 2)
        
        recentBlogs.forEach((blog: any) => {
          activities.push({
            _id: blog._id,
            type: 'blog',
            action: blog.published ? 'published' : 'created',
            title: blog.title,
            description: blog.published ? 'Blog post published' : 'Draft blog post created',
            createdAt: blog.createdAt
          })
        })
      }

      if (messagesResponse.ok) {
        const messages = await messagesResponse.json()
        const recentMessages = messages
          .filter((msg: any) => !msg.read)
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 2)
        
        recentMessages.forEach((message: any) => {
          activities.push({
            _id: message._id,
            type: 'message',
            action: 'received',
            title: `Message from ${message.name}`,
            description: message.subject,
            createdAt: message.createdAt
          })
        })
      }

      // Sort by creation date and take latest 4
      const sortedActivities = activities
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4)

      setRecentActivity(sortedActivities)

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileText size={16} />
      case 'testimonial': return <Users size={16} />
      case 'message': return <Mail size={16} />
      default: return <FileText size={16} />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-100 text-blue-600'
      case 'testimonial': return 'bg-green-100 text-green-600'
      case 'message': return 'bg-orange-100 text-orange-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Vikram!</h1>
        <p className="text-blue-100 text-lg">
          Here's what's happening with your portfolio today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Blog Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.blogs.total || 0}</div>
              <p className="text-xs text-gray-600">
                {stats?.blogs.published || 0} published • {stats?.blogs.draft || 0} drafts
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Testimonial Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
              <MessageCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.testimonials.total || 0}</div>
              <p className="text-xs text-gray-600">
                {stats?.testimonials.approved || 0} approved • {stats?.testimonials.pending || 0} pending
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Message Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <Mail className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.messages.total || 0}</div>
              <p className="text-xs text-gray-600">
                {stats?.messages.unread || 0} unread • {stats?.messages.read || 0} read
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Views Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Views</CardTitle>
              <Eye className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4K</div>
              <p className="text-xs text-gray-600">
                <span className="text-green-600">↑ 12%</span> from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/blogs/new">
                  <Button className="w-full h-16 flex flex-col gap-1 bg-blue-600 hover:bg-blue-700">
                    <BookOpen size={20} />
                    <span className="text-sm">New Blog Post</span>
                  </Button>
                </Link>
                <Link href="/admin/testimonials/new">
                  <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
                    <MessageCircle size={20} />
                    <span className="text-sm">Add Testimonial</span>
                  </Button>
                </Link>
                <Link href="/admin/messages">
                  <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
                    <Mail size={20} />
                    <span className="text-sm">View Messages</span>
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
                    <Eye size={20} />
                    <span className="text-sm">View Site</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar size={32} className="mx-auto mb-2 text-gray-300" />
                    <p>No recent activity</p>
                  </div>
                ) : (
                  recentActivity.map((activity) => (
                    <div key={activity._id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                      <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{activity.title}</div>
                        <div className="text-sm text-gray-600 truncate">{activity.description}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatTimeAgo(activity.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}