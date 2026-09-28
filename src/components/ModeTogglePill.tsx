import React from 'react';
import { motion } from 'framer-motion';
import { playClickSound, playHoverSound } from '../utils/sound';

interface ModeTogglePillProps {
  currentMode: 'human' | 'machine';
  onToggle: (mode: 'human' | 'machine') => void;
}

export const ModeTogglePill: React.FC<ModeTogglePillProps> = ({ currentMode, onToggle }) => {
  return (
    <aside
      aria-label="Interface mode toggle"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div
        className={`flex items-center gap-1 p-1 rounded-full border shadow-2xl backdrop-blur-md transition-colors duration-300 ${
          currentMode === 'machine'
            ? 'border-[#FF4D00]/60 bg-black/95 shadow-[0_0_25px_rgba(255,77,0,0.3)]'
            : 'border-[#2E2E2E] bg-black/85 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Human mode button */}
        <button
          onClick={() => {
            if (currentMode !== 'human') {
              playClickSound();
              onToggle('human');
            }
          }}
          onMouseEnter={playHoverSound}
          className={`relative px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
            currentMode === 'human'
              ? 'text-[#FF4D00]'
              : 'text-[#C4C4C4] hover:text-white'
          }`}
        >
          {currentMode === 'human' && (
            <motion.div
              layoutId="mode-pill-active"
              className="absolute inset-0 bg-[#2E2E2E]/40 border border-[#2E2E2E] rounded-full -z-10"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span>HUMAN</span>
        </button>

        {/* Separator slash */}
        <span className="text-[10px] font-mono text-[#757575] select-none">/</span>

        {/* Machine mode button */}
        <button
          onClick={() => {
            if (currentMode !== 'machine') {
              playClickSound();
              onToggle('machine');
            }
          }}
          onMouseEnter={playHoverSound}
          className={`relative px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
            currentMode === 'machine'
              ? 'text-[#FF4D00]'
              : 'text-[#C4C4C4] hover:text-[#FF4D00]'
          }`}
        >
          {currentMode === 'machine' && (
            <motion.div
              layoutId="mode-pill-active"
              className="absolute inset-0 bg-[#FF4D00]/20 border border-[#FF4D00]/80 rounded-full -z-10"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                currentMode === 'machine' ? 'bg-[#FF4D00] animate-pulse' : 'bg-[#757575]'
              }`}
            />
            <span>MACHINE</span>
          </span>
        </button>
      </div>
    </aside>
  );
};
