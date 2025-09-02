import React from 'react';

export const StartupLogo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="6" fill="#059669"/>
    <path 
      d="M7 12L10 9L13 12L16 9L19 12" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7 16L10 13L13 16L16 13L19 16" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
); 