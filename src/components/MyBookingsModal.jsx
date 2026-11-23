import React from 'react';
import { X, BookmarkCheck, Calendar, Users, MapPin, Trash2, ArrowRight } from 'lucide-react';

export default function MyBookingsModal({ 
  isOpen, 
  onClose, 
  bookings, 
  onCancelBooking, 
  onNavigateToBook 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-stone-200 z-10 p-6 sm:p-8 animate-fade-in flex flex-col justify-between">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                <BookmarkCheck className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-stone-900">
                  My Milestone Bookings
                </h2>
                <p className="text-xs text-stone-500">
                  Track and review your submitted celebration requests ({bookings.length})
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bookings List */}
          <div className="mt-6 space-y-4">
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <div
                  key={b.bookingId}
                  className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-800 text-sm">
                        {b.bookingId}
                      </span>
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {b.celebrationType}
                      </span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span>Concierge Assigned</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                    <div>
                      <span className="text-stone-400 block font-medium">Host:</span>
                      <strong className="text-stone-800">{b.userName}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block font-medium">Package:</span>
                      <strong className="text-stone-800">{b.packageName}</strong>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{new Date(b.eventDate).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      <span>{b.guestCount} Guests</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{b.location}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block font-medium">Base Estimate:</span>
                      <strong className="text-amber-800 font-bold">
                        ₹{Number(b.estimatedPrice || 0).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>

                  {b.culturalPreferences && (
                    <div className="pt-2 border-t border-stone-200/60 text-[11px] text-stone-500 italic">
                      Special requests: "{b.culturalPreferences}"
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onCancelBooking(b.bookingId)}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Request</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 px-4">
                <BookmarkCheck className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-base font-serif font-bold text-stone-800">
                  No Bookings Yet
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Submit a celebration request using the booking form and it will appear here in real time.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToBook();
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Book a Celebration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
