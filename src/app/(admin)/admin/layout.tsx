// app/admin/layout.tsx - FIXED VERSION
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart3, 
  BookOpen, 
  MessageCircle, 
  Mail, 
  Menu, 
  X, 
  LogOut,
  Settings,
  User,
  Network,
  Newspaper
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: BarChart3
    },
    {
      name: 'Blog Posts',
      href: '/admin/blogs',
      icon: BookOpen
    },
    {
      name: 'Testimonials',
      href: '/admin/testimonials',
      icon: MessageCircle
    },
    {
      name: 'Messages',
      href: '/admin/messages',
      icon: Mail
    },
    {
      name: 'Projects',
      href: '/admin/projects',
      icon: Network
    },
    {
      name: 'Subscribers',
      href: '/admin/newsletter',
      icon: Newspaper
    }
  ]

   const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">Admin Panel</div>
                <div className="text-xs text-gray-500">Data Analyst Portfolio</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              <User size={20} />
              View Site
            </Link>
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all duration-200" onClick={handleLogout}>
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-0 min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                {navItems.find(item => item.href === pathname)?.name || 'Admin'}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="font-medium text-gray-900">Vikram</div>
                <div className="text-sm text-gray-500">Administrator</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-semibold">
                VR
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}