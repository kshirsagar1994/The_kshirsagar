import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Check, Copy, Command } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { playHoverSound, playClickSound, toggleAmbientMusic } from '../utils/sound';

interface NavigationProps {
  onOpenCommandPalette?: () => void;
  onOpenArcade?: () => void;
  onOpenContact?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenCommandPalette,
  onOpenArcade,
  onOpenContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [musicActive, setMusicActive] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [logoContextMenu, setLogoContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [copiedLogo, setCopiedLogo] = useState(false);
  const { setCursor, resetCursor } = useCursor();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live IST Clock
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
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close context menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setLogoContextMenu(null);
      }
    };
    if (logoContextMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [logoContextMenu]);

  const navLinks: Array<{ name: string; href: string; count?: number; isArcade?: boolean }> = [
    { name: 'WORK', href: '#work', count: 4 },
    { name: 'CAPABILITIES', href: '#capabilities' },
    { name: 'AI ENGINE', href: '#ai-engine' },
    { name: 'ECOSYSTEM', href: '#ecosystem' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleMusicToggle = () => {
    playClickSound();
    const active = toggleAmbientMusic();
    setMusicActive(active);
  };

  const handleLinkClick = (link: typeof navLinks[0]) => {
    playClickSound();
    setMobileMenuOpen(false);
    if (link.isArcade && onOpenArcade) {
      onOpenArcade();
      return;
    }
    const element = document.querySelector(link.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playClickSound();
    setLogoContextMenu({ x: e.clientX, y: e.clientY });
  };

  const copyLogoAsSvg = () => {
    playClickSound();
    const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 24" fill="#E6E6E6"><text x="0" y="18" font-family="sans-serif" font-weight="900" letter-spacing="-1">KSHIRSAGAR</text></svg>`;
    navigator.clipboard.writeText(logoSvg);
    setCopiedLogo(true);
    setTimeout(() => {
      setCopiedLogo(false);
      setLogoContextMenu(null);
    }, 1500);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#000000]/95 backdrop-blur-md border-b border-[#2E2E2E]/80 py-2.5 shadow-lg'
            : 'bg-transparent border-b border-[#2E2E2E]/40 py-3.5'
        }`}
      >
        <div className="grid-layout items-center">
          {/* Left: Studio Wordmark with Right-Click Context Menu Easter Egg */}
          <div className="col-span-2 lg:col-span-3 flex items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                playClickSound();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onContextMenu={handleLogoRightClick}
              onMouseEnter={() => {
                setCursor('link');
                playHoverSound();
              }}
              onMouseLeave={resetCursor}
              className="group flex items-center gap-2 select-none"
              title="Right click to copy SVG logo"
            >
              <span className="font-extrabold text-base tracking-tighter text-[#E6E6E6] group-hover:text-[#FF4D00] transition-colors font-flauta">
                KSHIRSAGAR
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[#757575] border border-[#2E2E2E] px-1 py-0.2 rounded-xs">
                2K26
              </span>
            </a>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden lg:flex col-span-6 justify-center items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link);
                }}
                onMouseEnter={() => {
                  setCursor('link');
                  playHoverSound();
                }}
                onMouseLeave={resetCursor}
                className="actionable text-xs font-mono font-medium tracking-wider text-[#C4C4C4] hover:text-[#E6E6E6] transition-colors"
              >
                <span>{link.name}</span>
                {link.count && (
                  <sup className="ml-1 text-[10px] text-[#757575]">({link.count})</sup>
                )}
                {link.isArcade && (
                  <span className="ml-1 w-1.5 h-1.5 rounded-full bg-[#FF4D00] inline-block animate-pulse" />
                )}
              </a>
            ))}
          </nav>

          {/* Right: Online Status, Equalizer Toggle, Cmd+K, CTA */}
          <div className="col-span-2 lg:col-span-3 flex items-center justify-end gap-3 sm:gap-4">
            {/* Live Online Count & Clock */}
            <div className="hidden xl:flex items-center gap-3 text-[11px] font-mono text-[#757575] border-r border-[#2E2E2E]/60 pr-3">
              <span className="flex items-center gap-1.5 text-[#00FF9B]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF9B]"></span>
                </span>
                <span>04 ONLINE</span>
              </span>
              <span>{currentTime || 'SOLAPUR, IN'}</span>
            </div>

            {/* Basement 2025 Equalizer Audio Toggle */}
            <button
              onClick={handleMusicToggle}
              aria-label={musicActive ? 'Turn music off' : 'Turn music on'}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#757575] hover:text-[#E6E6E6] p-1.5 transition-colors"
              title={musicActive ? 'Ambient Soundscape Active' : 'Sound Ambient Off'}
            >
              <div className="w-5 h-3 flex items-end justify-between gap-[2px]">
                <div className={`w-[2.5px] bg-current rounded-xs ${musicActive ? 'eq-bar-1 text-[#FF4D00]' : 'h-[2px] text-[#757575]'}`} />
                <div className={`w-[2.5px] bg-current rounded-xs ${musicActive ? 'eq-bar-2 text-[#FF4D00]' : 'h-[2px] text-[#757575]'}`} />
                <div className={`w-[2.5px] bg-current rounded-xs ${musicActive ? 'eq-bar-3 text-[#FF4D00]' : 'h-[2px] text-[#757575]'}`} />
                <div className={`w-[2.5px] bg-current rounded-xs ${musicActive ? 'eq-bar-4 text-[#FF4D00]' : 'h-[2px] text-[#757575]'}`} />
                <div className={`w-[2.5px] bg-current rounded-xs ${musicActive ? 'eq-bar-5 text-[#FF4D00]' : 'h-[2px] text-[#757575]'}`} />
              </div>
            </button>

            {/* Command Palette Button */}
            {onOpenCommandPalette && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenCommandPalette();
                }}
                className="hidden sm:flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-[#757575] hover:text-[#E6E6E6] border border-[#2E2E2E] hover:border-[#757575] rounded-xs transition-colors"
                title="Command Palette (Cmd+K / Ctrl+K)"
              >
                <Command className="w-3 h-3" />
                <span>K</span>
              </button>
            )}

            {/* Action Button: Let's Talk */}
            <button
              onClick={() => {
                playClickSound();
                if (onOpenContact) {
                  onOpenContact();
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onMouseEnter={() => {
                setCursor('link');
                playHoverSound();
              }}
              onMouseLeave={resetCursor}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#E6E6E6] text-[#000000] hover:bg-[#FF4D00] hover:text-black font-semibold text-xs transition-all duration-200"
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-1.5 text-[#E6E6E6] hover:text-[#FF4D00] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Basement Logo Right-Click Context Menu Easter Egg */}
      {logoContextMenu && (
        <div
          ref={menuRef}
          style={{ left: Math.min(logoContextMenu.x, window.innerWidth - 180), top: logoContextMenu.y + 10 }}
          className="fixed z-50 bg-[#000000] border border-[#2E2E2E] shadow-2xl p-1 rounded-xs animate-in fade-in"
        >
          <button
            onClick={copyLogoAsSvg}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-[#E6E6E6] hover:text-[#FF4D00] hover:bg-[#2E2E2E]/40 w-full text-left transition-colors"
          >
            {copiedLogo ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#00FF9B]" />
                <span className="text-[#00FF9B]">Copied as SVG!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#757575]" />
                <span>Copy logo as SVG</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#000000] pt-24 px-6 flex flex-col justify-between pb-8 lg:hidden border-b border-[#2E2E2E]"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono text-[#757575] uppercase">
                // NAVIGATION DIRECTORY
              </span>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link);
                    }}
                    className="text-2xl font-bold tracking-tight text-[#E6E6E6] hover:text-[#FF4D00] flex items-center justify-between border-b border-[#2E2E2E]/40 pb-2"
                  >
                    <span>{link.name}</span>
                    {link.count && <span className="text-sm font-mono text-[#757575]">({link.count})</span>}
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#2E2E2E] flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#757575]">
                <span>SOLAPUR, IN [UTC+5:30]</span>
                <span className="text-[#00FF9B]">04 ONLINE</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  playClickSound();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 bg-[#E6E6E6] text-black font-bold text-xs uppercase hover:bg-[#FF4D00] transition-colors text-center"
              >
                START A CONVERSATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
