import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, Sparkles, PlusCircle } from 'lucide-react';
import EventCard from './EventCard';

export default function EventCatalog({ 
  events, 
  onBookNow, 
  onViewDetails, 
  onCreateCustom, 
  selectedCategoryFilter, 
  setSelectedCategoryFilter 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating'

  const categories = [
    'All',
    'Birthday',
    'Haldi',
    'Marriage',
    'Baby Shower',
    'Karnataka Special'
  ];

  // Filter & Sort events
  const filteredEvents = useMemo(() => {
    return events
      .filter((ev) => {
        // Category filter
        const matchesCategory = 
          selectedCategoryFilter === 'All' ||
          ev.category.toLowerCase() === selectedCategoryFilter.toLowerCase() ||
          (selectedCategoryFilter === 'Karnataka Special' && ev.isKarnatakaSpecial);

        // Search bar query (filter events by name or category, or location)
        const term = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !term ||
          ev.name.toLowerCase().includes(term) ||
          ev.category.toLowerCase().includes(term) ||
          (ev.location && ev.location.toLowerCase().includes(term)) ||
          (ev.description && ev.description.toLowerCase().includes(term));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
        if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // default order
      });
  }, [events, selectedCategoryFilter, searchTerm, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategoryFilter('All');
    setSortBy('featured');
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Full Event Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Celebration Packages & Heritage Themes
            </h1>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Browse bespoke milestone packages for Birthdays, Haldi Ceremonies, Karnataka Kalyanam, and Baby Showers. Filter by theme, search by name, or craft your own custom package.
            </p>
          </div>

          {/* Quick Create Custom button */}
          <button
            onClick={onCreateCustom}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold border border-amber-300 shadow-xs transition-colors shrink-0 text-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-amber-600" />
            <span>Add Custom Theme</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm mb-8 space-y-4">
        
        {/* Search Bar (Simple text input to filter events by name or category) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by event name or category (e.g. Birthday, Haldi, Mysore, Baby Shower, Mandap)..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-stone-900 text-sm placeholder-stone-400 outline-none transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills & Sort Dropdown */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2 border-t border-stone-100">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider mr-1 hidden sm:inline">
              Category:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategoryFilter.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-stone-400" />
            <label htmlFor="sortSelect" className="text-xs text-stone-500 font-medium">
              Sort by:
            </label>
            <select
              id="sortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-stone-50 border border-stone-300 rounded-lg py-1.5 px-2.5 text-stone-800 outline-none focus:border-amber-500"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(searchTerm || selectedCategoryFilter !== 'All') && (
          <div className="flex items-center justify-between pt-2 text-xs text-stone-500">
            <span>
              Showing <strong className="text-stone-800">{filteredEvents.length}</strong> matching celebration{filteredEvents.length === 1 ? '' : 's'}
              {selectedCategoryFilter !== 'All' && <span> in <strong className="text-amber-700">{selectedCategoryFilter}</strong></span>}
              {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
            </span>
            <button
              onClick={handleClearFilters}
              className="text-amber-700 hover:text-amber-800 font-semibold underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Event Cards Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onBookNow={onBookNow}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200 shadow-sm max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mx-auto mb-4">
            <Search className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
            No celebration packages found
          </h3>
          <p className="text-sm text-stone-600 mb-6 max-w-md mx-auto">
            We couldn't find any packages matching "{searchTerm || selectedCategoryFilter}". Try clearing your filters or create your own custom theme package!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={onCreateCustom}
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Custom Package</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
