
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Sub-components for 3D CSS Illustrations ---

const SunOrb = () => (
  <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-orange-400 blur-[40px] opacity-40 animate-pulse" />
    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-300 via-orange-500 to-red-600 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2),inset_10px_10px_20px_rgba(255,255,255,0.4)]" />
    <div className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full border border-orange-200/30 animate-[spin_10s_linear_infinite]" />
    <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full border border-orange-200/10 animate-[spin_15s_linear_infinite_reverse]" />
  </div>
);

const WaterDrop = () => (
  <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-blue-400 blur-[40px] opacity-30" />
    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-b from-blue-300 to-blue-600 rounded-t-full rounded-br-full rounded-bl-xl shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.2),inset_5px_5px_15px_rgba(255,255,255,0.5)] transform -rotate-45" />
    {/* Reflection */}
    <div className="absolute top-8 right-10 w-3 h-6 bg-white opacity-40 rounded-full transform -rotate-45 blur-[1px]" />
  </div>
);

const GridBlock = () => (
  <div className="relative w-32 h-32 md:w-40 md:h-40 perspective-1000 flex items-center justify-center">
    <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-900 transform rotate-x-12 rotate-z-45 shadow-2xl border border-gray-700 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </div>
  </div>
);

const AgriLeaf = () => (
  <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-green-400 blur-[40px] opacity-30" />
    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-300 to-green-700 rounded-tr-[50px] rounded-bl-[50px] shadow-lg transform rotate-45 border-r-4 border-b-4 border-green-800/20" />
    <div className="absolute w-28 h-28 md:w-32 md:h-32 border-2 border-dashed border-green-300/30 rounded-full animate-[spin_20s_linear_infinite]" />
  </div>
);

const StreetLight = () => (
  <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
     <div className="absolute inset-0 rounded-full bg-yellow-200 blur-[50px] opacity-20" />
     <div className="w-3 h-24 md:w-4 md:h-28 bg-gray-800 rounded-full relative">
        <div className="absolute -top-5 -left-6 w-16 h-6 md:-top-6 md:-left-8 md:w-20 md:h-8 bg-gray-900 rounded-t-full" />
        <div className="absolute -top-2 -left-4 w-12 h-10 md:-left-6 md:w-16 md:h-12 bg-yellow-100/50 blur-md rounded-[100%]" />
     </div>
  </div>
);

// --- Typing Text Component ---

const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Triggers when element is 100px from bottom of viewport
  
  useEffect(() => {
    if (isInView) {
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index === text.length) clearInterval(intervalId);
      }, 100); // Slower typing (100ms) for better visibility
      return () => clearInterval(intervalId);
    }
  }, [text, isInView]);

  return (
    <span ref={ref} className="font-mono text-orange-600 inline-block min-h-[1.5em]">
      {displayedText}
      <motion.span 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block ml-1 w-2 h-6 bg-orange-600 align-middle"
      />
    </span>
  );
};

// --- Main Service Card Component ---

interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
  illustration: React.ReactNode;
  tags: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, index, illustration, tags }) => {
  // Alternate colors slightly for depth
  const bgColors = ['bg-white', 'bg-gray-50', 'bg-white', 'bg-gray-50', 'bg-white'];

  return (
    <div 
      className={`sticky mb-8 w-full max-w-5xl mx-auto rounded-[2.5rem] md:rounded-[3rem] border border-gray-200 shadow-xl md:shadow-2xl overflow-hidden ${bgColors[index % bgColors.length]}`}
      style={{ 
        // Mobile: auto height for content fitting. Desktop: fixed 500px for stacking effect.
        // We use a CSS class for responsive height below, but style is used for sticky positioning
        top: `calc(100px + ${index * 20}px)`, 
        zIndex: index + 1
      }}
    >
      <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
        {/* Text Content */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative order-2 md:order-1">
          <div className="absolute top-4 left-6 md:top-8 md:left-10 text-6xl md:text-9xl font-display font-bold text-gray-100 select-none -z-10">
            0{index + 1}
          </div>
          
          <div className="flex gap-2 mb-4 md:mb-6 flex-wrap mt-8 md:mt-0">
            {tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-600">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            {title}
          </h3>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-6 md:mb-8 max-w-md">
            {description}
          </p>
          
          <button className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-black group w-max">
            Learn More 
            <span className="w-8 h-px bg-black transition-all group-hover:w-16" />
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Visual Content */}
        <div className="w-full md:flex-1 h-64 md:h-auto bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border-b md:border-b-0 md:border-l border-gray-100 relative overflow-hidden group order-1 md:order-2">
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
          />
          
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="cursor-pointer transform scale-90 md:scale-100"
          >
            {illustration}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- Main Section ---

export const Services: React.FC = () => {
  const services = [
    {
      title: "On-Grid Solar Power Plants",
      description: "Maximize your savings with grid-tied systems. Export excess power and reduce your electricity bills to near zero.",
      illustration: <SunOrb />,
      tags: ["Residential", "Commercial", "Net Metering"]
    },
    {
      title: "Solar Water Heaters",
      description: "Our own manufactured brand 'Krishna Solar'. Advanced heat absorption for consistent hot water, year-round.",
      illustration: <WaterDrop />,
      tags: ["Manufacturing", "Thermal", "Efficient"]
    },
    {
      title: "Industrial Solar EPC",
      description: "Large-scale turnkey projects with superior ROI. We handle design, procurement, and construction for factories.",
      illustration: <GridBlock />,
      tags: ["Turnkey", "High Capacity", "O&M"]
    },
    {
      title: "Agricultural Pumps",
      description: "Reliable water pumping solutions for farmers. Independent of the grid, powered purely by the sun.",
      illustration: <AgriLeaf />,
      tags: ["Farming", "Irrigation", "Off-Grid"]
    },
    {
      title: "Smart Street Lights",
      description: "Eco-friendly lighting for roads and campuses. Automatic dusk-to-dawn operation with lithium batteries.",
      illustration: <StreetLight />,
      tags: ["Infrastructure", "Smart City", "LED"]
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-white relative">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 md:pl-10 border-l-2 border-orange-500">
          <h2 className="text-4xl md:text-7xl font-display font-bold text-gray-900 mb-4 tracking-tight">
            Our Services
          </h2>
          <div className="text-lg md:text-2xl font-medium text-gray-400 flex flex-wrap items-center gap-2">
            We provide &gt; <TypingText text="Engineering Excellence" />
          </div>
        </div>

        {/* Sticky Cards Container */}
        <div className="relative pb-24">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              index={index}
              {...service}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
