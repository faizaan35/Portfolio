import React, { useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import DepthCarousel from './DepthCarousel';

export default function SectionProjects({ selectedProject, setSelectedProject, onTriggerSound }) {
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handlePrev = () => {
    const total = PORTFOLIO_DATA.projects.length;
    const next = (selectedProject - 1 + total) % total;
    setSelectedProject(next);
    onTriggerSound?.(1.0);
  };

  const handleNext = () => {
    const total = PORTFOLIO_DATA.projects.length;
    const next = (selectedProject + 1) % total;
    setSelectedProject(next);
    onTriggerSound?.(1.0);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const currentProject = PORTFOLIO_DATA.projects[selectedProject] || PORTFOLIO_DATA.projects[0];

  return (
    <section id="projects" className="min-h-screen py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 hairline-b pb-4 sm:pb-6">
        <div>
          <div className="font-mono text-xs text-engineering-amber tracking-widest uppercase mb-2 font-bold">
            03 // PROJECTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-charcoal-900">
            Selected Engineered Systems
          </h2>
        </div>
        <p className="font-mono text-xs text-charcoal-500 mt-2 md:mt-0 font-medium">
          <span className="hidden sm:inline">DRAG / SCROLL TO EXPLORE PROJECTS</span>
          <span className="sm:hidden">SWIPE / BUTTONS TO ROTATE PROJECTS</span>
        </p>
      </div>

      {/* Desktop Layout (>= 1024px) - Kept 100% Intact with DepthCarousel */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: React Bits Depth Carousel for Projects */}
        <div className="lg:col-span-6 xl:col-span-6 max-w-xl w-full">
          <DepthCarousel
            items={PORTFOLIO_DATA.projects}
            activeIndex={selectedProject}
            onChange={(index) => {
              setSelectedProject(index);
              onTriggerSound?.(1.1);
            }}
            depth={220}
            spread={70}
            tilt={12}
            tiltDirection="right"
            perspective={1400}
            visibleCards={3}
            falloff={0.18}
            blur={2}
            autoplay={false}
            loop={true}
            duration={700}
            ease="power3.out"
            cardWidth="100%"
            cardHeight={500}
            renderCard={(project, { isActive }) => (
              <article
                className={`h-full w-full p-7 rounded hairline-border flex flex-col justify-between transition-all duration-200 ${
                  isActive
                    ? 'bg-paper-elevated border-engineering-amber shadow-lg'
                    : 'bg-paper-elevated/75 border-charcoal-900/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 hairline-b mb-3">
                    <span className="font-mono text-[10px] tracking-widest text-engineering-amber font-bold uppercase">
                      {project.type}
                    </span>
                    {isActive && (
                      <span className="font-mono text-[10px] text-engineering-amber font-semibold">
                        ● FEATURED
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-display font-extrabold text-charcoal-900 mb-2.5 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs text-charcoal-600 font-sans leading-relaxed mb-4">
                    {project.desc}
                  </p>

                  <div className="p-3 bg-paper-subtle rounded border border-charcoal-900/5 mb-4">
                    <div className="text-[10px] font-mono text-charcoal-400 uppercase tracking-wider mb-1 font-semibold">
                      Architecture & Subsystems:
                    </div>
                    <p className="text-[11px] font-sans text-charcoal-800 leading-snug">
                      {project.architecture}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-[10px]">
                    {project.specs.map((sp, idx) => (
                      <div key={idx} className="p-1.5 bg-paper-elevated rounded border border-charcoal-900/5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-engineering-amber"></span>
                        <span className="truncate">{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((t, idx) => (
                      <span key={idx} className="font-mono text-[10px] px-2 py-0.5 bg-paper-subtle text-charcoal-700 rounded font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="hairline-t pt-3 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTriggerSound?.(1.1);
                          }}
                          className="text-charcoal-800 hover:text-charcoal-900 font-semibold underline flex items-center gap-1"
                        >
                          SOURCE REPO ↗
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTriggerSound?.(1.1);
                          }}
                          className="text-engineering-amber hover:underline font-semibold"
                        >
                          DEMO ↗
                        </a>
                      )}
                    </div>

                    <span className="text-[10px] text-charcoal-400">
                      {project.numStr}
                    </span>
                  </div>
                </div>
              </article>
            )}
          />

          <div className="flex items-center justify-between mt-5 px-1 font-mono text-xs text-charcoal-600">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded bg-paper-subtle hover:bg-charcoal-900 hover:text-paper hairline-border transition-colors font-bold"
                aria-label="Previous Project"
              >
                ← PREV
              </button>

              <span className="font-bold tracking-widest text-charcoal-900">
                {String(selectedProject + 1).padStart(2, '0')} / 04
              </span>

              <button
                onClick={handleNext}
                className="p-1.5 rounded bg-paper-subtle hover:bg-charcoal-900 hover:text-paper hairline-border transition-colors font-bold"
                aria-label="Next Project"
              >
                NEXT →
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[10px] text-charcoal-400">
              <span>DRAG / ARROWS / WHEEL</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Unobstructed Viewing Area for the 3D Terminal */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-6 min-h-[500px] pointer-events-none" />
      </div>

      {/* Mobile/Tablet Layout (< 1024px) - Intentionally Designed with 3D Terminal as Core Hub */}
      <div 
        className="lg:hidden w-full max-w-xl mx-auto flex flex-col"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Dedicated 3D Terminal Stage for Mobile Projects (Prominently Placed First) */}
        <div className="w-full my-2 flex flex-col items-center justify-center relative">
          <div className="h-[260px] xs:h-[290px] sm:h-[320px] md:h-[340px] w-full flex items-center justify-center pointer-events-none">
            {/* Transparent viewing window through which the 3D terminal displays real-time CRT architecture */}
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-elevated/90 backdrop-blur-sm hairline-border font-mono text-[10px] text-charcoal-600 shadow-sm -mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>TERMINAL TELEMETRY // ARCHITECTURE</span>
          </div>
        </div>

        {/* Project Context & Meta Card */}
        <div className="p-4 sm:p-5 bg-paper-elevated/95 backdrop-blur-md rounded hairline-border shadow-sm my-3">
          <div className="flex items-center justify-between pb-2 mb-2 hairline-b font-mono text-[10px]">
            <span className="text-engineering-amber font-bold tracking-widest uppercase">
              {currentProject.type}
            </span>
            <span className="text-charcoal-500 font-bold">
              {currentProject.numStr}
            </span>
          </div>

          <h3 className="text-2xl xs:text-3xl font-display font-extrabold text-charcoal-900 tracking-tight mb-2">
            {currentProject.title}
          </h3>

          <p className="text-xs text-charcoal-600 font-sans leading-relaxed mb-3">
            {currentProject.desc}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {currentProject.tags.slice(0, 4).map((t, idx) => (
              <span key={idx} className="font-mono text-[10px] px-2 py-0.5 bg-paper-subtle text-charcoal-700 rounded font-semibold">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-3 hairline-t font-mono text-xs">
            {currentProject.github && (
              <a
                href={currentProject.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => onTriggerSound?.(1.1)}
                className="flex-1 py-2.5 px-3 bg-charcoal-900 text-paper rounded text-center font-semibold text-[11px] hover:bg-charcoal-800 transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>SOURCE REPO</span>
                <span className="text-engineering-amber">↗</span>
              </a>
            )}
            {currentProject.demo && (
              <a
                href={currentProject.demo}
                target="_blank"
                rel="noreferrer"
                onClick={() => onTriggerSound?.(1.1)}
                className="flex-1 py-2.5 px-3 bg-paper-elevated hairline-border border-engineering-amber text-charcoal-900 rounded text-center font-semibold text-[11px] hover:bg-paper-subtle transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>LIVE DEMO</span>
                <span className="text-engineering-amber">↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Navigation Controller for Mobile */}
        <div className="flex items-center justify-between mt-4 p-3 bg-paper-elevated/95 backdrop-blur-sm rounded hairline-border font-mono text-xs text-charcoal-700 shadow-sm">
          <button
            onClick={handlePrev}
            className="px-3.5 py-2.5 rounded bg-paper-subtle hover:bg-charcoal-900 hover:text-paper hairline-border transition-colors font-bold min-h-[44px] flex items-center gap-1"
            aria-label="Previous Project"
          >
            ← PREV
          </button>

          <div className="flex items-center gap-1.5">
            {PORTFOLIO_DATA.projects.map((p, pIdx) => (
              <button
                key={pIdx}
                onClick={() => {
                  setSelectedProject(pIdx);
                  onTriggerSound?.(1.1);
                }}
                className={`w-8 h-8 rounded text-[11px] font-bold font-mono transition-all flex items-center justify-center min-h-[36px] ${
                  selectedProject === pIdx
                    ? 'bg-charcoal-900 text-paper border border-engineering-amber shadow-sm'
                    : 'bg-paper-subtle text-charcoal-600 hover:bg-paper-elevated'
                }`}
                aria-label={`Switch to Project ${pIdx + 1}`}
              >
                0{pIdx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-3.5 py-2.5 rounded bg-paper-subtle hover:bg-charcoal-900 hover:text-paper hairline-border transition-colors font-bold min-h-[44px] flex items-center gap-1"
            aria-label="Next Project"
          >
            NEXT →
          </button>
        </div>
      </div>
    </section>
  );
}
