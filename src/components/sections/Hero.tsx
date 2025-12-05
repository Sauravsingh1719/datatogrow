import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Play, Database, BarChart3, PieChart } from 'lucide-react';


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
    <div className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
      <div className="text-3xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
        {number}
      </div>
      <div className="text-sm font-medium text-slate-500 group-hover:text-slate-600">
        {label}
      </div>
    </div>
  );
};

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon, position, delay }) => {
  return (
    <motion.div
      className={`absolute ${position} opacity-70`}
      animate={{
        y: [-10, 10, -10],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {icon}
    </motion.div>
  );
};

export default function App() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20 font-sans">
      
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_50%_200px,#7c3aed05,transparent)]" />
      </div>

      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.05)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon 
          icon={<PieChart className="text-blue-200" size={40} />} 
          position="top-1/4 left-[10%]" 
          delay={0} 
        />
        <FloatingIcon 
          icon={<BarChart3 className="text-indigo-200" size={50} />} 
          position="top-1/3 right-[15%]" 
          delay={2} 
        />
        <FloatingIcon 
          icon={<Database className="text-slate-200" size={35} />} 
          position="bottom-1/4 left-[20%]" 
          delay={1} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
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
            className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Data Intelligence
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              That Drives Growth
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Senior Data Analyst transforming complex datasets into <span className="text-slate-900 font-semibold">clear, actionable strategies</span>. I help forward-thinking companies unlock revenue through precision analytics.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-blue-900/20 shadow-lg hover:shadow-blue-900/30 transition-all">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50 text-slate-700">
              <Play className="mr-2 h-5 w-5 fill-slate-700" />
              Watch Demo
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <StatCard number="50+" label="Projects Delivered" />
            <StatCard number="35%" label="Efficiency Boost" />
            <StatCard number="5+" label="Years Experience" />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-slate-300 w-8 h-8" />
      </motion.div>
    </section>
  );
}