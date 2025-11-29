
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Zap, Factory, Lightbulb, Check, ArrowRight, Sparkles } from 'lucide-react';

// --- Abstract 3D Visuals ---

const SolarVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center perspective-1000">
    <motion.div 
      initial={{ rotateX: 20, rotateY: -20, scale: 0.9 }}
      animate={{ 
        rotateX: [20, 25, 20], 
        rotateY: [-20, -10, -20],
        translateY: [0, -10, 0]
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-2xl relative overflow-hidden border border-blue-400/30"
    >
      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Shimmer Effect */}
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
      />
      
      {/* Reflection */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
    </motion.div>
    
    {/* Floating Particles */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]"
        animate={{ 
          y: [-20, -100], 
          x: [0, (i % 2 === 0 ? 20 : -20)], 
          opacity: [0, 1, 0] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          delay: i * 0.8, 
          ease: "easeOut" 
        }}
      />
    ))}
  </div>
);

const HeaterVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Tank Body */}
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-24 h-48 md:w-32 md:h-64 bg-gradient-to-b from-red-100 to-red-200 rounded-full relative overflow-hidden border border-red-200 shadow-xl backdrop-blur-sm"
    >
      {/* Liquid Fill */}
      <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-orange-500 to-orange-300 opacity-80" />
      
      {/* Rising Bubbles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-1/2 w-4 h-4 bg-white/40 rounded-full"
          style={{ left: `${20 + Math.random() * 60}%` }}
          animate={{ 
            y: [-20, -200], 
            scale: [0.5, 1.2],
            opacity: [0.6, 0] 
          }}
          transition={{ 
            duration: 2 + Math.random() * 2, 
            repeat: Infinity, 
            delay: Math.random() * 2 
          }}
        />
      ))}
      
      {/* Glass Highlight */}
      <div className="absolute top-4 left-4 w-4 h-40 md:h-56 bg-white/40 rounded-full blur-[1px]" />
    </motion.div>
    
    {/* Heat Waves */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ 
          width: 60 + i * 20, 
          height: 60 + i * 20, 
          border: '2px solid rgba(249, 115, 22, 0.2)',
          borderRadius: '50%'
        }}
        animate={{ scale: [1, 1.2], opacity: [1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
      />
    ))}
  </div>
);

const LightVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Pole */}
    <div className="w-2 h-36 md:h-48 bg-gray-800 absolute bottom-10 rounded-full" />
    
    {/* Light Head */}
    <motion.div 
      animate={{ 
        boxShadow: [
          "0 0 20px rgba(59, 130, 246, 0.4)",
          "0 0 60px rgba(59, 130, 246, 0.8)",
          "0 0 20px rgba(59, 130, 246, 0.4)"
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-32 h-12 md:w-40 md:h-16 bg-white rounded-t-full rounded-b-lg relative z-10 flex items-center justify-center mb-16 md:mb-24"
    >
      {/* Bulb Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-blue-400/30 rounded-full blur-xl" />
      <div className="w-20 h-3 md:w-24 md:h-4 bg-blue-100 rounded-full blur-[2px]" />
    </motion.div>

    {/* Light Cone */}
    <div className="absolute top-[45%] w-48 h-48 md:w-64 md:h-64 bg-gradient-to-b from-blue-500/10 to-transparent [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)] pointer-events-none" />
  </div>
);

// --- Data ---

const PRODUCTS = [
  {
    id: 0,
    title: "Solar Power Plants",
    category: "On-Grid & Hybrid",
    description: "Premium rooftop solar solutions designed for maximum energy generation. Featuring high-efficiency Mono PERC panels and smart inverter technology.",
    features: ["25-Year Performance Warranty", "Remote Monitoring App", "Net Metering Support"],
    visual: <SolarVisual />,
    theme: "orange"
  },
  {
    id: 1,
    title: "Krishna Water Heaters",
    category: "Our Manufacturing",
    description: "Engineered for Indian homes, our solar water heaters use advanced vacuum tube technology to retain heat for up to 48 hours.",
    features: ["Food-Grade Stainless Steel", "High-Density PUF Insulation", "Corrosion Resistant"],
    visual: <HeaterVisual />,
    theme: "red"
  },
  {
    id: 2,
    title: "Solar Street Lights",
    category: "Smart Lighting",
    description: "Self-sustaining automated lighting for communities and industries. Integrated with motion sensors and long-life Lithium batteries.",
    features: ["Automatic Dusk-to-Dawn", "IP65 Weatherproof", "Zero Electricity Bill"],
    visual: <LightVisual />,
    theme: "blue"
  }
];

const THEMES = {
  orange: { bg: "bg-orange-50", text: "text-orange-600", accent: "bg-orange-500", light: "bg-orange-100" },
  red: { bg: "bg-red-50", text: "text-red-600", accent: "bg-red-500", light: "bg-red-100" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", accent: "bg-blue-500", light: "bg-blue-100" },
};

// --- Main Component ---

export const Products: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeProduct = PRODUCTS[activeTab];
  // @ts-ignore
  const theme = THEMES[activeProduct.theme];

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={sectionRef} id="products" className={`py-20 md:py-24 relative overflow-hidden transition-colors duration-1000 ${theme.bg}`}>
      
      {/* Ambient Background Blobs with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: yBlob1 }}
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full blur-[60px] md:blur-[100px] opacity-20 transition-colors duration-1000 ${theme.accent}`}
        />
        <motion.div 
          style={{ y: yBlob2 }}
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[60px] md:blur-[100px] opacity-20 transition-colors duration-1000 ${theme.accent}`}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm mb-6">
            <Sparkles size={14} className={theme.text} />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">World Class Products</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-display font-bold text-gray-900">
            Technology that <span className={`transition-colors duration-500 ${theme.text}`}>empowers.</span>
          </h2>
        </motion.div>

        {/* The Glass Stage */}
        <div className="w-full max-w-6xl h-auto min-h-[600px] md:min-h-0 md:h-[500px] relative perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="w-full h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[30px] md:rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-hidden"
            >
              {/* Text Content */}
              <div className="flex-1 space-y-6 md:space-y-8 relative z-10 text-center md:text-left order-2 md:order-1">
                <div>
                   <span className={`inline-block px-3 py-1 rounded-lg ${theme.light} ${theme.text} text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 md:mb-4`}>
                    {activeProduct.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
                    {activeProduct.title}
                  </h3>
                </div>
                
                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                  {activeProduct.description}
                </p>

                <div className="space-y-3">
                  {activeProduct.features.map((feature, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      className="flex items-center gap-3 justify-center md:justify-start"
                    >
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full ${theme.light} flex items-center justify-center`}>
                        <Check size={12} className={theme.text} />
                      </div>
                      <span className="text-sm md:text-base text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <button className="hidden md:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 group">
                  View Specifications
                  <span className={`w-8 h-px ${theme.accent} transition-all group-hover:w-16`} />
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Visual Container */}
              <div className="flex-1 w-full h-64 md:h-full relative flex items-center justify-center order-1 md:order-2">
                 {/* Glass Reflection effect behind visual */}
                 <div className="absolute inset-4 bg-gradient-to-tr from-white/20 to-transparent rounded-3xl border border-white/20 backdrop-blur-sm -z-10" />
                 {activeProduct.visual}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tab Switcher */}
        <div className="mt-8 md:mt-12 p-2 bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl md:rounded-full shadow-lg flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          {PRODUCTS.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveTab(product.id)}
              className="relative w-full md:w-auto px-6 py-4 md:px-6 md:py-3 rounded-2xl md:rounded-full text-sm font-bold transition-colors duration-300"
            >
              {activeTab === product.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gray-900 rounded-2xl md:rounded-full shadow-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10 flex items-center justify-center gap-2 ${activeTab === product.id ? 'text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                {activeTab === product.id && <Sparkles size={14} className="animate-pulse" />}
                {product.title}
              </span>
            </button>
          ))}
        </div>

        {/* Marquee Footer */}
        <div className="mt-16 md:mt-24 w-full">
           <p className="text-center text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Trusted Partners</p>
           <div className="w-full overflow-hidden flex mask-gradient relative">
              <div className="flex animate-scroll gap-12 md:gap-16 w-max opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {[...Array(6)].map((_, i) => (
                  <React.Fragment key={i}>
                    <span className="text-2xl md:text-3xl font-display font-bold text-gray-800">WAAREE</span>
                    <span className="text-2xl md:text-3xl font-display font-bold text-gray-800">VIKRAM SOLAR</span>
                    <span className="text-2xl md:text-3xl font-display font-bold text-gray-800">LUMINOUS</span>
                  </React.Fragment>
                ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};
