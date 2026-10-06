import React, { useState } from 'react';
import { Sparkles, Instagram, Menu, X, MessageCircleHeart } from 'lucide-react';
import { ASSETS } from '../constants/assets';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(ASSETS.JESS_AVATAR_URL);

  return (
    <header className="sticky top-0 z-40 bg-[#fffbfc]/90 backdrop-blur-md border-b border-pink-200/70 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Lockup with Her Profile Photo in Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
        >
          {/* Her Photo with Girly Rose-Gold Ring & Sparkle */}
          <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 via-rose-300 to-pink-200 shadow-md group-hover:scale-105 transition-transform">
            <img
              src={avatarSrc}
              alt="Jess Pristine"
              referrerPolicy="no-referrer"
              onError={() => setAvatarSrc(ASSETS.JESS_AVATAR_FALLBACK)}
              className="w-full h-full rounded-full object-cover bg-white"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center text-[9px] shadow-xs">
              ✨
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-display font-bold tracking-tight text-neutral-900 group-hover:text-pink-600 transition-colors">
              Jess Pristine
            </span>
            <span className="text-[10px] font-mono text-pink-600 tracking-wider uppercase -mt-1 hidden sm:inline">
              Luxury Space Reset
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 Nav Links (Single-line, girly hover underlines) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-neutral-600">
          <a href="#inspector" className="hover:text-pink-600 hover:underline decoration-pink-300 underline-offset-8 transition-colors whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            3D Inspector
          </a>
          <a href="#transformations" className="hover:text-pink-600 hover:underline decoration-pink-300 underline-offset-8 transition-colors whitespace-nowrap">
            Before & After
          </a>
          <a href="#booking" className="hover:text-pink-600 hover:underline decoration-pink-300 underline-offset-8 transition-colors whitespace-nowrap">
            Reserve
          </a>
          <a href="#instagram" className="hover:text-pink-600 hover:underline decoration-pink-300 underline-offset-8 transition-colors whitespace-nowrap">
            Instagram Feed
          </a>
          <a href="#testimonials" className="hover:text-pink-600 hover:underline decoration-pink-300 underline-offset-8 transition-colors whitespace-nowrap">
            Testimonials
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions with Girly Palette */}
        <div className="flex items-center gap-2.5">
          {/* Quick AI Concierge Trigger */}
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-pink-200 bg-pink-50/70 hover:bg-pink-100 text-pink-800 text-xs font-medium transition-colors cursor-pointer"
            >
              <MessageCircleHeart className="w-3.5 h-3.5 text-pink-500" />
              <span>Ask Jessie AI</span>
            </button>
          )}

          <a
            href="https://www.instagram.com/jess_pristine/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-xl border border-pink-200 text-pink-700 hover:text-pink-900 hover:bg-pink-50 transition-colors"
            aria-label="Visit @jess_pristine on Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 rounded-xl transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ring-2 ring-pink-100"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-100 fill-pink-100" />
            <span>Book Pristine Clean</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-pink-600"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-pink-200 bg-[#fffbfc] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-neutral-700">
            <a
              href="#inspector"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-pink-600 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              Interactive 3D Inspector
            </a>
            <a
              href="#transformations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-pink-600"
            >
              Before & After Transformations
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-pink-600"
            >
              Quick Reservation
            </a>
            <a
              href="#instagram"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-pink-600"
            >
              Instagram Feed (@jess_pristine)
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-pink-600"
            >
              Client Testimonials
            </a>
          </nav>

          <div className="pt-4 border-t border-pink-100 flex items-center justify-between">
            <a
              href="https://www.instagram.com/jess_pristine/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-pink-700"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>@jess_pristine</span>
            </a>
            <span className="text-[11px] font-mono text-neutral-400">Monday - Saturday</span>
          </div>
        </div>
      )}
    </header>
  );
};
