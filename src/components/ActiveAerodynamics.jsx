import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wind, Shield, Gauge, Zap, Compass } from 'lucide-react';

export default function ActiveAerodynamics() {
  const [activeAeroMode, setActiveAeroMode] = useState('performance');

  const aeroModes = {
    speed: {
      name: 'Speed Position',
      tagline: 'Lowest Aerodynamic Resistance',
      cd: '0.33 Cd',
      downforce: '45 kg @ 250 km/h',
      wingAngle: '3° Retracted',
      frontLip: 'Stowed Flush',
      coolingFlaps: 'Closed (Low Drag)',
      purpose: 'Engineered for sustained autobahn cruising and reaching the maximum track velocity of 205 mph.',
    },
    performance: {
      name: 'Sport Plus Position',
      tagline: 'Balanced High-Downforce Profile',
      cd: '0.38 Cd',
      downforce: '170 kg @ 250 km/h',
      wingAngle: '15° Extended',
      frontLip: 'Pneumatically Deployed',
      coolingFlaps: 'Variable Dynamic',
      purpose: 'Active front spoiler and extended rear wing create balanced downforce across both axles for peak cornering grip.',
    },
    airbrake: {
      name: 'Airbrake Position',
      tagline: 'Emergency High-Speed Deceleration',
      cd: '0.44 Cd',
      downforce: '390 kg @ 250 km/h',
      wingAngle: '27° High Angle of Attack',
      frontLip: 'Maximum Extension',
      coolingFlaps: 'Fully Open (Thermal Dissipation)',
      purpose: 'Rapidly shifts aerodynamic balance rearward during heavy braking from high speeds, drastically shortening stopping distances.',
    },
  };

  const currentMode = aeroModes[activeAeroMode];

  return (
    <section id="aerodynamics" className="py-28 md:py-36 bg-[#070709] text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-6"
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Porsche Active Aerodynamics (PAA)</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
          >
            The wind bends to its will.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-white/60 leading-relaxed"
          >
            Aerodynamic active elements adapt within milliseconds to vehicle velocity and driving dynamics, transforming between hyper-slippery efficiency and crushing track downforce.
          </motion.p>
        </div>

        {/* Interactive Mode Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/10">
            {['speed', 'performance', 'airbrake'].map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveAeroMode(mode)}
                className={`relative px-6 py-3 rounded-xl text-xs md:text-sm font-semibold tracking-wider uppercase transition-all ${
                  activeAeroMode === mode ? 'text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                {activeAeroMode === mode && (
                  <motion.div
                    layoutId="aeroPill"
                    className="absolute inset-0 bg-white rounded-xl shadow-lg"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{mode}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Visualizer & Metric Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Wing / Aerodynamic Schematic Visualizer (7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            {/* Streamline Animation Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: ['-100%', '200%'],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: activeAeroMode === 'speed' ? 1.5 : activeAeroMode === 'performance' ? 2.2 : 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'linear',
                  }}
                  className="h-[1px] bg-cyan-400 w-96 absolute"
                  style={{ top: `${20 + i * 14}%` }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                AERODYNAMIC PROFILE
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {currentMode.name}
              </h3>
              <p className="text-sm font-mono text-white/50 mb-6">{currentMode.tagline}</p>
              <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8">
                {currentMode.purpose}
              </p>

              {/* Dynamic Schematics Indicator */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div className="text-xs text-white/40 font-mono uppercase mb-1">Rear Wing</div>
                  <div className="text-base md:text-lg font-bold font-mono text-cyan-300">
                    {currentMode.wingAngle}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div className="text-xs text-white/40 font-mono uppercase mb-1">Front Spoiler</div>
                  <div className="text-base md:text-lg font-bold font-mono text-cyan-300">
                    {currentMode.frontLip}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 col-span-2 md:col-span-1">
                  <div className="text-xs text-white/40 font-mono uppercase mb-1">Air Flaps</div>
                  <div className="text-base md:text-lg font-bold font-mono text-cyan-300">
                    {currentMode.coolingFlaps}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Metrics Dial & Comparison (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase">AERO DOWNFORCE</div>
                  <div className="text-3xl md:text-4xl font-black font-mono text-white">
                    {currentMode.downforce}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Gauge className="w-6 h-6" />
                </div>
              </div>

              {/* Downforce Visual Fill */}
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10 mb-6">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  initial={false}
                  animate={{
                    width:
                      activeAeroMode === 'speed'
                        ? '20%'
                        : activeAeroMode === 'performance'
                        ? '65%'
                        : '100%',
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase">DRAG COEFFICIENT</div>
                  <div className="text-2xl font-bold font-mono text-white">{currentMode.cd}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase">ACTIVE PNEUMATICS</div>
                  <div className="text-sm font-mono text-emerald-400">Response &lt; 0.4s</div>
                </div>
              </div>
            </div>

            {/* Apple style takeaway note */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                <Compass className="w-4 h-4" />
              </div>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                When lateral acceleration exceeds 0.8g in wet mode, the rear wing deploys automatically to prevent hydroplaning and stabilize the chassis.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
