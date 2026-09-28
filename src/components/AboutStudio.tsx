import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { useCursor } from '../context/CursorContext';

export const AboutStudio: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-theme-primary border-t border-theme overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Narrative (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-mono font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>08 — Studio Narrative</span>
            </div>

            <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-theme-primary leading-[1.08] mb-6">
              WE ARE <br />
              <span className="text-accent-gradient">KSHIRSAGAR.</span>
            </h2>

            <p className="text-lg sm:text-xl text-theme-secondary font-medium leading-relaxed mb-6">
              We combine strategy, design, precision engineering, and applied artificial intelligence to build digital products that move businesses forward.
            </p>

            <p className="text-sm sm:text-base text-theme-muted leading-relaxed mb-8">
              Founded by <strong>Ajay Kshirsagar</strong>, our studio operates as a nimble, high-velocity engineering laboratory. We discard bureaucratic handoff lag and empower senior developers to work directly alongside founders, CTOs, and product directors.
            </p>

            {/* Studio Core Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {[
                { label: 'Location', value: 'Solapur, India', icon: MapPin },
                { label: 'Response SLA', value: '< 15 Mins Guaranteed', icon: Clock },
                { label: 'Code Transfer', value: '100% Day-1 Rights', icon: ShieldCheck },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-3.5 rounded-2xl border border-theme bg-theme-card">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-violet-400 mb-1">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </div>
                    <div className="font-syne font-bold text-xs sm:text-sm text-theme-primary">
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onMouseEnter={() => setCursor('cta')}
                onMouseLeave={resetCursor}
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2"
              >
                <span>Initiate Discussion</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/kshirsagar1994"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="px-5 py-3 rounded-full border border-theme bg-theme-card hover:bg-white/10 text-theme-secondary hover:text-theme-primary font-mono text-xs font-semibold tracking-wide transition-colors flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub @kshirsagar1994</span>
              </a>
            </div>
          </div>

          {/* Right Lead Architect Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl border border-theme bg-theme-card/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/15 blur-[60px] rounded-full pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-syne font-black text-2xl text-white shadow-lg border border-white/20">
                  AK
                </div>
                <div>
                  <h3 className="font-syne font-black text-xl text-theme-primary">
                    Ajay Kshirsagar
                  </h3>
                  <span className="text-xs font-mono font-bold text-violet-400 block">
                    Principal Systems &amp; Full-Stack Architect
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Available for Sprints
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-theme text-xs text-zinc-300 leading-relaxed font-mono mb-6">
                <span className="text-violet-400 font-bold block mb-1.5">// Architectural Manifesto</span>
                "We don't build generic boilerplate websites. We engineer durable digital assets that perform flawlessly under commercial stress and scale alongside your business."
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-theme">
                  <span className="text-theme-muted">Direct Email</span>
                  <a href="mailto:ajaykshirsagar1208@gmail.com" className="text-violet-400 hover:underline">
                    ajaykshirsagar1208@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-theme">
                  <span className="text-theme-muted">WhatsApp / Phone</span>
                  <a href="tel:+919595749597" className="text-emerald-400 hover:underline">
                    +91-9595749597
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
