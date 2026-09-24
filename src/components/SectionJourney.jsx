import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function SectionJourney() {
  return (
    <section id="journey" className="min-h-screen py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="max-w-2xl mb-8 sm:mb-12">
        <div className="font-mono text-xs text-engineering-amber tracking-widest uppercase mb-2 font-bold">
          04 // JOURNEY
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-charcoal-900">
          Engineering Trajectory
        </h2>
        <p className="mt-3 sm:mt-4 text-xs sm:text-base text-charcoal-600 font-sans leading-relaxed">
          Structured progression from algorithmic foundations and computer vision into systems programming, low-level database architectures, and distributed services.
        </p>
      </div>

      {/* Mobile-Only Dedicated 3D Terminal Viewing Stage */}
      <div className="lg:hidden w-full mb-8 flex flex-col items-center justify-center">
        <div className="h-[270px] xs:h-[300px] sm:h-[320px] md:h-[340px] w-full flex items-center justify-center pointer-events-none">
          {/* Transparent window: 3D terminal displays real-time CRT journey timeline here */}
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-elevated/90 backdrop-blur-sm hairline-border font-mono text-[10px] text-charcoal-600 shadow-sm -mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-engineering-amber animate-pulse"></span>
          <span>TERMINAL TELEMETRY // TRAJECTORY</span>
        </div>
      </div>

      {/* Timeline Flow */}
      <div className="max-w-3xl space-y-6 sm:space-y-10 relative before:absolute before:inset-0 before:left-3 before:sm:left-3.5 before:w-0.5 before:bg-charcoal-900/15">
        {PORTFOLIO_DATA.journey.map((item, idx) => (
          <div key={idx} className="relative pl-8 sm:pl-10">
            {/* Timeline Node Dot */}
            <div className="absolute left-1 sm:left-1.5 top-1.5 w-4 h-4 rounded-full bg-paper border-2 border-charcoal-900 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-engineering-amber rounded-full"></div>
            </div>

            {/* Timeline Card */}
            <div className="bg-paper-elevated/95 backdrop-blur-sm p-4 sm:p-6 rounded hairline-border hover:border-charcoal-400 transition-colors shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2 font-mono text-xs">
                <span className="text-engineering-amber font-bold text-[11px] sm:text-xs">{item.period}</span>
                <span className="text-charcoal-400 uppercase text-[10px] sm:text-xs">{item.stage}</span>
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-charcoal-900 mb-2">
                {item.role}
              </h3>
              <p className="text-xs text-charcoal-700 font-sans leading-relaxed mb-3 sm:mb-4">
                {item.summary}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-charcoal-600">
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
