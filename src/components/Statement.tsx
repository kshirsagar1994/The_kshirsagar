import React from 'react';
import { 
  Code2, 
  Target, 
  BrainCircuit, 
  CheckCircle2, 
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export const Statement: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const corePillars = [
    {
      title: 'Architectural Integrity',
      subtitle: 'ZERO-DEBT ENGINEERING',
      desc: 'Strict TypeScript, modular domain architecture, and end-to-end automated testing. We engineer resilient software systems that scale without accumulating hidden technical liabilities.',
      badge: 'Zero-Debt Code',
      icon: Code2,
      color: '#8b5cf6',
      accentGlow: 'rgba(139, 92, 246, 0.15)',
    },
    {
      title: 'Commercial Focus',
      subtitle: 'BUSINESS-DRIVEN ROI',
      desc: 'Code is an instrument for real enterprise revenue and operational speed. We align every sprint milestone directly with user conversion, retention, and tangible business velocity.',
      badge: 'Measurable ROI',
      icon: Target,
      color: '#06b6d4',
      accentGlow: 'rgba(6, 182, 212, 0.15)',
    },
    {
      title: 'Intelligent Systems',
      subtitle: 'APPLIED AI & AUTOMATION',
      desc: 'Production RAG workflows, self-refining agentic pipelines, and local LLM integrations. We turn passive databases into proactive autonomous intelligence for business leverage.',
      badge: 'Autonomous Ops',
      icon: BrainCircuit,
      color: '#ec4899',
      accentGlow: 'rgba(236, 72, 153, 0.15)',
    },
  ];

  const metrics = [
    { value: '99.99%', label: 'Production SLA', sub: 'High-availability multi-cloud clusters' },
    { value: '100%', label: 'IP Ownership', sub: 'Your complete code, git repo & copyright' },
    { value: '2-Week', label: 'Agile Sprints', sub: 'Continuous transparent bi-weekly delivery' },
    { value: '<15ms', label: 'Edge Render Velocity', sub: 'Lighthouse 95+ performance baseline' },
  ];

  return (
    <section
      id="statement"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-theme-secondary border-t border-theme overflow-hidden"
    >
      {/* Subtle Glow Background Blobs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-violet-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Pill Badge */}
        <div className="flex flex-col items-start mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>01 — Who We Are &amp; Our Philosophy</span>
          </div>

          {/* Editorial Big Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-theme-primary leading-[1.08] mb-6">
                Technology should solve problems,{' '}
                <span className="text-accent-gradient">
                  not create them.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-theme-secondary font-medium leading-relaxed mb-4">
                Kshirsagar is an elite creative technology and software engineering studio. We partner with ambitious startups and forward-thinking enterprises to design, engineer, and scale high-velocity digital products.
              </p>

              <p className="text-sm sm:text-base text-theme-muted leading-relaxed mb-8">
                We discard bloated legacy agency models and fragile prototype shortcuts. By pairing clean domain-driven architecture with direct senior engineer collaboration, every asset we deliver is built for speed, durability, and commercial impact.
              </p>

              {/* Guarantees Checkmarks */}
              <div className="space-y-3 mb-8">
                {[
                  '100% Code & IP Ownership from Day 1 — zero proprietary lock-in or licensing fees',
                  'Direct Senior Access — transparent bi-weekly sprints, video demos and direct Slack access',
                  'End-to-End Reliability — from system blueprint to multi-region cloud deployment',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-theme-secondary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  onMouseEnter={() => setCursor('cta')}
                  onMouseLeave={resetCursor}
                  className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center gap-2"
                >
                  <span>Partner With Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#services"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className="px-6 py-3 rounded-full border border-theme bg-theme-card hover:bg-white/10 text-theme-secondary hover:text-theme-primary font-mono text-xs font-semibold tracking-wide transition-colors"
                >
                  Explore Capabilities
                </a>
              </div>
            </div>

            {/* Right Column: 3 Pillar Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {corePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                    className="p-5 sm:p-6 rounded-2xl border border-theme bg-theme-card hover:border-violet-500/40 transition-all duration-300 relative group overflow-hidden shadow-sm"
                  >
                    <div
                      className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: pillar.color }}
                    />
                    
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm shrink-0"
                          style={{
                            backgroundColor: pillar.accentGlow,
                            borderColor: `${pillar.color}40`,
                            color: pillar.color,
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold tracking-widest text-violet-400 uppercase block">
                            {pillar.subtitle}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-theme-primary tracking-tight group-hover:text-violet-400 transition-colors">
                            {pillar.title}
                          </h3>
                        </div>
                      </div>

                      <span
                        className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-semibold"
                        style={{
                          backgroundColor: `${pillar.color}15`,
                          color: pillar.color,
                          border: `1px solid ${pillar.color}35`,
                        }}
                      >
                        {pillar.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-theme-muted leading-relaxed pl-13 relative z-10">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Studio Four Key Metrics Bar */}
        <div className="mt-14 pt-10 border-t border-theme grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-mono font-extrabold text-2xl sm:text-4xl text-theme-primary tracking-tight">
                {m.value}
              </span>
              <span className="text-xs sm:text-sm font-bold text-theme-primary mt-1">
                {m.label}
              </span>
              <span className="text-[11px] font-mono text-theme-muted mt-0.5">
                {m.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
