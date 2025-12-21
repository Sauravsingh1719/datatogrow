'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github, MessageCircle, Clock, CheckCircle, ArrowRight } from 'lucide-react'
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
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 pb-20">
      
      {}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,#000000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          {}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold tracking-wide text-slate-600 shadow-sm mb-6">
             <MessageCircle size={14} className="text-blue-600" />
             Get In Touch
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.15]">
            Let's discuss <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900">Opportunity</span>
          </h1>
          
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-6"
          >
            {}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    title: 'Email',
                    content: 'vikram1840@gmail.com',
                    link: 'mailto:vikram1840@gmail.com',
                    description: 'Direct email'
                  },
                  {
                    icon: MapPin,
                    title: 'Location',
                    content: 'Limassol, Cyprus',
                    link: '#',
                    description: 'Remote / Hybrid'
                  }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-md hover:shadow-slate-200/50 transition-all group"
                  >
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-500 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm mb-0.5 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-slate-700 text-sm font-medium break-all">{item.content}</div>
                    </div>
                  </a>
                ))}
              </div>

              {}
              <div className="mt-8 pt-8 border-t border-slate-100">
                 <h4 className="text-sm font-semibold text-slate-900 mb-4">Connect on Social</h4>
                 <div className="flex gap-3">
                    {[
                      { icon: Linkedin, href: 'https://www.linkedin.com/in/vikram1840/', label: 'LinkedIn' },
                      { icon: Github, href: 'http://github.com/vikram1840', label: 'GitHub' },
                      { icon: Mail, href: 'mailto:vikram1840@gmail.com', label: 'Email' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/20"
                        title={social.label}
                      >
                        <social.icon size={18} />
                      </a>
                    ))}
                 </div>
              </div>
            </div>

            {}
            <div className="bg-slate-900 rounded-2xl p-6 lg:p-8 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
               {}
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20 -mr-10 -mt-10"></div>
               
               <div className="relative z-10">
                 <h3 className="text-lg font-bold mb-4">Current Availability</h3>
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      <span className="font-medium text-slate-200">Available</span>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20">
                      New Opportunity
                    </Badge>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock size={14} />
                    <span>Response time: ~24 hours</span>
                 </div>
               </div>
            </div>
          </motion.div>

          {}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8"
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-10">
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Send a Message</h2>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-50 rounded-2xl p-12 text-center border border-slate-100"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                     <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Thank you for reaching out. I'll get back to you within 24 hours to discuss your requirements.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-slate-200 text-slate-900 hover:bg-white"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                       {error}
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-0 rounded-xl h-11 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-0 rounded-xl h-11 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold text-slate-700">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-0 rounded-xl resize-none transition-all p-4"
                      placeholder="Message...."
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto h-12 px-8 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-lg shadow-slate-900/20 transition-all disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight size={18} className="ml-2" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-slate-400 mt-4">
                      By submitting this form, you agree to our privacy policy.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
               {[
                 'Data Analysis',
                 'Dashboard Development',
                 'Strategic Consulting'
               ].map((service, i) => (
                 <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-slate-700">{service}</span>
                 </div>
               ))}
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}