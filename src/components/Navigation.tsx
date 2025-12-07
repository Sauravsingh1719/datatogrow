'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  BarChart3, 
  Home, 
  User, 
  Zap, 
  Briefcase, 
  FileText, 
  Mail 
} from 'lucide-react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/resume') {
    return null;
  }

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
    { name: 'Home', href: '/', id: 'home', type: 'page', icon: Home },
    { name: 'About', href: '#about', id: 'about', type: 'section', icon: User },
    { name: 'Skills', href: '#skills', id: 'skills', type: 'section', icon: Zap },
    { name: 'Projects', href: '#projects', id: 'projects', type: 'section', icon: Briefcase },
    { name: 'Blog', href: '/blog', id: 'blog', type: 'page', icon: FileText },
    { name: 'Contact', href: '/contact', id: 'contact', type: 'page', icon: Mail },
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
  }

  const isActive = (item: typeof navItems[0]) => {
    if (item.type === 'page') {
      return pathname === item.href
    } else {
      return activeSection === item.id && pathname === '/'
    }
  }

  return (
    <>
      {/* --- DESKTOP TOP NAVIGATION --- */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                  <img src="/logo.png" alt="Logo" width={35} height={35} />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">Vikram Kumar</div>
                  <div className="text-xs text-gray-500 font-medium">Senior Data Analyst</div>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 bg-white/50 backdrop-blur-md rounded-2xl px-2 py-1.5 border border-white/20 shadow-sm">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive(item)
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Empty div to balance flex layout on desktop */}
            <div className="hidden md:block w-[140px]"></div>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE BOTTOM DOCK (MacOS Style) --- */}
      <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 max-w-sm">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl px-4 py-3"
        >
          {navItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;

            return (
              <motion.button
                key={item.name}
                onClick={() => handleNavigation(item)}
                whileTap={{ scale: 0.8 }}
                className="relative flex flex-col items-center gap-1 min-w-[3rem]"
              >
                {/* Active Indicator Dot */}
                {active && (
                  <motion.div
                    layoutId="dock-dot"
                    className="absolute -top-1 w-1 h-1 bg-blue-600 rounded-full"
                  />
                )}
                
                {/* Icon Container */}
                <div 
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    active 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 -translate-y-2' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                </div>

                {/* Label (Optional: Remove if you want just icons for cleaner look) */}
                {active && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -bottom-5 text-[10px] font-medium text-blue-600 whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </>
  )
}