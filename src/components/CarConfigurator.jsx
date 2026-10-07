import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Shield, Tag, ChevronRight, SlidersHorizontal } from 'lucide-react';

export default function CarConfigurator({ onConfigureChange, onProceedToReserve }) {
  // Selected configuration state
  const [selectedTrim, setSelectedTrim] = useState('heritage');
  const [selectedColor, setSelectedColor] = useState('silver');
  const [selectedWheels, setSelectedWheels] = useState('standard');
  const [selectedOptions, setSelectedOptions] = useState({
    lift: true,
    pdcc: true,
    burmester: true,
    blackBrakes: false,
  });

  const trims = {
    heritage: {
      id: 'heritage',
      name: 'Turbo S Heritage',
      price: 230400,
      description: 'The definitive benchmark. Everyday grand touring luxury fused with 640 HP track supremacy.',
      badge: 'Quintessential Icon',
    },
    lightweight: {
      id: 'lightweight',
      name: 'Turbo S Lightweight Pack',
      price: 245600,
      description: '66-pound weight reduction. Full carbon bucket seats, lightweight glass, reduced acoustic insulation.',
      badge: 'Track Focused',
    },
    manufaktur: {
      id: 'manufaktur',
      name: 'Exclusive Manufaktur',
      price: 278900,
      description: 'Hand-finished in Zuffenhausen. Bespoke dual-tone leather, illuminated carbon sills, personalized plaques.',
      badge: 'Bespoke Atelier',
    },
  };

  const colors = [
    { id: 'silver', name: 'GT Silver Metallic', price: 0, hex: '#c5c7cb', border: 'border-zinc-400' },
    { id: 'shark', name: 'Shark Blue', price: 3270, hex: '#0059b3', border: 'border-blue-600' },
    { id: 'guards', name: 'Guards Red', price: 3270, hex: '#c8102e', border: 'border-red-600' },
    { id: 'chalk', name: 'Chalk / Crayon', price: 3270, hex: '#d2d1cb', border: 'border-stone-300' },
    { id: 'python', name: 'Python Green', price: 3270, hex: '#228b22', border: 'border-green-600' },
    { id: 'pts', name: 'Paint to Sample (Bespoke)', price: 14750, hex: 'linear-gradient(135deg, #a855f7, #3b82f6)', border: 'border-purple-500' },
  ];

  const wheels = [
    { id: 'standard', name: '20/21" 911 Turbo S Wheels', price: 0, desc: 'Forged alloy with central locking nut in silver/black finish' },
    { id: 'aeroblades', name: 'Exclusive Design Carbon Aeroblades', price: 4230, desc: 'Carbon fiber blade inlays reducing rotational aerodynamic turbulence' },
    { id: 'sportclassic', name: 'Sport Classic Center-Lock', price: 3850, desc: 'Five-spoke historical design homage in high-gloss black with diamond-cut rim' },
  ];

  const optionalPackages = [
    { id: 'lift', name: 'Front Axle Hydraulic Lift System', price: 2770, desc: 'Raises front lip by 40mm at speeds up to 35 km/h to clear inclines and ramps' },
    { id: 'pdcc', name: 'Porsche Dynamic Chassis Control (PDCC)', price: 3170, desc: 'Active 48V electromechanical anti-roll system for zero-lean cornering' },
    { id: 'burmester', name: 'Burmester® 3D High-End Surround Sound', price: 3980, desc: '21 speakers, 855 watts, active subwoofer, AMT ribbon tweeters' },
    { id: 'blackBrakes', name: 'PCCB Calipers in High Gloss Black', price: 900, desc: 'Custom painted ceramic calipers replacing signature yellow' },
  ];

  // Calculate live total price
  const basePrice = trims[selectedTrim].price;
  const colorPrice = colors.find((c) => c.id === selectedColor)?.price || 0;
  const wheelPrice = wheels.find((w) => w.id === selectedWheels)?.price || 0;
  const optionsPrice = Object.entries(selectedOptions).reduce((acc, [key, isSelected]) => {
    if (!isSelected) return acc;
    const pkg = optionalPackages.find((p) => p.id === key);
    return acc + (pkg ? pkg.price : 0);
  }, 0);
  const destinationFee = 1650;
  const totalPrice = basePrice + colorPrice + wheelPrice + optionsPrice + destinationFee;

  const toggleOption = (id) => {
    setSelectedOptions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="configurator" className="py-28 md:py-36 bg-[#050507] text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 uppercase tracking-widest mb-6"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Interactive Bespoke Atelier & Pricing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight"
          >
            Commission your Turbo S.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-white/60 leading-relaxed"
          >
            Crafted to your exact specifications. Every tier, paint option, and mechanical package recalculates with real-time transparent pricing.
          </motion.p>
        </div>

        {/* 1. Trim Selection Cards (Apple-grade) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {Object.values(trims).map((trim) => {
            const isSelected = selectedTrim === trim.id;
            return (
              <div
                key={trim.id}
                onClick={() => setSelectedTrim(trim.id)}
                className={`cursor-pointer rounded-3xl p-8 border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/[0.08] border-amber-400/80 shadow-[0_0_35px_rgba(251,191,36,0.15)] ring-1 ring-amber-400/50'
                    : 'glass-panel border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-amber-300">
                      {trim.badge}
                    </span>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-black">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{trim.name}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    {trim.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-baseline justify-between">
                  <span className="text-xs font-mono text-white/40 uppercase">Starting MSRP</span>
                  <span className="text-2xl font-black font-mono text-white">
                    ${trim.price.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Color & Wheel Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Exterior Finish Selection (7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1 block">
                EXTERIOR FINISH
              </span>
              <h3 className="text-2xl font-bold text-white">
                {colors.find((c) => c.id === selectedColor)?.name}
              </h3>
              <span className="text-sm font-mono text-white/50">
                {colors.find((c) => c.id === selectedColor)?.price === 0
                  ? 'Standard Heritage Finish (Included)'
                  : `+ $${colors.find((c) => c.id === selectedColor)?.price.toLocaleString()}`}
              </span>
            </div>

            {/* Color Swatches */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-10">
              {colors.map((color) => {
                const isSelected = selectedColor === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl border-2 transition-all flex items-center justify-center ${color.border} ${
                        isSelected
                          ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-black'
                          : 'opacity-80 hover:opacity-100 group-hover:scale-105'
                      }`}
                      style={{
                        background: color.hex,
                      }}
                    >
                      {isSelected && <Check className="w-5 h-5 text-white drop-shadow-md" />}
                    </div>
                    <span className="text-[11px] font-mono text-white/60 text-center line-clamp-1">
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Wheel Options */}
            <div className="pt-8 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-3 block">
                FORGED WHEEL ARCHITECTURE
              </span>
              <div className="space-y-3">
                {wheels.map((wheel) => {
                  const isSelected = selectedWheels === wheel.id;
                  return (
                    <div
                      key={wheel.id}
                      onClick={() => setSelectedWheels(wheel.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-white/10 border-amber-400/80 shadow-md'
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="pr-4">
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          {wheel.name}
                          {isSelected && <span className="text-amber-400 text-xs">● Active</span>}
                        </div>
                        <div className="text-xs text-white/50 mt-0.5">{wheel.desc}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold font-mono text-white">
                          {wheel.price === 0 ? 'Included' : `+$${wheel.price.toLocaleString()}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Mechanical & Technology Packages (5 Cols) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-8 md:p-12 border border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1 block">
              OPTIONAL PERFORMANCE HARDWARE
            </span>
            <h3 className="text-2xl font-bold text-white mb-6">Equipment Matrix</h3>

            <div className="space-y-4 mb-8">
              {optionalPackages.map((pkg) => {
                const isSelected = selectedOptions[pkg.id];
                return (
                  <div
                    key={pkg.id}
                    onClick={() => toggleOption(pkg.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-white/10 border-amber-400/70 shadow-sm'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg mt-0.5 flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-amber-400 text-black' : 'border border-white/20 bg-black/40'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-white">{pkg.name}</span>
                        <span className="text-xs font-mono font-bold text-amber-300">
                          +${pkg.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 mt-1 leading-relaxed">{pkg.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Apple style summary assurance */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3 text-xs text-white/60">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Includes 4-Year / 50,000-Mile Factory Warranty & 24/7 Roadside Assistance</span>
            </div>
          </div>

        </div>

        {/* 3. Live Price Calculation Banner (Grand Apple-style bar) */}
        <motion.div
          layout
          className="glass-panel rounded-3xl p-8 md:p-12 border border-amber-400/40 relative overflow-hidden shadow-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Price Breakdown Details (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <Tag className="w-3.5 h-3.5" />
                <span>Bespoke Commission Summary</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white">
                Porsche 911 Turbo S • {trims[selectedTrim].name}
              </h3>

              {/* Price Line Items */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 font-mono text-xs">
                <div>
                  <div className="text-white/40">BASE MSRP</div>
                  <div className="text-white font-bold">${basePrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-white/40">COLOR & WHEELS</div>
                  <div className="text-white font-bold">${(colorPrice + wheelPrice).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-white/40">OPTIONS TOTAL</div>
                  <div className="text-white font-bold">${optionsPrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-white/40">DESTINATION</div>
                  <div className="text-white font-bold">${destinationFee.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Grand Total & Reserve Button (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
              <div className="text-xs font-mono text-white/50 uppercase">TOTAL VEHICLE MSRP</div>
              <div className="text-4xl md:text-5xl font-black font-mono text-amber-400 tracking-tight">
                ${totalPrice.toLocaleString()}
              </div>
              <p className="text-[11px] font-mono text-white/40">
                Taxes, registration, and local dealer fees excluded
              </p>

              <button
                onClick={() => onProceedToReserve(totalPrice, trims[selectedTrim].name)}
                className="mt-2 w-full lg:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Allocation</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
