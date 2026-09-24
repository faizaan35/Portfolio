import React from 'react';

export default function SectionIntro({ onTriggerSound }) {
  return (
    <section id="intro" className="min-h-screen relative flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Top Status Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-charcoal-400 hairline-b pb-3 sm:pb-4">
        <div className="flex items-center gap-3">
          <span className="text-charcoal-800 font-semibold text-[11px] sm:text-xs">CS // SYSTEMS & SOFTWARE</span>
        </div>
        <div className="flex items-center gap-2 text-charcoal-600 text-[10px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-engineering-amber animate-ping"></span>
          <span className="hidden sm:inline">3D TERMINAL ONLINE (CLICK & DRAG TO ORBIT)</span>
          <span className="sm:hidden">3D TERMINAL ONLINE (DRAG TO ROTATE)</span>
        </div>
      </div>

      {/* Main Hero Column */}
      <div className="lg:my-auto max-w-3xl pt-2 pb-4 sm:py-12">
        <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 mb-3 sm:mb-6 rounded bg-paper-elevated hairline-border font-mono text-[10px] sm:text-xs text-charcoal-700 shadow-sm max-w-full">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-engineering-amber shrink-0"></span>
          <span className="truncate">LOW-LEVEL COMPUTING, STORAGE ENGINES & DISTRIBUTED SYSTEMS</span>
        </div>

        <h1 className="text-5xl xs:text-6xl sm:text-7xl lg:text-9xl font-display font-extrabold tracking-tight text-charcoal-900 leading-[0.92]">
          MOHD<br />FAIZAAN
        </h1>

        <p className="mt-3 sm:mt-6 text-base sm:text-2xl font-sans font-semibold text-charcoal-700 leading-snug">
          Computer Science & Software Engineer
        </p>

        {/* Mobile-Only Dedicated 3D Terminal Viewing Stage */}
        <div className="lg:hidden w-full my-4 flex flex-col items-center justify-center">
          <div className="h-[250px] xs:h-[280px] sm:h-[320px] md:h-[340px] w-full flex items-center justify-center pointer-events-none">
            {/* Transparent viewing window: Fixed 3D Terminal renders right here */}
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-elevated/90 backdrop-blur-sm hairline-border font-mono text-[10px] text-charcoal-600 shadow-sm -mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-engineering-amber animate-pulse"></span>
            <span>DRAG HORIZONTALLY TO ROTATE TERMINAL ↔</span>
          </div>
        </div>

        <p className="mt-3 sm:mt-4 text-xs sm:text-base lg:text-lg text-charcoal-600 max-w-xl font-sans leading-relaxed">
          I build systems, applications and software from the ground up. Specializing in database internals, memory hierarchies, and resilient backend architectures.
        </p>

        <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
          <a
            href="#projects"
            onClick={() => onTriggerSound?.(1.1)}
            className="px-5 sm:px-6 py-3 bg-charcoal-900 text-paper font-mono text-xs font-semibold tracking-wider rounded hover:bg-charcoal-800 transition-all flex items-center gap-2 shadow-sm min-h-[44px]"
          >
            <span>INSPECT PROJECTS</span>
            <span className="text-engineering-amber">↓</span>
          </a>

          <a
            href="#engineering"
            onClick={() => onTriggerSound?.(1.05)}
            className="px-5 sm:px-6 py-3 bg-paper-elevated text-charcoal-900 hairline-border font-mono text-xs font-semibold tracking-wider rounded hover:bg-paper-subtle transition-all min-h-[44px]"
          >
            ENGINEERING PROFILE
          </a>
        </div>
      </div>

      {/* Bottom Scroll / Interaction Indicator */}
      <div className="flex items-end justify-between font-mono text-xs hairline-t pt-3 sm:pt-4 text-charcoal-400">
        <div className="text-charcoal-500 font-mono text-[11px] sm:text-xs">
          SYSTEMS & SOFTWARE
        </div>
        <div className="flex items-center gap-2 text-charcoal-700 animate-bounce text-[11px] sm:text-xs">
          <span className="font-semibold tracking-wider">SCROLL TO EXPLORE</span>
          <span className="text-engineering-amber">↓</span>
        </div>
      </div>
    </section>
  );
}
