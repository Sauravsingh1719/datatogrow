'use client'

import Link from 'next/link'
import { Linkedin, Twitter, Mail, Github, ArrowRight, MapPin } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname();

  if (pathname === '/resume') {
    return null;
  }

  return (
    <footer className="relative bg-slate-950 text-slate-300 py-16 overflow-hidden">
      
      {}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(30deg,#ffffff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          
          {}
          <div className="md:col-span-5">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block tracking-tight">
              Vikram Kumar
            </Link>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed font-light">
              Transforming complex operational data into clear, repeatable insights that drive business growth and reduce churn.
            </p>
            
            {}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/vikram1840/' },
                { icon: Github, href: 'http://github.com/vikram1840' },
                { icon: Mail, href: 'mailto:vikram1840@gmail.com' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 shadow-sm"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {}
          <div className="md:col-span-3 md:pl-8">
            <h3 className="font-bold text-white text-lg mb-6 tracking-tight">Quick Links</h3>
            <div className="space-y-3">
              {['Home', 'About', 'Skills', 'Projects', 'Blog'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                  className="group flex items-center text-slate-400 hover:text-blue-400 transition-colors w-fit"
                >
                  <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {}
          <div className="md:col-span-4">
            <h3 className="font-bold text-white text-lg mb-6 tracking-tight">Get In Touch</h3>
            <div className="space-y-4">
               {}
               <a 
                 href="mailto:vikram1840@gmail.com" 
                 className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-900/50 transition-colors group"
               >
                  <div className="p-2 rounded-lg bg-slate-900 text-blue-500 group-hover:text-blue-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Email</div>
                    <div className="text-slate-200 group-hover:text-white transition-colors">vikram1840@gmail.com</div>
                  </div>
               </a>

               {}
               <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="p-2 rounded-lg bg-slate-900 text-blue-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Location</div>
                    <div className="text-slate-200">Limassol, Cyprus</div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {currentYear} Vikram Kumar. All rights reserved.</p>
          <p className="flex items-center gap-1">
          
          </p>
        </div>
      </div>
    </footer>
  )
}