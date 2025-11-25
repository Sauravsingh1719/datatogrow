// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WelcomeWrapper from '@/components/WelcomeWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vikram | Data Analyst & Business Intelligence',
  description: 'Transforming raw data into actionable business insights through advanced analytics and visualization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAdminRoute = false

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <WelcomeWrapper>
          {!isAdminRoute && <Navigation />}
          <main className="relative">
            {children}
          </main>
          {!isAdminRoute && <Footer />}
        </WelcomeWrapper>
      </body>
    </html>
  )
}