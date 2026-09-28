import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { playHoverSound, playClickSound } from '../utils/sound';

export const About: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="about" className="relative w-full bg-[#000000] py-20 lg:py-28 border-t border-[#2E2E2E]/60">
      <div className="grid-layout">
        {/* Section Label */}
        <div className="col-span-full mb-4">
          <span className="text-xs font-mono tracking-widest text-[#757575] uppercase">
            // ABOUT THE STUDIO &amp; FOUNDER
          </span>
        </div>

        {/* Left Column: Studio Headline & Bio Card */}
        <div className="col-span-full lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-12 mb-10 lg:mb-0">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.04em] text-[#E6E6E6] leading-tight mb-8">
              An independent studio dedicated to the intersection of code, design, and intelligence.
            </h2>
          </div>

          {/* Founder Bio Card */}
          <div className="p-5 bg-[#0A0A0A] border border-[#2E2E2E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xs">
            <div>
              <span className="text-xs font-mono text-[#757575] block">LEAD ENGINEER &amp; FOUNDER</span>
              <span className="text-lg font-semibold text-[#E6E6E6]">Ajay Kshirsagar</span>
              <p className="text-xs font-mono text-[#C4C4C4] mt-0.5">Full Stack &amp; AI Engineer · Solapur, India</p>
            </div>
            <a
              href="https://github.com/kshirsagar1994"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={() => {
                setCursor('link');
                playHoverSound();
              }}
              onMouseLeave={resetCursor}
              className="actionable flex items-center gap-1.5 text-xs font-mono text-[#FF4D00]"
            >
              <span>GITHUB PROFILE</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Right Column: Studio Metrics */}
        <div className="col-span-full lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#2E2E2E] pt-8 lg:pt-0 lg:pl-12">
          <div>
            <span className="text-xs font-mono text-[#757575] tracking-widest uppercase block mb-6">
              // STUDIO CAPACITY &amp; TELEMETRY
            </span>

            <div className="space-y-4">
              <div className="p-5 border border-[#2E2E2E] bg-[#0A0A0A] rounded-xs">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#E6E6E6] block">100%</span>
                <span className="block text-xs font-mono text-[#FF4D00] mt-1 font-bold">DIRECT COLLABORATION</span>
                <p className="text-xs text-[#757575] mt-1">Zero account management friction. Direct pairing with lead engineering.</p>
              </div>

              <div className="p-5 border border-[#2E2E2E] bg-[#0A0A0A] rounded-xs">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#E6E6E6] block">24/7</span>
                <span className="block text-xs font-mono text-[#00FF9B] mt-1 font-bold">DEPLOYED SYSTEM UPTIME</span>
                <p className="text-xs text-[#757575] mt-1">Automated multi-region cloud resilience with active monitoring.</p>
              </div>

              <div className="p-5 border border-[#2E2E2E] bg-[#0A0A0A] rounded-xs">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#FF4D00] block">ACTIVE</span>
                <span className="block text-xs font-mono text-[#E6E6E6] mt-1 font-bold">FOR NEW COMMISSIONS</span>
                <p className="text-xs text-[#757575] mt-1">Currently taking on Q2/Q3 high-impact engineering projects.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
