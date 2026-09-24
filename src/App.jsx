import React, { useState, useEffect, useCallback } from 'react';
import Terminal3D from './components/Terminal3D';
import Header from './components/Header';
import SectionIntro from './components/SectionIntro';
import SectionEngineering from './components/SectionEngineering';
import SectionProjects from './components/SectionProjects';
import SectionJourney from './components/SectionJourney';
import SectionContact from './components/SectionContact';
import MobileScrollExperience from './components/MobileScrollExperience';
import { playMechanicalActuation } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const [selectedProject, setSelectedProject] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPhone, setIsPhone] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerSound = useCallback((pitch = 1.0) => {
    playMechanicalActuation(pitch, isMuted);
  }, [isMuted]);

  // Global window binding for Three.js synchronization
  useEffect(() => {
    window.__portfolioActiveSection = activeSection;
    window.__portfolioSelectedProject = selectedProject;
    window.__portfolioTriggerFlicker = true;
  }, [activeSection, selectedProject]);

  // Scroll observer (Active for Tablet & Desktop)
  useEffect(() => {
    if (isPhone) return;
    const sections = ['intro', 'engineering', 'projects', 'journey', 'contact'];
    const progressLine = document.getElementById('scroll-progress-line');

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      if (progressLine) {
        progressLine.style.width = `${progress * 100}%`;
      }

      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPhone]);

  return (
    <div className="w-full relative overflow-x-hidden">
      {/* Fixed 3D WebGL Canvas Layer (Three.js Handheld Developer Terminal) */}
      <Terminal3D />

      {/* Header */}
      <Header
        activeSection={activeSection}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onTriggerSound={triggerSound}
      />

      {/* Main Sections Flow: Experimental 3D storytelling for Phone, Baseline for Tablet & Desktop */}
      <main className="w-full relative z-10">
        {isPhone ? (
          <MobileScrollExperience
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            onTriggerSound={triggerSound}
          />
        ) : (
          <>
            <SectionIntro onTriggerSound={triggerSound} />
            <SectionEngineering />
            <SectionProjects
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              onTriggerSound={triggerSound}
            />
            <SectionJourney />
            <SectionContact onTriggerSound={triggerSound} />
          </>
        )}
      </main>
    </div>
  );
}
