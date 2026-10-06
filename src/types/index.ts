export interface ServicePackage {
  id: string;
  name: string;
  badge: string;
  description: string;
  startingPrice: number;
  duration: string;
  idealFor: string;
  features: string[];
  popular?: boolean;
}

export interface BookingDetails {
  serviceId: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  frequency: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';
  addons: string[];
  date: string;
  timeSlot: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  hasPets: boolean;
  entryType: 'home' | 'hidden-key' | 'doorman' | 'lockbox';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  serviceType: string;
  quote: string;
  rating: number;
  date: string;
  highlight: string;
}

export interface InstagramPost {
  id: string;
  title: string;
  caption: string;
  category: 'Reels' | 'Transformation' | 'Botanicals' | 'Tips';
  likes: number;
  comments: number;
  image: string;
  aspectRatio: string;
  videoDuration?: string;
  tags: string[];
}
