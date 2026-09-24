import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function SectionEngineering() {
  return (
    <section id="engineering" className="min-h-screen py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="max-w-2xl mb-8 sm:mb-12">
        <div className="font-mono text-xs text-engineering-amber tracking-widest uppercase mb-2 font-bold">
          02 // ENGINEERING
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-charcoal-900">
          Core Engineering Competencies
        </h2>
        <p className="mt-3 sm:mt-4 text-xs sm:text-base text-charcoal-600 font-sans leading-relaxed">
          Focusing on low-level memory management, transactional isolation, and clean software architecture. The 3D terminal displays the core technical stack.
        </p>
      </div>

      {/* Mobile-Only Dedicated 3D Terminal Viewing Stage */}
      <div className="lg:hidden w-full mb-8 flex flex-col items-center justify-center">
        <div className="h-[270px] xs:h-[300px] sm:h-[320px] md:h-[340px] w-full flex items-center justify-center pointer-events-none">
          {/* Transparent window: 3D terminal displays live technical competencies here */}
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-elevated/90 backdrop-blur-sm hairline-border font-mono text-[10px] text-charcoal-600 shadow-sm -mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-engineering-amber animate-pulse"></span>
          <span>TERMINAL TELEMETRY // COMPETENCIES</span>
        </div>
      </div>

      {/* Desktop Layout - Kept 100% Intact */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-4 max-w-2xl">
        {PORTFOLIO_DATA.engineering.map((disc, idx) => (
          <div
            key={idx}
            className="p-6 bg-paper-elevated/90 backdrop-blur-md rounded hairline-border hover:border-engineering-amber transition-all shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-engineering-amber"></span>
                {disc.category}
              </h3>
              <span className="font-mono text-[10px] text-charcoal-400">0{idx + 1}</span>
            </div>
            <p className="text-xs text-charcoal-600 font-sans leading-relaxed mb-4">
              {disc.desc}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {disc.items.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="font-mono text-[11px] px-2 py-0.5 bg-paper-subtle rounded border border-charcoal-900/5 text-charcoal-800 font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet Adaptive Stacked Competencies (Clean & Compact) */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-3xl">
        {PORTFOLIO_DATA.engineering.map((disc, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 bg-paper-elevated/95 backdrop-blur-md rounded hairline-border shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-sm bg-engineering-amber"></span>
                {disc.category}
              </h3>
              <span className="font-mono text-[10px] text-charcoal-400">0{idx + 1}</span>
            </div>
            <p className="text-[11px] text-charcoal-600 font-sans leading-snug mb-3">
              {disc.desc}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {disc.items.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 bg-paper-subtle rounded border border-charcoal-900/5 text-charcoal-800 font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
