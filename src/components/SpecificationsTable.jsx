import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown } from 'lucide-react';

export default function SpecificationsTable() {
  const [openCategory, setOpenCategory] = useState('powertrain');

  const categories = [
    {
      id: 'powertrain',
      name: 'Powertrain & Performance',
      specs: [
        { label: 'Engine Configuration', val: 'Rear-mounted 3.8-liter Twin-Turbo Flat-Six' },
        { label: 'Displacement', val: '3,745 cm³ (228.5 cu in)' },
        { label: 'Bore x Stroke', val: '102.0 mm x 76.4 mm' },
        { label: 'Maximum Power', val: '640 HP (478 kW) @ 6,750 RPM' },
        { label: 'Maximum Torque', val: '590 lb-ft (800 Nm) @ 2,500 – 4,000 RPM' },
        { label: 'Maximum Engine Speed', val: '7,200 RPM' },
        { label: '0 – 60 mph', val: '2.6 seconds (Sport Chrono Package)' },
        { label: '0 – 100 mph', val: '5.8 seconds' },
        { label: '0 – 124 mph (200 km/h)', val: '8.9 seconds' },
        { label: 'Top Track Speed', val: '205 mph (330 km/h) on summer performance tires' },
      ],
    },
    {
      id: 'chassis',
      name: 'Transmission, Chassis & Brakes',
      specs: [
        { label: 'Drivetrain', val: 'Porsche Traction Management (PTM) Active AWD' },
        { label: 'Transmission', val: '8-Speed Porsche Doppelkupplung (PDK) with paddle shifters' },
        { label: 'Front Suspension', val: 'MacPherson strut with anti-roll bar and helper springs' },
        { label: 'Rear Suspension', val: 'Multi-link LSA axle with active rear-axle steering' },
        { label: 'Damping System', val: 'Porsche Active Suspension Management (PASM Sport, -10mm)' },
        { label: 'Chassis Control', val: 'Porsche Dynamic Chassis Control (PDCC) 48V Active' },
        { label: 'Front Brakes', val: 'PCCB 420 mm cross-drilled ceramic discs, 10-piston calipers' },
        { label: 'Rear Brakes', val: 'PCCB 390 mm cross-drilled ceramic discs, 4-piston calipers' },
        { label: 'Front Wheels & Tires', val: '9.5 J x 20 ET 44 with 255/35 ZR 20 tires' },
        { label: 'Rear Wheels & Tires', val: '12 J x 21 ET 70 with 315/30 ZR 21 tires' },
      ],
    },
    {
      id: 'dimensions',
      name: 'Dimensions, Weights & Capacities',
      specs: [
        { label: 'Length', val: '4,535 mm (178.5 in)' },
        { label: 'Width (Mirrors Folded)', val: '1,900 mm (74.8 in)' },
        { label: 'Width (Mirrors Extended)', val: '2,024 mm (79.7 in)' },
        { label: 'Height', val: '1,303 mm (51.3 in)' },
        { label: 'Wheelbase', val: '2,450 mm (96.5 in)' },
        { label: 'Curb Weight (DIN)', val: '1,640 kg (3,616 lbs)' },
        { label: 'Weight Distribution', val: '38% Front / 62% Rear' },
        { label: 'Fuel Tank Capacity', val: '67 liters (17.7 US gal)' },
        { label: 'Luggage Compartment Volume (Front)', val: '128 liters (4.5 cu ft)' },
        { label: 'Drag Coefficient', val: '0.33 Cd (Speed Configuration)' },
      ],
    },
  ];

  return (
    <section className="py-24 bg-[#050507] text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-white/70 uppercase tracking-widest mb-6">
            <FileText className="w-3.5 h-3.5" />
            <span>Complete Technical Specifications</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Technical Ledger.
          </h2>

          <p className="text-base text-white/60 leading-relaxed">
            Every tolerance, gear ratio, and thermodynamic coefficient verified according to DIN EN ISO standards.
          </p>
        </div>

        {/* Accordion Categories */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const isOpen = openCategory === cat.id;
            return (
              <div
                key={cat.id}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenCategory(isOpen ? '' : cat.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <span className="text-lg md:text-xl font-bold text-white">{cat.name}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/50 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-6 divide-y divide-white/5">
                        {cat.specs.map((item) => (
                          <div
                            key={item.label}
                            className="py-3 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-xs md:text-sm gap-1"
                          >
                            <span className="text-white/50 font-mono">{item.label}</span>
                            <span className="text-white font-bold font-mono text-right">
                              {item.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
