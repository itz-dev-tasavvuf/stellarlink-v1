import React from 'react';

interface InterestBadgeProps {
  interest: string;
  size?: 'sm' | 'md' | 'lg';
}

const InterestBadge: React.FC<InterestBadgeProps> = ({ interest, size = 'md' }) => {
  const getInterestType = (interest: string): string => {
    const interestLower = interest.toLowerCase();
    
    if (interestLower.includes('astronomy') || interestLower.includes('astrophysics')) {
      return 'astronomy';
    } else if (interestLower.includes('rocket') || interestLower.includes('propulsion')) {
      return 'rocketry';
    } else if (interestLower.includes('medicine') || interestLower.includes('biology')) {
      return 'medicine';
    } else {
      return 'engineering';
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const badgeType = getInterestType(interest);
  const classes = `badge badge-${badgeType} ${sizeClasses[size]}`;

  return (
    <span className={classes}>
      {interest}
    </span>
  );
};

export default InterestBadge;