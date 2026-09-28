import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  Map, 
  Palette, 
  Code2, 
  CheckCircle, 
  Rocket, 
  TrendingUp, 
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { playClickSound, playHoverSound } from '../utils/sound';

interface ExecutionMeta {
  label: string;
  value: string;
  colorClass?: string;
}

interface Phase {
  number: string;
  name: string;
  category: string;
  title: string;
  desc: string;
  deliverables: string[];
  sla: string;
  icon: React.ElementType;
  color: string;
  execution: {
    badge: string;
    headline: string;
    description: string;
    metrics: ExecutionMeta[];
  };
}

export const Process: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const { setCursor, resetCursor } = useCursor();

  const phases: Phase[] = [
    {
      number: '01',
      name: 'DISCOVER',
      category: 'Discovery & Analysis',
      title: 'Requirements & Domain Blueprint',
      desc: 'We conduct rigorous workshops to dissect business objectives, user journeys, technical constraints, and competitive edges before writing a single line of code.',
      deliverables: ['Discovery Workshop', 'Technical Feasibility Audit', 'System Architecture Blueprint', 'Target Conversion Goals'],
      sla: 'Days 1-3',
      icon: Search,
      color: '#8b5cf6',
      execution: {
        badge: 'Discovery Execution Standard',
        headline: 'Domain Clarity & Scope Lock',
        description: 'Collaborative analysis to dissect product requirements, validate technical feasibility, and eliminate architecture risks early.',
        metrics: [
          { label: 'Methodology', value: 'Interactive Architecture Workshops', colorClass: 'text-violet-400' },
          { label: 'Audit Scope', value: 'Zero-Ambiguity Feasibility Audit', colorClass: 'text-cyan-400' },
          { label: 'Milestone Gate', value: 'Signed System Architecture Blueprint', colorClass: 'text-amber-400' },
        ],
      },
    },
    {
      number: '02',
      name: 'STRATEGIZE',
      category: 'Strategy & Roadmap',
      title: 'Sprint Milestones & Tech Stack',
      desc: 'We define the full technological blueprint, database schema, API contracts, and bi-weekly sprint delivery roadmaps with transparent deliverables.',
      deliverables: ['Milestone Roadmaps', 'Database Schema Design', 'Sprint Backlog Estimation', 'Security & Compliance Plan'],
      sla: 'Days 4-7',
      icon: Map,
      color: '#3b82f6',
      execution: {
        badge: 'Strategy & Roadmap Standard',
        headline: 'Architectural Blueprint Lock',
        description: 'Every database schema, API contract, and milestone delivery burndown chart is frozen before engineering begins.',
        metrics: [
          { label: 'Architecture', value: 'Database Schema & API Contract Lock', colorClass: 'text-blue-400' },
          { label: 'Sprint Plan', value: 'Bi-Weekly Milestones & Backlog Scope', colorClass: 'text-cyan-400' },
          { label: 'Security Spec', value: 'Data Encryption & SOC2 Compliance Spec', colorClass: 'text-emerald-400' },
        ],
      },
    },
    {
      number: '03',
      name: 'DESIGN',
      category: 'UI/UX & Prototyping',
      title: 'Design System & High-Fidelity UI',
      desc: 'Crafting intuitive, editorial-grade user interfaces, interactive Figma prototypes, and strict design token libraries that look stunning across all devices.',
      deliverables: ['Design System Tokens', 'Interactive Clickable Prototype', 'Component Library Specs', 'Responsive Breakpoint Layouts'],
      sla: 'Week 2',
      icon: Palette,
      color: '#ec4899',
      execution: {
        badge: 'Design System Standard',
        headline: 'Pixel-Perfect Interaction Rigor',
        description: 'Editorial-grade user interfaces, atomic design tokens, and clickable prototypes tested rigorously on actual devices.',
        metrics: [
          { label: 'Design System', value: 'Atomic Tokens & Component Specs', colorClass: 'text-pink-400' },
          { label: 'Prototyping', value: 'Clickable Interactive Figma Flow', colorClass: 'text-violet-400' },
          { label: 'Review Cadence', value: 'Direct Loom Walkthroughs & Approvals', colorClass: 'text-amber-400' },
        ],
      },
    },
    {
      number: '04',
      name: 'BUILD',
      category: 'Engineering Sprints',
      title: 'Clean-Code Agile Development',
      desc: 'Executing in rapid 2-week sprints with strict TypeScript, modular domain logic, and direct client demo sessions every 14 days.',
      deliverables: ['Bi-Weekly Sprint Demos', 'Strict TypeScript Codebase', '100% Day-1 IP Transfer', 'Continuous Git Commits'],
      sla: 'Weeks 3-8',
      icon: Code2,
      color: '#06b6d4',
      execution: {
        badge: 'Sprint Execution Standard',
        headline: 'Guaranteed Predictability',
        description: 'Every phase is bound to strict acceptance criteria, automated CI checks, and explicit code transfer.',
        metrics: [
          { label: 'Methodology', value: 'Agile Scrum / 2-Week Sprints', colorClass: 'text-emerald-400' },
          { label: 'Code Transfer', value: 'Instant Day-1 Git Ownership', colorClass: 'text-cyan-400' },
          { label: 'Communication', value: 'Direct Slack + Bi-Weekly Demos', colorClass: 'text-amber-400' },
        ],
      },
    },
    {
      number: '05',
      name: 'TEST',
      category: 'QA & Security Auditing',
      title: 'Rigorous Verification & Load Testing',
      desc: 'Automated unit, integration, and end-to-end testing alongside security audits and Core Web Vitals stress tests to guarantee zero regressions.',
      deliverables: ['Automated Test Suites', 'Load & Stress Testing', 'Security & SOC2 Readiness', 'Lighthouse 95+ Audit'],
      sla: 'Week 9',
      icon: CheckCircle,
      color: '#10b981',
      execution: {
        badge: 'QA & Security Standard',
        headline: 'Zero-Regression Verification',
        description: 'Comprehensive test suites, automated load testing, and Core Web Vitals stress tests guarantee zero production defects.',
        metrics: [
          { label: 'Test Coverage', value: 'Playwright E2E & Vitest Integration', colorClass: 'text-emerald-400' },
          { label: 'Performance', value: 'Lighthouse 95+ Core Web Vitals Target', colorClass: 'text-cyan-400' },
          { label: 'Security Audit', value: 'OWASP Vulnerability & SOC2 Clearance', colorClass: 'text-amber-400' },
        ],
      },
    },
    {
      number: '06',
      name: 'LAUNCH',
      category: 'Production Release',
      title: 'Zero-Downtime Deployment',
      desc: 'Automated CI/CD deployment to multi-region cloud infrastructure, DNS edge caching, and real-time monitoring telemetry initialization.',
      deliverables: ['Zero-Downtime Cloud Setup', 'Multi-Region CDN Routing', 'Live Telemetry Dashboard', 'Production Cutover'],
      sla: 'Week 10',
      icon: Rocket,
      color: '#f59e0b',
      execution: {
        badge: 'Release Execution Standard',
        headline: 'Zero-Downtime Cutover',
        description: 'Automated multi-region cloud deployment with DNS edge caching, health checks, and instant telemetry monitoring.',
        metrics: [
          { label: 'Infrastructure', value: 'Multi-Region Edge CDN Routing', colorClass: 'text-amber-400' },
          { label: 'Uptime SLA', value: '99.99% Production Cutover Guarantee', colorClass: 'text-emerald-400' },
          { label: 'Telemetry', value: 'Real-Time Error & Latency Tracing', colorClass: 'text-cyan-400' },
        ],
      },
    },
    {
      number: '07',
      name: 'SCALE',
      category: 'Continuous Evolution',
      title: 'Telemetry & Fractional Partnership',
      desc: 'We provide dedicated ongoing engineering support, iterative feature upgrades, and a 15-minute response SLA as your product scales.',
      deliverables: ['15-Min Critical SLA Support', 'Continuous Feature Sprints', 'Database Query Optimization', 'Direct Slack Channel Access'],
      sla: 'Ongoing Partnership',
      icon: TrendingUp,
      color: '#a855f7',
      execution: {
        badge: 'Continuous Evolution Standard',
        headline: 'Fractional Engineering Partner',
        description: 'Ongoing engineering sprints, query optimization, high-load architecture scaling, and rapid SLA support.',
        metrics: [
          { label: 'SLA Speed', value: '< 15-Minute Emergency Critical SLA', colorClass: 'text-purple-400' },
          { label: 'Evolution', value: 'Continuous Sprint Releases & Upgrades', colorClass: 'text-emerald-400' },
          { label: 'Partnership', value: 'Direct Shared Slack Team Seat', colorClass: 'text-cyan-400' },
        ],
      },
    },
  ];

  const currentPhase = phases[activePhaseIndex];
  const CurrentIcon = currentPhase.icon;
  const nextPhase = phases[(activePhaseIndex + 1) % phases.length];

  return (
    <section
      id="process"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-theme-primary border-t border-theme overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>06 — Development Lifecycle</span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-theme-primary leading-[1.08]">
              From Idea to <span className="text-accent-gradient">Production.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-theme-secondary font-medium max-w-md">
            A battle-tested 7-phase methodology transforming ambitious visions into production-grade software with absolute transparency.
          </p>
        </div>

        {/* Phase Progress Scroller Bar */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {phases.map((p, idx) => {
            const isSelected = activePhaseIndex === idx;
            return (
              <button
                key={p.number}
                type="button"
                onClick={() => {
                  playClickSound();
                  setActivePhaseIndex(idx);
                }}
                onMouseEnter={() => {
                  setCursor('link');
                  playHoverSound();
                }}
                onMouseLeave={resetCursor}
                className={`flex-1 min-w-[100px] sm:min-w-[130px] p-3 rounded-2xl border text-center transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-violet-500 bg-violet-600/15 shadow-lg'
                    : 'border-theme bg-theme-card hover:border-violet-500/30'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1 font-mono text-xs font-extrabold">
                  <span style={{ color: p.color }}>{p.number}</span>
                  <span className={isSelected ? 'text-theme-primary' : 'text-theme-muted'}>
                    {p.name}
                  </span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: isSelected ? '100%' : '20%',
                      backgroundColor: isSelected ? p.color : 'rgba(255,255,255,0.2)',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="p-6 sm:p-10 rounded-3xl border border-theme bg-theme-card/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[90px] opacity-20 pointer-events-none"
              style={{ backgroundColor: currentPhase.color }}
            />

            {/* Left Col: Phase Description (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md shrink-0"
                  style={{
                    backgroundColor: `${currentPhase.color}18`,
                    borderColor: `${currentPhase.color}40`,
                    color: currentPhase.color,
                  }}
                >
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: currentPhase.color }}>
                      PHASE {currentPhase.number} / 07
                    </span>
                    <span className="text-[10px] font-mono text-theme-muted bg-white/5 px-2 py-0.5 rounded border border-theme">
                      {currentPhase.sla}
                    </span>
                  </div>
                  <h3 className="font-syne font-black text-2xl sm:text-3xl text-theme-primary">
                    {currentPhase.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-theme-secondary leading-relaxed">
                {currentPhase.desc}
              </p>

              {/* Deliverables Checklist */}
              <div className="pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-theme-muted block mb-3">
                  Phase Deliverables &amp; Artifacts:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPhase.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-theme-secondary bg-white/[0.02] border border-theme p-3 rounded-xl"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentPhase.color }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Dynamic Phase Execution Standard Card (5 Cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl border border-theme bg-black/40 flex flex-col justify-between min-h-[300px]">
              <div>
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest block mb-2"
                  style={{ color: currentPhase.color }}
                >
                  {currentPhase.execution.badge}
                </span>
                <h4 className="font-syne font-black text-lg sm:text-xl text-white mb-3">
                  {currentPhase.execution.headline}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {currentPhase.execution.description}
                </p>
                <div className="space-y-2 text-xs font-mono text-zinc-300">
                  {currentPhase.execution.metrics.map((m, idx) => (
                    <div key={idx} className="flex justify-between py-1.5 border-b border-white/10 gap-2">
                      <span className="text-zinc-500 shrink-0">{m.label}</span>
                      <span className={`text-right truncate ${m.colorClass || 'text-white'}`}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActivePhaseIndex((prev) => (prev + 1) % phases.length);
                  }}
                  onMouseEnter={() => {
                    setCursor('link');
                    playHoverSound();
                  }}
                  onMouseLeave={resetCursor}
                  className="text-xs font-mono font-bold hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  style={{ color: currentPhase.color }}
                >
                  <span>Next: {nextPhase.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-zinc-500">
                  {currentPhase.number} of 07
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
