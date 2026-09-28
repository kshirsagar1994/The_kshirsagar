import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact?: () => void;
}

const commands = [
  { label: 'Go to Selected Work', action: '#work', type: 'nav', category: 'Navigation' },
  { label: 'Go to Capabilities & Expertise', action: '#capabilities', type: 'nav', category: 'Navigation' },
  { label: 'Go to Applied AI Engine', action: '#ai-engine', type: 'nav', category: 'Navigation' },
  { label: 'Go to Technology Ecosystem', action: '#ecosystem', type: 'nav', category: 'Navigation' },
  { label: 'Go to Development Process', action: '#process', type: 'nav', category: 'Navigation' },
  { label: 'Go to Studio Principles (Why Us)', action: '#why-us', type: 'nav', category: 'Navigation' },
  { label: 'Go to About Studio & Founder', action: '#about', type: 'nav', category: 'Navigation' },
  { label: 'Go to Start a Project / Contact', action: '#contact', type: 'nav', category: 'Navigation' },
  { label: 'Email: ajaykshirsagar1208@gmail.com', action: 'mailto:ajaykshirsagar1208@gmail.com', type: 'link', category: 'Connect' },
  { label: 'Chat on WhatsApp: +91 9595749597', action: 'https://wa.me/919595749597', type: 'link', category: 'Connect' },
  { label: 'GitHub: @kshirsagar1994', action: 'https://github.com/kshirsagar1994', type: 'link', category: 'Connect' },
  { label: 'LinkedIn: /in/ajay-kshirsagar', action: 'https://www.linkedin.com/in/ajay-kshirsagar/', type: 'link', category: 'Connect' },
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenContact }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = useCallback(
    (cmd: (typeof commands)[0]) => {
      playClickSound();
      onClose();
      setQuery('');

      if (cmd.action === '#contact' && onOpenContact) {
        onOpenContact();
        return;
      }

      if (cmd.type === 'nav') {
        const el = document.querySelector(cmd.action);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.open(cmd.action, '_blank');
      }
    },
    [onClose, onOpenContact]
  );

  // Keyboard navigation: Escape, ArrowDown, ArrowUp, Enter
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
        playHoverSound();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0));
        playHoverSound();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filtered, selectedIndex, handleSelect]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 w-full max-w-lg rounded-sm border border-[#2E2E2E] bg-[#0A0A0A] text-[#E6E6E6] shadow-2xl overflow-hidden font-mono"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#2E2E2E] bg-[#000000]">
              <Search className="w-4 h-4 text-[#757575] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search directives, sections, links..."
                autoFocus
                className="flex-1 bg-transparent text-xs text-[#E6E6E6] placeholder:text-[#757575] outline-none"
              />
              <span className="text-[10px] text-[#757575] border border-[#2E2E2E] px-1.5 py-0.5 rounded-xs">
                ESC
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-[#757575] hover:text-[#FF4D00] transition-colors cursor-pointer"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-5 py-8 text-center text-xs text-[#757575]">
                  No matching directive found for &quot;{query}&quot;
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.label}
                      type="button"
                      onClick={() => handleSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full px-4 py-2.5 flex items-center justify-between text-xs transition-colors cursor-pointer text-left ${
                        isSelected
                          ? 'bg-[#181818] text-[#FF4D00] border-l-2 border-[#FF4D00]'
                          : 'text-[#C4C4C4] hover:bg-[#121212] hover:text-[#E6E6E6]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] text-[#757575] uppercase w-16 shrink-0">
                          [{cmd.category}]
                        </span>
                        <span className="truncate">{cmd.label}</span>
                      </div>
                      {isSelected ? (
                        <CornerDownLeft className="w-3.5 h-3.5 text-[#FF4D00] shrink-0" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-[#757575] opacity-50 shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer key hints */}
            <div className="px-4 py-2.5 border-t border-[#2E2E2E] text-[11px] text-[#757575] flex items-center justify-between bg-[#000000]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Execute</span>
                <span>Esc Dismiss</span>
              </div>
              <span className="text-[#FF4D00]">KSHIRSAGAR CLI</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
