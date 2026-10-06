import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  MessageCircleHeart,
  Layers,
  Heart
} from 'lucide-react';
import heroImg from '../assets/images/hero_pristine_living_1791290453041.jpg';
import { ASSETS } from '../constants/assets';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenChat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenChat }) => {
  const [avatarSrc, setAvatarSrc] = useState(ASSETS.JESS_AVATAR_URL);

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-neutral-950 text-white">
      {/* FULL LUXURY BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src={heroImg}
          alt="Pristine luxury penthouse interior by Jess Pristine"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105 filter brightness-90 animate-shimmer"
          style={{ animationDuration: '8s' }}
        />

        {/* Cinematic Luxury Dark Scrim Overlay (Left heavy for text readability) */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-neutral-950/45" />
        
        {/* Soft Rosy Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Container Over Background */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Typography & Actions (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Luxury Kicker Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-pink-400 p-0.5">
                <img
                  src={avatarSrc}
                  alt="Jess"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarSrc(ASSETS.JESS_AVATAR_FALLBACK)}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-pink-200 font-serif-luxury tracking-wide">
                Bespoke Sanctuary Protocol
              </span>
              <span className="text-pink-400" aria-hidden="true">·</span>
              <span className="text-[11px] font-mono text-pink-300 font-medium">
                @jess_pristine
              </span>
              <Sparkles className="w-3.5 h-3.5 text-pink-400 fill-pink-300 animate-spin" style={{ animationDuration: '10s' }} />
            </div>

            {/* 2026 Editorial Luxury Headline */}
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-white tracking-tight leading-[1.04] text-balance drop-shadow-sm">
                The art of <span className="italic font-serif-luxury text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200">spotless</span>, serene living.
              </h1>
            </div>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-900">
              Forensic residential detailing, 220°F pure steam disinfection, and turnkey resets by Jessica. Infused with organic French lavender and cold-pressed botanical essences.
            </p>

            {/* Interactive Luxury Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5 animate-in fade-in slide-in-from-bottom-5 duration-1000">
              <button
                onClick={onOpenBooking}
                className="px-7 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 hover:from-pink-600 hover:to-rose-600 active:scale-98 text-white rounded-2xl text-xs font-semibold tracking-wide transition-all shadow-xl shadow-pink-500/25 flex items-center gap-2 cursor-pointer ring-2 ring-pink-400/40"
              >
                <Sparkles className="w-4 h-4 text-pink-100 fill-pink-100" />
                <span>Reserve Pristine Clean</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              {onOpenChat && (
                <button
                  onClick={onOpenChat}
                  className="px-5 py-4 bg-white/15 hover:bg-white/25 active:scale-98 backdrop-blur-md border border-white/25 text-pink-100 hover:text-white rounded-2xl text-xs font-medium transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircleHeart className="w-4 h-4 text-pink-400 animate-pulse" />
                  <span>Chat with Jessie AI 🌸</span>
                </button>
              )}

              <a
                href="#inspector"
                className="px-4 py-4 text-xs text-neutral-300 hover:text-white font-medium transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-pink-400" />
                <span>3D Clean Inspector</span>
              </a>
            </div>

            {/* Quantitative Trust Metric Badges */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                  980+ <span className="text-pink-400 font-sans text-xs">✨</span>
                </div>
                <div className="text-[11px] text-neutral-300 font-serif-luxury mt-0.5">
                  Homes Transformed
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                  100% <span className="text-pink-400 font-sans text-xs">🌿</span>
                </div>
                <div className="text-[11px] text-neutral-300 font-serif-luxury mt-0.5">
                  Plant-Based Formulas
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                  5.0 ★ <span className="text-pink-400 font-sans text-xs">💖</span>
                </div>
                <div className="text-[11px] text-neutral-300 font-serif-luxury mt-0.5">
                  Satisfaction Record
                </div>
              </div>
            </div>

          </div>

          {/* Right Floating Glassmorphic Trust Card (4 Cols) */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-4">
            <div className="p-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-pink-400 to-amber-300 shrink-0">
                    <img
                      src={avatarSrc}
                      alt="Jessica"
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarSrc(ASSETS.JESS_AVATAR_FALLBACK)}
                      className="w-full h-full rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-neutral-900" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Jessica</div>
                    <div className="text-[10px] font-mono text-pink-300">@jess_pristine</div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono">
                  Online
                </span>
              </div>

              <div className="space-y-2 pt-1 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Licensed, Bonded & $2M General Liability</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                  <span>140+ Five-Star Verified Client Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>100% Reclean Guarantee within 24h</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
