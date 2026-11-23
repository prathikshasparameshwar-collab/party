import React, { useState } from 'react';
import { Star, MapPin, Users, Sparkles, Check, ArrowRight, Eye } from 'lucide-react';

export default function EventCard({ event, onBookNow, onViewDetails }) {
  const [imgError, setImgError] = useState(false);

  const {
    name,
    category,
    basePrice,
    guestCapacity,
    image,
    fallbackImage,
    location,
    rating = 4.8,
    reviewsCount = 50,
    badge,
    isKarnatakaSpecial,
    description,
    karnatakaHighlight,
    inclusions = []
  } = event;

  // Category specific accent colors
  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'Birthday':
        return {
          pill: 'bg-purple-100 text-purple-800 border-purple-200',
          priceColor: 'text-purple-700',
          btnBg: 'hover:bg-purple-600',
        };
      case 'Haldi':
        return {
          pill: 'bg-amber-100 text-amber-800 border-amber-300',
          priceColor: 'text-amber-700',
          btnBg: 'hover:bg-amber-600',
        };
      case 'Marriage':
        return {
          pill: 'bg-rose-100 text-rose-800 border-rose-300',
          priceColor: 'text-rose-700',
          btnBg: 'hover:bg-rose-600',
        };
      case 'Baby Shower':
        return {
          pill: 'bg-sky-100 text-sky-800 border-sky-300',
          priceColor: 'text-sky-700',
          btnBg: 'hover:bg-sky-600',
        };
      default:
        return {
          pill: 'bg-amber-100 text-amber-900 border-amber-300',
          priceColor: 'text-amber-800',
          btnBg: 'hover:bg-amber-600',
        };
    }
  };

  const theme = getCategoryTheme(category);

  // Fallback image handling
  const displayImage = imgError
    ? fallbackImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    : image;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Card Image Container */}
        <div className="relative h-56 sm:h-60 overflow-hidden bg-stone-900">
          <img
            src={displayImage}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

          {/* Top Left Badges: Celebration Type & Custom Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border shadow-xs backdrop-blur-md ${theme.pill}`}>
              {category}
            </span>
            {badge && (
              <span className="bg-stone-900/80 backdrop-blur-md text-amber-300 border border-amber-400/40 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{badge}</span>
              </span>
            )}
          </div>

          {/* Top Right: Karnataka Special Stamp */}
          {isKarnatakaSpecial && (
            <div className="absolute top-3 right-3 z-10 bg-amber-500/90 backdrop-blur-md text-stone-950 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
              <span>ಕರ್ನಾಟಕ ಸ್ಪೆಷಲ್</span>
            </div>
          )}

          {/* Bottom Overlay on Image: Location & Guest Capacity */}
          <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 bg-stone-950/60 backdrop-blur-sm px-2 py-1 rounded-md">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate max-w-[150px]">{location || 'Karnataka Venues'}</span>
            </div>
            {guestCapacity && (
              <div className="flex items-center gap-1 bg-stone-950/60 backdrop-blur-sm px-2 py-1 rounded-md">
                <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{guestCapacity}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xs font-bold text-stone-800">{rating}</span>
              <span className="text-xs text-stone-400">({reviewsCount} reviews)</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verified Package
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug group-hover:text-amber-700 transition-colors line-clamp-1">
            {name}
          </h3>

          {/* Description */}
          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Karnataka Heritage Special Highlight Box */}
          {karnatakaHighlight && (
            <div className="mt-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
              <span className="text-amber-600 font-bold text-sm leading-none shrink-0">🌸</span>
              <p className="line-clamp-2 italic font-serif">
                {karnatakaHighlight}
              </p>
            </div>
          )}

          {/* Sample Inclusions preview */}
          {inclusions && inclusions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-stone-100 space-y-1.5">
              <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Key Inclusions:
              </p>
              <ul className="text-xs text-stone-600 space-y-1">
                {inclusions.slice(0, 2).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Base Price & Action Buttons */}
      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-stone-200 flex items-end justify-between gap-3 mb-3">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 block font-semibold">
              Base Package Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                ₹{Number(basePrice).toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-500 font-sans">/ event</span>
            </div>
          </div>

          {/* Quick Details Button */}
          {onViewDetails && (
            <button
              type="button"
              onClick={() => onViewDetails(event)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          )}
        </div>

        {/* Primary "Book Now" Button (Props & Components requirement) */}
        <button
          type="button"
          onClick={() => onBookNow(event)}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md shadow-amber-600/20 hover:shadow-amber-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.01]"
        >
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
