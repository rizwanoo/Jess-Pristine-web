import React, { useState } from 'react';
import { Sparkles, Instagram, Menu, X, MessageCircleHeart, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../constants/assets';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(ASSETS.JESS_AVATAR_URL);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-pink-100 shadow-[0_4px_30px_rgba(244,114,182,0.08)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Clear, Sharp Luxury Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          {/* High-Definition Avatar with Rose-Gold Halo Ring & Verified Badge */}
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 shadow-md group-hover:shadow-pink-400/40 group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full rounded-full overflow-hidden bg-white p-[1px]">
                <img
                  src={avatarSrc}
                  alt="Jessica — Jess Pristine"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarSrc(ASSETS.JESS_AVATAR_FALLBACK)}
                  className="w-full h-full rounded-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>
            </div>
            {/* Sparkling Verified Badge */}
            <span 
              className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white flex items-center justify-center text-[10px] shadow-sm ring-2 ring-white"
              title="Verified Founder"
            >
              ✓
            </span>
          </div>

          {/* Brand Name Lockup */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-neutral-950 group-hover:text-pink-600 transition-colors">
                Jess Pristine
              </span>
              <Sparkles className="w-4 h-4 text-pink-500 fill-pink-400 shrink-0 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider text-pink-700/90 uppercase -mt-0.5">
              Bespoke Sanctuary Detailing
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-neutral-700">
          <a
            href="#inspector"
            className="px-3.5 py-2 rounded-full hover:bg-pink-50/80 hover:text-pink-700 transition-all flex items-center gap-1.5 group"
          >
            <span className="w-2 h-2 rounded-full bg-pink-500 group-hover:scale-125 transition-transform" />
            <span>3D Inspection</span>
          </a>
          <a
            href="#transformations"
            className="px-3.5 py-2 rounded-full hover:bg-pink-50/80 hover:text-pink-700 transition-all"
          >
            Transformations
          </a>
          <a
            href="#booking"
            className="px-3.5 py-2 rounded-full hover:bg-pink-50/80 hover:text-pink-700 transition-all"
          >
            Reserve Service
          </a>
          <a
            href="#instagram"
            className="px-3.5 py-2 rounded-full hover:bg-pink-50/80 hover:text-pink-700 transition-all flex items-center gap-1.5"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            <span>@jess_pristine</span>
          </a>
          <a
            href="#testimonials"
            className="px-3.5 py-2 rounded-full hover:bg-pink-50/80 hover:text-pink-700 transition-all"
          >
            Client Reviews
          </a>
        </nav>

        {/* Zone 3: Actions & CTAs */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick AI Concierge Trigger */}
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-pink-200 bg-pink-50/80 hover:bg-pink-100/90 text-pink-900 text-xs font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <MessageCircleHeart className="w-3.5 h-3.5 text-pink-600 group-hover:scale-110 transition-transform" />
              <span>Ask Jessie AI</span>
            </button>
          )}

          {/* Direct Booking CTA */}
          <button
            onClick={onOpenBooking}
            className="px-4.5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 hover:from-pink-700 hover:to-rose-600 rounded-xl transition-all shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ring-2 ring-pink-200 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-100 fill-pink-100" />
            <span>Book Reset</span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-pink-200 bg-pink-50/50 text-neutral-800 hover:text-pink-600 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-pink-100 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-neutral-800">
            <a
              href="#inspector"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-pink-50 hover:text-pink-700 flex items-center gap-2.5 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              <span>3D Living Room Inspection</span>
            </a>
            <a
              href="#transformations"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-pink-50 hover:text-pink-700 transition-colors"
            >
              Before & After Transformations
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-pink-50 hover:text-pink-700 transition-colors"
            >
              Reserve Sanctuary Clean
            </a>
            <a
              href="#instagram"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-pink-50 hover:text-pink-700 flex items-center gap-2 transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>Instagram Feed (@jess_pristine)</span>
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-pink-50 hover:text-pink-700 transition-colors"
            >
              Client Testimonials & Reviews
            </a>
          </nav>

          {/* Quick Chat on Mobile */}
          {onOpenChat && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-3 px-4 rounded-xl border border-pink-200 bg-pink-50 text-pink-900 font-semibold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircleHeart className="w-4 h-4 text-pink-600" />
              <span>Chat with Jessie AI Concierge 🌸</span>
            </button>
          )}

          <div className="pt-3 border-t border-pink-100 flex items-center justify-between text-xs font-medium text-neutral-500">
            <span className="flex items-center gap-1 text-pink-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-500" />
              100% Non-Toxic Botanical Care
            </span>
            <a
              href="https://www.instagram.com/jess_pristine/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline font-semibold"
            >
              @jess_pristine
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
