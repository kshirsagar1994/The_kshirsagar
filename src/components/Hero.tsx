import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, CornerDownRight } from 'lucide-react';
import { ThreeCyberCore } from './ThreeCyberCore';
import { useCursor } from '../context/CursorContext';
import { playHoverSound } from '../utils/sound';

export const Hero: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#000000]">
      {/* 3D Interactive Cyber Core Ambient Canvas (Subtle, Background) */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <ThreeCyberCore />
      </div>

      {/* Subtle Grid Lines Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#2e2e2e10_1px,transparent_1px),linear-gradient(to_bottom,#2e2e2e10_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Metadata Tags */}
      <div className="grid-layout relative z-10 mb-8 lg:mb-16">
        <div className="col-span-full flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#757575] border-b border-[#2E2E2E]/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#FF4D00]">▶</span>
            <span>KSHIRSAGAR STUDIO // 2K26</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>CREATIVE ENGINEERING</span>
            <span>•</span>
            <span>AI & INTELLIGENT SYSTEMS</span>
            <span>•</span>
            <span>DIGITAL PRODUCTS</span>
          </div>
          <div className="flex items-center gap-2">
            <span>[ SOLAPUR, INDIA ]</span>
          </div>
        </div>
      </div>

      {/* Main Massive Typography (Directly mirroring Basement 2k26 intro.tsx) */}
      <div className="grid-layout relative z-10 my-auto">
        <article className="col-span-full lg:col-span-12 flex flex-col gap-6 text-[#E6E6E6]">
          {/* Main Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-pretty text-[2.75rem] leading-[2.6rem] sm:text-[4.2rem] sm:leading-[3.8rem] lg:text-[5.75rem] lg:leading-[5.1rem] 3xl:text-[6.5rem] 3xl:leading-[5.8rem] font-semibold tracking-[-0.04em]">
              WE BUILD DIGITAL <br />
              <span className="text-[#C4C4C4] hover:text-[#FF4D00] transition-colors cursor-default">
                EXPERIENCES.
              </span>
            </h1>
          </motion.div>

          {/* Subtitle & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[65%] 2xl:w-[55%] mt-4"
          >
            <p className="text-[#C4C4C4] text-base sm:text-lg lg:text-[1.375rem] lg:leading-[1.75rem] font-normal tracking-[-0.02em]">
              Kshirsagar is an independent creative technology studio.
              Partnering with visionary brands to design, engineer, and deploy high-impact software,
              autonomous AI systems, and modern digital platforms.
            </p>
          </motion.div>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-6 mt-6 pt-2"
          >
            <a
              href="#work"
              onMouseEnter={() => {
                setCursor('link');
                playHoverSound();
              }}
              onMouseLeave={resetCursor}
              className="actionable group flex items-center gap-2 text-sm lg:text-base font-semibold text-[#E6E6E6]"
            >
              <span>EXPLORE SELECTED WORK</span>
              <CornerDownRight size={16} className="text-[#FF4D00] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </a>

            <div className="h-4 w-px bg-[#2E2E2E]" />

            <a
              href="#contact"
              onMouseEnter={() => {
                setCursor('link');
                playHoverSound();
              }}
              onMouseLeave={resetCursor}
              className="text-xs font-mono text-[#757575] hover:text-[#E6E6E6] transition-colors"
            >
              AVAILABLE FOR NEW COMMISSIONS →
            </a>
          </motion.div>
        </article>
      </div>

      {/* Bottom Ticker Indicator */}
      <div className="grid-layout relative z-10 mt-12">
        <div className="col-span-full flex items-center justify-between border-t border-[#2E2E2E]/60 pt-4 text-[11px] font-mono text-[#757575]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
            <span>SCROLL TO DISCOVER</span>
          </div>
          <div className="flex items-center gap-2">
            <span>[ 01 / 05 ]</span>
            <ArrowDown size={14} className="animate-bounce text-[#C4C4C4]" />
          </div>
        </div>
      </div>
    </section>
  );
};
