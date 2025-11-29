
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const MouseSpotlight: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for a "fluid" feel (damped delay)
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update motion values with current mouse position
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-full h-full z-[1] overflow-hidden"
    >
      <motion.div
        className="absolute rounded-full mix-blend-multiply blur-[60px]"
        style={{
          left: springX,
          top: springY,
          x: '-50%', // Center the glow on the cursor
          y: '-50%',
          width: 600,
          height: 600,
          // Warm, sunny glow: Orange/Amber center fading to transparent
          // Increased opacity from 0.12 to 0.30 for better visibility
          background: 'radial-gradient(circle, rgba(255, 165, 0, 0.30) 0%, rgba(255, 200, 100, 0.1) 45%, rgba(255, 255, 255, 0) 70%)',
        }}
      />
    </motion.div>
  );
};
