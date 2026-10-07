import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Trophy, Activity, Zap, Compass, Flag } from 'lucide-react';

export default function PerformanceTelemetry() {
  const [gPos, setGPos] = useState({ x: 0, y: 0 });

  const benchmarkCars = [
    { name: 'Porsche 911 Turbo S', time: 2.6, hp: 640, top: 205, highlight: true },
    { name: 'Ferrari Roma', time: 3.4, hp: 612, top: 199, highlight: false },
    { name: 'Aston Martin DB12', time: 3.5, hp: 671, top: 202, highlight: false },
    { name: 'McLaren GT', time: 3.1, hp: 612, top: 203, highlight: false },
  ];

  return (
    <section id="telemetry" className="py-28 md:py-36 bg-[#070709] text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 uppercase tracking-widest mb-6"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Telemetry & Benchmark Dominance</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
          >
            Unforgiving physics. Undeniable numbers.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-white/60 leading-relaxed"
          >
            In motorsport, tenths of a second are an eternity. The 911 Turbo S operates in an empirical realm beyond standard supercar metrics.
          </motion.p>
        </div>

        {/* 4 Big Numbers (Apple style) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {[
            { val: '2.6s', label: '0 – 60 MPH', sub: 'With Launch Control Sport Plus' },
            { val: '10.1s', label: '1/4 MILE', sub: '@ 137.2 MPH Trap Speed' },
            { val: '1.12 g', label: 'LATERAL GRIP', sub: 'On Michelin Pilot Sport Cup 2' },
            { val: '7:17.5', label: 'NÜRBURGRING', sub: 'Nordschleife Verified Lap Time' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 text-center flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl md:text-5xl font-black font-mono text-white mb-2 tracking-tight">
                  {stat.val}
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-amber-400 mb-1">
                  {stat.label}
                </div>
              </div>
              <div className="text-[11px] text-white/40 font-mono mt-4 pt-4 border-t border-white/5">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Supercar Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left: 0-60 Comparison Bars (7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                  ACCELERATION COMPARISON
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">0 - 60 MPH SPRINT (SECONDS)</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">LOWER IS FASTER</span>
            </div>

            <div className="flex flex-col gap-6">
              {benchmarkCars.map((car) => (
                <div key={car.name}>
                  <div className="flex justify-between items-center text-xs md:text-sm mb-2">
                    <span className={`font-semibold ${car.highlight ? 'text-amber-400' : 'text-white/70'}`}>
                      {car.name} {car.highlight && '👑'}
                    </span>
                    <span className="font-mono font-bold text-white">{car.time}s</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(1 - (car.time - 2.5) / 1.5) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        car.highlight
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                          : 'bg-white/20'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive G-Force Telemetry Sensor (5 Cols) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-8 md:p-12 border border-white/10 flex flex-col items-center text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              DYNAMIC G-METER
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Lateral Acceleration</h3>
            <p className="text-xs text-white/50 mb-6">
              Move cursor over pad to test simulated chassis vectoring.
            </p>

            {/* Circular G-Force Ring */}
            <div
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                setGPos({ x: Math.min(1, Math.max(-1, x)), y: Math.min(1, Math.max(-1, y)) });
              }}
              onMouseLeave={() => setGPos({ x: 0, y: 0 })}
              className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-white/20 relative flex items-center justify-center cursor-crosshair bg-black/60 shadow-inner group"
            >
              {/* Concentric rings */}
              <div className="absolute w-3/4 h-3/4 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute w-1/2 h-1/2 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute w-full h-[1px] bg-white/10 pointer-events-none" />
              <div className="absolute h-full w-[1px] bg-white/10 pointer-events-none" />

              {/* Dynamic G Dot */}
              <motion.div
                animate={{
                  x: gPos.x * 70,
                  y: gPos.y * 70,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-5 h-5 rounded-full bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)] border-2 border-white pointer-events-none"
              />

              {/* Axis labels */}
              <span className="absolute top-2 text-[10px] font-mono text-white/40">+1.2G ACCEL</span>
              <span className="absolute bottom-2 text-[10px] font-mono text-white/40">-1.4G BRAKE</span>
              <span className="absolute left-2 text-[10px] font-mono text-white/40">1.12G L</span>
              <span className="absolute right-2 text-[10px] font-mono text-white/40">1.12G R</span>
            </div>

            <div className="mt-6 flex items-center gap-6 font-mono text-xs">
              <div>
                <span className="text-white/40">LATERAL: </span>
                <span className="text-amber-400 font-bold">
                  {(Math.abs(gPos.x) * 1.12).toFixed(2)} G
                </span>
              </div>
              <div>
                <span className="text-white/40">LONG: </span>
                <span className="text-amber-400 font-bold">
                  {(Math.abs(gPos.y) * 1.35).toFixed(2)} G
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
