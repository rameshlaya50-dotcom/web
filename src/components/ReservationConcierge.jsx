import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Award, Calendar, Truck, User, Mail, Phone, Sparkles, X, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReservationConcierge({ configuredPrice = 245000, configuredTrim = 'Turbo S Heritage' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    delivery: 'factory',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationId, setReservationId] = useState('');

  const deliveryOptions = [
    { id: 'enclosed', name: 'White-Glove Enclosed Carrier', sub: 'Direct climate-controlled delivery to your residence' },
    { id: 'pec_atl', name: 'Porsche Experience Center (Atlanta)', sub: 'Track handover session & master instructor coaching' },
    { id: 'factory', name: 'Factory Collection (Zuffenhausen)', sub: 'VIP factory tour, gourmet lunch & autobahn shakedown' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Generate exclusive allocation ID
    const randomId = `PO-992-${Math.floor(1000 + Math.random() * 9000)}-TS`;
    setReservationId(randomId);
    setIsSubmitted(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#eab308', '#ffffff', '#0071e3', '#10b981'],
      });
    } catch (err) {}
  };

  return (
    <section id="reserve" className="py-28 md:py-36 bg-[#050507] text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 uppercase tracking-widest mb-6"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Exclusive Production Allocation</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
            Secure your build slot.
          </h2>

          <p className="text-base md:text-xl text-white/60 leading-relaxed">
            Strictly limited production runs guarantee exclusivity. Request direct VIP allocation priority with Porsche Private Client Concierge.
          </p>
        </div>

        {/* Live Slot Status Pill */}
        <div className="max-w-2xl mx-auto mb-12 p-4 rounded-2xl glass-panel border border-emerald-500/30 flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-white font-mono">Q4 2026 Production Window Open</span>
          </div>
          <span className="font-mono text-emerald-400 font-bold">3 of 12 US Slots Remaining</span>
        </div>

        {/* Reservation Form Card */}
        <div className="max-w-3xl mx-auto glass-panel rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Selected Vehicle Badge */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex justify-between items-center text-xs md:text-sm">
              <div>
                <span className="text-white/40 font-mono text-xs block">VEHICLE ASSIGNMENT</span>
                <span className="font-bold text-white">Porsche 911 Turbo S • {configuredTrim}</span>
              </div>
              <div className="text-right">
                <span className="text-white/40 font-mono text-xs block">ESTIMATED MSRP</span>
                <span className="font-mono font-bold text-amber-400">${configuredPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-white/50 uppercase mb-2">
                  Full Name / Legal Entity
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Alexander Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/50 uppercase mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="vance@private.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-white/50 uppercase mb-2">
                Mobile Telephone (For Secure SMS Verification)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Delivery Choice */}
            <div>
              <label className="block text-xs font-mono text-white/50 uppercase mb-3">
                Preferred Handover Experience
              </label>
              <div className="space-y-3">
                {deliveryOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, delivery: opt.id })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                      formData.delivery === opt.id
                        ? 'bg-white/10 border-amber-400'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full mt-0.5 border flex items-center justify-center ${
                        formData.delivery === opt.id
                          ? 'border-amber-400 bg-amber-400'
                          : 'border-white/30'
                      }`}
                    >
                      {formData.delivery === opt.id && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{opt.name}</div>
                      <div className="text-xs text-white/50 mt-0.5">{opt.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:scale-[1.01] cursor-pointer"
            >
              Request Allocation Slot
            </button>

            <p className="text-[11px] font-mono text-center text-white/40">
              Zero obligation deposit. A dedicated Porsche VIP Concierge will reach out within 2 hours.
            </p>
          </form>
        </div>

      </div>

      {/* Allocation Certificate Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-lg w-full bg-[#0d0d11] rounded-3xl p-8 border border-amber-400/50 shadow-[0_0_60px_rgba(251,191,36,0.25)] relative text-center"
            >
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/40 mx-auto flex items-center justify-center text-amber-400 mb-6">
                <Sparkles className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-1 block">
                ALLOCATION CONFIRMED
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                Order Protocol Initialized
              </h3>
              <p className="text-sm text-white/60 mb-6">
                Congratulations, {formData.name}. Your commission request has been queued at Dr. Ing. h.c. F. Porsche AG.
              </p>

              {/* Certificate Box */}
              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-left font-mono text-xs space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/40">COMMISSION ID:</span>
                  <span className="text-amber-400 font-bold">{reservationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">VEHICLE:</span>
                  <span className="text-white">Porsche 911 Turbo S</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">ALLOCATION SLOT:</span>
                  <span className="text-emerald-400">#088 (Q4 2026 Batch)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">CONFIGURED TOTAL:</span>
                  <span className="text-white font-bold">${configuredPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-white/90 transition-all cursor-pointer"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
