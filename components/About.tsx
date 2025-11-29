
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sun, Target, Zap, ArrowUpRight } from 'lucide-react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  delay?: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ 
  children, 
  className = "", 
  variant = 'light',
  delay = 0 
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const isDark = variant === 'dark';

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className={`relative overflow-hidden rounded-3xl border transition-colors duration-300 h-full flex flex-col
        ${isDark 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200 hover:border-gray-300'
        } ${className}`}
    >
      {/* Spotlight Effect Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(249, 115, 22, 0.08)'}, transparent 40%)`,
        }}
      />

      {/* Border Glow Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(249, 115, 22, 0.4)'}, transparent 40%)`,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'destination-out',
        }}
      />

      {/* Dark Mode Texture */}
      {isDark && (
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-overlay"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      )}

      {/* Content */}
      <div className="relative z-20 p-8 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-gray-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-12 h-px bg-orange-500"></span>
            <span className="text-orange-600 font-bold tracking-widest uppercase text-xs font-display">
              About Us
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-display font-bold leading-[1.1] text-gray-900 mb-8"
          >
            We are emerging leaders in renewable energy, building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">sustainable future.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            <p className="prose prose-lg text-gray-500 font-medium max-w-xl leading-relaxed">
              Krishna Power Technologies specializes in end-to-end Solar EPC services. 
              From design to installation, we offer reliable, cost-effective solutions for 
              residential, commercial, and industrial sectors across Tamil Nadu.
            </p>
            <div className="px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm flex items-center gap-3">
               <div className="bg-green-100 p-1.5 rounded-full">
                 <ShieldCheck className="text-green-600 w-4 h-4" />
               </div>
               <span className="text-gray-900 font-bold text-xs tracking-wide uppercase">MNRE-Approved Vendor</span>
            </div>
          </motion.div>
        </div>

        {/* Fancy Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(280px,auto)]">
          
          {/* Card 1: Who We Are (Span 7) */}
          <div className="md:col-span-3 lg:col-span-7">
            <SpotlightCard delay={0.1}>
              <div className="mb-auto">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                  <Sun className="text-orange-500 w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">Who We Are</h3>
                <p className="text-gray-500 leading-relaxed mb-4">
                  We combine innovation, technology, and expertise to deliver world-class solar projects. 
                  Our certified engineers ensure each system is designed for maximum efficiency.
                </p>
                <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100/50">
                   <p className="text-sm text-gray-600">
                     Also proud manufacturers of <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Krishna Solar Water Heaters</span>.
                   </p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 2: Mission (Span 5) */}
          <div className="md:col-span-3 lg:col-span-5">
            <SpotlightCard delay={0.2}>
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Target className="text-blue-500 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-500 leading-relaxed">
                To make clean energy accessible to all. We aim to reduce dependency on conventional 
                power and help build a greener, self-sufficient India.
              </p>
              <div className="mt-auto pt-6 flex items-center gap-2 text-blue-500 font-semibold text-sm group cursor-pointer">
                <span>Our Philosophy</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </SpotlightCard>
          </div>

          {/* Card 3: Why Choose Us (Dark Mode, Span 5) */}
          <div className="md:col-span-3 lg:col-span-5">
            <SpotlightCard variant="dark" delay={0.3}>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 mt-2">
                {['End-to-End Solutions', 'BIS & IEC Certified', 'Professional Team', 'Fast Execution'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-400 font-mono">TRUSTED BY HUNDREDS</p>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 4: Vision (Span 7) */}
          <div className="md:col-span-3 lg:col-span-7">
            <SpotlightCard delay={0.4}>
              <div className="flex flex-col h-full justify-between">
                <div>
                   <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="text-purple-500 w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-500 leading-relaxed text-lg">
                    To become India’s most trusted solar brand.
                  </p>
                </div>
                <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 relative overflow-hidden">
                   {/* Decorative background circle */}
                   <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50" />
                   <p className="relative z-10 text-gray-600 font-medium italic">
                    "We aspire to make every home, farm, and business powered by the limitless energy of the sun."
                   </p>
                </div>
              </div>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
};
