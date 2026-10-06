import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2, ArrowRight } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Elena Rostova',
    role: 'Architectural Digest Featured Homeowner',
    location: 'Tribeca, New York',
    serviceType: 'The Surgical Deep Clean',
    rating: 5,
    date: 'February 2026',
    highlight: 'Saved our Carrera marble from traditional cleaning acid etch marks.',
    quote: 'We spent two years renovating our historic loft with unsealed natural limestone and custom millwork. Most cleaning teams use generic bleach-heavy chemicals that would ruin the stone. Jess arrived with her botanical formulas, custom pH meters, and surgical microfiber method. The loft felt lighter, smelled like fresh eucalyptus, and not a single particle remained.'
  },
  {
    id: 't-2',
    name: 'Marcus & Claire Vance',
    role: 'Tech Executive & Partner',
    location: 'West Village Townhouse',
    serviceType: 'The Signature Residential Reset',
    rating: 5,
    date: 'January 2026',
    highlight: 'Our bi-weekly reset is the single highest ROI wellness ritual in our home.',
    quote: 'Walking through our front door on alternate Thursdays after Jess has worked her magic is an out-of-body experience. The vacuum stripes in the bouclé carpets, the gleaming frameless shower glass that has stayed completely limescale-free for 8 months, and the calm aromatherapy finish make our home feel like a 5-star Aman resort.'
  },
  {
    id: 't-3',
    name: 'Julianne Chen',
    role: 'Principal Interior Designer, Studio Form',
    location: 'SoHo Penthouse',
    serviceType: 'Post-Renovation Fine Dust Extraction',
    rating: 5,
    date: 'March 2026',
    highlight: 'Zero drywall particulate remaining before our client client walkthrough.',
    quote: 'In interior architecture, contractors leave fine drywall silica that lingers for months in AC returns and light sconces. Jess Pristine is the only team I trust before staging million-dollar properties. She works with electrostatic precision and forensic detail.'
  },
  {
    id: 't-4',
    name: 'David & Sarah Sterling',
    role: 'Pediatric Physician & Family',
    location: 'Brooklyn Heights Brownstone',
    serviceType: 'Turnkey Move-In / Move-Out',
    rating: 5,
    date: 'March 2026',
    highlight: '100% pet-safe and newborn-safe with zero artificial synthetic fragrances.',
    quote: 'With a 6-month-old infant and two golden retrievers, we were terrified of neurotoxic sprays and artificial scents. Jess sanitized every drawer, the interior of both ovens, and all baseboards with steam and organic botanical extracts. True hospital-grade peace of mind.'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.serviceType.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="testimonials" className="py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 tracking-tight text-balance">
              Trusted by Architects, Designers & Discerning Homeowners
            </h2>
            <p className="mt-3 text-base text-neutral-600 max-w-2xl leading-relaxed">
              Read uncensored testimonials from clients who value surgical precision, zero toxic residue, and white-glove discretion.
            </p>
          </div>

          {/* Service Filters */}
          <div className="flex items-center gap-1.5 bg-neutral-100 p-1.5 rounded-2xl shrink-0 self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Client Stories
            </button>
            <button
              onClick={() => setFilter('reset')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all ${
                filter === 'reset'
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Residential Upkeep
            </button>
            <button
              onClick={() => setFilter('deep')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all ${
                filter === 'deep'
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Deep Resets
            </button>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#faf9f6] p-8 sm:p-10 rounded-3xl border border-neutral-200/90 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Header Rating & Service */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] font-mono text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {item.serviceType}
                  </span>
                </div>

                {/* Highlight Quote */}
                <h3 className="text-base font-semibold text-neutral-900 mb-3 leading-snug">
                  “{item.highlight}”
                </h3>

                {/* Body Quote */}
                <p className="text-xs text-neutral-600 leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-6 border-t border-neutral-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">{item.name}</span>
                    <span className="flex items-center gap-0.5 text-[10px] text-emerald-700 font-mono">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Home
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-sans">
                    {item.role} · <span className="font-mono text-neutral-400">{item.location}</span>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-neutral-400">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Metric Strip */}
        <div className="mt-12 p-8 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              Discretion & Trust Record
            </span>
            <h4 className="text-2xl font-display font-semibold mt-1">
              Serving Over 980+ Luxury Residences with Zero Incident Claims
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Fully insured, comprehensive $2,000,000 general liability coverage, and strict non-disclosure protocol.
            </p>
          </div>

          <a
            href="#booking"
            className="px-6 py-3 bg-white hover:bg-neutral-100 text-neutral-900 rounded-xl text-xs font-semibold transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Book Your Transformation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
