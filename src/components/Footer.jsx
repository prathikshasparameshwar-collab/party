import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Crown } from 'lucide-react';

const CURRENT_YEAR = 2026;

export default function Footer({ onNavigateTab, onSelectCategory }) {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-amber-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col: 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                Celebration<span className="text-amber-500 font-normal">Craft</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Your comprehensive single-page planner for life's unforgettable personal milestones. Specializing in authentic Karnataka cultural celebrations, Vedic wedding rituals, Arishina Shastra, and bespoke decor.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400 font-medium">
              <Crown className="w-4 h-4 text-amber-400 shrink-0" />
              <span>ಹಬ್ಬದ ಸಂಭ್ರಮ • Mysuru • Bengaluru • Coastal Karnataka</span>
            </div>
          </div>

          {/* Col 2: Core Milestones */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Milestone Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('Birthday')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Milestone Birthdays
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Haldi')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Arishina & Haldi Ceremonies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Marriage')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Karnataka Kalyana Mandapams
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Baby Shower')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Seemantha & Thottilu Shastra
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Karnataka Special')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer text-amber-300"
                >
                  Karnataka Special Festivities
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Application Pages
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateTab('home')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Home Page (Hero & Previews)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('events')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Event Catalog & Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('book')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Validated Booking Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('create')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer text-amber-400 font-semibold"
                >
                  + Add Custom Event Theme
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Regional Hubs & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Regional Experience Centers
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Indiranagar & Palace Grounds, Bengaluru</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Sayyaji Rao Road, Mysuru Heritage District</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+91 98450 12345 / 080-4567890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>concierge@celebrationcraft.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>
            © {CURRENT_YEAR} CelebrationCraft. Crafted with ❤️ for Karnataka's timeless celebrations.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Client Privacy</span>
            <span>•</span>
            <span>Verified Vendors</span>
            <span>•</span>
            <span>Live React State</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
