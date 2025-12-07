'use client'

import * as React from "react"
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Star, Quote, Loader2 } from 'lucide-react'
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  const plugin = React.useRef(
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  )

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (response.ok) {
        const data: Testimonial[] = await response.json()
        const approvedTestimonials = data.filter(testimonial => testimonial.approved)
        setTestimonials(approvedTestimonials)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section ref={ref} className="py-12 md:py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-white mx-auto" />
            <p className="mt-4 text-blue-100">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-12 md:py-20 bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Client Testimonials</h2>
          <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto">
            What industry leaders say about working with me
          </p>
        </motion.div>

        {testimonials.length === 0 ? (
          <div className="text-center text-blue-100">
            <p>No testimonials available yet.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-6xl mx-auto px-4"
          >
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              {}
              <CarouselContent className="-ml-4 items-stretch">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial._id} className="pl-4 md:basis-1/2 lg:basis-1/3 h-auto">
                    {}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl relative h-full flex flex-col justify-between">
                      <div>
                        {}
                        <div className="absolute -top-4 -left-2 md:-left-4 bg-blue-600 p-3 rounded-full shadow-lg z-10">
                          <Quote className="text-white w-5 h-5 md:w-6 md:h-6" />
                        </div>

                        {}
                        <div className="flex gap-1 mb-4 mt-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="fill-yellow-400 text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                          ))}
                        </div>

                        {}
                        <p className="text-gray-700 mb-6 leading-relaxed italic text-sm md:text-base">
                          "{testimonial.content}"
                        </p>
                      </div>

                      {}
                      <div className="border-t border-gray-100 pt-4 mt-auto">
                        <div className="font-bold text-gray-900 text-base md:text-lg">{testimonial.name}</div>
                        <div className="text-blue-600 text-sm font-medium">{testimonial.position}</div>
                        <div className="text-xs md:text-sm text-gray-500">{testimonial.company}</div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {}
              <div className="hidden md:block">
                <CarouselPrevious className="bg-white/10 hover:bg-white/20 text-white border-white/20 -left-12" />
                <CarouselNext className="bg-white/10 hover:bg-white/20 text-white border-white/20 -right-12" />
              </div>
            </Carousel>
          </motion.div>
        )}
      </div>
    </section>
  )
}