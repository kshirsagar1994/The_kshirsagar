import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, MessageSquare } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { playHoverSound, playClickSound } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const email = 'ajaykshirsagar1208@gmail.com';
  const whatsappUrl =
    'https://wa.me/919595749597?text=Hi%20Ajay,%20I%20have%20a%20project%20in%20mind%20for%20Kshirsagar%20Studio.';

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full bg-[#000000] py-24 sm:py-32 border-t border-[#2E2E2E]/60 overflow-hidden">
      <div className="grid-layout">
        {/* Main Box with Diagonal Lines (Mirroring Basement Studio contact.tsx) */}
        <div className="relative col-span-full with-diagonal-lines border border-[#2E2E2E] p-8 sm:p-14 lg:p-20 bg-[#000000]">
          {/* Tag */}
          <div className="relative z-10 mb-6 flex items-center justify-between">
            <span className="text-xs font-mono tracking-widest text-[#757575] uppercase">
              // START A CONVERSATION
            </span>
            <span className="text-xs font-mono text-[#00FF9B] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9B] animate-pulse" />
              AVAILABLE FOR COMMISSIONS
            </span>
          </div>

          {/* Heading */}
          <h2 className="relative z-10 text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-[-0.04em] text-[#C4C4C4] leading-tight mb-8">
            Let&apos;s make an impact <br className="hidden sm:block" />
            <span className="text-[#E6E6E6]">together.</span>
          </h2>

          {/* Giant Actionable Email */}
          <div className="relative z-10 my-8">
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={() => {
                setCursor('link');
                playHoverSound();
              }}
              onMouseLeave={resetCursor}
              className="actionable text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#E6E6E6] break-all"
            >
              <span>{email}</span>
            </a>
          </div>

          {/* Quick Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center gap-4 pt-6 border-t border-[#2E2E2E]/60">
            {/* Copy Button */}
            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => {
                setCursor('link');
                playHoverSound();
              }}
              onMouseLeave={resetCursor}
              className="flex items-center gap-2 bg-[#2E2E2E]/80 hover:bg-[#2E2E2E] text-[#E6E6E6] border border-[#2E2E2E] px-4 py-2 text-xs font-mono rounded-xs transition-colors"
            >
              {copied ? <Check size={14} className="text-[#00FF9B]" /> : <Copy size={14} />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL ADDRESS'}</span>
            </button>

            {/* WhatsApp Direct Chat */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={() => {
                setCursor('link');
                playHoverSound();
              }}
              onMouseLeave={resetCursor}
              className="flex items-center gap-2 bg-[#E6E6E6] hover:bg-[#FF4D00] text-[#000000] px-4 py-2 text-xs font-mono font-semibold rounded-xs transition-colors"
            >
              <MessageSquare size={14} />
              <span>CHAT ON WHATSAPP</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Location Pill */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#757575] ml-auto">
              <span>BASE: SOLAPUR, INDIA (UTC+05:30)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
