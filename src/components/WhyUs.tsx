import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { playHoverSound, playClickSound } from '../utils/sound';

interface PrincipleItem {
  number: string;
  statement: string;
  tag: string;
  desc: string;
}

const principles: PrincipleItem[] = [
  {
    number: '01',
    statement: 'CLEAN CODE.',
    tag: 'Zero Technical Debt',
    desc: 'Type-safe strict architectures built for maintainability, speed, and deterministic execution.',
  },
  {
    number: '02',
    statement: 'DIRECT ACCESS.',
    tag: 'Zero Account Managers',
    desc: 'Direct pair-engineering with lead architects. Instant decisions, zero bureaucratic latency.',
  },
  {
    number: '03',
    statement: 'FULL IP OWNERSHIP.',
    tag: '100% Day-1 Rights',
    desc: 'All source code, design systems, and model weights belong entirely to you from day one.',
  },
  {
    number: '04',
    statement: 'MODERN ENGINEERING.',
    tag: 'React 19 & Distributed Systems',
    desc: 'Production-tested modern frameworks, edge streaming, sub-second TTFB, and zero-downtime CI/CD.',
  },
  {
    number: '05',
    statement: 'AI-NATIVE THINKING.',
    tag: 'Autonomous Multi-Agents & RAG',
    desc: 'Grounded intelligence pipelines and agentic tooling that automate operations and deliver real ROI.',
  },
  {
    number: '06',
    statement: 'BUILT TO SCALE.',
    tag: '99.99% Cloud SLA',
    desc: 'Battle-tested cloud infrastructure engineered to comfortably handle viral growth and traffic spikes.',
  },
];

export const WhyUs: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      id="why-us"
      className="relative w-full min-h-[90vh] lg:h-screen lg:max-h-[920px] bg-[#000000] border-t border-[#2E2E2E]/60 flex flex-col justify-between py-10 lg:py-12 overflow-hidden"
    >
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2e2e2e12_1px,transparent_1px),linear-gradient(to_bottom,#2e2e2e12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      {/* Top Header Row */}
      <div className="grid-layout relative z-10">
        <div className="col-span-full flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#2E2E2E]/60 pb-5 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF4D00] tracking-widest uppercase mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>// 06 — STUDIO OPERATING PRINCIPLES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.04em] text-[#E6E6E6]">
              Why Ambitious Teams <br className="hidden sm:inline" />
              <span className="text-[#C4C4C4] hover:text-[#FF4D00] transition-colors">
                Partner With Kshirsagar.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#757575] self-start sm:self-end">
            <span className="flex items-center gap-1.5 text-[#00FF9B]">
              <ShieldCheck className="w-4 h-4 text-[#00FF9B]" />
              <span>GUARANTEED RIGOR</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">[ 06 CORE PILLARS ]</span>
          </div>
        </div>
      </div>

      {/* Compact 3x2 Matrix Grid (Fits cleanly in 1 screen) */}
      <div className="grid-layout relative z-10 my-auto py-4">
        <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {principles.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onMouseEnter={() => {
                setCursor('explore', item.tag.toUpperCase());
                playHoverSound();
              }}
              onMouseLeave={resetCursor}
              onClick={() => playClickSound()}
              className="relative p-5 sm:p-6 rounded-xs border border-[#2E2E2E] bg-[#0A0A0A]/90 hover:bg-[#111111] hover:border-[#FF4D00]/70 transition-all duration-200 group flex flex-col justify-between min-h-[140px] sm:min-h-[160px] overflow-hidden"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#757575]/40 group-hover:border-[#FF4D00] transition-colors" />

              {/* Card Header: Number & Tag */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="font-mono text-xs font-extrabold text-[#757575] group-hover:text-[#FF4D00] transition-colors">
                    {item.number} //
                  </span>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-xs bg-[#2E2E2E]/60 text-[#C4C4C4] border border-[#2E2E2E] group-hover:border-[#FF4D00]/40 group-hover:text-white transition-colors">
                    {item.tag}
                  </span>
                </div>

                {/* Statement Headline */}
                <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-[#E6E6E6] tracking-tight group-hover:text-[#FF4D00] transition-colors mb-2">
                  {item.statement}
                </h3>

                {/* Subtext description */}
                <p className="text-xs sm:text-sm text-[#757575] group-hover:text-[#C4C4C4] leading-relaxed transition-colors">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Micro Action */}
              <div className="pt-3 mt-3 border-t border-[#2E2E2E]/50 flex items-center justify-between text-[11px] font-mono text-[#757575] group-hover:text-[#E6E6E6] transition-colors">
                <span>COMMITMENT VERIFIED</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4D00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Compact Telemetry Strip */}
      <div className="grid-layout relative z-10 pt-4 border-t border-[#2E2E2E]/60 text-xs font-mono text-[#757575]">
        <div className="col-span-full flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-[#E6E6E6]">100% IP TRANSFER</span>
            <span className="text-[#2E2E2E]">/</span>
            <span className="text-[#E6E6E6]">15-MIN CRITICAL SLA</span>
            <span className="text-[#2E2E2E] hidden md:inline">/</span>
            <span className="text-[#E6E6E6] hidden md:inline">ZERO TECHNICAL DEBT</span>
          </div>

          <a
            href="#contact"
            onClick={() => playClickSound()}
            onMouseEnter={() => {
              setCursor('link');
              playHoverSound();
            }}
            onMouseLeave={resetCursor}
            className="actionable flex items-center gap-1.5 text-xs font-mono text-[#FF4D00]"
          >
            <span>COMMISSION THE STUDIO →</span>
          </a>
        </div>
      </div>
    </section>
  );
};
