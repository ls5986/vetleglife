import React from 'react';

export const ResponderLogo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="6" fill="#be185d"/>
    <path 
      d="M12 2L13.09 8.26L20 9L14.5 13.47L16.18 20.02L12 16.77L7.82 20.02L9.5 13.47L4 9L10.91 8.26L12 2Z" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 22V16" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
); 