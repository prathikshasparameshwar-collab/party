import React, { useState } from 'react';
import { Sparkles, Calendar, PlusCircle, Grid, BookmarkCheck, Menu, X, Crown } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, bookingsCount, onOpenBookings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles, path: '/' },
    { id: 'events', label: 'Event Catalog', icon: Grid, path: '/events' },
    { id: 'book', label: 'Book Celebration', icon: Calendar, path: '/book' },
    { id: 'create', label: 'Create Custom Theme', icon: PlusCircle, path: '/create', highlight: true },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs transition-all">
      {/* Top Heritage Notice Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-amber-50 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Crown className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
        <span>ಸಂಭ್ರಮದ ಕ್ಷಣಗಳು • Handcrafted Personal Milestones & Karnataka Heritage Celebrations</span>
        <span className="hidden md:inline bg-amber-800/60 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-300/30">
          Bengaluru • Mysuru • Mangaluru
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group transition-transform hover:scale-[1.01]"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center shadow-md shadow-amber-500/20 text-white font-bold group-hover:shadow-amber-500/40 transition-shadow">
              <Sparkles className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold font-serif tracking-tight text-stone-900">
                  Celebration<span className="text-amber-600 font-normal">Craft</span>
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Karnataka
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans tracking-wide">
                Milestone Events & Royal Festivities
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30 font-semibold'
                      : item.highlight
                      ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80'
                      : 'text-stone-700 hover:text-amber-700 hover:bg-stone-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-600' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: My Bookings Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenBookings}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-800 text-sm font-semibold transition-colors border border-stone-200"
              title="View my booking requests"
            >
              <BookmarkCheck className="w-4 h-4 text-amber-600" />
              <span>My Bookings</span>
              {bookingsCount > 0 && (
                <span className="bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                  {bookingsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBookings}
              className="relative p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
              aria-label="My Bookings"
            >
              <BookmarkCheck className="w-5 h-5 text-amber-600" />
              {bookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white/98 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all text-left ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30 font-semibold'
                    : item.highlight
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-amber-600'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
