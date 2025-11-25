// app/admin/messages/page.tsx - FIXED VERSION
'use client'

import { useState, useEffect } from 'react'
import { 
  Mail, 
  Search, 
  Filter,
  Eye,
  Trash2,
  Reply,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  company: string;
  subject: string;
  budget: string;
  timeline: string;
  message: string;
  read: boolean;
  responded: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      } else {
        console.error('Failed to fetch messages')
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (messageId: string) => {
    setActionLoading(`read-${messageId}`)
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true }),
      })

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg._id === messageId ? { ...msg, read: true } : msg
        ))
        if (selectedMessage?._id === messageId) {
          setSelectedMessage({ ...selectedMessage, read: true })
        }
      } else {
        const errorData = await response.json()
        console.error('Failed to mark as read:', errorData)
        alert('Failed to mark message as read')
      }
    } catch (error) {
      console.error('Error marking message as read:', error)
      alert('Error marking message as read')
    } finally {
      setActionLoading(null)
    }
  }

  const markAsResponded = async (messageId: string) => {
    setActionLoading(`responded-${messageId}`)
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responded: true }),
      })

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg._id === messageId ? { ...msg, responded: true } : msg
        ))
        if (selectedMessage?._id === messageId) {
          setSelectedMessage({ ...selectedMessage, responded: true })
        }
      } else {
        const errorData = await response.json()
        console.error('Failed to mark as responded:', errorData)
        alert('Failed to mark message as responded')
      }
    } catch (error) {
      console.error('Error marking message as responded:', error)
      alert('Error marking message as responded')
    } finally {
      setActionLoading(null)
    }
  }

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    setActionLoading(`delete-${messageId}`)
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessages(messages.filter(msg => msg._id !== messageId))
        if (selectedMessage?._id === messageId) {
          setSelectedMessage(null)
        }
      } else {
        const errorData = await response.json()
        console.error('Failed to delete message:', errorData)
        alert('Failed to delete message')
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Error deleting message')
    } finally {
      setActionLoading(null)
    }
  }

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const unreadCount = messages.filter(msg => !msg.read).length
  const respondedCount = messages.filter(msg => msg.responded).length

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
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600 mt-1">Manage incoming messages from your contact form</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{messages.length}</div>
                <div className="text-blue-100">Total Messages</div>
              </div>
              <Mail size={24} className="text-blue-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{unreadCount}</div>
                <div className="text-orange-100">Unread Messages</div>
              </div>
              <Clock size={24} className="text-orange-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{respondedCount}</div>
                <div className="text-green-100">Responded</div>
              </div>
              <CheckCircle size={24} className="text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle>All Messages</CardTitle>
            <CardDescription>
              {filteredMessages.length} messages found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search messages..."
                className="pl-10 bg-gray-50 border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <Mail size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                <p className="text-gray-600">All contact messages will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message._id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedMessage?._id === message._id
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : message.read
                        ? 'bg-gray-50 border border-gray-200'
                        : 'bg-white border-2 border-orange-200 shadow-sm'
                    }`}
                    onClick={() => {
                      setSelectedMessage(message)
                      if (!message.read) {
                        markAsRead(message._id)
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{message.name}</h3>
                        {!message.read && (
                          <Badge className="bg-orange-100 text-orange-700 border-0">
                            New
                          </Badge>
                        )}
                        {message.responded && (
                          <Badge className="bg-green-100 text-green-700 border-0">
                            Replied
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1 font-medium">{message.subject}</p>
                    <p className="text-gray-500 text-sm line-clamp-2">{message.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-500">{message.email}</span>
                      {message.company && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{message.company}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle>
              {selectedMessage ? 'Message Details' : 'Select a Message'}
            </CardTitle>
            <CardDescription>
              {selectedMessage && `From: ${selectedMessage.name}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>{selectedMessage.name}</span>
                      <span>•</span>
                      <span>{selectedMessage.email}</span>
                      {selectedMessage.company && (
                        <>
                          <span>•</span>
                          <span>{selectedMessage.company}</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!selectedMessage.responded && (
                      <Button
                        size="sm"
                        onClick={() => markAsResponded(selectedMessage._id)}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={actionLoading === `responded-${selectedMessage._id}`}
                      >
                        {actionLoading === `responded-${selectedMessage._id}` ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        ) : (
                          <CheckCircle size={16} className="mr-2" />
                        )}
                        Mark Replied
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => deleteMessage(selectedMessage._id)}
                      disabled={actionLoading === `delete-${selectedMessage._id}`}
                    >
                      {actionLoading === `delete-${selectedMessage._id}` ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Project Details */}
                {(selectedMessage.budget || selectedMessage.timeline) && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Project Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {selectedMessage.budget && (
                        <div>
                          <span className="font-medium text-gray-700">Budget:</span>
                          <span className="ml-2 text-gray-600">{selectedMessage.budget}</span>
                        </div>
                      )}
                      {selectedMessage.timeline && (
                        <div>
                          <span className="font-medium text-gray-700">Timeline:</span>
                          <span className="ml-2 text-gray-600">{selectedMessage.timeline}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Message Content */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Message</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <Button 
                    className="flex-1"
                    onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`, '_blank')}
                  >
                    <Reply size={16} className="mr-2" />
                    Reply via Email
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select a message to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}