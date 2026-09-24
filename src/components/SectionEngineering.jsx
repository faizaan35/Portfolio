import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function SectionEngineering() {
  return (
    <section id="engineering" className="min-h-screen py-28 px-6 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="max-w-2xl mb-12">
        <div className="font-mono text-xs text-engineering-amber tracking-widest uppercase mb-2 font-bold">
          02 // ENGINEERING
        </div>
        <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-charcoal-900">
          Core Engineering Competencies
        </h2>
        <p className="mt-4 text-charcoal-600 font-sans leading-relaxed">
          Focusing on low-level memory management, transactional isolation, and clean software architecture. The 3D terminal displays the core technical stack.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
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
    </section>
  );
}
