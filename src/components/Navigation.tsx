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
  Mail,
  Layers
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
            return rect.top <= 150 && rect.bottom >= 150
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
    { name: 'Projects', href: '#projects', id: 'projects', type: 'section', icon: Briefcase },
    { name: 'About', href: '#about', id: 'about', type: 'section', icon: User },
    { name: 'Skills', href: '#skills', id: 'skills', type: 'section', icon: Zap },
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
      {}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            
            {}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="flex items-center">
                    <img 
                      src="/logo.png" 
                      alt="Logo" 
                      className="w-10 h-10 object-contain" 
                    />
                  </div>

                <div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight leading-none">Vikram Kumar</div>
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">Senior Data Analyst</div>
                </div>
              </Link>
            </div>

            {}
            <div className="hidden md:flex items-center p-1 bg-white/50 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      active
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                    }`}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>

            {}
            <div className="hidden md:block">
               <a 
                 href="/resume" 
                 className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-slate-900 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm"
               >
                 Resume
               </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {}
      <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 max-w-sm">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center justify-between bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-2xl px-2 py-2"
        >
          {navItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;

            return (
              <motion.button
                key={item.name}
                onClick={() => handleNavigation(item)}
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center justify-center w-12 h-12"
              >
                {}
                {active && (
                  <motion.div
                    layoutId="dock-dot"
                    className="absolute -top-1 w-1 h-1 bg-blue-600 rounded-full"
                  />
                )}
                
                {}
                <div 
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    active 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </>
  )
}