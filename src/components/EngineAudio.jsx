import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Gauge, Zap } from 'lucide-react';

export default function EngineAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rpm, setRpm] = useState(850);
  const audioCtxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);
  const subOscRef = useRef(null);
  const gainRef = useRef(null);
  const filterRef = useRef(null);

  // Initialize Web Audio API synthesized flat-6 boxer sound
  const toggleSound = () => {
    if (isPlaying) {
      stopEngine();
    } else {
      startEngine();
    }
  };

  const startEngine = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.3);
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      // Low pass filter for throaty exhaust resonance
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(4.0, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Primary cylinder oscillation (Flat-6 pulse)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(42.5, ctx.currentTime); // ~850 RPM / 20
      osc1.connect(filter);
      osc1.start();
      osc1Ref.current = osc1;

      // Secondary harmonic oscillation
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(85, ctx.currentTime);
      osc2.connect(filter);
      osc2.start();
      osc2Ref.current = osc2;

      // Sub-bass rumble
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(28, ctx.currentTime);
      subOsc.connect(filter);
      subOsc.start();
      subOscRef.current = subOsc;

      setIsPlaying(true);
      setRpm(850);
    } catch (e) {
      console.error('Audio initialization error:', e);
    }
  };

  const stopEngine = () => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.2);
      setTimeout(() => {
        try {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          subOscRef.current?.stop();
          audioCtxRef.current?.close();
        } catch (e) {}
        setIsPlaying(false);
        setRpm(0);
      }, 200);
    } else {
      setIsPlaying(false);
      setRpm(0);
    }
  };

  const revThrottle = (targetRpm) => {
    if (!isPlaying || !audioCtxRef.current) return;
    setRpm(targetRpm);
    const ctx = audioCtxRef.current;
    const baseFreq = (targetRpm / 60) * 3; // Flat 6 fires 3 times per rev

    if (osc1Ref.current) {
      osc1Ref.current.frequency.cancelScheduledValues(ctx.currentTime);
      osc1Ref.current.frequency.exponentialRampToValueAtTime(Math.max(20, baseFreq), ctx.currentTime + 0.15);
    }
    if (osc2Ref.current) {
      osc2Ref.current.frequency.cancelScheduledValues(ctx.currentTime);
      osc2Ref.current.frequency.exponentialRampToValueAtTime(Math.max(40, baseFreq * 2), ctx.currentTime + 0.15);
    }
    if (filterRef.current) {
      filterRef.current.frequency.cancelScheduledValues(ctx.currentTime);
      filterRef.current.frequency.linearRampToValueAtTime(300 + (targetRpm / 7200) * 1200, ctx.currentTime + 0.15);
    }
  };

  useEffect(() => {
    return () => {
      stopEngine();
    };
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Acoustic Boxer Telemetry</h4>
            <p className="text-xs text-white/50">Synthesized 3.8L VTG Flat-Six Sound Profile</p>
          </div>
        </div>

        <button
          onClick={toggleSound}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
            isPlaying
              ? 'bg-amber-500 text-black hover:bg-amber-400'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>IGNITION ACTIVE</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              <span>START IGNITION</span>
            </>
          )}
        </button>
      </div>

      {/* Tachometer Display */}
      <div className="bg-black/40 rounded-xl p-4 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-mono uppercase text-white/50 tracking-wider">
            Engine Speed (RPM)
          </span>
          <span className="text-xl font-bold font-mono text-amber-400">
            {rpm.toLocaleString()} <span className="text-xs text-white/40 font-normal">RPM</span>
          </span>
        </div>

        {/* Meter Gauge */}
        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10 relative">
          <div
            className="h-full rounded-full transition-all duration-150 ease-out"
            style={{
              width: `${(rpm / 7200) * 100}%`,
              background:
                rpm > 6500
                  ? 'linear-gradient(90deg, #eab308, #ef4444)'
                  : 'linear-gradient(90deg, #10b981, #eab308)',
            }}
          />
          {/* Redline marker at 7000 */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500"
            style={{ left: `${(7000 / 7200) * 100}%` }}
          />
        </div>

        {/* Interactive Throttle Buttons */}
        {isPlaying && (
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              { label: 'Idle', rpm: 850 },
              { label: 'Cruising', rpm: 2800 },
              { label: 'Boost Spool', rpm: 5200 },
              { label: '7,200 Redline', rpm: 7200 },
            ].map((throttle) => (
              <button
                key={throttle.label}
                onMouseDown={() => revThrottle(throttle.rpm)}
                onMouseUp={() => revThrottle(850)}
                onTouchStart={() => revThrottle(throttle.rpm)}
                onTouchEnd={() => revThrottle(850)}
                className={`py-2 px-1 text-[11px] font-mono rounded-lg border transition-all text-center ${
                  rpm === throttle.rpm
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                {throttle.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
