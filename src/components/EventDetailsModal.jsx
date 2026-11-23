import React from 'react';
import { X, Check, Star, MapPin, Users, Crown, ArrowRight } from 'lucide-react';

export default function EventDetailsModal({ event, onClose, onBookNow }) {
  if (!event) return null;

  const {
    name,
    category,
    basePrice,
    guestCapacity,
    image,
    location,
    rating = 4.9,
    reviewsCount = 75,
    badge,
    isKarnatakaSpecial,
    description,
    karnatakaHighlight,
    inclusions = []
  } = event;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 z-10 animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-900 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950">
              {category}
            </span>
            {badge && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30">
                {badge}
              </span>
            )}
            {isKarnatakaSpecial && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" />
                <span>Karnataka Heritage Special</span>
              </span>
            )}
          </div>

          {/* Title & Info on image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              {name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 mt-2">
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{rating} ({reviewsCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-amber-400" />
                <span>{guestCapacity}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
              Package Overview
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Karnataka Highlight Note */}
          {karnatakaHighlight && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
              <span className="text-xl">🌸</span>
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide block">
                  Authentic Karnataka Cultural Touch:
                </span>
                <p className="text-xs text-amber-900 mt-0.5 leading-relaxed font-serif">
                  {karnatakaHighlight}
                </p>
              </div>
            </div>
          )}

          {/* Full Inclusions List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
              Included in this Package ({inclusions.length} items)
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-800">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing & Booking Footer */}
          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                Total Base Package Investment
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-serif font-bold text-stone-900">
                  ₹{Number(basePrice).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-500">all inclusive base decor</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookNow(event);
                }}
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book This Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
