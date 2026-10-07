import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Radio, Shield, Sliders, Smartphone, Check } from 'lucide-react';

export default function CockpitCraftsmanship() {
  const [interiorTheme, setInteriorTheme] = useState('black');

  const themes = {
    black: {
      name: 'Black Leather & Chalk Stitching',
      desc: 'Supple full-grain semi-aniline leather complemented by double-needle chalk embroidery and matte carbon fibre inlays.',
      accent: 'border-white/20 bg-zinc-900',
      pillColor: '#f5f5f7',
    },
    cognac: {
      name: 'Cognac Club Heritage Leather',
      desc: 'Historically inspired natural vegetable-tanned club leather that develops an exquisite bespoke patina over decades of ownership.',
      accent: 'border-amber-600/40 bg-amber-950/40',
      pillColor: '#b45309',
    },
    bordeaux: {
      name: 'Bordeaux Red & Black Bi-Color',
      desc: 'Striking contrast palette celebrating Porsche motorsport heritage with crimson door cards and perforated seat ventilation centers.',
      accent: 'border-red-600/40 bg-red-950/40',
      pillColor: '#991b1b',
    },
  };

  return (
    <section id="cockpit" className="py-28 md:py-36 bg-[#050507] text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-amber-400 uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Driver-Centric Ergonomics</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight"
          >
            Cockpit. Where human and machine fuse.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed"
          >
            Inspired by the clean horizontal architecture of the 1970s 911, reimagined with high-definition digital interfaces and obsessive tactile feedback.
          </motion.p>
        </div>

        {/* Interior Feature Spotlight Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: 18-Way Adaptive Seats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                18-Way Adaptive Sport Seats Plus
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Electric adjustment of backrest angle, seat height, squab angle, and lateral bolsters for both the seat cushion and backrest. Integrated memory stores individual pilot profiles.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-amber-400">
              PNEUMATIC ADJUSTABLE SIDE BOLSTERS
            </div>
          </motion.div>

          {/* Card 2: Burmester 3D Surround */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Burmester® High-End 3D Sound
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                21 individually controlled loudspeakers including an active subwoofer with 400W class-D amplifier. Ribbon tweeters (AMT) deliver pristine acoustic clarity even at 7,000 RPM.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-amber-400">
              855 TOTAL SYSTEM WATTAGE
            </div>
          </motion.div>

          {/* Card 3: Digital Instrument Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Curved 12.6-Inch Digital Cockpit
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Fully customizable digital instrument cluster displaying G-force meters, lap timers, tire thermal degradation maps, and night vision infrared telemetry.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-amber-400">
              TRACK PRECISION TELEMETRY SYNC
            </div>
          </motion.div>

        </div>

        {/* Interactive Upholstery Selector */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1 block">
                Exclusive Manufaktur Palette
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Bespoke Leather Craftsmanship
              </h3>
            </div>

            {/* Swatches */}
            <div className="flex items-center gap-3">
              {[
                { id: 'black', label: 'Black', bg: 'bg-zinc-900 border-zinc-700' },
                { id: 'cognac', label: 'Cognac', bg: 'bg-amber-800 border-amber-600' },
                { id: 'bordeaux', label: 'Bordeaux', bg: 'bg-red-900 border-red-700' },
              ].map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => setInteriorTheme(swatch.id)}
                  className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${swatch.bg} ${
                    interiorTheme === swatch.id
                      ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-black'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  title={swatch.label}
                >
                  {interiorTheme === swatch.id && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-lg font-bold text-white">{themes[interiorTheme].name}</div>
              <p className="text-sm text-white/60 mt-1 max-w-2xl">{themes[interiorTheme].desc}</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/10 text-xs font-mono text-white shrink-0">
              HAND-STITCHED IN ZUFFENHAUSEN
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
