import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Heart,
  ChevronDown,
  RefreshCw,
  Calendar,
  CheckCircle2,
  DollarSign,
  Maximize2,
  Minimize2,
  HelpCircle,
  MessageCircleHeart
} from 'lucide-react';
import { ASSETS } from '../constants/assets';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
  quoteData?: {
    serviceName: string;
    price: number;
    hours: string;
  };
}

const QUICK_PROMPTS = [
  'Estimate a 2-Bed / 2-Bath Deep Clean ✨',
  'Are your botanical formulas safe for pets & babies? 🐾',
  'What is included in the Signature Reset? 🌸',
  'Can you provide a building COI? 🏢',
];

interface AiChatbotProps {
  onApplyBookingQuote?: (details: { serviceId: string; bedrooms?: number; bathrooms?: number }) => void;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ onApplyBookingQuote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(ASSETS.JESS_AVATAR_URL);
  const [unreadCount, setUnreadCount] = useState(1);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        "Bonjour darling! 🌸 Welcome to Jess Pristine. I'm Jessie, your personal sanctuary concierge. ✨\n\nI can provide an instant quote, check reservation availability, or answer any questions regarding our organic botanical formulas. How may I pamper your home today? 💖",
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  // Client-side fallback rule engine for instant quotes and FAQs
  const getFallbackResponse = (userText: string): { reply: string; quoteData?: { serviceName: string; price: number; hours: string } } => {
    const text = userText.toLowerCase();

    // Pet safety / organic formulas
    if (text.includes('pet') || text.includes('dog') || text.includes('cat') || text.includes('safe') || text.includes('baby') || text.includes('chemical') || text.includes('toxic')) {
      return {
        reply: "Yes, absolutely! 🐾🌿 Every formula in Jess's signature kit is 100% cruelty-free, plant-derived, and zero-VOC. We use cold-pressed thyme extracts, distilled French lavender, and 220°F pure steam instead of synthetic chlorine bleach or harsh ammonia. Pure peace of mind for crawling infants and pets! 💖✨"
      };
    }

    // COI / Insurance
    if (text.includes('coi') || text.includes('insurance') || text.includes('building') || text.includes('doorman') || text.includes('bonded')) {
      return {
        reply: "Certainly darling! 🏢 We are fully bonded and carry a $2,000,000 general liability policy. We issue same-day custom Certificates of Insurance (COI) tailored for high-rise residences, co-ops, and buildings with doorman access! 💖"
      };
    }

    // Move in / Move out
    if (text.includes('move in') || text.includes('move-in') || text.includes('move out') || text.includes('moving')) {
      return {
        reply: "Our **Turnkey Move-In / Move-Out Reset** starts from **$420**! 🔑✨ It provides an immaculate blank slate: inside every kitchen cabinet, pantry, and drawer, inside the refrigerator and oven, plus full bathroom decalcification. Would you like to schedule this for your upcoming move date? 🌸",
        quoteData: { serviceName: 'Turnkey Move-In / Move-Out', price: 420, hours: '6.0 - 9.0 hrs' }
      };
    }

    // Deep Clean quote
    if (text.includes('deep clean') || text.includes('deep') || text.includes('2 bed') || text.includes('2-bed') || text.includes('apartment')) {
      return {
        reply: "For a lovely 2-Bedroom residence, our **Surgical Deep Clean** is typically around **$375 - $415** (approx. 5.5 hours)! ✨\n\nThis includes:\n• 220°F pure steam sanitization for all bathroom tiles & grout\n• Full interior oven & range degreasing\n• Baseboards, crown moulding & window sills\n• Calming organic eucalyptus mist finish 🌿💖\n\nWould you like me to reserve a morning slot (8-11am) or afternoon slot (12-3pm)?",
        quoteData: { serviceName: 'The Surgical Deep Clean', price: 395, hours: '5.5 hrs' }
      };
    }

    // Residential reset / upkeep
    if (text.includes('residential') || text.includes('reset') || text.includes('regular') || text.includes('weekly') || text.includes('upkeep')) {
      return {
        reply: "Our **Signature Residential Reset** starts from **$185** for weekly visits (with our 20% discount applied)! 🌸 It keeps your home feeling like a 5-star boutique resort with pristine vacuum stripes, streak-free travertine/marble, and fresh linens! 🛁✨",
        quoteData: { serviceName: 'The Signature Residential Reset', price: 185, hours: '3.5 hrs' }
      };
    }

    // Default friendly guide
    return {
      reply: "I would be thrilled to help you design the perfect reset! 🌸✨ How many bedrooms and bathrooms does your home have, and do you have any special details like delicate marble, pets, or interior appliance requests? 💖"
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Fast fetch with 3.5s timeout abort controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Server response not ok');
      }

      const data = await response.json();
      const botReply = data.reply;

      // Check if reply mentions price
      let quoteMatch: { serviceName: string; price: number; hours: string } | undefined;
      const priceRegex = /\$(\d{2,4})/;
      const match = botReply.match(priceRegex);
      if (match) {
        quoteMatch = {
          serviceName: botReply.includes('Deep') ? 'The Surgical Deep Clean' : 'Signature Residential Reset',
          price: parseInt(match[1], 10),
          hours: '4.5 hrs'
        };
      }

      const botMessage: ChatMessage = {
        id: `b-${Date.now()}`,
        role: 'assistant',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quoteData: quoteMatch
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      // Immediate intelligent fallback for 0ms perception
      const fallback = getFallbackResponse(messageContent);
      const botMessage: ChatMessage = {
        id: `b-${Date.now()}`,
        role: 'assistant',
        content: fallback.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quoteData: fallback.quoteData
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <>
      {/* Floating Luxury Girly Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Luxury Floating Bubble with Dark High-Contrast Typography */}
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 bg-white backdrop-blur-md rounded-2xl shadow-xl border border-pink-300 text-neutral-950 text-xs font-serif-luxury font-bold tracking-wide cursor-pointer hover:border-pink-400 hover:shadow-2xl transition-all animate-bounce"
            style={{ animationDuration: '3.5s' }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-pink-600 animate-ping" />
            <span>Chat with <strong className="font-serif-luxury italic text-pink-900 font-extrabold text-sm">Jessie AI</strong> · Instant Quote ✨</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Jess Pristine AI Concierge"
            className="group relative w-16 h-16 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-300 p-0.5 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-pink-200"
          >
            {/* Glowing aura */}
            <div className="w-full h-full rounded-full overflow-hidden relative bg-white flex items-center justify-center">
              <img
                src={avatarSrc}
                alt="Jess Pristine"
                referrerPolicy="no-referrer"
                onError={() => setAvatarSrc(ASSETS.JESS_AVATAR_FALLBACK)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Corner Sparkle Badge */}
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>

            {/* Unread Ping */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-rose-700 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Luxury AI Concierge Drawer / Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 shadow-2xl rounded-3xl overflow-hidden flex flex-col border-2 border-pink-300 bg-[#ffffff] ${
            isExpanded
              ? 'inset-4 md:inset-12 max-w-4xl mx-auto'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[430px] h-[620px] max-h-[88vh]'
          }`}
        >
          {/* Luxury Header with Deep High-Contrast */}
          <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-pink-950 text-white p-4.5 px-5 flex items-center justify-between shadow-md relative overflow-hidden border-b border-white/15">
            {/* Decorative Subtle Rose Aura */}
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-pink-500/25 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-pink-400 to-amber-300 shadow-sm shrink-0">
                <img
                  src={avatarSrc}
                  alt="Jessie"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarSrc(ASSETS.JESS_AVATAR_FALLBACK)}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-neutral-900" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-display font-semibold tracking-wide text-white flex items-center gap-1.5">
                    Jessie <span className="font-serif-luxury italic text-xs text-pink-300 font-bold">Concierge</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-pink-500/40 border border-pink-400/50 text-[10px] font-mono font-bold text-pink-100">
                    AI Active
                  </span>
                </div>
                <p className="text-xs text-neutral-200 font-serif-luxury font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-pink-300 fill-pink-300" />
                  <span>Bespoke Sanctuary Detailing & Instant Quotes</span>
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:flex w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 items-center justify-center text-white transition-colors"
                aria-label={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Message Scroll Area with Crisp Dark Contrast */}
          <div className="flex-1 p-4.5 overflow-y-auto space-y-4 bg-gradient-to-b from-[#ffffff] via-[#fff8fa] to-[#fff1f5]">
            {messages.map((msg) => {
              const isBot = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 ring-2 ring-pink-400 mt-0.5 shadow-xs">
                      <img
                        src={avatarSrc}
                        alt="Jessie"
                        referrerPolicy="no-referrer"
                        onError={() => setAvatarSrc(ASSETS.JESS_AVATAR_FALLBACK)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] rounded-2xl p-4 shadow-sm ${
                      isBot
                        ? 'bg-white text-neutral-950 border border-pink-200/90 rounded-tl-sm'
                        : 'bg-gradient-to-r from-neutral-950 to-pink-950 text-white rounded-br-sm shadow-md'
                    }`}
                  >
                    {/* Deep Crisp Dark Typography for Modern Luxury */}
                    <div
                      className={`whitespace-pre-line font-serif-luxury text-[14px] leading-relaxed tracking-normal font-semibold ${
                        isBot ? 'text-neutral-950' : 'text-white'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Interactive Luxury Quote Card inside bot message with Dark Crisp Text */}
                    {msg.quoteData && (
                      <div className="mt-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-pink-100/90 via-rose-100/80 to-amber-100/70 border border-pink-300 text-neutral-950 space-y-2.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-serif-luxury uppercase tracking-wider text-pink-950 font-bold">
                            Estimated Investment
                          </span>
                          <span className="text-lg font-bold font-mono text-pink-950 tabular-nums">
                            ${msg.quoteData.price}
                          </span>
                        </div>
                        <div className="text-xs font-serif-luxury text-neutral-900 font-semibold">
                          <strong className="font-bold text-neutral-950">{msg.quoteData.serviceName}</strong> · ~{msg.quoteData.hours}
                        </div>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            const bookingEl = document.getElementById('booking');
                            bookingEl?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full py-2.5 px-3.5 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 hover:from-pink-700 hover:to-rose-700 text-white rounded-xl text-xs font-serif-luxury font-bold tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Lock In This Slot & Quote</span>
                        </button>
                      </div>
                    )}

                    <div
                      className={`text-[10px] mt-2 font-mono text-right font-medium ${
                        isBot ? 'text-neutral-600' : 'text-pink-200'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {!isBot && (
                    <div className="w-6 h-6 rounded-full bg-pink-200 border border-pink-300 text-pink-950 flex items-center justify-center text-[10px] font-bold shrink-0 mb-0.5 font-mono">
                      You
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-pink-900 bg-white p-3 rounded-2xl border border-pink-200 w-fit shadow-xs font-semibold">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-700 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-800 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs font-serif-luxury italic font-bold text-neutral-900">Jessie is consulting the calendar... 🌸</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Click Prompts with Bold Dark Typography */}
          <div className="p-2.5 bg-white border-t border-pink-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-3.5 py-1.5 bg-pink-50 hover:bg-pink-100 text-neutral-950 border border-pink-300 rounded-full text-xs font-serif-luxury tracking-wide whitespace-nowrap shrink-0 transition-colors shadow-2xs font-bold cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Bar with Deep Dark Typing Font */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3.5 bg-white border-t border-pink-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Jessie about pricing, booking, or formulas... 🌸"
              className="flex-1 px-4 py-2.5 bg-pink-50/60 border border-pink-300 rounded-2xl text-xs font-serif-luxury font-bold text-neutral-950 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all tracking-normal"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shadow-md shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
