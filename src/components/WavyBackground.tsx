import React from 'react';
import { motion } from 'motion/react';

export default function WavyBackground() {
  // We define 5 layered wavy shapes.
  // Each wave is an SVG path that animates smoothly.
  // The colors match the light, premium, white/light-grey 3D paper-cut aesthetic of the video.
  const waveLayers = [
    {
      color: '#F4F4F6',
      shadow: 'rgba(0, 0, 0, 0.04) 0px 10px 30px',
      animateY: [0, -15, 10, 0],
      animateX: [0, 20, -15, 0],
      duration: 18,
      d: "M-100 100 C 200 300, 400 50, 900 150 C 1400 250, 1600 100, 2000 300 L2000 1000 L-100 1000 Z",
    },
    {
      color: '#ECECEF',
      shadow: 'rgba(0, 0, 0, 0.05) 0px 15px 35px',
      animateY: [0, 15, -20, 0],
      animateX: [0, -30, 20, 0],
      duration: 22,
      d: "M-100 200 C 300 150, 600 350, 1100 200 C 1500 100, 1700 250, 2000 150 L2000 1000 L-100 1000 Z",
    },
    {
      color: '#E2E2E6',
      shadow: 'rgba(0, 0, 0, 0.06) 0px 20px 40px',
      animateY: [0, -10, 15, 0],
      animateX: [0, 25, -25, 0],
      duration: 15,
      d: "M-100 350 C 400 450, 800 200, 1200 350 C 1600 500, 1800 300, 2000 400 L2000 1000 L-100 1000 Z",
    },
    {
      color: '#F0F0F3',
      shadow: 'rgba(0, 0, 0, 0.05) 0px 15px 30px',
      animateY: [0, 25, -15, 0],
      animateX: [0, -20, 15, 0],
      duration: 25,
      d: "M-100 500 C 500 400, 900 600, 1300 450 C 1700 300, 1900 500, 2000 420 L2000 1000 L-100 1000 Z",
    },
    {
      color: '#FFFFFF',
      shadow: 'rgba(0, 0, 0, 0.04) 0px 10px 25px',
      animateY: [0, -12, 12, 0],
      animateX: [0, 15, -15, 0],
      duration: 20,
      d: "M-100 650 C 600 550, 1000 700, 1400 600 C 1800 500, 1900 650, 2000 580 L2000 1000 L-100 1000 Z",
    }
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-white pointer-events-none select-none">
      {/* Soft background radial highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#F8F9FA] via-[#FFFFFF] to-[#E9ECEF]" />

      {/* SVG Waves Container */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Defined filters for realistic paper-cut shadows */}
          <filter id="wave-shadow-1" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="-2" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.06" />
          </filter>
          <filter id="wave-shadow-2" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="-4" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.08" />
          </filter>
          <filter id="wave-shadow-3" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="-5" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.09" />
          </filter>
          <filter id="wave-shadow-4" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="-6" dy="20" stdDeviation="24" floodColor="#000000" floodOpacity="0.07" />
          </filter>
          <filter id="wave-shadow-5" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="-8" dy="24" stdDeviation="28" floodColor="#000000" floodOpacity="0.05" />
          </filter>
        </defs>

        {waveLayers.map((layer, index) => (
          <motion.path
            key={index}
            d={layer.d}
            fill={layer.color}
            filter={`url(#wave-shadow-${index + 1})`}
            animate={{
              y: layer.animateY,
              x: layer.animateX,
            }}
            transition={{
              duration: layer.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Elegant, high-tech grid overlay matching the Antigravity design language */}
      <div 
        className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating abstract glowing points mimicking quantum nodes */}
      <div className="absolute inset-0">
        {[
          { top: '15%', left: '20%', delay: 0 },
          { top: '45%', left: '75%', delay: 1.5 },
          { top: '80%', left: '40%', delay: 0.8 },
          { top: '30%', left: '85%', delay: 2.3 },
          { top: '65%', left: '15%', delay: 1.1 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-500/20"
            style={{
              top: dot.top,
              left: dot.left,
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
            }}
            animate={{
              opacity: [0.15, 0.6, 0.15],
              scale: [0.9, 1.3, 0.9],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: dot.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
