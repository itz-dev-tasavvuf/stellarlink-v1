import React from 'react';
import { MapPin as MapPinIcon } from 'lucide-react';

interface MapPinProps {
  size?: number;
  color?: string;
  onClick?: () => void;
  isHighlighted?: boolean;
}

const MapPin: React.FC<MapPinProps> = ({
  size = 24,
  color = '#8B5CF6',
  onClick,
  isHighlighted = false
}) => {
  return (
    <div 
      className={`relative cursor-pointer transition-all duration-300 ${
        isHighlighted ? 'scale-125' : 'hover:scale-110'
      }`}
      onClick={onClick}
    >
      <MapPinIcon 
        size={size} 
        color={color} 
        fill={isHighlighted ? color : 'transparent'} 
        strokeWidth={isHighlighted ? 3 : 2} 
      />
      
      {/* Ripple effect for highlighted pins */}
      {isHighlighted && (
        <div className="absolute -inset-2 rounded-full border-2 border-stellar-500 animate-ping opacity-50"></div>
      )}
    </div>
  );
};

export default MapPin;