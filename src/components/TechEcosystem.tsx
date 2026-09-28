import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  Server, 
  Smartphone, 
  Cloud, 
  Database, 
  BrainCircuit, 
  Activity, 
  ArrowUpRight,
  Compass,
  LayoutGrid
} from 'lucide-react';
import { useCursor } from '../context/CursorContext';

interface TechCategory {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  metric: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  position: { x: number; y: number };
  technologies: { name: string; tag: string; desc: string }[];
}

export const TechEcosystem: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'orbital' | 'matrix'>('orbital');
  const { setCursor, resetCursor } = useCursor();

  const categories: TechCategory[] = [
    {
      id: 'frontend',
      name: 'FRONTEND',
      subtitle: 'Web & UI Architecture',
      badge: 'Interactive & 3D',
      metric: '60-120 FPS Rendering',
      icon: Layers,
      color: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.25)',
      position: { x: 22, y: 20 },
      technologies: [
        { name: 'React 19', tag: 'Core Library', desc: 'Concurrent UI rendering with React Server Components.' },
        { name: 'Next.js 15/16', tag: 'Framework', desc: 'Hybrid SSR, Static Site Generation and edge streaming.' },
        { name: 'TypeScript', tag: 'Type Safety', desc: 'Strict compile-time type validation and zero runtime surprises.' },
        { name: 'Tailwind CSS', tag: 'Design Engine', desc: 'Utility-first modern responsive styling tokens.' },
        { name: 'Three.js / WebGL', tag: '3D Graphics', desc: 'Interactive shaders, particles, and 3D canvas physics.' },
        { name: 'Framer Motion', tag: 'Animation', desc: 'GPU-accelerated layout transitions and spring physics.' },
      ],
    },
    {
      id: 'backend',
      name: 'BACKEND',
      subtitle: 'Server & Microservices',
      badge: 'Distributed Systems',
      metric: '< 25ms Response SLA',
      icon: Server,
      color: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.25)',
      position: { x: 78, y: 20 },
      technologies: [
        { name: 'Node.js', tag: 'Runtime', desc: 'High-throughput event-driven asynchronous execution.' },
        { name: 'Spring Boot', tag: 'Enterprise Java', desc: 'Robust multi-threaded enterprise microservice architecture.' },
        { name: 'Express.js', tag: 'REST API', desc: 'Minimalist web framework for lightning-fast REST endpoints.' },
        { name: 'GraphQL', tag: 'Query Layer', desc: 'Precise client-driven schema querying with Apollo/Yoga.' },
        { name: 'NestJS', tag: 'Architecture', desc: 'Modular enterprise architecture with TypeScript dependency injection.' },
        { name: 'WebSockets', tag: 'Realtime', desc: 'Sub-millisecond bidirectional event pipelines.' },
      ],
    },
    {
      id: 'mobile',
      name: 'MOBILE',
      subtitle: 'Cross-Platform & Native',
      badge: 'iOS & Android',
      metric: '99.9% Crash-Free Rate',
      icon: Smartphone,
      color: '#ec4899',
      glow: 'rgba(236, 72, 153, 0.25)',
      position: { x: 14, y: 50 },
      technologies: [
        { name: 'React Native', tag: 'Cross-Platform', desc: 'Near-native mobile applications with shared JavaScript codebase.' },
        { name: 'Flutter', tag: 'Dart UI', desc: 'Pixel-perfect Skia engine rendering across all screen sizes.' },
        { name: 'Kotlin', tag: 'Android Native', desc: 'Native Android components and deep hardware layer integrations.' },
        { name: 'Swift', tag: 'iOS Native', desc: 'High-performance Apple ecosystem apps with SwiftUI.' },
        { name: 'Expo', tag: 'Tooling', desc: 'Fast OTA updates and seamless EAS cloud builds.' },
      ],
    },
    {
      id: 'cloud',
      name: 'CLOUD & DEVOPS',
      subtitle: 'Edge & Container Infra',
      badge: 'Zero Downtime',
      metric: 'Multi-Region Redundancy',
      icon: Cloud,
      color: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.25)',
      position: { x: 86, y: 50 },
      technologies: [
        { name: 'AWS', tag: 'Cloud Provider', desc: 'EC2, S3, CloudFront, ECS, Lambda, and Route53 DNS.' },
        { name: 'Google Cloud', tag: 'Cloud Provider', desc: 'GCP Cloud Run, GKE Kubernetes clusters, and BigQuery.' },
        { name: 'Docker', tag: 'Containerization', desc: 'Immutable reproducible containerized environment images.' },
        { name: 'Kubernetes', tag: 'Orchestration', desc: 'Automated horizontal auto-scaling and self-healing clusters.' },
        { name: 'CI/CD Pipelines', tag: 'Automation', desc: 'Automated testing, security scanning, and zero-downtime deploys.' },
      ],
    },
    {
      id: 'database',
      name: 'DATABASE',
      subtitle: 'Storage & In-Memory Cache',
      badge: 'ACID & Real-time',
      metric: 'Zero-Loss Replication',
      icon: Database,
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.25)',
      position: { x: 26, y: 80 },
      technologies: [
        { name: 'PostgreSQL', tag: 'Relational DB', desc: 'ACID-compliant relational database with JSONB support.' },
        { name: 'MongoDB', tag: 'Document Store', desc: 'High-speed flexible document store for unstructured data.' },
        { name: 'Redis', tag: 'In-Memory Cache', desc: 'Sub-millisecond in-memory cache, rate limiters & pub/sub.' },
        { name: 'MySQL', tag: 'Relational DB', desc: 'Proven relational storage for transactional integrity.' },
        { name: 'Prisma / Supabase', tag: 'ORM & DBaaS', desc: 'Type-safe database ORMs with instant realtime listeners.' },
      ],
    },
    {
      id: 'ai',
      name: 'AI & AGENTS',
      subtitle: 'Autonomous Intelligence',
      badge: 'Agentic Workflows',
      metric: 'Self-Healing AI Logic',
      icon: BrainCircuit,
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.25)',
      position: { x: 74, y: 80 },
      technologies: [
        { name: 'OpenAI API', tag: 'Frontier Models', desc: 'GPT-4o and reasoning models for complex enterprise tasks.' },
        { name: 'Ollama Local LLMs', tag: 'Privacy-First', desc: 'Self-hosted Llama 3 & DeepSeek models with zero data leaks.' },
        { name: 'RAG Pipelines', tag: 'Retrieval', desc: 'Vector retrieval with hybrid keyword + semantic search.' },
        { name: 'Autonomous Agents', tag: 'Multi-Agent', desc: 'Role-based collaborative agents with tool execution loops.' },
        { name: 'n8n Automation', tag: 'Workflow Engine', desc: 'Visual orchestration connecting AI models to 400+ apps.' },
        { name: 'Vector Embeddings', tag: 'Semantic Index', desc: 'High-dimensional similarity matching for enterprise docs.' },
      ],
    },
  ];

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section
      id="ecosystem"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-theme-primary border-t border-theme overflow-hidden"
    >
      {/* Background Grids & Blur */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-600/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>04 — Kshirsagar Technology Ecosystem</span>
          </div>

          <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-theme-primary leading-[1.08] mb-4">
            Architected for <span className="text-accent-gradient">Scale &amp; Resilience.</span>
          </h2>

          <p className="text-sm sm:text-base text-theme-secondary font-medium max-w-2xl leading-relaxed">
            Our engineering nexus bridges frontend perfection, distributed microservices, edge cloud networks, and autonomous AI systems into a cohesive, high-velocity engine.
          </p>

          {/* View Mode Toggle Switcher */}
          <div className="flex items-center gap-2 mt-8 p-1.5 rounded-full border border-theme bg-theme-card backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setViewMode('orbital')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                viewMode === 'orbital'
                  ? 'bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Orbital Nexus</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cyber Matrix Grid</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Interactive Orbital Nexus (Desktop Visualization) */}
        {viewMode === 'orbital' ? (
          <div className="relative rounded-[2.5rem] border border-theme bg-gradient-to-b from-white/[0.02] via-black/20 to-black/60 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[640px] flex flex-col justify-between">
            {/* Ambient Concentric Orbit Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-theme pointer-events-none opacity-40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-dashed border-theme pointer-events-none animate-[spin_120s_linear_infinite] opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-theme pointer-events-none opacity-20" />

            {/* Category Cluster Selector Pills */}
            <div className="flex flex-wrap justify-center gap-2 relative z-20 mb-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-violet-500 bg-violet-600/20 text-theme-primary shadow-md'
                        : 'border-theme bg-theme-card text-theme-secondary hover:text-theme-primary hover:border-violet-500/40'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Category Inspection Spotlight */}
            <div className="relative z-20 max-w-4xl mx-auto w-full my-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCategory.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-3xl border border-theme bg-theme-card/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                >
                  <div
                    className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[70px] opacity-25 pointer-events-none"
                    style={{ backgroundColor: currentCategory.color }}
                  />

                  {/* Top Category Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme pb-5 mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md shrink-0"
                        style={{
                          backgroundColor: `${currentCategory.color}20`,
                          borderColor: `${currentCategory.color}40`,
                          color: currentCategory.color,
                        }}
                      >
                        <currentCategory.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-syne font-black text-xl sm:text-2xl text-theme-primary">
                            {currentCategory.name}
                          </span>
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase"
                            style={{
                              backgroundColor: `${currentCategory.color}15`,
                              color: currentCategory.color,
                              border: `1px solid ${currentCategory.color}35`,
                            }}
                          >
                            {currentCategory.badge}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-theme-muted">
                          {currentCategory.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 w-fit">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      <span>{currentCategory.metric}</span>
                    </div>
                  </div>

                  {/* Grid of Verified Tech Stacks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {currentCategory.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        onClick={() => setSelectedTech(selectedTech === tech.name ? null : tech.name)}
                        className="p-3.5 rounded-2xl border border-theme bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-xs text-theme-primary group-hover:text-violet-400 transition-colors">
                            {tech.name}
                          </span>
                          <span className="text-[9px] font-mono text-theme-muted bg-white/5 px-1.5 py-0.5 rounded border border-theme">
                            {tech.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-theme-secondary leading-snug">
                          {tech.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="relative z-20 mt-6 pt-4 border-t border-theme flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs font-mono text-theme-muted">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                SYSTEM LATENCY: 14ms
              </span>
              <span className="hidden sm:inline">•</span>
              <span>ACTIVE ARCHITECTURES: 6 CORE NODES</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-violet-400 font-bold">28 VERIFIED ENTERPRISE TECHNOLOGIES</span>
            </div>
          </div>
        ) : (
          /* View Mode 2: Cyber Matrix Grid (All Categories at once) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="p-6 rounded-3xl border border-theme bg-theme-card hover:border-violet-500/40 transition-all duration-300 shadow-xl relative group overflow-hidden flex flex-col justify-between min-h-[340px]"
                >
                  <div
                    className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-[60px] opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none"
                    style={{ backgroundColor: cat.color }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm"
                        style={{
                          backgroundColor: `${cat.color}18`,
                          borderColor: `${cat.color}35`,
                          color: cat.color,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase"
                        style={{
                          backgroundColor: `${cat.color}15`,
                          color: cat.color,
                          border: `1px solid ${cat.color}30`,
                        }}
                      >
                        {cat.badge}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-widest mb-1">
                      {cat.name}
                    </div>
                    <h3 className="font-syne font-black text-xl text-theme-primary mb-4 group-hover:text-violet-400 transition-colors">
                      {cat.subtitle}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {cat.technologies.map((t) => (
                        <span
                          key={t.name}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-theme text-[11px] font-mono text-theme-secondary group-hover:text-theme-primary transition-colors"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-theme flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      {cat.metric}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-theme-muted group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
