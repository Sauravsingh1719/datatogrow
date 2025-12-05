'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github, MessageCircle, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          budget: '',
          timeline: '',
          message: ''
        })
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/20 pt-20">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle size={16} />
            Get In Touch
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Let's Work <span className="text-blue-600">Together</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your data into actionable insights? Get in touch to discuss your project 
            and discover how data analytics can drive your business forward.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                  <CardDescription>
                    Get in touch through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: 'Email',
                      content: 'Vikram@example.com',
                      link: 'mailto:Vikram@example.com',
                      description: 'Send me an email anytime'
                    },
                    {
                      icon: Phone,
                      title: 'Phone',
                      content: '+1 (555) 123-4567',
                      link: 'tel:+15551234567',
                      description: 'Mon-Fri from 9am to 6pm'
                    },
                    {
                      icon: MapPin,
                      title: 'Location',
                      content: 'San Francisco, CA',
                      link: '#',
                      description: 'Available for remote work worldwide'
                    }
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors group"
                    >
                      <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-gray-900 font-medium">{item.content}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Follow Me</CardTitle>
                  <CardDescription>
                    Connect on professional networks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'bg-blue-600' },
                      { icon: Twitter, href: '#', label: 'Twitter', color: 'bg-sky-500' },
                      { icon: Github, href: '#', label: 'GitHub', color: 'bg-gray-900' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className={`${social.color} text-white p-4 rounded-xl hover:scale-105 transition-transform flex flex-col items-center gap-2 shadow-lg`}
                      >
                        <social.icon size={20} />
                        <span className="text-xs font-medium">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-medium">Current Status</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        Available
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>Response time: Within 24 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl">Start Your Project</CardTitle>
                  <CardDescription className="text-lg">
                    Fill out the form below and I'll get back to you as soon as possible
                  </CardDescription>
                  <p className="text-sm text-gray-600 mt-2">
                    Fields marked with <span className="text-red-500">*</span> are required
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600 mb-6">
                        Thank you for your message. I'll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                          {error}
                        </div>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-white border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Your full name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-white border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-sm font-medium">
                            Company <span className="text-gray-500 text-sm font-normal">(optional)</span>
                          </Label>
                          <Input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="bg-white border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Your company name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-sm font-medium">
                            Subject <span className="text-gray-500 text-sm font-normal">(optional)</span>
                          </Label>
                          <Input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="bg-white border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="What is this regarding?"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-sm font-medium">
                            Project Budget <span className="text-gray-500 text-sm font-normal">(optional)</span>
                          </Label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          >
                            <option value="">Select budget range (optional)</option>
                            <option value="1k-5k">$1,000 - $5,000</option>
                            <option value="5k-15k">$5,000 - $15,000</option>
                            <option value="15k-30k">$15,000 - $30,000</option>
                            <option value="30k+">$30,000+</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timeline" className="text-sm font-medium">
                            Timeline <span className="text-gray-500 text-sm font-normal">(optional)</span>
                          </Label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          >
                            <option value="">Select timeline (optional)</option>
                            <option value="urgent">Urgent (1-2 weeks)</option>
                            <option value="soon">Soon (1 month)</option>
                            <option value="flexible">Flexible (1-3 months)</option>
                            <option value="planning">Just planning</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium">
                          Project Details <span className="text-gray-500 text-sm font-normal">(optional)</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className="bg-white border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                          placeholder="Tell me about your project, goals, and any specific requirements..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 py-6 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send size={20} className="mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-center text-sm text-gray-600">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid md:grid-cols-3 gap-6 mt-8"
              >
                {[
                  {
                    title: 'Data Analysis',
                    description: 'Statistical analysis and insights generation'
                  },
                  {
                    title: 'Dashboard Development',
                    description: 'Interactive BI dashboards and reports'
                  },
                  {
                    title: 'Consultation',
                    description: 'Strategic data consulting and planning'
                  }
                ].map((service, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}