import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CursorProvider } from './context/CursorContext';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { SelectedWork } from './components/SelectedWork';
import { Capabilities } from './components/Capabilities';
import { AISection } from './components/AISection';
import { TechEcosystem } from './components/TechEcosystem';
import { Process } from './components/Process';
import { WhyUs } from './components/WhyUs';
import { About } from './components/About';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ModeTogglePill } from './components/ModeTogglePill';
import { MachineView } from './components/MachineView';
import { ArcadeLabModal } from './components/ArcadeLabModal';
import { ProjectModal } from './components/ProjectModal';

export const AppContent: React.FC = () => {
  const [mode, setMode] = useState<'human' | 'machine'>('human');
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [arcadeOpen, setArcadeOpen] = useState(false);
  const [commissionOpen, setCommissionOpen] = useState(false);

  // Global Cmd+K / Ctrl+K shortcut listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#E6E6E6] selection:bg-[#FF4D00] selection:text-black overflow-x-hidden">
      <CustomCursor />

      {/* Interface Mode Switch: HUMAN vs MACHINE */}
      {mode === 'machine' ? (
        <MachineView
          onSwitchToHuman={() => setMode('human')}
          onOpenArcade={() => setArcadeOpen(true)}
        />
      ) : (
        <>
          <Navigation
            onOpenCommandPalette={() => setCmdPaletteOpen(true)}
            onOpenArcade={() => setArcadeOpen(true)}
            onOpenContact={() => setCommissionOpen(true)}
          />

          <main className="flex flex-col w-full">
            <Hero />
            <Marquee />
            {/* <BrandsGrid /> Hidden per user request: "Hide Trusted by...." */}
            <SelectedWork />
            <Capabilities />
            <AISection />
            <TechEcosystem />
            <Process />
            <WhyUs />
            <About />
            <ContactSection />
          </main>

          <Footer onOpenArcade={() => setArcadeOpen(true)} />
        </>
      )}

      {/* Floating Bottom Viewport Toggle: HUMAN / MACHINE */}
      <ModeTogglePill currentMode={mode} onToggle={(newMode) => setMode(newMode)} />

      {/* Modals & Command Overlays */}
      <ArcadeLabModal isOpen={arcadeOpen} onClose={() => setArcadeOpen(false)} />
      <ProjectModal isOpen={commissionOpen} onClose={() => setCommissionOpen(false)} />

      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onOpenContact={() => {
          setCmdPaletteOpen(false);
          setCommissionOpen(true);
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CursorProvider>
        <SmoothScroll>
          <AppContent />
        </SmoothScroll>
      </CursorProvider>
    </ThemeProvider>
  );
}
