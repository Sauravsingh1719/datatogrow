import './globals.css'
import LayoutContent from '@/components/LayoutContent'
import AuthProvider from '@/context/AuthProvider';
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"], 
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-jakarta",
  display: "swap",
});

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
      {
}
      <body className={`${jakarta.variable} ${dmSans.variable} antialiased bg-slate-50`}>
        
          <LayoutContent>
           <AuthProvider>{children}</AuthProvider>
          </LayoutContent>
      
      </body>
    </html>
  )
}