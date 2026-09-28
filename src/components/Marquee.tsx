import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    'NEXT.JS / REACT',
    'TYPESCRIPT',
    'AI AGENTS & AUTOMATION',
    'THREE.JS / WEBGL',
    'FULL-STACK ARCHITECTURE',
    'PYTHON & FASTAPI',
    'CLOUD INFRASTRUCTURE',
    'CREATIVE INTERACTION',
    'UI/UX DESIGN SYSTEMS',
    'HIGH PERFORMANCE',
  ];

  return (
    <div className="w-full bg-[#000000] border-y border-[#2E2E2E]/60 py-3 overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-xs font-mono font-medium tracking-widest text-[#757575] hover:text-[#FF4D00] transition-colors">
              {item}
            </span>
            <span className="text-[#FF4D00] text-[8px]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
