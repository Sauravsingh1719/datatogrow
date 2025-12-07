import Link from 'next/link'
import { Linkedin, Twitter, Mail, Github } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname();

   if (pathname === '/resume') {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              Vikram Kumar
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Transforming complex data into clear, actionable insights that drive business growth and innovation.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/vikram1840/' },
                { icon: Github, href: 'http://github.com/vikram1840' },
                { icon: Mail, href: 'mailto:vikram1840@gmail.com ' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-gray-800 hover:bg-blue-600 p-3 rounded-lg transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-3">
              {['Home', 'About', 'Skills', 'Projects', 'Blog', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-white block transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
            <div className="space-y-3 text-gray-400">
              <p>vikram1840@gmail.com </p>
              <p>Limassol, Cyprus </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Vikram Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}