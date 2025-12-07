import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Github, Linkedin, Mail } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

interface StatCardProps {
  number: string;
  label: string;
}

interface FloatingIconProps {
  icon: React.ReactNode;
  position: string;
  delay: number;
  href: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'default', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-blue-600 text-white shadow hover:bg-blue-700",
    outline: "border border-input bg-transparent shadow-sm hover:bg-slate-50 hover:text-accent-foreground",
    ghost: "hover:bg-slate-100 hover:text-slate-900"
  };
  
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-12 rounded-md px-8 text-base",
    icon: "h-9 w-9"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <div className="group p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
      <div className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
        {number}
      </div>
      <div className="text-xs font-medium text-slate-500 group-hover:text-slate-600">
        {label}
      </div>
    </div>
  );
};

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon, position, delay, href }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`absolute ${position} z-20 bg-white p-2 md:p-3 rounded-full shadow-lg border border-slate-100 hover:scale-110 transition-transform cursor-pointer`}
      animate={{
        y: [-10, 10, -10],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {icon}
    </motion.a>
  );
};

export default function App() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white pt-[25%] md:pt-10 font-sans">
      
      {}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#7c3aed05,transparent)]" />
      </div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.05)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {}
          <div className="text-left order-2 lg:order-1">
            
            {}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-start mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-600">Available for new projects</span>
              </div>
            </motion.div>

            <motion.h1 
              className="text-3xl md:text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.1]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Data Intelligence
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                That Drives Growth
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-sm md:text-lg text-slate-600 mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Senior Data Analyst transforming complex datasets into <span className="text-slate-900 font-semibold">clear, actionable strategies</span>. I help forward-thinking companies unlock revenue through precision analytics.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-start items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <a href="/resume" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-10 px-8 text-lg rounded-full shadow-blue-900/20 shadow-lg hover:shadow-blue-900/30 transition-all">
                  View Resume
                </Button>
              </a>
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-slate-200 hover:border-blue-300  hover:bg-slate-50 text-slate-700" disabled={true} hidden>
                <Play className="mr-2 h-5 w-5 fill-slate-700" />
                Watch Demo
              </Button>
              
              <div className='flex flex-row gap-3.5 w-full sm:w-auto'>
                <a href="#projects" className="flex-1 sm:flex-none">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto h-10 px-5 text-lg rounded-full shadow-blue-900/20 shadow-lg hover:shadow-blue-900/30 transition-all"
                  >
                    Projects
                  </Button>
                </a>
                <a href="/blog" className="flex-1 sm:flex-none">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto h-10 px-5 text-lg rounded-full shadow-blue-900/20 shadow-lg hover:shadow-blue-900/30 transition-all"
                  >
                    Blogs
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-3 gap-4 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <StatCard number="50+" label="Projects" />
              <StatCard number="35%" label="Efficiency" />
              <StatCard number="5yr" label="Experience" />
            </motion.div>
          </div>

          <motion.div 
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
         
            <div className="relative w-full max-w-[280px] md:max-w-[500px] aspect-square">
              
              {}
              <div className="absolute inset-0 rounded-[2.5rem] transform rotate-6 scale-105 z-0 border border-slate-100" />
              
              {}
              <div className="absolute inset-0 border-2 border-slate-200 rounded-[2.5rem] transform -rotate-3 z-0" />

              {}
              <div className="absolute inset-2  rounded-[2rem] overflow-hidden z-10 shadow-2xl">
                <img 
                  src="/profile.jpeg" 
                  alt="Profile" 
                  className="w-full h-full object-[center_top] object-cover"
                />
              </div>

              {}
              {}
              <FloatingIcon 
                icon={<Github className="text-slate-900 w-5 h-5 md:w-7 md:h-7" />} 
                position="-top-6 -left-6" 
                delay={0}
                href="https://github.com/vikram1840" 
              />
              
              {}
              <FloatingIcon 
                icon={<Linkedin className="text-blue-600 w-6 h-6 md:w-8 md:h-8" />} 
                position="top-1/2 -right-10" 
                delay={2}
                href="https://www.linkedin.com/in/vikram1840/" 
              />
              
              {}
              <FloatingIcon 
                icon={<Mail className="text-red-500 w-4 h-4 md:w-6 md:h-6" />} 
                position="-bottom-8 left-1/4" 
                delay={1}
                href="mailto:vikram1840@gmail.com"
              />
            </div>
          </motion.div>

        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-slate-300 w-8 h-8" />
      </motion.div>
    </section>
  );
}