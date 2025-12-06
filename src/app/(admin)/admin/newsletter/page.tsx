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

type Subscriber = {
  _id: string
  email: string
  name?: string
  subscribedAt: string
  active: boolean
}

export default function NewsletterSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubscribers = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/newsletter')
        if (!res.ok) throw new Error('Failed to fetch subscribers')

        const data = await res.json()
        setSubscribers(data.subscribers || [])
        setCount(data.count || 0)
      } catch (err: any) {
        console.error('Error fetching newsletter subscribers:', err)
        setError(err?.message || 'Error fetching subscribers')
      } finally {
        setLoading(false)
      }
    }

    fetchSubscribers()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading subscribers...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Subscribers</h1>
          <p className="text-gray-600 mt-1">
            Showing all active newsletter subscribers from your database.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total active subscribers</p>
          <p className="text-2xl font-semibold">{count}</p>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Subscribers Table */}
      <div className="bg-white border-0 shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subscribed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No active subscribers found.
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
