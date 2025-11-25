
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function ContactCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Data?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Let's discuss how data analytics can drive growth and efficiency for your business.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Send a Message</h3>
                  <p className="text-gray-600 mb-6">
                    Get in touch to discuss your project requirements and goals.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/contact'}
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Contact Me
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-100 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="text-indigo-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule a Call</h3>
                  <p className="text-gray-600 mb-6">
                    Book a consultation to discuss your data analytics needs.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white w-full"
                  >
                    Schedule Now
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Prefer to start with a small project?
            </h4>
            <p className="text-gray-600 mb-4">
              Let's begin with a data audit or a quick analysis to demonstrate value.
            </p>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              Explore Starter Packages →
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}