
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { GradientBackground } from './GradientBackground';
import { MouseSpotlight } from './MouseSpotlight';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const yText = useTransform(scrollY, [0, 500], [0, 200]); // Text moves slower
  const yGrid = useTransform(scrollY, [0, 500], [0, 100]); // Grid moves slightly
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0]); // Fade out on scroll

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      {/* Background Layers */}
      <GradientBackground />
      <MouseSpotlight />
      
      {/* Subtle Grid Texture with Parallax */}
      <motion.div 
        style={{ y: yGrid }}
        className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none z-[2]" 
      />
      
      {/* Vertical fade for grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white pointer-events-none z-[3]" />

      {/* Content */}
      <motion.div 
        style={{ y: yText, opacity: opacityFade }}
        className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center"
      >
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 md:mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-600 font-semibold font-display">
            MNRE Approved Vendor
          </span>
        </motion.div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 md:mb-8 text-gray-900 font-display">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Smarter Energy.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600"
          >
            Stronger Future.
          </motion.span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base md:text-xl text-gray-500 leading-relaxed mb-8 md:mb-10 font-medium"
        >
          We design and build advanced solar systems that maximize efficiency, minimize costs, and create lasting value for homes, industries, and commercial spaces.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto group relative px-8 py-4 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-gray-200 font-display tracking-wide">
            Explore Solutions
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="w-full sm:w-auto group px-8 py-4 bg-transparent border border-gray-200 text-gray-900 text-sm font-bold rounded-full hover:bg-gray-50 transition-all duration-300 backdrop-blur-sm font-display tracking-wide">
            Contact Us
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: opacityFade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium font-display">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.div>
    </section>
  );
};
