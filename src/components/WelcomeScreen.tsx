"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface WelcomeScreenProps {
  onComplete?: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentGreeting, setCurrentGreeting] = useState(0);

  const greetings = [
    "Hola",
    "Hello",
    "नमस्ते",
    "Bonjour",
    "Ciao",
    "こんにちは",
    "Hallo",
    "Olá",
    "السلام عليكم",
    "안녕하세요"
  ];

  useEffect(() => {
    let greetingInterval: NodeJS.Timeout;
    
    const startInterval = setTimeout(() => {
      greetingInterval = setInterval(() => {
        setCurrentGreeting((prev) => {
          if (prev === greetings.length - 1) {
            clearInterval(greetingInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 300);
    }, 500);

    const completionTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 1200);
    }, 3500);

    return () => {
      clearTimeout(startInterval);
      clearInterval(greetingInterval);
      clearTimeout(completionTimer);
    };
  }, [greetings.length, onComplete]);

  const curtainVariants = {
    visible: { y: 0 },
    hidden: { 
      y: "-100%",
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
      }
    }
  };

  const greetingVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.2 }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          variants={curtainVariants}
          initial="visible"
          exit="hidden"
        >
          <motion.div
            key={currentGreeting}
            className="text-black text-5xl md:text-7xl font-bold text-center"
            variants={greetingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {greetings[currentGreeting]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}