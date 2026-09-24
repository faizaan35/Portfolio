import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function MobileScrollExperience({
  activeSection,
  setActiveSection,
  selectedProject,
  setSelectedProject,
  onTriggerSound
}) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track touch swipe on mobile project section
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handlePrevProject = (e) => {
    e?.stopPropagation();
    const total = PORTFOLIO_DATA.projects.length;
    const next = (selectedProject - 1 + total) % total;
    setSelectedProject(next);
    onTriggerSound?.(1.0);
  };

  const handleNextProject = (e) => {
    e?.stopPropagation();
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
        handleNextProject();
      } else {
        handlePrevProject();
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    let lastSec = 'intro';

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: stage,
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);
        window.__mobileScrollProgress = p;

        const progressLine = document.getElementById('scroll-progress-line');
        if (progressLine) {
          progressLine.style.width = `${p * 100}%`;
        }

        // Mobile Header Fadeout during terminal takeover:
        // 0.00 - 0.15: Fully visible (opacity 1.0)
        // 0.15 - 0.25: Smooth fade out (opacity 1.0 -> 0.0)
        // 0.25 - 0.88: Completely hidden (opacity 0.0, pointer-events none)
        // 0.88 - 1.00: Smooth fade back in for Contact & Release (opacity 0.0 -> 1.0)
        const header = document.getElementById('main-header');
        if (header) {
          let hOpacity = 1;
          if (p <= 0.15) {
            hOpacity = 1;
          } else if (p < 0.25) {
            hOpacity = 1 - (p - 0.15) / 0.10;
          } else if (p < 0.88) {
            hOpacity = 0;
          } else {
            hOpacity = (p - 0.88) / 0.12;
          }

          header.style.opacity = hOpacity.toFixed(3);
          header.style.pointerEvents = hOpacity > 0.2 ? 'auto' : 'none';
          header.style.visibility = hOpacity <= 0.01 ? 'hidden' : 'visible';
        }

        let curSec = 'intro';
        if (p < 0.22) {
          curSec = 'intro';
        } else if (p < 0.46) {
          curSec = 'engineering';
        } else if (p < 0.72) {
          curSec = 'projects';
        } else if (p < 0.88) {
          curSec = 'journey';
        } else {
          curSec = 'contact';
        }

        if (curSec !== lastSec) {
          lastSec = curSec;
          setActiveSection(curSec);
          window.__portfolioActiveSection = curSec;
          window.__portfolioTriggerFlicker = true;
          onTriggerSound?.(1.05);
        }
      }
    });

    return () => {
      trigger.kill();
      window.__mobileScrollProgress = undefined;
      const header = document.getElementById('main-header');
      if (header) {
        header.style.opacity = '';
        header.style.pointerEvents = '';
        header.style.visibility = '';
      }
    };
  }, [setActiveSection, onTriggerSound]);

  const curProject = PORTFOLIO_DATA.projects[selectedProject] || PORTFOLIO_DATA.projects[0];

  // Derive stage opacity and visibility based on scrollProgress
  // Stage 1: Intro (0.00 to 0.20)
  const introOpacity = Math.max(0, 1 - (scrollProgress / 0.16));
  const isIntroVisible = scrollProgress < 0.22;

  // Stage 2 & 3: Engineering HUD (0.22 to 0.46)
  const isEngVisible = scrollProgress >= 0.22 && scrollProgress < 0.46;
  const engOpacity = isEngVisible
    ? Math.min(1, (scrollProgress - 0.22) / 0.05) * Math.min(1, (0.46 - scrollProgress) / 0.05)
    : 0;

  // Stage 4: Projects Interactive Controller (0.46 to 0.72)
  const isProjVisible = scrollProgress >= 0.46 && scrollProgress < 0.72;
  const projOpacity = isProjVisible
    ? Math.min(1, (scrollProgress - 0.46) / 0.05) * Math.min(1, (0.72 - scrollProgress) / 0.05)
    : 0;

  // Stage 5: Journey HUD (0.72 to 0.88)
  const isJourneyVisible = scrollProgress >= 0.72 && scrollProgress < 0.88;
  const journeyOpacity = isJourneyVisible
    ? Math.min(1, (scrollProgress - 0.72) / 0.04) * Math.min(1, (0.88 - scrollProgress) / 0.04)
    : 0;

  // Stage 6: Contact Action Cards (0.88 to 1.00)
  const isContactVisible = scrollProgress >= 0.88;
  const contactOpacity = isContactVisible
    ? Math.min(1, (scrollProgress - 0.88) / 0.05)
    : 0;

  return (
    <div ref={containerRef} className="relative w-full h-[520vh]">
      {/* Anchor targets placed down the track for header navigation */}
      <div id="intro" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />
      <div id="engineering" className="absolute top-[24%] left-0 w-full h-1 pointer-events-none" />
      <div id="projects" className="absolute top-[50%] left-0 w-full h-1 pointer-events-none" />
      <div id="journey" className="absolute top-[75%] left-0 w-full h-1 pointer-events-none" />
      <div id="contact" className="absolute top-[92%] left-0 w-full h-1 pointer-events-none" />

      {/* Pinned Viewport Container - True full viewport, no empty header padding */}
      <div
        ref={stageRef}
        className="w-full h-screen h-[100dvh] relative flex flex-col justify-between overflow-hidden px-4 pb-3 select-none pointer-events-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ============================================================== */}
        {/* STAGE 1: INTRO HERO OVERLAY (Fades out as terminal grows)       */}
        {/* ============================================================== */}
        {isIntroVisible && (
          <div
            className="absolute inset-x-4 top-20 bottom-5 flex flex-col justify-between z-10 transition-opacity pointer-events-auto"
            style={{ opacity: introOpacity }}
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-paper-elevated hairline-border font-mono text-[9px] text-charcoal-700 shadow-sm mb-2 max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-engineering-amber shrink-0"></span>
                <span className="truncate">SYSTEMS ARCHITECTURE & STORAGE ENGINES</span>
              </div>

              <h1 className="text-5xl xs:text-6xl font-display font-extrabold tracking-tight text-charcoal-900 leading-[0.92]">
                MOHD<br />FAIZAAN
              </h1>

              <p className="mt-2 text-sm font-sans font-semibold text-charcoal-700">
                Computer Science & Software Engineer
              </p>
            </div>

            {/* Middle Transparent Gap: 3D terminal sits here initially */}
            <div className="h-[240px] xs:h-[260px] w-full pointer-events-none" />

            <div>
              <p className="text-xs text-charcoal-600 font-sans leading-relaxed mb-3">
                Specializing in database internals, memory hierarchies, and resilient backend architectures.
              </p>

              <div className="flex items-center gap-2">
                <a
                  href="#projects"
                  onClick={() => onTriggerSound?.(1.1)}
                  className="px-4 py-2 bg-charcoal-900 text-paper font-mono text-[11px] font-semibold tracking-wider rounded hover:bg-charcoal-800 transition-all flex items-center gap-1.5 shadow-sm min-h-[40px]"
                >
                  <span>INSPECT PROJECTS</span>
                  <span className="text-engineering-amber">↓</span>
                </a>

                <a
                  href="#engineering"
                  onClick={() => onTriggerSound?.(1.05)}
                  className="px-4 py-2 bg-paper-elevated text-charcoal-900 hairline-border font-mono text-[11px] font-semibold tracking-wider rounded hover:bg-paper-subtle transition-all min-h-[40px]"
                >
                  PROFILE
                </a>
              </div>

              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-charcoal-400 hairline-t pt-2">
                <span>SCROLL DOWN TO DIVE INTO TERMINAL</span>
                <span className="text-engineering-amber animate-bounce">↓</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STAGE 3: ENGINEERING TELEMETRY OVERLAY                         */}
        {/* ============================================================== */}
        {isEngVisible && (
          <div
            className="absolute inset-x-4 bottom-5 flex flex-col items-center z-10 pointer-events-auto transition-opacity"
            style={{ opacity: engOpacity }}
          >
            <div className="w-full max-w-sm p-3 bg-paper-elevated/95 backdrop-blur-md rounded hairline-border shadow-lg">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 hairline-b font-mono text-[10px]">
                <span className="text-engineering-amber font-bold tracking-wider uppercase">
                  TERMINAL SCREEN // CORE STACK
                </span>
                <span className="text-charcoal-500 font-bold">02 / 05</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {['C++17/20', 'B+ TREES', 'WAL', 'BUFFER POOLS', 'ACID', 'SYSTEMS'].map((chip, idx) => (
                  <span key={idx} className="font-mono text-[9px] px-2 py-0.5 bg-paper-subtle text-charcoal-800 rounded font-semibold border border-charcoal-900/5">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between font-mono text-[9px] text-charcoal-500 pt-1 hairline-t">
                <span>ALL TECH RENDERED ON CRT ABOVE</span>
                <span className="text-engineering-amber">SCROLL TO PROJECTS ↓</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STAGE 4: PROJECTS CONTROLLER OVERLAY                           */}
        {/* ============================================================== */}
        {isProjVisible && (
          <div
            className="absolute inset-x-4 bottom-5 flex flex-col items-center z-10 pointer-events-auto transition-opacity"
            style={{ opacity: projOpacity }}
          >
            <div
              data-interactive-card="true"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full max-w-sm p-3 bg-paper-elevated/95 backdrop-blur-md rounded hairline-border shadow-lg"
            >
              <div className="flex items-center justify-between pb-1 mb-1 hairline-b font-mono text-[10px]">
                <span className="text-engineering-amber font-bold tracking-widest uppercase">
                  {curProject.type}
                </span>
                <span className="text-charcoal-600 font-bold">
                  {curProject.numStr}
                </span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-base text-charcoal-900">
                  {curProject.title}
                </h3>
                {curProject.github && (
                  <a
                    href={curProject.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => onTriggerSound?.(1.1)}
                    className="px-2.5 py-1 bg-charcoal-900 text-paper font-mono text-[10px] font-semibold rounded hover:bg-charcoal-800 transition-colors flex items-center gap-1 shadow-sm min-h-[32px]"
                  >
                    <span>SOURCE REPO</span>
                    <span className="text-engineering-amber">↗</span>
                  </a>
                )}
              </div>

              {/* Project Navigation Switcher */}
              <div className="flex items-center justify-between pt-1.5 hairline-t font-mono text-xs">
                <button
                  onClick={handlePrevProject}
                  className="px-2.5 py-1 rounded bg-paper-subtle hover:bg-charcoal-900 hover:text-paper hairline-border text-[11px] font-bold min-h-[34px]"
                  aria-label="Previous Project"
                >
                  ← PREV
                </button>

                <div className="flex items-center gap-1">
                  {PORTFOLIO_DATA.projects.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedProject(idx);
                        onTriggerSound?.(1.1);
                      }}
                      className={`w-7 h-7 rounded text-[10px] font-bold font-mono transition-all flex items-center justify-center ${
                        selectedProject === idx
                          ? 'bg-charcoal-900 text-paper border border-engineering-amber'
                          : 'bg-paper-subtle text-charcoal-600'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNextProject}
                  className="px-2.5 py-1 rounded bg-paper-subtle hover:bg-charcoal-900 hover:text-paper hairline-border text-[11px] font-bold min-h-[34px]"
                  aria-label="Next Project"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STAGE 5: JOURNEY TELEMETRY OVERLAY                            */}
        {/* ============================================================== */}
        {isJourneyVisible && (
          <div
            className="absolute inset-x-4 bottom-5 flex flex-col items-center z-10 pointer-events-auto transition-opacity"
            style={{ opacity: journeyOpacity }}
          >
            <div className="w-full max-w-sm p-3 bg-paper-elevated/95 backdrop-blur-md rounded hairline-border shadow-lg">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 hairline-b font-mono text-[10px]">
                <span className="text-engineering-amber font-bold tracking-wider uppercase">
                  TRAJECTORY // SYSTEMS PROGRESSION
                </span>
                <span className="text-charcoal-500 font-bold">04 / 05</span>
              </div>

              <p className="text-[11px] text-charcoal-700 font-sans leading-snug mb-2">
                From algorithms & computer vision to database internals and C++ storage engine architecture.
              </p>

              <div className="flex items-center justify-between font-mono text-[9px] text-charcoal-500 pt-1 hairline-t">
                <span>TIMELINE ACTIVE ON CRT</span>
                <span className="text-engineering-amber">SCROLL TO CONTACT ↓</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STAGE 6: CONTACT ACTION OVERLAY                                */}
        {/* ============================================================== */}
        {isContactVisible && (
          <div
            className="absolute inset-x-4 bottom-5 flex flex-col items-center z-10 pointer-events-auto transition-opacity"
            style={{ opacity: contactOpacity }}
          >
            <div className="w-full max-w-sm p-3.5 bg-paper-elevated/98 backdrop-blur-md rounded hairline-border shadow-xl">
              <div className="flex items-center justify-between pb-1.5 mb-2 hairline-b font-mono text-[10px]">
                <span className="text-engineering-amber font-bold tracking-wider uppercase">
                  05 // DIRECT CONTACT
                </span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  AVAILABLE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2 font-mono text-[11px]">
                <a
                  href="https://github.com/faizaan35"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onTriggerSound?.(1.1)}
                  className="p-2 bg-paper-subtle rounded hairline-border hover:border-engineering-amber flex items-center justify-between min-h-[38px]"
                >
                  <span className="font-semibold text-charcoal-900">GITHUB</span>
                  <span className="text-engineering-amber text-[10px]">↗</span>
                </a>

                <a
                  href="https://linkedin.com/in/mohd-faizaan-"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onTriggerSound?.(1.1)}
                  className="p-2 bg-paper-subtle rounded hairline-border hover:border-engineering-amber flex items-center justify-between min-h-[38px]"
                >
                  <span className="font-semibold text-charcoal-900">LINKEDIN</span>
                  <span className="text-engineering-amber text-[10px]">↗</span>
                </a>

                <a
                  href="mailto:mohdfaizaan35@gmail.com"
                  onClick={() => onTriggerSound?.(1.1)}
                  className="p-2 bg-paper-subtle rounded hairline-border hover:border-engineering-amber flex items-center justify-between min-h-[38px]"
                >
                  <span className="font-semibold text-charcoal-900">EMAIL</span>
                  <span className="text-engineering-amber text-[10px]">↗</span>
                </a>

                <a
                  href="/Mohd_Faizaan_Resume.pdf"
                  download="Mohd_Faizaan_Resume.pdf"
                  onClick={() => onTriggerSound?.(1.1)}
                  className="p-2 bg-charcoal-900 text-paper rounded flex items-center justify-between min-h-[38px]"
                >
                  <span className="font-semibold">RESUME</span>
                  <span className="text-engineering-amber text-[10px]">↓</span>
                </a>
              </div>

              <div className="text-center font-mono text-[9px] text-charcoal-400 pt-1 hairline-t">
                MOHD FAIZAAN • CS & SOFTWARE ENGINEER
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
