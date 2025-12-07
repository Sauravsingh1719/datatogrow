'use client'

import { Download, ArrowLeft, Home, Eye, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const RESUME_PATH = '/Vikram_Kumar_Resume.pdf';

export default function ResumePreviewPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowOptions(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleViewInBrowser = () => {
    window.open(RESUME_PATH, '_blank');
  };

  return (
    <div className="relative w-screen h-screen bg-gray-900 overflow-hidden">
      {}
      <a 
        href="/" 
        className="fixed top-6 left-6 z-50 group flex items-center gap-2"
      >
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-200 text-gray-700 group-hover:text-black group-hover:scale-110 transition-all duration-300">
          <ArrowLeft className="w-6 h-6" />
        </div>
        <span className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm transition-opacity duration-300 pointer-events-none">
          Back to Home
        </span>
      </a>

      {}
      {isMobile && (
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-200 text-gray-700 hover:scale-110 transition-all duration-300"
        >
          <Eye className="w-6 h-6" />
        </button>
      )}

      {}
      {showOptions && isMobile && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 m-4 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">View Resume</h3>
            <p className="text-gray-600 mb-6">
              Choose how you'd like to view the resume:
            </p>
            <div className="space-y-3">
              <button
                onClick={handleViewInBrowser}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center">
                  <ExternalLink className="w-5 h-5 text-blue-600 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Open in Browser</div>
                    <div className="text-xs text-gray-500">Best for mobile viewing</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setShowOptions(false)}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Eye className="w-5 h-5 text-gray-600 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Preview Here</div>
                    <div className="text-xs text-gray-500">May not work on all devices</div>
                  </div>
                </div>
              </button>
            </div>
            <button
              onClick={() => setShowOptions(false)}
              className="w-full mt-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {}
      {!(isMobile && showOptions) && (
        <iframe 
          src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=0`} 
          title="Vikram's Resume" 
          className="w-full h-full border-none block" 
        />
      )}

      {}
      <a
        href={RESUME_PATH}
        download="Vikram_Kumar_Resume.pdf"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 hover:shadow-blue-600/40 transition-all duration-300">
          <Download className="w-6 h-6" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Download PDF
        </span>
      </a>

      {}
      {!isMobile && (
        <button
          onClick={handleViewInBrowser}
          className="fixed bottom-8 left-8 z-50 group"
        >
          <div className="flex items-center justify-center w-14 h-14 bg-white text-gray-700 rounded-full shadow-2xl hover:bg-gray-50 hover:scale-110 transition-all duration-300">
            <ExternalLink className="w-6 h-6" />
          </div>
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            Open in New Tab
          </span>
        </button>
      )}
    </div>
  );
}