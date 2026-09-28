import React from 'react';
import { useCursor } from '../context/CursorContext';
import { playHoverSound } from '../utils/sound';

interface Capability {
  id: string;
  title: string;
  description: string;
  subcategories: string[];
}

const capabilities: Capability[] = [
  {
    id: 'engineering',
    title: 'Software Engineering',
    description:
      'Architecting resilient, production-ready web platforms and cloud-native systems designed for speed, scale, and uncompromising security.',
    subcategories: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'API Design', 'Cloud Deployments'],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    description:
      'Building pragmatic artificial intelligence solutions — from autonomous agent pipelines to bespoke LLM tooling and workflow automation.',
    subcategories: ['Autonomous Agents', 'Custom LLMs', 'Python / FastAPI', 'RAG Pipelines', 'Vector Databases', 'Automation'],
  },
  {
    id: 'digital-products',
    title: 'Digital Products & SaaS',
    description:
      'Translating complex business requirements into intuitive, high-converting digital products, dashboards, and enterprise applications.',
    subcategories: ['SaaS Architectures', 'Web Applications', 'Mobile Solutions', 'UI/UX Design Systems', 'Payments & Auth'],
  },
  {
    id: 'creative-tech',
    title: 'Creative Technology & WebGL',
    description:
      'Crafting memorable brand moments through interactive 3D web experiences, custom shaders, kinetic typography, and fluid micro-animations.',
    subcategories: ['Three.js', 'WebGL & Shaders', 'Framer Motion', 'Interactive Audio', 'Generative Design'],
  },
];

export const Capabilities: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="capabilities" className="relative w-full bg-[#000000] py-24 border-t border-[#2E2E2E]/60">
      <div className="grid-layout">
        {/* Section Tag */}
        <div className="col-span-full mb-3">
          <span className="text-xs font-mono tracking-widest text-[#757575] uppercase">
            // CAPABILITIES & EXPERTISE
          </span>
        </div>

        {/* Intro Statement (Mirrors Basement 2k26 capabilitiesIntro) */}
        <div className="col-span-full lg:col-span-10 mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-[#E6E6E6] leading-[1.05]">
            End-to-end digital craft across engineering, product design, and artificial intelligence.
          </h2>
        </div>

        {/* Categories Grid (Directly mirroring Basement 2k26 capabilities grid) */}
        <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {capabilities.map((cat, idx) => (
            <div
              key={cat.id}
              className="flex flex-col justify-between border-t border-[#2E2E2E] pt-6 group"
            >
              <div>
                <span className="text-xs font-mono text-[#757575] block mb-4">
                  0{idx + 1} //
                </span>

                <h3 className="text-xl lg:text-2xl font-semibold text-[#E6E6E6] mb-3">
                  <span
                    onMouseEnter={() => {
                      setCursor('link');
                      playHoverSound();
                    }}
                    onMouseLeave={resetCursor}
                    className="actionable"
                  >
                    {cat.title}
                  </span>
                </h3>

                <p className="text-sm text-[#C4C4C4] font-normal leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              {/* Subcategory Pills */}
              <div className="flex flex-wrap gap-1 mt-auto pt-4 border-t border-[#2E2E2E]/40">
                {cat.subcategories.map((sub) => (
                  <span
                    key={sub}
                    className="bg-[#2E2E2E] px-2 py-0.5 text-[11px] font-mono text-[#E6E6E6] border border-[#2E2E2E]"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
