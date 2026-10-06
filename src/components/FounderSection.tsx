import React from 'react';
import { Leaf, Sparkles, HeartHandshake, ShieldCheck, Check } from 'lucide-react';
import founderImg from '../assets/images/jess_founder_portrait_1791290511343.jpg';
import toolsImg from '../assets/images/pristine_botanical_tools_1791290526402.jpg';

export const FounderSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#faf9f6] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Founder Visual Collage (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200 shadow-xl aspect-[4/5] bg-neutral-100">
              <img
                src={founderImg}
                alt="Jessica, Founder of Jess Pristine"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">
                  Founder & Master Detailer
                </span>
                <h3 className="text-xl font-display font-bold">
                  Jessica (@jess_pristine)
                </h3>
                <p className="text-xs text-neutral-200 mt-1">
                  Pioneering non-toxic, surgical-grade residential care for modern living.
                </p>
              </div>
            </div>

            {/* Overlapping Botanical Tools Badge Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-white p-2">
              <img
                src={toolsImg}
                alt="Organic cleaning tools"
                referrerPolicy="no-referrer"
                className="w-full h-24 object-cover rounded-xl mb-2"
              />
              <div className="text-[11px] font-mono text-emerald-900 font-semibold px-1">
                100% Botanical Formulas
              </div>
            </div>
          </div>

          {/* Prose & Core Commitments (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 mb-3">
              <span>The Founder’s Story</span>
              <span aria-hidden="true">·</span>
              <span>Sanctuary Philosophy</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 tracking-tight text-balance">
              “Cleanliness isn’t just chore work. It is the foundation of mental clarity.”
            </h2>

            <div className="mt-6 space-y-4 text-sm text-neutral-600 leading-relaxed">
              <p>
                I founded Jess Pristine because I became tired of the industry standard: hurried maid services that mask grime with overpowering synthetic bleach and ammonia perfumes, scratching delicate stone surfaces and filling homes with headache-inducing fumes.
              </p>
              <p>
                Our philosophy is rooted in surgical precision: treating your home as a private gallery. We developed our own botanical cleaning protocol utilizing cold-pressed plant essences, distilled lavender, and 220°F pure steam disinfection. The result is pure, breathable air and spotless surfaces you can safely walk barefoot on.
              </p>
            </div>

            {/* Three Pillars Bento */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <Leaf className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-semibold text-neutral-900">Zero Toxic Burden</h4>
                <p className="mt-1 text-[11px] text-neutral-500 leading-normal">
                  Safe for crawling infants, cats, dogs, and chemically sensitive clients.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-semibold text-neutral-900">Surgical Method</h4>
                <p className="mt-1 text-[11px] text-neutral-500 leading-normal">
                  Color-coded 8-quadrant microfiber folding eliminates cross-contamination.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-semibold text-neutral-900">White-Glove Trust</h4>
                <p className="mt-1 text-[11px] text-neutral-500 leading-normal">
                  Vetted, background-checked, insured, and committed to absolute discretion.
                </p>
              </div>
            </div>

            {/* Quote Action */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#booking"
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-medium transition-colors"
              >
                Experience the Difference
              </a>
              <a
                href="https://www.instagram.com/jess_pristine/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-emerald-900 hover:text-emerald-700 underline underline-offset-4"
              >
                Watch Jess on Instagram (@jess_pristine)
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
