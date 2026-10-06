import React from 'react';
import { Instagram, Sparkles, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-20 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-neutral-800">
          
          {/* Brand & Ethos (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-display font-bold text-white tracking-tight">
              Jess Pristine
            </span>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Bespoke residential detailing, surgical deep resets, and architectural staging by Jessica (@jess_pristine). Dedicated to creating serene, chemical-free sanctuaries for modern living.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/jess_pristine/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
              </a>
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Reserve Appointment</span>
              </button>
            </div>
          </div>

          {/* Highlights Column */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Pristine Resets
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#booking" className="hover:text-white transition-colors">Residential Reset</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">Surgical Deep Clean</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">Move-In / Move-Out</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">Post-Renovation Reset</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">Instant Reservation</a>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#inspector" className="hover:text-white transition-colors">3D Room Inspector</a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-white transition-colors">Before & After Slider</a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-white transition-colors">Wipe Surface Simulator</a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-white transition-colors">Reels & Video Guides</a>
              </li>
            </ul>
          </div>

          {/* Concierge Desk */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Private Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>concierge@jesspristine.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>(555) 794-2824</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>New York & Metropolitan Estates</span>
              </li>
              <li className="pt-2 text-[11px] font-mono text-neutral-500">
                Operating Mon - Sat: 8:00 AM – 6:00 PM
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            © {new Date().getFullYear()} Jess Pristine. All rights reserved. Licensed, Bonded & Insured.
          </div>

          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/jess_pristine/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Instagram @jess_pristine
            </a>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
