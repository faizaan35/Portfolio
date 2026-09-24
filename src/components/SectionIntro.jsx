import React from 'react';

export default function SectionIntro({ onTriggerSound }) {
  return (
    <section id="intro" className="min-h-screen relative flex flex-col justify-between pt-28 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-charcoal-400 hairline-b pb-4">
        <div className="flex items-center gap-3">
          <span className="text-charcoal-800 font-semibold">SPEC: CS // SYSTEMS & ENGINES</span>
          <span>•</span>
          <span>DISPATCH: READY</span>
          <span>•</span>
          <span className="text-engineering-amber font-mono">LATENCY: DETERMINISTIC</span>
        </div>
        <div className="flex items-center gap-2 text-charcoal-600">
          <span className="w-2 h-2 rounded-full bg-engineering-amber animate-ping"></span>
          <span>3D TERMINAL ONLINE (CLICK & DRAG TO ORBIT)</span>
        </div>
      </div>

      <div className="my-auto max-w-3xl py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded bg-paper-elevated hairline-border font-mono text-xs text-charcoal-700 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-engineering-amber"></span>
          <span>LOW-LEVEL COMPUTING, STORAGE ENGINES & DISTRIBUTED SYSTEMS</span>
        </div>

        <h1 className="text-6xl sm:text-7xl lg:text-9xl font-display font-extrabold tracking-tight text-charcoal-900 leading-[0.92]">
          MOHD<br />FAIZAAN
        </h1>

        <p className="mt-6 text-xl sm:text-2xl font-sans font-semibold text-charcoal-700 leading-snug">
          Computer Science & Software Engineer
        </p>

        <p className="mt-4 text-base sm:text-lg text-charcoal-600 max-w-xl font-sans leading-relaxed">
          I build systems, applications and software from the ground up. Specializing in database internals, memory hierarchies, and resilient backend architectures.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
          <a
            href="#projects"
            onClick={() => onTriggerSound?.(1.1)}
            className="px-6 py-3 bg-charcoal-900 text-paper font-mono text-xs font-semibold tracking-wider rounded hover:bg-charcoal-800 transition-all flex items-center gap-2 shadow-sm"
          >
            <span>INSPECT PROJECTS</span>
            <span className="text-engineering-amber">↓</span>
          </a>

          <a
            href="#engineering"
            onClick={() => onTriggerSound?.(1.05)}
            className="px-6 py-3 bg-paper-elevated text-charcoal-900 hairline-border font-mono text-xs font-semibold tracking-wider rounded hover:bg-paper-subtle transition-all"
          >
            ENGINEERING PROFILE
          </a>
        </div>
      </div>

      <div className="flex items-end justify-between font-mono text-xs hairline-t pt-4 text-charcoal-400">
        <div className="flex items-center gap-2">
          <span className="font-mono text-charcoal-700 font-semibold">DEVICE ATTITUDE:</span>
          <span id="telemetry-display">PITCH: 0.0° / YAW: 0.0°</span>
        </div>
        <div className="flex items-center gap-2 text-charcoal-700 animate-bounce">
          <span className="font-semibold tracking-wider">SCROLL TO EXPLORE</span>
          <span className="text-engineering-amber">↓</span>
        </div>
      </div>
    </section>
  );
}
