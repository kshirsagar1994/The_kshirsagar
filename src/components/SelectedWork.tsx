import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { playHoverSound, playClickSound } from '../utils/sound';

interface Project {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  tags: string[];
  year: string;
  image: string;
  href: string;
}

const projects: Project[] = [
  {
    id: 'vvk-smart-tech',
    title: 'VVK Smart Tech — Smart Irrigation IoT',
    category: 'IoT Hardware & Smart Agriculture',
    excerpt:
      'Affordable IoT irrigation technology enabling farmers across 5+ states to remotely control motors, monitor real-time water supply, and protect mission-critical equipment.',
    tags: ['IoT Controller', 'Smart Farming', 'GSM Telemetry', 'Remote Automation', 'Next.js'],
    year: '2024',
    image: '/projects/vvk-smart-tech.jpg',
    href: 'https://vvksmarttech.com/',
  },
  {
    id: 'swami-ratna',
    title: 'Swami Ratna Consultancy',
    category: 'Enterprise Platform / Web & Brand',
    excerpt:
      'Full-spectrum corporate web ecosystem and client engagement platform for a premier business & tax consultancy firm, built with responsive design systems.',
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'UI/UX'],
    year: '2024',
    image: '/projects/swami-ratna.jpg',
    href: 'https://github.com/kshirsagar1994/swamiratna',
  },
  {
    id: 'aiod',
    title: 'AIOD — Media Architecture',
    category: 'Desktop System / Python & AI',
    excerpt:
      'High-performance desktop architecture for cross-platform media extraction, multi-threaded downloads, and automated stream post-processing with integrated AI assistance.',
    tags: ['Python', 'PyQt', 'AI Pipeline', 'Multi-threading', 'FFmpeg'],
    year: '2024',
    image: '/projects/aiod.jpg',
    href: 'https://github.com/kshirsagar1994/AIOD',
  },
];

export const SelectedWork: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const { setCursor, resetCursor } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback(
    (index: number, newDirection?: 1 | -1) => {
      playClickSound();
      const dir = newDirection !== undefined ? newDirection : index > currentIndex ? 1 : -1;
      setDirection(dir);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const handleNext = useCallback(() => {
    goToSlide((currentIndex + 1) % projects.length, 1);
  }, [currentIndex, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide((currentIndex - 1 + projects.length) % projects.length, -1);
  }, [currentIndex, goToSlide]);

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const currentProject = projects[currentIndex];

  // Stagger animation variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 50 : -50,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const,
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -50 : 50,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const itemStagger: Variants = {
    enter: { opacity: 0, y: 20 },
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
  };

  return (
    <section
      id="work"
      ref={containerRef}
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
      className="relative w-full bg-[#000000] pt-16 pb-24 border-t border-[#2E2E2E]/60 overflow-hidden"
    >
      {/* Background subtle radial spotlight */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4D00]/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Header & Controls */}
      <div className="grid-layout mb-8">
        <div className="col-span-full flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#2E2E2E]/60 pb-6 gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#757575] uppercase block mb-2">
              // CASE STUDIES &amp; SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-[#E6E6E6]">
              Featured Projects
            </h2>
          </div>

          {/* Staggered Slider Controls */}
          <div className="flex items-center gap-3 sm:gap-4 self-start sm:self-end">
            {/* Slide Index Badge */}
            <span className="text-xs font-mono text-[#E6E6E6] bg-[#0A0A0A] border border-[#2E2E2E] px-3 py-1.5 rounded-xs">
              [ 0{currentIndex + 1} / 0{projects.length} ]
            </span>

            {/* Autoplay Play/Pause */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setIsAutoplay(!isAutoplay);
              }}
              className="p-2 border border-[#2E2E2E] bg-[#0A0A0A] hover:bg-[#151515] text-[#757575] hover:text-[#E6E6E6] rounded-xs transition-colors"
              title={isAutoplay ? 'Pause auto-slide' : 'Resume auto-slide'}
              aria-label={isAutoplay ? 'Pause auto-slide' : 'Resume auto-slide'}
            >
              {isAutoplay ? <Pause size={13} className="text-[#FF4D00]" /> : <Play size={13} />}
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              onMouseEnter={() => {
                setCursor('link');
                playHoverSound();
              }}
              onMouseLeave={resetCursor}
              className="group flex items-center gap-1.5 px-3.5 py-1.5 border border-[#2E2E2E] bg-[#0A0A0A] hover:bg-[#FF4D00] hover:border-[#FF4D00] text-[#E6E6E6] hover:text-black font-mono text-xs font-bold transition-all rounded-xs"
              aria-label="Previous project"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>PREV</span>
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              onMouseEnter={() => {
                setCursor('link');
                playHoverSound();
              }}
              onMouseLeave={resetCursor}
              className="group flex items-center gap-1.5 px-3.5 py-1.5 border border-[#2E2E2E] bg-[#0A0A0A] hover:bg-[#FF4D00] hover:border-[#FF4D00] text-[#E6E6E6] hover:text-black font-mono text-xs font-bold transition-all rounded-xs"
              aria-label="Next project"
            >
              <span>NEXT</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Staggered Slide Display */}
      <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <div className="grid-layout !gap-y-8 items-center">
              {/* Left Column: Staggered Showcase Image (7 Cols) */}
              <motion.div
                variants={itemStagger}
                className="relative col-span-full lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#0A0A0A] border border-[#2E2E2E] group rounded-xs shadow-2xl"
              >
                <a
                  href={currentProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  onMouseEnter={() => {
                    setCursor('view');
                    playHoverSound();
                  }}
                  onMouseLeave={resetCursor}
                  className="block w-full h-full relative"
                >
                  <motion.img
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Corner Accent Box */}
                  <div className="absolute top-3 left-3 bg-[#000000]/85 backdrop-blur-xs border border-[#2E2E2E] px-2.5 py-1 text-[11px] font-mono text-[#E6E6E6] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
                    <span>PROJECT 0{currentIndex + 1} // {currentProject.year}</span>
                  </div>

                  {/* Overlay Diagonal Scanline on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity pointer-events-none" />
                </a>
              </motion.div>

              {/* Right Column: Staggered Typography & Specs (5 Cols) */}
              <div className="col-span-full lg:col-span-5 flex flex-col justify-between gap-6 lg:pl-6">
                <div>
                  {/* Stagger 1: Category */}
                  <motion.div variants={itemStagger}>
                    <span className="text-xs font-mono text-[#FF4D00] uppercase tracking-wider block mb-2 font-bold">
                      // {currentProject.category}
                    </span>
                  </motion.div>

                  {/* Stagger 2: Title */}
                  <motion.div variants={itemStagger}>
                    <h3 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#E6E6E6] mb-4">
                      <a
                        href={currentProject.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playClickSound()}
                        onMouseEnter={() => {
                          setCursor('link');
                          playHoverSound();
                        }}
                        onMouseLeave={resetCursor}
                        className="actionable"
                      >
                        {currentProject.title}
                      </a>
                    </h3>
                  </motion.div>

                  {/* Stagger 3: Excerpt */}
                  <motion.div variants={itemStagger}>
                    <p className="text-sm sm:text-base text-[#C4C4C4] font-normal leading-relaxed mb-6">
                      {currentProject.excerpt}
                    </p>
                  </motion.div>

                  {/* Stagger 4: Tags */}
                  <motion.div variants={itemStagger} className="flex flex-wrap gap-2 mb-8">
                    {currentProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#121212] border border-[#2E2E2E] px-2.5 py-1 text-[11px] font-mono text-[#E6E6E6] hover:border-[#FF4D00]/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Stagger 5: Action Link & Repository */}
                <motion.div
                  variants={itemStagger}
                  className="pt-6 border-t border-[#2E2E2E]/60 flex items-center justify-between"
                >
                  <a
                    href={currentProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClickSound()}
                    onMouseEnter={() => {
                      setCursor('link');
                      playHoverSound();
                    }}
                    onMouseLeave={resetCursor}
                    className="actionable group flex items-center gap-2 text-xs font-mono font-bold text-[#E6E6E6]"
                  >
                    <span>
                      {currentProject.href.includes('github.com')
                        ? 'EXPLORE ARCHITECTURE & REPO'
                        : 'VISIT LIVE PLATFORM'}
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="text-[#FF4D00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </a>

                  <span className="text-[11px] font-mono text-[#757575] border border-[#2E2E2E] px-2 py-0.5">
                    ARCHIVE {currentProject.year}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Staggered Thumbnail Slider Rail */}
      <div className="grid-layout mt-12 pt-6 border-t border-[#2E2E2E]/60">
        <div className="col-span-full grid grid-cols-1 sm:grid-cols-3 gap-3">
          {projects.map((proj, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => goToSlide(idx)}
                onMouseEnter={() => {
                  setCursor('link');
                  playHoverSound();
                }}
                onMouseLeave={resetCursor}
                className={`relative p-3.5 sm:p-4 text-left border rounded-xs transition-all duration-300 cursor-pointer overflow-hidden group ${
                  isActive
                    ? 'border-[#FF4D00] bg-[#111111]'
                    : 'border-[#2E2E2E] bg-[#0A0A0A] hover:border-[#757575] hover:bg-[#141414]'
                }`}
              >
                {/* Active Neon Accent Indicator */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] transition-colors ${
                    isActive ? 'bg-[#FF4D00]' : 'bg-transparent group-hover:bg-[#2E2E2E]'
                  }`}
                />

                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className={isActive ? 'text-[#FF4D00] font-bold' : 'text-[#757575]'}>
                    0{idx + 1} //
                  </span>
                  <span className="text-[10px] font-mono text-[#757575]">
                    {proj.year}
                  </span>
                </div>

                <div className={`font-semibold text-xs sm:text-sm truncate transition-colors ${
                  isActive ? 'text-[#E6E6E6]' : 'text-[#757575] group-hover:text-[#C4C4C4]'
                }`}>
                  {proj.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
