import React from 'react';
import { playMechanicalActuation } from '../utils/audio';

export default function Header({ activeSection, isMuted, setIsMuted, onTriggerSound }) {
  const sections = [
    { id: 'intro', label: '01. INTRO' },
    { id: 'engineering', label: '02. ENGINEERING' },
    { id: 'projects', label: '03. PROJECTS' },
    { id: 'journey', label: '04. JOURNEY' },
    { id: 'contact', label: '05. CONTACT' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-paper/85 backdrop-blur-md hairline-b">
      <div id="scroll-progress-line" className="absolute top-0 left-0 h-[2.5px] bg-engineering-amber transition-all duration-75 w-0"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <a
            href="#intro"
            onClick={() => onTriggerSound(1.1)}
            className="flex items-center gap-2 text-charcoal-900 font-mono text-sm tracking-tight font-bold group"
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

        <nav className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => onTriggerSound(1.05)}
              className={`font-mono text-xs tracking-wider transition-colors ${
                activeSection === s.id
                  ? "text-charcoal-900 font-bold border-b border-charcoal-900 pb-0.5"
                  : "text-charcoal-400 hover:text-charcoal-900"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const nextMute = !isMuted;
              setIsMuted(nextMute);
              if (!nextMute) playMechanicalActuation(1.2, false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-paper-subtle hairline-border font-mono text-[11px] text-charcoal-700 hover:border-engineering-amber transition-colors"
            title="Toggle Web Audio Synthesizer"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isMuted ? 'bg-charcoal-400' : 'bg-engineering-amber'}`}></span>
            <span>AUDIO: {isMuted ? 'MUTED' : 'ON'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
