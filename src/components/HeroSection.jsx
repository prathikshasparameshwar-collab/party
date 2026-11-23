import React from 'react';
import { Sparkles, PlusCircle, ArrowRight, Star, ShieldCheck, Heart, MapPin } from 'lucide-react';

export default function HeroSection({ onExplore, onCreate }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Background festive ambient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-amber-200/35 via-orange-100/25 to-rose-100/30 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-amber-300/20 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
              <span>Karnataka's Premier Milestone & Heritage Planner</span>
              <span className="hidden sm:inline text-amber-600">•</span>
              <span className="hidden sm:inline text-amber-800">100% Bespoke Craftsmanship</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-stone-900 tracking-tight leading-[1.15]">
              Crafting Sacred Milestones & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 bg-clip-text text-transparent">
                Royal Karnataka Celebrations
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Welcome to <span className="font-semibold text-stone-800">CelebrationCraft</span>. Whether celebrating a joyful <span className="text-amber-800 font-medium">Milestone Birthday</span>, the sacred glow of <span className="text-amber-800 font-medium">Arishina Shastra (Haldi)</span>, a grand <span className="text-amber-800 font-medium">Mysore Royal Wedding</span>, or a blissful <span className="text-amber-800 font-medium">Seemantha (Baby Shower)</span> — we tailor every detail with authentic culture and seamless coordination.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExplore}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-lg shadow-amber-600/25 hover:shadow-amber-600/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Browse Event Packages</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCreate}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-semibold border border-stone-300 hover:border-amber-400 shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-600" />
                <span>Create Custom Theme</span>
              </button>
            </div>

            {/* Key Trust Signals / Badges */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <p className="text-base font-bold text-stone-900 leading-none">4.9 / 5.0</p>
                  <p className="text-xs text-stone-500 mt-1">1,200+ Reviews</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <p className="text-base font-bold text-stone-900 leading-none">500+ Maduve</p>
                  <p className="text-xs text-stone-500 mt-1">Sacred Weddings</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-base font-bold text-stone-900 leading-none">Live State</p>
                  <p className="text-xs text-stone-500 mt-1">Instant Customizer</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-base font-bold text-stone-900 leading-none">100% Verified</p>
                  <p className="text-xs text-stone-500 mt-1">Decor & Catering</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (Karnataka Celebration Collage) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Feature Card with Royal Karnataka Theme */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900 group">
                <img
                  src="https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=900&q=80"
                  alt="Mysore Royal Palace Illumination & Karnataka Celebration"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                
                {/* Floating Top Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400/40 text-amber-300 text-xs font-semibold">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mysore Palace & Kalyana Heritage</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-amber-300 text-xs font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Mysuru • Bengaluru • Coastal Karnataka</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white leading-tight">
                    Traditional Grandeur Meets Modern Elegance
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                    Featuring authentic Mallige jasmine, Baale Kamba, brass Kuthuvilakku lighting, and live Nadaswaram ensembles.
                  </p>
                </div>
              </div>

              {/* Floating Mini Card 1: Haldi Celebration */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-xl shadow-xl border border-amber-100 flex items-center gap-3 max-w-[230px] hidden sm:flex hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=150&q=80"
                  alt="Arishina Haldi Urli"
                  className="w-12 h-12 rounded-lg object-cover border border-amber-200"
                />
                <div>
                  <p className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">Arishina Shastra</p>
                  <p className="text-xs font-bold text-stone-900">Traditional Urli & Flowers</p>
                  <p className="text-[10px] text-stone-500 font-medium">Starts ₹48,000</p>
                </div>
              </div>

              {/* Floating Mini Card 2: Seemantha Cradle */}
              <div className="absolute -top-6 -right-4 bg-white p-3 rounded-xl shadow-xl border border-amber-100 flex items-center gap-3 max-w-[210px] hidden sm:flex hover:scale-105 transition-transform">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
                  👶
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">Thottilu Shastra</p>
                  <p className="text-xs font-bold text-stone-900">Baby Shower Decor</p>
                  <p className="text-[10px] text-stone-500 font-medium">Rosewood Cradle Theme</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Crown(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.957-.735L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/>
      <path d="M5 21h14"/>
    </svg>
  );
}
