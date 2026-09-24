import React, { useState, useEffect } from 'react';
import { playMechanicalActuation } from '../utils/audio';

export default function Header({ activeSection, isMuted, setIsMuted, onTriggerSound }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'intro', label: '01. INTRO' },
    { id: 'engineering', label: '02. ENGINEERING' },
    { id: 'projects', label: '03. PROJECTS' },
    { id: 'journey', label: '04. JOURNEY' },
    { id: 'contact', label: '05. CONTACT' }
  ];

  // Close mobile menu on Esc key or resize to desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
      const header = document.getElementById('main-header');
      if (header && window.innerWidth >= 640) {
        header.style.opacity = '';
        header.style.pointerEvents = '';
        header.style.visibility = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    onTriggerSound?.(1.05);
    setMobileMenuOpen(false);
  };

  return (
    <header id="main-header" className="fixed top-0 left-0 w-full z-40 bg-paper/85 backdrop-blur-md hairline-b transition-opacity duration-200">
      <div id="scroll-progress-line" className="absolute top-0 left-0 h-[2.5px] bg-engineering-amber transition-all duration-75 w-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <a
            href="#intro"
            onClick={() => onTriggerSound?.(1.1)}
            className="flex items-center gap-2 text-charcoal-900 font-mono text-sm tracking-tight font-bold group py-2"
          >
            <span className="inline-block w-2.5 h-2.5 bg-engineering-amber rounded-sm group-hover:rotate-45 transition-transform"></span>
            <span>MOHD FAIZAAN</span>
          </a>
          <span className="hidden sm:inline-block text-charcoal-400 font-mono text-xs">/</span>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-charcoal-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="tracking-wide">SYSTEMS & ARCHITECTURE</span>
          </div>
        </div>

        {/* Desktop Navigation - Kept Intact */}
        <nav className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => onTriggerSound?.(1.05)}
              className={`font-mono text-xs tracking-wider transition-colors py-1 ${
                activeSection === s.id
                  ? "text-charcoal-900 font-bold border-b border-charcoal-900 pb-0.5"
                  : "text-charcoal-400 hover:text-charcoal-900"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* Header Controls (Audio + Mobile Hamburger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => {
              const nextMute = !isMuted;
              setIsMuted(nextMute);
              if (!nextMute) playMechanicalActuation(1.2, false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-paper-subtle hairline-border font-mono text-[11px] text-charcoal-700 hover:border-engineering-amber transition-colors min-h-[36px]"
            title="Toggle Web Audio Synthesizer"
            aria-label="Toggle Web Audio Synthesizer"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isMuted ? 'bg-charcoal-400' : 'bg-engineering-amber'}`}></span>
            <span className="hidden xs:inline">AUDIO: </span>
            <span>{isMuted ? 'MUTED' : 'ON'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => {
              onTriggerSound?.(1.15);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded bg-paper-subtle hairline-border text-charcoal-800 hover:text-charcoal-900 hover:border-engineering-amber transition-all"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-4 h-3.5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-charcoal-800 transition-all duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></span>
              <span className={`w-full h-0.5 bg-charcoal-800 transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-charcoal-800 transition-all duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper/98 backdrop-blur-xl hairline-b shadow-lg animate-fadeIn px-5 py-5 transition-all">
          <div className="flex items-center justify-between pb-3 mb-3 hairline-b">
            <span className="font-mono text-[11px] text-engineering-amber font-bold tracking-wider uppercase">
              NAVIGATION INDEX
            </span>
            <span className="font-mono text-[10px] text-charcoal-400">
              TAP SECTION TO JUMP
            </span>
          </div>

          <nav className="flex flex-col gap-1">
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => handleNavClick(s.id)}
                  className={`flex items-center justify-between px-3 py-3 rounded font-mono text-xs tracking-wider transition-colors min-h-[44px] ${
                    isActive
                      ? "bg-paper-elevated text-charcoal-900 font-bold hairline-border border-engineering-amber/40 shadow-sm"
                      : "text-charcoal-600 hover:text-charcoal-900 hover:bg-paper-subtle"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-engineering-amber' : 'bg-charcoal-300'}`}></span>
                    {s.label}
                  </span>
                  {isActive && (
                    <span className="text-[10px] text-engineering-amber font-bold font-mono">
                      ACTIVE
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hairline-t mt-4 pt-3 flex items-center justify-between font-mono text-xs">
            <a
              href="/Mohd_Faizaan_Resume.pdf"
              download="Mohd_Faizaan_Resume.pdf"
              onClick={() => onTriggerSound?.(1.1)}
              className="px-3 py-2 bg-charcoal-900 text-paper rounded flex items-center gap-2 font-semibold text-[11px] min-h-[40px] hover:bg-charcoal-800 transition-colors"
            >
              <span>RESUME (PDF)</span>
              <span className="text-engineering-amber">↓</span>
            </a>

            <div className="text-[11px] text-charcoal-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>OPEN TO WORK</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
