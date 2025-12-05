'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      if (pathname === '/') {
        const sections = ['home', 'about', 'skills', 'projects', 'contact']
        const current = sections.find(section => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 100 && rect.bottom >= 100
          }
          return false
        })
        if (current) setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const navItems = [
    { name: 'Home', href: '/', id: 'home', type: 'page' },
    { name: 'About', href: '#about', id: 'about', type: 'section' },
    { name: 'Skills', href: '#skills', id: 'skills', type: 'section' },
    { name: 'Projects', href: '#projects', id: 'projects', type: 'section' },
    { name: 'Blog', href: '/blog', id: 'blog', type: 'page' },
    { name: 'Contact', href: '/contact', id: 'contact', type: 'page' },
  ]

  const handleNavigation = (item: typeof navItems[0]) => {
    if (item.type === 'section') {
      if (pathname === '/') {
        const element = document.querySelector(item.href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        router.push(`/${item.href}`)
      }
    } else {
      router.push(item.href)
    }
    setIsMobileMenuOpen(false)
  }

  const isActive = (item: typeof navItems[0]) => {
    if (item.type === 'page') {
      return pathname === item.href
    } else {
      return activeSection === item.id && pathname === '/'
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-blue-500/5 border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl group-hover:scale-110 transition-transform">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">Vikram</div>
                <div className="text-xs text-gray-500 font-medium">Data Analyst</div>
              </div>
            </Link>
          </div>

          {/* Centered Navigation Items for Desktop */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive(item)
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right part - blank but reserving space for alignment with mobile menu button */}
          <div className="flex-shrink-0 w-12 flex justify-end md:w-0">
            {/* Mobile Menu Button - only visible on mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl mt-2 rounded-2xl shadow-2xl border border-gray-100 py-4"
            >
              <div className="flex flex-col space-y-2 px-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item)}
                    className={`px-4 py-3 rounded-xl font-medium text-left transition-all duration-300 ${
                      isActive(item)
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}