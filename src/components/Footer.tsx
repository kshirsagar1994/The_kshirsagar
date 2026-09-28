import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight, Check } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { playHoverSound, playClickSound } from '../utils/sound';

interface FooterProps {
  onOpenArcade?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenArcade }) => {
  const [time, setTime] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 2000);
      return;
    }
    playClickSound();
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }, 800);
  };

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: Array<{ title: string; href: string; count?: number; isArcade?: boolean }> = [
    { title: 'Home', href: '#' },
    { title: 'Work', href: '#work', count: 3 },
    { title: 'Capabilities', href: '#capabilities' },
    { title: 'AI Engine', href: '#ai-engine' },
    { title: 'Ecosystem', href: '#ecosystem' },
    { title: 'Process', href: '#process' },
    { title: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { title: 'GitHub', href: 'https://github.com/kshirsagar1994' },
    { title: 'LinkedIn', href: 'https://www.linkedin.com/in/ajay-kshirsagar/' },
    { title: 'WhatsApp', href: 'https://wa.me/919595749597' },
    { title: 'Email', href: 'mailto:ajaykshirsagar1208@gmail.com' },
  ];

  return (
    <footer className="relative w-full bg-[#000000] border-t border-[#2E2E2E]/60 pt-16 pb-12 overflow-hidden">
      {/* Top Nav, Newsletter & Social Links Grid */}
      <div className="grid-layout mb-16 lg:mb-24">
        {/* Navigation Column */}
        <div className="col-span-2 lg:col-span-3 mb-8 lg:mb-0">
          <span className="text-xs font-mono text-[#757575] tracking-widest uppercase block mb-4">
            // DIRECTORY
          </span>
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={(e) => {
                  if (link.isArcade && onOpenArcade) {
                    e.preventDefault();
                    playClickSound();
                    onOpenArcade();
                    return;
                  }
                  if (link.href === '#') {
                    e.preventDefault();
                    scrollToTop();
                  }
                }}
                onMouseEnter={() => {
                  setCursor('link');
                  playHoverSound();
                }}
                onMouseLeave={resetCursor}
                className="actionable w-fit text-sm font-mono text-[#C4C4C4] hover:text-[#FF4D00] transition-colors"
              >
                <span>{link.title}</span>
                {link.count && (
                  <sup className="ml-1 text-[10px] text-[#757575]">({link.count})</sup>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Stay Connected (Basement 2025 Newsletter Component) */}
        <div className="col-span-2 lg:col-span-4 mb-8 lg:mb-0">
          <span className="text-xs font-mono text-[#757575] tracking-widest uppercase block mb-4">
            // STAY CONNECTED
          </span>
          <p className="text-xs font-mono text-[#C4C4C4] mb-4 leading-relaxed max-w-sm">
            Sign up for periodic dispatches on creative technology, autonomous agents, and experimental web architecture.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex items-center max-w-sm border border-[#2E2E2E] bg-[#0A0A0A] p-1 focus-within:border-[#FF4D00] transition-colors">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="YOUR.NAME@DOMAIN.COM"
              className="flex-1 bg-transparent px-2.5 py-1.5 text-xs font-mono text-[#E6E6E6] outline-none placeholder-[#757575]"
            />
            <button
              type="submit"
              disabled={newsletterStatus === 'loading'}
              className="px-3 py-1.5 bg-[#E6E6E6] hover:bg-[#FF4D00] text-black font-mono font-bold text-xs uppercase transition-colors flex items-center gap-1"
            >
              {newsletterStatus === 'loading' ? (
                <span>SENDING...</span>
              ) : newsletterStatus === 'success' ? (
                <span className="flex items-center gap-1 text-black">
                  <Check className="w-3.5 h-3.5 text-black" />
                  JOINED
                </span>
              ) : (
                <span>SUB</span>
              )}
            </button>
          </form>

          {newsletterStatus === 'error' && (
            <span className="text-[11px] font-mono text-[#FF4D00] mt-1 block">
              Please provide a valid email address.
            </span>
          )}
        </div>

        {/* Social Links Column */}
        <div className="col-span-2 lg:col-span-2 mb-8 lg:mb-0">
          <span className="text-xs font-mono text-[#757575] tracking-widest uppercase block mb-4">
            // NETWORK
          </span>
          <div className="flex flex-col gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  setCursor('link');
                  playHoverSound();
                }}
                onMouseLeave={resetCursor}
                className="actionable group w-fit flex items-center gap-1.5 text-sm font-mono text-[#C4C4C4] hover:text-[#FF4D00] transition-colors"
              >
                <span>{social.title}</span>
                <ArrowUpRight size={13} className="text-[#757575] group-hover:text-[#FF4D00] transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Studio Status & Location Column */}
        <div className="col-span-full lg:col-span-3 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-[#757575] tracking-widest uppercase block mb-4">
              // STUDIO TELEMETRY
            </span>
            <div className="space-y-2 text-xs font-mono text-[#C4C4C4]">
              <div className="flex items-center justify-between border-b border-[#2E2E2E]/40 pb-2">
                <span className="text-[#757575]">COORDINATES</span>
                <span>18.5204° N, 73.8567° E</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#2E2E2E]/40 pb-2">
                <span className="text-[#757575]">LOCAL TIME</span>
                <span className="text-[#E6E6E6]">{time} IST (UTC+05:30)</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#2E2E2E]/40 pb-2">
                <span className="text-[#757575]">SYSTEM STATUS</span>
                <span className="text-[#00FF9B] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9B] animate-pulse" />
                  READY FOR COMMISSIONS
                </span>
              </div>
            </div>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => {
              setCursor('link');
              playHoverSound();
            }}
            onMouseLeave={resetCursor}
            className="w-fit mt-8 flex items-center gap-2 text-xs font-mono text-[#757575] hover:text-[#E6E6E6] border border-[#2E2E2E] px-3 py-1.5 rounded-xs transition-colors"
          >
            <ArrowUp size={13} />
            <span>BACK TO TOP</span>
          </button>
        </div>
      </div>

      {/* Massive Brand Wordmark (Directly mirroring Basement Studio's giant SVG logo footer) */}
      <div className="grid-layout border-t border-[#E6E6E6]/20 pt-8 pb-4">
        <div className="col-span-full select-none overflow-hidden">
          <h1 className="text-center font-extrabold tracking-tighter text-[#E6E6E6] text-[13vw] sm:text-[14vw] leading-none opacity-90 hover:opacity-100 hover:text-[#FF4D00] transition-all duration-500 cursor-default font-flauta">
            KSHIRSAGAR
          </h1>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="grid-layout pt-4 text-[11px] font-mono text-[#757575]">
        <div className="col-span-full sm:col-span-6">
          © {new Date().getFullYear()} KSHIRSAGAR STUDIO 2K26. CRAFTED WITH OBSESSIVE RIGOR.
        </div>
        <div className="col-span-full sm:col-span-6 sm:text-right mt-2 sm:mt-0">
          ALL ARCHITECTURAL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
