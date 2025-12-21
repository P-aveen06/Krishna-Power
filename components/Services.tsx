
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Sub-components for 3D CSS Illustrations ---

const AgriLeaf = () => (
  <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-green-400 blur-[40px] opacity-30" />
    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-300 to-green-700 rounded-tr-[50px] rounded-bl-[50px] shadow-lg transform rotate-45 border-r-4 border-b-4 border-green-800/20" />
    <div className="absolute w-28 h-28 md:w-32 md:h-32 border-2 border-dashed border-green-300/30 rounded-full animate-[spin_20s_linear_infinite]" />
  </div>
);

// --- Typing Text Component ---

const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index === text.length) clearInterval(intervalId);
      }, 100);
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
  illustration?: React.ReactNode;
  image?: string;
  tags: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, index, illustration, image, tags }) => {
  const bgColors = ['bg-white', 'bg-gray-50', 'bg-white', 'bg-gray-50', 'bg-white'];

  return (
    <div
      className={`sticky mb-8 w-full max-w-5xl mx-auto rounded-[2.5rem] md:rounded-[3rem] border border-gray-200 shadow-xl md:shadow-2xl overflow-hidden ${bgColors[index % bgColors.length]}`}
      style={{
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
        <div className={`w-full md:flex-1 h-64 md:h-auto flex items-center justify-center border-b md:border-b-0 md:border-l border-gray-100 relative overflow-hidden group order-1 md:order-2 ${!image ? 'bg-gradient-to-br from-gray-50 to-gray-100' : ''}`}>

          {image ? (
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <motion.img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </div>
          ) : (
            <>
              {/* Grid pattern overlay for illustrations */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="cursor-pointer transform scale-90 md:scale-100 relative z-20"
              >
                {illustration}
              </motion.div>
            </>
          )}
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
      image: "/service-ongrid.jpeg",
      tags: ["Residential", "Commercial", "Net Metering"]
    },
    {
      title: "Solar Water Heaters",
      description: "Our own manufactured brand 'Krishna Solar'. Advanced heat absorption for consistent hot water, year-round.",
      image: "/service-heater.jpeg",
      tags: ["Manufacturing", "Thermal", "Efficient"]
    },
    {
      title: "Industrial Solar EPC",
      description: "Large-scale turnkey projects with superior ROI. We handle design, procurement, and construction for factories.",
      image: "/service-industrial.jpeg",
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
      image: "/service-light.jpeg",
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
