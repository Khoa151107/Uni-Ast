import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  showText?: boolean;
  className?: string;
}

export default function Logo({ showText = true, className = "h-8 w-auto", ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 540 400"
      className={`${className} transition-all duration-200`}
      {...props}
    >
      <g transform="translate(20, 10)">
        {/* Styled modern black "U" */}
        <path
          d="M 90 80 
             L 90 200 
             A 90 90 0 0 0 270 200 
             L 270 80 
             L 215 80 
             L 215 200 
             A 35 35 0 0 1 145 200 
             L 145 80 
             Z"
          fill="#0f172a"
        />

        {/* Styled modern orange "A" */}
        <path
          d="M 310 80 
             L 230 250 
             L 285 250 
             L 300 220 
             L 390 220 
             L 405 250 
             L 460 250 
             L 380 80 
             Z 
             M 345 125 
             L 375 185 
             L 315 185 
             Z"
          fill="#f3722c"
        />

        {/* Swoosh line from "U" to "A" (forms the organic crossbar/connector) */}
        <path
          d="M 140 235 
             C 170 245, 230 245, 290 195 
             C 320 170, 360 160, 400 168 
             C 350 164, 310 185, 280 210 
             C 240 242, 180 245, 140 235 
             Z"
          fill="#f3722c"
        />
      </g>

      {/* Subtext: — UNI ASSISTANCE — */}
      {showText && (
        <g transform="translate(0, 310)">
          {/* Left orange line separator */}
          <line 
            x1="40" 
            y1="25" 
            x2="110" 
            y2="25" 
            stroke="#f3722c" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
          />
          
          {/* Text UNI in Orange */}
          <text
            x="165"
            y="34"
            fill="#f3722c"
            fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="3"
            textAnchor="middle"
          >
            UNI
          </text>

          {/* Text ASSISTANCE in Charcoal Slate */}
          <text
            x="330"
            y="34"
            fill="#0f172a"
            fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
            fontWeight="800"
            fontSize="26"
            letterSpacing="3"
            textAnchor="middle"
          >
            ASSISTANCE
          </text>

          {/* Right orange line separator */}
          <line 
            x1="430" 
            y1="25" 
            x2="500" 
            y2="25" 
            stroke="#f3722c" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
          />
        </g>
      )}
    </svg>
  );
}
