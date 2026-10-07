import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronRight, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ onOpenReserve, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Anatomy', href: '#anatomy' },
    { name: 'Engineering', href: '#engineering' },
    { name: 'Aerodynamics', href: '#aerodynamics' },
    { name: 'Cockpit', href: '#cockpit' },
    { name: 'Telemetry', href: '#telemetry' },
    { name: 'Configurator & Price', href: '#configurator' },
    { name: 'Reserve', href: '#reserve' },
  ];

  return (
    <>
      {/* Top Global Apple Bar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#08080a]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Model Badge */}
          <a
            href="#"
            className="group flex items-center gap-3 text-white transition-opacity hover:opacity-80"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs tracking-widest text-amber-400 group-hover:scale-105 transition-transform">
              911
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-wider uppercase text-white/90">
                Porsche
              </span>
              <span className="text-[11px] font-mono tracking-widest text-white/50 -mt-1">
                911 Turbo S
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Apple Style Subtle Navigation) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium tracking-wide text-white/60 hover:text-white transition-colors duration-200 relative py-1"
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Status Pill (Minimalist Apple indicator) */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] text-white/70">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono">2026 Allocation Available</span>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#08080a]/95 backdrop-blur-2xl border-b border-white/10 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-white/80 hover:text-white py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <div className="text-xs text-white/50 font-mono mb-2">ALLOCATION STATUS</div>
                <div className="text-sm text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Q4 Build Slot #088 Open
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
