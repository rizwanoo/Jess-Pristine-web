import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Check,
  X,
  Clock,
  ShieldCheck,
  Download
} from 'lucide-react';
import { SERVICES } from '../constants/services';

interface BookingEstimatorProps {
  selectedServiceId: string;
  onServiceChange: (id: string) => void;
}

export const BookingEstimator: React.FC<BookingEstimatorProps> = ({
  selectedServiceId,
  onServiceChange,
}) => {
  const [sizeTier, setSizeTier] = useState<'1-2' | '3-4' | '5+'>('1-2');
  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('Morning (8:00 AM)');
  
  // Modal state for quick contact info
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedId, setConfirmedId] = useState('');

  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  // Quick price calculation
  const getEstimatedPrice = () => {
    const base = currentService.startingPrice;
    if (sizeTier === '3-4') return base + 60;
    if (sizeTier === '5+') return base + 140;
    return base;
  };

  const estimatedPrice = getEstimatedPrice();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone || !address) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedCode = `JP-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedId(generatedCode);
      setBookingConfirmed(true);

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          colors: ['#f472b6', '#fb7185', '#fda4af', '#fef08a'],
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 700);
  };

  return (
    <section id="booking" className="py-10 bg-[#fffbfc] border-b border-pink-200/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Sleek, Ultra-Compact Booking Strip */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-pink-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Service Selector */}
          <div className="flex-1 min-w-[200px]">
            <label className="text-[10px] font-mono uppercase tracking-wider text-pink-700 font-semibold block mb-1">
              Service Package
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => onServiceChange(e.target.value)}
              className="w-full px-3 py-2 bg-pink-50/50 hover:bg-pink-50 border border-pink-200 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-pink-400 cursor-pointer"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (from ${s.startingPrice})
                </option>
              ))}
            </select>
          </div>

          {/* Space Size */}
          <div className="w-full sm:w-44">
            <label className="text-[10px] font-mono uppercase tracking-wider text-pink-700 font-semibold block mb-1">
              Home Size
            </label>
            <select
              value={sizeTier}
              onChange={(e) => setSizeTier(e.target.value as any)}
              className="w-full px-3 py-2 bg-pink-50/50 hover:bg-pink-50 border border-pink-200 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-pink-400 cursor-pointer"
            >
              <option value="1-2">1 - 2 Bedrooms</option>
              <option value="3-4">3 - 4 Bedrooms</option>
              <option value="5+">5+ Bedrooms / Estate</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="w-full sm:w-44">
            <label className="text-[10px] font-mono uppercase tracking-wider text-pink-700 font-semibold block mb-1">
              Desired Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-pink-50/50 hover:bg-pink-50 border border-pink-200 rounded-xl text-xs font-mono text-neutral-800 focus:outline-none focus:ring-1 focus:ring-pink-400 cursor-pointer"
            />
          </div>

          {/* Price Tag & Book Action Button */}
          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-pink-100">
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block -mb-1">Estimate</span>
              <span className="text-xl font-bold font-mono text-pink-900 tabular-nums">
                ${estimatedPrice}
              </span>
            </div>

            <button
              onClick={handleOpenModal}
              className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer ring-2 ring-pink-100"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-100 fill-pink-100" />
              <span>Quick Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Lightweight Quick Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-pink-200 relative"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-pink-100 font-semibold">
                  Quick Reservation · Jess Pristine
                </span>
                <h3 className="text-base font-display font-bold text-white mt-0.5">
                  Confirm Your {currentService.name}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setBookingConfirmed(false);
                }}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingConfirmed ? (
              /* Compact Confirmation Screen */
              <div className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-neutral-900">
                    Slot Reserved! 💖
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    Booking code <strong className="font-mono">{confirmedId}</strong>. A confirmation has been sent to <strong>{email}</strong>.
                  </p>
                </div>
                <div className="p-3 bg-pink-50 rounded-xl text-xs text-pink-900 font-mono">
                  {currentService.name} · {date} · ${estimatedPrice}
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setBookingConfirmed(false);
                  }}
                  className="w-full py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Simple 4-Field Form */
              <form onSubmit={handleConfirmBooking} className="p-5 space-y-3.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-pink-50/60 rounded-xl border border-pink-100">
                  <span className="text-neutral-600 font-medium">{date} · {sizeTier} Bedrooms</span>
                  <span className="font-mono font-bold text-pink-800 text-sm">${estimatedPrice}</span>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-neutral-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Charlotte"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 bg-pink-50/30 border border-pink-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-medium text-neutral-700 block mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="charlotte@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-pink-50/30 border border-pink-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-neutral-700 block mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-pink-50/30 border border-pink-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-neutral-700 block mb-1">Residential Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="450 Park Avenue, Apt 12B"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-pink-50/30 border border-pink-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-neutral-700 block mb-1">Arrival Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-pink-50/30 border border-pink-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500"
                  >
                    <option value="Morning (8:00 AM)">Morning (8:00 AM – 11:00 AM)</option>
                    <option value="Midday (11:30 AM)">Midday (11:30 AM – 2:30 PM)</option>
                    <option value="Afternoon (3:00 PM)">Afternoon (3:00 PM – 6:00 PM)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Securing schedule...</span>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-pink-100" />
                        <span>Confirm Reservation (${estimatedPrice})</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-mono">
                  <ShieldCheck className="w-3 h-3 text-pink-500" />
                  <span>Free cancellation up to 24 hours prior</span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
