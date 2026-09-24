import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function SectionContact({ onTriggerSound }) {
  const endpoints = [
    { label: "GitHub", handle: "github.com/faizaan35", href: "https://github.com/faizaan35" },
    { label: "LinkedIn", handle: "linkedin.com/in/mohd-faizaan-", href: "https://linkedin.com/in/mohd-faizaan-" },
    { label: "Email", handle: "mohdfaizaan35@gmail.com", href: "mailto:mohdfaizaan35@gmail.com" },
    { label: "Resume", handle: "Mohd_Faizaan_Resume.pdf", href: "/Mohd_Faizaan_Resume.pdf", download: "Mohd_Faizaan_Resume.pdf" }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Contact Header */}
      <div className="max-w-3xl pt-4 sm:pt-8">
        <div className="font-mono text-xs text-engineering-amber tracking-widest uppercase mb-3 sm:mb-4 font-bold">
          05 // CONTACT
        </div>
        <h2 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-charcoal-900 leading-[0.95]">
          LET'S BUILD<br />SOMETHING.
        </h2>
        <p className="mt-4 sm:mt-6 text-sm sm:text-xl text-charcoal-600 font-sans max-w-xl leading-relaxed">
          Open for software engineering opportunities, systems research, and challenging technical problems.
        </p>
      </div>

      {/* Mobile-Only Dedicated 3D Terminal Viewing Stage */}
      <div className="lg:hidden w-full my-6 flex flex-col items-center justify-center">
        <div className="h-[250px] xs:h-[280px] sm:h-[320px] md:h-[340px] w-full flex items-center justify-center pointer-events-none">
          {/* Transparent window: 3D terminal displays live direct contact screen here */}
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-elevated/90 backdrop-blur-sm hairline-border font-mono text-[10px] text-charcoal-600 shadow-sm -mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-engineering-amber animate-pulse"></span>
          <span>TERMINAL DIRECTORY // CHANNELS</span>
        </div>
      </div>

      {/* Interactive Contact Endpoints Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6 sm:my-12">
        {endpoints.map((ep, idx) => (
          <a
            key={idx}
            href={ep.href}
            download={ep.download || undefined}
            target={ep.download ? undefined : "_blank"}
            rel={ep.download ? undefined : "noreferrer"}
            onClick={() => onTriggerSound?.(1.1)}
            className="p-5 sm:p-6 bg-paper-elevated rounded hairline-border hover:border-engineering-amber transition-all group shadow-sm flex flex-col justify-between min-h-[96px]"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="font-mono text-xs text-engineering-amber font-bold">0{idx + 1}</span>
              <span className="font-mono text-xs text-charcoal-400 group-hover:text-charcoal-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                {ep.download ? '↓' : '↗'}
              </span>
            </div>
            <div>
              <div className="font-mono text-[10px] text-charcoal-400 uppercase tracking-wider">{ep.label}</div>
              <div className="font-mono text-xs font-semibold text-charcoal-900 truncate">{ep.handle}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Site Metadata Footer */}
      <div className="hairline-t pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] text-charcoal-400 text-center sm:text-left">
        <div>{PORTFOLIO_DATA.profile.name} — {PORTFOLIO_DATA.profile.title}</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>AVAILABLE FOR OPPORTUNITIES</span>
        </div>
        <div>REACT • THREE.JS • TAILWIND CSS</div>
      </div>
    </section>
  );
}
