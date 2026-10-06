import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, SlidersHorizontal, Eraser, CheckCircle, ArrowRight } from 'lucide-react';
import kitchenImg from '../assets/images/kitchen_sparkle_after_1791290487414.jpg';
import bathroomImg from '../assets/images/bathroom_luxury_clean_1791290500103.jpg';

interface TransformationCase {
  id: string;
  title: string;
  category: string;
  image: string;
  beforeNotes: string[];
  afterNotes: string[];
  specs: string;
}

const TRANSFORMATIONS: TransformationCase[] = [
  {
    id: 'kitchen',
    title: 'Chef’s Gourmet Kitchen & Quartz Restoration',
    category: 'Deep Culinary Sanitation',
    image: kitchenImg,
    beforeNotes: [
      'Grease residue on backsplash and extractor vent',
      'Water spot clouding on polished chrome hardware',
      'Dull micro-dust accumulation across quartz islands'
    ],
    afterNotes: [
      'Gleaming food-safe organic citrus degreasing',
      'Micro-buffed mirror finish on all faucet fixtures',
      'Aromatherapy organic botanical sealed countertops'
    ],
    specs: '4.5 Hours · Surgical Kitchen Reset'
  },
  {
    id: 'bathroom',
    title: 'Master Spa Suite & Frameless Glass Decalcification',
    category: 'Mineral & Grout Detailing',
    image: bathroomImg,
    beforeNotes: [
      'Heavy calcium limescale haze on glass enclosure',
      'Grout discoloration in high-humidity travertine zones',
      'Brass fixture oxidation from standard tap water'
    ],
    afterNotes: [
      'Optical clarity glass decalcification (zero etching)',
      'Steam-sanitized grout at 220°F without harsh bleach',
      'Hotel-folded organic waffle towels and fresh eucalyptus'
    ],
    specs: '3.0 Hours · Spa Revival Treatment'
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kitchen' | 'bathroom'>('kitchen');
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage
  const [isWipeMode, setIsWipeMode] = useState<boolean>(false);
  const [wipeCleanPercentage, setWipeCleanPercentage] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const wipeCanvasRef = useRef<HTMLCanvasElement>(null);

  const activeCase = TRANSFORMATIONS.find((t) => t.id === activeTab) || TRANSFORMATIONS[0];

  // Mouse / Touch handler for Before/After Slider
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const onMouseDown = () => {
    isDraggingRef.current = true;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      handleMove(e.clientX);
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length === 0) return;
      handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [handleMove]);

  // Setup interactive wipe canvas
  useEffect(() => {
    if (!isWipeMode) return;
    const canvas = wipeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    // Draw dusty foggy overlay
    ctx.fillStyle = 'rgba(75, 70, 60, 0.72)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add grime textures and finger smudges
    ctx.fillStyle = 'rgba(40, 35, 30, 0.4)';
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      const r = Math.random() * 80 + 30;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    let wipedPixels = 0;
    const totalPixels = canvas.width * canvas.height;

    const wipeAt = (x: number, y: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      wipedPixels += 500;
      const pct = Math.min(100, Math.round((wipedPixels / (totalPixels * 0.45)) * 100));
      setWipeCleanPercentage(pct);
    };

    let isWiping = false;

    const onCanvasDown = (e: MouseEvent) => {
      isWiping = true;
      const rect = canvas.getBoundingClientRect();
      wipeAt(e.clientX - rect.left, e.clientY - rect.top);
    };
    const onCanvasMove = (e: MouseEvent) => {
      if (!isWiping) return;
      const rect = canvas.getBoundingClientRect();
      wipeAt(e.clientX - rect.left, e.clientY - rect.top);
    };
    const onCanvasUp = () => {
      isWiping = false;
    };

    // Touch
    const onTouchDown = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isWiping = true;
      const rect = canvas.getBoundingClientRect();
      wipeAt(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    };
    const onTouchWipe = (e: TouchEvent) => {
      if (!isWiping || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      wipeAt(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    };

    canvas.addEventListener('mousedown', onCanvasDown);
    canvas.addEventListener('mousemove', onCanvasMove);
    window.addEventListener('mouseup', onCanvasUp);
    canvas.addEventListener('touchstart', onTouchDown);
    canvas.addEventListener('touchmove', onTouchWipe);
    window.addEventListener('touchend', onCanvasUp);

    return () => {
      canvas.removeEventListener('mousedown', onCanvasDown);
      canvas.removeEventListener('mousemove', onCanvasMove);
      window.removeEventListener('mouseup', onCanvasUp);
      canvas.removeEventListener('touchstart', onTouchDown);
      canvas.removeEventListener('touchmove', onTouchWipe);
      window.removeEventListener('touchend', onCanvasUp);
    };
  }, [isWipeMode, activeTab]);

  return (
    <section id="transformations" className="py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
              <span>Verified Portfolios</span>
              <span aria-hidden="true">·</span>
              <span>Before & After Case Studies</span>
              <span aria-hidden="true">·</span>
              <span>100% Unfiltered</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 tracking-tight text-balance">
              The Pristine Standard: Before & After
            </h2>
            <p className="mt-3 text-base text-neutral-600 max-w-2xl leading-relaxed">
              Slide back and forth or test our interactive microfiber wipe simulator to experience the transformation our botanical detailing delivers.
            </p>
          </div>

          {/* Room Switcher Tabs */}
          <div className="flex items-center gap-2 bg-neutral-100 p-1.5 rounded-2xl shrink-0 self-start md:self-auto">
            <button
              onClick={() => {
                setActiveTab('kitchen');
                setIsWipeMode(false);
                setWipeCleanPercentage(0);
              }}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                activeTab === 'kitchen' && !isWipeMode
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Gourmet Kitchen
            </button>
            <button
              onClick={() => {
                setActiveTab('bathroom');
                setIsWipeMode(false);
                setWipeCleanPercentage(0);
              }}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                activeTab === 'bathroom' && !isWipeMode
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Master Spa Suite
            </button>
            <button
              onClick={() => {
                setIsWipeMode(true);
                setWipeCleanPercentage(0);
              }}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all flex items-center gap-1.5 ${
                isWipeMode
                  ? 'bg-emerald-900 text-white shadow-sm font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              Interactive Wipe Simulator
            </button>
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Interactive Viewport (8 Cols) */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden border border-neutral-200 shadow-lg select-none bg-neutral-900"
            >
              {/* After Base Image (Sparkling Clean) */}
              <img
                src={activeCase.image}
                alt={activeCase.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {!isWipeMode ? (
                <>
                  {/* Before Overlay Layer (clipped to slider position) */}
                  <div
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                    className="absolute inset-0 w-full h-full pointer-events-none transition-none"
                  >
                    <img
                      src={activeCase.image}
                      alt="Before cleaning"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover filter contrast-75 brightness-75 sepia-[0.35] blur-[0.4px]"
                    />
                    {/* Atmospheric grime texture */}
                    <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply" />

                    {/* Before Label Tag */}
                    <div className="absolute top-6 left-6 z-10 px-3 py-1.5 bg-neutral-950/80 backdrop-blur-md rounded-lg text-white font-mono text-xs uppercase tracking-wider">
                      Pre-Treatment
                    </div>
                  </div>

                  {/* After Label Tag */}
                  <div className="absolute top-6 right-6 z-10 px-3 py-1.5 bg-emerald-950/80 backdrop-blur-md text-emerald-300 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Pristine Reset
                  </div>

                  {/* Divider Handle Bar */}
                  <div
                    style={{ left: `${sliderPos}%` }}
                    onMouseDown={onMouseDown}
                    onTouchStart={onMouseDown}
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-ew-resize z-20 transition-none"
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-neutral-900 shadow-xl flex items-center justify-center border border-neutral-300">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                  </div>
                </>
              ) : (
                /* Scratch & Wipe Simulator Canvas */
                <>
                  <canvas
                    ref={wipeCanvasRef}
                    className="absolute inset-0 w-full h-full z-10 cursor-crosshair touch-none"
                  />
                  <div className="absolute top-6 left-6 z-20 px-3.5 py-2 bg-neutral-900/90 backdrop-blur-md rounded-xl text-white text-xs flex items-center gap-2">
                    <Eraser className="w-4 h-4 text-emerald-400" />
                    <span>Wipe mouse or finger across screen to clean grime</span>
                  </div>

                  <div className="absolute bottom-6 right-6 z-20 px-4 py-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-neutral-200 text-neutral-900 font-mono text-xs flex items-center gap-2">
                    <span className="text-neutral-500">Surface Cleaned:</span>
                    <span className="font-bold text-emerald-800">{wipeCleanPercentage}%</span>
                    {wipeCleanPercentage >= 75 && (
                      <span className="text-emerald-600 font-sans font-semibold">✨ Pristine!</span>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>{activeCase.specs}</span>
              <span>Natural sunlight illumination · No artificial enhancement</span>
            </div>
          </div>

          {/* Transformation Detail Cards (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#faf9f6] p-6 rounded-3xl border border-neutral-200">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                {activeCase.category}
              </span>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mt-1 mb-4">
                {activeCase.title}
              </h3>

              {/* Before Checklist */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-800 mb-2 font-semibold">
                  Initial Deficiencies
                </h4>
                <ul className="space-y-2 text-xs text-neutral-600">
                  {activeCase.beforeNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After Checklist */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-800 mb-2 font-semibold">
                  Jess Pristine Execution
                </h4>
                <ul className="space-y-2 text-xs text-neutral-700">
                  {activeCase.afterNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                      <span className="font-medium">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Action Button */}
              <div className="mt-6 pt-4 border-t border-neutral-200">
                <a
                  href="#booking"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-medium transition-colors"
                >
                  <span>Request Similar Transformation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
