import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
  starCount?: number;
}

const Starfield: React.FC<StarfieldProps> = ({ starCount = 100 }) => {
  const starfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starfieldRef.current) return;
    
    const container = starfieldRef.current;
    
    // Clear any existing stars
    container.innerHTML = '';
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size (0.5px to 2px)
      const size = Math.random() * 1.5 + 0.5;
      
      // Random opacity (0.3 to 0.8)
      const opacity = Math.random() * 0.5 + 0.3;
      
      // Random animation delay
      const delay = Math.random() * 5;
      
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.opacity = opacity.toString();
      star.style.animation = `twinkle 5s ease-in-out infinite ${delay}s`;
      
      container.appendChild(star);
    }
  }, [starCount]);

  return <div ref={starfieldRef} className="starfield" />;
};

export default Starfield;