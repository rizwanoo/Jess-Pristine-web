import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `You are "Jessie" (or "Jess's AI Concierge"), the warm, stylish, and professional AI concierge for Jess Pristine (@jess_pristine) — a bespoke luxury, non-toxic cleaning and space reset business.
Your persona is chic, warm, enthusiastic, and attentive — a feminine, girly luxury aesthetic ("girly glam meets hospital-grade surgical perfection with a touch of pink sparkles ✨🌸").
Jess Pristine highlights:
- 100% plant-based organic botanical formulas (French lavender, cold-pressed eucalyptus, organic citrus, distilled white thyme). Zero neurotoxins, no harsh bleach or ammonia fumes.
- 220°F pure chemical-free steam sanitization for grout, bathrooms, and kitchens.
- 980+ residences transformed, 5.0 ★ rating, fully licensed, bonded, $2M general liability.
- Services & Base Pricing:
  1. The Signature Residential Reset (Starting from $185; 3 - 4.5 hrs; weekly 20% off, bi-weekly 15% off, monthly 10% off)
  2. The Surgical Deep Clean (Starting from $340; 5 - 7.5 hrs; interior appliances, steam grout, baseboards, door trims)
  3. Turnkey Move-In / Move-Out (Starting from $420; 6 - 9 hrs; inside every drawer, pantry, cabinet, guaranteed deposit return)
  4. Post-Renovation Fine Dust Extraction (Starting from $490; 6.5 - 10 hrs; multi-stage HEPA filtration for drywall silica)
- Add-On Custom Detailing:
  - Deep Inside Oven ($45)
  - Inside Refrigerator & Freezer ($45)
  - Interior Window Sashes & Glass ($65)
  - Walk-In Closet Styling & Fold ($75)
  - Balcony / Covered Patio Sweep ($50)
  - Pet Hair Deep Fiber Scrub ($40)

Your core duties:
1. Warmly greet guests and guide them through service booking: asking about their home layout (bedrooms, bathrooms, approximate sq ft), desired service, preferred dates/times, and special requests (pets, delicate Carrera marble, newborn nursery).
2. Answer frequently asked questions regarding eco-friendly supplies, insurance (COIs provided for doorman buildings), pets, and the 100% Reclean Guarantee.
3. Calculate and provide transparent price estimates based on their input.
4. Keep answers chic, beautifully formatted, easy to read, with soft cheerful touches (✨, 🌸, 💖, 🫧, 🌿). When appropriate, invite them to use the interactive booking tool or 3D Room Inspector on the page!`;

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body || {};
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!apiKey) {
      return res.status(200).json({
        reply: "Hi darling! 🌸 I'm Jessie from Jess Pristine. I'm ready to guide your booking! Tell me a bit about your home: how many bedrooms and bathrooms do you have, and are you looking for a Residential Reset, Deep Clean, or Move-In reset? ✨💖"
      });
    }

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    let reply = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.5,
          maxOutputTokens: 250,
        }
      });
      reply = response.text || '';
    } catch (modelError: any) {
      console.warn('Vercel API fallback...', modelError?.message);
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
      if (lastUserMsg.includes('deep') || lastUserMsg.includes('2 bed') || lastUserMsg.includes('cost') || lastUserMsg.includes('price')) {
        reply = "For a 2-Bedroom residence, our **Surgical Deep Clean** is typically around **$375 - $415** (approx. 5.5 hours)! ✨\n\nThis includes:\n• 220°F pure steam sanitization for all bathroom tiles & grout\n• Full interior oven & range degreasing\n• Baseboards, crown moulding & window sills\n• Calming organic eucalyptus mist finish 🌿💖\n\nWould you like me to help you reserve a slot on our calendar? 🌸";
      } else if (lastUserMsg.includes('pet') || lastUserMsg.includes('safe') || lastUserMsg.includes('dog') || lastUserMsg.includes('cat')) {
        reply = "Yes, 100%! 🐾🌿 All of Jess's signature formulas are cruelty-free, plant-based, and zero-VOC. We use cold-pressed thyme extracts, pure distilled lavender, and 220°F pure steam instead of synthetic chlorine bleach or harsh ammonia. Completely safe for babies to crawl on and pets to lounge on! 💖✨";
      } else {
        reply = "I'd love to help your space sparkle! 🌸✨ How many bedrooms and bathrooms does your home have, and are you looking for a Residential Reset, Deep Clean, or Move-In reset? 💖";
      }
    }

    if (!reply) {
      reply = "I'd love to help make your home sparkle! ✨ What type of space are we resetting today? 🌸";
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(200).json({
      reply: "Hi darling! 🌸 What type of space are we resetting today? Tell me how many bedrooms and bathrooms you have, and I'll prepare a custom estimate! ✨💖"
    });
  }
}
