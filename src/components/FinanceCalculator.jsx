import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CreditCard, DollarSign, Calendar, Percent, ShieldCheck } from 'lucide-react';

export default function FinanceCalculator({ currentMsrp = 245000 }) {
  const [method, setMethod] = useState('lease'); // 'lease' | 'finance' | 'cash'
  const [downPayment, setDownPayment] = useState(40000);
  const [termMonths, setTermMonths] = useState(36);
  const [apr, setApr] = useState(5.9);

  // Calculation logic
  const calculatePayment = () => {
    if (method === 'cash') {
      return { monthly: 0, total: currentMsrp };
    }

    if (method === 'finance') {
      const principal = Math.max(0, currentMsrp - downPayment);
      const monthlyRate = (apr / 100) / 12;
      if (monthlyRate === 0) return { monthly: Math.round(principal / termMonths), total: currentMsrp };
      const monthly =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
        (Math.pow(1 + monthlyRate, termMonths) - 1);
      return {
        monthly: Math.round(monthly),
        total: Math.round(monthly * termMonths + downPayment),
      };
    }

    if (method === 'lease') {
      // Estimated 3-year residual value for Turbo S is approx 58%
      const residualValue = currentMsrp * 0.58;
      const depreciation = (currentMsrp - residualValue - downPayment) / termMonths;
      const moneyFactor = (apr / 100) / 24;
      const rentCharge = (currentMsrp + residualValue) * moneyFactor;
      const monthly = Math.max(0, depreciation + rentCharge);
      return {
        monthly: Math.round(monthly),
        total: Math.round(monthly * termMonths + downPayment),
      };
    }

    return { monthly: 0, total: currentMsrp };
  };

  const { monthly, total } = calculatePayment();

  return (
    <section className="py-24 bg-[#070709] text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-6"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Porsche Financial Services</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Bespoke Acquisition Architecture.
          </h2>

          <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-2xl">
            Model your acquisition with flexible lease structures, structured bespoke financing, or direct private capital transfer.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
          
          {/* Method Selector */}
          <div className="flex justify-center mb-10">
            <div className="flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-full sm:w-auto">
              {[
                { id: 'lease', label: 'Premier Lease' },
                { id: 'finance', label: 'Retail Financing' },
                { id: 'cash', label: 'Direct Outright' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs md:text-sm font-semibold tracking-wide transition-all ${
                    method === m.id ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {method !== 'cash' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Sliders (Left) */}
              <div className="space-y-6">
                {/* Down Payment Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-white/50">INITIAL CAPITAL DOWN</span>
                    <span className="text-white font-bold text-sm">
                      ${downPayment.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="100000"
                    step="5000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                    <span>$10,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Term Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-white/50">DURATION TERM</span>
                    <span className="text-white font-bold text-sm">{termMonths} Months</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[24, 36, 48, 60].map((term) => (
                      <button
                        key={term}
                        onClick={() => setTermMonths(term)}
                        className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                          termMonths === term
                            ? 'bg-amber-400 text-black border-amber-400'
                            : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {term} Mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* APR Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-white/50">ESTIMATED APR / TIER 1</span>
                    <span className="text-white font-bold text-sm">{apr}%</span>
                  </div>
                  <input
                    type="range"
                    min="3.9"
                    max="8.9"
                    step="0.2"
                    value={apr}
                    onChange={(e) => setApr(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                </div>
              </div>

              {/* Monthly Payment Output (Right) */}
              <div className="bg-black/50 rounded-2xl p-8 border border-white/10 flex flex-col items-center text-center justify-between h-full">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2">
                    ESTIMATED MONTHLY INVESTMENT
                  </span>
                  <div className="text-4xl md:text-5xl font-black font-mono text-white mb-2 tracking-tight">
                    ${monthly.toLocaleString()}
                    <span className="text-sm font-normal text-white/40 font-sans"> / mo</span>
                  </div>
                  <div className="text-xs font-mono text-white/40">
                    Based on ${currentMsrp.toLocaleString()} configured MSRP
                  </div>
                </div>

                <div className="w-full pt-6 mt-6 border-t border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-white/60">
                    <span>Due at Signing:</span>
                    <span className="text-white font-bold">${downPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Estimated Total Outlay:</span>
                    <span className="text-white font-bold">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Residual Guarantee:</span>
                    <span className="text-emerald-400 font-bold">Guaranteed by Porsche</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Cash acquisition state */
            <div className="bg-black/50 rounded-2xl p-8 md:p-12 border border-white/10 text-center max-w-xl mx-auto">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
                DIRECT OUTRIGHT ACQUISITION
              </span>
              <div className="text-4xl md:text-5xl font-black font-mono text-white mb-4">
                ${currentMsrp.toLocaleString()}
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Wire transfer or certified funds upon final pre-delivery factory inspection. Full title transfer immediately upon handover.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero financing fees • Direct Zuffenhausen certificate</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
