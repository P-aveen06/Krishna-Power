
import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

/**
 * Logo component that renders the Krishna Solar brand identity.
 * Assumes the logo image is saved as 'logo.png' in the public directory.
 * Adapts to container height defined in className.
 */
export const Logo: React.FC<LogoProps> = ({ className = "h-16", variant = 'dark' }) => {
  const [hasError, setHasError] = useState(false);

  // Fallback to text logo if image fails to load
  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center leading-none font-display font-bold select-none ${className}`}>
        <div className="flex items-center gap-1 tracking-tighter text-xl md:text-2xl">
          <span className={variant === 'dark' ? 'text-gray-900' : 'text-white'}>
            KRISHNA
          </span>
          <span className="text-orange-500">
            SOLAR
          </span>
        </div>
        <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-sans font-bold mt-1 ${variant === 'dark' ? 'text-orange-500/80' : 'text-white/60'}`}>
          Sun Shines Everywhere
        </span>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <img 
        src="/logo.png" 
        alt="Krishna Solar" 
        onError={() => setHasError(true)}
        className={`
          h-full w-auto object-contain transition-all duration-300
          ${variant === 'light' ? 'brightness-0 invert opacity-90' : ''}
        `}
      />
    </div>
  );
};
