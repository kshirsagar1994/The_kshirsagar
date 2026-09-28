import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { playHoverSound, playClickSound } from '../utils/sound';

interface BrandItem {
  id: string;
  name: string;
  category: string;
  url: string;
  svgPath: React.ReactNode;
}

const brands: BrandItem[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Edge Infrastructure',
    url: 'https://vercel.com',
    svgPath: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" fill="currentColor">
        <path d="m12 1 12 21H0z" />
      </svg>
    ),
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Backend & Postgres',
    url: 'https://supabase.com',
    svgPath: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" fill="currentColor">
        <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.32 14.286a.396.396 0 0 0 .316.638H10v8.68a.396.396 0 0 0 .716.233l10.964-14.123a.396.396 0 0 0-.318-.36z" />
      </svg>
    ),
  },
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'Frontier AI Research',
    url: 'https://openai.com',
    svgPath: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.6627zM8.3065 12.863l-2.02-1.1636a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.4592a.7948.7948 0 0 0-.3927.6813v6.7225zm1.2633-2.7346l3.4114-1.9681 3.4113 1.9681v3.9315l-3.4113 1.9682-3.4114-1.9682V10.1284z" />
      </svg>
    ),
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Global Financial Infrastructure',
    url: 'https://stripe.com',
    svgPath: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" fill="currentColor">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.4 12.812.4 6.852.4 2.87 3.528 2.87 8.653c0 6.053 6.945 7.035 9.775 8.04 2.296.818 3.09 1.554 3.09 2.502 0 .99-.893 1.53-2.38 1.53-2.443 0-5.405-1.196-7.394-2.293l-.938 5.626c2.08 1.12 5.342 1.842 8.423 1.842 6.183 0 10.37-2.923 10.37-8.318 0-5.83-6.612-7.05-9.84-8.432z" />
      </svg>
    ),
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'Product & Issue Engine',
    url: 'https://linear.app',
    svgPath: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" fill="currentColor">
        <path d="M3.203 7.822 16.178 20.797A11.96 11.96 0 0 1 12 22C6.477 22 2 17.523 2 12c0-1.492.327-2.908.913-4.178zm1.096-2.509A11.96 11.96 0 0 1 12 2c5.523 0 10 4.477 10 10 0 1.492-.327 2.908-.913 4.178L8.11 3.203a11.91 11.91 0 0 1 3.89-.913c-.613.586-1.18 1.258-1.69 2.01l-6.011-1.987z" />
      </svg>
    ),
  },
  {
    id: 'raycast',
    name: 'Raycast',
    category: 'Productivity Extensibility',
    url: 'https://raycast.com',
    svgPath: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" fill="currentColor">
        <path d="M16.5 2.5 13 6l2.5 2.5 3.5-3.5zm-5 5L8 11l2.5 2.5 3.5-3.5zm-5 5L3 16l2.5 2.5 3.5-3.5zm10 0-3.5 3.5 2.5 2.5 3.5-3.5z" />
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Developer Platform',
    url: 'https://github.com',
    svgPath: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'React Architecture',
    url: 'https://nextjs.org',
    svgPath: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" fill="currentColor">
        <path d="M18.665 21.978C16.808 23.255 14.502 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12c0 3.584-1.574 6.8-4.072 9.005l-8.917-11.465V6.75h-1.5v10.5h1.5v-7.14l7.654 11.863zM16.5 17.25h1.5V6.75h-1.5v10.5z" />
      </svg>
    ),
  },
];

export const BrandsGrid: React.FC = () => {
  const [hoveredBrand, setHoveredBrand] = useState<BrandItem | null>(null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="relative w-full bg-[#000000] py-20 border-t border-[#2E2E2E]/60">
      <div className="grid-layout !gap-y-6">
        {/* Title Header: Basement 2k26 Style Animated Title */}
        <div className="col-span-full flex items-baseline justify-between border-b border-[#2E2E2E]/40 pb-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#757575] flex items-center gap-2">
            <span>Trusted by</span>
            <AnimatePresence mode="wait">
              {hoveredBrand ? (
                <motion.a
                  key={hoveredBrand.id}
                  href={hoveredBrand.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-1 text-[#E6E6E6] hover:text-[#FF4D00] transition-colors"
                >
                  <span className="font-bold text-[#E6E6E6]">{hoveredBrand.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FF4D00]" />
                  <span className="text-xs font-mono text-[#757575] ml-2 hidden sm:inline">
                    [{hoveredBrand.category}]
                  </span>
                </motion.a>
              ) : (
                <motion.span
                  key="visionaries"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="text-[#E6E6E6] font-semibold"
                >
                  Visionaries &amp; Founders
                </motion.span>
              )}
            </AnimatePresence>
          </h2>

          <span className="text-xs font-mono text-[#757575] hidden sm:inline">
            // CLIENT &amp; ECOSYSTEM ROSTER
          </span>
        </div>

        {/* Dynamic 8-Grid Logos with with-diagonal-lines on hover */}
        <div className="col-span-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {brands.map((brand) => (
            <a
              key={brand.id}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => {
                setHoveredBrand(brand);
                setCursor('link');
                playHoverSound();
              }}
              onMouseLeave={() => {
                setHoveredBrand(null);
                resetCursor();
              }}
              onClick={() => playClickSound()}
              className="relative aspect-[16/10] border border-[#2E2E2E] bg-[#000000] text-[#757575] hover:text-[#E6E6E6] flex items-center justify-center p-6 transition-all duration-300 group overflow-hidden"
              title={`${brand.name} - ${brand.category}`}
            >
              {/* Basement Animated Diagonal Scanlines on Hover */}
              <div
                className={`with-diagonal-lines !absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                  hoveredBrand?.id === brand.id ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Corner crosshairs */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#757575]/40 group-hover:border-[#FF4D00]" />
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#757575]/40 group-hover:border-[#FF4D00]" />

              <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                {brand.svgPath}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
