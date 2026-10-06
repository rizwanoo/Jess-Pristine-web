import React, { useState } from 'react';
import {
  Instagram,
  Heart,
  MessageCircle,
  Play,
  ExternalLink,
  Sparkles,
  X,
  Volume2,
  VolumeX,
  Share2,
  Bookmark
} from 'lucide-react';
import { InstagramPost } from '../types';
import botanicalImg from '../assets/images/pristine_botanical_tools_1791290526402.jpg';
import kitchenImg from '../assets/images/kitchen_sparkle_after_1791290487414.jpg';
import bathroomImg from '../assets/images/bathroom_luxury_clean_1791290500103.jpg';
import founderImg from '../assets/images/jess_founder_portrait_1791290511343.jpg';
import heroImg from '../assets/images/hero_pristine_living_1791290453041.jpg';

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    title: 'The 3-Step Frameless Glass Revival',
    caption: 'Why bleach fails on shower glass: calcium bonds require acid-neutralizing organic chelation, not corrosive fumes. Watch the water film dissolve in seconds. 🌿✨',
    category: 'Reels',
    likes: 18420,
    comments: 342,
    image: bathroomImg,
    aspectRatio: '4:5',
    videoDuration: '0:38',
    tags: ['#cleaninghacks', '#luxuryhomes', '#jesspristine', '#nontoxiccleaning']
  },
  {
    id: 'post-2',
    title: 'Inside My Botanical Detailing Caddy',
    caption: 'Everything in this caddy is 100% plant-based, cruelty-free, and safe for bare feet & pets. Cold-pressed French eucalyptus, natural castile, distilled lavender. No artificial fragrance.',
    category: 'Botanicals',
    likes: 12905,
    comments: 218,
    image: botanicalImg,
    aspectRatio: '1:1',
    tags: ['#ecoluxury', '#plantbasedclean', '#organichome', '#cleanliving']
  },
  {
    id: 'post-3',
    title: 'Chef’s Gourmet Kitchen Reset',
    caption: '4.5 hours of forensic kitchen detailing. Grout steam-sanitized, stainless steel micro-buffed, Carrera marble polished with zero-acid botanical balm.',
    category: 'Transformation',
    likes: 24390,
    comments: 491,
    image: kitchenImg,
    aspectRatio: '4:5',
    videoDuration: '0:45',
    tags: ['#kitchentransformation', '#deepcleaning', '#satisfyingclean']
  },
  {
    id: 'post-4',
    title: 'The Philosophy of Truly Spotless Living',
    caption: '“Your home is your nervous system’s physical extension.” When the space around you is serene, uncluttered, and pure, your mind finally rests. Welcome to Jess Pristine.',
    category: 'Tips',
    likes: 15610,
    comments: 187,
    image: founderImg,
    aspectRatio: '1:1',
    tags: ['#mindfulliving', '#wellnesshome', '#jesspristine']
  },
  {
    id: 'post-5',
    title: 'Penthouse Floor-to-Ceiling Light Wash',
    caption: 'Sunlight hitting spotless travertine floors. No swirls, no sticky surfactant buildup, just pure optical clarity and crisp botanical freshness.',
    category: 'Transformation',
    likes: 28140,
    comments: 520,
    image: heroImg,
    aspectRatio: '4:5',
    videoDuration: '0:52',
    tags: ['#architecturalclean', '#penthouse', '#luxurylifestyle']
  },
  {
    id: 'post-6',
    title: 'Microfiber Folding & Cross-Contamination Zero Protocol',
    caption: 'We use an 8-sided quadrant folding protocol with color-coded microfiber grade textiles so no bathroom particulate ever contacts living spaces.',
    category: 'Tips',
    likes: 9840,
    comments: 142,
    image: botanicalImg,
    aspectRatio: '1:1',
    tags: ['#cleaningprotocol', '#hospitalgrade', '#detailerslife']
  }
];

export const InstagramShowcase: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [isMuted, setIsMuted] = useState(true);

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <section id="instagram" className="py-24 bg-[#faf9f6] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 mb-3">
              <Instagram className="w-3.5 h-3.5" />
              <span>@jess_pristine on Instagram</span>
              <span aria-hidden="true">·</span>
              <span>180K+ Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 tracking-tight text-balance">
              Daily Clean Transformations & Botanical Tips
            </h2>
            <p className="mt-3 text-base text-neutral-600 max-w-2xl leading-relaxed">
              Go behind the scenes with Jess. Watch satisfying deep cleans, master-suite vacuuming routines, and learn how to maintain hospital-grade sanitation without harsh toxins.
            </p>
          </div>

          <a
            href="https://www.instagram.com/jess_pristine/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-medium transition-all shadow-sm shrink-0 self-start md:self-auto"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Follow @jess_pristine</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
          </a>
        </div>

        {/* Instagram Grid Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => {
            const isLiked = likedPosts[post.id];
            const currentLikes = post.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-200 cursor-pointer border border-neutral-200 shadow-sm"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-neutral-200"
                />

                {/* Video Play Pill if Reel */}
                {post.category === 'Reels' && (
                  <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </div>
                )}

                {/* Category tag */}
                <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-white text-[10px] font-mono">
                  {post.category}
                </div>

                {/* Hover Scrim with Likes & Comments */}
                <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 text-white">
                  <p className="text-xs font-semibold line-clamp-2 mb-2 leading-tight">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="flex items-center gap-1">
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'fill-white'}`} />
                      {currentLikes > 1000 ? `${(currentLikes / 1000).toFixed(1)}k` : currentLikes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Reel & Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 flex flex-col md:flex-row max-h-[85vh]"
          >
            {/* Visual preview side */}
            <div className="md:w-1/2 relative bg-black aspect-square md:aspect-auto flex items-center justify-center">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {selectedPost.category === 'Reels' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white ring-1 ring-white/30">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>
              )}

              {/* Sound toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Post Details & Social interaction side */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Account Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={founderImg}
                      alt="Jess Pristine"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-800"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-neutral-900">jess_pristine</span>
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[8px]">✓</span>
                      </div>
                      <span className="text-[11px] text-neutral-500 font-mono">Original Audio · Pristine Care</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Caption Prose */}
                <div className="py-4 space-y-3">
                  <h4 className="text-sm font-semibold text-neutral-900">
                    {selectedPost.title}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {selectedPost.caption}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedPost.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] text-emerald-800 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleLike(selectedPost.id)}
                      className="flex items-center gap-1.5 text-xs text-neutral-700 hover:text-rose-600 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedPosts[selectedPost.id] ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                    <MessageCircle className="w-5 h-5 text-neutral-700" />
                    <Share2 className="w-5 h-5 text-neutral-700" />
                  </div>
                  <Bookmark className="w-5 h-5 text-neutral-700" />
                </div>

                <div className="text-xs font-mono font-medium text-neutral-900 tabular-nums">
                  {(
                    selectedPost.likes + (likedPosts[selectedPost.id] ? 1 : 0)
                  ).toLocaleString()}{' '}
                  likes
                </div>

                <a
                  href="https://www.instagram.com/jess_pristine/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>View Full Post on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
