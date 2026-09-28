import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Sparkles, 
  Bot, 
  Database, 
  Workflow, 
  ShieldCheck, 
  Terminal,
  Activity
} from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export const AISection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const { setCursor, resetCursor } = useCursor();

  const pipelineSteps = [
    {
      step: 1,
      name: '01. Input & Ingestion',
      title: 'Contextual Multi-Modal Ingestion',
      icon: Terminal,
      color: '#8b5cf6',
      desc: 'Raw enterprise unstructured data, PDFs, APIs, database events, and audio streams are ingested, chunked, and tokenized.',
      tags: ['Document Parsers', 'API Webhooks', 'Event Streaming', 'Tokenization'],
      codeSample: `// Ingesting unstructured business data
const stream = await kshirsagarAI.ingest({
  source: 'enterprise_knowledge_base',
  format: ['pdf', 'notion', 'sql', 'slack'],
  chunkStrategy: 'semantic_hybrid',
  tokenWindow: 8192
});`,
    },
    {
      step: 2,
      name: '02. Vector RAG & Retrieval',
      title: 'High-Dimensional Vector Embeddings',
      icon: Database,
      color: '#06b6d4',
      desc: 'Hybrid dense + sparse semantic search retrieves precise domain ground-truth without hallucinations.',
      tags: ['Qdrant / Pinecone', 'Hybrid Search', 'BM25 Reranker', 'Context Compression'],
      codeSample: `// Vector semantic retrieval
const context = await vectorStore.hybridSearch({
  query: userIntent.vectorEmbedding,
  topK: 5,
  rerank: true,
  threshold: 0.88
});`,
    },
    {
      step: 3,
      name: '03. Autonomous Intelligence',
      title: 'Deterministic Multi-Agent Reasoning',
      icon: BrainCircuit,
      color: '#f59e0b',
      desc: 'OpenAI GPT-4o or self-hosted Ollama local LLMs execute multi-step planning, validation, and tool invocation.',
      tags: ['Ollama Local LLM', 'OpenAI API', 'Agentic Loops', 'Guardrails & Safety'],
      codeSample: `// Multi-agent reasoning step
const agentResponse = await orchestrator.execute({
  model: 'llama-3.3-70b-instruct' || 'gpt-4o',
  context: context.groundedDocs,
  tools: [ERPQuery, InvoiceValidator, SlackAlert]
});`,
    },
    {
      step: 4,
      name: '04. Automated Action & ROI',
      title: 'Self-Healing Automated Output',
      icon: Workflow,
      color: '#10b981',
      desc: 'n8n pipelines dispatch automated ERP actions, invoice approvals, client messages, and telemetry metrics.',
      tags: ['n8n Orchestrator', 'Automated ERP', 'Instant WhatsApp', 'Zero Manual Overhead'],
      codeSample: `// Executing deterministic outcome
await n8nWorkflow.trigger({
  action: 'DISPATCH_APPROVED_INVOICE',
  status: '200_SUCCESS',
  latencyMs: 84,
  auditLog: agentResponse.signature
});`,
    },
  ];

  const currentPipeline = pipelineSteps.find((s) => s.step === activeStep) || pipelineSteps[0];
  const CurrentIcon = currentPipeline.icon;

  const aiCapabilities = [
    {
      title: 'Contextual RAG Systems',
      desc: 'Query terabytes of internal documentation, contracts, and codebase history with pinpoint citation accuracy.',
      icon: Database,
    },
    {
      title: 'Local Privacy-First LLMs',
      desc: 'Run high-throughput models on-premises with Ollama. Zero external API calls, zero corporate IP leaks.',
      icon: ShieldCheck,
    },
    {
      title: 'Autonomous Multi-Agent Swarms',
      desc: 'Cooperating software agents that research, cross-validate, write code, and update databases autonomously.',
      icon: Bot,
    },
    {
      title: 'n8n & Workflow Automations',
      desc: 'Seamlessly bridge your custom AI engine with Slack, WhatsApp, Google Workspace, CRM, and internal databases.',
      icon: Workflow,
    },
  ];

  return (
    <section
      id="ai-engine"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-theme-secondary border-t border-theme overflow-hidden"
    >
      {/* Dynamic Purple/Amber Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 — Building With AI &amp; Automation</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
            <div>
              <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-theme-primary leading-[1.08]">
                Applied Intelligence <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-violet-400 to-cyan-400">
                  Engineered for Impact.
                </span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-theme-secondary font-medium max-w-md">
              We architect deterministic AI workflows, local privacy-first LLMs, and multi-agent execution engines that transform passive operations into autonomous advantage.
            </p>
          </div>
        </div>

        {/* 4 Feature Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {aiCapabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="p-5 sm:p-6 rounded-2xl border border-theme bg-theme-card hover:border-amber-500/40 transition-all duration-300 relative group overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-syne font-bold text-base sm:text-lg text-theme-primary mb-2 group-hover:text-amber-400 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-theme-muted leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated Interactive Pipeline Visual: Input -> Intelligence -> Automation -> Outcome */}
        <div className="rounded-3xl border border-theme bg-theme-card/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-theme pb-6 mb-8">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase block mb-1">
                INTERACTIVE ARCHITECTURE PIPELINE
              </span>
              <h3 className="font-syne font-black text-2xl sm:text-3xl text-theme-primary">
                Input → Intelligence → Automation → Outcome
              </h3>
            </div>
            <span className="px-3.5 py-1.5 rounded-full font-mono text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-2 w-fit">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Deterministic Flow (100% Reliable)</span>
            </span>
          </div>

          {/* Pipeline Step Navigator */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {pipelineSteps.map((step) => {
              const Icon = step.icon;
              const isSelected = activeStep === step.step;

              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveStep(step.step)}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[90px] ${
                    isSelected
                      ? 'bg-white/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                      : 'bg-white/[0.02] border-theme hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-theme-muted">
                      {step.name}
                    </span>
                    <Icon className="w-4 h-4" style={{ color: step.color }} />
                  </div>
                  <span className={`font-syne font-bold text-xs sm:text-sm truncate ${
                    isSelected ? 'text-theme-primary' : 'text-theme-secondary'
                  }`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Step Inspector Box with Interactive Code */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPipeline.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/40 border border-theme p-6 sm:p-8 rounded-2xl"
            >
              {/* Left Info (6 Cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-md"
                    style={{
                      backgroundColor: `${currentPipeline.color}20`,
                      borderColor: `${currentPipeline.color}40`,
                      color: currentPipeline.color,
                    }}
                  >
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase" style={{ color: currentPipeline.color }}>
                      STAGE 0{currentPipeline.step} OF 04
                    </span>
                    <h4 className="font-syne font-black text-xl sm:text-2xl text-white">
                      {currentPipeline.title}
                    </h4>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {currentPipeline.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {currentPipeline.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Code Sandbox Preview (6 Cols) */}
              <div className="lg:col-span-6 rounded-xl overflow-hidden border border-white/10 bg-[#060810] p-4 shadow-xl font-mono text-xs text-zinc-300">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[10px] text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 text-zinc-400">pipeline-stage-{currentPipeline.step}.ts</span>
                  </div>
                  <span className="text-emerald-400">TypeScript 5.8</span>
                </div>
                <pre className="overflow-x-auto text-[11px] leading-relaxed text-zinc-300">
                  <code>{currentPipeline.codeSample}</code>
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
