import React, { useEffect, useRef } from 'react';

export const GradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Configuration for blobs - Light Mode Palette
    const blobs = [
      { x: 0.2, y: 0.2, r: 0.5, color: [255, 200, 100], speed: 0.001 }, // Soft Orange
      { x: 0.8, y: 0.8, r: 0.6, color: [200, 220, 255], speed: 0.0015 }, // Soft Blue
      { x: 0.5, y: 0.5, r: 0.4, color: [255, 230, 200], speed: -0.001 }, // Warm Yellowish
      { x: 0.1, y: 0.9, r: 0.4, color: [240, 240, 250], speed: 0.002 }, // Very Light
    ];

    const render = () => {
      t += 0.003; // Slower, more calming speed
      
      // Clear with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob, i) => {
        const x = (blob.x + Math.sin(t * blob.speed * 100 + i) * 0.15) * canvas.width;
        const y = (blob.y + Math.cos(t * blob.speed * 100 + i * 2) * 0.15) * canvas.height;
        const radius = blob.r * Math.max(canvas.width, canvas.height);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        
        // Light, airy opacity
        gradient.addColorStop(0, `rgba(${blob.color[0]}, ${blob.color[1]}, ${blob.color[2]}, 0.3)`);
        gradient.addColorStop(0.5, `rgba(${blob.color[0]}, ${blob.color[1]}, ${blob.color[2]}, 0.1)`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};