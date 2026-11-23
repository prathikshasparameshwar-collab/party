import React from 'react';
import { ArrowRight, Sparkles, PartyPopper, Sun, HeartHandshake, Baby, Crown } from 'lucide-react';
import { CATEGORIES } from '../data/initialEvents';

export default function CategoryPreviewCards({ onSelectCategory }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'PartyPopper':
        return <PartyPopper className="w-5 h-5 text-purple-600" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'Baby':
        return <Baby className="w-5 h-5 text-sky-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-600" />;
    }
  };

  const getBadgeStyle = (category) => {
    switch (category) {
      case 'Birthday':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Haldi':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Marriage':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Baby Shower':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <section className="py-12 bg-white/70 border-y border-amber-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Milestone Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Curated Themes for Life's Greatest Moments
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base font-sans">
            Explore our signature four celebration categories, deeply infused with Karnataka's rich traditions, vibrant decor, and attentive execution.
          </p>
        </div>

        {/* 4 Static Category Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-400 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image & Badge Container */}
                <div className="relative h-52 overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border shadow-xs ${getBadgeStyle(cat.id)}`}>
                      {cat.badge}
                    </span>
                  </div>

                  {/* Available count */}
                  <div className="absolute top-3 right-3 bg-stone-950/70 backdrop-blur-sm text-stone-200 text-[11px] font-medium px-2 py-0.5 rounded-md">
                    {cat.count}
                  </div>

                  {/* Icon & Title Overlay at Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md">
                        {getIcon(cat.icon)}
                      </div>
                      <h3 className="text-xl font-bold font-serif text-white leading-tight">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-xs text-amber-200 font-medium">
                      {cat.tagline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-semibold">
                        Packages From
                      </span>
                      <span className="text-base font-bold text-amber-700">
                        ₹{cat.startingPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-amber-50 group-hover:bg-amber-600 text-amber-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action Bar */}
              <div className="px-5 pb-4">
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-lg bg-stone-50 group-hover:bg-amber-50 text-stone-700 group-hover:text-amber-900 text-xs font-semibold border border-stone-200 group-hover:border-amber-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore {cat.title} Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Karnataka Special Banner (Direct Deep-Link to Karnataka Festivities) */}
        <div className="mt-8 bg-gradient-to-r from-amber-900 via-orange-900 to-rose-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-500/30">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-25 pointer-events-none hidden md:block"
               style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=600&q=80')` }}
          />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold mb-3">
              <Crown className="w-3.5 h-3.5" />
              <span>ಕರ್ನಾಟಕ ಪರಂಪರೆ • Royal Heritage Specials</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Looking for Authentic Mysore & Karnataka Heritage Celebrations?
            </h3>
            <p className="text-sm text-stone-300 mb-5 leading-relaxed">
              Explore custom packages featuring traditional Mysore Palace durbar lighting, Baale Kamba, fresh Moggu Jade floral styling, and authentic Karnataka feast hospitality.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectCategory('Karnataka Special')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>View Karnataka Heritage Specials</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectCategory('All')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all"
              >
                Browse All Event Packages
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

