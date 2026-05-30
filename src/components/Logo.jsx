import React from 'react';

const Logo = ({ className = 'w-12 h-12' }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={`${className} transition-all duration-300 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Metallic Gold Gradient */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="20%" stopColor="#D4AF37" />
          <stop offset="40%" stopColor="#AA7C11" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="80%" stopColor="#8C660B" />
          <stop offset="100%" stopColor="#FFE680" />
        </linearGradient>

        {/* Soft Glowing Backlight for depth */}
        <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur1" />
          <feGaussianBlur stdDeviation="8" result="blur2" />
          <feComponentTransfer in="blur1" result="glow1">
            <feFuncA type="linear" slope="0.8"/>
          </feComponentTransfer>
          <feComponentTransfer in="blur2" result="glow2">
            <feFuncA type="linear" slope="0.4"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="glow2" />
            <feMergeNode in="glow1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Emblem with Glow and Metallic Gradient */}
      <g 
        stroke="url(#goldGradient)" 
        strokeWidth="6" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        filter="url(#goldGlow)"
      >
        {/* Center Leaf Outline */}
        <path d="M100,120 C72,90 72,40 100,15 C128,40 128,90 100,120 Z" strokeWidth="6" />
        
        {/* Center Leaf Vein & Ribs */}
        <path d="M100,120 L100,32" strokeWidth="4" />
        <path d="M100,95 L84,82" strokeWidth="3" />
        <path d="M100,95 L116,82" strokeWidth="3" />
        <path d="M100,75 L82,62" strokeWidth="3" />
        <path d="M100,75 L118,62" strokeWidth="3" />
        <path d="M100,55 L84,42" strokeWidth="3" />
        <path d="M100,55 L116,42" strokeWidth="3" />
        <path d="M100,38 L88,27" strokeWidth="3" />
        <path d="M100,38 L112,27" strokeWidth="3" />

        {/* Left Leaf Sweeping Outlines */}
        <path d="M38,72 C38,105 72,125 100,125" strokeWidth="5.5" />
        <path d="M38,72 C55,62 80,72 100,110" strokeWidth="4.5" />

        {/* Right Leaf Sweeping Outlines */}
        <path d="M162,72 C162,105 128,125 100,125" strokeWidth="5.5" />
        <path d="M162,72 C145,62 120,72 100,110" strokeWidth="4.5" />
      </g>

      {/* Elegant Serif Font Branding */}
      <text 
        x="100" 
        y="178" 
        textAnchor="middle" 
        fontFamily="'Playfair Display', 'Times New Roman', Georgia, serif" 
        fontSize="54" 
        fontWeight="bold" 
        fill="url(#goldGradient)"
        filter="url(#goldGlow)"
        letterSpacing="0.04em"
      >
        TBK
      </text>
    </svg>
  );
};

export default Logo;

