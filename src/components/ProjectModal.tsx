import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, Send, Check } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const { setCursor, resetCursor } = useCursor();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Web Experiences');
  const [budget, setBudget] = useState('₹50k - ₹2 Lakh');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Web Experiences',
    'Mobile Products',
    'Applied AI & Agents',
    'Business Software',
    'Cloud & DevOps',
  ];

  const budgets = [
    '< ₹50,000',
    '₹50k - ₹2 Lakh',
    '₹2 Lakh - ₹5 Lakh',
    '₹5 Lakh+',
    'Flexible',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#8b5cf6', '#06b6d4', '#10b981'],
    });

    // Auto open WhatsApp
    const text = encodeURIComponent(
      `Hi Ajay (Kshirsagar Studio),\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nBudget: ${budget}\n\nProject Scope:\n${description}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/919595749597?text=${text}`, '_blank');
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#090b14] text-white p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/20 blur-[60px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-violet-400 block">
                  FAST-TRACK INQUIRY LAUNCHER
                </span>
                <h3 className="font-syne font-black text-xl sm:text-2xl">
                  Start a Project
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-syne font-bold text-xl text-white">
                  Inquiry Dispatched!
                </h4>
                <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
                  We have launched your requirement directly into our fast-track pipeline. We will reply in under 15 minutes.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-full bg-violet-600 text-white text-xs font-mono font-bold uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">
                    Service Required
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setService(s)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all cursor-pointer ${
                          service === s
                            ? 'bg-violet-600 border-violet-500 text-white'
                            : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Estimated Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500 cursor-pointer"
                  >
                    {budgets.map((b) => (
                      <option key={b} value={b} className="bg-zinc-900 text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Project Vision / Scope *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us what you want to build..."
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => setCursor('cta')}
                  onMouseLeave={resetCursor}
                  className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
