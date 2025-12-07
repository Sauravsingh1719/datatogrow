'use client'

import { Download, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

const RESUME_PATH = '/Vikram_Kumar_Resume.pdf'; 

export default function ResumePreviewPage() {
  return (
    <div className="relative w-screen h-screen bg-gray-900 overflow-hidden">
      
      {
}
      <a 
        href="/" 
        className="fixed top-6 left-6 z-50 group flex items-center gap-2"
      >
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-200 text-gray-700 group-hover:text-black group-hover:scale-110 transition-all duration-300">
          <ArrowLeft className="w-6 h-6" />
        </div>
        {}
        <span className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm transition-opacity duration-300 pointer-events-none">
          Back to Home
        </span>
      </a>

      {
}
      <iframe 
        src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=0`} 
        title="Vikram's Resume" 
        className="w-full h-full border-none block" 
      />

      {
}
      <a
        href={RESUME_PATH}
        download="Vikram_Kumar_Resume.pdf"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 hover:shadow-blue-600/40 transition-all duration-300">
          <Download className="w-6 h-6" />
        </div>
        {}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Download PDF
        </span>
      </a>

    </div>
  );
}