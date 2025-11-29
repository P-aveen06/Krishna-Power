
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Zap, TrendingUp, DollarSign, Leaf, Cloud } from 'lucide-react';

// --- CSS Art Scenes ---

interface CloudPropProps {
  delay?: number;
  top?: string;
  scale?: number;
  duration?: number;
}

const CloudProp: React.FC<CloudPropProps> = ({ delay = 0, top = '10%', scale = 1, duration = 20 }) => (
  <motion.div
    initial={{ x: '-100%' }}
    animate={{ x: '400%' }}
    transition={{ duration: duration, repeat: Infinity, ease: "linear", delay: delay }}
    className="absolute text-white/40 pointer-events-none"
    style={{ top, transform: `scale(${scale})` }}
  >
    <Cloud fill="currentColor" size={48} className="drop-shadow-sm" />
  </motion.div>
);

const SunProp = () => (
  <div className="absolute top-8 right-8 w-20 h-20">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="w-full h-full border-2 border-dashed border-yellow-300 rounded-full absolute inset-0" 
    />
    <div className="absolute inset-4 bg-yellow-400 rounded-full shadow-[0_0_30px_rgba(250,204,21,0.6)] animate-pulse" />
  </div>
);

const FarmScene = () => (
  <div className="w-full h-64 md:h-full min-h-[300px] bg-gradient-to-b from-sky-200 to-sky-100 relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
    <SunProp />
    <CloudProp delay={0} top="15%" duration={25} />
    <CloudProp delay={10} top="25%" scale={0.8} duration={30} />
    
    {/* Ground */}
    <div className="absolute bottom-0 w-full h-1/3 bg-[#4ade80] rounded-t-[50%] scale-150 translate-y-4" />
    
    {/* Crops */}
    <div className="absolute bottom-12 w-full flex justify-center gap-8 px-10">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center origin-bottom"
        >
          <div className="w-4 h-4 bg-green-600 rounded-full" />
          <div className="w-1 h-8 bg-green-700" />
        </motion.div>
      ))}
    </div>

    {/* Pump & Water */}
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
      <div className="w-16 h-20 bg-gray-700 rounded-lg shadow-xl relative border-b-4 border-gray-900">
        <div className="absolute top-1/2 -right-4 w-6 h-2 bg-gray-600" /> {/* Pipe */}
        <motion.div 
          animate={{ height: [0, 40], opacity: [0.8, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute top-[55%] -right-4 w-2 bg-blue-400 rounded-full origin-top transform rotate-12"
        />
      </div>
    </div>
  </div>
);

const HomeScene = () => (
  <div className="w-full h-64 md:h-full min-h-[300px] bg-gradient-to-b from-indigo-200 to-purple-100 relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
    <SunProp />
    <CloudProp delay={5} top="10%" duration={35} />
    
    {/* Ground */}
    <div className="absolute bottom-0 w-full h-24 bg-gray-100" />
    
    {/* House */}
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48">
      {/* Roof */}
      <div className="w-56 -ml-4 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-gray-800 relative">
        {/* Panels on Roof */}
        <div className="absolute top-2 left-4 right-4 bottom-2 bg-blue-900 flex flex-wrap gap-0.5 p-0.5 opacity-90 skew-x-12 transform origin-bottom-left">
           {[...Array(6)].map((_, i) => (
             <motion.div 
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              className="flex-1 min-w-[30%] bg-blue-500 rounded-[1px]" 
             />
           ))}
        </div>
      </div>
      {/* Body */}
      <div className="w-48 h-32 bg-white shadow-lg relative flex justify-center items-end pb-0">
        <div className="w-12 h-20 bg-amber-900 rounded-t-lg" /> {/* Door */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-sky-200 border-2 border-gray-100 rounded-lg" /> {/* Window */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-sky-200 border-2 border-gray-100 rounded-lg" /> {/* Window */}
      </div>
    </div>
  </div>
);

// --- Stats Component ---

interface StatBadgeProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}

const StatBadge: React.FC<StatBadgeProps> = ({ icon: Icon, value, label, color }) => (
  <motion.div 
    whileHover={{ scale: 1.05, y: -2 }}
    className={`flex-1 p-4 rounded-2xl border ${color} bg-white/50 backdrop-blur-sm flex flex-col items-center text-center gap-2 transition-shadow hover:shadow-lg`}
  >
    <div className="p-2 rounded-full bg-white shadow-sm">
      <Icon size={18} className="text-gray-700" />
    </div>
    <div>
      <div className="text-lg font-bold font-display text-gray-900">{value}</div>
      <div className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</div>
    </div>
  </motion.div>
);

// --- Main Component ---

export const Projects: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} id="projects" className="py-32 bg-white relative overflow-hidden">
      
      {/* Background Decoration with Parallax */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: yBlob1 }}
          className="absolute top-20 -left-20 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50" 
        />
        <motion.div 
          style={{ y: yBlob2 }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-orange-500 font-bold tracking-widest uppercase text-xs font-display mb-4 block"
          >
            Case Studies
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6"
          >
            Real stories of <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">energy independence.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-500 text-lg"
          >
            See how we help families and farmers transform their lives with the power of the sun.
          </motion.p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-12">
          
          {/* Project 1: Agriculture */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-shadow duration-500"
          >
            {/* Visual Side */}
            <div className="w-full md:w-5/12 relative">
               <FarmScene />
            </div>

            {/* Content Side */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm uppercase tracking-wider mb-4">
                <Leaf size={16} />
                <span>Agricultural Success</span>
              </div>
              
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">Diesel-Free Farming</h3>
              <div className="flex items-center gap-2 text-gray-400 mb-6 text-sm">
                <MapPin size={14} />
                <span>Pari, Ariyalur District</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                Farmer Pari faced huge losses due to diesel costs for his 5HP pump. 
                We installed an off-grid solar solution that eliminated fuel dependency 
                and provided reliable daytime irrigation for his 4-acre land.
              </p>

              <div className="flex flex-wrap gap-4">
                <StatBadge icon={DollarSign} value="₹45k" label="Saved / Year" color="border-green-100 bg-green-50/30" />
                <StatBadge icon={Zap} value="100%" label="Diesel Free" color="border-green-100 bg-green-50/30" />
                <StatBadge icon={TrendingUp} value="3-4 Yrs" label="ROI Period" color="border-green-100 bg-green-50/30" />
              </div>
            </div>
          </motion.div>

          {/* Project 2: Residential */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row-reverse overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-shadow duration-500"
          >
            {/* Visual Side */}
            <div className="w-full md:w-5/12 relative">
               <HomeScene />
            </div>

            {/* Content Side */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider mb-4">
                <Zap size={16} />
                <span>Residential Rooftop</span>
              </div>
              
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">The Zero-Bill Home</h3>
              <div className="flex items-center gap-2 text-gray-400 mb-6 text-sm">
                <MapPin size={14} />
                <span>Prathibha Residence, Villupuram</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                Ms. Prathibha wanted to reduce her ₹2,800 monthly bill. We installed a 
                4kW On-Grid system with Waaree panels. Her bill dropped to ₹500, and 
                she now exports excess power back to the grid.
              </p>

              <div className="flex flex-wrap gap-4">
                <StatBadge icon={DollarSign} value="₹27k+" label="Saved / Year" color="border-indigo-100 bg-indigo-50/30" />
                <StatBadge icon={Leaf} value="4.8T" label="CO₂ Reduced" color="border-indigo-100 bg-indigo-50/30" />
                <StatBadge icon={TrendingUp} value="85%" label="Bill Drop" color="border-indigo-100 bg-indigo-50/30" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
