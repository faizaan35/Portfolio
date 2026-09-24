import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function SectionJourney() {
  return (
    <section id="journey" className="min-h-screen py-28 px-6 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="max-w-2xl mb-16">
        <div className="font-mono text-xs text-engineering-amber tracking-widest uppercase mb-2 font-bold">
          04 // CHRONICLE & PROGRESSION
        </div>
        <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-charcoal-900">
          Engineering Trajectory
        </h2>
        <p className="mt-4 text-charcoal-600 font-sans leading-relaxed">
          Structured progression from algorithmic foundations and computer vision into systems programming, low-level database architectures, and distributed services.
        </p>
      </div>

      <div className="max-w-3xl space-y-10 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-charcoal-900/15">
        {PORTFOLIO_DATA.journey.map((item, idx) => (
          <div key={idx} className="relative pl-10">
            <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-paper border-2 border-charcoal-900 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-engineering-amber rounded-full"></div>
            </div>
            <div className="bg-paper-elevated/90 backdrop-blur-sm p-6 rounded hairline-border hover:border-charcoal-400 transition-colors shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                <span className="text-engineering-amber font-bold">{item.period}</span>
                <span className="text-charcoal-400 uppercase">{item.stage}</span>
              </div>
              <h3 className="text-lg font-display font-bold text-charcoal-900 mb-2">
                {item.role}
              </h3>
              <p className="text-xs text-charcoal-700 font-sans leading-relaxed mb-4">
                {item.summary}
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-charcoal-600">
                {item.badges.map((b, bIdx) => (
                  <span key={bIdx} className="px-2 py-0.5 bg-paper-subtle rounded border border-charcoal-900/5">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
