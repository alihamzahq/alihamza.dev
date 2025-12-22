'use client';

import { personalInfo } from '@/lib/constants';

function GitHubIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GlobeIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.97.633-3.792 1.708-5.274"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 md:pt-28 md:pb-28 overflow-hidden hero-gradient">
      {/* Animated gradient overlay */}
      <div className="hero-overlay animate-glow-pulse" />

      {/* Grid pattern */}
      <div className="hero-grid" />

      {/* Floating orbs for visual depth */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Greeting */}
          <p className="text-white/90 font-semibold mb-4 tracking-wide animate-fade-in-up text-sm uppercase">
            Hi, my name is
          </p>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in-up stagger-1 tracking-tight">
            {personalInfo.name}
          </h1>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/95 mb-4 animate-fade-in-up stagger-2">
            {personalInfo.title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-white/85 mb-3 font-medium animate-fade-in-up stagger-3">
            {personalInfo.subtitle}
          </p>

          {/* Remote Badge */}
          <div className="flex justify-center mb-6 animate-fade-in-up stagger-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm text-white/95 rounded-full text-sm font-medium border border-white/20">
              <GlobeIcon className="w-4 h-4 animate-pulse-soft" />
              Open to Remote Opportunities
            </span>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-4">
            {personalInfo.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-in-up stagger-5">
            {/* Primary Button - White on gradient */}
            <a
              href="#projects"
              className="btn btn-lg btn-white"
            >
              View My Work
            </a>
            {/* Secondary Button - Transparent with border */}
            <a
              href="#contact"
              className="btn btn-lg btn-white-outline"
            >
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 animate-fade-in-up stagger-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-xl hover:scale-110"
              aria-label="GitHub Profile"
            >
              <GitHubIcon className="w-6 h-6" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-xl hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer transition-colors"
        aria-label="Scroll to About section"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white/50 hover:text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
    </section>
  );
}
