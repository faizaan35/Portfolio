import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import DepthCarousel from './DepthCarousel';

export default function SectionProjects({ selectedProject, setSelectedProject, onTriggerSound }) {
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

  return (
    <section id="projects" className="min-h-screen py-28 px-6 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 hairline-b pb-6">
        <div>
          <div className="font-mono text-xs text-engineering-amber tracking-widest uppercase mb-2 font-bold">
            03 // PROJECTS
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-charcoal-900">
            Selected Engineered Systems
          </h2>
        </div>
        <p className="font-mono text-xs text-charcoal-500 mt-2 md:mt-0 font-medium">
          DRAG / SCROLL TO EXPLORE PROJECTS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: React Bits Depth Carousel for Projects */}
        <div className="lg:col-span-6 xl:col-span-6 max-w-xl w-full">
          
          {/* Depth Carousel Component */}
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
                  {/* Top Spec Header */}
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

                  {/* Title */}
                  <h3 className="text-2xl font-display font-extrabold text-charcoal-900 mb-2.5 tracking-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-charcoal-600 font-sans leading-relaxed mb-4">
                    {project.desc}
                  </p>

                  {/* Architecture Blueprint Note */}
                  <div className="p-3 bg-paper-subtle rounded border border-charcoal-900/5 mb-4">
                    <div className="text-[10px] font-mono text-charcoal-400 uppercase tracking-wider mb-1 font-semibold">
                      Architecture & Subsystems:
                    </div>
                    <p className="text-[11px] font-sans text-charcoal-800 leading-snug">
                      {project.architecture}
                    </p>
                  </div>

                  {/* Spec Badges Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-[10px]">
                    {project.specs.map((sp, idx) => (
                      <div key={idx} className="p-1.5 bg-paper-elevated rounded border border-charcoal-900/5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-engineering-amber"></span>
                        <span className="truncate">{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tech Pills and Links */}
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

          {/* Minimal Subtle Editorial Controller */}
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
    </section>
  );
}
