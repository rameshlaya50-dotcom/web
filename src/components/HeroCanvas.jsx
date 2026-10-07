import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TOTAL_FRAMES = 180;

export default function HeroCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Framer motion scroll tracking across the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Preload sequential frames
  useEffect(() => {
    let isMounted = true;
    const loadedImgs = [];
    let count = 0;

    // Load initial critical frames first for instant first-paint
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/images/herosection/ezgif-frame-${frameNum}.png`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setImagesLoaded(count);
        if (count >= 15 && !isReady) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setImagesLoaded(count);
      };

      loadedImgs.push(img);
    }

    setImages(loadedImgs);

    return () => {
      isMounted = false;
    };
  }, []);

  // Canvas rendering loop tied to scroll progress
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    const render = () => {
      const progress = scrollYProgress.get();
      // Map progress [0, 1] to frame index [0, TOTAL_FRAMES - 1]
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      const currentImg = images[frameIndex];

      // Handle retina resolution
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clean background matching studio gradient
      ctx.fillStyle = '#ededed';
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        // Calculate contain aspect ratio
        const imgRatio = currentImg.naturalWidth / currentImg.naturalHeight;
        const canvasRatio = displayWidth / displayHeight;

        let drawW, drawH, drawX, drawY;

        if (canvasRatio > imgRatio) {
          // Canvas is wider than image
          drawH = displayHeight;
          drawW = displayHeight * imgRatio;
          drawX = (displayWidth - drawW) / 2;
          drawY = 0;
        } else {
          // Canvas is taller than image
          drawW = displayWidth;
          drawH = displayWidth / imgRatio;
          drawX = 0;
          drawY = (displayHeight - drawH) / 2;
        }

        ctx.drawImage(currentImg, drawX, drawY, drawW, drawH);
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, scrollYProgress, isReady]);

  // Framer Motion transforms for each narrative beat
  // Beat 1: Initial Presentation (0.00 - 0.22)
  const beat1Opacity = useTransform(scrollYProgress, [0.0, 0.05, 0.16, 0.22], [1, 1, 1, 0]);
  const beat1Y = useTransform(scrollYProgress, [0.0, 0.22], [0, -60]);
  const beat1Scale = useTransform(scrollYProgress, [0.0, 0.22], [1, 0.95]);

  // Beat 2: Outer Skin Dissolves (0.26 - 0.48)
  const beat2Opacity = useTransform(scrollYProgress, [0.24, 0.30, 0.42, 0.48], [0, 1, 1, 0]);
  const beat2Y = useTransform(scrollYProgress, [0.24, 0.32, 0.42, 0.48], [50, 0, 0, -40]);

  // Beat 3: The Engine & Powertrain Exposed (0.52 - 0.74)
  const beat3Opacity = useTransform(scrollYProgress, [0.50, 0.56, 0.68, 0.74], [0, 1, 1, 0]);
  const beat3Y = useTransform(scrollYProgress, [0.50, 0.56, 0.68, 0.74], [50, 0, 0, -40]);

  // Beat 4: Complete Mechanical Anatomy (0.78 - 0.98)
  const beat4Opacity = useTransform(scrollYProgress, [0.76, 0.82, 0.94, 0.99], [0, 1, 1, 0]);
  const beat4Y = useTransform(scrollYProgress, [0.76, 0.82, 0.94, 0.99], [50, 0, 0, -30]);

  // Scroll indicator fade
  const scrollPromptOpacity = useTransform(scrollYProgress, [0.0, 0.08], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="anatomy"
      className="relative w-full h-[500vh] bg-[#ededed] text-[#111113]"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Canvas Background Layer */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain block select-none pointer-events-none"
        />

        {/* Loading Indicator (Subtle Apple-style bar) */}
        {!isReady && (
          <div className="absolute inset-0 bg-[#ededed] flex flex-col items-center justify-center z-30">
            <div className="flex flex-col items-center max-w-xs w-full px-6 text-center">
              <span className="text-xs uppercase font-mono tracking-widest text-[#111113]/50 mb-3">
                Calibrating Telemetry
              </span>
              <div className="w-full h-1 bg-[#111113]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#111113] transition-all duration-300"
                  style={{ width: `${Math.round((imagesLoaded / TOTAL_FRAMES) * 100)}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-[#111113]/40 mt-2">
                {Math.round((imagesLoaded / TOTAL_FRAMES) * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Narrative Overlay Layers (Apple-style Typography) */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-16 max-w-7xl mx-auto w-full">
          
          {/* BEAT 1: Grand Hero Introduction */}
          <motion.div
            style={{ opacity: beat1Opacity, y: beat1Y, scale: beat1Scale }}
            className="flex flex-col items-center text-center mt-12 md:mt-20 mx-auto max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono uppercase tracking-widest text-black/70 mb-4"
            >
              <span>Aerodynamic Benchmark</span>
              <span className="w-1 h-1 rounded-full bg-black/40" />
              <span>Generation 992.2</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#111113] leading-none mb-4"
            >
              911 Turbo S.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-2xl font-normal text-black/60 max-w-2xl leading-relaxed"
            >
              Engineered beyond convention. Every contour honed by wind. Every micron tuned for relentless velocity.
            </motion.p>
          </motion.div>

          {/* BEAT 2: Outer Shell Deconstruction (Side-anchored Apple layout) */}
          <motion.div
            style={{ opacity: beat2Opacity, y: beat2Y }}
            className="absolute top-1/4 left-8 md:left-20 max-w-md bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-black/[0.08] shadow-xl pointer-events-auto"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold mb-2 block">
              Stage 01 • Shell Separation
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#111113] mb-3 leading-tight">
              Bodywork dissolves. Architecture remains.
            </h2>
            <p className="text-sm md:text-base text-black/70 leading-relaxed mb-4">
              Ultra-high-strength steel and structural aluminum stampings detach to unveil an unyielding monocoque cage. Aerodynamics engineered directly into the core chassis.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-black/10">
              <div>
                <div className="text-xs text-black/50 font-mono">DRAG COEFFICIENT</div>
                <div className="text-lg font-bold text-black font-mono">0.33 Cd</div>
              </div>
              <div>
                <div className="text-xs text-black/50 font-mono">WEIGHT SAVING</div>
                <div className="text-lg font-bold text-black font-mono">-66 LBS</div>
              </div>
            </div>
          </motion.div>

          {/* BEAT 3: Twin-Turbo Boxer Heart (Right-anchored Apple layout) */}
          <motion.div
            style={{ opacity: beat3Opacity, y: beat3Y }}
            className="absolute top-1/4 right-8 md:right-20 max-w-md bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-black/[0.08] shadow-xl pointer-events-auto"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold mb-2 block">
              Stage 02 • Powertrain Core
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#111113] mb-3 leading-tight">
              3.8-Litre Twin-Turbo Boxer.
            </h2>
            <p className="text-sm md:text-base text-black/70 leading-relaxed mb-4">
              Variable Turbine Geometry (VTG) delivers instantaneous boost pressure without lag. Symmetrical turbochargers feed the flat-six combustion chambers with surgical oxygen density.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-black/10 text-center">
              <div className="bg-black/5 p-2 rounded-xl">
                <div className="text-base md:text-xl font-bold font-mono text-black">640</div>
                <div className="text-[10px] text-black/50 font-mono uppercase">HP</div>
              </div>
              <div className="bg-black/5 p-2 rounded-xl">
                <div className="text-base md:text-xl font-bold font-mono text-black">2.6s</div>
                <div className="text-[10px] text-black/50 font-mono uppercase">0-60 MPH</div>
              </div>
              <div className="bg-black/5 p-2 rounded-xl">
                <div className="text-base md:text-xl font-bold font-mono text-black">205</div>
                <div className="text-[10px] text-black/50 font-mono uppercase">MPH TOP</div>
              </div>
            </div>
          </motion.div>

          {/* BEAT 4: Complete Mechanical Skeleton */}
          <motion.div
            style={{ opacity: beat4Opacity, y: beat4Y }}
            className="flex flex-col items-center text-center mx-auto max-w-3xl mb-12 bg-white/70 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-black/[0.08] shadow-2xl pointer-events-auto"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold mb-2">
              Stage 03 • Mechanical Matrix
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111113] mb-3">
              Nothing hidden. Everything perfected.
            </h2>
            <p className="text-sm md:text-lg text-black/70 max-w-xl leading-relaxed mb-4">
              Suspension geometry, 10-piston ceramic composite braking calipers, and active all-wheel drive distribution calibrated down to the microsecond.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black/50">
              <span>Scroll down to inspect specifications & allocation details</span>
              <span className="animate-bounce">↓</span>
            </div>
          </motion.div>

          {/* Bottom Pure Scroll Indicator - STRICTLY NO BUTTONS */}
          <motion.div
            style={{ opacity: scrollPromptOpacity }}
            className="flex flex-col items-center justify-center gap-2 mb-4 mx-auto"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase text-black/40">
              Scroll to deconstruct
            </span>
            <div className="w-5 h-9 rounded-full border-2 border-black/20 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-black/60"
              />
            </div>
          </motion.div>

          {/* Bottom Gradient Fade to Dark Engineering Section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#ededed]/50 to-[#050507] pointer-events-none z-20" />

        </div>
      </div>
    </section>
  );
}
