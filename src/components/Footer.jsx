import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030304] text-white/40 text-xs py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        
        {/* Footnotes & Disclaimers (Apple style) */}
        <div className="space-y-3 font-mono text-[11px] leading-relaxed border-b border-white/5 pb-10">
          <p>
            1. European specification model shown with optional equipment. North American production models conform strictly to US DOT, NHTSA, and EPA safety and emission standards.
          </p>
          <p>
            2. Acceleration figures (0–60 mph in 2.6 seconds) achieved on closed test tracks with Sport Chrono package launch control under ambient 20°C temperatures using standard summer performance tire compound.
          </p>
          <p>
            3. MSRP excludes destination charge ($1,650), sales taxes, state title, registration fees, and optional dealer installed equipment. Actual dealer pricing may vary based on market allocation availability.
          </p>
          <p>
            4. Burmester® is a registered trademark of Burmester Audiosysteme GmbH, Berlin, Germany.
          </p>
        </div>

        {/* Links & Brand Identity */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px] text-amber-400">
              911
            </div>
            <span className="text-white/80 font-medium tracking-wider uppercase text-xs">
              Porsche 911 Turbo S Atelier
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <a href="#anatomy" className="hover:text-white transition-colors">Hero Anatomy</a>
            <a href="#engineering" className="hover:text-white transition-colors">Engineering</a>
            <a href="#aerodynamics" className="hover:text-white transition-colors">Active Aero</a>
            <a href="#cockpit" className="hover:text-white transition-colors">Cockpit</a>
            <a href="#telemetry" className="hover:text-white transition-colors">Telemetry</a>
            <a href="#configurator" className="hover:text-white transition-colors">Pricing & Configurator</a>
            <a href="#reserve" className="hover:text-white transition-colors">Reserve</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-white/30 pt-4 border-t border-white/5">
          <div>
            © 2026 Dr. Ing. h.c. F. Porsche AG. All Rights Reserved. Engineered for excellence.
          </div>
          <div className="mt-2 sm:mt-0">
            Privacy Policy • Legal Notice • Cookie Preferences • EPA Emissions
          </div>
        </div>

      </div>
    </footer>
  );
}
