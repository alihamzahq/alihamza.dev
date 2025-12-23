'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

function MenuIcon({ className }) {
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
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function CloseIcon({ className }) {
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
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on link click
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-gray-900/5 dark:shadow-black/20 border-b border-gray-200/50 dark:border-slate-700/50'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Name */}
            <a
              href="#"
              className={`text-lg font-bold transition-all duration-200 ${
                scrolled
                  ? 'text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400'
                  : 'text-white drop-shadow-sm hover:text-white/80'
              }`}
            >
              Ali Hamza
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 link-underline ${
                    scrolled
                      ? 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="ml-3 pl-3 border-l border-gray-200/50 dark:border-slate-700/50">
                <ThemeToggle scrolled={scrolled} />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle scrolled={scrolled} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  scrolled
                    ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`mobile-menu-backdrop md:hidden ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu md:hidden ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Menu Header */}
        <div className="mobile-menu-header">
          <span className="mobile-menu-logo">Ali Hamza</span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-menu-close"
            aria-label="Close menu"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mobile-menu-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="mobile-menu-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

      </div>
    </>
  );
}
