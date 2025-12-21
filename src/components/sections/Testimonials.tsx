'use client'

import * as React from "react"
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Star, Quote, Loader2, MessageSquare } from 'lucide-react'
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
      delay: 4000, 
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
      <section ref={ref} className="py-20 bg-slate-50 min-h-[400px] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-slate-900 animate-spin" />
          <p className="text-slate-500 font-medium">Loading reviews...</p>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-20 lg:py-24 bg-slate-50 relative overflow-hidden">
      
      {}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,#cbd5e1_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.2]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {}
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold tracking-wide text-slate-600 shadow-sm mb-4 mx-auto">
             <MessageSquare size={14} className="text-blue-600" />
             Testimonials
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight leading-[1.15]">
            Trusted by Industry Leaders
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Feedback from product managers, operations directors, and data teams.
          </p>
        </motion.div>

        {testimonials.length === 0 ? (
          <div className="text-center text-slate-500 bg-white p-10 rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto">
            <p>No testimonials available yet.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full px-4"
          >
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4 items-stretch pb-4">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial._id} className="pl-4 md:basis-1/2 lg:basis-1/3 h-auto">
                    
                    {}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative h-full flex flex-col justify-between group">
                      
                      {}
                      <div className="absolute top-6 right-6 text-slate-100 group-hover:text-blue-50 transition-colors duration-300">
                        <Quote className="w-12 h-12 rotate-180" strokeWidth={0} fill="currentColor" />
                      </div>

                      <div>
                        {}
                        <div className="flex gap-1 mb-6 relative z-10">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-100 text-slate-200'}`} 
                            />
                          ))}
                        </div>

                        {}
                        <p className="text-slate-600 mb-8 leading-relaxed italic relative z-10">
                          "{testimonial.content}"
                        </p>
                      </div>

                      {}
                      <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                        {}
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-slate-900/20">
                          {testimonial.name.charAt(0)}
                        </div>

                        <div>
                          <div className="font-bold text-slate-900 text-sm">{testimonial.name}</div>
                          <div className="text-xs text-slate-500 font-medium">
                            <span className="text-blue-600">{testimonial.position}</span>
                            {testimonial.company && (
                              <>
                                <span className="mx-1.5 text-slate-300">•</span>
                                {testimonial.company}
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {}
              <div className="hidden md:flex justify-end gap-2 mt-8 pr-4">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm" />
                <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm" />
              </div>

            </Carousel>
          </motion.div>
        )}
      </div>
    </section>
  )
}