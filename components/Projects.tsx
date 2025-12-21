
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Zap, TrendingUp, DollarSign, Leaf } from 'lucide-react';

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
            <div className="w-full md:w-5/12 relative h-[300px] md:h-auto overflow-hidden">
               <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Loading state placeholder */}
               <motion.img 
                  src="/project-farm.jpg" 
                  alt="Agricultural Solar Project"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
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
            <div className="w-full md:w-5/12 relative h-[300px] md:h-auto overflow-hidden">
               <div className="absolute inset-0 bg-gray-200 animate-pulse" />
               <motion.img 
                  src="/project-home.jpg" 
                  alt="Residential Solar Project"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
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
