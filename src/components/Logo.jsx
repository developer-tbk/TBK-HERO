import React from 'react';

const Logo = ({ className = 'w-12 h-12' }) => {
  return (
    <img 
      src="/logo.png" 
      alt="TBK Logo" 
      className={`${className} object-contain transition-all duration-300`}
    />
  );
};

export default Logo;
