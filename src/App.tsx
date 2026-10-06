/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThreeRoomInspector } from './components/ThreeRoomInspector';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { BookingEstimator } from './components/BookingEstimator';
import { InstagramShowcase } from './components/InstagramShowcase';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FounderSection } from './components/FounderSection';
import { Footer } from './components/Footer';
import { AiChatbot } from './components/AiChatbot';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('residential-reset');
  const [chatbotOpenTrigger, setChatbotOpenTrigger] = useState<number>(0);

  const handleOpenBooking = () => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenChat = () => {
    setChatbotOpenTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbfc] text-neutral-900 selection:bg-pink-500 selection:text-white">
      {/* Top Bar Nav featuring Her Logo Image and Girly Palette */}
      <Navbar onOpenBooking={handleOpenBooking} onOpenChat={handleOpenChat} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Her Image in Lockup and Girly Theme */}
        <Hero onOpenBooking={handleOpenBooking} onOpenChat={handleOpenChat} />

        {/* 3D Space Inspector */}
        <ThreeRoomInspector />

        {/* Before & After Interactive Transformations & Wipe Simulator */}
        <BeforeAfterSlider />

        {/* Interactive Quick Service Bookings & Live Estimator */}
        <BookingEstimator
          selectedServiceId={selectedServiceId}
          onServiceChange={setSelectedServiceId}
        />

        {/* Instagram Feed & Reels Showcase (@jess_pristine) */}
        <InstagramShowcase />

        {/* Client Testimonials & Case Studies */}
        <TestimonialsSection />

        {/* The Founder Ethos & Non-Toxic Standard */}
        <FounderSection />
      </main>

      {/* Editorial Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* AI-Powered Chatbot & Concierge (Jessie 🌸) */}
      <AiChatbot key={chatbotOpenTrigger} onApplyBookingQuote={({ serviceId }) => setSelectedServiceId(serviceId)} />
    </div>
  );
}
