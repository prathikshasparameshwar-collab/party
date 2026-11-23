import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryPreviewCards from './components/CategoryPreviewCards';
import EventCatalog from './components/EventCatalog';
import EventCard from './components/EventCard';
import BookingForm from './components/BookingForm';
import AddCustomEvent from './components/AddCustomEvent';
import KarnatakaShowcase from './components/KarnatakaShowcase';
import EventDetailsModal from './components/EventDetailsModal';
import MyBookingsModal from './components/MyBookingsModal';
import Footer from './components/Footer';
import { INITIAL_EVENTS } from './data/initialEvents';

export default function App() {
  // 1. Live Events State (allows dynamic additions via Add Custom Event page)
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('celebration_craft_events');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved events', e);
      }
    }
    return INITIAL_EVENTS;
  });

  // Sync events to localStorage so custom additions persist across refreshes
  useEffect(() => {
    localStorage.setItem('celebration_craft_events', JSON.stringify(events));
  }, [events]);

  // 2. Active Tab State ('home', 'events', 'book', 'create')
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (['events', 'book', 'create'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  // Keep URL hash in sync with activeTab
  useEffect(() => {
    const targetHash = activeTab === 'home' ? '' : `#/${activeTab}`;
    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, '', targetHash || window.location.pathname);
    }
  }, [activeTab]);

  // Listen to browser popstate (back / forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['events', 'book', 'create', 'home'].includes(hash)) {
        setActiveTab(hash || 'home');
      } else if (!hash) {
        setActiveTab('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Category Filter state for Catalog
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // 4. Preselected event for Booking Form
  const [selectedEventForBooking, setSelectedEventForBooking] = useState(null);

  // 5. Active event for details modal
  const [activeDetailEvent, setActiveDetailEvent] = useState(null);

  // 6. Confirmed Bookings list in State
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('celebration_craft_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing bookings', e);
      }
    }
    return [
      {
        bookingId: 'CC-KAR-74192',
        userName: 'Aishwarya & Chethan',
        celebrationType: 'Marriage',
        eventDate: '2026-11-20',
        guestCount: 800,
        location: 'Mysuru Palace Grounds',
        packageName: 'Mysore Royal Heritage Wedding (Kalyana)',
        estimatedPrice: 245000,
        culturalPreferences: 'Authentic Baale Kamba, Moggu Jade styling and live Nadaswaram vidwans.',
        createdAt: '2026-10-30T10:00:00.000Z'
      }
    ];
  });

  // Sync bookings to localStorage
  useEffect(() => {
    localStorage.setItem('celebration_craft_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // 7. My Bookings modal open state
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);

  // Handlers
  const handleSelectCategoryFromHome = (category) => {
    setSelectedCategoryFilter(category);
    setActiveTab('events');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNow = (event) => {
    setSelectedEventForBooking(event);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (event) => {
    setActiveDetailEvent(event);
  };

  // Add custom celebration to live React state
  const handleAddCustomEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    setSelectedCategoryFilter('All');
  };

  // Handle booking form submission
  const handleBookingSuccess = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Cancel booking
  const handleCancelBooking = (bookingId) => {
    if (window.confirm(`Are you sure you want to cancel booking request ${bookingId}?`)) {
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingsCount={bookings.length}
        onOpenBookings={() => setIsBookingsModalOpen(true)}
      />

      {/* Main Content Rendered conditionally based on activeTab */}
      <main className="flex-1">
        
        {/* 1. Home Page (/ or Home Tab) */}
        {activeTab === 'home' && (
          <div className="animate-fade-in space-y-4">
            {/* Hero Section */}
            <HeroSection
              onExplore={() => {
                setSelectedCategoryFilter('All');
                setActiveTab('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCreate={() => {
                setActiveTab('create');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBookCategory={handleSelectCategoryFromHome}
            />

            {/* Category Preview Cards: 4 Static Cards linking to Catalog */}
            <CategoryPreviewCards
              onSelectCategory={handleSelectCategoryFromHome}
            />

            {/* Karnataka Cultural Celebration Showcase */}
            <KarnatakaShowcase
              onExploreCategory={handleSelectCategoryFromHome}
            />

            {/* Teaser Catalog Strip on Home */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    Featured Karnataka Milestone Packages
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Handcrafted celebration themes ready for your special date
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('All');
                    setActiveTab('events');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs sm:text-sm font-semibold text-amber-700 hover:text-amber-800 underline self-start sm:self-auto cursor-pointer"
                >
                  View All {events.length} Packages in Catalog →
                </button>
              </div>

              {/* Show top 3 packages */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.slice(0, 3).map((event) => (
                  <div key={event.id}>
                    <EventCatalogCardTeaser
                      event={event}
                      onBookNow={handleBookNow}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Event Catalog Page (/events) */}
        {activeTab === 'events' && (
          <div className="animate-fade-in">
            <EventCatalog
              events={events}
              onBookNow={handleBookNow}
              onViewDetails={handleViewDetails}
              onCreateCustom={() => {
                setActiveTab('create');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              selectedCategoryFilter={selectedCategoryFilter}
              setSelectedCategoryFilter={setSelectedCategoryFilter}
            />
          </div>
        )}

        {/* 3. Booking Form Page (/book) */}
        {activeTab === 'book' && (
          <div className="animate-fade-in">
            <BookingForm
              preSelectedEvent={selectedEventForBooking}
              availableEvents={events}
              onBookingSuccess={handleBookingSuccess}
              onExploreMore={() => {
                setActiveTab('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* 4. Add Custom Event Page (/create) */}
        {activeTab === 'create' && (
          <div className="animate-fade-in">
            <AddCustomEvent
              onAddEvent={handleAddCustomEvent}
              onNavigateCatalog={() => {
                setActiveTab('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

      </main>

      {/* Package Inclusions Details Modal */}
      {activeDetailEvent && (
        <EventDetailsModal
          event={activeDetailEvent}
          onClose={() => setActiveDetailEvent(null)}
          onBookNow={handleBookNow}
        />
      )}

      {/* My Bookings Modal / Drawer */}
      <MyBookingsModal
        isOpen={isBookingsModalOpen}
        onClose={() => setIsBookingsModalOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onNavigateToBook={() => {
          setSelectedEventForBooking(null);
          setActiveTab('book');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={handleSelectCategoryFromHome}
      />

    </div>
  );
}

// Reusable Teaser Card wrapper for the Home page
function EventCatalogCardTeaser({ event, onBookNow, onViewDetails }) {
  return (
    <EventCard
      event={event}
      onBookNow={onBookNow}
      onViewDetails={onViewDetails}
    />
  );
}
