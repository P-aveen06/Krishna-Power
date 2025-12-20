
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Logo } from './Logo';

// --- Constellation Canvas Animation ---

const ConstellationMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000); // Density
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';

      particles.forEach((p, i) => {
        // Update
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Connect
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist / 1500})`; // Fade out
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />;
};

// --- Main Component ---

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative bg-gray-900 text-white py-32 overflow-hidden">
      
      {/* Backgrounds */}
      <ConstellationMesh />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-1/2 -left-1/4 w-[1000px] h-[1000px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Left Column: Info */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-px bg-orange-500"></span>
                <span className="text-orange-500 font-bold tracking-widest uppercase text-xs font-display">
                  Get in Touch
                </span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight">
                Ready to switch to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  clean energy?
                </span>
              </h2>
              
              <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
                Contact us today for a free consultation. Whether it's for your home, farm, or factory, we have the perfect solar solution for you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <MapPin className="text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Krishna Solar,<br />
                      Villupuram, Tamil Nadu, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Phone className="text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <p className="text-gray-400 hover:text-white transition-colors cursor-pointer">+91 98765 43210</p>
                    <p className="text-gray-400 hover:text-white transition-colors cursor-pointer">+91 12345 67890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Mail className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Us</h4>
                    <p className="text-gray-400 hover:text-white transition-colors cursor-pointer">info@krishnasolar.com</p>
                    <p className="text-gray-400 hover:text-white transition-colors cursor-pointer">support@krishnasolar.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Glass Form */}
          <div className="flex-1 lg:max-w-lg">
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
              {/* Form Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

              <h3 className="text-2xl font-bold font-display mb-6">Send us a message</h3>
              
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-black/30 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-black/30 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your energy needs..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-black/30 transition-all resize-none"
                  />
                </div>

                <button className="w-full bg-white text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group">
                  Send Message
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.form>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
             <div className="mb-4 md:mb-2 flex justify-center md:justify-start">
               <Logo variant="light" className="h-20 md:h-24" />
             </div>
             <p className="text-sm text-gray-500">© 2024. Sun Shines Everywhere.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-blue-400 transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-pink-400 transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-blue-500 transition-all">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
