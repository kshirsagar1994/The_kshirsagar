import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Cpu, Shield, Activity, Radio, ArrowLeft, Sparkles } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';

interface MachineViewProps {
  onSwitchToHuman: () => void;
  onOpenArcade?: () => void;
}

const ASCII_LOGO = `██╗  ██╗███████╗██╗  ██╗██╗██████╗ ███████╗ █████╗  ██████╗  █████╗ ██████╗ 
██║ ██╔╝██╔════╝██║  ██║██║██╔══██╗██╔════╝██╔══██╗██╔════╝ ██╔══██╗██╔══██╗
█████╔╝ ███████╗███████║██║██████╔╝███████╗███████║██║  ███╗███████║██████╔╝
██╔═██╗ ╚════██║██╔══██║██║██╔══██╗╚════██║██╔══██║██║   ██║██╔══██║██╔══██╗
██║  ██╗███████║██║  ██║██║██║  ██║███████║██║  ██║╚██████╔╝██║  ██║██║  ██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`;

export const MachineView: React.FC<MachineViewProps> = ({ onSwitchToHuman, onOpenArcade }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'terminal' | 'capabilities'>('overview');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'sys.init()', output: '[OK] KSHIRSAGAR-CORE v2.5 MACHINE VIEW ACTIVE. AMBER PHOSPHOR CALIBRATED.' },
    { cmd: 'help', output: 'Available directives: capabilities, work, ai, specs, contact, arcade, human, clear' },
  ]);
  const [systemUptime, setSystemUptime] = useState('00:00:00');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Uptime ticker
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hrs = String(Math.floor(elapsed / 3600)).padStart(2, '0');
      const mins = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      setSystemUptime(`${hrs}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = terminalInput.trim().toLowerCase();
    if (!trimmed) return;

    playClickSound();
    let response = '';

    switch (trimmed) {
      case 'help':
        response = 'Available directives:\n- capabilities : Core studio specializations\n- work         : Selected projects & case studies\n- ai           : Autonomous multi-agent pipeline\n- specs        : Raw JSON studio capabilities\n- contact      : Communications schema\n- arcade       : Launch Basement 2k26 retro cabinet\n- human        : Switch interface to Human rendering\n- clear        : Wipe terminal buffer';
        break;
      case 'capabilities':
        response = 'KSHIRSAGAR CAPABILITIES:\n[01] Software Engineering (Next.js, TypeScript, React 19, Distributed Systems)\n[02] AI & Automation (Multi-Agent RAG, Vector Search, Ollama LLM, Tool Calling)\n[03] Digital Products & SaaS (Enterprise Dashboards, High-Converting Web Apps)\n[04] Creative Technology & WebGL (Three.js, GLSL Custom Shaders, Kinetic Physics)';
        break;
      case 'work':
      case 'projects':
        response = 'FEATURED REPOSITORIES & SYSTEMS:\n- VVK Smart Tech: Smart irrigation IoT solutions (vvksmarttech.com)\n- Swami Ratna: Enterprise consultancy engagement platform\n- AIOD: Cross-platform Python/PyQt Media Engine with AI post-processing';
        break;
      case 'ai':
        response = 'AGENTIC REASONING PIPELINE:\n1. Multi-Modal Ingestion -> 2. Vector Dense+Sparse RAG -> 3. Autonomous Reasoning -> 4. Deterministic Output';
        break;
      case 'specs':
        setActiveTab('schema');
        response = '[REDIRECT] Switching to /specs raw JSON schema view.';
        break;
      case 'arcade':
      case 'lab':
        if (onOpenArcade) {
          onOpenArcade();
          response = '[OK] Launching Basement 2k26 Miami Heatwave retro arcade.';
        } else {
          response = '[ERR] Arcade bus not wired.';
        }
        break;
      case 'human':
        onSwitchToHuman();
        return;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'contact':
        response = 'COMMS BUS:\n- Email    : ajaykshirsagar1208@gmail.com\n- WhatsApp : +91 9595749597\n- Location : Solapur, IN / Remote Global';
        break;
      default:
        response = `Command unrecognized: "${trimmed}". Type "help" for a list of directives.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: terminalInput, output: response }]);
    setTerminalInput('');
  };

  const jsonSchema = {
    studio: "Kshirsagar Creative Technology Studio",
    version: "2025.2.0",
    engine: "Next.js 16 + React 19 + Turbopack + WebGL",
    coordinates: {
      primary: "17.6599° N, 75.9064° E [SOLAPUR, IN]",
      remote: "San Francisco, CA / London, UK / Global"
    },
    status: "ACCEPTING COMMISSIONS (Q2/Q3 2026)",
    contact: {
      email: "ajaykshirsagar1208@gmail.com",
      whatsapp: "+91 9595749597",
      availability: "Immediate Response < 2h"
    },
    capabilities: [
      {
        discipline: "Software Engineering",
        stack: ["Next.js", "React 19", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
        sla: "Production-grade, sub-100ms TTFB, 99.9% uptime"
      },
      {
        discipline: "AI & Automation",
        stack: ["OpenAI API", "Ollama", "Vector RAG", "Python FastAPI", "LangGraph"],
        sla: "Deterministic outputs, zero hallucination guardrails"
      },
      {
        discipline: "Creative Technology",
        stack: ["Three.js", "WebGL", "GLSL Shaders", "Framer Motion", "Web Audio API"],
        sla: "60-120 FPS fluid micro-interactions"
      }
    ],
    selectedWork: [
      { id: "vvk-smart-tech", name: "VVK Smart Tech Solutions", category: "IoT & Smart Irrigation" },
      { id: "swami-ratna", name: "Swami Ratna Consultancy", category: "Enterprise Web" },
      { id: "aiod", name: "AIOD Media Architecture", category: "Desktop & AI" }
    ]
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#FF4D00] font-mono crt-overlay overflow-x-hidden selection:bg-[#FF4D00] selection:text-black">
      {/* CRT Scanline & Grain */}
      <div className="fixed inset-0 pointer-events-none z-30 opacity-60 bg-[radial-gradient(#ff4d00_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-20">
        {/* Top Control Bar */}
        <header className="flex flex-wrap items-center justify-between border-b border-[#FF4D00]/40 pb-4 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                onSwitchToHuman();
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#FF4D00]/10 border border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-all text-xs font-bold uppercase tracking-wider rounded-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO HUMAN VIEW</span>
            </button>
            <span className="text-xs text-[#FF9C71] hidden sm:inline">
              // MODE: ORANGE PHOSPHOR CRT v2k26
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#FF9C71]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
              <span>LIVE BUFFER</span>
            </div>
            <span>UPTIME: {systemUptime}</span>
            <span className="text-[#FF4D00] border border-[#FF4D00]/40 px-1.5 py-0.5 rounded-xs">
              FPS: 60.0
            </span>
          </div>
        </header>

        {/* ASCII Logo */}
        <div className="overflow-x-auto pb-4 mb-6">
          <pre className="text-[9px] sm:text-[11px] md:text-[13px] leading-tight text-[#FF4D00] select-none font-bold">
            {ASCII_LOGO}
          </pre>
        </div>

        {/* Subnav Mirrors (Like Basement 2025 machine-header.tsx) */}
        <nav className="flex flex-wrap gap-2 border-y border-[#FF4D00]/30 py-3 mb-8 text-xs font-bold uppercase">
          {[
            { id: 'overview', label: '/overview' },
            { id: 'capabilities', label: '/capabilities' },
            { id: 'schema', label: '/specs.json' },
            { id: 'terminal', label: '/cli-terminal' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActiveTab(tab.id as any);
              }}
              onMouseEnter={playHoverSound}
              className={`px-2.5 py-1 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#FF4D00] text-black font-extrabold'
                  : 'text-[#FF9C71] hover:text-[#FF4D00] hover:bg-[#FF4D00]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {onOpenArcade && (
            <button
              onClick={() => {
                playClickSound();
                onOpenArcade();
              }}
              onMouseEnter={playHoverSound}
              className="ml-auto text-xs px-2.5 py-1 border border-[#FF4D00] text-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>/lab-arcade</span>
            </button>
          )}
        </nav>

        {/* Main Machine Tab Content */}
        <main className="min-h-[500px]">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <div className="border border-[#FF4D00]/40 p-6 bg-[#000000]">
                <h3 className="text-sm font-bold tracking-wider uppercase text-[#FF9C71] mb-2">
                  // STUDIO DIRECTIVE
                </h3>
                <p className="text-sm sm:text-base text-[#FF4D00] leading-relaxed max-w-3xl">
                  Kshirsagar is an independent creative technology & software engineering studio.
                  We operate at the convergence of modern web architecture, deterministic artificial
                  intelligence, and GPU-accelerated graphic interactions. Built for high-growth
                  brands, forward-looking startups, and mission-critical products.
                </p>
              </div>

              {/* Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border border-[#FF4D00]/30 p-4">
                  <div className="flex items-center justify-between text-xs text-[#FF9C71] mb-2">
                    <span>AGENT CYCLE</span>
                    <Activity className="w-3.5 h-3.5 text-[#FF4D00]" />
                  </div>
                  <div className="text-xl font-bold text-[#FF4D00]">DETERMINISTIC</div>
                  <div className="text-[11px] text-[#993000] mt-1">Multi-hop RAG verified</div>
                </div>

                <div className="border border-[#FF4D00]/30 p-4">
                  <div className="flex items-center justify-between text-xs text-[#FF9C71] mb-2">
                    <span>LATENCY TARGET</span>
                    <Cpu className="w-3.5 h-3.5 text-[#FF4D00]" />
                  </div>
                  <div className="text-xl font-bold text-[#FF4D00]">&lt; 120ms</div>
                  <div className="text-[11px] text-[#993000] mt-1">Edge route execution</div>
                </div>

                <div className="border border-[#FF4D00]/30 p-4">
                  <div className="flex items-center justify-between text-xs text-[#FF9C71] mb-2">
                    <span>RENDER PIPELINE</span>
                    <Shield className="w-3.5 h-3.5 text-[#FF4D00]" />
                  </div>
                  <div className="text-xl font-bold text-[#FF4D00]">60 - 120 FPS</div>
                  <div className="text-[11px] text-[#993000] mt-1">Three.js WebGL Core</div>
                </div>

                <div className="border border-[#FF4D00]/30 p-4">
                  <div className="flex items-center justify-between text-xs text-[#FF9C71] mb-2">
                    <span>STATUS</span>
                    <Radio className="w-3.5 h-3.5 text-[#FF4D00]" />
                  </div>
                  <div className="text-xl font-bold text-[#00FF9B]">AVAILABLE</div>
                  <div className="text-[11px] text-[#993000] mt-1">Direct commissioning open</div>
                </div>
              </div>

              {/* Quick CLI CTA */}
              <div className="border border-[#FF4D00]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FF4D00]/5">
                <div>
                  <div className="text-sm font-bold text-[#FF4D00]">INTERACTIVE DIRECTIVES READY</div>
                  <div className="text-xs text-[#FF9C71]">
                    Use the CLI terminal to query capabilities, launch arcade simulation, or inspect raw specs.
                  </div>
                </div>
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTab('terminal');
                  }}
                  className="px-4 py-2 bg-[#FF4D00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#FF9C71] transition-colors"
                >
                  OPEN TERMINAL (CLI)
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'capabilities' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {jsonSchema.capabilities.map((cap, idx) => (
                <div key={idx} className="border border-[#FF4D00]/40 p-6">
                  <div className="flex items-center justify-between mb-3 border-b border-[#FF4D00]/30 pb-2">
                    <span className="text-base font-bold text-[#FF4D00]">
                      [{String(idx + 1).padStart(2, '0')}] {cap.discipline.toUpperCase()}
                    </span>
                    <span className="text-xs text-[#FF9C71] font-mono">{cap.sla}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {cap.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-[#FF4D00]/10 border border-[#FF4D00]/40 text-xs text-[#FF4D00]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'schema' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="border border-[#FF4D00]/40 p-6 bg-[#000000]"
            >
              <div className="flex items-center justify-between border-b border-[#FF4D00]/30 pb-3 mb-4">
                <span className="text-xs font-bold text-[#FF9C71]">
                  // RAW JSON SPECIFICATION (MACHINE-READABLE SCHEMA)
                </span>
                <button
                  onClick={() => {
                    playClickSound();
                    navigator.clipboard.writeText(JSON.stringify(jsonSchema, null, 2));
                  }}
                  className="text-xs border border-[#FF4D00]/40 px-2 py-0.5 hover:bg-[#FF4D00] hover:text-black transition-colors"
                >
                  COPY JSON
                </button>
              </div>
              <pre className="text-xs text-[#FF9C71] leading-relaxed overflow-x-auto">
                {JSON.stringify(jsonSchema, null, 2)}
              </pre>
            </motion.div>
          )}

          {activeTab === 'terminal' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="border border-[#FF4D00]/40 p-6 bg-[#000000] flex flex-col h-[520px]"
            >
              <div className="flex items-center justify-between border-b border-[#FF4D00]/30 pb-2 mb-4 text-xs text-[#FF9C71]">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#FF4D00]" />
                  <span>KSHIRSAGAR-CLI // INTERACTIVE SHELL</span>
                </div>
                <span>TYPE &quot;help&quot; FOR COMMANDS</span>
              </div>

              {/* History output */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
                {terminalHistory.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center gap-2 text-[#FF9C71]">
                      <span className="text-[#FF4D00] font-bold">&gt;</span>
                      <span className="font-bold">{item.cmd}</span>
                    </div>
                    <div className="whitespace-pre-wrap pl-4 text-[#FF4D00]/90">
                      {item.output}
                    </div>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleCommand} className="flex items-center gap-2 pt-3 border-t border-[#FF4D00]/30 mt-2">
                <span className="text-[#FF4D00] font-bold">&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type directive (e.g. capabilities, work, arcade, human)..."
                  className="flex-1 bg-transparent text-xs text-[#FF4D00] outline-none placeholder-[#993000] font-mono caret-[#FF4D00]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#FF4D00] text-black font-bold text-xs uppercase hover:bg-[#FF9C71] transition-colors"
                >
                  EXEC
                </button>
              </form>
            </motion.div>
          )}
        </main>

        {/* Machine Mode Footer */}
        <footer className="mt-12 pt-6 border-t border-[#FF4D00]/30 flex flex-wrap items-center justify-between text-xs text-[#993000] gap-4">
          <div>© {new Date().getFullYear()} KSHIRSAGAR STUDIO. ALL SYSTEM RIGHTS RESERVED.</div>
          <div className="flex items-center gap-4 text-[#FF9C71]">
            <a href="mailto:ajaykshirsagar1208@gmail.com" className="hover:text-[#FF4D00] transition-colors">
              ajaykshirsagar1208@gmail.com
            </a>
            <span>//</span>
            <a href="https://github.com/kshirsagar1994" target="_blank" rel="noreferrer" className="hover:text-[#FF4D00] transition-colors">
              github.com/kshirsagar1994
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
