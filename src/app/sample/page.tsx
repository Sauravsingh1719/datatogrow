'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Globe, Zap, Workflow, ArrowRight, Layers, PenTool } from 'lucide-react';


const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";
  
  const styles = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 active:scale-[0.98]",
    outline: "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]",
    ghost: "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
  };

  return (
    <button className={`${base} ${styles[variant as keyof typeof styles]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const DashboardItem = ({ title, description, icon: Icon, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-start gap-4 px-6 py-5 border-b md:border-b-0 md:border-r border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors text-left"
  >
    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1 shrink-0">
      <Icon size={20} strokeWidth={2} />
    </div>
    <div>
      <div className="text-lg font-bold text-slate-900 leading-tight mb-1">{title}</div>
      <div className="text-xs font-medium text-slate-500 leading-relaxed max-w-[200px]">{description}</div>
    </div>
  </motion.div>
);

const SocialButton = ({ href, icon: Icon, colorClass }: any) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group"
  >
    <div className={`p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 ${colorClass}`}>
      <Icon size={20} className="transition-transform group-hover:scale-110" />
    </div>
  </a>
);


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex mt-1.5 flex-col justify-center bg-gradient-to-b from-slate-50/80 to-white font-sans overflow-hidden pt-24 pb-10">
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center md:justify-start mb-8 lg:mb-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold tracking-wide text-slate-600 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Open for new opportunities
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {
}
          <div className="lg:col-span-5 relative order-1 lg:order-2 w-[70%] md:w-full mx-auto lg:mx-0 max-w-[280px] lg:max-w-none mb-6 lg:mb-0">
            <motion.div 
              className="relative rounded-2xl overflow-hidden bg-white shadow-2xl shadow-slate-200/50 border border-slate-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {}
              <div className="aspect-[4/5] relative">
                <img 
                  src="/profile.jpeg" 
                  alt="Profile" 
                  className="w-full h-full object-cover object-top"
                />
                
                {}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>

              {}
              <motion.div 
                className="absolute bottom-3 left-3 right-3 lg:bottom-4 lg:left-4 lg:right-4 bg-white/95 backdrop-blur-md p-3 lg:p-4 rounded-xl shadow-lg border border-slate-100"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] lg:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Focus</p>
                    <p className="text-xs lg:text-sm font-bold text-slate-800">Operational Intelligence</p>
                  </div>
                  <div className="h-6 lg:h-8 w-20 lg:w-24 flex items-end justify-between gap-1">
                      {[40, 70, 45, 90, 60, 80].map((h, i) => (
                        <motion.div 
                          key={i}
                          className="w-full bg-blue-100 rounded-t-sm"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.8 + (i * 0.1), duration: 0.5 }}
                        >
                          <div className="w-full bg-blue-600 rounded-t-sm h-full opacity-80" />
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {}
            <div className="absolute -z-10 top-6 -right-6 w-full h-full rounded-2xl border border-slate-200 bg-slate-50/40 hidden lg:block"></div>
          </div>

          {
}
          <div className="lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left order-2 lg:order-1">
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Senior Data Analyst & <br className="hidden lg:block" />
              {}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900">
                Data Partner
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-base md:text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I help product, operations, and CX teams turn messy operational data into decisions that grow orders, improve margins, and reduce churn. <strong className="font-semibold text-slate-900">15+ years experience</strong> turning ad-hoc analyses into real-time BI systems.
            </motion.p>

            <motion.div 
              className="flex flex-col gap-6 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {}
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center md:justify-start">
                <a href="/resume" className="w-full sm:w-auto">
                  <Button className="h-12 px-8 w-full sm:w-auto text-base gap-2 rounded-full shadow-blue-900/20">
                    View Resume <ArrowRight size={18} />
                  </Button>
                </a>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <a href="#projects" className="flex-1 sm:flex-none">
                    <Button variant="outline" className="h-12 w-full sm:w-auto px-6 text-base gap-2 rounded-full">
                      <Layers size={18} /> Projects
                    </Button>
                  </a>
                  <a href="/blog" className="flex-1 sm:flex-none">
                    <Button variant="outline" className="h-12 w-full sm:w-auto px-6 text-base gap-2 rounded-full">
                      <PenTool size={18} /> Blogs
                    </Button>
                  </a>
                </div>
              </div>

              {}
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                 <span className="text-sm font-medium text-slate-400 mr-2">Connect:</span>
                 <SocialButton href="https://github.com/vikram1840" icon={Github} colorClass="text-slate-900 hover:bg-slate-50" />
                 <SocialButton href="https://www.linkedin.com/in/vikram1840/" icon={Linkedin} colorClass="text-blue-600 hover:bg-blue-50" />
                 <SocialButton href="mailto:vikram1840@gmail.com" icon={Mail} colorClass="text-red-500 hover:bg-red-50" />
              </div>

            </motion.div>
          </div>
        </div>

        {}
        <motion.div 
          className="mt-16 lg:mt-20 border-y border-slate-100 bg-white/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <DashboardItem 
            icon={Globe} 
            title="15+ Years Experience" 
            description="Food delivery, logistics, call center & telecom across KSA, India & Cyprus."
            delay={0.8} 
          />
          <DashboardItem 
            icon={Zap} 
            title="Real-time Systems" 
            description="Introduced ClickHouse & Superset backbone for 24/7 operational monitoring."
            delay={0.9} 
          />
          <DashboardItem 
            icon={Workflow} 
            title="End-to-end Ownership" 
            description="From business question → data model → dashboards → exec narrative."
            delay={1.0} 
          />
        </motion.div>
      </div>
      
      {}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-slate-300" />
      </motion.div>
    </section>
  );
}