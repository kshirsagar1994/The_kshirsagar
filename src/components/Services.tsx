import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { playHoverSound } from '../utils/sound';

const services = [
  {
    number: '01',
    title: 'Web Platforms',
    description: 'React, Next.js, TypeScript. Fast, accessible, built to scale.',
  },
  {
    number: '02',
    title: 'Mobile Products',
    description: 'React Native & Flutter. Cross-platform, native performance.',
  },
  {
    number: '03',
    title: 'AI & Automation',
    description: 'LLM agents, RAG pipelines, intelligent automation systems.',
  },
  {
    number: '04',
    title: 'Cloud & DevOps',
    description: 'AWS, Docker, CI/CD. Infrastructure that scales with you.',
  },
  {
    number: '05',
    title: 'Enterprise Software',
    description: 'CRM, ERP, custom platforms. Domain-driven architecture.',
  },
  {
    number: '06',
    title: 'UI/UX & SEO',
    description: 'Research-led design. Performance-optimized digital presence.',
  },
];

export const Services: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="services" className="relative w-full py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-theme-secondary border-t border-theme">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 sm:mb-20">
          <div>
            <p className="text-xs font-mono text-theme-muted tracking-widest uppercase mb-3">
              What We Do
            </p>
            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-theme-primary leading-[0.95]">
              Services
            </h2>
          </div>
          <span className="hidden sm:block text-sm font-mono text-theme-muted">
            ({String(services.length).padStart(2, '0')})
          </span>
        </div>

        {/* Services List */}
        <div className="flex flex-col">
          {services.map((service, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onMouseEnter={() => {
                playHoverSound();
                setCursor('explore');
              }}
              onMouseLeave={resetCursor}
              className="group border-t border-theme py-8 sm:py-10 grid grid-cols-12 gap-4 items-center cursor-default"
            >
              {/* Number */}
              <div className="col-span-2 sm:col-span-1">
                <span className="text-sm font-mono text-theme-muted group-hover:text-theme-primary transition-colors">
                  {service.number}
                </span>
              </div>

              {/* Title */}
              <div className="col-span-10 sm:col-span-4 lg:col-span-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl tracking-tight text-theme-primary group-hover:translate-x-2 transition-transform">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <div className="col-span-12 sm:col-span-5 lg:col-span-5 sm:col-start-6 lg:col-start-6">
                <p className="text-sm sm:text-base text-theme-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden lg:flex col-span-2 justify-end">
                <ArrowUpRight className="w-5 h-5 text-theme-muted group-hover:text-theme-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all opacity-0 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
          <div className="border-t border-theme" />
        </div>
      </div>
    </section>
  );
};
