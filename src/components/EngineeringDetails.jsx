import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Disc, Zap, Activity, Wind, Layers, ArrowUpRight } from 'lucide-react';
import EngineAudio from './EngineAudio';

export default function EngineeringDetails() {
  const [activeTab, setActiveTab] = useState('engine');

  const engineeringModules = {
    engine: {
      title: '3.8L Twin-Turbo Boxer 6',
      subtitle: 'Variable Turbine Geometry (VTG)',
      description:
        'Featuring redesigned charge-air cooling and piezo injectors. Two symmetrical variable turbine geometry turbochargers with electrically adjustable wastegate valves deliver 640 hp and 590 lb-ft of torque across a broad rev band.',
      specs: [
        { label: 'Displacement', val: '3,745 cc' },
        { label: 'Max Power', val: '640 HP @ 6,750 RPM' },
        { label: 'Max Torque', val: '590 lb-ft @ 2,500-4,000 RPM' },
        { label: 'Compression Ratio', val: '8.7 : 1' },
      ],
      highlight: '0.2s faster throttle response than preceding generation',
    },
    transmission: {
      title: '8-Speed Porsche Doppelkupplung (PDK)',
      subtitle: 'Lightning-Fast Dual Clutch Shifting',
      description:
        'Engineered specifically to handle the tremendous 590 lb-ft torque output. Shifting occurs in mere milliseconds without the slightest interruption in tractive power. 8th gear acts as an overdrive for high-speed grand touring efficiency.',
      specs: [
        { label: 'Shift Latency', val: '< 100 ms' },
        { label: 'Gears', val: '8 Forward / 1 Reverse' },
        { label: 'Final Drive Ratio', val: '3.44 : 1' },
        { label: 'AWD System', val: 'PTM Electro-Hydraulic' },
      ],
      highlight: 'Water-cooled front axle differential for maximum thermal stability',
    },
    brakes: {
      title: 'Porsche Ceramic Composite Brakes (PCCB)',
      subtitle: '10-Piston Monobloc Front Calipers',
      description:
        'Perforated ceramic composite brake discs measuring 420mm at the front and 390mm at the rear. Approximately 50% lighter than standard cast iron discs, drastically reducing unsprung mass for sharper turn-in dynamics.',
      specs: [
        { label: 'Front Discs', val: '420 mm Carbon Ceramic' },
        { label: 'Rear Discs', val: '390 mm Carbon Ceramic' },
        { label: 'Front Calipers', val: '10-Piston Aluminum' },
        { label: 'Weight Saving', val: '-18.5 kg Unsprung Mass' },
      ],
      highlight: 'Fade-free deceleration even from track speeds exceeding 300 km/h',
    },
    chassis: {
      title: 'PASM Sport & Rear-Axle Steering',
      subtitle: 'Millisecond Dynamic Damping & Active Aero',
      description:
        'Porsche Active Suspension Management (PASM) with sport suspension lowers ride height by 10mm. Rear-axle steering turns opposite the front wheels at low speeds for agility, and parallel at high speeds for rock-solid stability.',
      specs: [
        { label: 'Ride Height Drop', val: '-10 mm' },
        { label: 'Rear Steer Angle', val: 'Up to 2.8°' },
        { label: 'Roll Stabilization', val: 'PDCC Active 48V' },
        { label: 'Torsional Rigidity', val: '39,000 Nm/degree' },
      ],
      highlight: 'Virtual wheelbase extension transforms high-speed lane changes',
    },
  };

  const currentModule = engineeringModules[activeTab];

  return (
    <section id="engineering" className="relative py-28 md:py-36 bg-[#050507] text-white overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-amber-400 uppercase tracking-widest mb-6"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Deep Architectural Breakdown</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.05]"
          >
            Engineering perfected down to the molecule.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed"
          >
            Below the sculpted aluminum body panels resides one of the most sophisticated mechanical arrays in modern motorsport.
          </motion.p>
        </div>

        {/* Interactive Engineering Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-fit mb-12">
          {[
            { id: 'engine', label: 'VTG Powertrain', icon: Zap },
            { id: 'transmission', label: '8-Speed PDK', icon: Cpu },
            { id: 'brakes', label: 'PCCB Brakes', icon: Disc },
            { id: 'chassis', label: 'Active Chassis & PASM', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs md:text-sm font-semibold tracking-wide transition-all ${
                  isActive ? 'text-black shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-white rounded-xl"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Module Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Main Selected Component Detail (7 Cols) */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
          >
            <div className="text-xs font-mono tracking-widest uppercase text-amber-400 font-semibold mb-2">
              {currentModule.subtitle}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {currentModule.title}
            </h3>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              {currentModule.description}
            </p>

            {/* Spec Matrix Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {currentModule.specs.map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5"
                >
                  <div className="text-xs font-mono text-white/40 uppercase mb-1">
                    {item.label}
                  </div>
                  <div className="text-lg md:text-xl font-bold font-mono text-white">
                    {item.val}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs md:text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{currentModule.highlight}</span>
            </div>
          </motion.div>

          {/* Side Telemetry & Audio Tool (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <EngineAudio />

            {/* Bento Mini Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="text-xs font-mono text-white/40 mb-1">ACCELERATION</div>
                <div className="text-3xl font-black font-mono text-white">2.6s</div>
                <div className="text-xs text-white/50 mt-1">0 - 60 MPH (Sport Chrono)</div>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="text-xs font-mono text-white/40 mb-1">QUARTER MILE</div>
                <div className="text-3xl font-black font-mono text-white">10.1s</div>
                <div className="text-xs text-white/50 mt-1">@ 137.2 mph trap speed</div>
              </div>
            </div>
          </div>

        </div>

        {/* Engineering Bento Grid (Apple Mac Pro style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Wind className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Intercooler Air Routing</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Air intakes in the rear quarter panels draw combustion air, while heat exchangers positioned directly above the engine receive cooling flow from the rear decklid.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 text-xs font-mono text-white/40">
              14% GREATER FLOW EFFICIENCY
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">48-Volt Active Anti-Roll</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Porsche Dynamic Chassis Control (PDCC) utilizes electromechanical anti-roll bars to counteract body roll through high-lateral-G transitions in fractions of a second.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 text-xs font-mono text-white/40">
              ZERO MEASURABLE BODY LEAN
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Hybrid Aluminum Chassis</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                The body-in-white combines high-strength hot-formed steel with structural cast aluminum nodes to achieve immense torsional rigidity while shedding dead mass.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 text-xs font-mono text-white/40">
              SAFETY CELL CERTIFIED FIA LEVEL
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
