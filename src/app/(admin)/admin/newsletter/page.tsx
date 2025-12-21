'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Users, Trash2 } from 'lucide-react'

type Subscriber = {
  _id: string
  email: string
  name?: string
  subscribedAt: string
  active: boolean
}

export default function NewsletterSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/newsletter')
      if (!res.ok) throw new Error('Failed to fetch subscribers')

      const data = await res.json()
      setSubscribers(data.subscribers || data || [])
    } catch (err: any) {
      console.error('Error fetching newsletter subscribers:', err)
      setError(err?.message || 'Error fetching subscribers')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/newsletter?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete');
      }

      setSubscribers(prev => prev.filter(sub => sub._id !== id));
      
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  const exportSubscribers = () => {
    const csvContent = [
      ['Email', 'Name', 'Subscribed Date', 'Status'],
      ...subscribers.map(sub => [
        sub.email,
        sub.name || '',
        new Date(sub.subscribedAt).toLocaleDateString(),
        sub.active ? 'Active' : 'Inactive'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscribers.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading subscribers...</div>
      </div>
    )
  }

  const activeSubscribers = subscribers.filter(sub => sub.active)

  return (
    <div className="space-y-6 p-6">
      {}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Subscribers</h1>
          <p className="text-gray-600 mt-1">
            Manage your newsletter subscribers
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={exportSubscribers}
            className="border-gray-300"
          >
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
          <Button onClick={fetchSubscribers} variant="outline" className="border-gray-300">
            Refresh
          </Button>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{subscribers.length}</div>
                <div className="text-gray-600">Total Subscribers</div>
              </div>
              <Users className="text-blue-500" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{activeSubscribers.length}</div>
                <div className="text-gray-600">Active Subscribers</div>
              </div>
              <Users className="text-green-500" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {subscribers.length - activeSubscribers.length}
                </div>
                <div className="text-gray-600">Inactive Subscribers</div>
              </div>
              <Users className="text-gray-400" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Subscribers</CardTitle>
          <CardDescription>
            {activeSubscribers.length} active subscribers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Index</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Subscribed At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead> {}
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No subscribers found
                    </TableCell>
                  </TableRow>
                ) : (
                  subscribers.map((sub, index) => (
                    <TableRow key={sub._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {sub.email}
                      </TableCell>
                      <TableCell>
                        {sub.name || '-'}
                      </TableCell>
                      <TableCell>
                        {new Date(sub.subscribedAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          sub.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {sub.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      {}
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(sub._id)}
                          disabled={deletingId === sub._id}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          {deletingId === sub._id ? (
                             <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                             <Trash2 size={18} />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}