// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import WelcomeWrapper from '@/components/WelcomeWrapper'
import LayoutContent from '@/components/LayoutContent' // Import the new component

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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <WelcomeWrapper>
          <LayoutContent>
            {children}
          </LayoutContent>
        </WelcomeWrapper>
      </body>
    </html>
  )
}